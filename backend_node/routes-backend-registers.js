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


//Backend - Registers - listing - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/:idParent?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/:idParent?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const RegistersListing = require("../" + gSystemConfig.configDirectorySystem + "/registers-listing.js");
    //----------------------


    //Variables.
    //----------------------
    let rlBackend;
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
            rlBackend = new RegistersListing({
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
            //await rlBackend.cphBodyBuild(); //working
            await rlBackend.build();
            
            //Render data with template.
            //gSystemConfig: gSystemConfig, //moved to locals
            //res.render("layout-backend-main", {
            res.render(masterPageSelect, {
                templateData: rlBackend,
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


//Backend - Registers - POST (insert record).
//**************************************************************************************
//router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters, (req, res)=>{
router.post("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{
    //Variables
    //----------------------
    let tblRegistersID = "";
    let tblRegistersIdParent = "";
    let tblRegistersSortOrder = 0;

    let tblRegistersIdType = 0; 
    let tblRegistersIdActivity = 0; 

    let tblRegistersIdRegisterUser = 0;
    let tblRegistersIdRegister1 = 0;
    let tblRegistersIdRegister2 = 0;
    let tblRegistersIdRegister3 = 0;
    let tblRegistersIdRegister4 = 0;
    let tblRegistersIdRegister5 = 0;

    let tblRegistersType = 0;

    let tblRegistersNameTitle = "";
    let tblRegistersNameFull = "";
    let tblRegistersNameFirst = "";
    let tblRegistersNameLast = "";

    let tblRegistersCompanyNameLegal = "";
    let tblRegistersCompanyNameAlias = "";

    let tblRegistersDescription = "";

    let tblRegistersURLAlias = "";
    let tblRegistersKeywordsTags = "";
    let tblRegistersMetaDescription = "";
    let tblRegistersMetaTitle = "";
    let tblRegistersMetaInfo = "";

    let tblRegistersDateBirth = "", tblRegistersDateBirthHour = "", tblRegistersDateBirthMinute = "", tblRegistersDateBirthSeconds = "", tblRegistersDateBirthDay = "", tblRegistersDateBirthMonth = "", tblRegistersDateBirthYear = "";
    let tblRegistersGender = 0; 
    let tblRegistersHeight = 0; 
    let tblRegistersWeight = 0; 
    
    let tblRegistersDocumentType = 0;
    let tblRegistersDocument = "";
    let tblRegistersDocument1Type = 0;
    let tblRegistersDocument1 = "";
    let tblRegistersDocument2Type = 0;
    let tblRegistersDocument2 = "";

    let tblRegistersDocumentCompanyType = 0;
    let tblRegistersDocumentCompany = "";
    let tblRegistersDocumentCompany1Type = 0;
    let tblRegistersDocumentCompany1 = "";
    let tblRegistersDocumentCompany2Type = 0;
    let tblRegistersDocumentCompany2 = "";

    let tblRegistersZipCode = "";
    let tblRegistersAddressStreet = "";
    let tblRegistersAddressNumber = "";
    let tblRegistersAddressComplement = "";
    let tblRegistersNeighborhood = "";
    let tblRegistersDistrict = "";
    let tblRegistersCounty = "";
    let tblRegistersCity = "";
    let tblRegistersState = "";
    let tblRegistersCountry = "";

    let tblRegistersIdStreet = 0;
    let tblRegistersIdNeighborhood = 0;
    let tblRegistersIdDistrict = 0;
    let tblRegistersIdCounty = 0;
    let tblRegistersIdCity = 0;
    let tblRegistersIdState = 0;
    let tblRegistersIdCountry = 0;   
    
    let tblRegistersLocationReference = "";
    let tblRegistersLocationMap = "";

    let tblRegistersPhone1InternationalCode = "";
    let tblRegistersPhone1AreaCode = "";
    let tblRegistersPhone1 = "";

    let tblRegistersPhone2InternationalCode = "";
    let tblRegistersPhone2AreaCode = "";
    let tblRegistersPhone2 = "";

    let tblRegistersPhone3InternationalCode = "";
    let tblRegistersPhone3AreaCode = "";
    let tblRegistersPhone3 = "";

    let tblRegistersWebsite = "";

    let tblRegistersUsername = "";
    let tblRegistersEmail = "";
    let tblRegistersPassword = "";
    let tblRegistersPasswordHint = "";
    let tblRegistersPasswordLength = "";
        
    let tblRegistersInfo1 = "";
    let tblRegistersInfo2 = "";
    let tblRegistersInfo3 = "";
    let tblRegistersInfo4 = "";
    let tblRegistersInfo5 = "";
    let tblRegistersInfo6 = "";
    let tblRegistersInfo7 = "";
    let tblRegistersInfo8 = "";
    let tblRegistersInfo9 = "";
    let tblRegistersInfo10 = "";
    let tblRegistersInfo11 = "";
    let tblRegistersInfo12 = "";
    let tblRegistersInfo13 = "";
    let tblRegistersInfo14 = "";
    let tblRegistersInfo15 = "";
    let tblRegistersInfo16 = "";
    let tblRegistersInfo17 = "";
    let tblRegistersInfo18 = "";
    let tblRegistersInfo19 = "";
    let tblRegistersInfo20 = "";

    let tblRegistersInfoSmall1 = "";
    let tblRegistersInfoSmall2 = "";
    let tblRegistersInfoSmall3 = "";
    let tblRegistersInfoSmall4 = "";
    let tblRegistersInfoSmall5 = "";
    let tblRegistersInfoSmall6 = "";
    let tblRegistersInfoSmall7 = "";
    let tblRegistersInfoSmall8 = "";
    let tblRegistersInfoSmall9 = "";
    let tblRegistersInfoSmall10 = "";
    let tblRegistersInfoSmall11 = "";
    let tblRegistersInfoSmall12 = "";
    let tblRegistersInfoSmall13 = "";
    let tblRegistersInfoSmall14 = "";
    let tblRegistersInfoSmall15 = "";
    let tblRegistersInfoSmall16 = "";
    let tblRegistersInfoSmall17 = "";
    let tblRegistersInfoSmall18 = "";
    let tblRegistersInfoSmall19 = "";
    let tblRegistersInfoSmall20 = "";
    let tblRegistersInfoSmall21 = "";
    let tblRegistersInfoSmall22 = "";
    let tblRegistersInfoSmall23 = "";
    let tblRegistersInfoSmall24 = "";
    let tblRegistersInfoSmall25 = "";
    let tblRegistersInfoSmall26 = "";
    let tblRegistersInfoSmall27 = "";
    let tblRegistersInfoSmall28 = "";
    let tblRegistersInfoSmall29 = "";
    let tblRegistersInfoSmall30 = "";

    let tblRegistersNumber1 = 0;
    let tblRegistersNumber2 = 0;
    let tblRegistersNumber3 = 0;
    let tblRegistersNumber4 = 0;
    let tblRegistersNumber5 = 0;

    let tblRegistersNumberSmall1 = 0;
    let tblRegistersNumberSmall2 = 0;
    let tblRegistersNumberSmall3 = 0;
    let tblRegistersNumberSmall4 = 0;
    let tblRegistersNumberSmall5 = 0;

    let tblRegistersURL1 = "";
    let tblRegistersURL2 = "";
    let tblRegistersURL3 = "";
    let tblRegistersURL4 = "";
    let tblRegistersURL5 = "";

    let tblRegistersDate1 = "", tblRegistersDate1Hour = "", tblRegistersDate1Minute = "", tblRegistersDate1Seconds = "", tblRegistersDate1Day = "", tblRegistersDate1Month = "", tblRegistersDate1Year = "";
    let tblRegistersDate2 = "", tblRegistersDate2Hour = "", tblRegistersDate2Minute = "", tblRegistersDate2Seconds = "", tblRegistersDate2Day = "", tblRegistersDate2Month = "", tblRegistersDate2Year = "";
    let tblRegistersDate3 = "", tblRegistersDate3Hour = "", tblRegistersDate3Minute = "", tblRegistersDate3Seconds = "", tblRegistersDate3Day = "", tblRegistersDate3Month = "", tblRegistersDate3Year = "";
    let tblRegistersDate4 = "", tblRegistersDate4Hour = "", tblRegistersDate4Minute = "", tblRegistersDate4Seconds = "", tblRegistersDate4Day = "", tblRegistersDate4Month = "", tblRegistersDate4Year = "";
    let tblRegistersDate5 = "", tblRegistersDate5Hour = "", tblRegistersDate5Minute = "", tblRegistersDate5Seconds = "", tblRegistersDate5Day = "", tblRegistersDate5Month = "", tblRegistersDate5Year = "";
    let tblRegistersDate6 = "", tblRegistersDate6Hour = "", tblRegistersDate6Minute = "", tblRegistersDate6Seconds = "", tblRegistersDate6Day = "", tblRegistersDate6Month = "", tblRegistersDate6Year = "";
    let tblRegistersDate7 = "", tblRegistersDate7Hour = "", tblRegistersDate7Minute = "", tblRegistersDate7Seconds = "", tblRegistersDate7Day = "", tblRegistersDate7Month = "", tblRegistersDate7Year = "";
    let tblRegistersDate8 = "", tblRegistersDate8Hour = "", tblRegistersDate8Minute = "", tblRegistersDate8Seconds = "", tblRegistersDate8Day = "", tblRegistersDate8Month = "", tblRegistersDate8Year = "";
    let tblRegistersDate9 = "", tblRegistersDate9Hour = "", tblRegistersDate9Minute = "", tblRegistersDate9Seconds = "", tblRegistersDate9Day = "", tblRegistersDate9Month = "", tblRegistersDate9Year = "";
    let tblRegistersDate10 = "", tblRegistersDate10Hour = "", tblRegistersDate10Minute = "", tblRegistersDate10Seconds = "", tblRegistersDate10Day = "", tblRegistersDate10Month = "", tblRegistersDate10Year = "";

    let tblRegistersImageMain = "";
    let tblRegistersImageMainCaption = "";
    let tblRegistersImageLogo = "";
    let tblRegistersImageBanner = "";
    
    let tblRegistersImageFile1 = "";
    let tblRegistersImageFile2 = "";
    let tblRegistersImageFile3 = "";
    let tblRegistersImageFile4 = "";
    let tblRegistersImageFile5 = "";

    let tblRegistersActivation = "";
    let tblRegistersActivation1 = "";
    let tblRegistersActivation2 = "";
    let tblRegistersActivation3 = "";
    let tblRegistersActivation4 = "";
    let tblRegistersActivation5 = "";

    let tblRegistersIdStatus = 0;
    let tblRegistersRestrictedAccess = 0;
    let tblRegistersNotes = "";

    let arrIdsRegistersFiltersGeneric1 = [];
    let arrIdsRegistersFiltersGeneric2 = [];
    let arrIdsRegistersFiltersGeneric3 = [];
    let arrIdsRegistersFiltersGeneric4 = [];
    let arrIdsRegistersFiltersGeneric5 = [];
    let arrIdsRegistersFiltersGeneric6 = [];
    let arrIdsRegistersFiltersGeneric7 = [];
    let arrIdsRegistersFiltersGeneric8 = [];
    let arrIdsRegistersFiltersGeneric9 = [];
    let arrIdsRegistersFiltersGeneric10 = [];
    let arrIdsRegistersFiltersGeneric11 = [];
    let arrIdsRegistersFiltersGeneric12 = [];
    let arrIdsRegistersFiltersGeneric13 = [];
    let arrIdsRegistersFiltersGeneric14 = [];
    let arrIdsRegistersFiltersGeneric15 = [];
    let arrIdsRegistersFiltersGeneric16 = [];
    let arrIdsRegistersFiltersGeneric17 = [];
    let arrIdsRegistersFiltersGeneric18 = [];
    let arrIdsRegistersFiltersGeneric19 = [];
    let arrIdsRegistersFiltersGeneric20 = [];
    let arrIdsRegistersFiltersGeneric21 = [];
    let arrIdsRegistersFiltersGeneric22 = [];
    let arrIdsRegistersFiltersGeneric23 = [];
    let arrIdsRegistersFiltersGeneric24 = [];
    let arrIdsRegistersFiltersGeneric25 = [];
    let arrIdsRegistersFiltersGeneric26 = [];
    let arrIdsRegistersFiltersGeneric27 = [];
    let arrIdsRegistersFiltersGeneric28 = [];
    let arrIdsRegistersFiltersGeneric29 = [];
    let arrIdsRegistersFiltersGeneric30 = [];
    let arrIdsRegistersFiltersGeneric31 = [];
    let arrIdsRegistersFiltersGeneric32 = [];
    let arrIdsRegistersFiltersGeneric33 = [];
    let arrIdsRegistersFiltersGeneric34 = [];
    let arrIdsRegistersFiltersGeneric35 = [];
    let arrIdsRegistersFiltersGeneric36 = [];
    let arrIdsRegistersFiltersGeneric37 = [];
    let arrIdsRegistersFiltersGeneric38 = [];
    let arrIdsRegistersFiltersGeneric39 = [];
    let arrIdsRegistersFiltersGeneric40 = [];

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
            tblRegistersID = await new Promise((resolve, reject)=>{
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
                        if(gSystemConfig.enableRegistersFilterGeneric1 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric1")
                            {
                                //fieldsPost.idsRegistersFiltersGeneric1.push(value);
                                arrIdsRegistersFiltersGeneric1.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric2 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric2")
                            {
                                arrIdsRegistersFiltersGeneric2.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric3 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric3")
                            {
                                arrIdsRegistersFiltersGeneric3.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric4 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric4")
                            {
                                arrIdsRegistersFiltersGeneric4.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric5 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric5")
                            {
                                arrIdsRegistersFiltersGeneric5.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric6 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric6")
                            {
                                arrIdsRegistersFiltersGeneric6.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric7 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric7")
                            {
                                arrIdsRegistersFiltersGeneric7.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric8 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric8")
                            {
                                arrIdsRegistersFiltersGeneric8.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric9 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric9")
                            {
                                arrIdsRegistersFiltersGeneric9.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric10 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric10")
                            {
                                arrIdsRegistersFiltersGeneric10.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric11 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric11")
                            {
                                //fieldsPost.idsRegistersFiltersGeneric11.push(value);
                                arrIdsRegistersFiltersGeneric11.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric12 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric12")
                            {
                                arrIdsRegistersFiltersGeneric12.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric13 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric13")
                            {
                                arrIdsRegistersFiltersGeneric13.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric14 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric14")
                            {
                                arrIdsRegistersFiltersGeneric14.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric15 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric15")
                            {
                                arrIdsRegistersFiltersGeneric15.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric16 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric16")
                            {
                                arrIdsRegistersFiltersGeneric16.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric17 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric17")
                            {
                                arrIdsRegistersFiltersGeneric17.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric18 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric18")
                            {
                                arrIdsRegistersFiltersGeneric18.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric19 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric19")
                            {
                                arrIdsRegistersFiltersGeneric19.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric20 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric20")
                            {
                                arrIdsRegistersFiltersGeneric20.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric21 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric21")
                            {
                                //fieldsPost.idsRegistersFiltersGeneric21.push(value);
                                arrIdsRegistersFiltersGeneric21.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric22 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric22")
                            {
                                arrIdsRegistersFiltersGeneric22.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric23 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric23")
                            {
                                arrIdsRegistersFiltersGeneric23.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric24 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric24")
                            {
                                arrIdsRegistersFiltersGeneric24.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric25 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric25")
                            {
                                arrIdsRegistersFiltersGeneric25.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric26 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric26")
                            {
                                arrIdsRegistersFiltersGeneric26.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric27 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric27")
                            {
                                arrIdsRegistersFiltersGeneric27.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric28 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric28")
                            {
                                arrIdsRegistersFiltersGeneric28.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric29 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric29")
                            {
                                arrIdsRegistersFiltersGeneric29.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric30 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric30")
                            {
                                arrIdsRegistersFiltersGeneric30.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric31 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric31")
                            {
                                arrIdsRegistersFiltersGeneric31.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric32 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric32")
                            {
                                arrIdsRegistersFiltersGeneric32.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric33 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric33")
                            {
                                arrIdsRegistersFiltersGeneric33.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric34 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric34")
                            {
                                arrIdsRegistersFiltersGeneric34.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric35 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric35")
                            {
                                arrIdsRegistersFiltersGeneric35.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric36 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric36")
                            {
                                arrIdsRegistersFiltersGeneric36.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric37 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric37")
                            {
                                arrIdsRegistersFiltersGeneric37.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric38 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric38")
                            {
                                arrIdsRegistersFiltersGeneric38.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric39 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric39")
                            {
                                arrIdsRegistersFiltersGeneric39.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric40 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric40")
                            {
                                arrIdsRegistersFiltersGeneric40.push(value);
                            }
                        }

                        /*if (fieldsPost[name]) {
                        if (!Array.isArray(fieldsPost[name])) {
                            fieldsPost[name] = [fieldsPost[name]];
                        }
                        fieldsPost[name].push(value);
                        //arrIdsRegistersFiltersGeneric1.push(fieldsPost.idsRegistersFiltersGeneric1);

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
                        //var resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblRegistersID, 
                        resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblRegistersID, 
                                                                                                    this.openedFiles, 
                                                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                                                    "");
                        */


                        //Check fields with files.

                        //Build file fields references.
                        //image_main field.
                        if(gSystemConfig.enableRegistersImageMain == 1)
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
                        if(gSystemConfig.enableRegistersFile1 == 1)
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
                        if(gSystemConfig.enableRegistersFile2 == 1)
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
                        if(gSystemConfig.enableRegistersFile3 == 1)
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
                        if(gSystemConfig.enableRegistersFile4 == 1)
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
                        if(gSystemConfig.enableRegistersFile5 == 1)
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
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblRegistersID, 
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
                            tblRegistersImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblRegistersImageMain;
                            tblRegistersImageFile1 = (resultsFunctionsFiles.hasOwnProperty("file1") === true) ? resultsFunctionsFiles.file1 : tblRegistersImageFile1;
                            tblRegistersImageFile2 = (resultsFunctionsFiles.hasOwnProperty("file2") === true) ? resultsFunctionsFiles.file2 : tblRegistersImageFile2;
                            tblRegistersImageFile3 = (resultsFunctionsFiles.hasOwnProperty("file3") === true) ? resultsFunctionsFiles.file3 : tblRegistersImageFile3;
                            tblRegistersImageFile4 = (resultsFunctionsFiles.hasOwnProperty("file4") === true) ? resultsFunctionsFiles.file4 : tblRegistersImageFile4;
                            tblRegistersImageFile5 = (resultsFunctionsFiles.hasOwnProperty("file5") === true) ? resultsFunctionsFiles.file5 : tblRegistersImageFile5;


                            //Resize images.
                            if(tblRegistersImageMain !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrRegistersImageSize, gSystemConfig.configDirectoryFiles, tblRegistersImageMain);
                            }
                            if(tblRegistersImageFile1 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrRegistersImageSize, gSystemConfig.configDirectoryFiles, tblRegistersImageFile1);
                            }
                            if(tblRegistersImageFile2 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrRegistersImageSize, gSystemConfig.configDirectoryFiles, tblRegistersImageFile2);
                            }
                            if(tblRegistersImageFile3 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrRegistersImageSize, gSystemConfig.configDirectoryFiles, tblRegistersImageFile3);
                            }
                            if(tblRegistersImageFile4 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrRegistersImageSize, gSystemConfig.configDirectoryFiles, tblRegistersImageFile4);
                            }
                            if(tblRegistersImageFile5 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrRegistersImageSize, gSystemConfig.configDirectoryFiles, tblRegistersImageFile5);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblRegistersImageMain=", tblCategoriesImageMain);
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
            //tblRegistersID = "";
            tblRegistersIdParent = formParseResults.fields.id_parent;
            tblRegistersSortOrder = formParseResults.fields.sort_order;

            tblRegistersIdType = formParseResults.fields.id_type;
            tblRegistersIdActivity = formParseResults.fields.id_activity;

            tblRegistersIdRegisterUser = formParseResults.fields.id_register_user;
            tblRegistersIdRegister1 = formParseResults.fields.id_register1;
            tblRegistersIdRegister2 = formParseResults.fields.id_register2;
            tblRegistersIdRegister3 = formParseResults.fields.id_register3;
            tblRegistersIdRegister4 = formParseResults.fields.id_register4;
            tblRegistersIdRegister5 = formParseResults.fields.id_register5;
                
            tblRegistersType = formParseResults.fields.register_type;

            tblRegistersNameTitle = formParseResults.fields.name_title;
            tblRegistersNameFull = formParseResults.fields.name_full;
            tblRegistersNameFirst = formParseResults.fields.name_first;
            tblRegistersNameLast = formParseResults.fields.name_last;

            tblRegistersCompanyNameLegal = formParseResults.fields.company_name_legal;
            tblRegistersCompanyNameAlias = formParseResults.fields.company_name_alias;

            tblRegistersDescription = formParseResults.fields.description;
        
            tblRegistersURLAlias = formParseResults.fields.url_alias;
            tblRegistersKeywordsTags = formParseResults.fields.keywords_tags;
            tblRegistersMetaDescription = formParseResults.fields.meta_description;
            tblRegistersMetaTitle = formParseResults.fields.meta_title;
            //tblRegistersMetaInfo = formParseResults.fields.meta_info;

            tblRegistersDateBirth = formParseResults.fields.date_birth;
            tblRegistersDateBirthHour = formParseResults.fields.date_birth_hour;
            tblRegistersDateBirthMinute = formParseResults.fields.date_birth_minute;
            tblRegistersDateBirthSeconds = formParseResults.fields.date_birth_seconds;
            tblRegistersDateBirthDay = formParseResults.fields.date_birth_day;
            tblRegistersDateBirthMonth = formParseResults.fields.date_birth_month;
            tblRegistersDateBirthYear = formParseResults.fields.date_birth_year;
            tblRegistersDateBirth = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblRegistersDateBirth,
                                                                        dateFieldDay: tblRegistersDateBirthDay,
                                                                        dateFieldMonth: tblRegistersDateBirthMonth,
                                                                        dateFieldYear: tblRegistersDateBirthYear,
                                                                        dateFieldHour: tblRegistersDateBirthHour,
                                                                        dateFieldMinute: tblRegistersDateBirthMinute,
                                                                        dateFieldSeconds: tblRegistersDateBirthSeconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");/**/
            //console.log("tblRegistersDateBirth=", tblRegistersDateBirth);
            tblRegistersGender = formParseResults.fields.gender; 
            tblRegistersHeight = formParseResults.fields.height; 
            tblRegistersWeight = formParseResults.fields.weight; 

            tblRegistersDocumentType = formParseResults.fields.document_type; 
            tblRegistersDocument = formParseResults.fields.document; 
            tblRegistersDocument1Type = formParseResults.fields.document1_type; 
            tblRegistersDocument1 = formParseResults.fields.document1; 
            tblRegistersDocument2Type = formParseResults.fields.document2_type; 
            tblRegistersDocument2 = formParseResults.fields.document2; 
            
            tblRegistersDocumentCompanyType = formParseResults.fields.document_company_type; 
            tblRegistersDocumentCompany = formParseResults.fields.document_company; 
            tblRegistersDocumentCompany1Type = formParseResults.fields.document_company1_type; 
            tblRegistersDocumentCompany1 = formParseResults.fields.document_company1; 
            tblRegistersDocumentCompany2Type = formParseResults.fields.document_company2_type; 
            tblRegistersDocumentCompany2 = formParseResults.fields.document_company2; 

            tblRegistersZipCode = formParseResults.fields.zip_code;
            tblRegistersAddressStreet = formParseResults.fields.address_street;
            tblRegistersAddressNumber = formParseResults.fields.address_number;
            tblRegistersAddressComplement = formParseResults.fields.address_complement;
            tblRegistersNeighborhood = formParseResults.fields.neighborhood;
            tblRegistersDistrict = formParseResults.fields.district;
            tblRegistersCounty = formParseResults.fields.county;
            tblRegistersCity = formParseResults.fields.city;
            tblRegistersState = formParseResults.fields.state;
            tblRegistersCountry = formParseResults.fields.country;

            tblRegistersIdStreet = formParseResults.fields.id_street; 
            tblRegistersIdNeighborhood = formParseResults.fields.id_neighborhood; 
            tblRegistersIdDistrict = formParseResults.fields.id_district; 
            tblRegistersIdCounty = formParseResults.fields.id_county; 
            tblRegistersIdCity = formParseResults.fields.id_city; 
            tblRegistersIdState = formParseResults.fields.id_state; 
            tblRegistersIdCountry = formParseResults.fields.id_country; 

            tblRegistersLocationReference = formParseResults.fields.location_reference; 
            tblRegistersLocationMap = formParseResults.fields.location_map; 

            tblRegistersPhone1InternationalCode = formParseResults.fields.phone1_international_code;
            tblRegistersPhone1AreaCode = formParseResults.fields.phone1_area_code;
            tblRegistersPhone1 = formParseResults.fields.phone1;
        
            tblRegistersPhone2InternationalCode = formParseResults.fields.phone2_international_code;
            tblRegistersPhone2AreaCode = formParseResults.fields.phone2_area_code;
            tblRegistersPhone2 = formParseResults.fields.phone2;
        
            tblRegistersPhone3InternationalCode = formParseResults.fields.phone3_international_code;
            tblRegistersPhone3AreaCode = formParseResults.fields.phone3_area_code;
            tblRegistersPhone3 = formParseResults.fields.phone3;

            tblRegistersWebsite = formParseResults.fields.website;

            tblRegistersUsername = formParseResults.fields.username;
            tblRegistersEmail = formParseResults.fields.email;
            tblRegistersPassword = formParseResults.fields.password;
            tblRegistersPasswordHint = formParseResults.fields.password_hint;
            tblRegistersPasswordLength = formParseResults.fields.password_length;

            tblRegistersInfo1 = formParseResults.fields.info1;
            tblRegistersInfo2 = formParseResults.fields.info2;
            tblRegistersInfo3 = formParseResults.fields.info3;
            tblRegistersInfo4 = formParseResults.fields.info4;
            tblRegistersInfo5 = formParseResults.fields.info5;
            tblRegistersInfo6 = formParseResults.fields.info6;
            tblRegistersInfo7 = formParseResults.fields.info7;
            tblRegistersInfo8 = formParseResults.fields.info8;
            tblRegistersInfo9 = formParseResults.fields.info9;
            tblRegistersInfo10 = formParseResults.fields.info10;
            tblRegistersInfo11 = formParseResults.fields.info11;
            tblRegistersInfo12 = formParseResults.fields.info12;
            tblRegistersInfo13 = formParseResults.fields.info13;
            tblRegistersInfo14 = formParseResults.fields.info14;
            tblRegistersInfo15 = formParseResults.fields.info15;
            tblRegistersInfo16 = formParseResults.fields.info16;
            tblRegistersInfo17 = formParseResults.fields.info17;
            tblRegistersInfo18 = formParseResults.fields.info18;
            tblRegistersInfo19 = formParseResults.fields.info19;
            tblRegistersInfo20 = formParseResults.fields.info20;

            tblRegistersInfoSmall1 = formParseResults.fields.info_small1;
            tblRegistersInfoSmall2 = formParseResults.fields.info_small2;
            tblRegistersInfoSmall3 = formParseResults.fields.info_small3;
            tblRegistersInfoSmall4 = formParseResults.fields.info_small4;
            tblRegistersInfoSmall5 = formParseResults.fields.info_small5;
            tblRegistersInfoSmall6 = formParseResults.fields.info_small6;
            tblRegistersInfoSmall7 = formParseResults.fields.info_small7;
            tblRegistersInfoSmall8 = formParseResults.fields.info_small8;
            tblRegistersInfoSmall9 = formParseResults.fields.info_small9;
            tblRegistersInfoSmall10 = formParseResults.fields.info_small10;
            tblRegistersInfoSmall11 = formParseResults.fields.info_small11;
            tblRegistersInfoSmall12 = formParseResults.fields.info_small12;
            tblRegistersInfoSmall13 = formParseResults.fields.info_small13;
            tblRegistersInfoSmall14 = formParseResults.fields.info_small14;
            tblRegistersInfoSmall15 = formParseResults.fields.info_small15;
            tblRegistersInfoSmall16 = formParseResults.fields.info_small16;
            tblRegistersInfoSmall17 = formParseResults.fields.info_small17;
            tblRegistersInfoSmall18 = formParseResults.fields.info_small18;
            tblRegistersInfoSmall19 = formParseResults.fields.info_small19;
            tblRegistersInfoSmall20 = formParseResults.fields.info_small20;
            tblRegistersInfoSmall21 = formParseResults.fields.info_small21;
            tblRegistersInfoSmall22 = formParseResults.fields.info_small22;
            tblRegistersInfoSmall23 = formParseResults.fields.info_small23;
            tblRegistersInfoSmall24 = formParseResults.fields.info_small24;
            tblRegistersInfoSmall25 = formParseResults.fields.info_small25;
            tblRegistersInfoSmall26 = formParseResults.fields.info_small26;
            tblRegistersInfoSmall27 = formParseResults.fields.info_small27;
            tblRegistersInfoSmall28 = formParseResults.fields.info_small28;
            tblRegistersInfoSmall29 = formParseResults.fields.info_small29;
            tblRegistersInfoSmall30 = formParseResults.fields.info_small30;

            tblRegistersNumber1 = formParseResults.fields.number1;
            tblRegistersNumber2 = formParseResults.fields.number2;
            tblRegistersNumber3 = formParseResults.fields.number3;
            tblRegistersNumber4 = formParseResults.fields.number4;
            tblRegistersNumber5 = formParseResults.fields.number5;
            
            tblRegistersNumberSmall1 = formParseResults.fields.number_small1;
            tblRegistersNumberSmall2 = formParseResults.fields.number_small2;
            tblRegistersNumberSmall3 = formParseResults.fields.number_small3;
            tblRegistersNumberSmall4 = formParseResults.fields.number_small4;
            tblRegistersNumberSmall5 = formParseResults.fields.number_small5;

            tblRegistersURL1 = formParseResults.fields.url1;
            tblRegistersURL2 = formParseResults.fields.url2;
            tblRegistersURL3 = formParseResults.fields.url3;
            tblRegistersURL4 = formParseResults.fields.url4;
            tblRegistersURL5 = formParseResults.fields.url5;
        
            tblRegistersDate1 = formParseResults.fields.date1;
            tblRegistersDate1Hour = formParseResults.fields.date1_hour;
            tblRegistersDate1Minute = formParseResults.fields.date1_minute;
            tblRegistersDate1Seconds = formParseResults.fields.date1_seconds;
            tblRegistersDate1Day = formParseResults.fields.date1_day;
            tblRegistersDate1Month = formParseResults.fields.date1_month;
            tblRegistersDate1Year = formParseResults.fields.date1_year;
            //Mount.
            tblRegistersDate1 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate1,
                                                                            dateFieldDay: tblRegistersDate1Day,
                                                                            dateFieldMonth: tblRegistersDate1Month,
                                                                            dateFieldYear: tblRegistersDate1Year,
                                                                            dateFieldHour: tblRegistersDate1Hour,
                                                                            dateFieldMinute: tblRegistersDate1Minute,
                                                                            dateFieldSeconds: tblRegistersDate1Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");/**/
            
            tblRegistersDate2 = formParseResults.fields.date2;
            tblRegistersDate2Hour = formParseResults.fields.date2_hour;
            tblRegistersDate2Minute = formParseResults.fields.date2_minute;
            tblRegistersDate2Seconds = formParseResults.fields.date2_seconds;
            tblRegistersDate2Day = formParseResults.fields.date2_day;
            tblRegistersDate2Month = formParseResults.fields.date2_month;
            tblRegistersDate2Year = formParseResults.fields.date2_year;
            //Mount.
            tblRegistersDate2 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate2,
                                                                            dateFieldDay: tblRegistersDate2Day,
                                                                            dateFieldMonth: tblRegistersDate2Month,
                                                                            dateFieldYear: tblRegistersDate2Year,
                                                                            dateFieldHour: tblRegistersDate2Hour,
                                                                            dateFieldMinute: tblRegistersDate2Minute,
                                                                            dateFieldSeconds: tblRegistersDate2Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate3 = formParseResults.fields.date3;
            tblRegistersDate3Hour = formParseResults.fields.date3_hour;
            tblRegistersDate3Minute = formParseResults.fields.date3_minute;
            tblRegistersDate3Seconds = formParseResults.fields.date3_seconds;
            tblRegistersDate3Day = formParseResults.fields.date3_day;
            tblRegistersDate3Month = formParseResults.fields.date3_month;
            tblRegistersDate3Year = formParseResults.fields.date3_year;
            //Mount.
            tblRegistersDate3 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate3,
                                                                            dateFieldDay: tblRegistersDate3Day,
                                                                            dateFieldMonth: tblRegistersDate3Month,
                                                                            dateFieldYear: tblRegistersDate3Year,
                                                                            dateFieldHour: tblRegistersDate3Hour,
                                                                            dateFieldMinute: tblRegistersDate3Minute,
                                                                            dateFieldSeconds: tblRegistersDate3Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate4 = formParseResults.fields.date4;
            tblRegistersDate4Hour = formParseResults.fields.date4_hour;
            tblRegistersDate4Minute = formParseResults.fields.date4_minute;
            tblRegistersDate4Seconds = formParseResults.fields.date4_seconds;
            tblRegistersDate4Day = formParseResults.fields.date4_day;
            tblRegistersDate4Month = formParseResults.fields.date4_month;
            tblRegistersDate4Year = formParseResults.fields.date4_year;
            //Mount.
            tblRegistersDate4 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate4,
                                                                            dateFieldDay: tblRegistersDate4Day,
                                                                            dateFieldMonth: tblRegistersDate4Month,
                                                                            dateFieldYear: tblRegistersDate4Year,
                                                                            dateFieldHour: tblRegistersDate4Hour,
                                                                            dateFieldMinute: tblRegistersDate4Minute,
                                                                            dateFieldSeconds: tblRegistersDate4Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate5 = formParseResults.fields.date5;
            tblRegistersDate5Hour = formParseResults.fields.date5_hour;
            tblRegistersDate5Minute = formParseResults.fields.date5_minute;
            tblRegistersDate5Seconds = formParseResults.fields.date5_seconds;
            tblRegistersDate5Day = formParseResults.fields.date5_day;
            tblRegistersDate5Month = formParseResults.fields.date5_month;
            tblRegistersDate5Year = formParseResults.fields.date5_year;
            //Mount.
            tblRegistersDate5 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate5,
                                                                            dateFieldDay: tblRegistersDate5Day,
                                                                            dateFieldMonth: tblRegistersDate5Month,
                                                                            dateFieldYear: tblRegistersDate5Year,
                                                                            dateFieldHour: tblRegistersDate5Hour,
                                                                            dateFieldMinute: tblRegistersDate5Minute,
                                                                            dateFieldSeconds: tblRegistersDate5Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate6 = formParseResults.fields.date6;
            tblRegistersDate6Hour = formParseResults.fields.date6_hour;
            tblRegistersDate6Minute = formParseResults.fields.date6_minute;
            tblRegistersDate6Seconds = formParseResults.fields.date6_seconds;
            tblRegistersDate6Day = formParseResults.fields.date6_day;
            tblRegistersDate6Month = formParseResults.fields.date6_month;
            tblRegistersDate6Year = formParseResults.fields.date6_year;
            //Mount.
            tblRegistersDate6 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate6,
                                                                            dateFieldDay: tblRegistersDate6Day,
                                                                            dateFieldMonth: tblRegistersDate6Month,
                                                                            dateFieldYear: tblRegistersDate6Year,
                                                                            dateFieldHour: tblRegistersDate6Hour,
                                                                            dateFieldMinute: tblRegistersDate6Minute,
                                                                            dateFieldSeconds: tblRegistersDate6Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate7 = formParseResults.fields.date7;
            tblRegistersDate7Hour = formParseResults.fields.date7_hour;
            tblRegistersDate7Minute = formParseResults.fields.date7_minute;
            tblRegistersDate7Seconds = formParseResults.fields.date7_seconds;
            tblRegistersDate7Day = formParseResults.fields.date7_day;
            tblRegistersDate7Month = formParseResults.fields.date7_month;
            tblRegistersDate7Year = formParseResults.fields.date7_year;
            //Mount.
            tblRegistersDate7 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate7,
                                                                            dateFieldDay: tblRegistersDate7Day,
                                                                            dateFieldMonth: tblRegistersDate7Month,
                                                                            dateFieldYear: tblRegistersDate7Year,
                                                                            dateFieldHour: tblRegistersDate7Hour,
                                                                            dateFieldMinute: tblRegistersDate7Minute,
                                                                            dateFieldSeconds: tblRegistersDate7Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate8 = formParseResults.fields.date8;
            tblRegistersDate8Hour = formParseResults.fields.date8_hour;
            tblRegistersDate8Minute = formParseResults.fields.date8_minute;
            tblRegistersDate8Seconds = formParseResults.fields.date8_seconds;
            tblRegistersDate8Day = formParseResults.fields.date8_day;
            tblRegistersDate8Month = formParseResults.fields.date8_month;
            tblRegistersDate8Year = formParseResults.fields.date8_year;
            //Mount.
            tblRegistersDate8 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate8,
                                                                            dateFieldDay: tblRegistersDate8Day,
                                                                            dateFieldMonth: tblRegistersDate8Month,
                                                                            dateFieldYear: tblRegistersDate8Year,
                                                                            dateFieldHour: tblRegistersDate8Hour,
                                                                            dateFieldMinute: tblRegistersDate8Minute,
                                                                            dateFieldSeconds: tblRegistersDate8Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate9 = formParseResults.fields.date9;
            tblRegistersDate9Hour = formParseResults.fields.date9_hour;
            tblRegistersDate9Minute = formParseResults.fields.date9_minute;
            tblRegistersDate9Seconds = formParseResults.fields.date9_seconds;
            tblRegistersDate9Day = formParseResults.fields.date9_day;
            tblRegistersDate9Month = formParseResults.fields.date9_month;
            tblRegistersDate9Year = formParseResults.fields.date9_year;
            //Mount.
            tblRegistersDate9 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate9,
                                                                            dateFieldDay: tblRegistersDate9Day,
                                                                            dateFieldMonth: tblRegistersDate9Month,
                                                                            dateFieldYear: tblRegistersDate9Year,
                                                                            dateFieldHour: tblRegistersDate9Hour,
                                                                            dateFieldMinute: tblRegistersDate9Minute,
                                                                            dateFieldSeconds: tblRegistersDate9Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate10 = formParseResults.fields.date10;
            tblRegistersDate10Hour = formParseResults.fields.date10_hour;
            tblRegistersDate10Minute = formParseResults.fields.date10_minute;
            tblRegistersDate10Seconds = formParseResults.fields.date10_seconds;
            tblRegistersDate10Day = formParseResults.fields.date10_day;
            tblRegistersDate10Month = formParseResults.fields.date10_month;
            tblRegistersDate10Year = formParseResults.fields.date10_year;
            //Mount.
            tblRegistersDate10 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate10,
                                                                            dateFieldDay: tblRegistersDate10Day,
                                                                            dateFieldMonth: tblRegistersDate10Month,
                                                                            dateFieldYear: tblRegistersDate10Year,
                                                                            dateFieldHour: tblRegistersDate10Hour,
                                                                            dateFieldMinute: tblRegistersDate10Minute,
                                                                            dateFieldSeconds: tblRegistersDate10Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersImageMainCaption = formParseResults.fields.image_main_caption;
            tblRegistersActivation = formParseResults.fields.activation;
            tblRegistersActivation1 = formParseResults.fields.activation1;
            tblRegistersActivation2 = formParseResults.fields.activation2;
            tblRegistersActivation3 = formParseResults.fields.activation3;
            tblRegistersActivation4 = formParseResults.fields.activation4;
            tblRegistersActivation5 = formParseResults.fields.activation5;

            tblRegistersIdStatus = formParseResults.fields.id_status;
            tblRegistersRestrictedAccess = formParseResults.fields.restricted_access
            tblRegistersNotes = formParseResults.fields.notes

            idParent = formParseResults.fields.idParent;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //Insert record.
            //----------------------
            let registersInsertResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBInsert.registersInsert_async({
                    _tblRegistersID: tblRegistersID,
                    _tblRegistersIdParent: tblRegistersIdParent,
                    _tblRegistersSortOrder: tblRegistersSortOrder,
                    _tblRegistersIdType: tblRegistersIdType,
                    _tblRegistersIdActivity: tblRegistersIdActivity,
                    _tblRegistersDateCreation: "",
                    _tblRegistersDateTimezone: "",
                    _tblRegistersDateEdit: "",
                    _tblRegistersIdRegisterUser: tblRegistersIdRegisterUser,
                    _tblRegistersIdRegister1: tblRegistersIdRegister1,
                    _tblRegistersIdRegister2: tblRegistersIdRegister2,
                    _tblRegistersIdRegister3: tblRegistersIdRegister3,
                    _tblRegistersIdRegister4: tblRegistersIdRegister4,
                    _tblRegistersIdRegister5: tblRegistersIdRegister5,
                    _tblRegistersType: tblRegistersType,
                    _tblRegistersNameTitle: tblRegistersNameTitle,
                    _tblRegistersNameFull: tblRegistersNameFull,
                    _tblRegistersNameFirst: tblRegistersNameFirst,
                    _tblRegistersNameLast: tblRegistersNameLast,
                    _tblRegistersCompanyNameLegal: tblRegistersCompanyNameLegal,
                    _tblRegistersCompanyNameAlias: tblRegistersCompanyNameAlias,
                    _tblRegistersDescription: tblRegistersDescription,
                    _tblRegistersURLAlias: tblRegistersURLAlias,
                    _tblRegistersKeywordsTags: tblRegistersKeywordsTags,
                    _tblRegistersMetaDescription: tblRegistersMetaDescription,
                    _tblRegistersMetaTitle: tblRegistersMetaTitle,
                    _tblRegistersMetaInfo: tblRegistersMetaInfo,
                    _tblRegistersDateBirth: tblRegistersDateBirth,
                    _tblRegistersGender: tblRegistersGender,
                    _tblRegistersHeight: tblRegistersHeight,
                    _tblRegistersWeight: tblRegistersWeight,
                    _tblRegistersDocumentType: tblRegistersDocumentType,
                    _tblRegistersDocument: tblRegistersDocument,
                    _tblRegistersDocument1Type: tblRegistersDocument1Type,
                    _tblRegistersDocument1: tblRegistersDocument1,
                    _tblRegistersDocument2Type: tblRegistersDocument2Type,
                    _tblRegistersDocument2: tblRegistersDocument2,
                    _tblRegistersDocumentCompanyType: tblRegistersDocumentCompanyType,
                    _tblRegistersDocumentCompany: tblRegistersDocumentCompany,
                    _tblRegistersDocumentCompany1Type: tblRegistersDocumentCompany1Type,
                    _tblRegistersDocumentCompany1: tblRegistersDocumentCompany1,
                    _tblRegistersDocumentCompany2Type: tblRegistersDocumentCompany2Type,
                    _tblRegistersDocumentCompany2: tblRegistersDocumentCompany2,
                    _tblRegistersZipCode: tblRegistersZipCode,
                    _tblRegistersAddressStreet: tblRegistersAddressStreet,
                    _tblRegistersAddressNumber: tblRegistersAddressNumber,
                    _tblRegistersAddressComplement: tblRegistersAddressComplement,
                    _tblRegistersNeighborhood: tblRegistersNeighborhood,
                    _tblRegistersDistrict: tblRegistersDistrict,
                    _tblRegistersCounty: tblRegistersCounty,
                    _tblRegistersCity: tblRegistersCity,
                    _tblRegistersState: tblRegistersState,
                    _tblRegistersCountry: tblRegistersCountry,
                    _tblRegistersIdStreet: tblRegistersIdStreet,
                    _tblRegistersIdNeighborhood: tblRegistersIdNeighborhood,
                    _tblRegistersIdDistrict: tblRegistersIdDistrict,
                    _tblRegistersIdCounty: tblRegistersIdCounty,
                    _tblRegistersIdCity: tblRegistersIdCity,
                    _tblRegistersIdState: tblRegistersIdState,
                    _tblRegistersIdCountry: tblRegistersIdCountry,
                    _tblRegistersLocationReference: tblRegistersLocationReference,
                    _tblRegistersLocationMap: tblRegistersLocationMap,
                    _tblRegistersPhone1InternationalCode: tblRegistersPhone1InternationalCode,
                    _tblRegistersPhone1AreaCode: tblRegistersPhone1AreaCode,
                    _tblRegistersPhone1: tblRegistersPhone1,
                    _tblRegistersPhone2InternationalCode: tblRegistersPhone2InternationalCode,
                    _tblRegistersPhone2AreaCode: tblRegistersPhone2AreaCode,
                    _tblRegistersPhone2: tblRegistersPhone2,
                    _tblRegistersPhone3InternationalCode: tblRegistersPhone3InternationalCode,
                    _tblRegistersPhone3AreaCode: tblRegistersPhone3AreaCode,
                    _tblRegistersPhone3: tblRegistersPhone3,
                    _tblRegistersWebsite: tblRegistersWebsite,
                    _tblRegistersUsername: tblRegistersUsername,
                    _tblRegistersEmail: tblRegistersEmail,
                    _tblRegistersPassword: tblRegistersPassword,
                    _tblRegistersPasswordHint: tblRegistersPasswordHint,
                    _tblRegistersPasswordLength: tblRegistersPasswordLength,
                    _tblRegistersInfo1: tblRegistersInfo1,
                    _tblRegistersInfo2: tblRegistersInfo2,
                    _tblRegistersInfo3: tblRegistersInfo3,
                    _tblRegistersInfo4: tblRegistersInfo4,
                    _tblRegistersInfo5: tblRegistersInfo5,
                    _tblRegistersInfo6: tblRegistersInfo6,
                    _tblRegistersInfo7: tblRegistersInfo7,
                    _tblRegistersInfo8: tblRegistersInfo8,
                    _tblRegistersInfo9: tblRegistersInfo9,
                    _tblRegistersInfo10: tblRegistersInfo10,
                    _tblRegistersInfo11: tblRegistersInfo11,
                    _tblRegistersInfo12: tblRegistersInfo12,
                    _tblRegistersInfo13: tblRegistersInfo13,
                    _tblRegistersInfo14: tblRegistersInfo14,
                    _tblRegistersInfo15: tblRegistersInfo15,
                    _tblRegistersInfo16: tblRegistersInfo16,
                    _tblRegistersInfo17: tblRegistersInfo17,
                    _tblRegistersInfo18: tblRegistersInfo18,
                    _tblRegistersInfo19: tblRegistersInfo19,
                    _tblRegistersInfo20: tblRegistersInfo20,
                    _tblRegistersInfoSmall1: tblRegistersInfoSmall1,
                    _tblRegistersInfoSmall2: tblRegistersInfoSmall2,
                    _tblRegistersInfoSmall3: tblRegistersInfoSmall3,
                    _tblRegistersInfoSmall4: tblRegistersInfoSmall4,
                    _tblRegistersInfoSmall5: tblRegistersInfoSmall5,
                    _tblRegistersInfoSmall6: tblRegistersInfoSmall6,
                    _tblRegistersInfoSmall7: tblRegistersInfoSmall7,
                    _tblRegistersInfoSmall8: tblRegistersInfoSmall8,
                    _tblRegistersInfoSmall9: tblRegistersInfoSmall9,
                    _tblRegistersInfoSmall10: tblRegistersInfoSmall10,
                    _tblRegistersInfoSmall11: tblRegistersInfoSmall11,
                    _tblRegistersInfoSmall12: tblRegistersInfoSmall12,
                    _tblRegistersInfoSmall13: tblRegistersInfoSmall13,
                    _tblRegistersInfoSmall14: tblRegistersInfoSmall14,
                    _tblRegistersInfoSmall15: tblRegistersInfoSmall15,
                    _tblRegistersInfoSmall16: tblRegistersInfoSmall16,
                    _tblRegistersInfoSmall17: tblRegistersInfoSmall17,
                    _tblRegistersInfoSmall18: tblRegistersInfoSmall18,
                    _tblRegistersInfoSmall19: tblRegistersInfoSmall19,
                    _tblRegistersInfoSmall20: tblRegistersInfoSmall20,
                    _tblRegistersInfoSmall21: tblRegistersInfoSmall21,
                    _tblRegistersInfoSmall22: tblRegistersInfoSmall22,
                    _tblRegistersInfoSmall23: tblRegistersInfoSmall23,
                    _tblRegistersInfoSmall24: tblRegistersInfoSmall24,
                    _tblRegistersInfoSmall25: tblRegistersInfoSmall25,
                    _tblRegistersInfoSmall26: tblRegistersInfoSmall26,
                    _tblRegistersInfoSmall27: tblRegistersInfoSmall27,
                    _tblRegistersInfoSmall28: tblRegistersInfoSmall28,
                    _tblRegistersInfoSmall29: tblRegistersInfoSmall29,
                    _tblRegistersInfoSmall30: tblRegistersInfoSmall30,
                    _tblRegistersNumber1: tblRegistersNumber1,
                    _tblRegistersNumber2: tblRegistersNumber2,
                    _tblRegistersNumber3: tblRegistersNumber3,
                    _tblRegistersNumber4: tblRegistersNumber4,
                    _tblRegistersNumber5: tblRegistersNumber5,
                    _tblRegistersNumberSmall1: tblRegistersNumberSmall1,
                    _tblRegistersNumberSmall2: tblRegistersNumberSmall2,
                    _tblRegistersNumberSmall3: tblRegistersNumberSmall3,
                    _tblRegistersNumberSmall4: tblRegistersNumberSmall4,
                    _tblRegistersNumberSmall5: tblRegistersNumberSmall5,
                    _tblRegistersURL1: tblRegistersURL1,
                    _tblRegistersURL2: tblRegistersURL2,
                    _tblRegistersURL3: tblRegistersURL3,
                    _tblRegistersURL4: tblRegistersURL4,
                    _tblRegistersURL5: tblRegistersURL5,
                    _tblRegistersDate1: tblRegistersDate1,
                    _tblRegistersDate2: tblRegistersDate2,
                    _tblRegistersDate3: tblRegistersDate3,
                    _tblRegistersDate4: tblRegistersDate4,
                    _tblRegistersDate5: tblRegistersDate5,
                    _tblRegistersDate6: tblRegistersDate6,
                    _tblRegistersDate7: tblRegistersDate7,
                    _tblRegistersDate8: tblRegistersDate8,
                    _tblRegistersDate9: tblRegistersDate9,
                    _tblRegistersDate10: tblRegistersDate10,
                    _tblRegistersImageMain: tblRegistersImageMain,
                    _tblRegistersImageMainCaption: tblRegistersImageMainCaption,
                    _tblRegistersImageLogo: tblRegistersImageLogo,
                    _tblRegistersImageBanner: tblRegistersImageBanner,
                    _tblRegistersFile1: tblRegistersImageFile1,
                    _tblRegistersFile2: tblRegistersImageFile2,
                    _tblRegistersFile3: tblRegistersImageFile3,
                    _tblRegistersFile4: tblRegistersImageFile4,
                    _tblRegistersFile5: tblRegistersImageFile5,
                    _tblRegistersActivation: tblRegistersActivation,
                    _tblRegistersActivation1: tblRegistersActivation1,
                    _tblRegistersActivation2: tblRegistersActivation2,
                    _tblRegistersActivation3: tblRegistersActivation3,
                    _tblRegistersActivation4: tblRegistersActivation4,
                    _tblRegistersActivation5: tblRegistersActivation5,
                    _tblRegistersIdStatus: tblRegistersIdStatus,
                    _tblRegistersRestrictedAccess: tblRegistersRestrictedAccess,
                    _tblRegistersNotes: tblRegistersNotes,
                    _arrIdsRegistersFiltersGeneric1: arrIdsRegistersFiltersGeneric1,
                    _arrIdsRegistersFiltersGeneric2: arrIdsRegistersFiltersGeneric2,
                    _arrIdsRegistersFiltersGeneric3: arrIdsRegistersFiltersGeneric3,
                    _arrIdsRegistersFiltersGeneric4: arrIdsRegistersFiltersGeneric4,
                    _arrIdsRegistersFiltersGeneric5: arrIdsRegistersFiltersGeneric5,
                    _arrIdsRegistersFiltersGeneric6: arrIdsRegistersFiltersGeneric6,
                    _arrIdsRegistersFiltersGeneric7: arrIdsRegistersFiltersGeneric7,
                    _arrIdsRegistersFiltersGeneric8: arrIdsRegistersFiltersGeneric8,
                    _arrIdsRegistersFiltersGeneric9: arrIdsRegistersFiltersGeneric9,
                    _arrIdsRegistersFiltersGeneric10: arrIdsRegistersFiltersGeneric10,
                    _arrIdsRegistersFiltersGeneric11: arrIdsRegistersFiltersGeneric11,
                    _arrIdsRegistersFiltersGeneric12: arrIdsRegistersFiltersGeneric12,
                    _arrIdsRegistersFiltersGeneric13: arrIdsRegistersFiltersGeneric13,
                    _arrIdsRegistersFiltersGeneric14: arrIdsRegistersFiltersGeneric14,
                    _arrIdsRegistersFiltersGeneric15: arrIdsRegistersFiltersGeneric15,
                    _arrIdsRegistersFiltersGeneric16: arrIdsRegistersFiltersGeneric16,
                    _arrIdsRegistersFiltersGeneric17: arrIdsRegistersFiltersGeneric17,
                    _arrIdsRegistersFiltersGeneric18: arrIdsRegistersFiltersGeneric18,
                    _arrIdsRegistersFiltersGeneric19: arrIdsRegistersFiltersGeneric19,
                    _arrIdsRegistersFiltersGeneric20: arrIdsRegistersFiltersGeneric20,
                    _arrIdsRegistersFiltersGeneric21: arrIdsRegistersFiltersGeneric21,
                    _arrIdsRegistersFiltersGeneric22: arrIdsRegistersFiltersGeneric22,
                    _arrIdsRegistersFiltersGeneric23: arrIdsRegistersFiltersGeneric23,
                    _arrIdsRegistersFiltersGeneric24: arrIdsRegistersFiltersGeneric24,
                    _arrIdsRegistersFiltersGeneric25: arrIdsRegistersFiltersGeneric25,
                    _arrIdsRegistersFiltersGeneric26: arrIdsRegistersFiltersGeneric26,
                    _arrIdsRegistersFiltersGeneric27: arrIdsRegistersFiltersGeneric27,
                    _arrIdsRegistersFiltersGeneric28: arrIdsRegistersFiltersGeneric28,
                    _arrIdsRegistersFiltersGeneric29: arrIdsRegistersFiltersGeneric29,
                    _arrIdsRegistersFiltersGeneric30: arrIdsRegistersFiltersGeneric30,
                    _arrIdsRegistersFiltersGeneric31: arrIdsRegistersFiltersGeneric31,
                    _arrIdsRegistersFiltersGeneric32: arrIdsRegistersFiltersGeneric32,
                    _arrIdsRegistersFiltersGeneric33: arrIdsRegistersFiltersGeneric33,
                    _arrIdsRegistersFiltersGeneric34: arrIdsRegistersFiltersGeneric34,
                    _arrIdsRegistersFiltersGeneric35: arrIdsRegistersFiltersGeneric35,
                    _arrIdsRegistersFiltersGeneric36: arrIdsRegistersFiltersGeneric36,
                    _arrIdsRegistersFiltersGeneric37: arrIdsRegistersFiltersGeneric37,
                    _arrIdsRegistersFiltersGeneric38: arrIdsRegistersFiltersGeneric38,
                    _arrIdsRegistersFiltersGeneric39: arrIdsRegistersFiltersGeneric39,
                    _arrIdsRegistersFiltersGeneric40: arrIdsRegistersFiltersGeneric40
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
            if(registersInsertResult == true)
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
            //console.log("tblRegistersID=", tblRegistersID);
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


//Backend - Registers - edit - GET.
//**************************************************************************************
//router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbRegisters?", (req, res)=>{ //working, with the async block
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" + gSystemConfig.configRouteBackendActionEdit + "/:idTbRegisters?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    
    //Import objects.
    //----------------------
    const RegistersEdit = require("../" + gSystemConfig.configDirectorySystem + "/registers-edit.js");
    //----------------------
    

    //Variables.
    //----------------------
    let reBackend;
    let idTbRegisters = "";

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
    if(req.params.idTbRegisters)
    {
        idTbRegisters = req.params.idTbRegisters;
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
            reBackend = new RegistersEdit({
                idTbRegisters: idTbRegisters,

                pageNumber: pageNumber,
                masterPageSelect: masterPageSelect,
                cookiesData: cookiesData,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert
            });


            //Build object data.
            await reBackend.build();


            //Render data with template.
            res.render(masterPageSelect, {
                templateData: reBackend,
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


//Backend - Registers - PUT (edit).
//**************************************************************************************
//router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" + gSystemConfig.configRouteBackendActionEdit, (req, res)=>{ //working, with the async block
router.put("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" + gSystemConfig.configRouteBackendActionEdit, [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Variables
    //----------------------
    let tblRegistersID = "";
    let tblRegistersIdParent = "";
    let tblRegistersSortOrder = 0;

    let tblRegistersIdType = 0; 
    let tblRegistersIdActivity = 0; 

    let tblRegistersIdRegisterUser = 0;
    let tblRegistersIdRegister1 = 0;
    let tblRegistersIdRegister2 = 0;
    let tblRegistersIdRegister3 = 0;
    let tblRegistersIdRegister4 = 0;
    let tblRegistersIdRegister5 = 0;

    let tblRegistersType = 0;

    let tblRegistersNameTitle = "";
    let tblRegistersNameFull = "";
    let tblRegistersNameFirst = "";
    let tblRegistersNameLast = "";

    let tblRegistersCompanyNameLegal = "";
    let tblRegistersCompanyNameAlias = "";

    let tblRegistersDescription = "";

    let tblRegistersURLAlias = "";
    let tblRegistersKeywordsTags = "";
    let tblRegistersMetaDescription = "";
    let tblRegistersMetaTitle = "";
    let tblRegistersMetaInfo = "";

    let tblRegistersDateBirth = "", tblRegistersDateBirthHour = "", tblRegistersDateBirthMinute = "", tblRegistersDateBirthSeconds = "", tblRegistersDateBirthDay = "", tblRegistersDateBirthMonth = "", tblRegistersDateBirthYear = "";
    let tblRegistersGender = 0; 
    let tblRegistersHeight = 0; 
    let tblRegistersWeight = 0; 
    
    let tblRegistersDocumentType = 0;
    let tblRegistersDocument = "";
    let tblRegistersDocument1Type = 0;
    let tblRegistersDocument1 = "";
    let tblRegistersDocument2Type = 0;
    let tblRegistersDocument2 = "";

    let tblRegistersDocumentCompanyType = 0;
    let tblRegistersDocumentCompany = "";
    let tblRegistersDocumentCompany1Type = 0;
    let tblRegistersDocumentCompany1 = "";
    let tblRegistersDocumentCompany2Type = 0;
    let tblRegistersDocumentCompany2 = "";

    let tblRegistersZipCode = "";
    let tblRegistersAddressStreet = "";
    let tblRegistersAddressNumber = "";
    let tblRegistersAddressComplement = "";
    let tblRegistersNeighborhood = "";
    let tblRegistersDistrict = "";
    let tblRegistersCounty = "";
    let tblRegistersCity = "";
    let tblRegistersState = "";
    let tblRegistersCountry = "";

    let tblRegistersIdStreet = 0;
    let tblRegistersIdNeighborhood = 0;
    let tblRegistersIdDistrict = 0;
    let tblRegistersIdCounty = 0;
    let tblRegistersIdCity = 0;
    let tblRegistersIdState = 0;
    let tblRegistersIdCountry = 0;   
    
    let tblRegistersLocationReference = "";
    let tblRegistersLocationMap = "";

    let tblRegistersPhone1InternationalCode = "";
    let tblRegistersPhone1AreaCode = "";
    let tblRegistersPhone1 = "";

    let tblRegistersPhone2InternationalCode = "";
    let tblRegistersPhone2AreaCode = "";
    let tblRegistersPhone2 = "";

    let tblRegistersPhone3InternationalCode = "";
    let tblRegistersPhone3AreaCode = "";
    let tblRegistersPhone3 = "";

    let tblRegistersWebsite = "";

    let tblRegistersUsername = "";
    let tblRegistersEmail = "";
    let tblRegistersPassword = "";
    let tblRegistersPasswordHint = "";
    let tblRegistersPasswordLength = "";
        
    let tblRegistersInfo1 = "";
    let tblRegistersInfo2 = "";
    let tblRegistersInfo3 = "";
    let tblRegistersInfo4 = "";
    let tblRegistersInfo5 = "";
    let tblRegistersInfo6 = "";
    let tblRegistersInfo7 = "";
    let tblRegistersInfo8 = "";
    let tblRegistersInfo9 = "";
    let tblRegistersInfo10 = "";
    let tblRegistersInfo11 = "";
    let tblRegistersInfo12 = "";
    let tblRegistersInfo13 = "";
    let tblRegistersInfo14 = "";
    let tblRegistersInfo15 = "";
    let tblRegistersInfo16 = "";
    let tblRegistersInfo17 = "";
    let tblRegistersInfo18 = "";
    let tblRegistersInfo19 = "";
    let tblRegistersInfo20 = "";

    let tblRegistersInfoSmall1 = "";
    let tblRegistersInfoSmall2 = "";
    let tblRegistersInfoSmall3 = "";
    let tblRegistersInfoSmall4 = "";
    let tblRegistersInfoSmall5 = "";
    let tblRegistersInfoSmall6 = "";
    let tblRegistersInfoSmall7 = "";
    let tblRegistersInfoSmall8 = "";
    let tblRegistersInfoSmall9 = "";
    let tblRegistersInfoSmall10 = "";
    let tblRegistersInfoSmall11 = "";
    let tblRegistersInfoSmall12 = "";
    let tblRegistersInfoSmall13 = "";
    let tblRegistersInfoSmall14 = "";
    let tblRegistersInfoSmall15 = "";
    let tblRegistersInfoSmall16 = "";
    let tblRegistersInfoSmall17 = "";
    let tblRegistersInfoSmall18 = "";
    let tblRegistersInfoSmall19 = "";
    let tblRegistersInfoSmall20 = "";
    let tblRegistersInfoSmall21 = "";
    let tblRegistersInfoSmall22 = "";
    let tblRegistersInfoSmall23 = "";
    let tblRegistersInfoSmall24 = "";
    let tblRegistersInfoSmall25 = "";
    let tblRegistersInfoSmall26 = "";
    let tblRegistersInfoSmall27 = "";
    let tblRegistersInfoSmall28 = "";
    let tblRegistersInfoSmall29 = "";
    let tblRegistersInfoSmall30 = "";

    let tblRegistersNumber1 = 0;
    let tblRegistersNumber2 = 0;
    let tblRegistersNumber3 = 0;
    let tblRegistersNumber4 = 0;
    let tblRegistersNumber5 = 0;

    let tblRegistersNumberSmall1 = 0;
    let tblRegistersNumberSmall2 = 0;
    let tblRegistersNumberSmall3 = 0;
    let tblRegistersNumberSmall4 = 0;
    let tblRegistersNumberSmall5 = 0;

    let tblRegistersURL1 = "";
    let tblRegistersURL2 = "";
    let tblRegistersURL3 = "";
    let tblRegistersURL4 = "";
    let tblRegistersURL5 = "";

    let tblRegistersDate1 = "", tblRegistersDate1Hour = "", tblRegistersDate1Minute = "", tblRegistersDate1Seconds = "", tblRegistersDate1Day = "", tblRegistersDate1Month = "", tblRegistersDate1Year = "";
    let tblRegistersDate2 = "", tblRegistersDate2Hour = "", tblRegistersDate2Minute = "", tblRegistersDate2Seconds = "", tblRegistersDate2Day = "", tblRegistersDate2Month = "", tblRegistersDate2Year = "";
    let tblRegistersDate3 = "", tblRegistersDate3Hour = "", tblRegistersDate3Minute = "", tblRegistersDate3Seconds = "", tblRegistersDate3Day = "", tblRegistersDate3Month = "", tblRegistersDate3Year = "";
    let tblRegistersDate4 = "", tblRegistersDate4Hour = "", tblRegistersDate4Minute = "", tblRegistersDate4Seconds = "", tblRegistersDate4Day = "", tblRegistersDate4Month = "", tblRegistersDate4Year = "";
    let tblRegistersDate5 = "", tblRegistersDate5Hour = "", tblRegistersDate5Minute = "", tblRegistersDate5Seconds = "", tblRegistersDate5Day = "", tblRegistersDate5Month = "", tblRegistersDate5Year = "";
    let tblRegistersDate6 = "", tblRegistersDate6Hour = "", tblRegistersDate6Minute = "", tblRegistersDate6Seconds = "", tblRegistersDate6Day = "", tblRegistersDate6Month = "", tblRegistersDate6Year = "";
    let tblRegistersDate7 = "", tblRegistersDate7Hour = "", tblRegistersDate7Minute = "", tblRegistersDate7Seconds = "", tblRegistersDate7Day = "", tblRegistersDate7Month = "", tblRegistersDate7Year = "";
    let tblRegistersDate8 = "", tblRegistersDate8Hour = "", tblRegistersDate8Minute = "", tblRegistersDate8Seconds = "", tblRegistersDate8Day = "", tblRegistersDate8Month = "", tblRegistersDate8Year = "";
    let tblRegistersDate9 = "", tblRegistersDate9Hour = "", tblRegistersDate9Minute = "", tblRegistersDate9Seconds = "", tblRegistersDate9Day = "", tblRegistersDate9Month = "", tblRegistersDate9Year = "";
    let tblRegistersDate10 = "", tblRegistersDate10Hour = "", tblRegistersDate10Minute = "", tblRegistersDate10Seconds = "", tblRegistersDate10Day = "", tblRegistersDate10Month = "", tblRegistersDate10Year = "";

    let tblRegistersImageMain = "";
    let tblRegistersImageMainCaption = "";
    let tblRegistersImageLogo = "";
    let tblRegistersImageBanner = "";
    
    let tblRegistersImageFile1 = "";
    let tblRegistersImageFile2 = "";
    let tblRegistersImageFile3 = "";
    let tblRegistersImageFile4 = "";
    let tblRegistersImageFile5 = "";

    let tblRegistersActivation = "";
    let tblRegistersActivation1 = "";
    let tblRegistersActivation2 = "";
    let tblRegistersActivation3 = "";
    let tblRegistersActivation4 = "";
    let tblRegistersActivation5 = "";

    let tblRegistersIdStatus = 0;
    let tblRegistersRestrictedAccess = 0;
    let tblRegistersNotes = "";

    let arrIdsRegistersFiltersGeneric1 = [];
    let arrIdsRegistersFiltersGeneric2 = [];
    let arrIdsRegistersFiltersGeneric3 = [];
    let arrIdsRegistersFiltersGeneric4 = [];
    let arrIdsRegistersFiltersGeneric5 = [];
    let arrIdsRegistersFiltersGeneric6 = [];
    let arrIdsRegistersFiltersGeneric7 = [];
    let arrIdsRegistersFiltersGeneric8 = [];
    let arrIdsRegistersFiltersGeneric9 = [];
    let arrIdsRegistersFiltersGeneric10 = [];
    let arrIdsRegistersFiltersGeneric11 = [];
    let arrIdsRegistersFiltersGeneric12 = [];
    let arrIdsRegistersFiltersGeneric13 = [];
    let arrIdsRegistersFiltersGeneric14 = [];
    let arrIdsRegistersFiltersGeneric15 = [];
    let arrIdsRegistersFiltersGeneric16 = [];
    let arrIdsRegistersFiltersGeneric17 = [];
    let arrIdsRegistersFiltersGeneric18 = [];
    let arrIdsRegistersFiltersGeneric19 = [];
    let arrIdsRegistersFiltersGeneric20 = [];
    let arrIdsRegistersFiltersGeneric21 = [];
    let arrIdsRegistersFiltersGeneric22 = [];
    let arrIdsRegistersFiltersGeneric23 = [];
    let arrIdsRegistersFiltersGeneric24 = [];
    let arrIdsRegistersFiltersGeneric25 = [];
    let arrIdsRegistersFiltersGeneric26 = [];
    let arrIdsRegistersFiltersGeneric27 = [];
    let arrIdsRegistersFiltersGeneric28 = [];
    let arrIdsRegistersFiltersGeneric29 = [];
    let arrIdsRegistersFiltersGeneric30 = [];
    let arrIdsRegistersFiltersGeneric31 = [];
    let arrIdsRegistersFiltersGeneric32 = [];
    let arrIdsRegistersFiltersGeneric33 = [];
    let arrIdsRegistersFiltersGeneric34 = [];
    let arrIdsRegistersFiltersGeneric35 = [];
    let arrIdsRegistersFiltersGeneric36 = [];
    let arrIdsRegistersFiltersGeneric37 = [];
    let arrIdsRegistersFiltersGeneric38 = [];
    let arrIdsRegistersFiltersGeneric39 = [];
    let arrIdsRegistersFiltersGeneric40 = [];

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
                            tblRegistersID = fieldsPost.id;
                            

                            //console.log("formParseResults.files.image_main=", formParseResults.files.image_main);

                            //resolve({fields: fields, files: files}); //working
                        }
                    });
                    //----------------------


                    //Field parsing.
                    //----------------------
                    form.on('field', function(name, value){

                        //Array detection.
                        if(gSystemConfig.enableRegistersFilterGeneric1 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric1")
                            {
                                //fieldsPost.idsRegistersFiltersGeneric1.push(value);
                                arrIdsRegistersFiltersGeneric1.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric2 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric2")
                            {
                                arrIdsRegistersFiltersGeneric2.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric3 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric3")
                            {
                                arrIdsRegistersFiltersGeneric3.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric4 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric4")
                            {
                                arrIdsRegistersFiltersGeneric4.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric5 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric5")
                            {
                                arrIdsRegistersFiltersGeneric5.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric6 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric6")
                            {
                                arrIdsRegistersFiltersGeneric6.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric7 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric7")
                            {
                                arrIdsRegistersFiltersGeneric7.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric8 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric8")
                            {
                                arrIdsRegistersFiltersGeneric8.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric9 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric9")
                            {
                                arrIdsRegistersFiltersGeneric9.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric10 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric10")
                            {
                                arrIdsRegistersFiltersGeneric10.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric11 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric11")
                            {
                                //fieldsPost.idsRegistersFiltersGeneric11.push(value);
                                arrIdsRegistersFiltersGeneric11.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric12 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric12")
                            {
                                arrIdsRegistersFiltersGeneric12.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric13 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric13")
                            {
                                arrIdsRegistersFiltersGeneric13.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric14 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric14")
                            {
                                arrIdsRegistersFiltersGeneric14.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric15 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric15")
                            {
                                arrIdsRegistersFiltersGeneric15.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric16 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric16")
                            {
                                arrIdsRegistersFiltersGeneric16.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric17 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric17")
                            {
                                arrIdsRegistersFiltersGeneric17.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric18 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric18")
                            {
                                arrIdsRegistersFiltersGeneric18.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric19 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric19")
                            {
                                arrIdsRegistersFiltersGeneric19.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric20 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric20")
                            {
                                arrIdsRegistersFiltersGeneric20.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric21 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric21")
                            {
                                //fieldsPost.idsRegistersFiltersGeneric21.push(value);
                                arrIdsRegistersFiltersGeneric21.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric22 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric22")
                            {
                                arrIdsRegistersFiltersGeneric22.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric23 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric23")
                            {
                                arrIdsRegistersFiltersGeneric23.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric24 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric24")
                            {
                                arrIdsRegistersFiltersGeneric24.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric25 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric25")
                            {
                                arrIdsRegistersFiltersGeneric25.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric26 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric26")
                            {
                                arrIdsRegistersFiltersGeneric26.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric27 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric27")
                            {
                                arrIdsRegistersFiltersGeneric27.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric28 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric28")
                            {
                                arrIdsRegistersFiltersGeneric28.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric29 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric29")
                            {
                                arrIdsRegistersFiltersGeneric29.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric30 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric30")
                            {
                                arrIdsRegistersFiltersGeneric30.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric31 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric31")
                            {
                                arrIdsRegistersFiltersGeneric31.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric32 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric32")
                            {
                                arrIdsRegistersFiltersGeneric32.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric33 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric33")
                            {
                                arrIdsRegistersFiltersGeneric33.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric34 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric34")
                            {
                                arrIdsRegistersFiltersGeneric34.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric35 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric35")
                            {
                                arrIdsRegistersFiltersGeneric35.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric36 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric36")
                            {
                                arrIdsRegistersFiltersGeneric36.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric37 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric37")
                            {
                                arrIdsRegistersFiltersGeneric37.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric38 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric38")
                            {
                                arrIdsRegistersFiltersGeneric38.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric39 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric39")
                            {
                                arrIdsRegistersFiltersGeneric39.push(value);
                            }
                        }
                        if(gSystemConfig.enableRegistersFilterGeneric40 != 0)
                        {
                            if(name.toString() == "idsRegistersFiltersGeneric40")
                            {
                                arrIdsRegistersFiltersGeneric40.push(value);
                            }
                        }


                        /*if (fieldsPost[name]) {
                        if (!Array.isArray(fieldsPost[name])) {
                            fieldsPost[name] = [fieldsPost[name]];
                        }
                        fieldsPost[name].push(value);
                        //arrIdsRegistersFiltersGeneric1.push(fieldsPost.idsRegistersFiltersGeneric1);

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
                        //var resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblRegistersID, 
                        resultsFunctionsFiles = await SyncSystemNS.FunctionsFiles.filesUpload(tblRegistersID, 
                                                                                                    this.openedFiles, 
                                                                                                    gSystemConfig.configDirectoryFilesUpload, 
                                                                                                    "");
                        */


                        //Check fields with files.

                        //Build file fields references.
                        //image_main field.
                        if(gSystemConfig.enableRegistersImageMain == 1)
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
                        if(gSystemConfig.enableRegistersFile1 == 1)
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
                        if(gSystemConfig.enableRegistersFile2 == 1)
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
                        if(gSystemConfig.enableRegistersFile3 == 1)
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
                        if(gSystemConfig.enableRegistersFile4 == 1)
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
                        if(gSystemConfig.enableRegistersFile5 == 1)
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
                            SyncSystemNS.FunctionsFiles.filesUploadMultiple(tblRegistersID, 
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
                            tblRegistersImageMain = (resultsFunctionsFiles.hasOwnProperty("image_main") === true) ? resultsFunctionsFiles.image_main : tblRegistersImageMain;
                            tblRegistersImageFile1 = (resultsFunctionsFiles.hasOwnProperty("file1") === true) ? resultsFunctionsFiles.file1 : tblRegistersImageFile1;
                            tblRegistersImageFile2 = (resultsFunctionsFiles.hasOwnProperty("file2") === true) ? resultsFunctionsFiles.file2 : tblRegistersImageFile2;
                            tblRegistersImageFile3 = (resultsFunctionsFiles.hasOwnProperty("file3") === true) ? resultsFunctionsFiles.file3 : tblRegistersImageFile3;
                            tblRegistersImageFile4 = (resultsFunctionsFiles.hasOwnProperty("file4") === true) ? resultsFunctionsFiles.file4 : tblRegistersImageFile4;
                            tblRegistersImageFile5 = (resultsFunctionsFiles.hasOwnProperty("file5") === true) ? resultsFunctionsFiles.file5 : tblRegistersImageFile5;


                            //Resize images.
                            if(tblRegistersImageMain !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrRegistersImageSize, gSystemConfig.configDirectoryFiles, tblRegistersImageMain);
                            }
                            if(tblRegistersImageFile1 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrRegistersImageSize, gSystemConfig.configDirectoryFiles, tblRegistersImageFile1);
                            }
                            if(tblRegistersImageFile2 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrRegistersImageSize, gSystemConfig.configDirectoryFiles, tblRegistersImageFile2);
                            }
                            if(tblRegistersImageFile3 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrRegistersImageSize, gSystemConfig.configDirectoryFiles, tblRegistersImageFile3);
                            }
                            if(tblRegistersImageFile4 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrRegistersImageSize, gSystemConfig.configDirectoryFiles, tblRegistersImageFile4);
                            }
                            if(tblRegistersImageFile5 !== "")
                            {
                                resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrRegistersImageSize, gSystemConfig.configDirectoryFiles, tblRegistersImageFile5);
                            }
                            

                            //Debug.
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
                            //console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
                            //console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
                            //console.log("tblRegistersImageMain=", tblCategoriesImageMain);
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
            //tblRegistersID = "";
            tblRegistersIdParent = formParseResults.fields.id_parent;
            tblRegistersSortOrder = formParseResults.fields.sort_order;

            tblRegistersIdType = formParseResults.fields.id_type;
            tblRegistersIdActivity = formParseResults.fields.id_activity;
        
            tblRegistersIdRegisterUser = formParseResults.fields.id_register_user;
            tblRegistersIdRegister1 = formParseResults.fields.id_register1;
            tblRegistersIdRegister2 = formParseResults.fields.id_register2;
            tblRegistersIdRegister3 = formParseResults.fields.id_register3;
            tblRegistersIdRegister4 = formParseResults.fields.id_register4;
            tblRegistersIdRegister5 = formParseResults.fields.id_register5;

            tblRegistersType = formParseResults.fields.register_type;

            tblRegistersNameTitle = formParseResults.fields.name_title;
            tblRegistersNameFull = formParseResults.fields.name_full;
            tblRegistersNameFirst = formParseResults.fields.name_first;
            tblRegistersNameLast = formParseResults.fields.name_last;

            tblRegistersCompanyNameLegal = formParseResults.fields.company_name_legal;
            tblRegistersCompanyNameAlias = formParseResults.fields.company_name_alias;

            tblRegistersDescription = formParseResults.fields.description;
        
            tblRegistersURLAlias = formParseResults.fields.url_alias;
            tblRegistersKeywordsTags = formParseResults.fields.keywords_tags;
            tblRegistersMetaDescription = formParseResults.fields.meta_description;
            tblRegistersMetaTitle = formParseResults.fields.meta_title;
            //tblRegistersMetaInfo = formParseResults.fields.meta_info;

            tblRegistersDateBirth = formParseResults.fields.date_birth;
            tblRegistersDateBirthHour = formParseResults.fields.date_birth_hour;
            tblRegistersDateBirthMinute = formParseResults.fields.date_birth_minute;
            tblRegistersDateBirthSeconds = formParseResults.fields.date_birth_seconds;
            tblRegistersDateBirthDay = formParseResults.fields.date_birth_day;
            tblRegistersDateBirthMonth = formParseResults.fields.date_birth_month;
            tblRegistersDateBirthYear = formParseResults.fields.date_birth_year;
            tblRegistersDateBirth = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                        dateField: tblRegistersDateBirth,
                                                                        dateFieldDay: tblRegistersDateBirthDay,
                                                                        dateFieldMonth: tblRegistersDateBirthMonth,
                                                                        dateFieldYear: tblRegistersDateBirthYear,
                                                                        dateFieldHour: tblRegistersDateBirthHour,
                                                                        dateFieldMinute: tblRegistersDateBirthMinute,
                                                                        dateFieldSeconds: tblRegistersDateBirthSeconds
                                                                    },  
                                                                    gSystemConfig.configBackendDateFormat, 
                                                                    "");/**/
            //console.log("tblRegistersDateBirth=", tblRegistersDateBirth);
            tblRegistersGender = formParseResults.fields.gender; 
            tblRegistersHeight = formParseResults.fields.height; 
            tblRegistersWeight = formParseResults.fields.weight; 

            tblRegistersDocumentType = formParseResults.fields.document_type; 
            tblRegistersDocument = formParseResults.fields.document; 
            tblRegistersDocument1Type = formParseResults.fields.document1_type; 
            tblRegistersDocument1 = formParseResults.fields.document1; 
            tblRegistersDocument2Type = formParseResults.fields.document2_type; 
            tblRegistersDocument2 = formParseResults.fields.document2; 
            
            tblRegistersDocumentCompanyType = formParseResults.fields.document_company_type; 
            tblRegistersDocumentCompany = formParseResults.fields.document_company; 
            tblRegistersDocumentCompany1Type = formParseResults.fields.document_company1_type; 
            tblRegistersDocumentCompany1 = formParseResults.fields.document_company1; 
            tblRegistersDocumentCompany2Type = formParseResults.fields.document_company2_type; 
            tblRegistersDocumentCompany2 = formParseResults.fields.document_company2; 

            tblRegistersZipCode = formParseResults.fields.zip_code;
            tblRegistersAddressStreet = formParseResults.fields.address_street;
            tblRegistersAddressNumber = formParseResults.fields.address_number;
            tblRegistersAddressComplement = formParseResults.fields.address_complement;
            tblRegistersNeighborhood = formParseResults.fields.neighborhood;
            tblRegistersDistrict = formParseResults.fields.district;
            tblRegistersCounty = formParseResults.fields.county;
            tblRegistersCity = formParseResults.fields.city;
            tblRegistersState = formParseResults.fields.state;
            tblRegistersCountry = formParseResults.fields.country;

            tblRegistersIdStreet = formParseResults.fields.id_street; 
            tblRegistersIdNeighborhood = formParseResults.fields.id_neighborhood; 
            tblRegistersIdDistrict = formParseResults.fields.id_district; 
            tblRegistersIdCounty = formParseResults.fields.id_county; 
            tblRegistersIdCity = formParseResults.fields.id_city; 
            tblRegistersIdState = formParseResults.fields.id_state; 
            tblRegistersIdCountry = formParseResults.fields.id_country; 

            tblRegistersLocationReference = formParseResults.fields.location_reference; 
            tblRegistersLocationMap = formParseResults.fields.location_map; 

            tblRegistersPhone1InternationalCode = formParseResults.fields.phone1_international_code;
            tblRegistersPhone1AreaCode = formParseResults.fields.phone1_area_code;
            tblRegistersPhone1 = formParseResults.fields.phone1;
        
            tblRegistersPhone2InternationalCode = formParseResults.fields.phone2_international_code;
            tblRegistersPhone2AreaCode = formParseResults.fields.phone2_area_code;
            tblRegistersPhone2 = formParseResults.fields.phone2;
        
            tblRegistersPhone3InternationalCode = formParseResults.fields.phone3_international_code;
            tblRegistersPhone3AreaCode = formParseResults.fields.phone3_area_code;
            tblRegistersPhone3 = formParseResults.fields.phone3;

            tblRegistersWebsite = formParseResults.fields.website;

            tblRegistersUsername = formParseResults.fields.username;
            tblRegistersEmail = formParseResults.fields.email;
            tblRegistersPassword = formParseResults.fields.password;
            tblRegistersPasswordHint = formParseResults.fields.password_hint;
            tblRegistersPasswordLength = formParseResults.fields.password_length;

            tblRegistersInfo1 = formParseResults.fields.info1;
            tblRegistersInfo2 = formParseResults.fields.info2;
            tblRegistersInfo3 = formParseResults.fields.info3;
            tblRegistersInfo4 = formParseResults.fields.info4;
            tblRegistersInfo5 = formParseResults.fields.info5;
            tblRegistersInfo6 = formParseResults.fields.info6;
            tblRegistersInfo7 = formParseResults.fields.info7;
            tblRegistersInfo8 = formParseResults.fields.info8;
            tblRegistersInfo9 = formParseResults.fields.info9;
            tblRegistersInfo10 = formParseResults.fields.info10;
            tblRegistersInfo11 = formParseResults.fields.info11;
            tblRegistersInfo12 = formParseResults.fields.info12;
            tblRegistersInfo13 = formParseResults.fields.info13;
            tblRegistersInfo14 = formParseResults.fields.info14;
            tblRegistersInfo15 = formParseResults.fields.info15;
            tblRegistersInfo16 = formParseResults.fields.info16;
            tblRegistersInfo17 = formParseResults.fields.info17;
            tblRegistersInfo18 = formParseResults.fields.info18;
            tblRegistersInfo19 = formParseResults.fields.info19;
            tblRegistersInfo20 = formParseResults.fields.info20;

            tblRegistersInfoSmall1 = formParseResults.fields.info_small1;
            tblRegistersInfoSmall2 = formParseResults.fields.info_small2;
            tblRegistersInfoSmall3 = formParseResults.fields.info_small3;
            tblRegistersInfoSmall4 = formParseResults.fields.info_small4;
            tblRegistersInfoSmall5 = formParseResults.fields.info_small5;
            tblRegistersInfoSmall6 = formParseResults.fields.info_small6;
            tblRegistersInfoSmall7 = formParseResults.fields.info_small7;
            tblRegistersInfoSmall8 = formParseResults.fields.info_small8;
            tblRegistersInfoSmall9 = formParseResults.fields.info_small9;
            tblRegistersInfoSmall10 = formParseResults.fields.info_small10;
            tblRegistersInfoSmall11 = formParseResults.fields.info_small11;
            tblRegistersInfoSmall12 = formParseResults.fields.info_small12;
            tblRegistersInfoSmall13 = formParseResults.fields.info_small13;
            tblRegistersInfoSmall14 = formParseResults.fields.info_small14;
            tblRegistersInfoSmall15 = formParseResults.fields.info_small15;
            tblRegistersInfoSmall16 = formParseResults.fields.info_small16;
            tblRegistersInfoSmall17 = formParseResults.fields.info_small17;
            tblRegistersInfoSmall18 = formParseResults.fields.info_small18;
            tblRegistersInfoSmall19 = formParseResults.fields.info_small19;
            tblRegistersInfoSmall20 = formParseResults.fields.info_small20;
            tblRegistersInfoSmall21 = formParseResults.fields.info_small21;
            tblRegistersInfoSmall22 = formParseResults.fields.info_small22;
            tblRegistersInfoSmall23 = formParseResults.fields.info_small23;
            tblRegistersInfoSmall24 = formParseResults.fields.info_small24;
            tblRegistersInfoSmall25 = formParseResults.fields.info_small25;
            tblRegistersInfoSmall26 = formParseResults.fields.info_small26;
            tblRegistersInfoSmall27 = formParseResults.fields.info_small27;
            tblRegistersInfoSmall28 = formParseResults.fields.info_small28;
            tblRegistersInfoSmall29 = formParseResults.fields.info_small29;
            tblRegistersInfoSmall30 = formParseResults.fields.info_small30;

            tblRegistersNumber1 = formParseResults.fields.number1;
            tblRegistersNumber2 = formParseResults.fields.number2;
            tblRegistersNumber3 = formParseResults.fields.number3;
            tblRegistersNumber4 = formParseResults.fields.number4;
            tblRegistersNumber5 = formParseResults.fields.number5;
            
            tblRegistersNumberSmall1 = formParseResults.fields.number_small1;
            tblRegistersNumberSmall2 = formParseResults.fields.number_small2;
            tblRegistersNumberSmall3 = formParseResults.fields.number_small3;
            tblRegistersNumberSmall4 = formParseResults.fields.number_small4;
            tblRegistersNumberSmall5 = formParseResults.fields.number_small5;

            tblRegistersURL1 = formParseResults.fields.url1;
            tblRegistersURL2 = formParseResults.fields.url2;
            tblRegistersURL3 = formParseResults.fields.url3;
            tblRegistersURL4 = formParseResults.fields.url4;
            tblRegistersURL5 = formParseResults.fields.url5;
        
            tblRegistersDate1 = formParseResults.fields.date1;
            tblRegistersDate1Hour = formParseResults.fields.date1_hour;
            tblRegistersDate1Minute = formParseResults.fields.date1_minute;
            tblRegistersDate1Seconds = formParseResults.fields.date1_seconds;
            tblRegistersDate1Day = formParseResults.fields.date1_day;
            tblRegistersDate1Month = formParseResults.fields.date1_month;
            tblRegistersDate1Year = formParseResults.fields.date1_year;
            //Mount.
            tblRegistersDate1 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate1,
                                                                            dateFieldDay: tblRegistersDate1Day,
                                                                            dateFieldMonth: tblRegistersDate1Month,
                                                                            dateFieldYear: tblRegistersDate1Year,
                                                                            dateFieldHour: tblRegistersDate1Hour,
                                                                            dateFieldMinute: tblRegistersDate1Minute,
                                                                            dateFieldSeconds: tblRegistersDate1Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");/**/
            
            tblRegistersDate2 = formParseResults.fields.date2;
            tblRegistersDate2Hour = formParseResults.fields.date2_hour;
            tblRegistersDate2Minute = formParseResults.fields.date2_minute;
            tblRegistersDate2Seconds = formParseResults.fields.date2_seconds;
            tblRegistersDate2Day = formParseResults.fields.date2_day;
            tblRegistersDate2Month = formParseResults.fields.date2_month;
            tblRegistersDate2Year = formParseResults.fields.date2_year;
            //Mount.
            tblRegistersDate2 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate2,
                                                                            dateFieldDay: tblRegistersDate2Day,
                                                                            dateFieldMonth: tblRegistersDate2Month,
                                                                            dateFieldYear: tblRegistersDate2Year,
                                                                            dateFieldHour: tblRegistersDate2Hour,
                                                                            dateFieldMinute: tblRegistersDate2Minute,
                                                                            dateFieldSeconds: tblRegistersDate2Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate3 = formParseResults.fields.date3;
            tblRegistersDate3Hour = formParseResults.fields.date3_hour;
            tblRegistersDate3Minute = formParseResults.fields.date3_minute;
            tblRegistersDate3Seconds = formParseResults.fields.date3_seconds;
            tblRegistersDate3Day = formParseResults.fields.date3_day;
            tblRegistersDate3Month = formParseResults.fields.date3_month;
            tblRegistersDate3Year = formParseResults.fields.date3_year;
            //Mount.
            tblRegistersDate3 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate3,
                                                                            dateFieldDay: tblRegistersDate3Day,
                                                                            dateFieldMonth: tblRegistersDate3Month,
                                                                            dateFieldYear: tblRegistersDate3Year,
                                                                            dateFieldHour: tblRegistersDate3Hour,
                                                                            dateFieldMinute: tblRegistersDate3Minute,
                                                                            dateFieldSeconds: tblRegistersDate3Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate4 = formParseResults.fields.date4;
            tblRegistersDate4Hour = formParseResults.fields.date4_hour;
            tblRegistersDate4Minute = formParseResults.fields.date4_minute;
            tblRegistersDate4Seconds = formParseResults.fields.date4_seconds;
            tblRegistersDate4Day = formParseResults.fields.date4_day;
            tblRegistersDate4Month = formParseResults.fields.date4_month;
            tblRegistersDate4Year = formParseResults.fields.date4_year;
            //Mount.
            tblRegistersDate4 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate4,
                                                                            dateFieldDay: tblRegistersDate4Day,
                                                                            dateFieldMonth: tblRegistersDate4Month,
                                                                            dateFieldYear: tblRegistersDate4Year,
                                                                            dateFieldHour: tblRegistersDate4Hour,
                                                                            dateFieldMinute: tblRegistersDate4Minute,
                                                                            dateFieldSeconds: tblRegistersDate4Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate5 = formParseResults.fields.date5;
            tblRegistersDate5Hour = formParseResults.fields.date5_hour;
            tblRegistersDate5Minute = formParseResults.fields.date5_minute;
            tblRegistersDate5Seconds = formParseResults.fields.date5_seconds;
            tblRegistersDate5Day = formParseResults.fields.date5_day;
            tblRegistersDate5Month = formParseResults.fields.date5_month;
            tblRegistersDate5Year = formParseResults.fields.date5_year;
            //Mount.
            tblRegistersDate5 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate5,
                                                                            dateFieldDay: tblRegistersDate5Day,
                                                                            dateFieldMonth: tblRegistersDate5Month,
                                                                            dateFieldYear: tblRegistersDate5Year,
                                                                            dateFieldHour: tblRegistersDate5Hour,
                                                                            dateFieldMinute: tblRegistersDate5Minute,
                                                                            dateFieldSeconds: tblRegistersDate5Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate6 = formParseResults.fields.date6;
            tblRegistersDate6Hour = formParseResults.fields.date6_hour;
            tblRegistersDate6Minute = formParseResults.fields.date6_minute;
            tblRegistersDate6Seconds = formParseResults.fields.date6_seconds;
            tblRegistersDate6Day = formParseResults.fields.date6_day;
            tblRegistersDate6Month = formParseResults.fields.date6_month;
            tblRegistersDate6Year = formParseResults.fields.date6_year;
            //Mount.
            tblRegistersDate6 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate6,
                                                                            dateFieldDay: tblRegistersDate6Day,
                                                                            dateFieldMonth: tblRegistersDate6Month,
                                                                            dateFieldYear: tblRegistersDate6Year,
                                                                            dateFieldHour: tblRegistersDate6Hour,
                                                                            dateFieldMinute: tblRegistersDate6Minute,
                                                                            dateFieldSeconds: tblRegistersDate6Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate7 = formParseResults.fields.date7;
            tblRegistersDate7Hour = formParseResults.fields.date7_hour;
            tblRegistersDate7Minute = formParseResults.fields.date7_minute;
            tblRegistersDate7Seconds = formParseResults.fields.date7_seconds;
            tblRegistersDate7Day = formParseResults.fields.date7_day;
            tblRegistersDate7Month = formParseResults.fields.date7_month;
            tblRegistersDate7Year = formParseResults.fields.date7_year;
            //Mount.
            tblRegistersDate7 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate7,
                                                                            dateFieldDay: tblRegistersDate7Day,
                                                                            dateFieldMonth: tblRegistersDate7Month,
                                                                            dateFieldYear: tblRegistersDate7Year,
                                                                            dateFieldHour: tblRegistersDate7Hour,
                                                                            dateFieldMinute: tblRegistersDate7Minute,
                                                                            dateFieldSeconds: tblRegistersDate7Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate8 = formParseResults.fields.date8;
            tblRegistersDate8Hour = formParseResults.fields.date8_hour;
            tblRegistersDate8Minute = formParseResults.fields.date8_minute;
            tblRegistersDate8Seconds = formParseResults.fields.date8_seconds;
            tblRegistersDate8Day = formParseResults.fields.date8_day;
            tblRegistersDate8Month = formParseResults.fields.date8_month;
            tblRegistersDate8Year = formParseResults.fields.date8_year;
            //Mount.
            tblRegistersDate8 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate8,
                                                                            dateFieldDay: tblRegistersDate8Day,
                                                                            dateFieldMonth: tblRegistersDate8Month,
                                                                            dateFieldYear: tblRegistersDate8Year,
                                                                            dateFieldHour: tblRegistersDate8Hour,
                                                                            dateFieldMinute: tblRegistersDate8Minute,
                                                                            dateFieldSeconds: tblRegistersDate8Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate9 = formParseResults.fields.date9;
            tblRegistersDate9Hour = formParseResults.fields.date9_hour;
            tblRegistersDate9Minute = formParseResults.fields.date9_minute;
            tblRegistersDate9Seconds = formParseResults.fields.date9_seconds;
            tblRegistersDate9Day = formParseResults.fields.date9_day;
            tblRegistersDate9Month = formParseResults.fields.date9_month;
            tblRegistersDate9Year = formParseResults.fields.date9_year;
            //Mount.
            tblRegistersDate9 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate9,
                                                                            dateFieldDay: tblRegistersDate9Day,
                                                                            dateFieldMonth: tblRegistersDate9Month,
                                                                            dateFieldYear: tblRegistersDate9Year,
                                                                            dateFieldHour: tblRegistersDate9Hour,
                                                                            dateFieldMinute: tblRegistersDate9Minute,
                                                                            dateFieldSeconds: tblRegistersDate9Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");

            tblRegistersDate10 = formParseResults.fields.date10;
            tblRegistersDate10Hour = formParseResults.fields.date10_hour;
            tblRegistersDate10Minute = formParseResults.fields.date10_minute;
            tblRegistersDate10Seconds = formParseResults.fields.date10_seconds;
            tblRegistersDate10Day = formParseResults.fields.date10_day;
            tblRegistersDate10Month = formParseResults.fields.date10_month;
            tblRegistersDate10Year = formParseResults.fields.date10_year;
            //Mount.
            tblRegistersDate10 = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                            dateField: tblRegistersDate10,
                                                                            dateFieldDay: tblRegistersDate10Day,
                                                                            dateFieldMonth: tblRegistersDate10Month,
                                                                            dateFieldYear: tblRegistersDate10Year,
                                                                            dateFieldHour: tblRegistersDate10Hour,
                                                                            dateFieldMinute: tblRegistersDate10Minute,
                                                                            dateFieldSeconds: tblRegistersDate10Seconds
                                                                        },  
                                                                        gSystemConfig.configBackendDateFormat, 
                                                                        "");


            tblRegistersImageMainCaption = formParseResults.fields.image_main_caption;
            tblRegistersActivation = formParseResults.fields.activation;
            tblRegistersActivation1 = formParseResults.fields.activation1;
            tblRegistersActivation2 = formParseResults.fields.activation2;
            tblRegistersActivation3 = formParseResults.fields.activation3;
            tblRegistersActivation4 = formParseResults.fields.activation4;
            tblRegistersActivation5 = formParseResults.fields.activation5;

            tblRegistersIdStatus = formParseResults.fields.id_status;
            tblRegistersRestrictedAccess = formParseResults.fields.restricted_access
            tblRegistersNotes = formParseResults.fields.notes

            idParent = formParseResults.fields.idParent;
            pageNumber = formParseResults.fields.pageNumber;
            masterPageSelect = formParseResults.fields.masterPageSelect;
            //----------------------


            //Return URL build.
            //----------------------
            returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendRegisters + "/" + idParent;
            returnURL += "?masterPageSelect=" + masterPageSelect;
            if(pageNumber)
            {
                returnURL += "&pageNumber=" + pageNumber;
            }
            //----------------------


            //Edit record.  
            //----------------------
            let registersUpdateResult = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDBUpdate.registersUpdate_async({
                    _tblRegistersID: tblRegistersID,
                    _tblRegistersIdParent: tblRegistersIdParent,
                    _tblRegistersSortOrder: tblRegistersSortOrder,
                    _tblRegistersIdType: tblRegistersIdType,
                    _tblRegistersIdActivity: tblRegistersIdActivity,
                    _tblRegistersDateCreation: "",
                    _tblRegistersDateTimezone: "",
                    _tblRegistersDateEdit: "",
                    _tblRegistersIdRegisterUser: tblRegistersIdRegisterUser,
                    _tblRegistersIdRegister1: tblRegistersIdRegister1,
                    _tblRegistersIdRegister2: tblRegistersIdRegister2,
                    _tblRegistersIdRegister3: tblRegistersIdRegister3,
                    _tblRegistersIdRegister4: tblRegistersIdRegister4,
                    _tblRegistersIdRegister5: tblRegistersIdRegister5,
                    _tblRegistersType: tblRegistersType,
                    _tblRegistersNameTitle: tblRegistersNameTitle,
                    _tblRegistersNameFull: tblRegistersNameFull,
                    _tblRegistersNameFirst: tblRegistersNameFirst,
                    _tblRegistersNameLast: tblRegistersNameLast,
                    _tblRegistersCompanyNameLegal: tblRegistersCompanyNameLegal,
                    _tblRegistersCompanyNameAlias: tblRegistersCompanyNameAlias,
                    _tblRegistersDescription: tblRegistersDescription,
                    _tblRegistersURLAlias: tblRegistersURLAlias,
                    _tblRegistersKeywordsTags: tblRegistersKeywordsTags,
                    _tblRegistersMetaDescription: tblRegistersMetaDescription,
                    _tblRegistersMetaTitle: tblRegistersMetaTitle,
                    _tblRegistersMetaInfo: tblRegistersMetaInfo,
                    _tblRegistersDateBirth: tblRegistersDateBirth,
                    _tblRegistersGender: tblRegistersGender,
                    _tblRegistersHeight: tblRegistersHeight,
                    _tblRegistersWeight: tblRegistersWeight,
                    _tblRegistersDocumentType: tblRegistersDocumentType,
                    _tblRegistersDocument: tblRegistersDocument,
                    _tblRegistersDocument1Type: tblRegistersDocument1Type,
                    _tblRegistersDocument1: tblRegistersDocument1,
                    _tblRegistersDocument2Type: tblRegistersDocument2Type,
                    _tblRegistersDocument2: tblRegistersDocument2,
                    _tblRegistersDocumentCompanyType: tblRegistersDocumentCompanyType,
                    _tblRegistersDocumentCompany: tblRegistersDocumentCompany,
                    _tblRegistersDocumentCompany1Type: tblRegistersDocumentCompany1Type,
                    _tblRegistersDocumentCompany1: tblRegistersDocumentCompany1,
                    _tblRegistersDocumentCompany2Type: tblRegistersDocumentCompany2Type,
                    _tblRegistersDocumentCompany2: tblRegistersDocumentCompany2,
                    _tblRegistersZipCode: tblRegistersZipCode,
                    _tblRegistersAddressStreet: tblRegistersAddressStreet,
                    _tblRegistersAddressNumber: tblRegistersAddressNumber,
                    _tblRegistersAddressComplement: tblRegistersAddressComplement,
                    _tblRegistersNeighborhood: tblRegistersNeighborhood,
                    _tblRegistersDistrict: tblRegistersDistrict,
                    _tblRegistersCounty: tblRegistersCounty,
                    _tblRegistersCity: tblRegistersCity,
                    _tblRegistersState: tblRegistersState,
                    _tblRegistersCountry: tblRegistersCountry,
                    _tblRegistersIdStreet: tblRegistersIdStreet,
                    _tblRegistersIdNeighborhood: tblRegistersIdNeighborhood,
                    _tblRegistersIdDistrict: tblRegistersIdDistrict,
                    _tblRegistersIdCounty: tblRegistersIdCounty,
                    _tblRegistersIdCity: tblRegistersIdCity,
                    _tblRegistersIdState: tblRegistersIdState,
                    _tblRegistersIdCountry: tblRegistersIdCountry,
                    _tblRegistersLocationReference: tblRegistersLocationReference,
                    _tblRegistersLocationMap: tblRegistersLocationMap,
                    _tblRegistersPhone1InternationalCode: tblRegistersPhone1InternationalCode,
                    _tblRegistersPhone1AreaCode: tblRegistersPhone1AreaCode,
                    _tblRegistersPhone1: tblRegistersPhone1,
                    _tblRegistersPhone2InternationalCode: tblRegistersPhone2InternationalCode,
                    _tblRegistersPhone2AreaCode: tblRegistersPhone2AreaCode,
                    _tblRegistersPhone2: tblRegistersPhone2,
                    _tblRegistersPhone3InternationalCode: tblRegistersPhone3InternationalCode,
                    _tblRegistersPhone3AreaCode: tblRegistersPhone3AreaCode,
                    _tblRegistersPhone3: tblRegistersPhone3,
                    _tblRegistersWebsite: tblRegistersWebsite,
                    _tblRegistersUsername: tblRegistersUsername,
                    _tblRegistersEmail: tblRegistersEmail,
                    _tblRegistersPassword: tblRegistersPassword,
                    _tblRegistersPasswordHint: tblRegistersPasswordHint,
                    _tblRegistersPasswordLength: tblRegistersPasswordLength,
                    _tblRegistersInfo1: tblRegistersInfo1,
                    _tblRegistersInfo2: tblRegistersInfo2,
                    _tblRegistersInfo3: tblRegistersInfo3,
                    _tblRegistersInfo4: tblRegistersInfo4,
                    _tblRegistersInfo5: tblRegistersInfo5,
                    _tblRegistersInfo6: tblRegistersInfo6,
                    _tblRegistersInfo7: tblRegistersInfo7,
                    _tblRegistersInfo8: tblRegistersInfo8,
                    _tblRegistersInfo9: tblRegistersInfo9,
                    _tblRegistersInfo10: tblRegistersInfo10,
                    _tblRegistersInfo11: tblRegistersInfo11,
                    _tblRegistersInfo12: tblRegistersInfo12,
                    _tblRegistersInfo13: tblRegistersInfo13,
                    _tblRegistersInfo14: tblRegistersInfo14,
                    _tblRegistersInfo15: tblRegistersInfo15,
                    _tblRegistersInfo16: tblRegistersInfo16,
                    _tblRegistersInfo17: tblRegistersInfo17,
                    _tblRegistersInfo18: tblRegistersInfo18,
                    _tblRegistersInfo19: tblRegistersInfo19,
                    _tblRegistersInfo20: tblRegistersInfo20,
                    _tblRegistersInfoSmall1: tblRegistersInfoSmall1,
                    _tblRegistersInfoSmall2: tblRegistersInfoSmall2,
                    _tblRegistersInfoSmall3: tblRegistersInfoSmall3,
                    _tblRegistersInfoSmall4: tblRegistersInfoSmall4,
                    _tblRegistersInfoSmall5: tblRegistersInfoSmall5,
                    _tblRegistersInfoSmall6: tblRegistersInfoSmall6,
                    _tblRegistersInfoSmall7: tblRegistersInfoSmall7,
                    _tblRegistersInfoSmall8: tblRegistersInfoSmall8,
                    _tblRegistersInfoSmall9: tblRegistersInfoSmall9,
                    _tblRegistersInfoSmall10: tblRegistersInfoSmall10,
                    _tblRegistersInfoSmall11: tblRegistersInfoSmall11,
                    _tblRegistersInfoSmall12: tblRegistersInfoSmall12,
                    _tblRegistersInfoSmall13: tblRegistersInfoSmall13,
                    _tblRegistersInfoSmall14: tblRegistersInfoSmall14,
                    _tblRegistersInfoSmall15: tblRegistersInfoSmall15,
                    _tblRegistersInfoSmall16: tblRegistersInfoSmall16,
                    _tblRegistersInfoSmall17: tblRegistersInfoSmall17,
                    _tblRegistersInfoSmall18: tblRegistersInfoSmall18,
                    _tblRegistersInfoSmall19: tblRegistersInfoSmall19,
                    _tblRegistersInfoSmall20: tblRegistersInfoSmall20,
                    _tblRegistersInfoSmall21: tblRegistersInfoSmall21,
                    _tblRegistersInfoSmall22: tblRegistersInfoSmall22,
                    _tblRegistersInfoSmall23: tblRegistersInfoSmall23,
                    _tblRegistersInfoSmall24: tblRegistersInfoSmall24,
                    _tblRegistersInfoSmall25: tblRegistersInfoSmall25,
                    _tblRegistersInfoSmall26: tblRegistersInfoSmall26,
                    _tblRegistersInfoSmall27: tblRegistersInfoSmall27,
                    _tblRegistersInfoSmall28: tblRegistersInfoSmall28,
                    _tblRegistersInfoSmall29: tblRegistersInfoSmall29,
                    _tblRegistersInfoSmall30: tblRegistersInfoSmall30,
                    _tblRegistersNumber1: tblRegistersNumber1,
                    _tblRegistersNumber2: tblRegistersNumber2,
                    _tblRegistersNumber3: tblRegistersNumber3,
                    _tblRegistersNumber4: tblRegistersNumber4,
                    _tblRegistersNumber5: tblRegistersNumber5,
                    _tblRegistersNumberSmall1: tblRegistersNumberSmall1,
                    _tblRegistersNumberSmall2: tblRegistersNumberSmall2,
                    _tblRegistersNumberSmall3: tblRegistersNumberSmall3,
                    _tblRegistersNumberSmall4: tblRegistersNumberSmall4,
                    _tblRegistersNumberSmall5: tblRegistersNumberSmall5,
                    _tblRegistersURL1: tblRegistersURL1,
                    _tblRegistersURL2: tblRegistersURL2,
                    _tblRegistersURL3: tblRegistersURL3,
                    _tblRegistersURL4: tblRegistersURL4,
                    _tblRegistersURL5: tblRegistersURL5,
                    _tblRegistersDate1: tblRegistersDate1,
                    _tblRegistersDate2: tblRegistersDate2,
                    _tblRegistersDate3: tblRegistersDate3,
                    _tblRegistersDate4: tblRegistersDate4,
                    _tblRegistersDate5: tblRegistersDate5,
                    _tblRegistersDate6: tblRegistersDate6,
                    _tblRegistersDate7: tblRegistersDate7,
                    _tblRegistersDate8: tblRegistersDate8,
                    _tblRegistersDate9: tblRegistersDate9,
                    _tblRegistersDate10: tblRegistersDate10,
                    _tblRegistersImageMain: tblRegistersImageMain,
                    _tblRegistersImageMainCaption: tblRegistersImageMainCaption,
                    _tblRegistersImageLogo: tblRegistersImageLogo,
                    _tblRegistersImageBanner: tblRegistersImageBanner,
                    _tblRegistersFile1: tblRegistersImageFile1,
                    _tblRegistersFile2: tblRegistersImageFile2,
                    _tblRegistersFile3: tblRegistersImageFile3,
                    _tblRegistersFile4: tblRegistersImageFile4,
                    _tblRegistersFile5: tblRegistersImageFile5,
                    _tblRegistersActivation: tblRegistersActivation,
                    _tblRegistersActivation1: tblRegistersActivation1,
                    _tblRegistersActivation2: tblRegistersActivation2,
                    _tblRegistersActivation3: tblRegistersActivation3,
                    _tblRegistersActivation4: tblRegistersActivation4,
                    _tblRegistersActivation5: tblRegistersActivation5,
                    _tblRegistersIdStatus: tblRegistersIdStatus,
                    _tblRegistersRestrictedAccess: tblRegistersRestrictedAccess,
                    _tblRegistersNotes: tblRegistersNotes,
                    _arrIdsRegistersFiltersGeneric1: arrIdsRegistersFiltersGeneric1,
                    _arrIdsRegistersFiltersGeneric2: arrIdsRegistersFiltersGeneric2,
                    _arrIdsRegistersFiltersGeneric3: arrIdsRegistersFiltersGeneric3,
                    _arrIdsRegistersFiltersGeneric4: arrIdsRegistersFiltersGeneric4,
                    _arrIdsRegistersFiltersGeneric5: arrIdsRegistersFiltersGeneric5,
                    _arrIdsRegistersFiltersGeneric6: arrIdsRegistersFiltersGeneric6,
                    _arrIdsRegistersFiltersGeneric7: arrIdsRegistersFiltersGeneric7,
                    _arrIdsRegistersFiltersGeneric8: arrIdsRegistersFiltersGeneric8,
                    _arrIdsRegistersFiltersGeneric9: arrIdsRegistersFiltersGeneric9,
                    _arrIdsRegistersFiltersGeneric10: arrIdsRegistersFiltersGeneric10,
                    _arrIdsRegistersFiltersGeneric11: arrIdsRegistersFiltersGeneric11,
                    _arrIdsRegistersFiltersGeneric12: arrIdsRegistersFiltersGeneric12,
                    _arrIdsRegistersFiltersGeneric13: arrIdsRegistersFiltersGeneric13,
                    _arrIdsRegistersFiltersGeneric14: arrIdsRegistersFiltersGeneric14,
                    _arrIdsRegistersFiltersGeneric15: arrIdsRegistersFiltersGeneric15,
                    _arrIdsRegistersFiltersGeneric16: arrIdsRegistersFiltersGeneric16,
                    _arrIdsRegistersFiltersGeneric17: arrIdsRegistersFiltersGeneric17,
                    _arrIdsRegistersFiltersGeneric18: arrIdsRegistersFiltersGeneric18,
                    _arrIdsRegistersFiltersGeneric19: arrIdsRegistersFiltersGeneric19,
                    _arrIdsRegistersFiltersGeneric20: arrIdsRegistersFiltersGeneric20,
                    _arrIdsRegistersFiltersGeneric21: arrIdsRegistersFiltersGeneric21,
                    _arrIdsRegistersFiltersGeneric22: arrIdsRegistersFiltersGeneric22,
                    _arrIdsRegistersFiltersGeneric23: arrIdsRegistersFiltersGeneric23,
                    _arrIdsRegistersFiltersGeneric24: arrIdsRegistersFiltersGeneric24,
                    _arrIdsRegistersFiltersGeneric25: arrIdsRegistersFiltersGeneric25,
                    _arrIdsRegistersFiltersGeneric26: arrIdsRegistersFiltersGeneric26,
                    _arrIdsRegistersFiltersGeneric27: arrIdsRegistersFiltersGeneric27,
                    _arrIdsRegistersFiltersGeneric28: arrIdsRegistersFiltersGeneric28,
                    _arrIdsRegistersFiltersGeneric29: arrIdsRegistersFiltersGeneric29,
                    _arrIdsRegistersFiltersGeneric30: arrIdsRegistersFiltersGeneric30,
                    _arrIdsRegistersFiltersGeneric31: arrIdsRegistersFiltersGeneric31,
                    _arrIdsRegistersFiltersGeneric32: arrIdsRegistersFiltersGeneric32,
                    _arrIdsRegistersFiltersGeneric33: arrIdsRegistersFiltersGeneric33,
                    _arrIdsRegistersFiltersGeneric34: arrIdsRegistersFiltersGeneric34,
                    _arrIdsRegistersFiltersGeneric35: arrIdsRegistersFiltersGeneric35,
                    _arrIdsRegistersFiltersGeneric36: arrIdsRegistersFiltersGeneric36,
                    _arrIdsRegistersFiltersGeneric37: arrIdsRegistersFiltersGeneric37,
                    _arrIdsRegistersFiltersGeneric38: arrIdsRegistersFiltersGeneric38,
                    _arrIdsRegistersFiltersGeneric39: arrIdsRegistersFiltersGeneric39,
                    _arrIdsRegistersFiltersGeneric40: arrIdsRegistersFiltersGeneric40
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
            if(registersUpdateResult == true)
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