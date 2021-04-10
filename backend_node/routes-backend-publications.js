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


//Backend - Publications - listing - GET.
//**************************************************************************************
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendPublications + "/:idParent?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const PublicationsListing = require("../" + gSystemConfig.configDirectorySystem + "/publications-listing.js");
    //----------------------


    //Variables.
    //----------------------
    let plBackend;
    let idParent = "";

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
            plBackend = new PublicationsListing({
                idParent: idParent,
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
            //await plBackend.cphBodyBuild(); //working
            await plBackend.build();
            
            //Render data with template.
            //gSystemConfig: gSystemConfig, //moved to locals
            //res.render("layout-backend-main", {
            res.render(masterPageSelect, {
                templateData: plBackend,
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


//Backend - Publications - POST (insert record).
//**************************************************************************************
router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendPublications, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{
    //Variables
    //----------------------
    let tblPublicationsID = "";
    let tblPublicationsIdParent = "";
    let tblPublicationsSortOrder = 0;
    let tblPublicationsIdType = 0; //1 - news | 2 - photo gallery  | 3 - articles | 4 - publications

    let tblPublicationsIdRegisterUser = 0;
    let tblPublicationsIdRegister1 = 0;
    let tblPublicationsIdRegister2 = 0;
    let tblPublicationsIdRegister3 = 0;
    let tblPublicationsIdRegister4 = 0;
    let tblPublicationsIdRegister5 = 0;

    let tblPublicationsDateStart = "", tblPublicationsDateStartHour = "", tblPublicationsDateStartMinute = "", tblPublicationsDateStartSeconds = "", tblPublicationsDateStartDay = "", tblPublicationsDateStartMonth = "", tblPublicationsDateStartYear = "";
    let tblPublicationsDateEnd = "", tblPublicationsDateEndHour = "", tblPublicationsDateEndMinute = "", tblPublicationsDateEndSeconds = "", tblPublicationsDateEndDay = "", tblPublicationsDateEndMonth = "", tblPublicationsDateEndYear = "";
    
    let tblPublicationsTitle = "";
    let tblPublicationsDescription = "";

    let tblPublicationsURLAlias = "";
    let tblPublicationsKeywordsTags = "";
    let tblPublicationsMetaDescription = "";
    let tblPublicationsMetaTitle = "";

    let tblPublicationsInfo1 = "";
    let tblPublicationsInfo2 = "";
    let tblPublicationsInfo3 = "";
    let tblPublicationsInfo4 = "";
    let tblPublicationsInfo5 = "";
    let tblPublicationsInfo6 = "";
    let tblPublicationsInfo7 = "";
    let tblPublicationsInfo8 = "";
    let tblPublicationsInfo9 = "";
    let tblPublicationsInfo10 = "";

    let tblPublicationsSource = "";
    let tblPublicationsSourceURL = "";

    let tblPublicationsNumber1 = 0;
    let tblPublicationsNumber2 = 0;
    let tblPublicationsNumber3 = 0;
    let tblPublicationsNumber4 = 0;
    let tblPublicationsNumber5 = 0;

    let tblPublicationsURL1 = "";
    let tblPublicationsURL2 = "";
    let tblPublicationsURL3 = "";
    let tblPublicationsURL4 = "";
    let tblPublicationsURL5 = "";

    let tblPublicationsDate1 = "", tblPublicationsDate1Hour = "", tblPublicationsDate1Minute = "", tblPublicationsDate1Seconds = "", tblPublicationsDate1Day = "", tblPublicationsDate1Month = "", tblPublicationsDate1Year = "";
    let tblPublicationsDate2 = "", tblPublicationsDate2Hour = "", tblPublicationsDate2Minute = "", tblPublicationsDate2Seconds = "", tblPublicationsDate2Day = "", tblPublicationsDate2Month = "", tblPublicationsDate2Year = "";
    let tblPublicationsDate3 = "", tblPublicationsDate3Hour = "", tblPublicationsDate3Minute = "", tblPublicationsDate3Seconds = "", tblPublicationsDate3Day = "", tblPublicationsDate3Month = "", tblPublicationsDate3Year = "";
    let tblPublicationsDate4 = "", tblPublicationsDate4Hour = "", tblPublicationsDate4Minute = "", tblPublicationsDate4Seconds = "", tblPublicationsDate4Day = "", tblPublicationsDate4Month = "", tblPublicationsDate4Year = "";
    let tblPublicationsDate5 = "", tblPublicationsDate5Hour = "", tblPublicationsDate5Minute = "", tblPublicationsDate5Seconds = "", tblPublicationsDate5Day = "", tblPublicationsDate5Month = "", tblPublicationsDate5Year = "";

    let tblPublicationsImageMain = "";
    let tblPublicationsImageMainCaption = "";
    let tblPublicationsImageFile1 = "";
    let tblPublicationsImageFile2 = "";
    let tblPublicationsImageFile3 = "";
    let tblPublicationsImageFile4 = "";
    let tblPublicationsImageFile5 = "";

    let tblPublicationsActivation = "";
    let tblPublicationsActivation1 = "";
    let tblPublicationsActivation2 = "";
    let tblPublicationsActivation3 = "";
    let tblPublicationsActivation4 = "";
    let tblPublicationsActivation5 = "";

    let tblPublicationsIdStatus = "";
    let tblPublicationsRestrictedAccess = "";

    let tblPublicationsNotes = "";

    let arrIdsPublicationsFiltersGeneric1 = [];
    let arrIdsPublicationsFiltersGeneric2 = [];
    let arrIdsPublicationsFiltersGeneric3 = [];
    let arrIdsPublicationsFiltersGeneric4 = [];
    let arrIdsPublicationsFiltersGeneric5 = [];
    let arrIdsPublicationsFiltersGeneric6 = [];
    let arrIdsPublicationsFiltersGeneric7 = [];
    let arrIdsPublicationsFiltersGeneric8 = [];
    let arrIdsPublicationsFiltersGeneric9 = [];
    let arrIdsPublicationsFiltersGeneric10 = [];

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
            tblPublicationsID = await new Promise((resolve, reject)=>{
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

                        //Array detection.
                        if(gSystemConfig.enablePublicationsFilterGeneric1 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric1")
                            {
                                //fieldsPost.idsPublicationsFiltersGeneric1.push(value);
                                arrIdsPublicationsFiltersGeneric1.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric2 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric2")
                            {
                                arrIdsPublicationsFiltersGeneric2.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric3 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric3")
                            {
                                arrIdsPublicationsFiltersGeneric3.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric4 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric4")
                            {
                                arrIdsPublicationsFiltersGeneric4.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric5 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric5")
                            {
                                arrIdsPublicationsFiltersGeneric5.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric6 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric6")
                            {
                                arrIdsPublicationsFiltersGeneric6.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric7 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric7")
                            {
                                arrIdsPublicationsFiltersGeneric7.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric8 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric8")
                            {
                                arrIdsPublicationsFiltersGeneric8.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric9 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric9")
                            {
                                arrIdsPublicationsFiltersGeneric9.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric10 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric10")
                            {
                                arrIdsPublicationsFiltersGeneric10.push(value);
                            }
                        }
                        

                        /*if (fieldsPost[name]) {
                        if (!Array.isArray(fieldsPost[name])) {
                            fieldsPost[name] = [fieldsPost[name]];
                        }
                        fieldsPost[name].push(value);
                        //arrIdsPublicationsFiltersGeneric1.push(fieldsPost.idsPublicationsFiltersGeneric1);

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
                        //var resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblPublicationsID, 
                        resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblPublicationsID, 
                                                                                                    this.openedFiles, 
                                                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                                                    "");
                        */


                        //Check fields with files.

                        //Build file fields references.
                        //image_main field.
                        if(gSystemConfig.enablePublicationsImageMain == 1)
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

                        //file1 field.
                        if(gSystemConfig.enablePublicationsFile1 == 1)
                        {
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
                        if(gSystemConfig.enablePublicationsFile2 == 1)
                        {
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
                        if(gSystemConfig.enablePublicationsFile3 == 1)
                        {
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
                        if(gSystemConfig.enablePublicationsFile4 == 1)
                        {
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
                        if(gSystemConfig.enablePublicationsFile5 == 1)
                        {
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


                        /**/
                        //var resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                        resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblPublicationsID, 
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
                            tblPublicationsImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblPublicationsImageMain;
                            tblPublicationsImageFile1 = (resultsFunctionsFiles.hasOwnProperty("file1") === true) ? resultsFunctionsFiles.file1 : tblPublicationsImageFile1;
                            tblPublicationsImageFile2 = (resultsFunctionsFiles.hasOwnProperty("file2") === true) ? resultsFunctionsFiles.file2 : tblPublicationsImageFile2;
                            tblPublicationsImageFile3 = (resultsFunctionsFiles.hasOwnProperty("file3") === true) ? resultsFunctionsFiles.file3 : tblPublicationsImageFile3;
                            tblPublicationsImageFile4 = (resultsFunctionsFiles.hasOwnProperty("file4") === true) ? resultsFunctionsFiles.file4 : tblPublicationsImageFile4;
                            tblPublicationsImageFile5 = (resultsFunctionsFiles.hasOwnProperty("file5") === true) ? resultsFunctionsFiles.file5 : tblPublicationsImageFile5;


                            //Resize images.
                            if(tblPublicationsImageMain !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrPublicationsImageSize, gSystemConfig.configDirectoryFiles, tblPublicationsImageMain);
                            }
                            if(tblPublicationsImageFile1 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrPublicationsImageSize, gSystemConfig.configDirectoryFiles, tblPublicationsImageFile1);
                            }
                            if(tblPublicationsImageFile2 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrPublicationsImageSize, gSystemConfig.configDirectoryFiles, tblPublicationsImageFile2);
                            }
                            if(tblPublicationsImageFile3 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrPublicationsImageSize, gSystemConfig.configDirectoryFiles, tblPublicationsImageFile3);
                            }
                            if(tblPublicationsImageFile4 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrPublicationsImageSize, gSystemConfig.configDirectoryFiles, tblPublicationsImageFile4);
                            }
                            if(tblPublicationsImageFile5 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrPublicationsImageSize, gSystemConfig.configDirectoryFiles, tblPublicationsImageFile5);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblPublicationsImageMain=", tblCategoriesImageMain);
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
            //tblPublicationsID = "";
            tblPublicationsIdParent = formParseResults.fields.id_parent;
            tblPublicationsSortOrder = formParseResults.fields.sort_order;
            tblPublicationsIdType = formParseResults.fields.id_type;
        
            //Mount.
            tblPublicationsDateStart = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                                dateField: tblPublicationsDateStart,
                                                                                dateFieldDay: tblPublicationsDateStartDay,
                                                                                dateFieldMonth: tblPublicationsDateStartMonth,
                                                                                dateFieldYear: tblPublicationsDateStartYear,
                                                                                dateFieldHour: tblPublicationsDateStartHour,
                                                                                dateFieldMinute: tblPublicationsDateStartMinute,
                                                                                dateFieldSeconds: tblPublicationsDateStartSeconds
                                                                            },  
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            "");

            //Mount.
            tblPublicationsDateEnd = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                                dateField: tblPublicationsDateEnd,
                                                                                dateFieldDay: tblPublicationsDateEndDay,
                                                                                dateFieldMonth: tblPublicationsDateEndMonth,
                                                                                dateFieldYear: tblPublicationsDateEndYear,
                                                                                dateFieldHour: tblPublicationsDateEndHour,
                                                                                dateFieldMinute: tblPublicationsDateEndMinute,
                                                                                dateFieldSeconds: tblPublicationsDateEndSeconds
                                                                            },  
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            "");

            tblPublicationsTitle = formParseResults.fields.title;
            tblPublicationsDescription = formParseResults.fields.description;
        
            tblPublicationsURLAlias = formParseResults.fields.url_alias;
            tblPublicationsKeywordsTags = formParseResults.fields.keywords_tags;
            tblPublicationsMetaDescription = formParseResults.fields.meta_description;
            tblPublicationsMetaTitle = formParseResults.fields.meta_title;

            tblPublicationsInfo1 = formParseResults.fields.info1;
            tblPublicationsInfo2 = formParseResults.fields.info2;
            tblPublicationsInfo3 = formParseResults.fields.info3;
            tblPublicationsInfo4 = formParseResults.fields.info4;
            tblPublicationsInfo5 = formParseResults.fields.info5;
            tblPublicationsInfo6 = formParseResults.fields.info6;
            tblPublicationsInfo7 = formParseResults.fields.info7;
            tblPublicationsInfo8 = formParseResults.fields.info8;
            tblPublicationsInfo9 = formParseResults.fields.info9;
            tblPublicationsInfo10 = formParseResults.fields.info10;

            tblPublicationsSource = formParseResults.fields.source;
            tblPublicationsSourceURL = formParseResults.fields.source_url;

            tblPublicationsNumber1 = formParseResults.fields.number1;
            tblPublicationsNumber2 = formParseResults.fields.number2;
            tblPublicationsNumber3 = formParseResults.fields.number3;
            tblPublicationsNumber4 = formParseResults.fields.number4;
            tblPublicationsNumber5 = formParseResults.fields.number5;
            
            tblPublicationsURL1 = formParseResults.fields.url1;
            tblPublicationsURL2 = formParseResults.fields.url2;
            tblPublicationsURL3 = formParseResults.fields.url3;
            tblPublicationsURL4 = formParseResults.fields.url4;
            tblPublicationsURL5 = formParseResults.fields.url5;
        
            tblPublicationsDate1 = formParseResults.fields.date1;
            tblPublicationsDate1Hour = formParseResults.fields.date1_hour;
            tblPublicationsDate1Minute = formParseResults.fields.date1_minute;
            tblPublicationsDate1Seconds = formParseResults.fields.date1_seconds;
            tblPublicationsDate1Day = formParseResults.fields.date1_day;
            tblPublicationsDate1Month = formParseResults.fields.date1_month;
            tblPublicationsDate1Year = formParseResults.fields.date1_year;
            //Mount.
            tblPublicationsDate1 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblPublicationsDate1,
                                                                            dateFieldDay: tblPublicationsDate1Day,
                                                                            dateFieldMonth: tblPublicationsDate1Month,
                                                                            dateFieldYear: tblPublicationsDate1Year,
                                                                            dateFieldHour: tblPublicationsDate1Hour,
                                                                            dateFieldMinute: tblPublicationsDate1Minute,
                                                                            dateFieldSeconds: tblPublicationsDate1Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");/**/
            
            tblPublicationsDate2 = formParseResults.fields.date2;
            tblPublicationsDate2Hour = formParseResults.fields.date2_hour;
            tblPublicationsDate2Minute = formParseResults.fields.date2_minute;
            tblPublicationsDate2Seconds = formParseResults.fields.date2_seconds;
            tblPublicationsDate2Day = formParseResults.fields.date2_day;
            tblPublicationsDate2Month = formParseResults.fields.date2_month;
            tblPublicationsDate2Year = formParseResults.fields.date2_year;
            //Mount.
            tblPublicationsDate2 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblPublicationsDate2,
                                                                            dateFieldDay: tblPublicationsDate2Day,
                                                                            dateFieldMonth: tblPublicationsDate2Month,
                                                                            dateFieldYear: tblPublicationsDate2Year,
                                                                            dateFieldHour: tblPublicationsDate2Hour,
                                                                            dateFieldMinute: tblPublicationsDate2Minute,
                                                                            dateFieldSeconds: tblPublicationsDate2Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblPublicationsDate3 = formParseResults.fields.date3;
            tblPublicationsDate3Hour = formParseResults.fields.date3_hour;
            tblPublicationsDate3Minute = formParseResults.fields.date3_minute;
            tblPublicationsDate3Seconds = formParseResults.fields.date3_seconds;
            tblPublicationsDate3Day = formParseResults.fields.date3_day;
            tblPublicationsDate3Month = formParseResults.fields.date3_month;
            tblPublicationsDate3Year = formParseResults.fields.date3_year;
            //Mount.
            tblPublicationsDate3 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblPublicationsDate3,
                                                                            dateFieldDay: tblPublicationsDate3Day,
                                                                            dateFieldMonth: tblPublicationsDate3Month,
                                                                            dateFieldYear: tblPublicationsDate3Year,
                                                                            dateFieldHour: tblPublicationsDate3Hour,
                                                                            dateFieldMinute: tblPublicationsDate3Minute,
                                                                            dateFieldSeconds: tblPublicationsDate3Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblPublicationsDate4 = formParseResults.fields.date4;
            tblPublicationsDate4Hour = formParseResults.fields.date4_hour;
            tblPublicationsDate4Minute = formParseResults.fields.date4_minute;
            tblPublicationsDate4Seconds = formParseResults.fields.date4_seconds;
            tblPublicationsDate4Day = formParseResults.fields.date4_day;
            tblPublicationsDate4Month = formParseResults.fields.date4_month;
            tblPublicationsDate4Year = formParseResults.fields.date4_year;
            //Mount.
            tblPublicationsDate4 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblPublicationsDate4,
                                                                            dateFieldDay: tblPublicationsDate4Day,
                                                                            dateFieldMonth: tblPublicationsDate4Month,
                                                                            dateFieldYear: tblPublicationsDate4Year,
                                                                            dateFieldHour: tblPublicationsDate4Hour,
                                                                            dateFieldMinute: tblPublicationsDate4Minute,
                                                                            dateFieldSeconds: tblPublicationsDate4Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblPublicationsDate5 = formParseResults.fields.date5;
            tblPublicationsDate5Hour = formParseResults.fields.date5_hour;
            tblPublicationsDate5Minute = formParseResults.fields.date5_minute;
            tblPublicationsDate5Seconds = formParseResults.fields.date5_seconds;
            tblPublicationsDate5Day = formParseResults.fields.date5_day;
            tblPublicationsDate5Month = formParseResults.fields.date5_month;
            tblPublicationsDate5Year = formParseResults.fields.date5_year;
            //Mount.
            tblPublicationsDate5 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblPublicationsDate5,
                                                                            dateFieldDay: tblPublicationsDate5Day,
                                                                            dateFieldMonth: tblPublicationsDate5Month,
                                                                            dateFieldYear: tblPublicationsDate5Year,
                                                                            dateFieldHour: tblPublicationsDate5Hour,
                                                                            dateFieldMinute: tblPublicationsDate5Minute,
                                                                            dateFieldSeconds: tblPublicationsDate5Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");/**/


            tblPublicationsImageMainCaption = formParseResults.fields.image_main_caption;
            tblPublicationsActivation = formParseResults.fields.activation;
            tblPublicationsActivation1 = formParseResults.fields.activation1;
            tblPublicationsActivation2 = formParseResults.fields.activation2;
            tblPublicationsActivation3 = formParseResults.fields.activation3;
            tblPublicationsActivation4 = formParseResults.fields.activation4;
            tblPublicationsActivation5 = formParseResults.fields.activation5;

            tblPublicationsIdStatus = formParseResults.fields.id_status;
            tblPublicationsRestrictedAccess = formParseResults.fields.restricted_access

            tblPublicationsNotes = formParseResults.fields.notes

            idParent = formParseResults.fields.idParent;
            idType = formParseResults.fields.idType;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendPublications + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //Insert record.
            //----------------------
            let publicationsInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.publicationsInsert_async({
                    _tblPublicationsID: tblPublicationsID,
                    _tblPublicationsIdParent: tblPublicationsIdParent,
                    _tblPublicationsSortOrder: tblPublicationsSortOrder,
                    _tblPublicationsIdType: tblPublicationsIdType,
                    _tblPublicationsDateCreation: "",
                    _tblPublicationsDateEdit: "",
                    _tblPublicationsIdRegisterUser: "0",
                    _tblPublicationsIdRegister1: "0",
                    _tblPublicationsIdRegister2: "0",
                    _tblPublicationsIdRegister3: "0",
                    _tblPublicationsIdRegister4: "0",
                    _tblPublicationsIdRegister5: "0",
                    _tblPublicationsDateStart: tblPublicationsDateStart,
                    _tblPublicationsDateEnd: tblPublicationsDateEnd,
                    _tblPublicationsTitle: tblPublicationsTitle,
                    _tblPublicationsDescription: tblPublicationsDescription,
                    _tblPublicationsURLAlias: tblPublicationsURLAlias,
                    _tblPublicationsKeywordsTags: tblPublicationsKeywordsTags,
                    _tblPublicationsMetaDescription: tblPublicationsMetaDescription,
                    _tblPublicationsMetaTitle: tblPublicationsMetaTitle,
                    _tblPublicationsMetaInfo: "",
                    _tblPublicationsInfo1: tblPublicationsInfo1,
                    _tblPublicationsInfo2: tblPublicationsInfo2,
                    _tblPublicationsInfo3: tblPublicationsInfo3,
                    _tblPublicationsInfo4: tblPublicationsInfo4,
                    _tblPublicationsInfo5: tblPublicationsInfo5,
                    _tblPublicationsInfo6: tblPublicationsInfo6,
                    _tblPublicationsInfo7: tblPublicationsInfo7,
                    _tblPublicationsInfo8: tblPublicationsInfo8,
                    _tblPublicationsInfo9: tblPublicationsInfo9,
                    _tblPublicationsInfo10: tblPublicationsInfo10,
                    _tblPublicationsSource: tblPublicationsSource,
                    _tblPublicationsSourceURL: tblPublicationsSourceURL,
                    _tblPublicationsNumber1: tblPublicationsNumber1,
                    _tblPublicationsNumber2: tblPublicationsNumber2,
                    _tblPublicationsNumber3: tblPublicationsNumber3,
                    _tblPublicationsNumber4: tblPublicationsNumber4,
                    _tblPublicationsNumber5: tblPublicationsNumber5,
                    _tblPublicationsURL1: tblPublicationsURL1,
                    _tblPublicationsURL2: tblPublicationsURL2,
                    _tblPublicationsURL3: tblPublicationsURL3,
                    _tblPublicationsURL4: tblPublicationsURL4,
                    _tblPublicationsURL5: tblPublicationsURL5,
                    _tblPublicationsDate1: tblPublicationsDate1,
                    _tblPublicationsDate2: tblPublicationsDate2,
                    _tblPublicationsDate3: tblPublicationsDate3,
                    _tblPublicationsDate4: tblPublicationsDate4,
                    _tblPublicationsDate5: tblPublicationsDate5,
                    _tblPublicationsImageMain: tblPublicationsImageMain,
                    _tblPublicationsImageMainCaption: tblPublicationsImageMainCaption,
                    _tblPublicationsFile1: tblPublicationsImageFile1,
                    _tblPublicationsFile2: tblPublicationsImageFile2,
                    _tblPublicationsFile3: tblPublicationsImageFile3,
                    _tblPublicationsFile4: tblPublicationsImageFile4,
                    _tblPublicationsFile5: tblPublicationsImageFile5,
                    _tblPublicationsActivation: tblPublicationsActivation,
                    _tblPublicationsActivation1: tblPublicationsActivation1,
                    _tblPublicationsActivation2: tblPublicationsActivation2,
                    _tblPublicationsActivation3: tblPublicationsActivation3,
                    _tblPublicationsActivation4: tblPublicationsActivation4,
                    _tblPublicationsActivation5: tblPublicationsActivation5,
                    _tblPublicationsIdStatus: tblPublicationsIdStatus,
                    _tblPublicationsRestrictedAccess: tblPublicationsRestrictedAccess,
                    _tblPublicationsNotes: tblPublicationsNotes,
                    _arrIdsPublicationsFiltersGeneric1: arrIdsPublicationsFiltersGeneric1,
                    _arrIdsPublicationsFiltersGeneric2: arrIdsPublicationsFiltersGeneric2,
                    _arrIdsPublicationsFiltersGeneric3: arrIdsPublicationsFiltersGeneric3,
                    _arrIdsPublicationsFiltersGeneric4: arrIdsPublicationsFiltersGeneric4,
                    _arrIdsPublicationsFiltersGeneric5: arrIdsPublicationsFiltersGeneric5,
                    _arrIdsPublicationsFiltersGeneric6: arrIdsPublicationsFiltersGeneric6,
                    _arrIdsPublicationsFiltersGeneric7: arrIdsPublicationsFiltersGeneric7,
                    _arrIdsPublicationsFiltersGeneric8: arrIdsPublicationsFiltersGeneric8,
                    _arrIdsPublicationsFiltersGeneric9: arrIdsPublicationsFiltersGeneric9,
                    _arrIdsPublicationsFiltersGeneric10: arrIdsPublicationsFiltersGeneric10,
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
            if(publicationsInsertResult == true)
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
            //console.log("tblPublicationsID=", tblPublicationsID);
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


//Backend - Publications - edit - GET.
//**************************************************************************************
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendPublications + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbPublications?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    
    //Import objects.
    //----------------------
    const PublicationsEdit = require("../" + gSystemConfig.configDirectorySystem + "/publications-edit.js");
    //----------------------
    

    //Variables.
    //----------------------
    let peBackend;
    let idTbPublications = "";

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
    if(req.params.idTbPublications)
    {
        idTbPublications = req.params.idTbPublications;
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
            peBackend = new PublicationsEdit({
                idTbPublications: idTbPublications,

                pageNumber: pageNumber,
                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert
            });


            //Build object data.
            await peBackend.build();


            //Render data with template.
            res.render(masterPageSelect, {
                templateData: peBackend,
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


//Backend - Publications - PUT (edit).
//**************************************************************************************
router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendPublications + "/" + gSystemConfig.configRouteBackendActionEdit, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Variables
    //----------------------
    let tblPublicationsID = "";
    let tblPublicationsIdParent = "";
    let tblPublicationsSortOrder = 0;
    let tblPublicationsIdType = 0; //1 - news | 2 - photo gallery  | 3 - articles | 4 - publications

    let tblPublicationsIdRegisterUser = 0;
    let tblPublicationsIdRegister1 = 0;
    let tblPublicationsIdRegister2 = 0;
    let tblPublicationsIdRegister3 = 0;
    let tblPublicationsIdRegister4 = 0;
    let tblPublicationsIdRegister5 = 0;

    let tblPublicationsDateStart = "", tblPublicationsDateStartHour = "", tblPublicationsDateStartMinute = "", tblPublicationsDateStartSeconds = "", tblPublicationsDateStartDay = "", tblPublicationsDateStartMonth = "", tblPublicationsDateStartYear = "";
    let tblPublicationsDateEnd = "", tblPublicationsDateEndHour = "", tblPublicationsDateEndMinute = "", tblPublicationsDateEndSeconds = "", tblPublicationsDateEndDay = "", tblPublicationsDateEndMonth = "", tblPublicationsDateEndYear = "";
    
    let tblPublicationsTitle = "";
    let tblPublicationsDescription = "";

    let tblPublicationsURLAlias = "";
    let tblPublicationsKeywordsTags = "";
    let tblPublicationsMetaDescription = "";
    let tblPublicationsMetaTitle = "";

    let tblPublicationsInfo1 = "";
    let tblPublicationsInfo2 = "";
    let tblPublicationsInfo3 = "";
    let tblPublicationsInfo4 = "";
    let tblPublicationsInfo5 = "";
    let tblPublicationsInfo6 = "";
    let tblPublicationsInfo7 = "";
    let tblPublicationsInfo8 = "";
    let tblPublicationsInfo9 = "";
    let tblPublicationsInfo10 = "";

    let tblPublicationsSource = "";
    let tblPublicationsSourceURL = "";

    let tblPublicationsNumber1 = 0;
    let tblPublicationsNumber2 = 0;
    let tblPublicationsNumber3 = 0;
    let tblPublicationsNumber4 = 0;
    let tblPublicationsNumber5 = 0;

    let tblPublicationsURL1 = "";
    let tblPublicationsURL2 = "";
    let tblPublicationsURL3 = "";
    let tblPublicationsURL4 = "";
    let tblPublicationsURL5 = "";

    let tblPublicationsDate1 = "", tblPublicationsDate1Hour = "", tblPublicationsDate1Minute = "", tblPublicationsDate1Seconds = "", tblPublicationsDate1Day = "", tblPublicationsDate1Month = "", tblPublicationsDate1Year = "";
    let tblPublicationsDate2 = "", tblPublicationsDate2Hour = "", tblPublicationsDate2Minute = "", tblPublicationsDate2Seconds = "", tblPublicationsDate2Day = "", tblPublicationsDate2Month = "", tblPublicationsDate2Year = "";
    let tblPublicationsDate3 = "", tblPublicationsDate3Hour = "", tblPublicationsDate3Minute = "", tblPublicationsDate3Seconds = "", tblPublicationsDate3Day = "", tblPublicationsDate3Month = "", tblPublicationsDate3Year = "";
    let tblPublicationsDate4 = "", tblPublicationsDate4Hour = "", tblPublicationsDate4Minute = "", tblPublicationsDate4Seconds = "", tblPublicationsDate4Day = "", tblPublicationsDate4Month = "", tblPublicationsDate4Year = "";
    let tblPublicationsDate5 = "", tblPublicationsDate5Hour = "", tblPublicationsDate5Minute = "", tblPublicationsDate5Seconds = "", tblPublicationsDate5Day = "", tblPublicationsDate5Month = "", tblPublicationsDate5Year = "";

    let tblPublicationsImageMain = "";
    let tblPublicationsImageMainCaption = "";
    let tblPublicationsImageFile1 = "";
    let tblPublicationsImageFile2 = "";
    let tblPublicationsImageFile3 = "";
    let tblPublicationsImageFile4 = "";
    let tblPublicationsImageFile5 = "";

    let tblPublicationsActivation = "";
    let tblPublicationsActivation1 = "";
    let tblPublicationsActivation2 = "";
    let tblPublicationsActivation3 = "";
    let tblPublicationsActivation4 = "";
    let tblPublicationsActivation5 = "";

    let tblPublicationsIdStatus = "";
    let tblPublicationsRestrictedAccess = "";

    let tblPublicationsNotes = "";

    let arrIdsPublicationsFiltersGeneric1 = [];
    let arrIdsPublicationsFiltersGeneric2 = [];
    let arrIdsPublicationsFiltersGeneric3 = [];
    let arrIdsPublicationsFiltersGeneric4 = [];
    let arrIdsPublicationsFiltersGeneric5 = [];
    let arrIdsPublicationsFiltersGeneric6 = [];
    let arrIdsPublicationsFiltersGeneric7 = [];
    let arrIdsPublicationsFiltersGeneric8 = [];
    let arrIdsPublicationsFiltersGeneric9 = [];
    let arrIdsPublicationsFiltersGeneric10 = [];

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
                            tblPublicationsID = fieldsPost.id;
                            

                            //console.log("formParseResults.files.image_main=", formParseResults.files.image_main);

                            //resolve({fields: fields, files: files}); //working
                        }
                    });
                    //----------------------


                    //Field parsing.
                    //----------------------
                    form.on('field', function(name, value){

                        //Array detection.
                        if(gSystemConfig.enablePublicationsFilterGeneric1 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric1")
                            {
                                //fieldsPost.idsPublicationsFiltersGeneric1.push(value);
                                arrIdsPublicationsFiltersGeneric1.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric2 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric2")
                            {
                                arrIdsPublicationsFiltersGeneric2.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric3 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric3")
                            {
                                arrIdsPublicationsFiltersGeneric3.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric4 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric4")
                            {
                                arrIdsPublicationsFiltersGeneric4.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric5 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric5")
                            {
                                arrIdsPublicationsFiltersGeneric5.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric6 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric6")
                            {
                                arrIdsPublicationsFiltersGeneric6.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric7 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric7")
                            {
                                arrIdsPublicationsFiltersGeneric7.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric8 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric8")
                            {
                                arrIdsPublicationsFiltersGeneric8.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric9 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric9")
                            {
                                arrIdsPublicationsFiltersGeneric9.push(value);
                            }
                        }
                        if(gSystemConfig.enablePublicationsFilterGeneric10 != 0)
                        {
                            if(name.toString() == "idsPublicationsFiltersGeneric10")
                            {
                                arrIdsPublicationsFiltersGeneric10.push(value);
                            }
                        }



                        /*if (fieldsPost[name]) {
                        if (!Array.isArray(fieldsPost[name])) {
                            fieldsPost[name] = [fieldsPost[name]];
                        }
                        fieldsPost[name].push(value);
                        //arrIdsPublicationsFiltersGeneric1.push(fieldsPost.idsPublicationsFiltersGeneric1);

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
                        //var resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblPublicationsID, 
                        resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblPublicationsID, 
                                                                                                    this.openedFiles, 
                                                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                                                    "");
                        */


                        //Check fields with files.

                        //Build file fields references.
                        //image_main field.
                        if(gSystemConfig.enablePublicationsImageMain == 1)
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

                        //file1 field.
                        if(gSystemConfig.enablePublicationsFile1 == 1)
                        {
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
                        if(gSystemConfig.enablePublicationsFile2 == 1)
                        {
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
                        if(gSystemConfig.enablePublicationsFile3 == 1)
                        {
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
                        if(gSystemConfig.enablePublicationsFile4 == 1)
                        {
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
                        if(gSystemConfig.enablePublicationsFile5 == 1)
                        {
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


                        //var resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                        resultsFunctionsFiles = await new Promise((resolve, reject)=>{
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblPublicationsID, 
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
                            tblPublicationsImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblPublicationsImageMain;
                            tblPublicationsImageFile1 = (resultsFunctionsFiles.hasOwnProperty("file1") === true) ? resultsFunctionsFiles.file1 : tblPublicationsImageFile1;
                            tblPublicationsImageFile2 = (resultsFunctionsFiles.hasOwnProperty("file2") === true) ? resultsFunctionsFiles.file2 : tblPublicationsImageFile2;
                            tblPublicationsImageFile3 = (resultsFunctionsFiles.hasOwnProperty("file3") === true) ? resultsFunctionsFiles.file3 : tblPublicationsImageFile3;
                            tblPublicationsImageFile4 = (resultsFunctionsFiles.hasOwnProperty("file4") === true) ? resultsFunctionsFiles.file4 : tblPublicationsImageFile4;
                            tblPublicationsImageFile5 = (resultsFunctionsFiles.hasOwnProperty("file5") === true) ? resultsFunctionsFiles.file5 : tblPublicationsImageFile5;


                            //Resize images.
                            if(tblPublicationsImageMain !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrPublicationsImageSize, gSystemConfig.configDirectoryFiles, tblPublicationsImageMain);
                            }
                            if(tblPublicationsImageFile1 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrPublicationsImageSize, gSystemConfig.configDirectoryFiles, tblPublicationsImageFile1);
                            }
                            if(tblPublicationsImageFile2 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrPublicationsImageSize, gSystemConfig.configDirectoryFiles, tblPublicationsImageFile2);
                            }
                            if(tblPublicationsImageFile3 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrPublicationsImageSize, gSystemConfig.configDirectoryFiles, tblPublicationsImageFile3);
                            }
                            if(tblPublicationsImageFile4 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrPublicationsImageSize, gSystemConfig.configDirectoryFiles, tblPublicationsImageFile4);
                            }
                            if(tblPublicationsImageFile5 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrPublicationsImageSize, gSystemConfig.configDirectoryFiles, tblPublicationsImageFile5);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblPublicationsImageMain=", tblCategoriesImageMain);
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
            //tblPublicationsID = "";
            tblPublicationsIdParent = formParseResults.fields.id_parent;
            tblPublicationsSortOrder = formParseResults.fields.sort_order;
            tblPublicationsIdType = formParseResults.fields.id_type;
        
            //Mount.
            tblPublicationsDateStart = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                                dateField: tblPublicationsDateStart,
                                                                                dateFieldDay: tblPublicationsDateStartDay,
                                                                                dateFieldMonth: tblPublicationsDateStartMonth,
                                                                                dateFieldYear: tblPublicationsDateStartYear,
                                                                                dateFieldHour: tblPublicationsDateStartHour,
                                                                                dateFieldMinute: tblPublicationsDateStartMinute,
                                                                                dateFieldSeconds: tblPublicationsDateStartSeconds
                                                                            },  
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            "");

            //Mount.
            tblPublicationsDateEnd = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                                dateField: tblPublicationsDateEnd,
                                                                                dateFieldDay: tblPublicationsDateEndDay,
                                                                                dateFieldMonth: tblPublicationsDateEndMonth,
                                                                                dateFieldYear: tblPublicationsDateEndYear,
                                                                                dateFieldHour: tblPublicationsDateEndHour,
                                                                                dateFieldMinute: tblPublicationsDateEndMinute,
                                                                                dateFieldSeconds: tblPublicationsDateEndSeconds
                                                                            },  
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            "");

            tblPublicationsTitle = formParseResults.fields.title;
            tblPublicationsDescription = formParseResults.fields.description;
        
            tblPublicationsURLAlias = formParseResults.fields.url_alias;
            tblPublicationsKeywordsTags = formParseResults.fields.keywords_tags;
            tblPublicationsMetaDescription = formParseResults.fields.meta_description;
            tblPublicationsMetaTitle = formParseResults.fields.meta_title;

            tblPublicationsInfo1 = formParseResults.fields.info1;
            tblPublicationsInfo2 = formParseResults.fields.info2;
            tblPublicationsInfo3 = formParseResults.fields.info3;
            tblPublicationsInfo4 = formParseResults.fields.info4;
            tblPublicationsInfo5 = formParseResults.fields.info5;
            tblPublicationsInfo6 = formParseResults.fields.info6;
            tblPublicationsInfo7 = formParseResults.fields.info7;
            tblPublicationsInfo8 = formParseResults.fields.info8;
            tblPublicationsInfo9 = formParseResults.fields.info9;
            tblPublicationsInfo10 = formParseResults.fields.info10;

            tblPublicationsSource = formParseResults.fields.source;
            tblPublicationsSourceURL = formParseResults.fields.source_url;

            tblPublicationsNumber1 = formParseResults.fields.number1;
            tblPublicationsNumber2 = formParseResults.fields.number2;
            tblPublicationsNumber3 = formParseResults.fields.number3;
            tblPublicationsNumber4 = formParseResults.fields.number4;
            tblPublicationsNumber5 = formParseResults.fields.number5;
            
            tblPublicationsURL1 = formParseResults.fields.url1;
            tblPublicationsURL2 = formParseResults.fields.url2;
            tblPublicationsURL3 = formParseResults.fields.url3;
            tblPublicationsURL4 = formParseResults.fields.url4;
            tblPublicationsURL5 = formParseResults.fields.url5;
        
            tblPublicationsDate1 = formParseResults.fields.date1;
            tblPublicationsDate1Hour = formParseResults.fields.date1_hour;
            tblPublicationsDate1Minute = formParseResults.fields.date1_minute;
            tblPublicationsDate1Seconds = formParseResults.fields.date1_seconds;
            tblPublicationsDate1Day = formParseResults.fields.date1_day;
            tblPublicationsDate1Month = formParseResults.fields.date1_month;
            tblPublicationsDate1Year = formParseResults.fields.date1_year;
            //Mount.
            tblPublicationsDate1 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblPublicationsDate1,
                                                                            dateFieldDay: tblPublicationsDate1Day,
                                                                            dateFieldMonth: tblPublicationsDate1Month,
                                                                            dateFieldYear: tblPublicationsDate1Year,
                                                                            dateFieldHour: tblPublicationsDate1Hour,
                                                                            dateFieldMinute: tblPublicationsDate1Minute,
                                                                            dateFieldSeconds: tblPublicationsDate1Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");/**/
            
            tblPublicationsDate2 = formParseResults.fields.date2;
            tblPublicationsDate2Hour = formParseResults.fields.date2_hour;
            tblPublicationsDate2Minute = formParseResults.fields.date2_minute;
            tblPublicationsDate2Seconds = formParseResults.fields.date2_seconds;
            tblPublicationsDate2Day = formParseResults.fields.date2_day;
            tblPublicationsDate2Month = formParseResults.fields.date2_month;
            tblPublicationsDate2Year = formParseResults.fields.date2_year;
            //Mount.
            tblPublicationsDate2 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblPublicationsDate2,
                                                                            dateFieldDay: tblPublicationsDate2Day,
                                                                            dateFieldMonth: tblPublicationsDate2Month,
                                                                            dateFieldYear: tblPublicationsDate2Year,
                                                                            dateFieldHour: tblPublicationsDate2Hour,
                                                                            dateFieldMinute: tblPublicationsDate2Minute,
                                                                            dateFieldSeconds: tblPublicationsDate2Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblPublicationsDate3 = formParseResults.fields.date3;
            tblPublicationsDate3Hour = formParseResults.fields.date3_hour;
            tblPublicationsDate3Minute = formParseResults.fields.date3_minute;
            tblPublicationsDate3Seconds = formParseResults.fields.date3_seconds;
            tblPublicationsDate3Day = formParseResults.fields.date3_day;
            tblPublicationsDate3Month = formParseResults.fields.date3_month;
            tblPublicationsDate3Year = formParseResults.fields.date3_year;
            //Mount.
            tblPublicationsDate3 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblPublicationsDate3,
                                                                            dateFieldDay: tblPublicationsDate3Day,
                                                                            dateFieldMonth: tblPublicationsDate3Month,
                                                                            dateFieldYear: tblPublicationsDate3Year,
                                                                            dateFieldHour: tblPublicationsDate3Hour,
                                                                            dateFieldMinute: tblPublicationsDate3Minute,
                                                                            dateFieldSeconds: tblPublicationsDate3Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblPublicationsDate4 = formParseResults.fields.date4;
            tblPublicationsDate4Hour = formParseResults.fields.date4_hour;
            tblPublicationsDate4Minute = formParseResults.fields.date4_minute;
            tblPublicationsDate4Seconds = formParseResults.fields.date4_seconds;
            tblPublicationsDate4Day = formParseResults.fields.date4_day;
            tblPublicationsDate4Month = formParseResults.fields.date4_month;
            tblPublicationsDate4Year = formParseResults.fields.date4_year;
            //Mount.
            tblPublicationsDate4 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblPublicationsDate4,
                                                                            dateFieldDay: tblPublicationsDate4Day,
                                                                            dateFieldMonth: tblPublicationsDate4Month,
                                                                            dateFieldYear: tblPublicationsDate4Year,
                                                                            dateFieldHour: tblPublicationsDate4Hour,
                                                                            dateFieldMinute: tblPublicationsDate4Minute,
                                                                            dateFieldSeconds: tblPublicationsDate4Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblPublicationsDate5 = formParseResults.fields.date5;
            tblPublicationsDate5Hour = formParseResults.fields.date5_hour;
            tblPublicationsDate5Minute = formParseResults.fields.date5_minute;
            tblPublicationsDate5Seconds = formParseResults.fields.date5_seconds;
            tblPublicationsDate5Day = formParseResults.fields.date5_day;
            tblPublicationsDate5Month = formParseResults.fields.date5_month;
            tblPublicationsDate5Year = formParseResults.fields.date5_year;
            //Mount.
            tblPublicationsDate5 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblPublicationsDate5,
                                                                            dateFieldDay: tblPublicationsDate5Day,
                                                                            dateFieldMonth: tblPublicationsDate5Month,
                                                                            dateFieldYear: tblPublicationsDate5Year,
                                                                            dateFieldHour: tblPublicationsDate5Hour,
                                                                            dateFieldMinute: tblPublicationsDate5Minute,
                                                                            dateFieldSeconds: tblPublicationsDate5Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");/**/


            tblPublicationsImageMainCaption = formParseResults.fields.image_main_caption;
            tblPublicationsActivation = formParseResults.fields.activation;
            tblPublicationsActivation1 = formParseResults.fields.activation1;
            tblPublicationsActivation2 = formParseResults.fields.activation2;
            tblPublicationsActivation3 = formParseResults.fields.activation3;
            tblPublicationsActivation4 = formParseResults.fields.activation4;
            tblPublicationsActivation5 = formParseResults.fields.activation5;

            tblPublicationsIdStatus = formParseResults.fields.id_status;
            tblPublicationsRestrictedAccess = formParseResults.fields.restricted_access

            tblPublicationsNotes = formParseResults.fields.notes

            idParent = formParseResults.fields.idParent;
            idType = formParseResults.fields.idType;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendPublications + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //Edit record.  
            //----------------------
            let publicationsUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.publicationsUpdate_async({
                    _tblPublicationsID: tblPublicationsID,
                    _tblPublicationsIdParent: tblPublicationsIdParent,
                    _tblPublicationsSortOrder: tblPublicationsSortOrder,
                    _tblPublicationsIdType: tblPublicationsIdType,
                    _tblPublicationsDateCreation: "",
                    _tblPublicationsDateEdit: "",
                    _tblPublicationsIdRegisterUser: "0",
                    _tblPublicationsIdRegister1: "0",
                    _tblPublicationsIdRegister2: "0",
                    _tblPublicationsIdRegister3: "0",
                    _tblPublicationsIdRegister4: "0",
                    _tblPublicationsIdRegister5: "0",
                    _tblPublicationsDateStart: tblPublicationsDateStart,
                    _tblPublicationsDateEnd: tblPublicationsDateEnd,
                    _tblPublicationsTitle: tblPublicationsTitle,
                    _tblPublicationsDescription: tblPublicationsDescription,
                    _tblPublicationsURLAlias: tblPublicationsURLAlias,
                    _tblPublicationsKeywordsTags: tblPublicationsKeywordsTags,
                    _tblPublicationsMetaDescription: tblPublicationsMetaDescription,
                    _tblPublicationsMetaTitle: tblPublicationsMetaTitle,
                    _tblPublicationsMetaInfo: "",
                    _tblPublicationsInfo1: tblPublicationsInfo1,
                    _tblPublicationsInfo2: tblPublicationsInfo2,
                    _tblPublicationsInfo3: tblPublicationsInfo3,
                    _tblPublicationsInfo4: tblPublicationsInfo4,
                    _tblPublicationsInfo5: tblPublicationsInfo5,
                    _tblPublicationsInfo6: tblPublicationsInfo6,
                    _tblPublicationsInfo7: tblPublicationsInfo7,
                    _tblPublicationsInfo8: tblPublicationsInfo8,
                    _tblPublicationsInfo9: tblPublicationsInfo9,
                    _tblPublicationsInfo10: tblPublicationsInfo10,
                    _tblPublicationsSource: tblPublicationsSource,
                    _tblPublicationsSourceURL: tblPublicationsSourceURL,
                    _tblPublicationsNumber1: tblPublicationsNumber1,
                    _tblPublicationsNumber2: tblPublicationsNumber2,
                    _tblPublicationsNumber3: tblPublicationsNumber3,
                    _tblPublicationsNumber4: tblPublicationsNumber4,
                    _tblPublicationsNumber5: tblPublicationsNumber5,
                    _tblPublicationsURL1: tblPublicationsURL1,
                    _tblPublicationsURL2: tblPublicationsURL2,
                    _tblPublicationsURL3: tblPublicationsURL3,
                    _tblPublicationsURL4: tblPublicationsURL4,
                    _tblPublicationsURL5: tblPublicationsURL5,
                    _tblPublicationsDate1: tblPublicationsDate1,
                    _tblPublicationsDate2: tblPublicationsDate2,
                    _tblPublicationsDate3: tblPublicationsDate3,
                    _tblPublicationsDate4: tblPublicationsDate4,
                    _tblPublicationsDate5: tblPublicationsDate5,
                    _tblPublicationsImageMain: tblPublicationsImageMain,
                    _tblPublicationsImageMainCaption: tblPublicationsImageMainCaption,
                    _tblPublicationsFile1: tblPublicationsImageFile1,
                    _tblPublicationsFile2: tblPublicationsImageFile2,
                    _tblPublicationsFile3: tblPublicationsImageFile3,
                    _tblPublicationsFile4: tblPublicationsImageFile4,
                    _tblPublicationsFile5: tblPublicationsImageFile5,
                    _tblPublicationsActivation: tblPublicationsActivation,
                    _tblPublicationsActivation1: tblPublicationsActivation1,
                    _tblPublicationsActivation2: tblPublicationsActivation2,
                    _tblPublicationsActivation3: tblPublicationsActivation3,
                    _tblPublicationsActivation4: tblPublicationsActivation4,
                    _tblPublicationsActivation5: tblPublicationsActivation5,
                    _tblPublicationsIdStatus: tblPublicationsIdStatus,
                    _tblPublicationsRestrictedAccess: tblPublicationsRestrictedAccess,
                    _tblPublicationsNotes: tblPublicationsNotes,
                    _arrIdsPublicationsFiltersGeneric1: arrIdsPublicationsFiltersGeneric1,
                    _arrIdsPublicationsFiltersGeneric2: arrIdsPublicationsFiltersGeneric2,
                    _arrIdsPublicationsFiltersGeneric3: arrIdsPublicationsFiltersGeneric3,
                    _arrIdsPublicationsFiltersGeneric4: arrIdsPublicationsFiltersGeneric4,
                    _arrIdsPublicationsFiltersGeneric5: arrIdsPublicationsFiltersGeneric5,
                    _arrIdsPublicationsFiltersGeneric6: arrIdsPublicationsFiltersGeneric6,
                    _arrIdsPublicationsFiltersGeneric7: arrIdsPublicationsFiltersGeneric7,
                    _arrIdsPublicationsFiltersGeneric8: arrIdsPublicationsFiltersGeneric8,
                    _arrIdsPublicationsFiltersGeneric9: arrIdsPublicationsFiltersGeneric9,
                    _arrIdsPublicationsFiltersGeneric10: arrIdsPublicationsFiltersGeneric10,
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
            if(publicationsUpdateResult == true)
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