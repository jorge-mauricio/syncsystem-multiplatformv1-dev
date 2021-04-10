"use strict";

//Import Node Modules.
//----------------------
const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

const formidable = require("formidable"); //Form file upload.
const util = require("util");
//----------------------


//Backend - Files - listing - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/:idParent?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/:idParent?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //app.get("/system/categories", async (req, res)=>{ //working
    //Import objects.
    //----------------------
    const FilesListing = require("../" + gSystemConfig.configDirectorySystem + "/files-listing.js");
    //----------------------


    //Query strings.
    //----------------------
    //console.log("Query = " + req.params.page);

    //console.log("Query = ", req.params);
    //console.log("Query = ", req.query); //working
    //----------------------
    

    //Variables.
    //----------------------
    //let clBackend = new CategoriesListing();
    let flBackend;
    let idParent = "";
    let fileType = "";

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
    if(req.query.fileType)
    {
        fileType = req.query.fileType;
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
            flBackend = new FilesListing({
                idParent: idParent,
                fileType: fileType,

                pageNumber: pageNumber,
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
            await flBackend.build();
            
            //Render data with template.
            //gSystemConfig: gSystemConfig, //moved to locals
            //res.render("layout-backend-main", {
            res.render(masterPageSelect, {
                templateData: flBackend,
                additionalData: {cookiesData: cookiesData}
            });

        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{

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


//Backend - Files - details - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + gSystemConfig.configRouteBackendDetails + "/:idTbFiles?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + gSystemConfig.configRouteBackendDetails + "/:idTbFiles?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    
    //Import objects.
    //----------------------
    //const CategoriesListing = require("./" + gSystemConfig.configDirectorySystem + "/categories-listing.js");
    const FilesDetails = require("../" + gSystemConfig.configDirectorySystem + "/files-details.js");
    //----------------------
    

    //Variables.
    //----------------------
    let fdBackend;
    let idTbFiles = "";

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
    if(req.params.idTbFiles)
    {
        idTbFiles = req.params.idTbFiles;
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
            fdBackend = new FilesDetails({
                idTbFiles: idTbFiles,
                pageNumber: pageNumber,

                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert
            });


            //Build object data.
            await fdBackend.build();


            //Render data with template.
            res.render(masterPageSelect, {
                templateData: fdBackend,
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


//Backend - Files - POST (insert record).
//**************************************************************************************
//router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles, (req, res)=>{
router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{
    //Variables
    //----------------------
    let tblFilesID = "";
    let tblFilesIdParent = "";
    let tblFilesSortOrder = 0;
    let tblFilesFileType = 0; 
    let tblFilesFileConfig = 0; 

    let tblFilesTitle = "";
    let tblFilesCaption = "";
    let tblFilesDescription = "";
    let tblFilesHTMLCode = "";

    let tblFilesURLAlias = "";
    let tblFilesKeywordsTags = "";
    let tblFilesMetaDescription = "";
    let tblFilesMetaTitle = "";

    let tblFilesInfo1 = "";
    let tblFilesInfo2 = "";
    let tblFilesInfo3 = "";
    let tblFilesInfo4 = "";
    let tblFilesInfo5 = "";

    let tblFilesInfoSmall1 = "";
    let tblFilesInfoSmall2 = "";
    let tblFilesInfoSmall3 = "";
    let tblFilesInfoSmall4 = "";
    let tblFilesInfoSmall5 = "";

    let tblFilesNumber1 = 0;
    let tblFilesNumber2 = 0;
    let tblFilesNumber3 = 0;
    let tblFilesNumber4 = 0;
    let tblFilesNumber5 = 0;

    let tblFilesNumberSmall1 = 0;
    let tblFilesNumberSmall2 = 0;
    let tblFilesNumberSmall3 = 0;
    let tblFilesNumberSmall4 = 0;
    let tblFilesNumberSmall5 = 0;

    let tblFilesDate1 = "", tblFilesDate1Hour = "", tblFilesDate1Minute = "", tblFilesDate1Seconds = "", tblFilesDate1Day = "", tblFilesDate1Month = "", tblFilesDate1Year = "";
    let tblFilesDate2 = "", tblFilesDate2Hour = "", tblFilesDate2Minute = "", tblFilesDate2Seconds = "", tblFilesDate2Day = "", tblFilesDate2Month = "", tblFilesDate2Year = "";
    let tblFilesDate3 = "", tblFilesDate3Hour = "", tblFilesDate3Minute = "", tblFilesDate3Seconds = "", tblFilesDate3Day = "", tblFilesDate3Month = "", tblFilesDate3Year = "";
    let tblFilesDate4 = "", tblFilesDate4Hour = "", tblFilesDate4Minute = "", tblFilesDate4Seconds = "", tblFilesDate4Day = "", tblFilesDate4Month = "", tblFilesDate4Year = "";
    let tblFilesDate5 = "", tblFilesDate5Hour = "", tblFilesDate5Minute = "", tblFilesDate5Seconds = "", tblFilesDate5Day = "", tblFilesDate5Month = "", tblFilesDate5Year = "";

    let tblFilesFile = "";
    let tblFilesFileSize = "";
    let tblFilesFileDuration = "";
    let tblFilesFileDimensions = "";
    let tblFilesFileOriginalName = "";
    let tblFilesFileThumbnail = "";

    let tblFilesImageFile1 = "";
    let tblFilesImageFile2 = "";
    let tblFilesImageFile3 = "";
    let tblFilesImageFile4 = "";
    let tblFilesImageFile5 = "";

    let tblFilesActivation = "";
    let tblFilesActivation1 = "";
    let tblFilesActivation2 = "";
    let tblFilesActivation3 = "";
    let tblFilesActivation4 = "";
    let tblFilesActivation5 = "";

    let tblFilesNotes = "";

    let idParent = "";
    let fileType = "";

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
            /**/
            tblFilesID = await new Promise((resolve, reject)=>{
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
                        if(gSystemConfig.enableFilesThumbnails == 1){
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

                        //file1 field.
                        if(gSystemConfig.enableFilesFile1 == 1){
                            if(filesPost.hasOwnProperty("file1") === true)
                            {
                                formfileFieldsReference.file1 = {};
                                formfileFieldsReference.file1.originalFileName = filesPost.file1.name;
                                formfileFieldsReference.file1.fileSize = filesPost.file1.size;
                                formfileFieldsReference.file1.temporaryFilePath = filesPost.file1.path;
                                formfileFieldsReference.file1.fileNamePrefix = "f1-";
                                formfileFieldsReference.file1.fileNameSufix = "";
                                formfileFieldsReference.file1.fileDirectoryUpload = "";
                            }
                        }

                        //file2 field.
                        if(gSystemConfig.enableFilesFile2 == 1){
                            if(filesPost.hasOwnProperty("file2") === true)
                            {
                                formfileFieldsReference.file2 = {};
                                formfileFieldsReference.file2.originalFileName = filesPost.file2.name;
                                formfileFieldsReference.file2.fileSize = filesPost.file2.size;
                                formfileFieldsReference.file2.temporaryFilePath = filesPost.file2.path;
                                formfileFieldsReference.file2.fileNamePrefix = "f2-";
                                formfileFieldsReference.file2.fileNameSufix = "";
                                formfileFieldsReference.file2.fileDirectoryUpload = "";
                            }
                        }

                        //file3 field.
                        if(gSystemConfig.enableFilesFile3 == 1){
                            if(filesPost.hasOwnProperty("file3") === true)
                            {
                                formfileFieldsReference.file3 = {};
                                formfileFieldsReference.file3.originalFileName = filesPost.file3.name;
                                formfileFieldsReference.file3.fileSize = filesPost.file3.size;
                                formfileFieldsReference.file3.temporaryFilePath = filesPost.file3.path;
                                formfileFieldsReference.file3.fileNamePrefix = "f3-";
                                formfileFieldsReference.file3.fileNameSufix = "";
                                formfileFieldsReference.file3.fileDirectoryUpload = "";
                            }
                        }

                        //file4 field.
                        if(gSystemConfig.enableFilesFile4 == 1){
                            if(filesPost.hasOwnProperty("file4") === true)
                            {
                                formfileFieldsReference.file4 = {};
                                formfileFieldsReference.file4.originalFileName = filesPost.file4.name;
                                formfileFieldsReference.file4.fileSize = filesPost.file4.size;
                                formfileFieldsReference.file4.temporaryFilePath = filesPost.file4.path;
                                formfileFieldsReference.file4.fileNamePrefix = "f4-";
                                formfileFieldsReference.file4.fileNameSufix = "";
                                formfileFieldsReference.file4.fileDirectoryUpload = "";
                            }
                        }

                        //file5 field.
                        if(gSystemConfig.enableFilesFile5 == 1){
                            if(filesPost.hasOwnProperty("file5") === true)
                            {
                                formfileFieldsReference.file5 = {};
                                formfileFieldsReference.file5.originalFileName = filesPost.file5.name;
                                formfileFieldsReference.file5.fileSize = filesPost.file5.size;
                                formfileFieldsReference.file5.temporaryFilePath = filesPost.file5.path;
                                formfileFieldsReference.file5.fileNamePrefix = "f5-";
                                formfileFieldsReference.file5.fileNameSufix = "";
                                formfileFieldsReference.file5.fileDirectoryUpload = "";
                            }
                        }


                        resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                            /*SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                                                                    this.openedFiles, 
                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                    "")*/
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblFilesID, 
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

                       
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            tblFilesFile = (resultsFunctionsFiles.hasOwnProperty("file") === true) ? resultsFunctionsFiles.file : tblFilesFile;
                            tblFilesFileSize = formfileFieldsReference.file.fileSize;
                            tblFilesFileOriginalName = formfileFieldsReference.file.originalFileName;

                            tblFilesFileThumbnail = (resultsFunctionsFiles.hasOwnProperty("file_thumbnail") === true) ? resultsFunctionsFiles.file_thumbnail : tblFilesFileThumbnail;

                            tblFilesImageFile1 = (resultsFunctionsFiles.hasOwnProperty("file1") === true) ? resultsFunctionsFiles.file1 : tblFilesImageFile1;
                            tblFilesImageFile2 = (resultsFunctionsFiles.hasOwnProperty("file2") === true) ? resultsFunctionsFiles.file2 : tblFilesImageFile2;
                            tblFilesImageFile3 = (resultsFunctionsFiles.hasOwnProperty("file3") === true) ? resultsFunctionsFiles.file3 : tblFilesImageFile3;
                            tblFilesImageFile4 = (resultsFunctionsFiles.hasOwnProperty("file4") === true) ? resultsFunctionsFiles.file4 : tblFilesImageFile4;
                            tblFilesImageFile5 = (resultsFunctionsFiles.hasOwnProperty("file5") === true) ? resultsFunctionsFiles.file5 : tblFilesImageFile5;


                            //Resize images.
                            if(tblFilesFile !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesFile);
                            }
                            if(tblFilesFileThumbnail !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesFileThumbnail);
                            }
                            if(tblFilesImageFile1 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesImageFile1);
                            }
                            if(tblFilesImageFile2 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesImageFile2);
                            }
                            if(tblFilesImageFile3 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesImageFile3);
                            }
                            if(tblFilesImageFile4 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesImageFile4);
                            }
                            if(tblFilesImageFile5 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesImageFile5);
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
            tblFilesIdParent = formParseResults.fields.id_parent;
            tblFilesSortOrder = formParseResults.fields.sort_order;
            tblFilesFileType = formParseResults.fields.file_type; 
            tblFilesFileConfig = formParseResults.fields.file_config; 

            tblFilesTitle = formParseResults.fields.title;
            tblFilesCaption = formParseResults.fields.caption;
            tblFilesDescription = formParseResults.fields.description;
            tblFilesHTMLCode = formParseResults.fields.html_code;

            tblFilesURLAlias = formParseResults.fields.url_alias;
            tblFilesKeywordsTags = formParseResults.fields.keywords_tags;
            tblFilesMetaDescription = formParseResults.fields.meta_description;
            tblFilesMetaTitle = formParseResults.fields.meta_title;

            tblFilesInfo1 = formParseResults.fields.info1;
            tblFilesInfo2 = formParseResults.fields.info2;
            tblFilesInfo3 = formParseResults.fields.info3;
            tblFilesInfo4 = formParseResults.fields.info4;
            tblFilesInfo5 = formParseResults.fields.info5;

            tblFilesInfoSmall1 = formParseResults.fields.info_small1;
            tblFilesInfoSmall2 = formParseResults.fields.info_small2;
            tblFilesInfoSmall3 = formParseResults.fields.info_small3;
            tblFilesInfoSmall4 = formParseResults.fields.info_small4;
            tblFilesInfoSmall5 = formParseResults.fields.info_small5;
            
            tblFilesNumber1 = formParseResults.fields.number1;
            tblFilesNumber2 = formParseResults.fields.number2;
            tblFilesNumber3 = formParseResults.fields.number3;
            tblFilesNumber4 = formParseResults.fields.number4;
            tblFilesNumber5 = formParseResults.fields.number5;
            
            tblFilesNumberSmall1 = formParseResults.fields.number_small1;
            tblFilesNumberSmall2 = formParseResults.fields.number_small2;
            tblFilesNumberSmall3 = formParseResults.fields.number_small3;
            tblFilesNumberSmall4 = formParseResults.fields.number_small4;
            tblFilesNumberSmall5 = formParseResults.fields.number_small5;

            tblFilesDate1 = formParseResults.fields.date1;
            tblFilesDate1Hour = formParseResults.fields.date1_hour;
            tblFilesDate1Minute = formParseResults.fields.date1_minute;
            tblFilesDate1Seconds = formParseResults.fields.date1_seconds;
            tblFilesDate1Day = formParseResults.fields.date1_day;
            tblFilesDate1Month = formParseResults.fields.date1_month;
            tblFilesDate1Year = formParseResults.fields.date1_year;
            //Mount.
            tblFilesDate1 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblFilesDate1,
                                                                        dateFieldDay: tblFilesDate1Day,
                                                                        dateFieldMonth: tblFilesDate1Month,
                                                                        dateFieldYear: tblFilesDate1Year,
                                                                        dateFieldHour: tblFilesDate1Hour,
                                                                        dateFieldMinute: tblFilesDate1Minute,
                                                                        dateFieldSeconds: tblFilesDate1Seconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");/**/
            
            tblFilesDate2 = formParseResults.fields.date2;
            tblFilesDate2Hour = formParseResults.fields.date2_hour;
            tblFilesDate2Minute = formParseResults.fields.date2_minute;
            tblFilesDate2Seconds = formParseResults.fields.date2_seconds;
            tblFilesDate2Day = formParseResults.fields.date2_day;
            tblFilesDate2Month = formParseResults.fields.date2_month;
            tblFilesDate2Year = formParseResults.fields.date2_year;
            //Mount.
            tblFilesDate2 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblFilesDate2,
                                                                        dateFieldDay: tblFilesDate2Day,
                                                                        dateFieldMonth: tblFilesDate2Month,
                                                                        dateFieldYear: tblFilesDate2Year,
                                                                        dateFieldHour: tblFilesDate2Hour,
                                                                        dateFieldMinute: tblFilesDate2Minute,
                                                                        dateFieldSeconds: tblFilesDate2Seconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");

            tblFilesDate3 = formParseResults.fields.date3;
            tblFilesDate3Hour = formParseResults.fields.date3_hour;
            tblFilesDate3Minute = formParseResults.fields.date3_minute;
            tblFilesDate3Seconds = formParseResults.fields.date3_seconds;
            tblFilesDate3Day = formParseResults.fields.date3_day;
            tblFilesDate3Month = formParseResults.fields.date3_month;
            tblFilesDate3Year = formParseResults.fields.date3_year;
            //Mount.
            tblFilesDate3 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblFilesDate3,
                                                                        dateFieldDay: tblFilesDate3Day,
                                                                        dateFieldMonth: tblFilesDate3Month,
                                                                        dateFieldYear: tblFilesDate3Year,
                                                                        dateFieldHour: tblFilesDate3Hour,
                                                                        dateFieldMinute: tblFilesDate3Minute,
                                                                        dateFieldSeconds: tblFilesDate3Seconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");

            tblFilesDate4 = formParseResults.fields.date4;
            tblFilesDate4Hour = formParseResults.fields.date4_hour;
            tblFilesDate4Minute = formParseResults.fields.date4_minute;
            tblFilesDate4Seconds = formParseResults.fields.date4_seconds;
            tblFilesDate4Day = formParseResults.fields.date4_day;
            tblFilesDate4Month = formParseResults.fields.date4_month;
            tblFilesDate4Year = formParseResults.fields.date4_year;
            //Mount.
            tblFilesDate4 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblFilesDate4,
                                                                        dateFieldDay: tblFilesDate4Day,
                                                                        dateFieldMonth: tblFilesDate4Month,
                                                                        dateFieldYear: tblFilesDate4Year,
                                                                        dateFieldHour: tblFilesDate4Hour,
                                                                        dateFieldMinute: tblFilesDate4Minute,
                                                                        dateFieldSeconds: tblFilesDate4Seconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");

            tblFilesDate5 = formParseResults.fields.date5;
            tblFilesDate5Hour = formParseResults.fields.date5_hour;
            tblFilesDate5Minute = formParseResults.fields.date5_minute;
            tblFilesDate5Seconds = formParseResults.fields.date5_seconds;
            tblFilesDate5Day = formParseResults.fields.date5_day;
            tblFilesDate5Month = formParseResults.fields.date5_month;
            tblFilesDate5Year = formParseResults.fields.date5_year;
            //Mount.
            tblFilesDate5 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblFilesDate5,
                                                                        dateFieldDay: tblFilesDate5Day,
                                                                        dateFieldMonth: tblFilesDate5Month,
                                                                        dateFieldYear: tblFilesDate5Year,
                                                                        dateFieldHour: tblFilesDate5Hour,
                                                                        dateFieldMinute: tblFilesDate5Minute,
                                                                        dateFieldSeconds: tblFilesDate5Seconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");/**/

            //tblCategoriesImageMain = "teste3";
            //tblCategoriesImageMain = formParseResults.fields.image_main;
            //if(resultsFunctionsFiles.returnStatus == true)
            //if(resultsFunctionsFiles.returnStatus)
            //{
                //tblCategoriesImageMain = formParseResults.fields.image_main;
            //}    

            tblFilesActivation = formParseResults.fields.activation;
            tblFilesActivation1 = formParseResults.fields.activation1;
            tblFilesActivation2 = formParseResults.fields.activation2;
            tblFilesActivation3 = formParseResults.fields.activation3;
            tblFilesActivation4 = formParseResults.fields.activation4;
            tblFilesActivation5 = formParseResults.fields.activation5;

            tblFilesNotes = formParseResults.fields.notes

            idParent = formParseResults.fields.idParent;
            fileType = formParseResults.fields.fileType;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + idParent;
            returnURL += "?fileType=" + fileType;
            returnURL += "&masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //Insert record.  
            //----------------------
            let filesInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.filesInsert_async({
                    _tblFilesID: tblFilesID,
                    _tblFilesIdParent: tblFilesIdParent,
                    _tblFilesSortOrder: tblFilesSortOrder,
                    _tblFilesFileType: tblFilesFileType,
                    _tblFilesFileConfig: tblFilesFileConfig,
                    _tblFilesDateCreation: "",
                    _tblFilesDateTimezone: "",
                    _tblFilesDateEdit: "",
                    _tblFilesTitle: tblFilesTitle,
                    _tblFilesCaption: tblFilesCaption,
                    _tblFilesDescription: tblFilesDescription,
                    _tblFilesHTMLCode: tblFilesHTMLCode,
                    _tblFilesURLAlias: tblFilesURLAlias,
                    _tblFilesKeywordsTags: tblFilesKeywordsTags,
                    _tblFilesMetaDescription: tblFilesMetaDescription,
                    _tblFilesMetaTitle: tblFilesMetaTitle,
                    _tblFilesMetaInfo: "",
                    _tblFilesInfo1: tblFilesInfo1,
                    _tblFilesInfo2: tblFilesInfo2,
                    _tblFilesInfo3: tblFilesInfo3,
                    _tblFilesInfo4: tblFilesInfo4,
                    _tblFilesInfo5: tblFilesInfo5,
                    _tblFilesInfoSmall1: tblFilesInfoSmall1,
                    _tblFilesInfoSmall2: tblFilesInfoSmall2,
                    _tblFilesInfoSmall3: tblFilesInfoSmall3,
                    _tblFilesInfoSmall4: tblFilesInfoSmall4,
                    _tblFilesInfoSmall5: tblFilesInfoSmall5,
                    _tblFilesNumber1: tblFilesNumber1,
                    _tblFilesNumber2: tblFilesNumber2,
                    _tblFilesNumber3: tblFilesNumber3,
                    _tblFilesNumber4: tblFilesNumber4,
                    _tblFilesNumber5: tblFilesNumber5,
                    _tblFilesNumberSmall1: tblFilesNumberSmall1,
                    _tblFilesNumberSmall2: tblFilesNumberSmall2,
                    _tblFilesNumberSmall3: tblFilesNumberSmall3,
                    _tblFilesNumberSmall4: tblFilesNumberSmall4,
                    _tblFilesNumberSmall5: tblFilesNumberSmall5,
                    _tblFilesDate1: tblFilesDate1,
                    _tblFilesDate2: tblFilesDate2,
                    _tblFilesDate3: tblFilesDate3,
                    _tblFilesDate4: tblFilesDate4,
                    _tblFilesDate5: tblFilesDate5,
                    _tblFilesFile: tblFilesFile,
                    _tblFilesFileSize: tblFilesFileSize,
                    _tblFilesFileDuration: tblFilesFileDuration,
                    _tblFilesFileDimensions: tblFilesFileDimensions,
                    _tblFilesFileOriginalName: tblFilesFileOriginalName,
                    _tblFilesFileThumbnail: tblFilesFileThumbnail,
                    _tblFilesFile1: tblFilesImageFile1,
                    _tblFilesFile2: tblFilesImageFile2,
                    _tblFilesFile3: tblFilesImageFile3,
                    _tblFilesFile4: tblFilesImageFile4,
                    _tblFilesFile5: tblFilesImageFile5,
                    _tblFilesActivation: tblFilesActivation,
                    _tblFilesActivation1: tblFilesActivation1,
                    _tblFilesActivation2: tblFilesActivation2,
                    _tblFilesActivation3: tblFilesActivation3,
                    _tblFilesActivation4: tblFilesActivation4,
                    _tblFilesActivation5: tblFilesActivation5,
                    _tblFilesNotes: tblFilesNotes
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
            if(filesInsertResult == true)
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


//Backend - Files - edit - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbFiles?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbFiles?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    
    //Import objects.
    //----------------------
    const FilesEdit = require("../" + gSystemConfig.configDirectorySystem + "/files-edit.js");
    //----------------------
    

    //Variables.
    //----------------------
    let feBackend;
    let idTbFiles = "";
    let fileType = "";

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
    if(req.params.idTbFiles)
    {
        idTbFiles = req.params.idTbFiles;
    }
    if(req.query.fileType)
    {
        fileType = req.query.fileType;
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
            feBackend = new FilesEdit({
                idTbFiles: idTbFiles,
                fileType: fileType,

                pageNumber: pageNumber,
                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert,
                nRecords: nRecords
            });


            //Build object data.
            await feBackend.build();


            //Render data with template.
            res.render(masterPageSelect, {
                templateData: feBackend,
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


//Backend - Files - PUT (edit).
//**************************************************************************************
//router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + gSystemConfig.configRouteBackendActionEdit, (req, res)=>{ //working, with the async block
router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + gSystemConfig.configRouteBackendActionEdit, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Variables
    //----------------------
    let tblFilesID = "";
    let tblFilesIdParent = "";
    let tblFilesSortOrder = 0;
    let tblFilesFileType = 0; 
    let tblFilesFileConfig = 0; 

    let tblFilesTitle = "";
    let tblFilesCaption = "";
    let tblFilesDescription = "";
    let tblFilesHTMLCode = "";

    let tblFilesURLAlias = "";
    let tblFilesKeywordsTags = "";
    let tblFilesMetaDescription = "";
    let tblFilesMetaTitle = "";

    let tblFilesInfo1 = "";
    let tblFilesInfo2 = "";
    let tblFilesInfo3 = "";
    let tblFilesInfo4 = "";
    let tblFilesInfo5 = "";

    let tblFilesInfoSmall1 = "";
    let tblFilesInfoSmall2 = "";
    let tblFilesInfoSmall3 = "";
    let tblFilesInfoSmall4 = "";
    let tblFilesInfoSmall5 = "";

    let tblFilesNumber1 = 0;
    let tblFilesNumber2 = 0;
    let tblFilesNumber3 = 0;
    let tblFilesNumber4 = 0;
    let tblFilesNumber5 = 0;

    let tblFilesNumberSmall1 = 0;
    let tblFilesNumberSmall2 = 0;
    let tblFilesNumberSmall3 = 0;
    let tblFilesNumberSmall4 = 0;
    let tblFilesNumberSmall5 = 0;

    let tblFilesDate1 = "", tblFilesDate1Hour = "", tblFilesDate1Minute = "", tblFilesDate1Seconds = "", tblFilesDate1Day = "", tblFilesDate1Month = "", tblFilesDate1Year = "";
    let tblFilesDate2 = "", tblFilesDate2Hour = "", tblFilesDate2Minute = "", tblFilesDate2Seconds = "", tblFilesDate2Day = "", tblFilesDate2Month = "", tblFilesDate2Year = "";
    let tblFilesDate3 = "", tblFilesDate3Hour = "", tblFilesDate3Minute = "", tblFilesDate3Seconds = "", tblFilesDate3Day = "", tblFilesDate3Month = "", tblFilesDate3Year = "";
    let tblFilesDate4 = "", tblFilesDate4Hour = "", tblFilesDate4Minute = "", tblFilesDate4Seconds = "", tblFilesDate4Day = "", tblFilesDate4Month = "", tblFilesDate4Year = "";
    let tblFilesDate5 = "", tblFilesDate5Hour = "", tblFilesDate5Minute = "", tblFilesDate5Seconds = "", tblFilesDate5Day = "", tblFilesDate5Month = "", tblFilesDate5Year = "";

    let tblFilesFile = "";
    let tblFilesFileThumbnail = "";
    let tblFilesFileSize = "";
    let tblFilesFileDuration = "";
    let tblFilesFileDimensions = "";
    let tblFilesFileOriginalName = "";
    
    let tblFilesImageFile1 = "";
    let tblFilesImageFile2 = "";
    let tblFilesImageFile3 = "";
    let tblFilesImageFile4 = "";
    let tblFilesImageFile5 = "";

    let tblFilesActivation = "";
    let tblFilesActivation1 = "";
    let tblFilesActivation2 = "";
    let tblFilesActivation3 = "";
    let tblFilesActivation4 = "";
    let tblFilesActivation5 = "";

    let tblFilesNotes = "";

    let idParent = "";
    let fileType = "";

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
                            tblFilesID = fieldsPost.id;
                            

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
                        //image_main field.
                        //if(gSystemConfig.enableCategoriesImageMain == 1){
                            if(filesPost.hasOwnProperty("file") === true)
                            {
                                //if(filesPost.file.name != "")
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
                        if(gSystemConfig.enableFilesThumbnails == 1){
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

                        //file1 field.
                        if(gSystemConfig.enableFilesFile1 == 1){
                            if(filesPost.hasOwnProperty("file1") === true)
                            {
                                formfileFieldsReference.file1 = {};
                                formfileFieldsReference.file1.originalFileName = filesPost.file1.name;
                                formfileFieldsReference.file1.fileSize = filesPost.file1.size;
                                formfileFieldsReference.file1.temporaryFilePath = filesPost.file1.path;
                                formfileFieldsReference.file1.fileNamePrefix = "f1-";
                                formfileFieldsReference.file1.fileNameSufix = "";
                                formfileFieldsReference.file1.fileDirectoryUpload = "";
                            }
                        }

                        //file2 field.
                        if(gSystemConfig.enableFilesFile2 == 1){
                            if(filesPost.hasOwnProperty("file2") === true)
                            {
                                formfileFieldsReference.file2 = {};
                                formfileFieldsReference.file2.originalFileName = filesPost.file2.name;
                                formfileFieldsReference.file2.fileSize = filesPost.file2.size;
                                formfileFieldsReference.file2.temporaryFilePath = filesPost.file2.path;
                                formfileFieldsReference.file2.fileNamePrefix = "f2-";
                                formfileFieldsReference.file2.fileNameSufix = "";
                                formfileFieldsReference.file2.fileDirectoryUpload = "";
                            }
                        }

                        //file3 field.
                        if(gSystemConfig.enableFilesFile3 == 1){
                            if(filesPost.hasOwnProperty("file3") === true)
                            {
                                formfileFieldsReference.file3 = {};
                                formfileFieldsReference.file3.originalFileName = filesPost.file3.name;
                                formfileFieldsReference.file3.fileSize = filesPost.file3.size;
                                formfileFieldsReference.file3.temporaryFilePath = filesPost.file3.path;
                                formfileFieldsReference.file3.fileNamePrefix = "f3-";
                                formfileFieldsReference.file3.fileNameSufix = "";
                                formfileFieldsReference.file3.fileDirectoryUpload = "";
                            }
                        }

                        //file4 field.
                        if(gSystemConfig.enableFilesFile4 == 1){
                            if(filesPost.hasOwnProperty("file4") === true)
                            {
                                formfileFieldsReference.file4 = {};
                                formfileFieldsReference.file4.originalFileName = filesPost.file4.name;
                                formfileFieldsReference.file4.fileSize = filesPost.file4.size;
                                formfileFieldsReference.file4.temporaryFilePath = filesPost.file4.path;
                                formfileFieldsReference.file4.fileNamePrefix = "f4-";
                                formfileFieldsReference.file4.fileNameSufix = "";
                                formfileFieldsReference.file4.fileDirectoryUpload = "";
                            }
                        }

                        //file5 field.
                        if(gSystemConfig.enableFilesFile5 == 1){
                            if(filesPost.hasOwnProperty("file5") === true)
                            {
                                formfileFieldsReference.file5 = {};
                                formfileFieldsReference.file5.originalFileName = filesPost.file5.name;
                                formfileFieldsReference.file5.fileSize = filesPost.file5.size;
                                formfileFieldsReference.file5.temporaryFilePath = filesPost.file5.path;
                                formfileFieldsReference.file5.fileNamePrefix = "f5-";
                                formfileFieldsReference.file5.fileNameSufix = "";
                                formfileFieldsReference.file5.fileDirectoryUpload = "";
                            }
                        }


                        resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                            /*SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                                                                    this.openedFiles, 
                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                    "")*/
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblFilesID, 
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


                        //Debug.
                        //console.log("filesPost=", filesPost);
                        //console.log("formfileFieldsReference=", formfileFieldsReference);
                        //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);

                        
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            tblFilesFile = (resultsFunctionsFiles.hasOwnProperty("file") === true) ? resultsFunctionsFiles.file : tblFilesFile;
                            tblFilesFileSize = formfileFieldsReference.file.fileSize;
                            tblFilesFileOriginalName = formfileFieldsReference.file.originalFileName;

                            tblFilesFileThumbnail = (resultsFunctionsFiles.hasOwnProperty("file_thumbnail") === true) ? resultsFunctionsFiles.file_thumbnail : tblFilesFileThumbnail;

                            tblFilesImageFile1 = (resultsFunctionsFiles.hasOwnProperty("file1") === true) ? resultsFunctionsFiles.file1 : tblFilesImageFile1;
                            tblFilesImageFile2 = (resultsFunctionsFiles.hasOwnProperty("file2") === true) ? resultsFunctionsFiles.file2 : tblFilesImageFile2;
                            tblFilesImageFile3 = (resultsFunctionsFiles.hasOwnProperty("file3") === true) ? resultsFunctionsFiles.file3 : tblFilesImageFile3;
                            tblFilesImageFile4 = (resultsFunctionsFiles.hasOwnProperty("file4") === true) ? resultsFunctionsFiles.file4 : tblFilesImageFile4;
                            tblFilesImageFile5 = (resultsFunctionsFiles.hasOwnProperty("file5") === true) ? resultsFunctionsFiles.file5 : tblFilesImageFile5;


                            //Resize images.
                            if(tblFilesFile !== "")
                            {
                                //resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrDefaultImageSize, gSystemConfig.configDirectoryFiles, tblFilesImageMain);
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesFile);
                            }
                            if(tblFilesFileThumbnail !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesFileThumbnail);
                            }
                            if(tblFilesImageFile1 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesImageFile1);
                            }
                            if(tblFilesImageFile2 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesImageFile2);
                            }
                            if(tblFilesImageFile3 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesImageFile3);
                            }
                            if(tblFilesImageFile4 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesImageFile4);
                            }
                            if(tblFilesImageFile5 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFilesImageSize, gSystemConfig.configDirectoryFiles, tblFilesImageFile5);
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
            tblFilesIdParent = formParseResults.fields.id_parent;
            tblFilesSortOrder = formParseResults.fields.sort_order;
            tblFilesFileType = formParseResults.fields.file_type; 
            tblFilesFileConfig = formParseResults.fields.file_config; 

            tblFilesTitle = formParseResults.fields.title;
            tblFilesCaption = formParseResults.fields.caption;
            tblFilesDescription = formParseResults.fields.description;
            tblFilesHTMLCode = formParseResults.fields.html_code;

            tblFilesURLAlias = formParseResults.fields.url_alias;
            tblFilesKeywordsTags = formParseResults.fields.keywords_tags;
            tblFilesMetaDescription = formParseResults.fields.meta_description;
            tblFilesMetaTitle = formParseResults.fields.meta_title;

            tblFilesInfo1 = formParseResults.fields.info1;
            tblFilesInfo2 = formParseResults.fields.info2;
            tblFilesInfo3 = formParseResults.fields.info3;
            tblFilesInfo4 = formParseResults.fields.info4;
            tblFilesInfo5 = formParseResults.fields.info5;

            tblFilesInfoSmall1 = formParseResults.fields.info_small1;
            tblFilesInfoSmall2 = formParseResults.fields.info_small2;
            tblFilesInfoSmall3 = formParseResults.fields.info_small3;
            tblFilesInfoSmall4 = formParseResults.fields.info_small4;
            tblFilesInfoSmall5 = formParseResults.fields.info_small5;
            
            tblFilesNumber1 = formParseResults.fields.number1;
            tblFilesNumber2 = formParseResults.fields.number2;
            tblFilesNumber3 = formParseResults.fields.number3;
            tblFilesNumber4 = formParseResults.fields.number4;
            tblFilesNumber5 = formParseResults.fields.number5;
            
            tblFilesNumberSmall1 = formParseResults.fields.number_small1;
            tblFilesNumberSmall2 = formParseResults.fields.number_small2;
            tblFilesNumberSmall3 = formParseResults.fields.number_small3;
            tblFilesNumberSmall4 = formParseResults.fields.number_small4;
            tblFilesNumberSmall5 = formParseResults.fields.number_small5;

            tblFilesDate1 = formParseResults.fields.date1;
            tblFilesDate1Hour = formParseResults.fields.date1_hour;
            tblFilesDate1Minute = formParseResults.fields.date1_minute;
            tblFilesDate1Seconds = formParseResults.fields.date1_seconds;
            tblFilesDate1Day = formParseResults.fields.date1_day;
            tblFilesDate1Month = formParseResults.fields.date1_month;
            tblFilesDate1Year = formParseResults.fields.date1_year;
            //Mount.
            tblFilesDate1 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblFilesDate1,
                                                                        dateFieldDay: tblFilesDate1Day,
                                                                        dateFieldMonth: tblFilesDate1Month,
                                                                        dateFieldYear: tblFilesDate1Year,
                                                                        dateFieldHour: tblFilesDate1Hour,
                                                                        dateFieldMinute: tblFilesDate1Minute,
                                                                        dateFieldSeconds: tblFilesDate1Seconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");/**/
            
            tblFilesDate2 = formParseResults.fields.date2;
            tblFilesDate2Hour = formParseResults.fields.date2_hour;
            tblFilesDate2Minute = formParseResults.fields.date2_minute;
            tblFilesDate2Seconds = formParseResults.fields.date2_seconds;
            tblFilesDate2Day = formParseResults.fields.date2_day;
            tblFilesDate2Month = formParseResults.fields.date2_month;
            tblFilesDate2Year = formParseResults.fields.date2_year;
            //Mount.
            tblFilesDate2 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblFilesDate2,
                                                                        dateFieldDay: tblFilesDate2Day,
                                                                        dateFieldMonth: tblFilesDate2Month,
                                                                        dateFieldYear: tblFilesDate2Year,
                                                                        dateFieldHour: tblFilesDate2Hour,
                                                                        dateFieldMinute: tblFilesDate2Minute,
                                                                        dateFieldSeconds: tblFilesDate2Seconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");

            tblFilesDate3 = formParseResults.fields.date3;
            tblFilesDate3Hour = formParseResults.fields.date3_hour;
            tblFilesDate3Minute = formParseResults.fields.date3_minute;
            tblFilesDate3Seconds = formParseResults.fields.date3_seconds;
            tblFilesDate3Day = formParseResults.fields.date3_day;
            tblFilesDate3Month = formParseResults.fields.date3_month;
            tblFilesDate3Year = formParseResults.fields.date3_year;
            //Mount.
            tblFilesDate3 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblFilesDate3,
                                                                        dateFieldDay: tblFilesDate3Day,
                                                                        dateFieldMonth: tblFilesDate3Month,
                                                                        dateFieldYear: tblFilesDate3Year,
                                                                        dateFieldHour: tblFilesDate3Hour,
                                                                        dateFieldMinute: tblFilesDate3Minute,
                                                                        dateFieldSeconds: tblFilesDate3Seconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");

            tblFilesDate4 = formParseResults.fields.date4;
            tblFilesDate4Hour = formParseResults.fields.date4_hour;
            tblFilesDate4Minute = formParseResults.fields.date4_minute;
            tblFilesDate4Seconds = formParseResults.fields.date4_seconds;
            tblFilesDate4Day = formParseResults.fields.date4_day;
            tblFilesDate4Month = formParseResults.fields.date4_month;
            tblFilesDate4Year = formParseResults.fields.date4_year;
            //Mount.
            tblFilesDate4 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblFilesDate4,
                                                                        dateFieldDay: tblFilesDate4Day,
                                                                        dateFieldMonth: tblFilesDate4Month,
                                                                        dateFieldYear: tblFilesDate4Year,
                                                                        dateFieldHour: tblFilesDate4Hour,
                                                                        dateFieldMinute: tblFilesDate4Minute,
                                                                        dateFieldSeconds: tblFilesDate4Seconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");

            tblFilesDate5 = formParseResults.fields.date5;
            tblFilesDate5Hour = formParseResults.fields.date5_hour;
            tblFilesDate5Minute = formParseResults.fields.date5_minute;
            tblFilesDate5Seconds = formParseResults.fields.date5_seconds;
            tblFilesDate5Day = formParseResults.fields.date5_day;
            tblFilesDate5Month = formParseResults.fields.date5_month;
            tblFilesDate5Year = formParseResults.fields.date5_year;
            //Mount.
            tblFilesDate5 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblFilesDate5,
                                                                        dateFieldDay: tblFilesDate5Day,
                                                                        dateFieldMonth: tblFilesDate5Month,
                                                                        dateFieldYear: tblFilesDate5Year,
                                                                        dateFieldHour: tblFilesDate5Hour,
                                                                        dateFieldMinute: tblFilesDate5Minute,
                                                                        dateFieldSeconds: tblFilesDate5Seconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");/**/

            //tblCategoriesImageMain = "teste3";
            //tblCategoriesImageMain = formParseResults.fields.image_main;
            //if(resultsFunctionsFiles.returnStatus == true)
            //if(resultsFunctionsFiles.returnStatus)
            //{
                //tblCategoriesImageMain = formParseResults.fields.image_main;
            //}    

            tblFilesActivation = formParseResults.fields.activation;
            tblFilesActivation1 = formParseResults.fields.activation1;
            tblFilesActivation2 = formParseResults.fields.activation2;
            tblFilesActivation3 = formParseResults.fields.activation3;
            tblFilesActivation4 = formParseResults.fields.activation4;
            tblFilesActivation5 = formParseResults.fields.activation5;

            tblFilesNotes = formParseResults.fields.notes

            idParent = formParseResults.fields.idParent;
            fileType = formParseResults.fields.fileType;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiles + "/" + idParent;
            returnURL += "?fileType=" + fileType;
            returnURL += "&masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //Update record.  
            //----------------------
            let fileUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.fileUpdate_async({
                    _tblFilesID: tblFilesID,
                    _tblFilesIdParent: tblFilesIdParent,
                    _tblFilesSortOrder: tblFilesSortOrder,
                    _tblFilesFileType: tblFilesFileType,
                    _tblFilesFileConfig: tblFilesFileConfig,
                    _tblFilesDateCreation: "",
                    _tblFilesDateTimezone: "",
                    _tblFilesDateEdit: "",
                    _tblFilesTitle: tblFilesTitle,
                    _tblFilesCaption: tblFilesCaption,
                    _tblFilesDescription: tblFilesDescription,
                    _tblFilesHTMLCode: tblFilesHTMLCode,
                    _tblFilesURLAlias: tblFilesURLAlias,
                    _tblFilesKeywordsTags: tblFilesKeywordsTags,
                    _tblFilesMetaDescription: tblFilesMetaDescription,
                    _tblFilesMetaTitle: tblFilesMetaTitle,
                    _tblFilesMetaInfo: "",
                    _tblFilesInfo1: tblFilesInfo1,
                    _tblFilesInfo2: tblFilesInfo2,
                    _tblFilesInfo3: tblFilesInfo3,
                    _tblFilesInfo4: tblFilesInfo4,
                    _tblFilesInfo5: tblFilesInfo5,
                    _tblFilesInfoSmall1: tblFilesInfoSmall1,
                    _tblFilesInfoSmall2: tblFilesInfoSmall2,
                    _tblFilesInfoSmall3: tblFilesInfoSmall3,
                    _tblFilesInfoSmall4: tblFilesInfoSmall4,
                    _tblFilesInfoSmall5: tblFilesInfoSmall5,
                    _tblFilesNumber1: tblFilesNumber1,
                    _tblFilesNumber2: tblFilesNumber2,
                    _tblFilesNumber3: tblFilesNumber3,
                    _tblFilesNumber4: tblFilesNumber4,
                    _tblFilesNumber5: tblFilesNumber5,
                    _tblFilesNumberSmall1: tblFilesNumberSmall1,
                    _tblFilesNumberSmall2: tblFilesNumberSmall2,
                    _tblFilesNumberSmall3: tblFilesNumberSmall3,
                    _tblFilesNumberSmall4: tblFilesNumberSmall4,
                    _tblFilesNumberSmall5: tblFilesNumberSmall5,
                    _tblFilesDate1: tblFilesDate1,
                    _tblFilesDate2: tblFilesDate2,
                    _tblFilesDate3: tblFilesDate3,
                    _tblFilesDate4: tblFilesDate4,
                    _tblFilesDate5: tblFilesDate5,
                    _tblFilesFile: tblFilesFile,
                    _tblFilesFileSize: tblFilesFileSize,
                    _tblFilesFileDuration: tblFilesFileDuration,
                    _tblFilesFileDimensions: tblFilesFileDimensions,
                    _tblFilesFileOriginalName: tblFilesFileOriginalName,
                    _tblFilesFileThumbnail: tblFilesFileThumbnail,
                    _tblFilesFile1: tblFilesImageFile1,
                    _tblFilesFile2: tblFilesImageFile2,
                    _tblFilesFile3: tblFilesImageFile3,
                    _tblFilesFile4: tblFilesImageFile4,
                    _tblFilesFile5: tblFilesImageFile5,
                    _tblFilesActivation: tblFilesActivation,
                    _tblFilesActivation1: tblFilesActivation1,
                    _tblFilesActivation2: tblFilesActivation2,
                    _tblFilesActivation3: tblFilesActivation3,
                    _tblFilesActivation4: tblFilesActivation4,
                    _tblFilesActivation5: tblFilesActivation5,
                    _tblFilesNotes: tblFilesNotes
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
            if(fileUpdateResult == true)
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