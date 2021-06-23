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


//Backend - Quizzes - listing - GET.
//**************************************************************************************
router.get("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendQuizzes + "/:idParent?", [SyncSystemNS.FunctionsAuthentication.authenticationVerification_middleware("user_backend")], (req, res, next)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const QuizzesListing = require("../" + gSystemConfig.configDirectorySystem + "/quizzes-listing.js");
    //----------------------


    //Variables.
    //----------------------
    let qlBackend;
    let idParent = "";
    //let idType = "";

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

    //if(req.query.idParent)
    //{
        //idParent = req.query.idParent;
    //}
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
            qlBackend = new QuizzesListing({
                idParent: idParent,
                //idType: idType,
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
            //await qlBackend.cphBodyBuild(); //working
            await qlBackend.build();
            
            //Render data with template.
            //gSystemConfig: gSystemConfig, //moved to locals
            //res.render("layout-backend-main", {
            res.render(masterPageSelect, {
                templateData: qlBackend,
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


//Export.
module.exports = router;