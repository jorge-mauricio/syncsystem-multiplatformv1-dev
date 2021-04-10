"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
//const mysql = require("mysql");//MySQL package.

const gSystemConfig = require("../config-application.js"); //System configuration.
const fetch = require("node-fetch");

const http = require('http');
const querystring = require('querystring');
//----------------------


module.exports = class FunctionsCookies
{
    //Function to create / set cookie.
    //**************************************************************************************
    /**
     * Function to create / set cookie.
     * @static
     * @param {string} cookieName 
     * @param {string} _cookieValue 
     * @param {string} _cookiePeriod 
     * @returns {boolean}
     * @example
     * SyncSystemNS.FunctionsGeneric.cookieCreate()
     */
    //static cookieCreate(cookieName, _cookieValue, _cookiePeriod = "", objRoute = null)
    static cookieCreate(cookieName, _cookieValue, _cookiePeriod = "")
    {
        //objRoute = {_req: req, _res: res}

        //Variables.
        //----------------------
        var strReturn = false;
        var cookiePeriod = ""; //(86400 = 1 dia)
        var cookieOptions = {};
        //----------------------


        //Stay conected option.
        if(_cookiePeriod == "1")
        {
            cookiePeriod = new Date(Date.now() + (86400 * 30 * 365));
        }

        if(_cookieValue)
        {
            cookieOptions = {
                //domain: '127.0.0.1:4444',
                //secure: process.env.NODE_ENV === 'production'? true: false, / Forces to use https in production.
                //expires: new Date(Date.now() + 900000),
                httpOnly: true // You can't access these tokens in the client's javascript.
            };

            //objRoute._res.cookie('cookie_test', 'testing6', cookieOptions);

            /*
            if(gSystemConfig.configCookieSetType == 1)
            {

            }else{

            }
            */

            strReturn = true;
        }


        return strReturn;
    }
    //**************************************************************************************


    //Function read cookie value.
    //**************************************************************************************
    /**
     * Function read cookie value.
     * @static
     * @async
     * @param {string} cookieName "login" - returns login cookie | "temp" - returns temporary cookie (temporary id) | "" returns all cookies
     * @returns {string | object}
     * @example
     * SyncSystemNS.FunctionsGeneric.cookieRead()
     */
    //static cookieCreate(cookieName, _cookieValue, _cookiePeriod = "", objRoute = null)
    //static cookieRead(cookieName = "")
    static async cookieRead(cookieName = "")
    {
        //cookieName: "" - returns 
        //objRoute = {_req: req, _res: res}

        //Variables.
        //----------------------
        var strReturn = "";
        var objReturn = {returnStatus: false}; //(all cookies)

        var _objBody;
        //----------------------


        if(cookieName)
        {
            //return new Promise((resolve, reject) => {

                //Build parameters.
                _objBody = {
                    actionType: "get", 
                    verificationType: "user_root"
                };


                //Native HTTP:
                /*
                var options = {
                    hostname: 'localhost',
                    port: 3000,
                    path: "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIAuthentication + "/",
                    method: 'POST',
                    timeout: 5000,
                    headers: {
                        'Content-Type': 'application/json; charset=utf-8'

                        //'Content-Type': 'text/html',
                        //'Content-Length': Buffer.byteLength("")
                    }
                };
                
                const req = http.request(options, res => {
                    let data = '';

                    res.on('data', (chunk) => {
                      data += chunk;
                    });

                    res.on('end', (d) => {
                      resolve(data)
                    });
                });

                req.on('error', (httpError) => {

                    if(gSystemConfig.configDebug == true)
                    {
                        console.log("httpError (cookieRead)=", httpError);
                    }
                    reject(httpError)
                })
              
                req.end();
                */

                
            


            /*
            //Debug.
            console.log("url=", gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIAuthentication + "/");
            
            //strReturn = await fetch(gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIAuthentication + "/", {
            strReturn = await fetch("http://localhost:3000/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIAuthentication + "/", {
                method: 'POST', // *GET, POST, PUT, DELETE, PATCH, etc.
                //mode: 'cors', // no-cors, *cors, same-origin
                //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                //credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                  //'Content-Type': 'application/json'

                  'access-control-allow-origin': '*',
                  'Content-Type': 'application/json; charset=utf-8'

                  //'Content-Type': 'application/x-www-form-urlencoded'

                  //'Accept': 'application/json',
                  //'Content-Type': 'application/json'
                },
                //redirect: 'follow', // manual, *follow, error
                //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                body: JSON.stringify({actionType: "get", verificationType: "user_root"}) // body data type must match "Content-Type" header
            }).then(res => {
                if(res.ok) //returned status code between 200 and 299
                {
                    if(gSystemConfig.configDebug == true)
                    {
                        console.log("res.ok (success)=", res.ok);
                    }
                }else{
                    if(gSystemConfig.configDebug == true)
                    {
                        console.log("res.ok (error / not success)=", res.ok);
                    }
                }
        
                return res.json();
                //return res;
            }).catch(function(error) {
                console.log(error);
            });
            */


            //Debug.
            //strReturn = "debug testing";

            //});


            /*
            strReturn = await new Promise((resolve, reject) => {
                fetch(gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIAuthentication + "/", {
                    method: 'POST', // *GET, POST, PUT, DELETE, PATCH, etc.
                    //mode: 'cors', // no-cors, *cors, same-origin
                    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    //credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                    //'Content-Type': 'application/json'

                    'access-control-allow-origin': '*',
                    'Content-Type': 'application/json; charset=utf-8'

                    //'Content-Type': 'application/x-www-form-urlencoded'

                    //'Accept': 'application/json',
                    //'Content-Type': 'application/json'
                    },
                    //redirect: 'follow', // manual, *follow, error
                    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({actionType: "get", verificationType: "user_root"}) // body data type must match "Content-Type" header
                }).then(res => {
                    if(res.ok) //returned status code between 200 and 299
                    {
                        if(gSystemConfig.configDebug == true)
                        {
                            console.log("res.ok (success)=", res.ok);
                        }
                    }else{
                        if(gSystemConfig.configDebug == true)
                        {
                            console.log("res.ok (error / not success)=", res.ok);
                        }
                    }
            
                    resolve(res.json());
                    //return res.json();
                    //return res;
                }).catch(function(catchError) {
                    if(gSystemConfig.configDebug == true)
                    {
                        console.log("catchError=", catchError);
                    }

                    reject(error);
                });

            });
            */

            /**/
            strReturn = await new Promise(async (resolve, reject) => {

                await fetch(gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIAuthentication + "/", {
                    method: 'POST', // *GET, POST, PUT, DELETE, PATCH, etc.
                    //mode: 'cors', // no-cors, *cors, same-origin
                    //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                    //credentials: 'same-origin', // include, *same-origin, omit
                    headers: {
                    //'Content-Type': 'application/json'

                    'access-control-allow-origin': '*',
                    'Content-Type': 'application/json; charset=utf-8'

                    //'Content-Type': 'application/x-www-form-urlencoded'

                    //'Accept': 'application/json',
                    //'Content-Type': 'application/json'
                    },
                    //redirect: 'follow', // manual, *follow, error
                    //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                    body: JSON.stringify({actionType: "get", verificationType: "user_root"}) // body data type must match "Content-Type" header
                }).then((res)=>{
                    resolve(res.json());
                });

                //Debug.
                //resolve("testing resolve"); //worked
            });



            const get_data = async url => {
                try {
                    const response = await fetch(gSystemConfig.configSystemURLSSL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIAuthentication + "/", {
                        method: 'POST', // *GET, POST, PUT, DELETE, PATCH, etc.
                        //mode: 'cors', // no-cors, *cors, same-origin
                        //cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                        //credentials: 'same-origin', // include, *same-origin, omit
                        headers: {
                        'Content-Type': 'application/json'
    
                        //'access-control-allow-origin': '*',
                        //'Content-Type': 'application/json; charset=utf-8'
    
                        //'Content-Type': 'application/x-www-form-urlencoded'
    
                        //'Accept': 'application/json',
                        //'Content-Type': 'application/json'
                        },
                        //redirect: 'follow', // manual, *follow, error
                        //referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
                        body: JSON.stringify({actionType: "get", verificationType: "user_root"}) // body data type must match "Content-Type" header
                    });
                    const json = await response.json();
                    console.log(json);
                } catch (error) {
                    console.log(error);
                }
            };

            getData(url);
            
        }


        return strReturn;
    }
    //**************************************************************************************



    //Function to delete cookie.
    //**************************************************************************************
    /**
     * Function to delete cookie.
     * @static
     * @param {string} cookieName "login" - returns login cookie | "temp" - returns temporary cookie (temporary id) | "" returns all cookies
     * @example
     * SyncSystemNS.FunctionsCookies.cookieDelete_middleware("")
     */
    static cookieDelete_middleware(cookieName = "")
    {
        return async (req, res, next) => {
            //Logic.
            //gSystemConfig.configCookieDefaultOptions.maxAge = 0;
            //gSystemConfig.configCookieDefaultOptions.expires = new Date();
            //cookies.set(req.cookies[cookieName], {maxAge: 0});
            //res.cookies.set(cookieName, {maxAge: 0});
            //res.cookie(cookieName, { maxAge: 0 });
            res.cookie(cookieName, gSystemConfig.configCookieDeleteDefaultOptions);
            res.clearCookie(cookieName, gSystemConfig.configCookieDeleteDefaultOptions);
            //res.setHeader('set-cookie', cookieName + '=; max-age=0');

            //Force delete.
            //res.cookie("ss_root_user", { maxAge: 0 }); //debug
            //res.clearCookie("ss_root_user"); //debug


            //Debug.
            console.log("cookieName=", cookieName);
            console.log("req.cookies(inside cookieDelete_middleware)=", req.cookies);

            
            next();
        }
    }
    //**************************************************************************************
};