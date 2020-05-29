"use strict";

//Import Node Modules.
//----------------------
const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

const formidable = require("formidable"); //Form file upload.
//----------------------


//Backend - Categories - get.
//**************************************************************************************
//app.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/:idParent?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/:idParent?", (req, res)=>{ //working, with the async block
    //app.get("/system/categories", async (req, res)=>{ //working
    //Import objects.
    //----------------------
    //const CategoriesListing = require("./" + gSystemConfig.configDirectorySystem + "/categories-listing.js");
    const CategoriesListing = require("../" + gSystemConfig.configDirectorySystem + "/categories-listing.js");
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
    let clBackend;
    let idParent = "";
    let pageNumber = "";
    let masterPageSelect = "layout-backend-main";

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
    if(req.query.pageNumber)
    {
        pageNumber = req.query.pageNumber;
    }
    if(req.query.masterPageSelect)
    {
        masterPageSelect = req.query.masterPageSelect;
    }

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
            clBackend = new CategoriesListing({
                idParent: idParent,
                pageNumber: pageNumber,
                masterPageSelect: masterPageSelect,

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
                additianalData: {}
            });


            //Resize images.
            //sharp(gSystemConfig.configDirectoryFilesUpload + "\\" + o444.jpg)
            /*
            sharp("app_files_public/o444.jpg")
            .resize(200)
            .toFile("app_files_public/t444.jpg", (resizeError)=>{
                if(resizeError)
                {
                    //Error.
                    console.log("Resize file error.");
                }else{
                    console.log("Resize file success.");
                }
            });
            */
            //await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrDefaultImageSize, gSystemConfig.configDirectoryFiles, "444.jpg");//working


            /*
            .then((data)=>{
                fs.writeFileSync('r444.png', data);
            });
            */
            



            //Debug.
            //console.log("idParent = ", idParent);
            //console.log("categoriesListing = ", clBackend);
            


            /*
            //Build object data.
            await clBackend.cphBodyBuild().then(()=>{
            //await clBackend.then(()=>{
                //Debug.
                console.log("categoriesListing = ", clBackend);


                //Render data with template.
                res.render("layout-backend-main", {
                    templateData: clBackend,
                    additianalData: {}
                });
            });
            */

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


//Backend - Categories - get.
//**************************************************************************************
//app.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/:idParent?", (req, res)=>{ //working, with the async block
router.get("../" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/:idParent?", (req, res)=>{ //working, with the async block
    //app.get("/system/categories", async (req, res)=>{ //working
    //Import objects.
    //----------------------
    const CategoriesListing = require("./" + gSystemConfig.configDirectorySystem + "/categories-listing.js");
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
    let clBackend;
    let idParent = "";
    let pageNumber = "";
    let masterPageSelect = "layout-backend-main";

    let messageSuccess = "";
    let messageError = "";
    let messageAlert = "";
    //----------------------


    //Value definition.
    //----------------------
    if(req.params.idParent)
    {
        idParent = req.params.idParent;
    }
    if(req.query.pageNumber)
    {
        pageNumber = req.query.pageNumber;
    }
    if(req.query.masterPageSelect)
    {
        masterPageSelect = req.query.masterPageSelect;
    }

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
            //clBackend = await new CategoriesListing();
            //clBackend = new CategoriesListing(); //working
            clBackend = new CategoriesListing({
                idParent: idParent,
                pageNumber: pageNumber,
                masterPageSelect: masterPageSelect,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert
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
                additianalData: {}
            });


            //Resize images.
            //sharp(gSystemConfig.configDirectoryFilesUpload + "\\" + o444.jpg)
            /*
            sharp("app_files_public/o444.jpg")
            .resize(200)
            .toFile("app_files_public/t444.jpg", (resizeError)=>{
                if(resizeError)
                {
                    //Error.
                    console.log("Resize file error.");
                }else{
                    console.log("Resize file success.");
                }
            });
            */
            //await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrDefaultImageSize, gSystemConfig.configDirectoryFiles, "444.jpg");//working


            /*
            .then((data)=>{
                fs.writeFileSync('r444.png', data);
            });
            */
            



            //Debug.
            //console.log("idParent = ", idParent);
            //console.log("categoriesListing = ", clBackend);
            


            /*
            //Build object data.
            await clBackend.cphBodyBuild().then(()=>{
            //await clBackend.then(()=>{
                //Debug.
                console.log("categoriesListing = ", clBackend);


                //Render data with template.
                res.render("layout-backend-main", {
                    templateData: clBackend,
                    additianalData: {}
                });
            });
            */

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


//Backend - Categories - post (insert record).
//**************************************************************************************
//app.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories, urlencodedParser, (req, res)=>
//app.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories, (req, res)=>
router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories, (req, res)=>
{
    //Variables
    //----------------------
    /*(without enctype="multipart/form-data")
    let tblCategoriesID = "";
    let tblCategoriesIdParent = req.body.idParent;
    let tblCategoriesSortOrder = req.body.sort_order;
    let tblCategoriesCategoryType = req.body.category_type; 

    let tblCategoriesTitle = req.body.title;
    let tblCategoriesDescription = req.body.description;

    let tblCategoriesURLAlias = req.body.url_alias;
    let tblCategoriesKeywordsTags = req.body.keywords_tags;
    let tblCategoriesMetaDescription = req.body.meta_description;
    let tblCategoriesMetaTitle = req.body.meta_title;

    let tblCategoriesImageMain = req.body.image_main;
    let tblCategoriesActivation = req.body.activation;

    let idParent = req.body.idParent;
    let pageNumber = req.body.pageNumber;
    let masterPageSelect = req.body.masterPageSelect;

    let returnURL = "";
    */

    let tblCategoriesID = "";
    let tblCategoriesIdParent = "";
    let tblCategoriesSortOrder = 0;
    let tblCategoriesCategoryType = ""; 

    let tblCategoriesTitle = "";
    let tblCategoriesDescription = "";

    let tblCategoriesURLAlias = "";
    let tblCategoriesKeywordsTags = "";
    let tblCategoriesMetaDescription = "";
    let tblCategoriesMetaTitle = "";

    let tblCategoriesInfo1 = "";
    let tblCategoriesInfo2 = "";
    let tblCategoriesInfo3 = "";
    let tblCategoriesInfo4 = "";
    let tblCategoriesInfo5 = "";
    let tblCategoriesInfo6 = "";
    let tblCategoriesInfo7 = "";
    let tblCategoriesInfo8 = "";
    let tblCategoriesInfo9 = "";
    let tblCategoriesInfo10 = "";

    let tblCategoriesInfoSmall1 = "";
    let tblCategoriesInfoSmall2 = "";
    let tblCategoriesInfoSmall3 = "";
    let tblCategoriesInfoSmall4 = "";
    let tblCategoriesInfoSmall5 = "";

    let tblCategoriesNumber1 = 0;
    let tblCategoriesNumber2 = 0;
    let tblCategoriesNumber3 = 0;
    let tblCategoriesNumber4 = 0;
    let tblCategoriesNumber5 = 0;

    let tblCategoriesNumberSmall1 = 0;
    let tblCategoriesNumberSmall2 = 0;
    let tblCategoriesNumberSmall3 = 0;
    let tblCategoriesNumberSmall4 = 0;
    let tblCategoriesNumberSmall5 = 0;

    let tblCategoriesDate1 = "", tblCategoriesDate1Hour = "", tblCategoriesDate1Minute = "", tblCategoriesDate1Seconds = "", tblCategoriesDate1Day = "", tblCategoriesDate1Month = "", tblCategoriesDate1Year = "";
    /*let tblCategoriesDate1Hour = "";
    let tblCategoriesDate1Minute = "";
    let tblCategoriesDate1Seconds = "";
    let tblCategoriesDate1Day = "";
    let tblCategoriesDate1Month = "";
    let tblCategoriesDate1Year = "";*/
    let tblCategoriesDate2 = "", tblCategoriesDate2Hour = "", tblCategoriesDate2Minute = "", tblCategoriesDate2Seconds = "", tblCategoriesDate2Day = "", tblCategoriesDate2Month = "", tblCategoriesDate2Year = "";
    let tblCategoriesDate3 = "", tblCategoriesDate3Hour = "", tblCategoriesDate3Minute = "", tblCategoriesDate3Seconds = "", tblCategoriesDate3Day = "", tblCategoriesDate3Month = "", tblCategoriesDate3Year = "";
    let tblCategoriesDate4 = "", tblCategoriesDate4Hour = "", tblCategoriesDate4Minute = "", tblCategoriesDate4Seconds = "", tblCategoriesDate4Day = "", tblCategoriesDate4Month = "", tblCategoriesDate4Year = "";
    let tblCategoriesDate5 = "", tblCategoriesDate5Hour = "", tblCategoriesDate5Minute = "", tblCategoriesDate5Seconds = "", tblCategoriesDate5Day = "", tblCategoriesDate5Month = "", tblCategoriesDate5Year = "";

    let tblCategoriesImageMain = "";
    let tblCategoriesImageFile1 = "";
    let tblCategoriesImageFile2 = "";
    let tblCategoriesImageFile3 = "";
    let tblCategoriesImageFile4 = "";
    let tblCategoriesImageFile5 = "";

    let tblCategoriesActivation = "";
    let tblCategoriesActivation1 = "";
    let tblCategoriesActivation2 = "";
    let tblCategoriesActivation3 = "";
    let tblCategoriesActivation4 = "";
    let tblCategoriesActivation5 = "";

    let tblCategoriesIdStatus = "";
    let tblCategoriesRestrictedAccess = "";

    let tblCategoriesNotes = "";

    let idParent = "";
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
            tblCategoriesID = await new Promise((resolve, reject)=>{
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

                            //Define values for posted data.
                            fieldsPost = fields;
                            filesPost = files;

                            //console.log("formParseResults.files.image_main=", formParseResults.files.image_main);

                            //resolve({fields: fields, files: files}); //working
                        }
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
                        if(gSystemConfig.enableCategoriesImageMain == 1){
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

                        //file1 field.
                        if(gSystemConfig.enableCategoriesFile1 == 1){
                            if(filesPost.hasOwnProperty("file1") === true)
                            {
                                formfileFieldsReference.file1 = {};
                                formfileFieldsReference.file1.originalFileName = filesPost.file1.name;
                                formfileFieldsReference.file1.fileSize = filesPost.file1.size;
                                formfileFieldsReference.file1.temporaryFilePath = filesPost.file1.path;
                                formfileFieldsReference.file1.fileNamePrefix = "f1";
                                formfileFieldsReference.file1.fileNameSufix = "";
                                formfileFieldsReference.file1.fileDirectoryUpload = "";
                            }
                        }

                        //file2 field.
                        if(gSystemConfig.enableCategoriesFile2 == 1){
                            if(filesPost.hasOwnProperty("file2") === true)
                            {
                                formfileFieldsReference.file2 = {};
                                formfileFieldsReference.file2.originalFileName = filesPost.file2.name;
                                formfileFieldsReference.file2.fileSize = filesPost.file2.size;
                                formfileFieldsReference.file2.temporaryFilePath = filesPost.file2.path;
                                formfileFieldsReference.file2.fileNamePrefix = "f2";
                                formfileFieldsReference.file2.fileNameSufix = "";
                                formfileFieldsReference.file2.fileDirectoryUpload = "";
                            }
                        }

                        //file3 field.
                        if(gSystemConfig.enableCategoriesFile3 == 1){
                            if(filesPost.hasOwnProperty("file3") === true)
                            {
                                formfileFieldsReference.file3 = {};
                                formfileFieldsReference.file3.originalFileName = filesPost.file3.name;
                                formfileFieldsReference.file3.fileSize = filesPost.file3.size;
                                formfileFieldsReference.file3.temporaryFilePath = filesPost.file3.path;
                                formfileFieldsReference.file3.fileNamePrefix = "f3";
                                formfileFieldsReference.file3.fileNameSufix = "";
                                formfileFieldsReference.file3.fileDirectoryUpload = "";
                            }
                        }

                        //file4 field.
                        if(gSystemConfig.enableCategoriesFile4 == 1){
                            if(filesPost.hasOwnProperty("file4") === true)
                            {
                                formfileFieldsReference.file4 = {};
                                formfileFieldsReference.file4.originalFileName = filesPost.file4.name;
                                formfileFieldsReference.file4.fileSize = filesPost.file4.size;
                                formfileFieldsReference.file4.temporaryFilePath = filesPost.file4.path;
                                formfileFieldsReference.file4.fileNamePrefix = "f4";
                                formfileFieldsReference.file4.fileNameSufix = "";
                                formfileFieldsReference.file4.fileDirectoryUpload = "";
                            }
                        }

                        //file5 field.
                        if(gSystemConfig.enableCategoriesFile5 == 1){
                            if(filesPost.hasOwnProperty("file5") === true)
                            {
                                formfileFieldsReference.file5 = {};
                                formfileFieldsReference.file5.originalFileName = filesPost.file5.name;
                                formfileFieldsReference.file5.fileSize = filesPost.file5.size;
                                formfileFieldsReference.file5.temporaryFilePath = filesPost.file5.path;
                                formfileFieldsReference.file5.fileNamePrefix = "f5";
                                formfileFieldsReference.file5.fileNameSufix = "";
                                formfileFieldsReference.file5.fileDirectoryUpload = "";
                            }
                        }


                        /**/
                        //var resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                        resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                            /*SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                                                                    this.openedFiles, 
                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                    "")*/
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblCategoriesID, 
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

                        
                        /**/
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            //tblCategoriesImageMain = resultsFunctionsFiles.returnFileName;
                            //if(resultsFunctionsFiles.hasOwnProperty("image_main"))
                            //{
                                //tblCategoriesImageMain = resultsFunctionsFiles.image_main;
                            //}
                            tblCategoriesImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblCategoriesImageMain
                            tblCategoriesImageFile1 = (resultsFunctionsFiles.hasOwnProperty("file1") === true) ? resultsFunctionsFiles.file1 : tblCategoriesImageFile1
                            tblCategoriesImageFile2 = (resultsFunctionsFiles.hasOwnProperty("file2") === true) ? resultsFunctionsFiles.file2 : tblCategoriesImageFile2
                            tblCategoriesImageFile3 = (resultsFunctionsFiles.hasOwnProperty("file3") === true) ? resultsFunctionsFiles.file3 : tblCategoriesImageFile3
                            tblCategoriesImageFile4 = (resultsFunctionsFiles.hasOwnProperty("file4") === true) ? resultsFunctionsFiles.file4 : tblCategoriesImageFile4
                            tblCategoriesImageFile5 = (resultsFunctionsFiles.hasOwnProperty("file5") === true) ? resultsFunctionsFiles.file5 : tblCategoriesImageFile5


                            //Resize images.
                            if(tblCategoriesImageMain !== "")
                            {
                                //resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrDefaultImageSize, gSystemConfig.configDirectoryFiles, tblCategoriesImageMain);
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrCategoriesImageSize, gSystemConfig.configDirectoryFiles, tblCategoriesImageMain);
                            }
                            if(tblCategoriesImageFile1 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrCategoriesImageSize, gSystemConfig.configDirectoryFiles, tblCategoriesImageFile1);
                            }
                            if(tblCategoriesImageFile2 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrCategoriesImageSize, gSystemConfig.configDirectoryFiles, tblCategoriesImageFile2);
                            }
                            if(tblCategoriesImageFile3 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrCategoriesImageSize, gSystemConfig.configDirectoryFiles, tblCategoriesImageFile3);
                            }
                            if(tblCategoriesImageFile4 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrCategoriesImageSize, gSystemConfig.configDirectoryFiles, tblCategoriesImageFile4);
                            }
                            if(tblCategoriesImageFile5 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrCategoriesImageSize, gSystemConfig.configDirectoryFiles, tblCategoriesImageFile5);
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
            tblCategoriesIdParent = formParseResults.fields.id_parent;
            tblCategoriesSortOrder = formParseResults.fields.sort_order;
            tblCategoriesCategoryType = formParseResults.fields.category_type; 

            tblCategoriesTitle = formParseResults.fields.title;
            tblCategoriesDescription = formParseResults.fields.description;

            tblCategoriesURLAlias = formParseResults.fields.url_alias;
            tblCategoriesKeywordsTags = formParseResults.fields.keywords_tags;
            tblCategoriesMetaDescription = formParseResults.fields.meta_description;
            tblCategoriesMetaTitle = formParseResults.fields.meta_title;

            tblCategoriesInfo1 = formParseResults.fields.info1;
            tblCategoriesInfo2 = formParseResults.fields.info2;
            tblCategoriesInfo3 = formParseResults.fields.info3;
            tblCategoriesInfo4 = formParseResults.fields.info4;
            tblCategoriesInfo5 = formParseResults.fields.info5;
            tblCategoriesInfo6 = formParseResults.fields.info6;
            tblCategoriesInfo7 = formParseResults.fields.info7;
            tblCategoriesInfo8 = formParseResults.fields.info8;
            tblCategoriesInfo9 = formParseResults.fields.info9;
            tblCategoriesInfo10 = formParseResults.fields.info10;

            tblCategoriesInfoSmall1 = formParseResults.fields.info_small1;
            tblCategoriesInfoSmall2 = formParseResults.fields.info_small2;
            tblCategoriesInfoSmall3 = formParseResults.fields.info_small3;
            tblCategoriesInfoSmall4 = formParseResults.fields.info_small4;
            tblCategoriesInfoSmall5 = formParseResults.fields.info_small5;
            
            tblCategoriesNumber1 = formParseResults.fields.number1;
            //console.log("tblCategoriesNumber1(inside app)=", tblCategoriesNumber1);
            tblCategoriesNumber2 = formParseResults.fields.number2;
            tblCategoriesNumber3 = formParseResults.fields.number3;
            tblCategoriesNumber4 = formParseResults.fields.number4;
            tblCategoriesNumber5 = formParseResults.fields.number5;
            
            tblCategoriesNumberSmall1 = formParseResults.fields.number_small1;
            tblCategoriesNumberSmall2 = formParseResults.fields.number_small2;
            tblCategoriesNumberSmall3 = formParseResults.fields.number_small3;
            tblCategoriesNumberSmall4 = formParseResults.fields.number_small4;
            tblCategoriesNumberSmall5 = formParseResults.fields.number_small5;

            tblCategoriesDate1 = formParseResults.fields.date1;
            tblCategoriesDate1Hour = formParseResults.fields.date1_hour;
            tblCategoriesDate1Minute = formParseResults.fields.date1_minute;
            tblCategoriesDate1Seconds = formParseResults.fields.date1_seconds;
            tblCategoriesDate1Day = formParseResults.fields.date1_day;
            tblCategoriesDate1Month = formParseResults.fields.date1_month;
            tblCategoriesDate1Year = formParseResults.fields.date1_year;
            //Mount.
            tblCategoriesDate1 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblCategoriesDate1,
                                                                            dateFieldDay: tblCategoriesDate1Day,
                                                                            dateFieldMonth: tblCategoriesDate1Month,
                                                                            dateFieldYear: tblCategoriesDate1Year,
                                                                            dateFieldHour: tblCategoriesDate1Hour,
                                                                            dateFieldMinute: tblCategoriesDate1Minute,
                                                                            dateFieldSeconds: tblCategoriesDate1Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");/**/
            /*
            console.log("tblCategoriesDate1=", tblCategoriesDate1);
            console.log("dateMount=", SyncSystemNS.FunctionsGeneric.dateMount({
                                                                                dateField: tblCategoriesDate1,
                                                                                dateFieldDay: tblCategoriesDate1Day,
                                                                                dateFieldMonth: tblCategoriesDate1Month,
                                                                                dateFieldYear: tblCategoriesDate1Year,
                                                                                dateFieldHour: tblCategoriesDate1Hour,
                                                                                dateFieldMinute: tblCategoriesDate1Minute,
                                                                                dateFieldSeconds: tblCategoriesDate1Seconds
                                                                            },  
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            ""));
            */
            
            tblCategoriesDate2 = formParseResults.fields.date2;
            tblCategoriesDate2Hour = formParseResults.fields.date2_hour;
            tblCategoriesDate2Minute = formParseResults.fields.date2_minute;
            tblCategoriesDate2Seconds = formParseResults.fields.date2_seconds;
            tblCategoriesDate2Day = formParseResults.fields.date2_day;
            tblCategoriesDate2Month = formParseResults.fields.date2_month;
            tblCategoriesDate2Year = formParseResults.fields.date2_year;
            //Mount.
            tblCategoriesDate2 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblCategoriesDate2,
                                                                            dateFieldDay: tblCategoriesDate2Day,
                                                                            dateFieldMonth: tblCategoriesDate2Month,
                                                                            dateFieldYear: tblCategoriesDate2Year,
                                                                            dateFieldHour: tblCategoriesDate2Hour,
                                                                            dateFieldMinute: tblCategoriesDate2Minute,
                                                                            dateFieldSeconds: tblCategoriesDate2Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblCategoriesDate3 = formParseResults.fields.date3;
            tblCategoriesDate3Hour = formParseResults.fields.date3_hour;
            tblCategoriesDate3Minute = formParseResults.fields.date3_minute;
            tblCategoriesDate3Seconds = formParseResults.fields.date3_seconds;
            tblCategoriesDate3Day = formParseResults.fields.date3_day;
            tblCategoriesDate3Month = formParseResults.fields.date3_month;
            tblCategoriesDate3Year = formParseResults.fields.date3_year;
            //Mount.
            tblCategoriesDate3 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblCategoriesDate3,
                                                                            dateFieldDay: tblCategoriesDate3Day,
                                                                            dateFieldMonth: tblCategoriesDate3Month,
                                                                            dateFieldYear: tblCategoriesDate3Year,
                                                                            dateFieldHour: tblCategoriesDate3Hour,
                                                                            dateFieldMinute: tblCategoriesDate3Minute,
                                                                            dateFieldSeconds: tblCategoriesDate3Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblCategoriesDate4 = formParseResults.fields.date4;
            tblCategoriesDate4Hour = formParseResults.fields.date4_hour;
            tblCategoriesDate4Minute = formParseResults.fields.date4_minute;
            tblCategoriesDate4Seconds = formParseResults.fields.date4_seconds;
            tblCategoriesDate4Day = formParseResults.fields.date4_day;
            tblCategoriesDate4Month = formParseResults.fields.date4_month;
            tblCategoriesDate4Year = formParseResults.fields.date4_year;
            //Mount.
            tblCategoriesDate4 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblCategoriesDate4,
                                                                            dateFieldDay: tblCategoriesDate4Day,
                                                                            dateFieldMonth: tblCategoriesDate4Month,
                                                                            dateFieldYear: tblCategoriesDate4Year,
                                                                            dateFieldHour: tblCategoriesDate4Hour,
                                                                            dateFieldMinute: tblCategoriesDate4Minute,
                                                                            dateFieldSeconds: tblCategoriesDate4Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblCategoriesDate5 = formParseResults.fields.date5;
            tblCategoriesDate5Hour = formParseResults.fields.date5_hour;
            tblCategoriesDate5Minute = formParseResults.fields.date5_minute;
            tblCategoriesDate5Seconds = formParseResults.fields.date5_seconds;
            tblCategoriesDate5Day = formParseResults.fields.date5_day;
            tblCategoriesDate5Month = formParseResults.fields.date5_month;
            tblCategoriesDate5Year = formParseResults.fields.date5_year;
            //Mount.
            tblCategoriesDate5 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblCategoriesDate5,
                                                                            dateFieldDay: tblCategoriesDate5Day,
                                                                            dateFieldMonth: tblCategoriesDate5Month,
                                                                            dateFieldYear: tblCategoriesDate5Year,
                                                                            dateFieldHour: tblCategoriesDate5Hour,
                                                                            dateFieldMinute: tblCategoriesDate5Minute,
                                                                            dateFieldSeconds: tblCategoriesDate5Seconds
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

            tblCategoriesActivation = formParseResults.fields.activation;
            tblCategoriesActivation1 = formParseResults.fields.activation1;
            tblCategoriesActivation2 = formParseResults.fields.activation2;
            tblCategoriesActivation3 = formParseResults.fields.activation3;
            tblCategoriesActivation4 = formParseResults.fields.activation4;
            tblCategoriesActivation5 = formParseResults.fields.activation5;

            tblCategoriesIdStatus = formParseResults.fields.id_status;
            tblCategoriesRestrictedAccess = formParseResults.fields.restricted_access

            tblCategoriesNotes = formParseResults.fields.notes

            idParent = formParseResults.fields.idParent;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //File handling.
            //----------------------

            //Delete file.
            //fs.unlink(gSystemConfig.configDirectoryFilesUpload + "/", ()=>{
            /*fs.unlink(formParseResults.files.image_main.path, (fileDeleError)=>{
                if(fileDeleError)
                {
                    console.log("File deleting error: ", fileDeleError);
                    throw fileDeleError;
                }else{
                    console.log("File deleting sucess:");
                }
            });*/

            //Debug.
            //console.log("formParseResults=", formParseResults);
            //console.log("formParseResults.files.image_main.path=", formParseResults.files.image_main.path);
            //console.log("fileExtension=", fileExtension);
            //----------------------


            //Insert record.
            /*
            let categoriesInsertResult = await SyncSystemNS.FunctionsDBInsert.categoriesInsert_async({
                _tblCategoriesID: tblCategoriesID,
                _tblCategoriesIdParent: tblCategoriesIdParent,
                _tblCategoriesSortOrder: tblCategoriesSortOrder,
                _tblCategoriesCategoryType: tblCategoriesCategoryType,
                _tblCategoriesDateCreation: "",
                _tblCategoriesDateTimezone: "",
                _tblCategoriesDateEdit: "",
                _tblCategoriesIdRegisterUser: "0",
                _tblCategoriesIdRegister1: "0",
                _tblCategoriesIdRegister2: "0",
                _tblCategoriesIdRegister3: "0",
                _tblCategoriesIdRegister4: "0",
                _tblCategoriesIdRegister5: "0",
                _tblCategoriesTitle: tblCategoriesTitle,
                _tblCategoriesDescription: tblCategoriesDescription,
                _tblCategoriesURLAlias: tblCategoriesURLAlias,
                _tblCategoriesKeywordsTags: tblCategoriesKeywordsTags,
                _tblCategoriesMetaDescription: tblCategoriesMetaDescription,
                _tblCategoriesMetaTitle: tblCategoriesMetaTitle,
                _tblCategoriesMetaInfo: "",
                _tblCategoriesInfo1: "",
                _tblCategoriesInfo2: "",
                _tblCategoriesInfo3: "",
                _tblCategoriesInfo4: "",
                _tblCategoriesInfo5: "",
                _tblCategoriesInfo6: "",
                _tblCategoriesInfo7: "",
                _tblCategoriesInfo8: "",
                _tblCategoriesInfo9: "",
                _tblCategoriesInfo10: "",
                _tblCategoriesInfoSmall1: "",
                _tblCategoriesInfoSmall2: "",
                _tblCategoriesInfoSmall3: "",
                _tblCategoriesInfoSmall4: "",
                _tblCategoriesInfoSmall5: "",
                _tblCategoriesNumber1: "",
                _tblCategoriesNumber2: "",
                _tblCategoriesNumber3: "",
                _tblCategoriesNumber4: "",
                _tblCategoriesNumber5: "",
                _tblCategoriesNumberSmall1: "",
                _tblCategoriesNumberSmall2: "",
                _tblCategoriesNumberSmall3: "",
                _tblCategoriesNumberSmall4: "",
                _tblCategoriesNumberSmall5: "",
                _tblCategoriesDate1: "",
                _tblCategoriesDate2: "",
                _tblCategoriesDate3: "",
                _tblCategoriesDate4: "",
                _tblCategoriesDate5: "",
                _tblCategoriesIdItem1: "",
                _tblCategoriesIdItem2: "",
                _tblCategoriesIdItem3: "",
                _tblCategoriesIdItem4: "",
                _tblCategoriesIdItem5: "",
                _tblCategoriesImageMain: tblCategoriesImageMain,
                _tblCategoriesFile1: "",
                _tblCategoriesFile2: "",
                _tblCategoriesFile3: "",
                _tblCategoriesFile4: "",
                _tblCategoriesFile5: "",
                _tblCategoriesActivation: tblCategoriesActivation,
                _tblCategoriesActivation1: "0",
                _tblCategoriesActivation2: "0",
                _tblCategoriesActivation3: "0",
                _tblCategoriesActivation4: "0",
                _tblCategoriesActivation5: "0",
                _tblCategoriesIdStatus: "0",
                _tblCategoriesRestrictedAccess: "0",
                _tblCategoriesNotes: ""
            });
            */

            let categoriesInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.categoriesInsert_async({
                    _tblCategoriesID: tblCategoriesID,
                    _tblCategoriesIdParent: tblCategoriesIdParent,
                    _tblCategoriesSortOrder: tblCategoriesSortOrder,
                    _tblCategoriesCategoryType: tblCategoriesCategoryType,
                    _tblCategoriesDateCreation: "",
                    _tblCategoriesDateTimezone: "",
                    _tblCategoriesDateEdit: "",
                    _tblCategoriesIdRegisterUser: "0",
                    _tblCategoriesIdRegister1: "0",
                    _tblCategoriesIdRegister2: "0",
                    _tblCategoriesIdRegister3: "0",
                    _tblCategoriesIdRegister4: "0",
                    _tblCategoriesIdRegister5: "0",
                    _tblCategoriesTitle: tblCategoriesTitle,
                    _tblCategoriesDescription: tblCategoriesDescription,
                    _tblCategoriesURLAlias: tblCategoriesURLAlias,
                    _tblCategoriesKeywordsTags: tblCategoriesKeywordsTags,
                    _tblCategoriesMetaDescription: tblCategoriesMetaDescription,
                    _tblCategoriesMetaTitle: tblCategoriesMetaTitle,
                    _tblCategoriesMetaInfo: "",
                    _tblCategoriesInfo1: tblCategoriesInfo1,
                    _tblCategoriesInfo2: tblCategoriesInfo2,
                    _tblCategoriesInfo3: tblCategoriesInfo3,
                    _tblCategoriesInfo4: tblCategoriesInfo4,
                    _tblCategoriesInfo5: tblCategoriesInfo5,
                    _tblCategoriesInfo6: tblCategoriesInfo6,
                    _tblCategoriesInfo7: tblCategoriesInfo7,
                    _tblCategoriesInfo8: tblCategoriesInfo8,
                    _tblCategoriesInfo9: tblCategoriesInfo9,
                    _tblCategoriesInfo10: tblCategoriesInfo10,
                    _tblCategoriesInfoSmall1: tblCategoriesInfoSmall1,
                    _tblCategoriesInfoSmall2: tblCategoriesInfoSmall2,
                    _tblCategoriesInfoSmall3: tblCategoriesInfoSmall3,
                    _tblCategoriesInfoSmall4: tblCategoriesInfoSmall4,
                    _tblCategoriesInfoSmall5: tblCategoriesInfoSmall5,
                    _tblCategoriesNumber1: tblCategoriesNumber1,
                    _tblCategoriesNumber2: tblCategoriesNumber2,
                    _tblCategoriesNumber3: tblCategoriesNumber3,
                    _tblCategoriesNumber4: tblCategoriesNumber4,
                    _tblCategoriesNumber5: tblCategoriesNumber5,
                    _tblCategoriesNumberSmall1: tblCategoriesNumberSmall1,
                    _tblCategoriesNumberSmall2: tblCategoriesNumberSmall2,
                    _tblCategoriesNumberSmall3: tblCategoriesNumberSmall3,
                    _tblCategoriesNumberSmall4: tblCategoriesNumberSmall4,
                    _tblCategoriesNumberSmall5: tblCategoriesNumberSmall5,
                    _tblCategoriesDate1: tblCategoriesDate1,
                    _tblCategoriesDate2: tblCategoriesDate2,
                    _tblCategoriesDate3: tblCategoriesDate3,
                    _tblCategoriesDate4: tblCategoriesDate4,
                    _tblCategoriesDate5: tblCategoriesDate5,
                    _tblCategoriesIdItem1: "",
                    _tblCategoriesIdItem2: "",
                    _tblCategoriesIdItem3: "",
                    _tblCategoriesIdItem4: "",
                    _tblCategoriesIdItem5: "",
                    _tblCategoriesImageMain: tblCategoriesImageMain,
                    _tblCategoriesFile1: tblCategoriesImageFile1,
                    _tblCategoriesFile2: tblCategoriesImageFile2,
                    _tblCategoriesFile3: tblCategoriesImageFile3,
                    _tblCategoriesFile4: tblCategoriesImageFile4,
                    _tblCategoriesFile5: tblCategoriesImageFile5,
                    _tblCategoriesActivation: tblCategoriesActivation,
                    _tblCategoriesActivation1: tblCategoriesActivation1,
                    _tblCategoriesActivation2: tblCategoriesActivation2,
                    _tblCategoriesActivation3: tblCategoriesActivation3,
                    _tblCategoriesActivation4: tblCategoriesActivation4,
                    _tblCategoriesActivation5: tblCategoriesActivation5,
                    _tblCategoriesIdStatus: tblCategoriesIdStatus,
                    _tblCategoriesRestrictedAccess: tblCategoriesRestrictedAccess,
                    _tblCategoriesNotes: tblCategoriesNotes
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


            //Success.
            if(categoriesInsertResult == true)
            {
                returnURL += "&messageSuccess=statusMessage2";


                //Redirect.
                //res.redirect("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" + idParent);
                //res.redirect(returnURL);


                //Debug.
                //console.log("tblCategoriesImageMain(categoriesInsertResult)=", tblCategoriesImageMain);
            }


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



//Backend - Categories - get.
//**************************************************************************************
//app.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/:idParent?", (req, res)=>{ //working, with the async block
//router.delete("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/delete/", (req, res)=>{ //working, with the async block
router.delete("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories, (req, res)=>{ //working, with the async block
    //router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/delete", (req, res)=>{ //working, with the async block
    
    //Variables.
    //----------------------
    let strTable = "";
    
    //let clBackend = new CategoriesListing();
    //let clBackend;
    let idParent = "";
    let pageReturn = "";
    let pageNumber = "";
    let masterPageSelect = "layout-backend-main";
    
    let messageSuccess = "";
    let messageError = "";
    let messageAlert = "";

    let idsRecordsDelete = [];
    //let arrIdsRecordsDelete = [];

    let deleteRecordsGeneric10Result;
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
    //----------------------


    //Return URL build.
    //----------------------
    returnURL = "/" + pageReturn + "/" + idParent;
    returnURL += "?masterPageSelect=" + masterPageSelect;
    if(pageNumber)
    {
        returnURL += "&pageNumber=" + pageNumber;
    }
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            if(idsRecordsDelete)
            {
                //let deleteRecordsGeneric10Result = await SyncSystemNS.FunctionsDBDelete.deleteRecordsGeneric10("categories", ["id;648;i"]); //worked
                //let deleteRecordsGeneric10Result = await SyncSystemNS.FunctionsDBDelete.deleteRecordsGeneric10("categories", ["id;649,650;ids"]);
                deleteRecordsGeneric10Result = await SyncSystemNS.FunctionsDBDelete.deleteRecordsGeneric10("categories", ["id;"+ idsRecordsDelete.join(",") + ";ids"]);
            }else{
                deleteRecordsGeneric10Result = {returnStatus: false, nRecords: 0}
            }
            
            //Debug.
            console.log("deleteRecordsGeneric10Result=", deleteRecordsGeneric10Result);
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
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
            console.log("idsRecordsDelete=", idsRecordsDelete);
            //console.log("arrIdsRecordsDelete=", arrIdsRecordsDelete);
            //res.send(req.params.id);

            console.log("idParent=", idParent);
            console.log("pageNumber=", pageNumber);
            console.log("masterPageSelect=", masterPageSelect);
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
    

//Export.
module.exports = router;