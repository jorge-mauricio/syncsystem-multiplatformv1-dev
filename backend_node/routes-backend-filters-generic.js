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


//Backend - Filters Generic - listing - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric + "/", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric + "/", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const FiltersGenericListing = require("../" + gSystemConfig.configDirectorySystem + "/filters-generic-listing.js");
    //----------------------


    //Variables.
    //----------------------
    let fgBackend;
    let filterIndex = "";
    let tableName = "";
    let masterPageSelect = "layout-backend-main";
    let cookiesData;

    let messageSuccess = "";
    let messageError = "";
    let messageAlert = "";
    let nRecords = "";
    //----------------------


    //Value definition.
    //----------------------
    /*
    if(req.params.tableName)
    {
        tableName = req.params.tableName;
    }
    */

    if(req.query.filterIndex)
    {
        filterIndex = req.query.filterIndex;
    }
    if(req.query.tableName)
    {
        tableName = req.query.tableName;
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
            fgBackend = new FiltersGenericListing({
                filterIndex: filterIndex,
                tableName: tableName,

                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert,
                nRecords: nRecords
            });

            //Build object data.
            await fgBackend.build();

            
            //Render data with template.
            res.render(masterPageSelect, {
                templateData: fgBackend,
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


//Backend - Filters Generic - POST (insert record).
//**************************************************************************************
//router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric, (req, res)=>{
router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{
    //Variables
    //----------------------
    let tblFiltersGenericID = "";
    let tblFiltersGenericSortOrder = 0;
    let tblFiltersGenericFilterIndex = 0; 

    let tblFiltersGenericTableName = "";
    let tblFiltersGenericTitle = "";
    let tblFiltersGenericDescription = "";

    let tblFiltersGenericURLAlias = "";
    let tblFiltersGenericKeywordsTags = "";
    let tblFiltersGenericMetaDescription = "";
    let tblFiltersGenericMetaTitle = "";
    //let tblFiltersGenericMetaMetaInfo = "";

    let tblFiltersGenericInfoSmall1 = "";
    let tblFiltersGenericInfoSmall2 = "";
    let tblFiltersGenericInfoSmall3 = "";
    let tblFiltersGenericInfoSmall4 = "";
    let tblFiltersGenericInfoSmall5 = "";

    let tblFiltersGenericNumberSmall1 = 0;
    let tblFiltersGenericNumberSmall2 = 0;
    let tblFiltersGenericNumberSmall3 = 0;
    let tblFiltersGenericNumberSmall4 = 0;
    let tblFiltersGenericNumberSmall5 = 0;

    let tblFiltersGenericImageMain = "";
    let tblFiltersGenericConfigSelection = 0;

    let tblFiltersGenericActivation = "";
    let tblFiltersGenericActivation1 = "";
    let tblFiltersGenericActivation2 = "";
    let tblFiltersGenericActivation3 = "";
    let tblFiltersGenericActivation4 = "";
    let tblFiltersGenericActivation5 = "";

    let tblFiltersGenericNotes = "";

    let filterIndex = "";
    let tableName = "";
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
            tblFiltersGenericID = await new Promise((resolve, reject)=>{
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
                        if(gSystemConfig.enableFiltersGenericImageMain == 1)
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
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblFiltersGenericID, 
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
                                tblFormsFieldsOptionsImageMain = results.returnFileName;

                                //Debug.
                                //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                                //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                                //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                                console.log("tblFormsFieldsOptionsImageMain=", tblFormsFieldsOptionsImageMain);

                            }else{

                            }
                        })*/;

                       
                        /**/
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            //tblFormsFieldsOptionsImageMain = resultsFunctionsFiles.returnFileName;
                            //if(resultsFunctionsFiles.hasOwnProperty("image_main"))
                            //{
                                //tblFormsFieldsOptionsImageMain = resultsFunctionsFiles.image_main;
                            //}
                            tblFiltersGenericImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblFiltersGenericImageMain;


                            //Resize images.
                            if(tblFiltersGenericImageMain !== "")
                            {
                                //resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrDefaultImageSize, gSystemConfig.configDirectoryFiles, tblFiltersGenericImageMain);
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFiltersGenericImageSize, gSystemConfig.configDirectoryFiles, tblFiltersGenericImageMain);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblFormsFieldsOptionsImageMain=", tblFormsFieldsOptionsImageMain);
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
            //tblFiltersGenericID = "";
            tblFiltersGenericSortOrder = formParseResults.fields.sort_order;
            tblFiltersGenericFilterIndex = formParseResults.fields.filter_index; 
        
            tblFiltersGenericTableName = formParseResults.fields.table_name;
            tblFiltersGenericTitle = formParseResults.fields.title;
            tblFiltersGenericDescription = formParseResults.fields.description;
        
            tblFiltersGenericURLAlias = formParseResults.fields.url_alias;
            tblFiltersGenericKeywordsTags = formParseResults.fields.keywords_tags;
            tblFiltersGenericMetaDescription = formParseResults.fields.meta_description;
            tblFiltersGenericMetaTitle = formParseResults.fields.meta_title;
            //tblFiltersGenericMetaTitle = formParseResults.fields.meta_info;

            tblFiltersGenericInfoSmall1 = formParseResults.fields.info_small1;
            tblFiltersGenericInfoSmall2 = formParseResults.fields.info_small2;
            tblFiltersGenericInfoSmall3 = formParseResults.fields.info_small3;
            tblFiltersGenericInfoSmall4 = formParseResults.fields.info_small4;
            tblFiltersGenericInfoSmall5 = formParseResults.fields.info_small5;
        
            tblFiltersGenericNumberSmall1 = formParseResults.fields.number_small1;
            tblFiltersGenericNumberSmall2 = formParseResults.fields.number_small2;
            tblFiltersGenericNumberSmall3 = formParseResults.fields.number_small3;
            tblFiltersGenericNumberSmall4 = formParseResults.fields.number_small4;
            tblFiltersGenericNumberSmall5 = formParseResults.fields.number_small5;
        
            //tblFiltersGenericImageMain = formParseResults.fields.image_main;
            //tblFiltersGenericConfigSelection = formParseResults.fields.config_selection;
        
            tblFiltersGenericActivation = formParseResults.fields.activation;
            tblFiltersGenericActivation1 = formParseResults.fields.activation1;
            tblFiltersGenericActivation2 = formParseResults.fields.activation2;
            tblFiltersGenericActivation3 = formParseResults.fields.activation3;
            tblFiltersGenericActivation4 = formParseResults.fields.activation4;
            tblFiltersGenericActivation5 = formParseResults.fields.activation5;
        
            tblFiltersGenericNotes = formParseResults.fields.notes;

            filterIndex = formParseResults.fields.filterIndex;
            tableName = formParseResults.fields.tableName;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric + "/?tableName=" + tableName;
            returnURL += "&filterIndex=" + filterIndex;
            if(masterPageSelect)
            {
                returnURL += "&masterPageSelect=" + masterPageSelect;
            }
            //----------------------


            //Insert record.  
            //----------------------
            let filtersGenericInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.filtersGenericInsert_async({
                    _tblFiltersGenericID: tblFiltersGenericID,
                    _tblFiltersGenericSortOrder: tblFiltersGenericSortOrder,
                    _tblFiltersGenericFilterIndex: tblFiltersGenericFilterIndex,
                    _tblFiltersGenericDateCreation: "",
                    //_tblFiltersGenericDateTimezone: "",
                    _tblFiltersGenericDateEdit: "",
                    _tblFiltersGenericTableName: tblFiltersGenericTableName,
                    _tblFiltersGenericTitle: tblFiltersGenericTitle,
                    _tblFiltersGenericDescription: tblFiltersGenericDescription,
                    _tblFiltersGenericURLAlias: tblFiltersGenericURLAlias,
                    _tblFiltersGenericKeywordsTags: tblFiltersGenericKeywordsTags,
                    _tblFiltersGenericMetaDescription: tblFiltersGenericMetaDescription,
                    _tblFiltersGenericMetaTitle: tblFiltersGenericMetaTitle,
                    _tblFiltersGenericMetaMetaInfo: "",
                    _tblFiltersGenericInfoSmall1: tblFiltersGenericInfoSmall1,
                    _tblFiltersGenericInfoSmall2: tblFiltersGenericInfoSmall2,
                    _tblFiltersGenericInfoSmall3: tblFiltersGenericInfoSmall3,
                    _tblFiltersGenericInfoSmall4: tblFiltersGenericInfoSmall4,
                    _tblFiltersGenericInfoSmall5: tblFiltersGenericInfoSmall5,
                    _tblFiltersGenericNumberSmall1: tblFiltersGenericNumberSmall1,
                    _tblFiltersGenericNumberSmall2: tblFiltersGenericNumberSmall2,
                    _tblFiltersGenericNumberSmall3: tblFiltersGenericNumberSmall3,
                    _tblFiltersGenericNumberSmall4: tblFiltersGenericNumberSmall4,
                    _tblFiltersGenericNumberSmall5: tblFiltersGenericNumberSmall5,
                    _tblFiltersGenericImageMain: tblFiltersGenericImageMain,
                    _tblFiltersGenericConfigSelection: tblFiltersGenericConfigSelection,
                    _tblFiltersGenericActivation: tblFiltersGenericActivation,
                    _tblFiltersGenericActivation1: tblFiltersGenericActivation1,
                    _tblFiltersGenericActivation2: tblFiltersGenericActivation2,
                    _tblFiltersGenericActivation3: tblFiltersGenericActivation3,
                    _tblFiltersGenericActivation4: tblFiltersGenericActivation4,
                    _tblFiltersGenericActivation5: tblFiltersGenericActivation5,
                    _tblFiltersGenericNotes: tblFiltersGenericNotes
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
            if(filtersGenericInsertResult == true)
            {
                returnURL += "&messageSuccess=statusMessage2";


                //Debug.
                //console.log("tblFormsFieldsOptionsImageMain(categoriesInsertResult)=", tblFormsFieldsOptionsImageMain);
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
});
//**************************************************************************************


//Backend - Forms Fields Options - edit - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbFiltersGeneric?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbFiltersGeneric?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const FiltersGenericEdit = require("../" + gSystemConfig.configDirectorySystem + "/filters-generic-edit.js");
    //----------------------


    //Variables.
    //----------------------
    let fgeBackend;
    let idTbFiltersGeneric = "";

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
    if(req.params.idTbFiltersGeneric)
    {
        idTbFiltersGeneric = req.params.idTbFiltersGeneric;
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
            fgeBackend = new FiltersGenericEdit({
                idTbFiltersGeneric: idTbFiltersGeneric,

                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert
            });


            //Build object data.
            await fgeBackend.build();


            //Render data with template.
            res.render(masterPageSelect, {
                templateData: fgeBackend,
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


//Backend - Filters Generic - PUT (edit).
//**************************************************************************************
//router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric + "/" + gSystemConfig.configRouteBackendActionEdit, (req, res)=>{ //working, with the async block
router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric + "/" + gSystemConfig.configRouteBackendActionEdit, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Variables
    //----------------------
    let tblFiltersGenericID = "";
    let tblFiltersGenericSortOrder = 0;
    let tblFiltersGenericFilterIndex = 0; 

    let tblFiltersGenericTableName = "";
    let tblFiltersGenericTitle = "";
    let tblFiltersGenericDescription = "";

    let tblFiltersGenericURLAlias = "";
    let tblFiltersGenericKeywordsTags = "";
    let tblFiltersGenericMetaDescription = "";
    let tblFiltersGenericMetaTitle = "";
    //let tblFiltersGenericMetaMetaInfo = "";

    let tblFiltersGenericInfoSmall1 = "";
    let tblFiltersGenericInfoSmall2 = "";
    let tblFiltersGenericInfoSmall3 = "";
    let tblFiltersGenericInfoSmall4 = "";
    let tblFiltersGenericInfoSmall5 = "";

    let tblFiltersGenericNumberSmall1 = 0;
    let tblFiltersGenericNumberSmall2 = 0;
    let tblFiltersGenericNumberSmall3 = 0;
    let tblFiltersGenericNumberSmall4 = 0;
    let tblFiltersGenericNumberSmall5 = 0;

    let tblFiltersGenericImageMain = "";
    let tblFiltersGenericConfigSelection = 0;

    let tblFiltersGenericActivation = "";
    let tblFiltersGenericActivation1 = "";
    let tblFiltersGenericActivation2 = "";
    let tblFiltersGenericActivation3 = "";
    let tblFiltersGenericActivation4 = "";
    let tblFiltersGenericActivation5 = "";

    let tblFiltersGenericNotes = "";

    let filterIndex = "";
    let tableName = "";
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
                            tblFiltersGenericID = fieldsPost.id;


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
                        if(gSystemConfig.enableFiltersGenericImageMain == 1)
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
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblFiltersGenericID, 
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
                                tblFormsFieldsOptionsImageMain = results.returnFileName;

                                //Debug.
                                //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                                //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                                //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                                console.log("tblFormsFieldsOptionsImageMain=", tblFormsFieldsOptionsImageMain);

                            }else{

                            }
                        })*/;

                       
                        /**/
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            //tblFormsFieldsOptionsImageMain = resultsFunctionsFiles.returnFileName;
                            //if(resultsFunctionsFiles.hasOwnProperty("image_main"))
                            //{
                                //tblFormsFieldsOptionsImageMain = resultsFunctionsFiles.image_main;
                            //}
                            tblFiltersGenericImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblFiltersGenericImageMain;


                            //Resize images.
                            if(tblFiltersGenericImageMain !== "")
                            {
                                //resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrDefaultImageSize, gSystemConfig.configDirectoryFiles, tblFiltersGenericImageMain);
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrFiltersGenericImageSize, gSystemConfig.configDirectoryFiles, tblFiltersGenericImageMain);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblFormsFieldsOptionsImageMain=", tblFormsFieldsOptionsImageMain);
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
            //tblFiltersGenericID = "";
            tblFiltersGenericSortOrder = formParseResults.fields.sort_order;
            tblFiltersGenericFilterIndex = formParseResults.fields.filter_index; 
        
            tblFiltersGenericTableName = formParseResults.fields.table_name;
            tblFiltersGenericTitle = formParseResults.fields.title;
            tblFiltersGenericDescription = formParseResults.fields.description;
        
            tblFiltersGenericURLAlias = formParseResults.fields.url_alias;
            tblFiltersGenericKeywordsTags = formParseResults.fields.keywords_tags;
            tblFiltersGenericMetaDescription = formParseResults.fields.meta_description;
            tblFiltersGenericMetaTitle = formParseResults.fields.meta_title;
            //tblFiltersGenericMetaTitle = formParseResults.fields.meta_info;

            tblFiltersGenericInfoSmall1 = formParseResults.fields.info_small1;
            tblFiltersGenericInfoSmall2 = formParseResults.fields.info_small2;
            tblFiltersGenericInfoSmall3 = formParseResults.fields.info_small3;
            tblFiltersGenericInfoSmall4 = formParseResults.fields.info_small4;
            tblFiltersGenericInfoSmall5 = formParseResults.fields.info_small5;
        
            tblFiltersGenericNumberSmall1 = formParseResults.fields.number_small1;
            tblFiltersGenericNumberSmall2 = formParseResults.fields.number_small2;
            tblFiltersGenericNumberSmall3 = formParseResults.fields.number_small3;
            tblFiltersGenericNumberSmall4 = formParseResults.fields.number_small4;
            tblFiltersGenericNumberSmall5 = formParseResults.fields.number_small5;
        
            //tblFiltersGenericImageMain = formParseResults.fields.image_main;
            //tblFiltersGenericConfigSelection = formParseResults.fields.config_selection;
        
            tblFiltersGenericActivation = formParseResults.fields.activation;
            tblFiltersGenericActivation1 = formParseResults.fields.activation1;
            tblFiltersGenericActivation2 = formParseResults.fields.activation2;
            tblFiltersGenericActivation3 = formParseResults.fields.activation3;
            tblFiltersGenericActivation4 = formParseResults.fields.activation4;
            tblFiltersGenericActivation5 = formParseResults.fields.activation5;
        
            tblFiltersGenericNotes = formParseResults.fields.notes;

            filterIndex = formParseResults.fields.filterIndex;
            tableName = formParseResults.fields.tableName;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendFiltersGeneric + "/?tableName=" + tableName;
            returnURL += "&filterIndex=" + filterIndex;
            if(masterPageSelect)
            {
                returnURL += "&masterPageSelect=" + masterPageSelect;
            }
            //----------------------


            //Update record.  
            //----------------------
            let filtersGenericUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.filtersGenericUpdate_async({
                    _tblFiltersGenericID: tblFiltersGenericID,
                    _tblFiltersGenericSortOrder: tblFiltersGenericSortOrder,
                    _tblFiltersGenericFilterIndex: tblFiltersGenericFilterIndex,
                    _tblFiltersGenericDateCreation: "",
                    //_tblFiltersGenericDateTimezone: "",
                    _tblFiltersGenericDateEdit: "",
                    _tblFiltersGenericTableName: tblFiltersGenericTableName,
                    _tblFiltersGenericTitle: tblFiltersGenericTitle,
                    _tblFiltersGenericDescription: tblFiltersGenericDescription,
                    _tblFiltersGenericURLAlias: tblFiltersGenericURLAlias,
                    _tblFiltersGenericKeywordsTags: tblFiltersGenericKeywordsTags,
                    _tblFiltersGenericMetaDescription: tblFiltersGenericMetaDescription,
                    _tblFiltersGenericMetaTitle: tblFiltersGenericMetaTitle,
                    _tblFiltersGenericMetaMetaInfo: "",
                    _tblFiltersGenericInfoSmall1: tblFiltersGenericInfoSmall1,
                    _tblFiltersGenericInfoSmall2: tblFiltersGenericInfoSmall2,
                    _tblFiltersGenericInfoSmall3: tblFiltersGenericInfoSmall3,
                    _tblFiltersGenericInfoSmall4: tblFiltersGenericInfoSmall4,
                    _tblFiltersGenericInfoSmall5: tblFiltersGenericInfoSmall5,
                    _tblFiltersGenericNumberSmall1: tblFiltersGenericNumberSmall1,
                    _tblFiltersGenericNumberSmall2: tblFiltersGenericNumberSmall2,
                    _tblFiltersGenericNumberSmall3: tblFiltersGenericNumberSmall3,
                    _tblFiltersGenericNumberSmall4: tblFiltersGenericNumberSmall4,
                    _tblFiltersGenericNumberSmall5: tblFiltersGenericNumberSmall5,
                    _tblFiltersGenericImageMain: tblFiltersGenericImageMain,
                    _tblFiltersGenericConfigSelection: tblFiltersGenericConfigSelection,
                    _tblFiltersGenericActivation: tblFiltersGenericActivation,
                    _tblFiltersGenericActivation1: tblFiltersGenericActivation1,
                    _tblFiltersGenericActivation2: tblFiltersGenericActivation2,
                    _tblFiltersGenericActivation3: tblFiltersGenericActivation3,
                    _tblFiltersGenericActivation4: tblFiltersGenericActivation4,
                    _tblFiltersGenericActivation5: tblFiltersGenericActivation5,
                    _tblFiltersGenericNotes: tblFiltersGenericNotes
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
            if(filtersGenericUpdateResult == true)
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