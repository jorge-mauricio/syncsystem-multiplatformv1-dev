'use strict';

// Import Node Modules.
// ----------------------
// import "babel-polyfill"; // with babel, we can use the import syntax.
// require("babel-polyfill"); // with babel, we can use the import syntax.

require('dotenv').config(); // Load the dotenv dependency and call the config method on the imported object.

const gSystemConfig = require('./config-application.js'); // System configuration.
//  const dbSystemCon = require('./config-application-db.js').dbSystemCon; // DB System - simple connection.
//  const dbSystemConPool = require('./config-application-db.js').dbSystemConPool; // DB System - pool connection.
// const dbSystem = require("./config-application-db.js").mysql_pool; // DB. (ref: https:// stackoverflow.com/questions/34788750/module-export-for-mysql-connection)
// require("./config-application.js");
// const SyncSystemNS = require("./components_node/syncsystem-ns.js"); // working
const SyncSystemNS = require('./' + gSystemConfig.configDirectoryComponents + '/syncsystem-ns.js');

// const http = require("http"); // HTTP Module
const request = require('request');
// const fetch = require('node-fetch');
// const url = require('url');
// const querystring = require('querystring');
const fs = require('fs'); // File System.
const fsExtra = require('fs-extra'); // File System with extra functions.
const express = require('express'); // Express Framework.
const cookieParser = require('cookie-parser'); // Cookie parser.
const session = require('express-session');
const cors = require('cors'); // Allow api access from any location.
const favicon = require('express-favicon'); // Express Favicon.
// const favicon = require("serve-favicon"); // Serve Favicon (uninstalled).
const path = require('path'); // Necessary to serve static files.
const bodyParser = require('body-parser'); // Body parser module.
const methodOverride = require('method-override'); // Necessary for using in the hidden fields in the form to use the additinal methods.
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const formidable = require('formidable'); // Form file upload.
// const sharp = require('sharp'); // Resize image.

// const mysql = require("mysql");// MySQL package.
const _ = require('lodash'); // Loadash

// React.
// const React = require("react");
// const ReactDOM = require("react-dom");
// import React from "react";
// const ReactDOMServer = require("react-dom/server");
// import ReactDOMServer from "react-dom/server";
// const StaticRouter = require("react-router/StaticRouter");
// import { StaticRouter } from "react-router";
// const LayoutTest01 = require("./components_react/LayoutTest01.js");
// import LayoutTest01 from "./components_react/LayoutTest01";
// const AppReact = require("./components_react/app.js");
// import AppReact from "./components_react/app.js";
// import { renderToString } from "react-dom/server";
// ----------------------

// Objects instances.
// ----------------------
const app = express(); // init express
// const appBackend = express();
// ----------------------

// Configuration and setup.
// **************************************************************************************
// Static directories (public alias).
// ----------------------
// Middleware - create an alias for the static folder in order for visitors not know the name of the folder.
// app.use("/images", express.static(path.join(__dirname, "images_files")));
app.use('/' + gSystemConfig.configDirectoryStylesSD, express.static(path.join(__dirname, gSystemConfig.configDirectoryStyles))); // set static folder
app.use('/' + gSystemConfig.configDirectoryDistSD, express.static(path.join(__dirname, gSystemConfig.configDirectoryDist))); // set static folder (webpack distribution folder)
app.use('/' + gSystemConfig.configDirectoryJSSD, express.static(path.join(__dirname, gSystemConfig.configDirectoryJS))); // set static folder
app.use('/' + gSystemConfig.configDirectoryFilesSD, express.static(path.join(__dirname, gSystemConfig.configDirectoryFiles))); // set static folder
app.use('/' + gSystemConfig.configDirectoryFilesLayoutSD, express.static(path.join(__dirname, gSystemConfig.configDirectoryFilesLayout))); // set static folder
// app.use("/frontend", express.static(path.join(__dirname, gSystemConfig.configFrontendDefaultView))); // set static folder
app.use('/' + gSystemConfig.configFrontendDefaultViewSD, express.static(path.join(__dirname, gSystemConfig.configFrontendDefaultView))); // set static folder

// app.use("/", express.static(path.join(__dirname, gSystemConfig.configFrontendDefaultView))); // set static folder (test-static01.html can be accessed through: http:// localhost:3000/test-static01.html) // working
// app.use("/backend", express.static(path.join(__dirname, "backend_node")));
// app.use("/backend", express.static(path.join(__dirname, gSystemConfig.configDirectorySystem))); // set static folder
// app.use('/' + gSystemConfig.configDirectorySystemSD, express.static(path.join(__dirname, gSystemConfig.configDirectorySystem))); // set static folder // was enabled before architectural reestructure
// app.use('/' + gSystemConfig.configDirectoryAdminSD, express.static(path.join(__dirname, gSystemConfig.configDirectoryAdmin))); // set static folder

// Favicons - static
/*
app.use("/android-chrome-192x192.png", express.static(path.join(__dirname, "android-chrome-192x192.png"))); // set static folder
app.use("/android-chrome-512x512.png", express.static(path.join(__dirname, "android-chrome-512x512.png"))); // set static folder
app.use("/apple-touch-icon.png", express.static(path.join(__dirname, "apple-touch-icon.png"))); // set static folder
app.use("/favicon.ico", express.static(path.join(__dirname, "favicon.ico"))); // set static folder
app.use("/favicon-16x16.png", express.static(path.join(__dirname, "favicon-16x16.png"))); // set static folder
app.use("/favicon-32x32.png", express.static(path.join(__dirname, "favicon-32x32.png"))); // set static folder
app.use("/favicon-export.png", express.static(path.join(__dirname, "favicon-export.png"))); // set static folder
app.use("/mstile-150x150.png", express.static(path.join(__dirname, "mstile-150x150.png"))); // set static folder
app.use("/browserconfig.xml", express.static(path.join(__dirname, "browserconfig.xml"))); // set static folder
app.use("/safari-pinned-tab.svg", express.static(path.join(__dirname, "safari-pinned-tab.svg"))); // set static folder
*/

// Cookie parser.
// app.use(express.cookieParser()); // not bundled anymore with express
app.use(cookieParser()); // not bundled anymore with express

// React - static.
// app.use("/", express.static("build")); // set static folder
// app.use("/", express.static("build/public")); // client script
app.use('/', express.static(gSystemConfig.configDirectoryBuildReactSD + '/' + gSystemConfig.configDirectoryBuildReactClientSD)); // client script
// app.use("/build/public", express.static("build/public")); // client script
// ----------------------

// Favicon.
// ref:
// https:// expressjs.com/en/resources/middleware/serve-favicon.html
// https:// www.npmjs.com/package/express-favicon
// https:// stackoverflow.com/questions/15463199/how-to-set-custom-favicon-in-express
// app.use("/", express.static(path.join(__dirname, "favicon-16x16.png")));
// ----------------------
/**/
// app.use(favicon(path.join(__dirname, "public", "android-chrome-192x192.png")));
app.use(favicon(path.join(__dirname, 'android-chrome-192x192.png')));
app.use(favicon(path.join(__dirname, 'android-chrome-512x512.png')));
app.use(favicon(path.join(__dirname, 'apple-touch-icon.png')));
app.use(favicon(path.join(__dirname, 'favicon.ico')));
app.use(favicon(path.join(__dirname, 'favicon-16x16.png')));
app.use(favicon(path.join(__dirname, 'favicon-32x32.png')));
app.use(favicon(path.join(__dirname, 'favicon-export.png')));
app.use(favicon(path.join(__dirname, 'mstile-150x150.png')));

app.use(favicon(path.join(__dirname, 'browserconfig.xml')));
// app.use(favicon(path.join(__dirname, "site.webmanifest")));
app.use(favicon(path.join(__dirname, 'safari-pinned-tab.svg')));
// ----------------------

// Additional configuration / setup.
// ----------------------
app.use(cors());

app.use(express.json()); // handle raw json
// app.use(express.json({ type: 'application/*+json' })); // handle raw json
app.use(bodyParser.urlencoded({ extended: false })); // Parse URL encoded forms.

app.use(methodOverride('_method')); // Necessary for using in the hidden fields in the form to use the additinal methods.
// app.use(methodOverride('X-HTTP-Method')); // Microsoft
// app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
// app.use(methodOverride('X-Method-Override')); // IBM

// Save local variables (share comon variables in the template).
// ref: https:// stackoverflow.com/questions/12794860/how-to-use-node-modules-like-momentjs-in-ejs-views
// ----------------------
app.locals.gSystemConfig = gSystemConfig;
app.locals.SyncSystemNS = SyncSystemNS;
// app.locals._ = _;
// ----------------------

// appBackend.use("/backend", express.static(path.join(__dirname, "backend_node")));//  Middleware - create an alias for the static folder in order for visitors not know the name of the folder.
// appBackend.use(bodyParser.urlencoded({extended: false})); // Parse URL encoded forms.
// **************************************************************************************

// Middlewares.
// **************************************************************************************
// Personolized.
// Note: Any function on this middleware will be executed when any address is hit.
// ----------------------
const midApp = (req, res, next) => {
  // Cookies - global.
  // var globalCookies;
  // const globalCookies = req.cookies;

  // globalCookies = req.cookies;
  // Debug.
  // console.log("globalCookies (inside middleware)=", globalCookies);

  // console.log("test middleware")
  next();
};
app.use(midApp); // assign to app
// ----------------------
// **************************************************************************************

// Template engine.
// **************************************************************************************
// app.set("views", path.join(__dirname, "app_views"));
app.set('views', path.join(__dirname, gSystemConfig.configDirectoryViews));

// ejs.
if (gSystemConfig.configBackendTemplateEngine === 1) {
  app.set('view engine', 'ejs');
}
// **************************************************************************************

// Frontend - Home - React.
// **************************************************************************************
app.get('/', (req, res) => {
  /**/
  request.get('http:// localhost:3001', (rError, response, body) => {
    if (rError) {
      res.send(JSON.stringify(rError));
    } else {
      res.send(body);
    }
  });

  /*
    var url = 'http:// localhost:3001';
     
    fetch(url)
        // .then(res => res.json())
        .then(data => {
            res.send({ data });
        })
        .catch(err => {
            res.send(err);
    });
    */
  /*
    // ref: https:// stackoverflow.com/questions/7772605/get-url-contents-in-node-js-with-express
    http.get({
        host: "localhost",
        port: 3001,
        path: "/"
    }, function(html){
        res.render(html);
    }).on("error", function(eHTTP){
        console.log("eHTTP: " + eHTTP.message);
    });
    */

  // res.redirect('http:// localhost:3001');
  // res.send("Hello World");
}); /**/ // Call method get.
// **************************************************************************************

// Frontend - Home.
// **************************************************************************************
/*
app.get("/", (req,res) => {
    // res.send("Hello World");// Debug.

    // res.sendFile(path.join(__dirname, "test-static-html", "index.html"));// serve file
    // res.sendFile(path.join(__dirname, "frontend_node", "index.html"));// serve file


    res.sendFile(path.join(__dirname, gSystemConfig.configFrontendDefaultView, "index.html"));// frontend node

});*/ // Call method get.
// **************************************************************************************

// Backend - Home - Login.
// **************************************************************************************
// app.get("/system", (req,res)=>
/*
app.get("/" + gSystemConfig.configRouteBackend, (req, res)=>
{
    // res.send("Hello World");// Debug.

    // res.sendFile(path.join(__dirname, "test-static-html", "index.html"));// serve file
    // res.sendFile(path.join(__dirname, "backend_node", "categories-listing.html"));// serve file
    res.sendFile(path.join(__dirname, gSystemConfig.configDirectorySystem, "categories-listing.html"));// serve static file // working
});// Call method get.
*/
// **************************************************************************************

// REST based API (CRUD).
// **************************************************************************************
// Backend (general) - import from external routes file.
// ----------------------
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-records.js'));
// ----------------------

// Login - import from external routes file.
// ----------------------
// Backend.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin.js'));
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-login-users.js'));

// API.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-api-authentication.js'));
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-api-login.js'));
// ----------------------

// Categories - import from external routes file.
// ----------------------
// Backend.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-categories.js'));

// Frontend.

// API.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-api-categories.js'));
// app.use("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories, require("./" + gSystemConfig.configDirectoryBackend + "/routes-api-categories.js"));
// ----------------------

// Files - import from external routes file.
// ----------------------
// Backend.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-files.js'));

// API.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-api-files.js'));
// ----------------------

// Content - import from external routes file.
// ----------------------
// Backend.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-content.js'));

// API.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-api-content.js'));
// ----------------------

// Products - import from external routes file.
// ----------------------
// Backend.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-products.js'));

// API.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-api-products.js'));
// ----------------------

// Publications - import from external routes file.
// ----------------------
// Backend.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-publications.js'));

// API.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-api-publications.js'));
// ----------------------

// Registers - import from external routes file.
// ----------------------
// Backend.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-registers.js'));

// API.
// app.use("/", require("./" + gSystemConfig.configDirectoryBackend + "/routes-api-registers.js"));
// ----------------------

// Quizzes - import from external routes file.
// ----------------------
// Backend.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-quizzes.js'));
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-quizzes-options.js'));

// API.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-api-quizzes.js'));
// ----------------------

// Forms, Forms Fields, Forms Fields Options - import from external routes file.
// ----------------------
// Backend.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-forms.js'));
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-forms-fields.js'));
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-forms-fields-options.js'));

// API.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-api-forms.js'));
// ----------------------

// Filters Generic - import from external routes file.
// ----------------------
// Backend.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-filters-generic.js'));
// ----------------------

// Users - import from external routes file.
// ----------------------
// Backend.
app.use('/', require('./' + gSystemConfig.configDirectoryBackend + '/routes-admin-users.js'));
// ----------------------
// **************************************************************************************

// Debug.
// ----------------------
// console.log("Hello World"); // Test to see if Node is installed.
// console.log("DB_SYSTEM_HOST = " + process.env.DB_SYSTEM_HOST); // Test .env variables.
// console.log("configSystemName = " + gSystemConfig.configSystemName); // Test config variables.
// console.log("configSystemName = " + SyncSystemNS.gSystemConfig.configSystemName); // Test config variables.

// console.log("configLanguageFrontend = "); // Test language file.
// console.log(gSystemConfig.configLanguageFrontend); // Test language file.
// console.log(gSystemConfig.configLanguageBackend); // Test language file.
// console.log("languageFrontend = " + gSystemConfig.configLanguageBackend.appLabels.layoutDevelopment); // Test language file.
// console.log("appLabelsGet (layoutDevelopment) = " + JSON.stringify(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "layoutDevelopment"))); // Test language file.

// Test generic fuctions
// console.log("SyncSystemNS.FunctionsGeneric.fileExtensionGet = " + SyncSystemNS.FunctionsGeneric.fileExtensionGet("return test - extension"));
// console.log("SyncSystemNS.FunctionsGeneric.contentMaskWrite = " + SyncSystemNS.FunctionsGeneric.contentMaskWrite("return test - data"));

// console.log(SyncSystemNS.FunctionsDB.counterUniversalCreate());
// var strReturnCallback = "";
// SyncSystemNS.FunctionsDB.counterUniversalCreate(1, function(result){
// strReturnCallback = result;
// });
// console.log("SyncSystemNS.FunctionsDB.counterUniversalSelect = ");
// console.log(strReturnCallback);
// console.log(SyncSystemNS.FunctionsDB.counterUniversalCreate());

// Clean up.
// ----------------------
/*
Condition it after all connections went through.
dbSystemCon.end((DBSystemError)=>{

});
*/

// dbSystemConPool.end(function (DBSystemError) {
//  all connections in the pool have ended
// });
// TODO: Implement to end after all processes end.
// ----------------------

// Listen setup.
// port to listen to (after runing the node file on the terminal, you can check the browser on http:// localhost:3000/) Note: ctrl + c to stop the server.
// app.listen(3000);
// app.listen(process.env.CONFIG_SYSTEM_PORT);
// app.listen(process.env.PORT || process.env.CONFIG_SYSTEM_PORT); // process.env.PORT - Heroku Dynamic Port (Note: Server variable must be first)
// app.listen(process.env.PORT || process.env.CONFIG_SYSTEM_PORT, process.env.CONFIG_SYSTEM_URL || "0.0.0.0"); // process.env.PORT - Heroku Dynamic Port (Note: Server variable must be first)
// app.listen(process.env.PORT || process.env.CONFIG_SYSTEM_PORT, "0.0.0.0"); // process.env.PORT - Heroku Dynamic Port (Note: Server variable must be first)
/**/
app.listen(process.env.PORT || process.env.CONFIG_SYSTEM_PORT, () => {
  if (gSystemConfig.configDebug === true) {
    console.log(`app running on port: ${process.env.PORT || process.env.CONFIG_SYSTEM_PORT}`);
  }
}); // process.env.PORT - Heroku Dynamic Port (Note: Server variable must be first)
