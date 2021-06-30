"use strict";

//Import Node Modules.
//----------------------
const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

const formidable = require("formidable"); //Form file upload.
const fetch = require("node-fetch");
//const nodemailer = require("nodemailer");
const _ = require('lodash');
//----------------------


//API - Login - POST.
//**************************************************************************************
//Debug: http://localhost:3000/api/login/?apiKey=createSecretPassword
router.post("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPILogin + "/", (req, res, next)=>{ //working, with the async block
    //Variables
    //----------------------
    let objReturn = {
        returnStatus: false, 
        registerVerification: false, 
        loginVerification: false, 
        loginActivation: false, 
        tblRegistersIDCrypt: "",
        loginType: []
    }; //objReturn = {returnStatus: false, , registerVerification: false, loginVerification: false, loginActivation: false, tblRegistersIDCrypt: "", loginType: []}
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");

    let username = "";
    let email = "";
    let password = "";
    let loginVerification = false;
    let registerVerification = false;

    //let pageNumber = "";
    //let pagingNRecords = "";
    //let terminal = 0; //get from query

    let apiKey = "";

    let arrSearchParameters = [];
    let ordRecordParameters;
    let ordRecord;

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
                //----------------------
                var fieldsPost;
                var fieldsMultipleValuesPost = {}; //necessary to correct a bug in this version of formidable - maybe, the update will fix the issue of multiple selections array []
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
                    //var fieldsCheckbox;
                    //var fieldsCheckbox = {debug: 123};
                    //var fieldsCheckbox = {};
                    form.on('field', function(name, value){
                    //form.on('field', (name, value, fieldsCheckbox)=>{
                        //console.log("fieldsMultipleValuesPost=", fieldsMultipleValuesPost); //debug.
                        if(name.toString().includes("[]") === true)
                        {
                            if(fieldsMultipleValuesPost.hasOwnProperty(name.toString()) === true)
                            {
                                fieldsMultipleValuesPost[name.toString()].push(value);
                            }else{
                                fieldsMultipleValuesPost[name.toString()] = []; //first, create a property key with empty array
                                fieldsMultipleValuesPost[name.toString()].push(value);
                            }

                            //Debug.
                            //console.log("[]=true");
                        }
                        /*
                        if(name in fieldsPost){
                            if(Array.isArray(fieldsPost[name])){
                                fieldsPost[name].push(value);
                            }else {
                                fieldsPost[name] = [fieldsPost[name],value];
                            }
                        }else{
                            fieldsPost[name] = value;
                        }
                        */

                        //fieldsPost["checkbox"][name].push(value);

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
                    //console.log("fieldsMultipleValuesPost=", fieldsMultipleValuesPost);
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


                        resultsFunctionsFiles = { returnStatus: true };

                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblCategoriesImageMain=", tblCategoriesImageMain);
                            //resolve({fields: fields, files: files});
                            //resolve({fields: fieldsPost, files: filesPost});
                            resolve(
                                {
                                    fields: fieldsPost, 
                                    fieldsMultipleValues: fieldsMultipleValuesPost, 
                                    files: filesPost
                                }
                            );
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
            username = formParseResults.fields.username;
            email = formParseResults.fields.email;
            password = formParseResults.fields.password;
            apiKey = formParseResults.fields.apiKey;


            //if(_.isEmpty(email) === false && _.isEmpty(password) === false)
            //if(email != "" && password != "")
            if((email) && (password))
            {
                //Change status to successful return.
                objReturn.returnStatus = true;


                //Check login.
                if(configAPIKey == SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, "env"), 2))
                {
                    //Search for e-mail.
                    let resultRegisters = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableRegisters, 
                                                                                            ["email;" + email + ";s"], 
                                                                                            gSystemConfig.configRegistersSort, 
                                                                                            "", 
                                                                                            "id, id_parent", 
                                                                                            1, 
                                                                                            {returnType: 3}); //debug: asdfa / 308


                    if(resultRegisters.length !== 0)
                    {
                        //Change status to register found.
                        objReturn.registerVerification = true;

                        
                        //Variables.
                        let tblRegistersID = "";
                        let tblRegistersIDCrypt = "";

                        let tblRegistersUsername = "";
                        let tblRegistersEmail = "";
                        let tblRegistersPassword = "";
                        let tblRegistersPasswordDecrypt = "";
                        let tblRegistersPasswordHint = "";
                        let tblRegistersPasswordLength = "";


                        //Parameters build.
                        arrSearchParameters.push("id;" + resultRegisters[0]["id"] + ";i"); 
                        //TODO: check why need both searches.
                        ordRecordParameters = {
                            _arrSearchParameters: arrSearchParameters,
                            _idTbRegisters: resultRegisters[0]["id"],
                            _terminal: 0,
                            _objSpecialParameters: {returnType: 3}
                        };
                    
                        //Object build.
                        ordRecord = new SyncSystemNS.ObjectRegistersDetails(ordRecordParameters);
                        await ordRecord.recordDetailsGet(0, 3);


                        //Define values.
                        tblRegistersID = ordRecord.resultsRegistersDetails[0].id;
                        tblRegistersPassword = ordRecord.resultsRegistersDetails[0].password;
                        tblRegistersPasswordDecrypt = SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(tblRegistersPassword, "db"), 2);


                        //Check password.
                        if(tblRegistersPasswordDecrypt == password && tblRegistersPassword != "")
                        {
                            objReturn.loginVerification = true;
                            tblRegistersIDCrypt = SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(tblRegistersID, "db_write_text"), 2);

                            objReturn.tblRegistersIDCrypt = tblRegistersIDCrypt;

                            //login type.
                            //TODO: check for register types.
                            objReturn.loginType.push(gSystemConfig.configRegistersIDUser);
                        }

                        //Check activation.
                        if(ordRecord.resultsRegistersDetails[0].activation == 1)
                        {
                            objReturn.loginActivation = true;
                        }


                        //Debug.
                        //console.log("tblRegistersID=", tblRegistersID);
                        //console.log("tblRegistersPassword=", tblRegistersPassword);
                    }


                    //Debug.
                    //console.log("username=", username);
                    //console.log("email=", email);
                    //console.log("password=", password);
                    //console.log("apiKey=", apiKey);

                    //console.log("objReturn=", objReturn);
                    //console.log("resultRegisters=", resultRegisters);
                    //console.log("ordRecord=", ordRecord);
                    //console.log("formParseResults.fieldsMultipleValues=", formParseResults.fieldsMultipleValues);
                    //formParseResults.fields
                    //formParseResults.files
                    //----------------------
                }
            }
    
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log(aError);
                console.error(aError);
            }


            //Error.
            returnURL += "?messageError=statusMessage3";
            //returnURL += "&messageError=statusMessage3";


            //Redirect.
            //res.redirect("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" + idParent);
            //res.redirect(returnURL);
        }finally{
            //Page redirect.
            //res.redirect(returnURL);
            res.json(objReturn); //debug.
        }
    })();
    //----------------------

});
//**************************************************************************************


//API - Login - Details - POST.
//**************************************************************************************
//Debug: http://localhost:3000/api/login/details/27748cfc37aad3dd31d59d1d7a193381/?apiKey=createSecretPassword
router.post("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPILogin + "/" + gSystemConfig.configRouteAPIDetails + "/:idTbRegisterCrypt", (req, res, next)=>{ //working, with the async block
    //Variables.
    //----------------------
    let objReturn = {returnStatus: false};
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");

    let ordRecord;
    let ordRecordParameters;
    
    let idTbRegisterCrypt = "";
    let idTbRegisterDecrypt = "";
    //let pageNumber = "";
    let terminal = 0; //get from query

    let apiKey = "";

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


    //Value definition.
    //----------------------
    if(req.params.idTbRegisterCrypt)
    {
        idTbRegisterCrypt = req.params.idTbRegisterCrypt;
    }

    /*
    if(req.query.apiKey)
    {
        apiKey = req.query.apiKey;
    }
    */
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            var formParseResults = await new Promise(function(resolve, reject){
                //Variables.
                //----------------------
                var fieldsPost;
                var fieldsMultipleValuesPost = {}; //necessary to correct a bug in this version of formidable - maybe, the update will fix the issue of multiple selections array []
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
                    //var fieldsCheckbox;
                    //var fieldsCheckbox = {debug: 123};
                    //var fieldsCheckbox = {};
                    form.on('field', function(name, value){
                    //form.on('field', (name, value, fieldsCheckbox)=>{
                        //console.log("fieldsMultipleValuesPost=", fieldsMultipleValuesPost); //debug.
                        if(name.toString().includes("[]") === true)
                        {
                            if(fieldsMultipleValuesPost.hasOwnProperty(name.toString()) === true)
                            {
                                fieldsMultipleValuesPost[name.toString()].push(value);
                            }else{
                                fieldsMultipleValuesPost[name.toString()] = []; //first, create a property key with empty array
                                fieldsMultipleValuesPost[name.toString()].push(value);
                            }

                            //Debug.
                            //console.log("[]=true");
                        }
                        /*
                        if(name in fieldsPost){
                            if(Array.isArray(fieldsPost[name])){
                                fieldsPost[name].push(value);
                            }else {
                                fieldsPost[name] = [fieldsPost[name],value];
                            }
                        }else{
                            fieldsPost[name] = value;
                        }
                        */

                        //fieldsPost["checkbox"][name].push(value);

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
                    //console.log("fieldsMultipleValuesPost=", fieldsMultipleValuesPost);
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


                        resultsFunctionsFiles = { returnStatus: true };

                        if(resultsFunctionsFiles.returnStatus == true)
                        {
                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblCategoriesImageMain=", tblCategoriesImageMain);
                            //resolve({fields: fields, files: files});
                            //resolve({fields: fieldsPost, files: filesPost});
                            resolve(
                                {
                                    fields: fieldsPost, 
                                    fieldsMultipleValues: fieldsMultipleValuesPost, 
                                    files: filesPost
                                }
                            );
                        }else{
                            reject(formParseErrorPost);
                        }

                    });
                    //----------------------

                }    
            });


            //Define values.
            //----------------------
            apiKey = formParseResults.fields.apiKey;

            idTbRegisterDecrypt = SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(idTbRegisterCrypt, "db"), 2)


            if(idTbRegisterDecrypt != "")
            {
                if(configAPIKey == SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, "env"), 2))
                {
                    //Parameters build - details.
                    //["id;" + idTbRegisterDecrypt + ";i", "activation;1;i"]
                    ordRecordParameters = {
                        _arrSearchParameters: ["id;" + idTbRegisterDecrypt + ";i"],
                        _idTbRegisters: idTbRegisterDecrypt,
                        _terminal: terminal,
                        _objSpecialParameters: {returnType: 3}
                    };

                    //Build object - details.
                    ordRecord = new SyncSystemNS.ObjectRegistersDetails(ordRecordParameters);
                    await ordRecord.recordDetailsGet(0, 3);


                    //Build return object.
                    objReturn.returnStatus = true;
                    objReturn.ordRecord = ordRecord;
                }else{
                    //API key not the same.
                    objReturn.returnStatus = false;
                    objReturn.errorMessage = "statusMessageAPI2e";

                    //res.json(objReturn);
                }
            }


            //Debug.
            console.log("idTbRegisterCrypt=", idTbRegisterCrypt);
            console.log("idTbRegisterDecrypt=", idTbRegisterDecrypt);
            console.log("apiKey=", apiKey);
            console.log("configAPIKey=", configAPIKey);
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{
            //Serve object.
            res.json(objReturn);
        }
    })();
    //----------------------
});
//**************************************************************************************


//Export.
module.exports = router;