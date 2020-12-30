"use strict";

//Import Node Modules.
//----------------------
const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

const formidable = require("formidable"); //Form file upload.
const util = require("util");
const path = require("path"); //Necessary to serve static files.
//----------------------


//Backend - Home - Login.
//**************************************************************************************
router.get("/" + gSystemConfig.configRouteBackend, (req, res)=>{ //working, with the async block
    //Import objects.
    //----------------------
    const Login = require("../" + gSystemConfig.configDirectorySystem + "/login.js");
    //----------------------

    //Variables.
    //----------------------
    //let clBackend = new CategoriesListing();
    let loginBackend;
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
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            //clBackend = await new CategoriesListing();
            //clBackend = new CategoriesListing(); //working
            loginBackend = new Login({
                masterPageSelect: masterPageSelect,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert
            });
            //clBackend._idParent = idParent


            /**/
            //Build object data.
            await loginBackend.build();
            
            //Render data with template.
            res.render(masterPageSelect, {
                templateData: loginBackend,
                additianalData: {}
            });
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{

        }
    })();
    //----------------------


    //res.sendFile(path.join(__dirname, gSystemConfig.configDirectorySystem, "categories-listing.html"));//serve static file //didn´t work inside routes file - path error
});
//**************************************************************************************


//Export.
module.exports = router;