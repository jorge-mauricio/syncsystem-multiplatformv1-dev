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


//Backend - Products - listing - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendProducts + "/:idParent?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendProducts + "/:idParent?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const ProductsListing = require("../" + gSystemConfig.configDirectorySystem + "/products-listing.js");
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
            plBackend = new ProductsListing({
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


//Backend - Products - POST (insert record).
//**************************************************************************************
//router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendProducts, (req, res)=>{
router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendProducts, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{
    //Variables
    //----------------------
    let tblProductsID = "";
    let tblProductsIdParent = "";
    let tblProductsSortOrder = 0;
    let tblProductsIdType = 0; 

    let tblProductsIdRegisterUser = 0;
    let tblProductsIdRegister1 = 0;
    let tblProductsIdRegister2 = 0;
    let tblProductsIdRegister3 = 0;
    let tblProductsIdRegister4 = 0;
    let tblProductsIdRegister5 = 0;

    let tblProductsCode = "";
    let tblProductsTitle = "";
    let tblProductsDescription = "";

    let tblProductsURLAlias = "";
    let tblProductsKeywordsTags = "";
    let tblProductsMetaDescription = "";
    let tblProductsMetaTitle = "";

    let tblProductsInfo1 = "";
    let tblProductsInfo2 = "";
    let tblProductsInfo3 = "";
    let tblProductsInfo4 = "";
    let tblProductsInfo5 = "";
    let tblProductsInfo6 = "";
    let tblProductsInfo7 = "";
    let tblProductsInfo8 = "";
    let tblProductsInfo9 = "";
    let tblProductsInfo10 = "";
    let tblProductsInfo11 = "";
    let tblProductsInfo12 = "";
    let tblProductsInfo13 = "";
    let tblProductsInfo14 = "";
    let tblProductsInfo15 = "";
    let tblProductsInfo16 = "";
    let tblProductsInfo17 = "";
    let tblProductsInfo18 = "";
    let tblProductsInfo19 = "";
    let tblProductsInfo20 = "";

    let tblProductsInfoSmall1 = "";
    let tblProductsInfoSmall2 = "";
    let tblProductsInfoSmall3 = "";
    let tblProductsInfoSmall4 = "";
    let tblProductsInfoSmall5 = "";
    let tblProductsInfoSmall6 = "";
    let tblProductsInfoSmall7 = "";
    let tblProductsInfoSmall8 = "";
    let tblProductsInfoSmall9 = "";
    let tblProductsInfoSmall10 = "";
    let tblProductsInfoSmall11 = "";
    let tblProductsInfoSmall12 = "";
    let tblProductsInfoSmall13 = "";
    let tblProductsInfoSmall14 = "";
    let tblProductsInfoSmall15 = "";
    let tblProductsInfoSmall16 = "";
    let tblProductsInfoSmall17 = "";
    let tblProductsInfoSmall18 = "";
    let tblProductsInfoSmall19 = "";
    let tblProductsInfoSmall20 = "";
    let tblProductsInfoSmall21 = "";
    let tblProductsInfoSmall22 = "";
    let tblProductsInfoSmall23 = "";
    let tblProductsInfoSmall24 = "";
    let tblProductsInfoSmall25 = "";
    let tblProductsInfoSmall26 = "";
    let tblProductsInfoSmall27 = "";
    let tblProductsInfoSmall28 = "";
    let tblProductsInfoSmall29 = "";
    let tblProductsInfoSmall30 = "";

    let tblProductsValue = 0;
    let tblProductsValue1 = 0;
    let tblProductsValue2 = 0;
    let tblProductsWeight = 0;
    let tblProductsCoefficient = 0;

    let tblProductsNumber1 = 0;
    let tblProductsNumber2 = 0;
    let tblProductsNumber3 = 0;
    let tblProductsNumber4 = 0;
    let tblProductsNumber5 = 0;

    let tblProductsNumberSmall1 = 0;
    let tblProductsNumberSmall2 = 0;
    let tblProductsNumberSmall3 = 0;
    let tblProductsNumberSmall4 = 0;
    let tblProductsNumberSmall5 = 0;

    let tblProductsURL1 = "";
    let tblProductsURL2 = "";
    let tblProductsURL3 = "";
    let tblProductsURL4 = "";
    let tblProductsURL5 = "";

    let tblProductsDate1 = "", tblProductsDate1Hour = "", tblProductsDate1Minute = "", tblProductsDate1Seconds = "", tblProductsDate1Day = "", tblProductsDate1Month = "", tblProductsDate1Year = "";
    let tblProductsDate2 = "", tblProductsDate2Hour = "", tblProductsDate2Minute = "", tblProductsDate2Seconds = "", tblProductsDate2Day = "", tblProductsDate2Month = "", tblProductsDate2Year = "";
    let tblProductsDate3 = "", tblProductsDate3Hour = "", tblProductsDate3Minute = "", tblProductsDate3Seconds = "", tblProductsDate3Day = "", tblProductsDate3Month = "", tblProductsDate3Year = "";
    let tblProductsDate4 = "", tblProductsDate4Hour = "", tblProductsDate4Minute = "", tblProductsDate4Seconds = "", tblProductsDate4Day = "", tblProductsDate4Month = "", tblProductsDate4Year = "";
    let tblProductsDate5 = "", tblProductsDate5Hour = "", tblProductsDate5Minute = "", tblProductsDate5Seconds = "", tblProductsDate5Day = "", tblProductsDate5Month = "", tblProductsDate5Year = "";

    let tblProductsImageMain = "";
    let tblProductsImageMainCaption = "";
    let tblProductsImageFile1 = "";
    let tblProductsImageFile2 = "";
    let tblProductsImageFile3 = "";
    let tblProductsImageFile4 = "";
    let tblProductsImageFile5 = "";

    let tblProductsActivation = "";
    let tblProductsActivation1 = "";
    let tblProductsActivation2 = "";
    let tblProductsActivation3 = "";
    let tblProductsActivation4 = "";
    let tblProductsActivation5 = "";

    let tblProductsIdStatus = "";
    let tblProductsRestrictedAccess = "";

    let tblProductsNotes = "";

    let arrIdsProductsFiltersGeneric1 = [];
    let arrIdsProductsFiltersGeneric2 = [];
    let arrIdsProductsFiltersGeneric3 = [];
    let arrIdsProductsFiltersGeneric4 = [];
    let arrIdsProductsFiltersGeneric5 = [];
    let arrIdsProductsFiltersGeneric6 = [];
    let arrIdsProductsFiltersGeneric7 = [];
    let arrIdsProductsFiltersGeneric8 = [];
    let arrIdsProductsFiltersGeneric9 = [];
    let arrIdsProductsFiltersGeneric10 = [];
    let arrIdsProductsFiltersGeneric11 = [];
    let arrIdsProductsFiltersGeneric12 = [];
    let arrIdsProductsFiltersGeneric13 = [];
    let arrIdsProductsFiltersGeneric14 = [];
    let arrIdsProductsFiltersGeneric15 = [];
    let arrIdsProductsFiltersGeneric16 = [];
    let arrIdsProductsFiltersGeneric17 = [];
    let arrIdsProductsFiltersGeneric18 = [];
    let arrIdsProductsFiltersGeneric19 = [];
    let arrIdsProductsFiltersGeneric20 = [];
    let arrIdsProductsFiltersGeneric21 = [];
    let arrIdsProductsFiltersGeneric22 = [];
    let arrIdsProductsFiltersGeneric23 = [];
    let arrIdsProductsFiltersGeneric24 = [];
    let arrIdsProductsFiltersGeneric25 = [];
    let arrIdsProductsFiltersGeneric26 = [];
    let arrIdsProductsFiltersGeneric27 = [];
    let arrIdsProductsFiltersGeneric28 = [];
    let arrIdsProductsFiltersGeneric29 = [];
    let arrIdsProductsFiltersGeneric30 = [];

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
            tblProductsID = await new Promise((resolve, reject)=>{
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
                        if(gSystemConfig.enableProductsFilterGeneric1 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric1")
                            {
                                //fieldsPost.idsProductsFiltersGeneric1.push(value);
                                arrIdsProductsFiltersGeneric1.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric2 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric2")
                            {
                                arrIdsProductsFiltersGeneric2.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric3 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric3")
                            {
                                arrIdsProductsFiltersGeneric3.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric4 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric4")
                            {
                                arrIdsProductsFiltersGeneric4.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric5 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric5")
                            {
                                arrIdsProductsFiltersGeneric5.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric6 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric6")
                            {
                                arrIdsProductsFiltersGeneric6.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric7 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric7")
                            {
                                arrIdsProductsFiltersGeneric7.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric8 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric8")
                            {
                                arrIdsProductsFiltersGeneric8.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric9 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric9")
                            {
                                arrIdsProductsFiltersGeneric9.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric10 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric10")
                            {
                                arrIdsProductsFiltersGeneric10.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric11 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric11")
                            {
                                //fieldsPost.idsProductsFiltersGeneric11.push(value);
                                arrIdsProductsFiltersGeneric11.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric12 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric12")
                            {
                                arrIdsProductsFiltersGeneric12.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric13 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric13")
                            {
                                arrIdsProductsFiltersGeneric13.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric14 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric14")
                            {
                                arrIdsProductsFiltersGeneric14.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric15 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric15")
                            {
                                arrIdsProductsFiltersGeneric15.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric16 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric16")
                            {
                                arrIdsProductsFiltersGeneric16.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric17 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric17")
                            {
                                arrIdsProductsFiltersGeneric17.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric18 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric18")
                            {
                                arrIdsProductsFiltersGeneric18.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric19 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric19")
                            {
                                arrIdsProductsFiltersGeneric19.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric20 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric20")
                            {
                                arrIdsProductsFiltersGeneric20.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric21 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric21")
                            {
                                //fieldsPost.idsProductsFiltersGeneric21.push(value);
                                arrIdsProductsFiltersGeneric21.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric22 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric22")
                            {
                                arrIdsProductsFiltersGeneric22.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric23 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric23")
                            {
                                arrIdsProductsFiltersGeneric23.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric24 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric24")
                            {
                                arrIdsProductsFiltersGeneric24.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric25 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric25")
                            {
                                arrIdsProductsFiltersGeneric25.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric26 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric26")
                            {
                                arrIdsProductsFiltersGeneric26.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric27 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric27")
                            {
                                arrIdsProductsFiltersGeneric27.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric28 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric28")
                            {
                                arrIdsProductsFiltersGeneric28.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric29 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric29")
                            {
                                arrIdsProductsFiltersGeneric29.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric30 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric30")
                            {
                                arrIdsProductsFiltersGeneric30.push(value);
                            }
                        }
                        

                        /*if (fieldsPost[name]) {
                        if (!Array.isArray(fieldsPost[name])) {
                            fieldsPost[name] = [fieldsPost[name]];
                        }
                        fieldsPost[name].push(value);
                        //arrIdsProductsFiltersGeneric1.push(fieldsPost.idsProductsFiltersGeneric1);

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
                        //var resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblProductsID, 
                        resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblProductsID, 
                                                                                                    this.openedFiles, 
                                                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                                                    "");
                        */


                        //Check fields with files.

                        //Build file fields references.
                        //image_main field.
                        if(gSystemConfig.enableProductsImageMain == 1)
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
                        if(gSystemConfig.enableProductsFile1 == 1)
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
                        if(gSystemConfig.enableProductsFile2 == 1)
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
                        if(gSystemConfig.enableProductsFile3 == 1)
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
                        if(gSystemConfig.enableProductsFile4 == 1)
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
                        if(gSystemConfig.enableProductsFile5 == 1)
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
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblProductsID, 
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
                            tblProductsImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblProductsImageMain;
                            tblProductsImageFile1 = (resultsFunctionsFiles.hasOwnProperty("file1") === true) ? resultsFunctionsFiles.file1 : tblProductsImageFile1;
                            tblProductsImageFile2 = (resultsFunctionsFiles.hasOwnProperty("file2") === true) ? resultsFunctionsFiles.file2 : tblProductsImageFile2;
                            tblProductsImageFile3 = (resultsFunctionsFiles.hasOwnProperty("file3") === true) ? resultsFunctionsFiles.file3 : tblProductsImageFile3;
                            tblProductsImageFile4 = (resultsFunctionsFiles.hasOwnProperty("file4") === true) ? resultsFunctionsFiles.file4 : tblProductsImageFile4;
                            tblProductsImageFile5 = (resultsFunctionsFiles.hasOwnProperty("file5") === true) ? resultsFunctionsFiles.file5 : tblProductsImageFile5;


                            //Resize images.
                            if(tblProductsImageMain !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrProductsImageSize, gSystemConfig.configDirectoryFiles, tblProductsImageMain);
                            }
                            if(tblProductsImageFile1 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrProductsImageSize, gSystemConfig.configDirectoryFiles, tblProductsImageFile1);
                            }
                            if(tblProductsImageFile2 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrProductsImageSize, gSystemConfig.configDirectoryFiles, tblProductsImageFile2);
                            }
                            if(tblProductsImageFile3 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrProductsImageSize, gSystemConfig.configDirectoryFiles, tblProductsImageFile3);
                            }
                            if(tblProductsImageFile4 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrProductsImageSize, gSystemConfig.configDirectoryFiles, tblProductsImageFile4);
                            }
                            if(tblProductsImageFile5 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrProductsImageSize, gSystemConfig.configDirectoryFiles, tblProductsImageFile5);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblProductsImageMain=", tblCategoriesImageMain);
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
            //tblProductsID = "";
            tblProductsIdParent = formParseResults.fields.id_parent;
            tblProductsSortOrder = formParseResults.fields.sort_order;
            tblProductsIdType = formParseResults.fields.id_type;
        
            tblProductsCode = formParseResults.fields.code;
            tblProductsTitle = formParseResults.fields.title;
            tblProductsDescription = formParseResults.fields.description;
        
            tblProductsURLAlias = formParseResults.fields.url_alias;
            tblProductsKeywordsTags = formParseResults.fields.keywords_tags;
            tblProductsMetaDescription = formParseResults.fields.meta_description;
            tblProductsMetaTitle = formParseResults.fields.meta_title;

            tblProductsInfo1 = formParseResults.fields.info1;
            tblProductsInfo2 = formParseResults.fields.info2;
            tblProductsInfo3 = formParseResults.fields.info3;
            tblProductsInfo4 = formParseResults.fields.info4;
            tblProductsInfo5 = formParseResults.fields.info5;
            tblProductsInfo6 = formParseResults.fields.info6;
            tblProductsInfo7 = formParseResults.fields.info7;
            tblProductsInfo8 = formParseResults.fields.info8;
            tblProductsInfo9 = formParseResults.fields.info9;
            tblProductsInfo10 = formParseResults.fields.info10;
            tblProductsInfo11 = formParseResults.fields.info11;
            tblProductsInfo12 = formParseResults.fields.info12;
            tblProductsInfo13 = formParseResults.fields.info13;
            tblProductsInfo14 = formParseResults.fields.info14;
            tblProductsInfo15 = formParseResults.fields.info15;
            tblProductsInfo16 = formParseResults.fields.info16;
            tblProductsInfo17 = formParseResults.fields.info17;
            tblProductsInfo18 = formParseResults.fields.info18;
            tblProductsInfo19 = formParseResults.fields.info19;
            tblProductsInfo20 = formParseResults.fields.info20;

            tblProductsInfoSmall1 = formParseResults.fields.info_small1;
            tblProductsInfoSmall2 = formParseResults.fields.info_small2;
            tblProductsInfoSmall3 = formParseResults.fields.info_small3;
            tblProductsInfoSmall4 = formParseResults.fields.info_small4;
            tblProductsInfoSmall5 = formParseResults.fields.info_small5;
            tblProductsInfoSmall6 = formParseResults.fields.info_small6;
            tblProductsInfoSmall7 = formParseResults.fields.info_small7;
            tblProductsInfoSmall8 = formParseResults.fields.info_small8;
            tblProductsInfoSmall9 = formParseResults.fields.info_small9;
            tblProductsInfoSmall10 = formParseResults.fields.info_small10;
            tblProductsInfoSmall11 = formParseResults.fields.info_small11;
            tblProductsInfoSmall12 = formParseResults.fields.info_small12;
            tblProductsInfoSmall13 = formParseResults.fields.info_small13;
            tblProductsInfoSmall14 = formParseResults.fields.info_small14;
            tblProductsInfoSmall15 = formParseResults.fields.info_small15;
            tblProductsInfoSmall16 = formParseResults.fields.info_small16;
            tblProductsInfoSmall17 = formParseResults.fields.info_small17;
            tblProductsInfoSmall18 = formParseResults.fields.info_small18;
            tblProductsInfoSmall19 = formParseResults.fields.info_small19;
            tblProductsInfoSmall20 = formParseResults.fields.info_small20;
            tblProductsInfoSmall21 = formParseResults.fields.info_small21;
            tblProductsInfoSmall22 = formParseResults.fields.info_small22;
            tblProductsInfoSmall23 = formParseResults.fields.info_small23;
            tblProductsInfoSmall24 = formParseResults.fields.info_small24;
            tblProductsInfoSmall25 = formParseResults.fields.info_small25;
            tblProductsInfoSmall26 = formParseResults.fields.info_small26;
            tblProductsInfoSmall27 = formParseResults.fields.info_small27;
            tblProductsInfoSmall28 = formParseResults.fields.info_small28;
            tblProductsInfoSmall29 = formParseResults.fields.info_small29;
            tblProductsInfoSmall30 = formParseResults.fields.info_small30;

            tblProductsValue = formParseResults.fields.value;
            tblProductsValue1 = formParseResults.fields.value1;
            tblProductsValue2 = formParseResults.fields.value2;
            tblProductsWeight = formParseResults.fields.weight;
            tblProductsCoefficient = formParseResults.fields.coefficient;
        
            tblProductsNumber1 = formParseResults.fields.number1;
            tblProductsNumber2 = formParseResults.fields.number2;
            tblProductsNumber3 = formParseResults.fields.number3;
            tblProductsNumber4 = formParseResults.fields.number4;
            tblProductsNumber5 = formParseResults.fields.number5;
            
            tblProductsNumberSmall1 = formParseResults.fields.number_small1;
            tblProductsNumberSmall2 = formParseResults.fields.number_small2;
            tblProductsNumberSmall3 = formParseResults.fields.number_small3;
            tblProductsNumberSmall4 = formParseResults.fields.number_small4;
            tblProductsNumberSmall5 = formParseResults.fields.number_small5;

            tblProductsURL1 = formParseResults.fields.url1;
            tblProductsURL2 = formParseResults.fields.url2;
            tblProductsURL3 = formParseResults.fields.url3;
            tblProductsURL4 = formParseResults.fields.url4;
            tblProductsURL5 = formParseResults.fields.url5;
        
            tblProductsDate1 = formParseResults.fields.date1;
            tblProductsDate1Hour = formParseResults.fields.date1_hour;
            tblProductsDate1Minute = formParseResults.fields.date1_minute;
            tblProductsDate1Seconds = formParseResults.fields.date1_seconds;
            tblProductsDate1Day = formParseResults.fields.date1_day;
            tblProductsDate1Month = formParseResults.fields.date1_month;
            tblProductsDate1Year = formParseResults.fields.date1_year;
            //Mount.
            tblProductsDate1 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblProductsDate1,
                                                                            dateFieldDay: tblProductsDate1Day,
                                                                            dateFieldMonth: tblProductsDate1Month,
                                                                            dateFieldYear: tblProductsDate1Year,
                                                                            dateFieldHour: tblProductsDate1Hour,
                                                                            dateFieldMinute: tblProductsDate1Minute,
                                                                            dateFieldSeconds: tblProductsDate1Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");/**/
            
            tblProductsDate2 = formParseResults.fields.date2;
            tblProductsDate2Hour = formParseResults.fields.date2_hour;
            tblProductsDate2Minute = formParseResults.fields.date2_minute;
            tblProductsDate2Seconds = formParseResults.fields.date2_seconds;
            tblProductsDate2Day = formParseResults.fields.date2_day;
            tblProductsDate2Month = formParseResults.fields.date2_month;
            tblProductsDate2Year = formParseResults.fields.date2_year;
            //Mount.
            tblProductsDate2 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblProductsDate2,
                                                                            dateFieldDay: tblProductsDate2Day,
                                                                            dateFieldMonth: tblProductsDate2Month,
                                                                            dateFieldYear: tblProductsDate2Year,
                                                                            dateFieldHour: tblProductsDate2Hour,
                                                                            dateFieldMinute: tblProductsDate2Minute,
                                                                            dateFieldSeconds: tblProductsDate2Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblProductsDate3 = formParseResults.fields.date3;
            tblProductsDate3Hour = formParseResults.fields.date3_hour;
            tblProductsDate3Minute = formParseResults.fields.date3_minute;
            tblProductsDate3Seconds = formParseResults.fields.date3_seconds;
            tblProductsDate3Day = formParseResults.fields.date3_day;
            tblProductsDate3Month = formParseResults.fields.date3_month;
            tblProductsDate3Year = formParseResults.fields.date3_year;
            //Mount.
            tblProductsDate3 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblProductsDate3,
                                                                            dateFieldDay: tblProductsDate3Day,
                                                                            dateFieldMonth: tblProductsDate3Month,
                                                                            dateFieldYear: tblProductsDate3Year,
                                                                            dateFieldHour: tblProductsDate3Hour,
                                                                            dateFieldMinute: tblProductsDate3Minute,
                                                                            dateFieldSeconds: tblProductsDate3Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblProductsDate4 = formParseResults.fields.date4;
            tblProductsDate4Hour = formParseResults.fields.date4_hour;
            tblProductsDate4Minute = formParseResults.fields.date4_minute;
            tblProductsDate4Seconds = formParseResults.fields.date4_seconds;
            tblProductsDate4Day = formParseResults.fields.date4_day;
            tblProductsDate4Month = formParseResults.fields.date4_month;
            tblProductsDate4Year = formParseResults.fields.date4_year;
            //Mount.
            tblProductsDate4 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblProductsDate4,
                                                                            dateFieldDay: tblProductsDate4Day,
                                                                            dateFieldMonth: tblProductsDate4Month,
                                                                            dateFieldYear: tblProductsDate4Year,
                                                                            dateFieldHour: tblProductsDate4Hour,
                                                                            dateFieldMinute: tblProductsDate4Minute,
                                                                            dateFieldSeconds: tblProductsDate4Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblProductsDate5 = formParseResults.fields.date5;
            tblProductsDate5Hour = formParseResults.fields.date5_hour;
            tblProductsDate5Minute = formParseResults.fields.date5_minute;
            tblProductsDate5Seconds = formParseResults.fields.date5_seconds;
            tblProductsDate5Day = formParseResults.fields.date5_day;
            tblProductsDate5Month = formParseResults.fields.date5_month;
            tblProductsDate5Year = formParseResults.fields.date5_year;
            //Mount.
            tblProductsDate5 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblProductsDate5,
                                                                            dateFieldDay: tblProductsDate5Day,
                                                                            dateFieldMonth: tblProductsDate5Month,
                                                                            dateFieldYear: tblProductsDate5Year,
                                                                            dateFieldHour: tblProductsDate5Hour,
                                                                            dateFieldMinute: tblProductsDate5Minute,
                                                                            dateFieldSeconds: tblProductsDate5Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");/**/


            tblProductsImageMainCaption = formParseResults.fields.image_main_caption;
            tblProductsActivation = formParseResults.fields.activation;
            tblProductsActivation1 = formParseResults.fields.activation1;
            tblProductsActivation2 = formParseResults.fields.activation2;
            tblProductsActivation3 = formParseResults.fields.activation3;
            tblProductsActivation4 = formParseResults.fields.activation4;
            tblProductsActivation5 = formParseResults.fields.activation5;

            tblProductsIdStatus = formParseResults.fields.id_status;
            tblProductsRestrictedAccess = formParseResults.fields.restricted_access

            tblProductsNotes = formParseResults.fields.notes

            idParent = formParseResults.fields.idParent;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendProducts + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //Insert record.
            //----------------------
            let productsInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.productsInsert_async({
                    _tblProductsID: tblProductsID,
                    _tblProductsIdParent: tblProductsIdParent,
                    _tblProductsSortOrder: tblProductsSortOrder,
                    _tblProductsIdType: tblProductsIdType,
                    _tblProductsDateCreation: "",
                    //_tblProductsDateTimezone: "",
                    _tblProductsDateEdit: "",
                    _tblProductsIdRegisterUser: "0",
                    _tblProductsIdRegister1: "0",
                    _tblProductsIdRegister2: "0",
                    _tblProductsIdRegister3: "0",
                    _tblProductsIdRegister4: "0",
                    _tblProductsIdRegister5: "0",
                    _tblProductsCode: tblProductsCode,
                    _tblProductsTitle: tblProductsTitle,
                    _tblProductsDescription: tblProductsDescription,
                    _tblProductsURLAlias: tblProductsURLAlias,
                    _tblProductsKeywordsTags: tblProductsKeywordsTags,
                    _tblProductsMetaDescription: tblProductsMetaDescription,
                    _tblProductsMetaTitle: tblProductsMetaTitle,
                    _tblProductsMetaInfo: "",
                    _tblProductsInfo1: tblProductsInfo1,
                    _tblProductsInfo2: tblProductsInfo2,
                    _tblProductsInfo3: tblProductsInfo3,
                    _tblProductsInfo4: tblProductsInfo4,
                    _tblProductsInfo5: tblProductsInfo5,
                    _tblProductsInfo6: tblProductsInfo6,
                    _tblProductsInfo7: tblProductsInfo7,
                    _tblProductsInfo8: tblProductsInfo8,
                    _tblProductsInfo9: tblProductsInfo9,
                    _tblProductsInfo10: tblProductsInfo10,
                    _tblProductsInfo11: tblProductsInfo11,
                    _tblProductsInfo12: tblProductsInfo12,
                    _tblProductsInfo13: tblProductsInfo13,
                    _tblProductsInfo14: tblProductsInfo14,
                    _tblProductsInfo15: tblProductsInfo15,
                    _tblProductsInfo16: tblProductsInfo16,
                    _tblProductsInfo17: tblProductsInfo17,
                    _tblProductsInfo18: tblProductsInfo18,
                    _tblProductsInfo19: tblProductsInfo19,
                    _tblProductsInfo20: tblProductsInfo20,
                    _tblProductsInfoSmall1: tblProductsInfoSmall1,
                    _tblProductsInfoSmall2: tblProductsInfoSmall2,
                    _tblProductsInfoSmall3: tblProductsInfoSmall3,
                    _tblProductsInfoSmall4: tblProductsInfoSmall4,
                    _tblProductsInfoSmall5: tblProductsInfoSmall5,
                    _tblProductsInfoSmall6: tblProductsInfoSmall6,
                    _tblProductsInfoSmall7: tblProductsInfoSmall7,
                    _tblProductsInfoSmall8: tblProductsInfoSmall8,
                    _tblProductsInfoSmall9: tblProductsInfoSmall9,
                    _tblProductsInfoSmall10: tblProductsInfoSmall10,
                    _tblProductsInfoSmall11: tblProductsInfoSmall11,
                    _tblProductsInfoSmall12: tblProductsInfoSmall12,
                    _tblProductsInfoSmall13: tblProductsInfoSmall13,
                    _tblProductsInfoSmall14: tblProductsInfoSmall14,
                    _tblProductsInfoSmall15: tblProductsInfoSmall15,
                    _tblProductsInfoSmall16: tblProductsInfoSmall16,
                    _tblProductsInfoSmall17: tblProductsInfoSmall17,
                    _tblProductsInfoSmall18: tblProductsInfoSmall18,
                    _tblProductsInfoSmall19: tblProductsInfoSmall19,
                    _tblProductsInfoSmall20: tblProductsInfoSmall20,
                    _tblProductsInfoSmall21: tblProductsInfoSmall21,
                    _tblProductsInfoSmall22: tblProductsInfoSmall22,
                    _tblProductsInfoSmall23: tblProductsInfoSmall23,
                    _tblProductsInfoSmall24: tblProductsInfoSmall24,
                    _tblProductsInfoSmall25: tblProductsInfoSmall25,
                    _tblProductsInfoSmall26: tblProductsInfoSmall26,
                    _tblProductsInfoSmall27: tblProductsInfoSmall27,
                    _tblProductsInfoSmall28: tblProductsInfoSmall28,
                    _tblProductsInfoSmall29: tblProductsInfoSmall29,
                    _tblProductsInfoSmall30: tblProductsInfoSmall30,
                    _tblProductsValue: tblProductsValue,
                    _tblProductsValue1: tblProductsValue1,
                    _tblProductsValue2: tblProductsValue2,
                    _tblProductsWeight: tblProductsWeight,
                    _tblProductsCoefficient: tblProductsCoefficient,
                    _tblProductsNumber1: tblProductsNumber1,
                    _tblProductsNumber2: tblProductsNumber2,
                    _tblProductsNumber3: tblProductsNumber3,
                    _tblProductsNumber4: tblProductsNumber4,
                    _tblProductsNumber5: tblProductsNumber5,
                    _tblProductsNumberSmall1: tblProductsNumberSmall1,
                    _tblProductsNumberSmall2: tblProductsNumberSmall2,
                    _tblProductsNumberSmall3: tblProductsNumberSmall3,
                    _tblProductsNumberSmall4: tblProductsNumberSmall4,
                    _tblProductsNumberSmall5: tblProductsNumberSmall5,
                    _tblProductsURL1: tblProductsURL1,
                    _tblProductsURL2: tblProductsURL2,
                    _tblProductsURL3: tblProductsURL3,
                    _tblProductsURL4: tblProductsURL4,
                    _tblProductsURL5: tblProductsURL5,
                    _tblProductsDate1: tblProductsDate1,
                    _tblProductsDate2: tblProductsDate2,
                    _tblProductsDate3: tblProductsDate3,
                    _tblProductsDate4: tblProductsDate4,
                    _tblProductsDate5: tblProductsDate5,
                    _tblProductsIdItem1: "",
                    _tblProductsIdItem2: "",
                    _tblProductsIdItem3: "",
                    _tblProductsIdItem4: "",
                    _tblProductsIdItem5: "",
                    _tblProductsImageMain: tblProductsImageMain,
                    _tblProductsImageMainCaption: tblProductsImageMainCaption,
                    _tblProductsFile1: tblProductsImageFile1,
                    _tblProductsFile2: tblProductsImageFile2,
                    _tblProductsFile3: tblProductsImageFile3,
                    _tblProductsFile4: tblProductsImageFile4,
                    _tblProductsFile5: tblProductsImageFile5,
                    _tblProductsActivation: tblProductsActivation,
                    _tblProductsActivation1: tblProductsActivation1,
                    _tblProductsActivation2: tblProductsActivation2,
                    _tblProductsActivation3: tblProductsActivation3,
                    _tblProductsActivation4: tblProductsActivation4,
                    _tblProductsActivation5: tblProductsActivation5,
                    _tblProductsIdStatus: tblProductsIdStatus,
                    _tblProductsRestrictedAccess: tblProductsRestrictedAccess,
                    _tblProductsNotes: tblProductsNotes,
                    _arrIdsProductsFiltersGeneric1: arrIdsProductsFiltersGeneric1,
                    _arrIdsProductsFiltersGeneric2: arrIdsProductsFiltersGeneric2,
                    _arrIdsProductsFiltersGeneric3: arrIdsProductsFiltersGeneric3,
                    _arrIdsProductsFiltersGeneric4: arrIdsProductsFiltersGeneric4,
                    _arrIdsProductsFiltersGeneric5: arrIdsProductsFiltersGeneric5,
                    _arrIdsProductsFiltersGeneric6: arrIdsProductsFiltersGeneric6,
                    _arrIdsProductsFiltersGeneric7: arrIdsProductsFiltersGeneric7,
                    _arrIdsProductsFiltersGeneric8: arrIdsProductsFiltersGeneric8,
                    _arrIdsProductsFiltersGeneric9: arrIdsProductsFiltersGeneric9,
                    _arrIdsProductsFiltersGeneric10: arrIdsProductsFiltersGeneric10,
                    _arrIdsProductsFiltersGeneric11: arrIdsProductsFiltersGeneric11,
                    _arrIdsProductsFiltersGeneric12: arrIdsProductsFiltersGeneric12,
                    _arrIdsProductsFiltersGeneric13: arrIdsProductsFiltersGeneric13,
                    _arrIdsProductsFiltersGeneric14: arrIdsProductsFiltersGeneric14,
                    _arrIdsProductsFiltersGeneric15: arrIdsProductsFiltersGeneric15,
                    _arrIdsProductsFiltersGeneric16: arrIdsProductsFiltersGeneric16,
                    _arrIdsProductsFiltersGeneric17: arrIdsProductsFiltersGeneric17,
                    _arrIdsProductsFiltersGeneric18: arrIdsProductsFiltersGeneric18,
                    _arrIdsProductsFiltersGeneric19: arrIdsProductsFiltersGeneric19,
                    _arrIdsProductsFiltersGeneric20: arrIdsProductsFiltersGeneric20,
                    _arrIdsProductsFiltersGeneric21: arrIdsProductsFiltersGeneric21,
                    _arrIdsProductsFiltersGeneric22: arrIdsProductsFiltersGeneric22,
                    _arrIdsProductsFiltersGeneric23: arrIdsProductsFiltersGeneric23,
                    _arrIdsProductsFiltersGeneric24: arrIdsProductsFiltersGeneric24,
                    _arrIdsProductsFiltersGeneric25: arrIdsProductsFiltersGeneric25,
                    _arrIdsProductsFiltersGeneric26: arrIdsProductsFiltersGeneric26,
                    _arrIdsProductsFiltersGeneric27: arrIdsProductsFiltersGeneric27,
                    _arrIdsProductsFiltersGeneric28: arrIdsProductsFiltersGeneric28,
                    _arrIdsProductsFiltersGeneric29: arrIdsProductsFiltersGeneric29,
                    _arrIdsProductsFiltersGeneric30: arrIdsProductsFiltersGeneric30
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
            if(productsInsertResult == true)
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
            //console.log("tblProductsID=", tblProductsID);
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


//Backend - Products - edit - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendProducts + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbProducts?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendProducts + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbProducts?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    
    //Import objects.
    //----------------------
    const ProductsEdit = require("../" + gSystemConfig.configDirectorySystem + "/products-edit.js");
    //----------------------
    

    //Variables.
    //----------------------
    let peBackend;
    let idTbProducts = "";

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
    if(req.params.idTbProducts)
    {
        idTbProducts = req.params.idTbProducts;
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
            peBackend = new ProductsEdit({
                idTbProducts: idTbProducts,

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

    
    //Degug.
    //console.log("idTbCategories=", idTbCategories);
    //console.log("pageNumber=", pageNumber);
    //console.log("masterPageSelect=", masterPageSelect);
});
//**************************************************************************************


//Backend - Products - PUT (edit).
//**************************************************************************************
//router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendProducts + "/" + gSystemConfig.configRouteBackendActionEdit, (req, res)=>{ //working, with the async block
router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendProducts + "/" + gSystemConfig.configRouteBackendActionEdit, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Variables
    //----------------------
    let tblProductsID = "";
    let tblProductsIdParent = "";
    let tblProductsSortOrder = 0;
    let tblProductsIdType = 0; 

    let tblProductsIdRegisterUser = 0;
    let tblProductsIdRegister1 = 0;
    let tblProductsIdRegister2 = 0;
    let tblProductsIdRegister3 = 0;
    let tblProductsIdRegister4 = 0;
    let tblProductsIdRegister5 = 0;

    let tblProductsCode = "";
    let tblProductsTitle = "";
    let tblProductsDescription = "";

    let tblProductsURLAlias = "";
    let tblProductsKeywordsTags = "";
    let tblProductsMetaDescription = "";
    let tblProductsMetaTitle = "";

    let tblProductsInfo1 = "";
    let tblProductsInfo2 = "";
    let tblProductsInfo3 = "";
    let tblProductsInfo4 = "";
    let tblProductsInfo5 = "";
    let tblProductsInfo6 = "";
    let tblProductsInfo7 = "";
    let tblProductsInfo8 = "";
    let tblProductsInfo9 = "";
    let tblProductsInfo10 = "";
    let tblProductsInfo11 = "";
    let tblProductsInfo12 = "";
    let tblProductsInfo13 = "";
    let tblProductsInfo14 = "";
    let tblProductsInfo15 = "";
    let tblProductsInfo16 = "";
    let tblProductsInfo17 = "";
    let tblProductsInfo18 = "";
    let tblProductsInfo19 = "";
    let tblProductsInfo20 = "";

    let tblProductsInfoSmall1 = "";
    let tblProductsInfoSmall2 = "";
    let tblProductsInfoSmall3 = "";
    let tblProductsInfoSmall4 = "";
    let tblProductsInfoSmall5 = "";
    let tblProductsInfoSmall6 = "";
    let tblProductsInfoSmall7 = "";
    let tblProductsInfoSmall8 = "";
    let tblProductsInfoSmall9 = "";
    let tblProductsInfoSmall10 = "";
    let tblProductsInfoSmall11 = "";
    let tblProductsInfoSmall12 = "";
    let tblProductsInfoSmall13 = "";
    let tblProductsInfoSmall14 = "";
    let tblProductsInfoSmall15 = "";
    let tblProductsInfoSmall16 = "";
    let tblProductsInfoSmall17 = "";
    let tblProductsInfoSmall18 = "";
    let tblProductsInfoSmall19 = "";
    let tblProductsInfoSmall20 = "";
    let tblProductsInfoSmall21 = "";
    let tblProductsInfoSmall22 = "";
    let tblProductsInfoSmall23 = "";
    let tblProductsInfoSmall24 = "";
    let tblProductsInfoSmall25 = "";
    let tblProductsInfoSmall26 = "";
    let tblProductsInfoSmall27 = "";
    let tblProductsInfoSmall28 = "";
    let tblProductsInfoSmall29 = "";
    let tblProductsInfoSmall30 = "";

    let tblProductsValue = 0;
    let tblProductsValue1 = 0;
    let tblProductsValue2 = 0;
    let tblProductsWeight = 0;
    let tblProductsCoefficient = 0;

    let tblProductsNumber1 = 0;
    let tblProductsNumber2 = 0;
    let tblProductsNumber3 = 0;
    let tblProductsNumber4 = 0;
    let tblProductsNumber5 = 0;

    let tblProductsNumberSmall1 = 0;
    let tblProductsNumberSmall2 = 0;
    let tblProductsNumberSmall3 = 0;
    let tblProductsNumberSmall4 = 0;
    let tblProductsNumberSmall5 = 0;

    let tblProductsURL1 = "";
    let tblProductsURL2 = "";
    let tblProductsURL3 = "";
    let tblProductsURL4 = "";
    let tblProductsURL5 = "";

    let tblProductsDate1 = "", tblProductsDate1Hour = "", tblProductsDate1Minute = "", tblProductsDate1Seconds = "", tblProductsDate1Day = "", tblProductsDate1Month = "", tblProductsDate1Year = "";
    let tblProductsDate2 = "", tblProductsDate2Hour = "", tblProductsDate2Minute = "", tblProductsDate2Seconds = "", tblProductsDate2Day = "", tblProductsDate2Month = "", tblProductsDate2Year = "";
    let tblProductsDate3 = "", tblProductsDate3Hour = "", tblProductsDate3Minute = "", tblProductsDate3Seconds = "", tblProductsDate3Day = "", tblProductsDate3Month = "", tblProductsDate3Year = "";
    let tblProductsDate4 = "", tblProductsDate4Hour = "", tblProductsDate4Minute = "", tblProductsDate4Seconds = "", tblProductsDate4Day = "", tblProductsDate4Month = "", tblProductsDate4Year = "";
    let tblProductsDate5 = "", tblProductsDate5Hour = "", tblProductsDate5Minute = "", tblProductsDate5Seconds = "", tblProductsDate5Day = "", tblProductsDate5Month = "", tblProductsDate5Year = "";

    let tblProductsImageMain = "";
    let tblProductsImageMainCaption = "";
    let tblProductsImageFile1 = "";
    let tblProductsImageFile2 = "";
    let tblProductsImageFile3 = "";
    let tblProductsImageFile4 = "";
    let tblProductsImageFile5 = "";

    let tblProductsActivation = "";
    let tblProductsActivation1 = "";
    let tblProductsActivation2 = "";
    let tblProductsActivation3 = "";
    let tblProductsActivation4 = "";
    let tblProductsActivation5 = "";

    let tblProductsIdStatus = "";
    let tblProductsRestrictedAccess = "";

    let tblProductsNotes = "";

    let arrIdsProductsFiltersGeneric1 = [];
    let arrIdsProductsFiltersGeneric2 = [];
    let arrIdsProductsFiltersGeneric3 = [];
    let arrIdsProductsFiltersGeneric4 = [];
    let arrIdsProductsFiltersGeneric5 = [];
    let arrIdsProductsFiltersGeneric6 = [];
    let arrIdsProductsFiltersGeneric7 = [];
    let arrIdsProductsFiltersGeneric8 = [];
    let arrIdsProductsFiltersGeneric9 = [];
    let arrIdsProductsFiltersGeneric10 = [];
    let arrIdsProductsFiltersGeneric11 = [];
    let arrIdsProductsFiltersGeneric12 = [];
    let arrIdsProductsFiltersGeneric13 = [];
    let arrIdsProductsFiltersGeneric14 = [];
    let arrIdsProductsFiltersGeneric15 = [];
    let arrIdsProductsFiltersGeneric16 = [];
    let arrIdsProductsFiltersGeneric17 = [];
    let arrIdsProductsFiltersGeneric18 = [];
    let arrIdsProductsFiltersGeneric19 = [];
    let arrIdsProductsFiltersGeneric20 = [];
    let arrIdsProductsFiltersGeneric21 = [];
    let arrIdsProductsFiltersGeneric22 = [];
    let arrIdsProductsFiltersGeneric23 = [];
    let arrIdsProductsFiltersGeneric24 = [];
    let arrIdsProductsFiltersGeneric25 = [];
    let arrIdsProductsFiltersGeneric26 = [];
    let arrIdsProductsFiltersGeneric27 = [];
    let arrIdsProductsFiltersGeneric28 = [];
    let arrIdsProductsFiltersGeneric29 = [];
    let arrIdsProductsFiltersGeneric30 = [];

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
                            tblProductsID = fieldsPost.id;
                            

                            //console.log("formParseResults.files.image_main=", formParseResults.files.image_main);

                            //resolve({fields: fields, files: files}); //working
                        }
                    });
                    //----------------------


                    //Field parsing.
                    //----------------------
                    form.on('field', function(name, value){

                        //Array detection.
                        if(gSystemConfig.enableProductsFilterGeneric1 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric1")
                            {
                                //fieldsPost.idsProductsFiltersGeneric1.push(value);
                                arrIdsProductsFiltersGeneric1.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric2 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric2")
                            {
                                arrIdsProductsFiltersGeneric2.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric3 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric3")
                            {
                                arrIdsProductsFiltersGeneric3.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric4 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric4")
                            {
                                arrIdsProductsFiltersGeneric4.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric5 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric5")
                            {
                                arrIdsProductsFiltersGeneric5.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric6 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric6")
                            {
                                arrIdsProductsFiltersGeneric6.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric7 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric7")
                            {
                                arrIdsProductsFiltersGeneric7.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric8 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric8")
                            {
                                arrIdsProductsFiltersGeneric8.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric9 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric9")
                            {
                                arrIdsProductsFiltersGeneric9.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric10 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric10")
                            {
                                arrIdsProductsFiltersGeneric10.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric11 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric11")
                            {
                                //fieldsPost.idsProductsFiltersGeneric11.push(value);
                                arrIdsProductsFiltersGeneric11.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric12 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric12")
                            {
                                arrIdsProductsFiltersGeneric12.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric13 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric13")
                            {
                                arrIdsProductsFiltersGeneric13.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric14 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric14")
                            {
                                arrIdsProductsFiltersGeneric14.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric15 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric15")
                            {
                                arrIdsProductsFiltersGeneric15.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric16 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric16")
                            {
                                arrIdsProductsFiltersGeneric16.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric17 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric17")
                            {
                                arrIdsProductsFiltersGeneric17.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric18 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric18")
                            {
                                arrIdsProductsFiltersGeneric18.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric19 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric19")
                            {
                                arrIdsProductsFiltersGeneric19.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric20 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric20")
                            {
                                arrIdsProductsFiltersGeneric20.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric21 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric21")
                            {
                                //fieldsPost.idsProductsFiltersGeneric21.push(value);
                                arrIdsProductsFiltersGeneric21.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric22 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric22")
                            {
                                arrIdsProductsFiltersGeneric22.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric23 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric23")
                            {
                                arrIdsProductsFiltersGeneric23.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric24 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric24")
                            {
                                arrIdsProductsFiltersGeneric24.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric25 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric25")
                            {
                                arrIdsProductsFiltersGeneric25.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric26 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric26")
                            {
                                arrIdsProductsFiltersGeneric26.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric27 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric27")
                            {
                                arrIdsProductsFiltersGeneric27.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric28 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric28")
                            {
                                arrIdsProductsFiltersGeneric28.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric29 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric29")
                            {
                                arrIdsProductsFiltersGeneric29.push(value);
                            }
                        }
                        if(gSystemConfig.enableProductsFilterGeneric30 != 0)
                        {
                            if(name.toString() == "idsProductsFiltersGeneric30")
                            {
                                arrIdsProductsFiltersGeneric30.push(value);
                            }
                        }



                        /*if (fieldsPost[name]) {
                        if (!Array.isArray(fieldsPost[name])) {
                            fieldsPost[name] = [fieldsPost[name]];
                        }
                        fieldsPost[name].push(value);
                        //arrIdsProductsFiltersGeneric1.push(fieldsPost.idsProductsFiltersGeneric1);

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
                        //var resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblProductsID, 
                        resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblProductsID, 
                                                                                                    this.openedFiles, 
                                                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                                                    "");
                        */


                        //Check fields with files.

                        //Build file fields references.
                        //image_main field.
                        if(gSystemConfig.enableProductsImageMain == 1)
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
                        if(gSystemConfig.enableProductsFile1 == 1)
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
                        if(gSystemConfig.enableProductsFile2 == 1)
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
                        if(gSystemConfig.enableProductsFile3 == 1)
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
                        if(gSystemConfig.enableProductsFile4 == 1)
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
                        if(gSystemConfig.enableProductsFile5 == 1)
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
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblProductsID, 
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
                            tblProductsImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblProductsImageMain;
                            tblProductsImageFile1 = (resultsFunctionsFiles.hasOwnProperty("file1") === true) ? resultsFunctionsFiles.file1 : tblProductsImageFile1;
                            tblProductsImageFile2 = (resultsFunctionsFiles.hasOwnProperty("file2") === true) ? resultsFunctionsFiles.file2 : tblProductsImageFile2;
                            tblProductsImageFile3 = (resultsFunctionsFiles.hasOwnProperty("file3") === true) ? resultsFunctionsFiles.file3 : tblProductsImageFile3;
                            tblProductsImageFile4 = (resultsFunctionsFiles.hasOwnProperty("file4") === true) ? resultsFunctionsFiles.file4 : tblProductsImageFile4;
                            tblProductsImageFile5 = (resultsFunctionsFiles.hasOwnProperty("file5") === true) ? resultsFunctionsFiles.file5 : tblProductsImageFile5;


                            //Resize images.
                            if(tblProductsImageMain !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrProductsImageSize, gSystemConfig.configDirectoryFiles, tblProductsImageMain);
                            }
                            if(tblProductsImageFile1 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrProductsImageSize, gSystemConfig.configDirectoryFiles, tblProductsImageFile1);
                            }
                            if(tblProductsImageFile2 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrProductsImageSize, gSystemConfig.configDirectoryFiles, tblProductsImageFile2);
                            }
                            if(tblProductsImageFile3 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrProductsImageSize, gSystemConfig.configDirectoryFiles, tblProductsImageFile3);
                            }
                            if(tblProductsImageFile4 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrProductsImageSize, gSystemConfig.configDirectoryFiles, tblProductsImageFile4);
                            }
                            if(tblProductsImageFile5 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrProductsImageSize, gSystemConfig.configDirectoryFiles, tblProductsImageFile5);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblProductsImageMain=", tblCategoriesImageMain);
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
            //tblProductsID = "";
            tblProductsIdParent = formParseResults.fields.id_parent;
            tblProductsSortOrder = formParseResults.fields.sort_order;
            tblProductsIdType = formParseResults.fields.id_type;
        
            tblProductsCode = formParseResults.fields.code;
            tblProductsTitle = formParseResults.fields.title;
            tblProductsDescription = formParseResults.fields.description;
        
            tblProductsURLAlias = formParseResults.fields.url_alias;
            tblProductsKeywordsTags = formParseResults.fields.keywords_tags;
            tblProductsMetaDescription = formParseResults.fields.meta_description;
            tblProductsMetaTitle = formParseResults.fields.meta_title;

            tblProductsInfo1 = formParseResults.fields.info1;
            tblProductsInfo2 = formParseResults.fields.info2;
            tblProductsInfo3 = formParseResults.fields.info3;
            tblProductsInfo4 = formParseResults.fields.info4;
            tblProductsInfo5 = formParseResults.fields.info5;
            tblProductsInfo6 = formParseResults.fields.info6;
            tblProductsInfo7 = formParseResults.fields.info7;
            tblProductsInfo8 = formParseResults.fields.info8;
            tblProductsInfo9 = formParseResults.fields.info9;
            tblProductsInfo10 = formParseResults.fields.info10;
            tblProductsInfo11 = formParseResults.fields.info11;
            tblProductsInfo12 = formParseResults.fields.info12;
            tblProductsInfo13 = formParseResults.fields.info13;
            tblProductsInfo14 = formParseResults.fields.info14;
            tblProductsInfo15 = formParseResults.fields.info15;
            tblProductsInfo16 = formParseResults.fields.info16;
            tblProductsInfo17 = formParseResults.fields.info17;
            tblProductsInfo18 = formParseResults.fields.info18;
            tblProductsInfo19 = formParseResults.fields.info19;
            tblProductsInfo20 = formParseResults.fields.info20;

            tblProductsInfoSmall1 = formParseResults.fields.info_small1;
            tblProductsInfoSmall2 = formParseResults.fields.info_small2;
            tblProductsInfoSmall3 = formParseResults.fields.info_small3;
            tblProductsInfoSmall4 = formParseResults.fields.info_small4;
            tblProductsInfoSmall5 = formParseResults.fields.info_small5;
            tblProductsInfoSmall6 = formParseResults.fields.info_small6;
            tblProductsInfoSmall7 = formParseResults.fields.info_small7;
            tblProductsInfoSmall8 = formParseResults.fields.info_small8;
            tblProductsInfoSmall9 = formParseResults.fields.info_small9;
            tblProductsInfoSmall10 = formParseResults.fields.info_small10;
            tblProductsInfoSmall11 = formParseResults.fields.info_small11;
            tblProductsInfoSmall12 = formParseResults.fields.info_small12;
            tblProductsInfoSmall13 = formParseResults.fields.info_small13;
            tblProductsInfoSmall14 = formParseResults.fields.info_small14;
            tblProductsInfoSmall15 = formParseResults.fields.info_small15;
            tblProductsInfoSmall16 = formParseResults.fields.info_small16;
            tblProductsInfoSmall17 = formParseResults.fields.info_small17;
            tblProductsInfoSmall18 = formParseResults.fields.info_small18;
            tblProductsInfoSmall19 = formParseResults.fields.info_small19;
            tblProductsInfoSmall20 = formParseResults.fields.info_small20;
            tblProductsInfoSmall21 = formParseResults.fields.info_small21;
            tblProductsInfoSmall22 = formParseResults.fields.info_small22;
            tblProductsInfoSmall23 = formParseResults.fields.info_small23;
            tblProductsInfoSmall24 = formParseResults.fields.info_small24;
            tblProductsInfoSmall25 = formParseResults.fields.info_small25;
            tblProductsInfoSmall26 = formParseResults.fields.info_small26;
            tblProductsInfoSmall27 = formParseResults.fields.info_small27;
            tblProductsInfoSmall28 = formParseResults.fields.info_small28;
            tblProductsInfoSmall29 = formParseResults.fields.info_small29;
            tblProductsInfoSmall30 = formParseResults.fields.info_small30;

            tblProductsValue = formParseResults.fields.value;
            tblProductsValue1 = formParseResults.fields.value1;
            tblProductsValue2 = formParseResults.fields.value2;
            tblProductsWeight = formParseResults.fields.weight;
            tblProductsCoefficient = formParseResults.fields.coefficient;
        
            tblProductsNumber1 = formParseResults.fields.number1;
            tblProductsNumber2 = formParseResults.fields.number2;
            tblProductsNumber3 = formParseResults.fields.number3;
            tblProductsNumber4 = formParseResults.fields.number4;
            tblProductsNumber5 = formParseResults.fields.number5;
            
            tblProductsNumberSmall1 = formParseResults.fields.number_small1;
            tblProductsNumberSmall2 = formParseResults.fields.number_small2;
            tblProductsNumberSmall3 = formParseResults.fields.number_small3;
            tblProductsNumberSmall4 = formParseResults.fields.number_small4;
            tblProductsNumberSmall5 = formParseResults.fields.number_small5;

            tblProductsURL1 = formParseResults.fields.url1;
            tblProductsURL2 = formParseResults.fields.url2;
            tblProductsURL3 = formParseResults.fields.url3;
            tblProductsURL4 = formParseResults.fields.url4;
            tblProductsURL5 = formParseResults.fields.url5;
        
            tblProductsDate1 = formParseResults.fields.date1;
            tblProductsDate1Hour = formParseResults.fields.date1_hour;
            tblProductsDate1Minute = formParseResults.fields.date1_minute;
            tblProductsDate1Seconds = formParseResults.fields.date1_seconds;
            tblProductsDate1Day = formParseResults.fields.date1_day;
            tblProductsDate1Month = formParseResults.fields.date1_month;
            tblProductsDate1Year = formParseResults.fields.date1_year;
            //Mount.
            tblProductsDate1 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblProductsDate1,
                                                                            dateFieldDay: tblProductsDate1Day,
                                                                            dateFieldMonth: tblProductsDate1Month,
                                                                            dateFieldYear: tblProductsDate1Year,
                                                                            dateFieldHour: tblProductsDate1Hour,
                                                                            dateFieldMinute: tblProductsDate1Minute,
                                                                            dateFieldSeconds: tblProductsDate1Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");/**/
            
            tblProductsDate2 = formParseResults.fields.date2;
            tblProductsDate2Hour = formParseResults.fields.date2_hour;
            tblProductsDate2Minute = formParseResults.fields.date2_minute;
            tblProductsDate2Seconds = formParseResults.fields.date2_seconds;
            tblProductsDate2Day = formParseResults.fields.date2_day;
            tblProductsDate2Month = formParseResults.fields.date2_month;
            tblProductsDate2Year = formParseResults.fields.date2_year;
            //Mount.
            tblProductsDate2 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblProductsDate2,
                                                                            dateFieldDay: tblProductsDate2Day,
                                                                            dateFieldMonth: tblProductsDate2Month,
                                                                            dateFieldYear: tblProductsDate2Year,
                                                                            dateFieldHour: tblProductsDate2Hour,
                                                                            dateFieldMinute: tblProductsDate2Minute,
                                                                            dateFieldSeconds: tblProductsDate2Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblProductsDate3 = formParseResults.fields.date3;
            tblProductsDate3Hour = formParseResults.fields.date3_hour;
            tblProductsDate3Minute = formParseResults.fields.date3_minute;
            tblProductsDate3Seconds = formParseResults.fields.date3_seconds;
            tblProductsDate3Day = formParseResults.fields.date3_day;
            tblProductsDate3Month = formParseResults.fields.date3_month;
            tblProductsDate3Year = formParseResults.fields.date3_year;
            //Mount.
            tblProductsDate3 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblProductsDate3,
                                                                            dateFieldDay: tblProductsDate3Day,
                                                                            dateFieldMonth: tblProductsDate3Month,
                                                                            dateFieldYear: tblProductsDate3Year,
                                                                            dateFieldHour: tblProductsDate3Hour,
                                                                            dateFieldMinute: tblProductsDate3Minute,
                                                                            dateFieldSeconds: tblProductsDate3Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblProductsDate4 = formParseResults.fields.date4;
            tblProductsDate4Hour = formParseResults.fields.date4_hour;
            tblProductsDate4Minute = formParseResults.fields.date4_minute;
            tblProductsDate4Seconds = formParseResults.fields.date4_seconds;
            tblProductsDate4Day = formParseResults.fields.date4_day;
            tblProductsDate4Month = formParseResults.fields.date4_month;
            tblProductsDate4Year = formParseResults.fields.date4_year;
            //Mount.
            tblProductsDate4 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblProductsDate4,
                                                                            dateFieldDay: tblProductsDate4Day,
                                                                            dateFieldMonth: tblProductsDate4Month,
                                                                            dateFieldYear: tblProductsDate4Year,
                                                                            dateFieldHour: tblProductsDate4Hour,
                                                                            dateFieldMinute: tblProductsDate4Minute,
                                                                            dateFieldSeconds: tblProductsDate4Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblProductsDate5 = formParseResults.fields.date5;
            tblProductsDate5Hour = formParseResults.fields.date5_hour;
            tblProductsDate5Minute = formParseResults.fields.date5_minute;
            tblProductsDate5Seconds = formParseResults.fields.date5_seconds;
            tblProductsDate5Day = formParseResults.fields.date5_day;
            tblProductsDate5Month = formParseResults.fields.date5_month;
            tblProductsDate5Year = formParseResults.fields.date5_year;
            //Mount.
            tblProductsDate5 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblProductsDate5,
                                                                            dateFieldDay: tblProductsDate5Day,
                                                                            dateFieldMonth: tblProductsDate5Month,
                                                                            dateFieldYear: tblProductsDate5Year,
                                                                            dateFieldHour: tblProductsDate5Hour,
                                                                            dateFieldMinute: tblProductsDate5Minute,
                                                                            dateFieldSeconds: tblProductsDate5Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");/**/


            tblProductsImageMainCaption = formParseResults.fields.image_main_caption;
            tblProductsActivation = formParseResults.fields.activation;
            tblProductsActivation1 = formParseResults.fields.activation1;
            tblProductsActivation2 = formParseResults.fields.activation2;
            tblProductsActivation3 = formParseResults.fields.activation3;
            tblProductsActivation4 = formParseResults.fields.activation4;
            tblProductsActivation5 = formParseResults.fields.activation5;

            tblProductsIdStatus = formParseResults.fields.id_status;
            tblProductsRestrictedAccess = formParseResults.fields.restricted_access

            tblProductsNotes = formParseResults.fields.notes

            idParent = formParseResults.fields.idParent;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendProducts + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //Edit record.  
            //----------------------
            let productsUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.productsUpdate_async({
                    _tblProductsID: tblProductsID,
                    _tblProductsIdParent: tblProductsIdParent,
                    _tblProductsSortOrder: tblProductsSortOrder,
                    _tblProductsIdType: tblProductsIdType,
                    _tblProductsDateCreation: "",
                    //_tblProductsDateTimezone: "",
                    _tblProductsDateEdit: "",
                    _tblProductsIdRegisterUser: "0",
                    _tblProductsIdRegister1: "0",
                    _tblProductsIdRegister2: "0",
                    _tblProductsIdRegister3: "0",
                    _tblProductsIdRegister4: "0",
                    _tblProductsIdRegister5: "0",
                    _tblProductsCode: tblProductsCode,
                    _tblProductsTitle: tblProductsTitle,
                    _tblProductsDescription: tblProductsDescription,
                    _tblProductsURLAlias: tblProductsURLAlias,
                    _tblProductsKeywordsTags: tblProductsKeywordsTags,
                    _tblProductsMetaDescription: tblProductsMetaDescription,
                    _tblProductsMetaTitle: tblProductsMetaTitle,
                    _tblProductsMetaInfo: "",
                    _tblProductsInfo1: tblProductsInfo1,
                    _tblProductsInfo2: tblProductsInfo2,
                    _tblProductsInfo3: tblProductsInfo3,
                    _tblProductsInfo4: tblProductsInfo4,
                    _tblProductsInfo5: tblProductsInfo5,
                    _tblProductsInfo6: tblProductsInfo6,
                    _tblProductsInfo7: tblProductsInfo7,
                    _tblProductsInfo8: tblProductsInfo8,
                    _tblProductsInfo9: tblProductsInfo9,
                    _tblProductsInfo10: tblProductsInfo10,
                    _tblProductsInfo11: tblProductsInfo11,
                    _tblProductsInfo12: tblProductsInfo12,
                    _tblProductsInfo13: tblProductsInfo13,
                    _tblProductsInfo14: tblProductsInfo14,
                    _tblProductsInfo15: tblProductsInfo15,
                    _tblProductsInfo16: tblProductsInfo16,
                    _tblProductsInfo17: tblProductsInfo17,
                    _tblProductsInfo18: tblProductsInfo18,
                    _tblProductsInfo19: tblProductsInfo19,
                    _tblProductsInfo20: tblProductsInfo20,
                    _tblProductsInfoSmall1: tblProductsInfoSmall1,
                    _tblProductsInfoSmall2: tblProductsInfoSmall2,
                    _tblProductsInfoSmall3: tblProductsInfoSmall3,
                    _tblProductsInfoSmall4: tblProductsInfoSmall4,
                    _tblProductsInfoSmall5: tblProductsInfoSmall5,
                    _tblProductsInfoSmall6: tblProductsInfoSmall6,
                    _tblProductsInfoSmall7: tblProductsInfoSmall7,
                    _tblProductsInfoSmall8: tblProductsInfoSmall8,
                    _tblProductsInfoSmall9: tblProductsInfoSmall9,
                    _tblProductsInfoSmall10: tblProductsInfoSmall10,
                    _tblProductsInfoSmall11: tblProductsInfoSmall11,
                    _tblProductsInfoSmall12: tblProductsInfoSmall12,
                    _tblProductsInfoSmall13: tblProductsInfoSmall13,
                    _tblProductsInfoSmall14: tblProductsInfoSmall14,
                    _tblProductsInfoSmall15: tblProductsInfoSmall15,
                    _tblProductsInfoSmall16: tblProductsInfoSmall16,
                    _tblProductsInfoSmall17: tblProductsInfoSmall17,
                    _tblProductsInfoSmall18: tblProductsInfoSmall18,
                    _tblProductsInfoSmall19: tblProductsInfoSmall19,
                    _tblProductsInfoSmall20: tblProductsInfoSmall20,
                    _tblProductsInfoSmall21: tblProductsInfoSmall21,
                    _tblProductsInfoSmall22: tblProductsInfoSmall22,
                    _tblProductsInfoSmall23: tblProductsInfoSmall23,
                    _tblProductsInfoSmall24: tblProductsInfoSmall24,
                    _tblProductsInfoSmall25: tblProductsInfoSmall25,
                    _tblProductsInfoSmall26: tblProductsInfoSmall26,
                    _tblProductsInfoSmall27: tblProductsInfoSmall27,
                    _tblProductsInfoSmall28: tblProductsInfoSmall28,
                    _tblProductsInfoSmall29: tblProductsInfoSmall29,
                    _tblProductsInfoSmall30: tblProductsInfoSmall30,
                    _tblProductsValue: tblProductsValue,
                    _tblProductsValue1: tblProductsValue1,
                    _tblProductsValue2: tblProductsValue2,
                    _tblProductsWeight: tblProductsWeight,
                    _tblProductsCoefficient: tblProductsCoefficient,
                    _tblProductsNumber1: tblProductsNumber1,
                    _tblProductsNumber2: tblProductsNumber2,
                    _tblProductsNumber3: tblProductsNumber3,
                    _tblProductsNumber4: tblProductsNumber4,
                    _tblProductsNumber5: tblProductsNumber5,
                    _tblProductsNumberSmall1: tblProductsNumberSmall1,
                    _tblProductsNumberSmall2: tblProductsNumberSmall2,
                    _tblProductsNumberSmall3: tblProductsNumberSmall3,
                    _tblProductsNumberSmall4: tblProductsNumberSmall4,
                    _tblProductsNumberSmall5: tblProductsNumberSmall5,
                    _tblProductsURL1: tblProductsURL1,
                    _tblProductsURL2: tblProductsURL2,
                    _tblProductsURL3: tblProductsURL3,
                    _tblProductsURL4: tblProductsURL4,
                    _tblProductsURL5: tblProductsURL5,
                    _tblProductsDate1: tblProductsDate1,
                    _tblProductsDate2: tblProductsDate2,
                    _tblProductsDate3: tblProductsDate3,
                    _tblProductsDate4: tblProductsDate4,
                    _tblProductsDate5: tblProductsDate5,
                    _tblProductsIdItem1: "",
                    _tblProductsIdItem2: "",
                    _tblProductsIdItem3: "",
                    _tblProductsIdItem4: "",
                    _tblProductsIdItem5: "",
                    _tblProductsImageMain: tblProductsImageMain,
                    _tblProductsImageMainCaption: tblProductsImageMainCaption,
                    _tblProductsFile1: tblProductsImageFile1,
                    _tblProductsFile2: tblProductsImageFile2,
                    _tblProductsFile3: tblProductsImageFile3,
                    _tblProductsFile4: tblProductsImageFile4,
                    _tblProductsFile5: tblProductsImageFile5,
                    _tblProductsActivation: tblProductsActivation,
                    _tblProductsActivation1: tblProductsActivation1,
                    _tblProductsActivation2: tblProductsActivation2,
                    _tblProductsActivation3: tblProductsActivation3,
                    _tblProductsActivation4: tblProductsActivation4,
                    _tblProductsActivation5: tblProductsActivation5,
                    _tblProductsIdStatus: tblProductsIdStatus,
                    _tblProductsRestrictedAccess: tblProductsRestrictedAccess,
                    _tblProductsNotes: tblProductsNotes,
                    _arrIdsProductsFiltersGeneric1: arrIdsProductsFiltersGeneric1,
                    _arrIdsProductsFiltersGeneric2: arrIdsProductsFiltersGeneric2,
                    _arrIdsProductsFiltersGeneric3: arrIdsProductsFiltersGeneric3,
                    _arrIdsProductsFiltersGeneric4: arrIdsProductsFiltersGeneric4,
                    _arrIdsProductsFiltersGeneric5: arrIdsProductsFiltersGeneric5,
                    _arrIdsProductsFiltersGeneric6: arrIdsProductsFiltersGeneric6,
                    _arrIdsProductsFiltersGeneric7: arrIdsProductsFiltersGeneric7,
                    _arrIdsProductsFiltersGeneric8: arrIdsProductsFiltersGeneric8,
                    _arrIdsProductsFiltersGeneric9: arrIdsProductsFiltersGeneric9,
                    _arrIdsProductsFiltersGeneric10: arrIdsProductsFiltersGeneric10,
                    _arrIdsProductsFiltersGeneric11: arrIdsProductsFiltersGeneric11,
                    _arrIdsProductsFiltersGeneric12: arrIdsProductsFiltersGeneric12,
                    _arrIdsProductsFiltersGeneric13: arrIdsProductsFiltersGeneric13,
                    _arrIdsProductsFiltersGeneric14: arrIdsProductsFiltersGeneric14,
                    _arrIdsProductsFiltersGeneric15: arrIdsProductsFiltersGeneric15,
                    _arrIdsProductsFiltersGeneric16: arrIdsProductsFiltersGeneric16,
                    _arrIdsProductsFiltersGeneric17: arrIdsProductsFiltersGeneric17,
                    _arrIdsProductsFiltersGeneric18: arrIdsProductsFiltersGeneric18,
                    _arrIdsProductsFiltersGeneric19: arrIdsProductsFiltersGeneric19,
                    _arrIdsProductsFiltersGeneric20: arrIdsProductsFiltersGeneric20,
                    _arrIdsProductsFiltersGeneric21: arrIdsProductsFiltersGeneric21,
                    _arrIdsProductsFiltersGeneric22: arrIdsProductsFiltersGeneric22,
                    _arrIdsProductsFiltersGeneric23: arrIdsProductsFiltersGeneric23,
                    _arrIdsProductsFiltersGeneric24: arrIdsProductsFiltersGeneric24,
                    _arrIdsProductsFiltersGeneric25: arrIdsProductsFiltersGeneric25,
                    _arrIdsProductsFiltersGeneric26: arrIdsProductsFiltersGeneric26,
                    _arrIdsProductsFiltersGeneric27: arrIdsProductsFiltersGeneric27,
                    _arrIdsProductsFiltersGeneric28: arrIdsProductsFiltersGeneric28,
                    _arrIdsProductsFiltersGeneric29: arrIdsProductsFiltersGeneric29,
                    _arrIdsProductsFiltersGeneric30: arrIdsProductsFiltersGeneric30
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
            if(productsUpdateResult == true)
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