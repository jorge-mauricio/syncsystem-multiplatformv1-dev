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


//Backend - Users - listing - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/:idParent?", (req, res)=>{ //working, with the async block
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/:idParent", (req, res)=>{ //working, with the async block
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/:idParent", SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware, (req, res, next)=>{ //working, with the async block
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/:idParent", SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_root", "", null), (req, res, next)=>{ //working, with the async block
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/:idParent", await SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_root"), (req, res, next)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/:idParent", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_root")], (req, res, next)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const UsersListing = require("../" + gSystemConfig.configDirectorySystem + "/users-listing.js");
    //const LoginUsers = require("../" + gSystemConfig.configDirectorySystem + "/login-users.js");
    //----------------------


    //Variables.
    //----------------------
    let ulBackend;
    //let luBackend;
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


    //Debug.
    //let debugCookieRead;
    /*(async function(){
        debugCookieRead = await SyncSystemNS.FunctionsCookies.cookieRead(gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUserRoot);
        console.log("debugCookieRead=", debugCookieRead);
    })();*/


    /*let debubAuthenticationVerification
    (async function(){
        debubAuthenticationVerification = await SyncSystemNS.FunctionsAuthentication.authenticationVerification(req.cookies[gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUserRoot],
                                                                                                                "user_root", 
                                                                                                                "");
        console.log("debubAuthenticationVerification=", debubAuthenticationVerification);
    })();*/


    //console.log("idParent=", idParent);
    //console.log("req.cookies.cookie_test(inside routes users)=", req.cookies.cookie_test);
    //console.log("req.cookies.cookie_test_function(inside routes users)=", req.cookies.cookie_test_function);
    //console.log("req.cookies(inside routes users)=", req.cookies);
    //console.log("globalCookies (inside users)=", globalCookies);
    //console.log("SyncSystemNS.FunctionsCookies.cookieRead=", SyncSystemNS.FunctionsCookies.cookieRead(gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUserRoot));
    //console.log("SyncSystemNS.FunctionsAuthentication.authenticationVerification=", 
                //SyncSystemNS.FunctionsAuthentication.authenticationVerification(req.cookies[gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUserRoot],
                //"user_root", 
                //""));
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            //Test.
            //debugCookieRead = await SyncSystemNS.FunctionsCookies.cookieRead(gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUserRoot);
            //console.log("debugCookieRead=", debugCookieRead);
                

            //if(idParent != "")
            //{
                //Debug.
                //console.log("flag(idParent != ''", true);
                
                //Load listing.

                //Build object.
                ulBackend = new UsersListing({
                    idParent: idParent,
                    pageNumber: pageNumber,
                    masterPageSelect: masterPageSelect,
                    cookiesData: cookiesData,

                    messageSuccess: messageSuccess,
                    messageError: messageError,
                    messageAlert: messageAlert,
                    nRecords: nRecords
                });

                //Build object data.
                await ulBackend.build();
                
                //Render data with template.
                res.render(masterPageSelect, {
                    templateData: ulBackend,
                    additionalData: {cookiesData: cookiesData}
                });
            //}else{
                /*
                //Load login users.

                masterPageSelect = "layout-backend-iframe";
                
                //Build object.
                luBackend = new LoginUsers({
                    masterPageSelect: masterPageSelect,

                    messageSuccess: messageSuccess,
                    messageError: messageError,
                    messageAlert: messageAlert
                });

                //Build object data.
                await luBackend.build();
                
                //Render data with template.
                res.render(masterPageSelect, {
                    templateData: luBackend,
                    additionalData: {}
                });
                */
            //}
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


//Backend - Users - POST (insert record).
//**************************************************************************************
//router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers, (req, res)=>
router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_root")], (req, res, next)=>
{
    //Variables
    //----------------------
    let tblUsersID = "";
    let tblUsersIdParent = "";
    let tblUsersSortOrder = 0;

    let tblUsersIdType = 0; 
    let tblUsersNameTitle = "";
    let tblUsersNameFull = "";
    let tblUsersNameFirst = "";
    let tblUsersNameLast = "";

    let tblUsersDateBirth = "", tblUsersDateBirthHour = "", tblUsersDateBirthMinute = "", tblUsersDateBirthSeconds = "", tblUsersDateBirthDay = "", tblUsersDateBirthMonth = "", tblUsersDateBirthYear = "";
    let tblUsersGender = 0; 
    let tblUsersDocument = "";

    let tblUsersAddressStreet = "";
    let tblUsersAddressNumber = "";
    let tblUsersAddressComplement = "";
    let tblUsersNeighborhood = "";
    let tblUsersDistrict = "";
    let tblUsersCounty = "";
    let tblUsersCity = "";
    let tblUsersState = "";
    let tblUsersCountry = "";
    let tblUsersZipCode = "";

    let tblUsersPhone1InternationalCode = "";
    let tblUsersPhone1AreaCode = "";
    let tblUsersPhone1 = "";

    let tblUsersPhone2InternationalCode = "";
    let tblUsersPhone2AreaCode = "";
    let tblUsersPhone2 = "";

    let tblUsersPhone3InternationalCode = "";
    let tblUsersPhone3AreaCode = "";
    let tblUsersPhone3 = "";

    let tblUsersUsername = "";
    let tblUsersEmail = "";
    let tblUsersPassword = "";
    let tblUsersPasswordHint = "";
    let tblUsersPasswordLength = "";

    let tblUsersInfo1 = "";
    let tblUsersInfo2 = "";
    let tblUsersInfo3 = "";
    let tblUsersInfo4 = "";
    let tblUsersInfo5 = "";
    let tblUsersInfo6 = "";
    let tblUsersInfo7 = "";
    let tblUsersInfo8 = "";
    let tblUsersInfo9 = "";
    let tblUsersInfo10 = "";

    let tblUsersImageMain = "";

    let tblUsersActivation = 1;
    let tblUsersActivation1 = 0;
    let tblUsersActivation2 = 0;
    let tblUsersActivation3 = 0;
    let tblUsersActivation4 = 0;
    let tblUsersActivation5 = 0;

    let tblUsersIdStatus = 0;
    let tblUsersNotes = "";

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
            tblUsersID = await new Promise((resolve, reject)=>{
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
                        if(gSystemConfig.enableUsersImageMain == 1)
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
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblUsersID, 
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
                                tblUsersImageMain = results.returnFileName;

                                //Debug.
                                //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                                //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                                //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                                console.log("tblUsersImageMain=", tblUsersImageMain);

                            }else{

                            }
                        })*/;

                       
                        /**/
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            //tblUsersImageMain = resultsFunctionsFiles.returnFileName;
                            //if(resultsFunctionsFiles.hasOwnProperty("image_main"))
                            //{
                                //tblUsersImageMain = resultsFunctionsFiles.image_main;
                            //}
                            tblUsersImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblUsersImageMain;


                            //Resize images.
                            if(tblUsersImageMain !== "")
                            {
                                //resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrDefaultImageSize, gSystemConfig.configDirectoryFiles, tblUsersImageMain);
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrUsersImageSize, gSystemConfig.configDirectoryFiles, tblUsersImageMain);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblUsersImageMain=", tblUsersImageMain);
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
            //tblUsersID = "";
            tblUsersIdParent = formParseResults.fields.id_parent;
            tblUsersSortOrder = formParseResults.fields.sort_order;
            tblUsersIdType = formParseResults.fields.id_type; 
        
            tblUsersNameTitle = formParseResults.fields.name_title;
            tblUsersNameFull = formParseResults.fields.name_full;
            tblUsersNameFirst = formParseResults.fields.name_first;
            tblUsersNameLast = formParseResults.fields.name_last;
        
            tblUsersDateBirth = formParseResults.fields.date_birth;
            tblUsersDateBirthHour = formParseResults.fields.date_birth_hour;
            tblUsersDateBirthMinute = formParseResults.fields.date_birth_minute;
            tblUsersDateBirthSeconds = formParseResults.fields.date_birth_seconds;
            tblUsersDateBirthDay = formParseResults.fields.date_birth_day;
            tblUsersDateBirthMonth = formParseResults.fields.date_birth_month;
            tblUsersDateBirthYear = formParseResults.fields.date_birth_year;
            tblUsersDateBirth = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblUsersDateBirth,
                                                                        dateFieldDay: tblUsersDateBirthDay,
                                                                        dateFieldMonth: tblUsersDateBirthMonth,
                                                                        dateFieldYear: tblUsersDateBirthYear,
                                                                        dateFieldHour: tblUsersDateBirthHour,
                                                                        dateFieldMinute: tblUsersDateBirthMinute,
                                                                        dateFieldSeconds: tblUsersDateBirthSeconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");/**/
            //console.log("tblUsersDateBirth=", tblUsersDateBirth);
            tblUsersGender = formParseResults.fields.gender; 
        
            tblUsersDocument = formParseResults.fields.document;
            tblUsersAddressStreet = formParseResults.fields.address_street;
            tblUsersAddressNumber = formParseResults.fields.address_number;
            tblUsersAddressComplement = formParseResults.fields.address_complement;
            tblUsersNeighborhood = formParseResults.fields.neighborhood;
            tblUsersDistrict = formParseResults.fields.district;
            tblUsersCounty = formParseResults.fields.county;
            tblUsersCity = formParseResults.fields.city;
            tblUsersState = formParseResults.fields.state;
            tblUsersCountry = formParseResults.fields.country;
            tblUsersZipCode = formParseResults.fields.zip_code;
        
            tblUsersPhone1InternationalCode = formParseResults.fields.phone1_international_code;
            tblUsersPhone1AreaCode = formParseResults.fields.phone1_area_code;
            tblUsersPhone1 = formParseResults.fields.phone1;
        
            tblUsersPhone2InternationalCode = formParseResults.fields.phone2_international_code;
            tblUsersPhone2AreaCode = formParseResults.fields.phone2_area_code;
            tblUsersPhone2 = formParseResults.fields.phone2;
        
            tblUsersPhone3InternationalCode = formParseResults.fields.phone3_international_code;
            tblUsersPhone3AreaCode = formParseResults.fields.phone3_area_code;
            tblUsersPhone3 = formParseResults.fields.phone3;
        
            tblUsersUsername = formParseResults.fields.username;
            tblUsersEmail = formParseResults.fields.email;
            tblUsersPassword = formParseResults.fields.password;
            tblUsersPasswordHint = formParseResults.fields.password_hint;
            tblUsersPasswordLength = formParseResults.fields.password_length;
        
            tblUsersInfo1 = formParseResults.fields.info1;
            tblUsersInfo2 = formParseResults.fields.info2;
            tblUsersInfo3 = formParseResults.fields.info3;
            tblUsersInfo4 = formParseResults.fields.info4;
            tblUsersInfo5 = formParseResults.fields.info5;
            tblUsersInfo6 = formParseResults.fields.info6;
            tblUsersInfo7 = formParseResults.fields.info7;
            tblUsersInfo8 = formParseResults.fields.info8;
            tblUsersInfo9 = formParseResults.fields.info9;
            tblUsersInfo10 = formParseResults.fields.info10;
        
            //tblUsersImageMain = formParseResults.fields.image_main;
        
            tblUsersActivation = formParseResults.fields.activation;
            tblUsersActivation1 = formParseResults.fields.activation1;
            tblUsersActivation2 = formParseResults.fields.activation2;
            tblUsersActivation3 = formParseResults.fields.activation3;
            tblUsersActivation4 = formParseResults.fields.activation4;
            tblUsersActivation5 = formParseResults.fields.activation5;
        
            tblUsersIdStatus = formParseResults.fields.id_status;
            tblUsersNotes = formParseResults.fields.notes;
        
            idParent = formParseResults.fields.idParent;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //Insert record.  
            //----------------------
            let usersInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.usersInsert_async({
                    _tblUsersID: tblUsersID,
                    _tblUsersIdParent: tblUsersIdParent,
                    _tblUsersSortOrder: tblUsersSortOrder,
                    _tblUsersDateCreation: "",
                    _tblUsersDateTimezone: "",
                    _tblUsersDateEdit: "",
                    _tblUsersIdType: tblUsersIdType,
                    _tblUsersNameTitle: tblUsersNameTitle,
                    _tblUsersNameFull: tblUsersNameFull,
                    _tblUsersNameFirst: tblUsersNameFirst,
                    _tblUsersNameLast: tblUsersNameLast,
                    _tblUsersDateBirth: tblUsersDateBirth,
                    _tblUsersGender: tblUsersGender,
                    _tblUsersDocument: tblUsersDocument,
                    _tblUsersAddressStreet: tblUsersAddressStreet,
                    _tblUsersAddressNumber: tblUsersAddressNumber,
                    _tblUsersAddressComplement: tblUsersAddressComplement,
                    _tblUsersNeighborhood: tblUsersNeighborhood,
                    _tblUsersDistrict: tblUsersDistrict,
                    _tblUsersCounty: tblUsersCounty,
                    _tblUsersCity: tblUsersCity,
                    _tblUsersState: tblUsersState,
                    _tblUsersCountry: tblUsersCountry,
                    _tblUsersZipCode: tblUsersZipCode,
                    _tblUsersPhone1InternationalCode: tblUsersPhone1InternationalCode,
                    _tblUsersPhone1AreaCode: tblUsersPhone1AreaCode,
                    _tblUsersPhone1: tblUsersPhone1,
                    _tblUsersPhone2InternationalCode: tblUsersPhone2InternationalCode,
                    _tblUsersPhone2AreaCode: tblUsersPhone2AreaCode,
                    _tblUsersPhone2: tblUsersPhone2,
                    _tblUsersPhone3InternationalCode: tblUsersPhone3InternationalCode,
                    _tblUsersPhone3AreaCode: tblUsersPhone3AreaCode,
                    _tblUsersPhone3: tblUsersPhone3,
                    _tblUsersUsername: tblUsersUsername,
                    _tblUsersEmail: tblUsersEmail,
                    _tblUsersPassword: tblUsersPassword,
                    _tblUsersPasswordHint: tblUsersPasswordHint,
                    _tblUsersPasswordLength: tblUsersPasswordLength,
                    _tblUsersInfo1: tblUsersInfo1,
                    _tblUsersInfo2: tblUsersInfo2,
                    _tblUsersInfo3: tblUsersInfo3,
                    _tblUsersInfo4: tblUsersInfo4,
                    _tblUsersInfo5: tblUsersInfo5,
                    _tblUsersInfo6: tblUsersInfo6,
                    _tblUsersInfo7: tblUsersInfo7,
                    _tblUsersInfo8: tblUsersInfo8,
                    _tblUsersInfo9: tblUsersInfo9,
                    _tblUsersInfo10: tblUsersInfo10,
                    _tblUsersImageMain: tblUsersImageMain,
                    _tblUsersActivation: tblUsersActivation,
                    _tblUsersActivation1: tblUsersActivation1,
                    _tblUsersActivation2: tblUsersActivation2,
                    _tblUsersActivation3: tblUsersActivation3,
                    _tblUsersActivation4: tblUsersActivation4,
                    _tblUsersActivation5: tblUsersActivation5,
                    _tblUsersIdStatus: tblUsersIdStatus,
                    _tblUsersNotes: tblUsersNotes
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
            if(usersInsertResult == true)
            {
                returnURL += "&messageSuccess=statusMessage2";


                //Debug.
                //console.log("tblUsersImageMain(categoriesInsertResult)=", tblUsersImageMain);
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
            next();
        }
    })();
    //----------------------
});
//**************************************************************************************


//Backend - Users - edit - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbUsers?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbUsers?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_root")], (req, res, next)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const UsersEdit = require("../" + gSystemConfig.configDirectorySystem + "/users-edit.js");
    //----------------------
    

    //Variables.
    //----------------------
    let ueBackend;
    let idTbUsers = "";

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
    if(req.params.idTbUsers)
    {
        idTbUsers = req.params.idTbUsers;
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
            ueBackend = new UsersEdit({
                idTbUsers: idTbUsers,
                pageNumber: pageNumber,
                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert
            });


            //Build object data.
            await ueBackend.build();


            //Render data with template.
            res.render(masterPageSelect, {
                templateData: ueBackend,
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


//Backend - Users - PUT (edit).
//**************************************************************************************
//router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" + gSystemConfig.configRouteBackendActionEdit, (req, res)=>{ //working, with the async block
router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" + gSystemConfig.configRouteBackendActionEdit, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_root")], (req, res, next)=>{ //working, with the async block
    //Variables
    //----------------------
    let tblUsersID = "";
    let tblUsersIdParent = "";
    let tblUsersSortOrder = 0;

    let tblUsersIdType = 0; 
    let tblUsersNameTitle = "";
    let tblUsersNameFull = "";
    let tblUsersNameFirst = "";
    let tblUsersNameLast = "";

    let tblUsersDateBirth = "", tblUsersDateBirthHour = "", tblUsersDateBirthMinute = "", tblUsersDateBirthSeconds = "", tblUsersDateBirthDay = "", tblUsersDateBirthMonth = "", tblUsersDateBirthYear = "";
    let tblUsersGender = 0; 
    let tblUsersDocument = "";

    let tblUsersAddressStreet = "";
    let tblUsersAddressNumber = "";
    let tblUsersAddressComplement = "";
    let tblUsersNeighborhood = "";
    let tblUsersDistrict = "";
    let tblUsersCounty = "";
    let tblUsersCity = "";
    let tblUsersState = "";
    let tblUsersCountry = "";
    let tblUsersZipCode = "";

    let tblUsersPhone1InternationalCode = "";
    let tblUsersPhone1AreaCode = "";
    let tblUsersPhone1 = "";

    let tblUsersPhone2InternationalCode = "";
    let tblUsersPhone2AreaCode = "";
    let tblUsersPhone2 = "";

    let tblUsersPhone3InternationalCode = "";
    let tblUsersPhone3AreaCode = "";
    let tblUsersPhone3 = "";

    let tblUsersUsername = "";
    let tblUsersEmail = "";
    let tblUsersPassword = "";
    let tblUsersPasswordHint = "";
    let tblUsersPasswordLength = "";

    let tblUsersInfo1 = "";
    let tblUsersInfo2 = "";
    let tblUsersInfo3 = "";
    let tblUsersInfo4 = "";
    let tblUsersInfo5 = "";
    let tblUsersInfo6 = "";
    let tblUsersInfo7 = "";
    let tblUsersInfo8 = "";
    let tblUsersInfo9 = "";
    let tblUsersInfo10 = "";

    let tblUsersImageMain = "";

    let tblUsersActivation = 1;
    let tblUsersActivation1 = 0;
    let tblUsersActivation2 = 0;
    let tblUsersActivation3 = 0;
    let tblUsersActivation4 = 0;
    let tblUsersActivation5 = 0;

    let tblUsersIdStatus = 0;
    let tblUsersNotes = "";

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
                            tblUsersID = fieldsPost.id;


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
                        if(gSystemConfig.enableUsersImageMain == 1)
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
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblUsersID, 
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
                                tblUsersImageMain = results.returnFileName;

                                //Debug.
                                //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                                //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                                //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                                console.log("tblUsersImageMain=", tblUsersImageMain);

                            }else{

                            }
                        })*/;

                       
                        /**/
                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Define value for file name variable.
                            //tblUsersImageMain = resultsFunctionsFiles.returnFileName;
                            //if(resultsFunctionsFiles.hasOwnProperty("image_main"))
                            //{
                                //tblUsersImageMain = resultsFunctionsFiles.image_main;
                            //}
                            tblUsersImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblUsersImageMain;


                            //Resize images.
                            if(tblUsersImageMain !== "")
                            {
                                //resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrDefaultImageSize, gSystemConfig.configDirectoryFiles, tblUsersImageMain);
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrUsersImageSize, gSystemConfig.configDirectoryFiles, tblUsersImageMain);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblUsersImageMain=", tblUsersImageMain);
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
            //tblUsersID = "";
            tblUsersIdParent = formParseResults.fields.id_parent;
            tblUsersSortOrder = formParseResults.fields.sort_order;
            tblUsersIdType = formParseResults.fields.id_type; 
        
            tblUsersNameTitle = formParseResults.fields.name_title;
            tblUsersNameFull = formParseResults.fields.name_full;
            tblUsersNameFirst = formParseResults.fields.name_first;
            tblUsersNameLast = formParseResults.fields.name_last;
            
            tblUsersDateBirth = formParseResults.fields.date_birth;
            tblUsersDateBirthHour = formParseResults.fields.date_birth_hour;
            tblUsersDateBirthMinute = formParseResults.fields.date_birth_minute;
            tblUsersDateBirthSeconds = formParseResults.fields.date_birth_seconds;
            tblUsersDateBirthDay = formParseResults.fields.date_birth_day;
            tblUsersDateBirthMonth = formParseResults.fields.date_birth_month;
            tblUsersDateBirthYear = formParseResults.fields.date_birth_year;
            tblUsersDateBirth = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblUsersDateBirth,
                                                                        dateFieldDay: tblUsersDateBirthDay,
                                                                        dateFieldMonth: tblUsersDateBirthMonth,
                                                                        dateFieldYear: tblUsersDateBirthYear,
                                                                        dateFieldHour: tblUsersDateBirthHour,
                                                                        dateFieldMinute: tblUsersDateBirthMinute,
                                                                        dateFieldSeconds: tblUsersDateBirthSeconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");/**/
            
            tblUsersGender = formParseResults.fields.gender; 
        
            tblUsersDocument = formParseResults.fields.document;
            tblUsersAddressStreet = formParseResults.fields.address_street;
            tblUsersAddressNumber = formParseResults.fields.address_number;
            tblUsersAddressComplement = formParseResults.fields.address_complement;
            tblUsersNeighborhood = formParseResults.fields.neighborhood;
            tblUsersDistrict = formParseResults.fields.district;
            tblUsersCounty = formParseResults.fields.county;
            tblUsersCity = formParseResults.fields.city;
            tblUsersState = formParseResults.fields.state;
            tblUsersCountry = formParseResults.fields.country;
            tblUsersZipCode = formParseResults.fields.zip_code;
        
            tblUsersPhone1InternationalCode = formParseResults.fields.phone1_international_code;
            tblUsersPhone1AreaCode = formParseResults.fields.phone1_area_code;
            tblUsersPhone1 = formParseResults.fields.phone1;
        
            tblUsersPhone2InternationalCode = formParseResults.fields.phone2_international_code;
            tblUsersPhone2AreaCode = formParseResults.fields.phone2_area_code;
            tblUsersPhone2 = formParseResults.fields.phone2;
        
            tblUsersPhone3InternationalCode = formParseResults.fields.phone3_international_code;
            tblUsersPhone3AreaCode = formParseResults.fields.phone3_area_code;
            tblUsersPhone3 = formParseResults.fields.phone3;
        
            tblUsersUsername = formParseResults.fields.username;
            tblUsersEmail = formParseResults.fields.email;
            tblUsersPassword = formParseResults.fields.password;
            tblUsersPasswordHint = formParseResults.fields.password_hint;
            tblUsersPasswordLength = formParseResults.fields.password_length;
        
            tblUsersInfo1 = formParseResults.fields.info1;
            tblUsersInfo2 = formParseResults.fields.info2;
            tblUsersInfo3 = formParseResults.fields.info3;
            tblUsersInfo4 = formParseResults.fields.info4;
            tblUsersInfo5 = formParseResults.fields.info5;
            tblUsersInfo6 = formParseResults.fields.info6;
            tblUsersInfo7 = formParseResults.fields.info7;
            tblUsersInfo8 = formParseResults.fields.info8;
            tblUsersInfo9 = formParseResults.fields.info9;
            tblUsersInfo10 = formParseResults.fields.info10;
        
            //tblUsersImageMain = formParseResults.fields.image_main;
        
            tblUsersActivation = formParseResults.fields.activation;
            tblUsersActivation1 = formParseResults.fields.activation1;
            tblUsersActivation2 = formParseResults.fields.activation2;
            tblUsersActivation3 = formParseResults.fields.activation3;
            tblUsersActivation4 = formParseResults.fields.activation4;
            tblUsersActivation5 = formParseResults.fields.activation5;
        
            tblUsersIdStatus = formParseResults.fields.id_status;
            tblUsersNotes = formParseResults.fields.notes;
        
            idParent = formParseResults.fields.idParent;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //Edit record.  
            //----------------------
            let usersUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.usersUpdate_async({
                    _tblUsersID: tblUsersID,
                    _tblUsersIdParent: tblUsersIdParent,
                    _tblUsersSortOrder: tblUsersSortOrder,
                    _tblUsersDateCreation: "",
                    _tblUsersDateTimezone: "",
                    _tblUsersDateEdit: "",
                    _tblUsersIdType: tblUsersIdType,
                    _tblUsersNameTitle: tblUsersNameTitle,
                    _tblUsersNameFull: tblUsersNameFull,
                    _tblUsersNameFirst: tblUsersNameFirst,
                    _tblUsersNameLast: tblUsersNameLast,
                    _tblUsersDateBirth: tblUsersDateBirth,
                    _tblUsersGender: tblUsersGender,
                    _tblUsersDocument: tblUsersDocument,
                    _tblUsersAddressStreet: tblUsersAddressStreet,
                    _tblUsersAddressNumber: tblUsersAddressNumber,
                    _tblUsersAddressComplement: tblUsersAddressComplement,
                    _tblUsersNeighborhood: tblUsersNeighborhood,
                    _tblUsersDistrict: tblUsersDistrict,
                    _tblUsersCounty: tblUsersCounty,
                    _tblUsersCity: tblUsersCity,
                    _tblUsersState: tblUsersState,
                    _tblUsersCountry: tblUsersCountry,
                    _tblUsersZipCode: tblUsersZipCode,
                    _tblUsersPhone1InternationalCode: tblUsersPhone1InternationalCode,
                    _tblUsersPhone1AreaCode: tblUsersPhone1AreaCode,
                    _tblUsersPhone1: tblUsersPhone1,
                    _tblUsersPhone2InternationalCode: tblUsersPhone2InternationalCode,
                    _tblUsersPhone2AreaCode: tblUsersPhone2AreaCode,
                    _tblUsersPhone2: tblUsersPhone2,
                    _tblUsersPhone3InternationalCode: tblUsersPhone3InternationalCode,
                    _tblUsersPhone3AreaCode: tblUsersPhone3AreaCode,
                    _tblUsersPhone3: tblUsersPhone3,
                    _tblUsersUsername: tblUsersUsername,
                    _tblUsersEmail: tblUsersEmail,
                    _tblUsersPassword: tblUsersPassword,
                    _tblUsersPasswordHint: tblUsersPasswordHint,
                    _tblUsersPasswordLength: tblUsersPasswordLength,
                    _tblUsersInfo1: tblUsersInfo1,
                    _tblUsersInfo2: tblUsersInfo2,
                    _tblUsersInfo3: tblUsersInfo3,
                    _tblUsersInfo4: tblUsersInfo4,
                    _tblUsersInfo5: tblUsersInfo5,
                    _tblUsersInfo6: tblUsersInfo6,
                    _tblUsersInfo7: tblUsersInfo7,
                    _tblUsersInfo8: tblUsersInfo8,
                    _tblUsersInfo9: tblUsersInfo9,
                    _tblUsersInfo10: tblUsersInfo10,
                    _tblUsersImageMain: tblUsersImageMain,
                    _tblUsersActivation: tblUsersActivation,
                    _tblUsersActivation1: tblUsersActivation1,
                    _tblUsersActivation2: tblUsersActivation2,
                    _tblUsersActivation3: tblUsersActivation3,
                    _tblUsersActivation4: tblUsersActivation4,
                    _tblUsersActivation5: tblUsersActivation5,
                    _tblUsersIdStatus: tblUsersIdStatus,
                    _tblUsersNotes: tblUsersNotes
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
            if(usersUpdateResult == true)
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
            next();
        }
    })();
    //----------------------
});
//**************************************************************************************


//Export.
module.exports = router;