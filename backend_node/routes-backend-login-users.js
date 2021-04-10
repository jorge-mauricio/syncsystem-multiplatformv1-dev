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


//Backend - Users - Login - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/", (req, res, next)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const LoginUsers = require("../" + gSystemConfig.configDirectorySystem + "/login-users.js");
    //----------------------


    //Variables.
    //----------------------
    let luBackend;
    let masterPageSelect = "layout-backend-iframe";

    let messageSuccess = "";
    let messageError = "";
    let messageAlert = "";
    //----------------------


    //Value definition.
    //----------------------
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

    
    //Debug.
    //console.log("req.cookies(inside route backend)=", req.cookies);
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
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


//Backend - Login - Users - POST (check username and password).
//**************************************************************************************
//router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendLoginUsers, (req, res)=>{
router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendLoginUsers, (req, res, next)=>{
    //Variables
    //----------------------
    let username = "";
    let password = "";
    let loginVerification = false;

    let tblUsersID = "";
    let tblUsersIDCrypt = "";
    let tblUsersUsername = "";
    let tblUsersEmail = "";
    let tblUsersPassword = "";
    let tblUsersPasswordDecrypt = "";

    let arrSearchParameters = [];
    let objUsersLogin = "";
    let objUsersLoginParameters = {};

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


                        resultsFunctionsFiles = { returnStatus: true };

                        if(resultsFunctionsFiles.returnStatus == true)
                        {
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
            //tblFormsID = "";
            username = formParseResults.fields.username;
            password = formParseResults.fields.password;
        
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Logic.
            //----------------------
            //Parameters build.
            arrSearchParameters.push("username;" + username + ";s");
            arrSearchParameters.push("id;11;i"); //Node JS Default User (configCryptData = 26 - Crypto Module algorithm: aes-256-cbc)
            arrSearchParameters.push("activation;1;i");

            objUsersLoginParameters = {
                _arrSearchParameters: arrSearchParameters,
                _configSortOrder: gSystemConfig.configUsersSort,
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            };

            //Object build.
            objUsersLogin = new SyncSystemNS.ObjectUsersListing(objUsersLoginParameters);
            await objUsersLogin.recordsListingGet(0, 3);


            //Loop through results.
            for(let countArray = 0; objUsersLogin.resultsUsersListing.length > countArray; countArray++)
            {
                //Clean values.
                tblUsersUsername = "";
                tblUsersEmail = "";
                tblUsersPassword = "";
                tblUsersPasswordDecrypt = "";


                //Value definition.
                tblUsersPassword = objUsersLogin.resultsUsersListing[countArray].password;
                tblUsersPasswordDecrypt = SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(tblUsersPassword, "db"), 2);
            

                if(tblUsersPasswordDecrypt == password && tblUsersPasswordDecrypt != "")
                {
                    loginVerification = true;
                    tblUsersID = objUsersLogin.resultsUsersListing[countArray].id;
                    tblUsersIDCrypt = SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(tblUsersID, "db_write_text"), 2);
                }


                //Debug.
                //console.log("tblUsersID=", tblUsersID);
                //console.log("tblUsersIDCrypt=", tblUsersIDCrypt);
                //console.log("tblUsersPasswordDecrypt=", tblUsersPasswordDecrypt);
                //console.log("objUsersLogin.resultsUsersListing[countArray].password=", objUsersLogin.resultsUsersListing[countArray].password);
            }
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers;
            //returnURL += "?masterPageSelect=" + masterPageSelect;
            if(loginVerification == true)
            {
                //Cookie options.
                /*
                //ref: https://alligator.io/nodejs/express-cookies/
                let cookieOptions = {
                    //domain: '127.0.0.1:4444',
                    //secure: process.env.NODE_ENV === 'production'? true: false, / Forces to use https in production.
                    //expires: new Date(Date.now() + 900000),
                    //maxAge: 1000 * 60 * 10,
                    httpOnly: true // You can't access these tokens in the client's javascript.
                };
                */
                let cookieOptions = gSystemConfig.configCookieDefaultOptions;

                //Set cookie.
                //res.cookie('cookie_test', 'testing8', cookieOptions); //debug
                res.cookie(gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUserRoot,
                tblUsersIDCrypt, 
                cookieOptions);

                //SyncSystemNS.FunctionsCookies.cookieCreate('cookie_test_function', "testing inside function", "", {_req: req, _res: res});
                next();
                //TODO: Maybe, create routes exclusively to set cookies (with parameters and queries).


                returnURL += "/0?&messageSuccess=statusMessageLogin10";
            }else{
                returnURL += "/?username=" + username + "&" + "messageError=statusMessageLogin2e";
            }
            /*if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            */
            //----------------------


            //Debug.
            //console.log("returnURL=", returnURL);
            //console.log("username=", username);
            //console.log("password=", password);
            //console.log("loginVerification=", loginVerification);
            //console.log("objUsersLogin.resultsUsersListing.length=", objUsersLogin.resultsUsersListing.length);
            //console.log("req.cookies.cookie_test=", req.cookies.cookie_test);
            //console.log("req.cookies.cookie_test_function=", req.cookies.cookie_test_function);
            //console.log("req.cookies=", req.cookies);
            
            //console.log("objUsersLogin=", objUsersLogin);
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log(aError);
                //console.error(aError);
            }


            //Error.
            //returnURL += "&messageError=statusMessage3";
            //returnURL += "?messageError=statusMessage3";
            returnURL += "?messageError=statusMessageLogin2e";


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


//Backend - Log-off - Users - Root - GET.
//**************************************************************************************
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendLogOffUsersRoot, [SyncSystemNS.FunctionsCookies.cookieDelete_middleware(gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUserRoot)], (req, res, next)=>
{
    //Variables.
    var returnURL;


    //Define values.
    returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/?messageSuccess=statusMessageLogin2";


    //Logic.
    try
    { 

        //Debug.
        console.log("req.cookies(inside route users root logo-ff)=", req.cookies);
        //next();
        
    }catch(routerError){
        if(gSystemConfig.configDebug === true)
        {
            console.error("routerError=", routerError);
        }
    }finally{
        //res.send("log off");
        res.redirect(returnURL);
        //next();
    }


});
//**************************************************************************************

//Export.
module.exports = router;