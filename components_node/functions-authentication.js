"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
//const mysql = require("mysql");//MySQL package.

const gSystemConfig = require("../config-application.js"); //System configuration.

const FunctionsGeneric = require("./functions-generic.js");
const FunctionsDB = require("./functions-db.js");
const FunctionsCrypto = require("./functions-crypto.js");

const ObjectUsersDetails = require("./object-users-details.js");
//----------------------

module.exports = class FunctionsAuthentication
{

    //Function to verify authentication.
    //**************************************************************************************
    /**
     * Function to verify authentication.
     * @static
     * @param {string} strData 
     * @param {string} verificationType 
     * @param {string} returnURL 
     * @param {object} specialParameters 
     * @returns {object}
     * @example
     * SyncSystemNS.FunctionsAuthentication.authenticationVerification()
     */
    static async authenticationVerification(strData, verificationType, _returnURL = "", specialParameters = {})
    {
        //verificationType: user_root | user_backend | user_frontend


        //Variables.
        //----------------------
        var objReturn = {statusReturn: false};
        var strDataDecrypt;
        var returnURL;

        var arrSearchParametersUsersDetailsAuthentication = [];
        var objUsersDetailsAuthentication;
        var objUsersDetailsAuthenticationParameters;

        var resultUsersDetailsAuthentication;
        //----------------------



        if(strData)
        {
            //user_root.
            //----------------------
            if(verificationType == "user_root")
            {
                //Define values.
                if(_returnURL)
                {
                    returnURL = _returnURL;
                }else{
                    //Default return URL.
                    returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/";
                }
                
                strDataDecrypt = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(strData, "db"), 2);
                //strDataDecrypt = "12"; //debug

                //Logic.
                //TODO: Make this part optional by configuration (real time check).

                //Parameters build.
                arrSearchParametersUsersDetailsAuthentication.push("id;" + strDataDecrypt + ";i"); 
                arrSearchParametersUsersDetailsAuthentication.push("activation;1;i"); 

                /*objUsersDetailsAuthenticationParameters = {
                    _arrSearchParameters: arrSearchParametersUsersDetailsAuthentication,
                    _idTbUsers: strDataDecrypt,
                    _terminal: 0,
                    _objSpecialParameters: {returnType: 3}
                };*/
    

                //Object build.
                //objUsersDetailsAuthentication = new ObjectUsersDetails(objUsersDetailsAuthenticationParameters);
                //await objUsersDetailsAuthentication.recordDetailsGet(0, 3);


                resultUsersDetailsAuthentication = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableUsers, 
                                                                                    arrSearchParametersUsersDetailsAuthentication, 
                                                                                    "", 
                                                                                    "", 
                                                                                    "id, username, password, activation", 
                                                                                    1);

                if(resultUsersDetailsAuthentication.length > 0)
                {
                    //Root user found.
                    objReturn.statusReturn = true;

                }else{
                    //Not found / not activated.

                    //Redirect.
                    redirect(returnURL);
                    
                }



                //Debug.
                objReturn.debug = strData;
                console.log("strDataDecrypt=", strDataDecrypt);
                //console.log("objUsersDetailsAuthentication=", objUsersDetailsAuthentication);
                console.log("resultUsersDetailsAuthentication=", resultUsersDetailsAuthentication);
                console.log("resultUsersDetailsAuthentication.length=", resultUsersDetailsAuthentication.length);
                //console.log("globalCookies (inside function)=", globalCookies);
            }
            //----------------------
        }



        return objReturn;
    }
    //**************************************************************************************



    //Function to verify authentication.
    //ref: https://youtu.be/zPYmM9K8-g8
    //**************************************************************************************
    /**
     * Function to verify authentication.
     * @static
     * @param {string} strData 
     * @param {string} verificationType 
     * @param {string} returnURL 
     * @param {object} specialParameters 
     * @returns {object}
     * @example
     * SyncSystemNS.FunctionsAuthentication.authenticationVerificationMiddleware()
     */
    //static async authenticationVerification_middleware(req, res, next)
    //static async authenticationVerification_middleware(verificationType, _returnURL = "", specialParameters = {})
    static authenticationVerification_middleware(verificationType, _returnURL = "", specialParameters = {})
    {
        //verificationType: user_root | user_backend | user_frontend | user_root_or_user_backend

        //return function(req, res, next)
        //function(req, res, next)
        //return await function(req, res, next).then((res) => {
        //return await new Promise() async function(req, res, next).then(async (res) => {
        //return async function(req, res, next).then(async (res) => {
        return async (req, res, next) => {
            //{


            //Variables.
            //----------------------
            var objReturn = {statusReturn: false};
            var loginVerification = false;

            var cookieName;

            var strData;
            var strDataDecrypt;
            var returnURL;

            var arrSearchParametersUsersDetailsAuthentication = [];
            var resultUsersDetailsAuthentication;
            //----------------------


            //user_root.
            //----------------------
            if(verificationType == "user_root")
            {
                //Define values.
                cookieName = gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUserRoot;

                strData = req.cookies[cookieName]; //read cookie
                //strData = req.cookies[gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUserRoot]; //read cookie

                strDataDecrypt = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(strData, "db"), 2); //decrypt data
                //strDataDecrypt = "12"; //debug

                if(_returnURL)
                {
                    returnURL = _returnURL;
                }else{
                    //Default return URL.
                    returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/";
                }


                //Logic.
                try
                { 
                    //Only checks if the cookie / session is empty or not (faster).
                    if(gSystemConfig.configUsersRootAuthenticationCheck == 0)
                    {
                        //if(strData != "")
                        //if(strData !== "")
                        if(strData)
                        {
                            //Root user found.
                            objReturn.statusReturn = true;
                            loginVerification = true;
                        }

                    }


                    //Reads the database and checks if the user exists and is active (safer, but slower).
                    if(gSystemConfig.configUsersRootAuthenticationCheck == 1)
                    {
                        //Parameters build.
                        arrSearchParametersUsersDetailsAuthentication.push("id;" + strDataDecrypt + ";i"); 
                        arrSearchParametersUsersDetailsAuthentication.push("activation;1;i"); 


                        //Object build.
                        //objUsersDetailsAuthentication = new ObjectUsersDetails(objUsersDetailsAuthenticationParameters);
                        //await objUsersDetailsAuthentication.recordDetailsGet(0, 3);


                        resultUsersDetailsAuthentication = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableUsers, 
                                                                                            arrSearchParametersUsersDetailsAuthentication, 
                                                                                            "", 
                                                                                            "", 
                                                                                            "id, username, password, activation", 
                                                                                            1);

                        if(resultUsersDetailsAuthentication.length > 0)
                        {
                            //Root user found.
                            objReturn.statusReturn = true;
                            loginVerification = true;
                        }
                    }
                }catch(authenticationVerificationError){
                    if(gSystemConfig.configDebug === true)
                    {
                        console.error("authenticationVerificationError=", authenticationVerificationError);
                    }
                }finally{
                    if(loginVerification === true)
                    {
                        next();
                    }else{
                        //Not found / not activated.
                        returnURL += "?messageError=statusMessageLogin2e";

                        //Redirect.
                        res.redirect(returnURL);
                    }
                }
            }
            //----------------------



            //user_backend.
            //----------------------
            if(verificationType == "user_backend")
            {
                //Define values.
                cookieName = gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUser;
                strData = req.cookies[cookieName]; //read cookie
                strDataDecrypt = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(strData, "db"), 2); //decrypt data

                if(_returnURL)
                {
                    returnURL = _returnURL;
                }else{
                    //Default return URL.
                    returnURL = "/" + gSystemConfig.configRouteBackend + "/";
                }


                //Logic.
                try
                { 
                    //Only checks if the cookie / session is empty or not (faster).
                    if(gSystemConfig.configUsersAuthenticationCheck == 0)
                    {
                        //if(strData != "")
                        //if(strData !== "")
                        if(strData)
                        {
                            //Root user found.
                            objReturn.statusReturn = true;
                            loginVerification = true;
                        }

                    }


                    //Reads the database and checks if the user exists and is active (safer, but slower).
                    if(gSystemConfig.configUsersAuthenticationCheck == 1)
                    {
                        //Parameters build.
                        arrSearchParametersUsersDetailsAuthentication.push("id;" + strDataDecrypt + ";i"); 
                        arrSearchParametersUsersDetailsAuthentication.push("activation;1;i"); 


                        resultUsersDetailsAuthentication = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableUsers, 
                                                                                            arrSearchParametersUsersDetailsAuthentication, 
                                                                                            "", 
                                                                                            "", 
                                                                                            "id, username, password, activation", 
                                                                                            1);

                        if(resultUsersDetailsAuthentication.length > 0)
                        {
                            //Root user found.
                            objReturn.statusReturn = true;
                            loginVerification = true;
                        }
                    }
                }catch(authenticationVerificationError){
                    if(gSystemConfig.configDebug === true)
                    {
                        console.error("authenticationVerificationError=", authenticationVerificationError);
                    }
                }finally{
                    if(loginVerification === true)
                    {
                        next();
                    }else{
                        //Not found / not activated.
                        returnURL += "?messageError=statusMessageLogin2e";

                        //Redirect.
                        res.redirect(returnURL);
                    }
                }

            }
            //----------------------



            //user_root or user_backend.
            //----------------------
            if(verificationType == "user_root_or_user_backend")
            {
                //Define values.
                strData = req.cookies[gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUserRoot]; //read cookie (user_root)
                if(_returnURL)
                {
                    returnURL = _returnURL;
                }else{
                    //Default return URL.
                    returnURL = "/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendUsers + "/";
                }

                if(!strData)
                {
                    strData = req.cookies[gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUser]; //read cookie (user_backend)
                    if(_returnURL)
                    {
                        returnURL = _returnURL;
                    }else{
                        //Default return URL.
                        returnURL = "/" + gSystemConfig.configRouteBackend + "/";
                    }
                }


                //Logic.
                try
                { 
                    if(strData)
                    {
                        //Root user found.
                        objReturn.statusReturn = true;
                        loginVerification = true;
                    }

                }catch(authenticationVerificationError){
                    if(gSystemConfig.configDebug === true)
                    {
                        console.error("authenticationVerificationError=", authenticationVerificationError);
                    }
                }finally{
                    if(loginVerification === true)
                    {
                        next();
                    }else{
                        //Not found / not activated.
                        returnURL += "?messageError=statusMessageLogin2e";

                        //Redirect.
                        res.redirect(returnURL);
                    }
                }

            }
            //----------------------


            //Debug.
            //console.log("req.cookies(inside authenticationVerification_middleware function)=", req.cookies);
            //console.log("verificationType=", verificationType);
            //console.log("cookieName=", cookieName);
            //console.log("strData=", strData);
            //console.log("strDataDecrypt=", strDataDecrypt);
            //console.log("objReturn=", objReturn);
            //console.log("req.cookies[](inside authenticationVerification_middleware function)=", req.cookies[gSystemConfig.configCookiePrefix + "_" + gSystemConfig.configCookiePrefixUserRoot]);


            //return objReturn;
        //}
        //});
        }

    }
    //**************************************************************************************
    
};