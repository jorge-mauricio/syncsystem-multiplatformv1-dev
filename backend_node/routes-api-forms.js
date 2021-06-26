"use strict";

//Import Node Modules.
//----------------------
const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

const formidable = require("formidable"); //Form file upload.
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");
//----------------------


//API - Forms - details - GET.
//**************************************************************************************
//Debug: http://localhost:3000/api/forms/details/904/?apiKey=createSecretPassword
router.get("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIForms + "/" + gSystemConfig.configRouteAPIDetails + "/:idTbForms?", (req, res, next)=>{ //working, with the async block
    //Variables.
    //----------------------
    let objReturn = {returnStatus: false};
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");
   
    let ofdRecord;
    let ofdRecordParameters;

    let offlRecords;
    let offlRecordsParameters;

    let arrIdsFormsFields = [];
    let offolRecords;
    let offolRecordsParameters;

    //let cdBackend;
    let idTbForms = "";
    let pageNumber = "";
    let terminal = 0; //get from query
    //let masterPageSelect = "layout-backend-main";

    //let messageSuccess = "";
    //let messageError = "";
    //let messageAlert = "";
    //let nRecords = "";

    let apiKey = "";
    //----------------------


    //Value definition.
    //----------------------
    if(req.params.idTbForms)
    {
        idTbForms = req.params.idTbForms;
    }
    /*
    if(req.query.pageNumber)
    {
        pageNumber = req.query.pageNumber;
    }
    */

    if(req.query.apiKey)
    {
        apiKey = req.query.apiKey;
    }
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            if(idTbForms != "")
            {
                //if(configAPIKey == apiKey)
                if(configAPIKey == SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, "env"), 2))
                {
                    //Parameters build - forms - details.
                    ofdRecordParameters = {
                        _arrSearchParameters: ["id;" + idTbForms + ";i", "activation;1;i"],
                        _idTbForms: idTbForms,
                        _terminal: terminal,
                        _objSpecialParameters: {returnType: 3}
                    };

                    //Build object - forms - details.
                    ofdRecord = new SyncSystemNS.ObjectFormsDetails(ofdRecordParameters);
                    await ofdRecord.recordDetailsGet(0, 3);
                    

                    //Parameters build - forms fields - listing.
                    offlRecordsParameters = {
                        _arrSearchParameters: ["id_forms;" + idTbForms + ";i"],
                        _configSortOrder: gSystemConfig.configFormsFieldsSort,
                        _strNRecords: "",
                        _objSpecialParameters: {returnType: 3}
                    };
                    
                    //Build object - forms fields - listing.
                    offlRecords = new SyncSystemNS.ObjectFormsFieldsListing(offlRecordsParameters);
                    await offlRecords.recordsListingGet(0, 3);


                    //Filter forms fields ids.
                    offlRecords.resultsFormsFieldsListing.map((formsFieldsRow)=>{
                        arrIdsFormsFields.push(formsFieldsRow.id);

                        //Debug.
                        //console.log("formsFieldsRow=",formsFieldsRow);
                        //console.log("formsFieldsRow.id=",formsFieldsRow.id);
                    });


                    //Parameters build - forms fields options - listing.
                    offolRecordsParameters = {
                        _arrSearchParameters: ["id_forms_fields;" + arrIdsFormsFields.join() + ";ids"],
                        _configSortOrder: gSystemConfig.configFormsFieldsOptionsSort,
                        _strNRecords: "",
                        _objSpecialParameters: {returnType: 3}
                    };

                    //Build object - forms fields options - listing.
                    offolRecords = new SyncSystemNS.ObjectFormsFieldsOptionsListing(offolRecordsParameters);
                    await offolRecords.recordsListingGet(0, 3);
                        

                    //Build return object.
                    objReturn.returnStatus = true;
                    objReturn.ofdRecord = ofdRecord;
                    objReturn.offlRecords = offlRecords;
                    objReturn.offolRecords = offolRecords;


                    //Debug.
                    //console.log("objReturn=",objReturn);
                    //console.log("arrIdsFormsFields=",arrIdsFormsFields);
                    //console.log("arrIdsFormsFields.join()=",arrIdsFormsFields.join());
                    //console.log("offlRecords.resultsFormsFieldsListing=",offlRecords.resultsFormsFieldsListing);
                    //console.log("arrIdsFormsFields=",Object.keys(offlRecords)["id"]);
                    //console.log("offolRecords=",offolRecords);
                    

                    //Serve object.
                    //res.json(ocdRecord);
                    //res.json(objReturn);
                }else{
                    //API key not the same.
                    objReturn.returnStatus = false;
                    objReturn.errorMessage = "statusMessageAPI2e";

                    //res.json(objReturn);
                }
            }
            /*
            //Object instance.
            cdBackend = new FormsDetails({
                idTbForms: idTbForms,
                pageNumber: pageNumber,
                masterPageSelect: masterPageSelect,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert,
                nRecords: nRecords
            });  
            
            //Build object data.
            await cdBackend.build();

            //return res.json(FormsListingResultJsonObj);
            //res.send(idTbForms);
            res.json(cdBackend);
            */
            

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


//API - Forms - send - POST.
//**************************************************************************************
//Debug: http://localhost:3000/api/forms/send/904/?apiKey=createSecretPassword
//Debug: http://localhost:3000/api/forms/send/
//router.post("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIForms + "/" + gSystemConfig.configRouteAPIActionSend + "/:idTbForms?", (req, res)=>{ //working, with the async block
router.post("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIForms + "/" + gSystemConfig.configRouteAPIActionSend + "/", (req, res, next)=>{ //working, with the async block
    //Variables
    //----------------------
    let objReturn = {returnStatus: false};
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");
    
    let idTbForms = "";
    let masterPageSelect = "";
    let returnURL = "";

    //let apiURLFormsDetails;
    //let apiFormsDetailsResponse;
    //let objForms;
    //let objFormsDetails;
    let ofdRecordParameters;
    let ofdRecord;

    let objEmailBody;
    //let emailBodyText;
    //let emailBodyHTML;
    let emailSendResult;
    let objEmailSendParameters;

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
            //tblFormsID = "";
            idTbForms = formParseResults.fields.idTbForms;
            returnURL = formParseResults.fields.returnURL;

            //Build content.
            objEmailBody = await SyncSystemNS.FunctionsEmail.formsContent(idTbForms, 
                                                                        {
                                                                            _fields: formParseResults.fields, 
                                                                            _fieldsMultipleValues: formParseResults.fieldsMultipleValues, 
                                                                            _files: formParseResults.files
                                                                        }, 
                                                                        0);
            /*
            emailBodyText = await SyncSystemNS.FunctionsEmail.formsContent(idTbForms, 
                                                                            {
                                                                                _fields: formParseResults.fields, 
                                                                                _fieldsMultipleValues: formParseResults.fieldsMultipleValues, 
                                                                                _files: formParseResults.files
                                                                            }, 
                                                                            0);
            emailBodyHTML = await SyncSystemNS.FunctionsEmail.formsContent(idTbForms, 
                                                                            {
                                                                                _fields: formParseResults.fields, 
                                                                                _fieldsMultipleValues: formParseResults.fieldsMultipleValues, 
                                                                                _files: formParseResults.files
                                                                            }, 
                                                                            1);
            */
        

            //Forms detail.
            ofdRecordParameters = {
                _arrSearchParameters: ["id;" + idTbForms + ";i"],
                _idTbForms: idTbForms,
                _terminal: 0,
                _objSpecialParameters: {returnType: 3}
            }

            ofdRecord = new SyncSystemNS.ObjectFormsDetails(ofdRecordParameters);
            await ofdRecord.recordDetailsGet(0, 3);


            //Return URL build.
            returnURL = gSystemConfig.configURLFrontendReact + "/" + returnURL  + "/" + idTbForms + "/";


            //Debug.
            //console.log("idTbForms=", idTbForms);
            //console.log("returnURL=", returnURL);
            //console.log("emailBodyText=", emailBodyText);
            //console.log("emailBodyHTML=", emailBodyHTML);
            //console.log("objEmailBody=", objEmailBody);
            //----------------------


            //API - forms - details.
            //----------------------
            //API - build URL string.
            //apiURLFormsDetails = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIForms + "/" + gSystemConfig.configRouteAPIDetails + "/" + idTbForms + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);

            //API - fetch data from backend.
            //apiFormsDetailsResponse = await fetch(apiURLFormsDetails);
            //objForms = await apiFormsDetailsResponse.json();

            
            //Debug.
            //console.log("objForms=", objForms);
            //console.log("ofdRecord=", ofdRecord);
            //----------------------


            //Logic.  
            //----------------------
            //Build e-mail send parameters.
            objEmailSendParameters = {
                _emailSender: gSystemConfig.enableEmailSenderDefault,
                _emailSenderName: gSystemConfig.enableEmailSenderNameDefault,
                _emailSenderRecipient: ofdRecord.tblFormsRecipientEmail,
                _emailSenderRecipientName: ofdRecord.tblFormsRecipientName,
                _emailReply: gSystemConfig.enableEmailReplyDefault,
                _emailSubject: ofdRecord.tblFormsFormSubject,
                _emailBodyMessageText: objEmailBody.formsContentText,
                _emailBodyMessageHTML: objEmailBody.formsContentHTML,
                _emailSendType: gSystemConfig.configEmailComponent //11 - nodemailer
            };//Debug: _emailSenderRecipient: gSystemConfig.enableEmailRecipientDefault, _emailSenderRecipientName: gSystemConfig.enableEmailRecipientNameDefault,

            if(gSystemConfig.enableFormsEmailFormat = 1)
            {
                objEmailSendParameters._emailFormat = ofdRecord.tblFormsEmailFormat;
            }

            //Send e-mail.
            emailSendResult = await SyncSystemNS.FunctionsEmail.emailSend(objEmailSendParameters);

            //Debug.
            //console.log("emailSendResult=", emailSendResult);
            //console.log("ofdRecord.resultsFormsDetails.tblFormsFormSubject=", ofdRecord.tblFormsFormSubject);
            //----------------------


            //Success.
            //----------------------
            if(emailSendResult.returnStatus === true)
            {
                objReturn.returnStatus = true;
            }
            //----------------------
        }catch(aError){
            if(gSystemConfig.configDebug === true)
            {
                console.log(aError);
                console.error(aError);
                console.log("emailSendResult=", emailSendResult);
            }


            //Error.
            returnURL += "?messageError=statusMessage3";
            //returnURL += "&messageError=statusMessage3";


            //Redirect.
            //res.redirect("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" + idParent);
            //res.redirect(returnURL);
        }finally{
            //Page redirect.
            res.redirect(returnURL);
            //res.json(objReturn); //debug.
        }
    })();
    //----------------------
            

    //Debug.
    //console.log(req.body);//object with the query post
    //console.log("fields = ");
    //console.log(fields);//object with the query post    
});
//**************************************************************************************


//Export.
module.exports = router;