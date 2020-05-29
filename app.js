"use strict";

//Import Node Modules.
//----------------------
require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.

const gSystemConfig = require("./config-application.js"); //System configuration.
const dbSystemCon = require("./config-application-db.js").dbSystemCon; //DB System - simple connection.
const dbSystemConPool = require("./config-application-db.js").dbSystemConPool; //DB System - pool connection.
//const dbSystem = require("./config-application-db.js").mysql_pool; //DB. (ref: https://stackoverflow.com/questions/34788750/module-export-for-mysql-connection)
//require("./config-application.js");
//const SyncSystemNS = require("./components_node/syncsystem-ns.js"); //working
const SyncSystemNS = require("./" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");


const http = require("http"); //HTTP Module
//const url = require('url');
//const querystring = require('querystring');
const fs = require("fs"); //File System.
const fsExtra = require("fs-extra"); //File System with extra functions.
const express = require("express"); //Express Framework.
const favicon = require("express-favicon"); //Express Favicon.
//const favicon = require("serve-favicon"); //Serve Favicon (uninstalled).
const path = require("path"); //Necessary to serve static files.
const bodyParser = require("body-parser"); //Body parser module.
const methodOverride = require('method-override'); //Necessary for using in the hidden fields in the form to use the additinal methods.
const urlencodedParser = bodyParser.urlencoded({ extended: false});
const formidable = require("formidable"); //Form file upload.
const sharp = require('sharp'); //Resize image.

//const mysql = require("mysql");//MySQL package.
const _ = require('lodash'); //Loadash
//----------------------


//Objects instances.
//----------------------
const app = express(); //init express
//const appBackend = express();
//----------------------


//Configuration and setup.
//**************************************************************************************
//Static directories (public alias).
//----------------------
//Middleware - create an alias for the static folder in order for visitors not know the name of the folder.
//app.use("/images", express.static(path.join(__dirname, "images_files")));
app.use("/" + gSystemConfig.configDirectoryStylesSD, express.static(path.join(__dirname, gSystemConfig.configDirectoryStyles))); //set static folder
app.use("/" + gSystemConfig.configDirectoryDistSD, express.static(path.join(__dirname, gSystemConfig.configDirectoryDist))); //set static folder (webpack distribution folder)
app.use("/" + gSystemConfig.configDirectoryJSSD, express.static(path.join(__dirname, gSystemConfig.configDirectoryJS))); //set static folder
app.use("/" + gSystemConfig.configDirectoryFilesSD, express.static(path.join(__dirname, gSystemConfig.configDirectoryFiles))); //set static folder
app.use("/" + gSystemConfig.configDirectoryFilesLayoutSD, express.static(path.join(__dirname, gSystemConfig.configDirectoryFilesLayout))); //set static folder
//app.use("/frontend", express.static(path.join(__dirname, gSystemConfig.configFrontendDefaultView))); //set static folder
app.use("/" + gSystemConfig.configFrontendDefaultViewSD, express.static(path.join(__dirname, gSystemConfig.configFrontendDefaultView))); //set static folder

//app.use("/", express.static(path.join(__dirname, gSystemConfig.configFrontendDefaultView))); //set static folder (test-static01.html can be accessed through: http://localhost:3000/test-static01.html) //working
//app.use("/backend", express.static(path.join(__dirname, "backend_node")));
//app.use("/backend", express.static(path.join(__dirname, gSystemConfig.configDirectorySystem))); //set static folder
app.use("/" + gSystemConfig.configDirectorySystemSD, express.static(path.join(__dirname, gSystemConfig.configDirectorySystem))); //set static folder
//----------------------


//Favicon.
//ref: 
//https://expressjs.com/en/resources/middleware/serve-favicon.html
//https://www.npmjs.com/package/express-favicon
//https://stackoverflow.com/questions/15463199/how-to-set-custom-favicon-in-express
//app.use("/", express.static(path.join(__dirname, "favicon-16x16.png")));
//----------------------
//app.use(favicon(path.join(__dirname, "public", "android-chrome-192x192.png")));
app.use(favicon(path.join(__dirname, "android-chrome-192x192.png")));
app.use(favicon(path.join(__dirname, "android-chrome-512x512.png")));
app.use(favicon(path.join(__dirname, "apple-touch-icon.png")));
app.use(favicon(path.join(__dirname, "favicon.ico")));
app.use(favicon(path.join(__dirname, "favicon-16x16.png")));
app.use(favicon(path.join(__dirname, "favicon-32x32.png")));
app.use(favicon(path.join(__dirname, "favicon-export.png")));
app.use(favicon(path.join(__dirname, "mstile-150x150.png")));

app.use(favicon(path.join(__dirname, "browserconfig.xml")));
//app.use(favicon(path.join(__dirname, "site.webmanifest")));
app.use(favicon(path.join(__dirname, "safari-pinned-tab.svg")));
//----------------------


//Body parser.
app.use(express.json()); //handle raw json
//app.use(express.json({ type: 'application/*+json' })); //handle raw json
app.use(bodyParser.urlencoded({extended: false})); //Parse URL encoded forms.

app.use(methodOverride('_method')); //Necessary for using in the hidden fields in the form to use the additinal methods.
//app.use(methodOverride('X-HTTP-Method')); //Microsoft
//app.use(methodOverride('X-HTTP-Method-Override')); //Google/GData
//app.use(methodOverride('X-Method-Override')); //IBM


//Save local variables (share comon variables in the template).
//ref: https://stackoverflow.com/questions/12794860/how-to-use-node-modules-like-momentjs-in-ejs-views
//----------------------
app.locals.gSystemConfig = gSystemConfig;
app.locals.SyncSystemNS = SyncSystemNS;
//app.locals._ = _;
//----------------------


//appBackend.use("/backend", express.static(path.join(__dirname, "backend_node")));// Middleware - create an alias for the static folder in order for visitors not know the name of the folder.
//appBackend.use(bodyParser.urlencoded({extended: false})); //Parse URL encoded forms.
//**************************************************************************************


//Serve static files.
//**************************************************************************************


//**************************************************************************************



//Middlewares.
//**************************************************************************************
//Personolized.
//Note: Any function on this middleware will be executed when any address is hit.
//----------------------
const midApp = (req, res, next) =>
{
    //console.log("test middleware")
    next();
}
app.use(midApp); //assign to app
//----------------------
//**************************************************************************************


//Template engine.
//----------------------
app.set("views", path.join(__dirname, "app_views"));

//ejs.
if(gSystemConfig.configBackendTemplateEngine === 1)
{
    app.set("view engine", "ejs");
}
//----------------------


//Frontend - Home.
//**************************************************************************************
app.get("/", (req,res)=>
{
    //res.send("Hello World");//Debug.

    //res.sendFile(path.join(__dirname, "test-static-html", "index.html"));//serve file
    //res.sendFile(path.join(__dirname, "frontend_node", "index.html"));//serve file
    res.sendFile(path.join(__dirname, gSystemConfig.configFrontendDefaultView, "index.html"));//serve file
});//Call method get.
//**************************************************************************************


//Backend - Home.
//**************************************************************************************
//app.get("/system", (req,res)=>
app.get("/" + gSystemConfig.configRouteBackend, (req, res)=>
{
    //res.send("Hello World");//Debug.

    //res.sendFile(path.join(__dirname, "test-static-html", "index.html"));//serve file
    //res.sendFile(path.join(__dirname, "backend_node", "categories-listing.html"));//serve file
    res.sendFile(path.join(__dirname, gSystemConfig.configDirectorySystem, "categories-listing.html"));//serve static file
});//Call method get.
//**************************************************************************************


//REST based API (CRUD).
//**************************************************************************************
//Categories - import from external routes file.
//----------------------
//Backend.
app.use("/", require("./" + gSystemConfig.configDirectorySystem + "/routes-backend-records.js"));
app.use("/", require("./" + gSystemConfig.configDirectorySystem + "/routes-backend-categories.js"));

//Frontend.

//API.
app.use("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories, require("./" + gSystemConfig.configDirectorySystem + "/routes-api-categories.js"));
//----------------------
//**************************************************************************************


//Working.
/*
http.createServer((req,res)=>{
    const readStream = fs.createReadStream("./backend_node/categories-listing.html");
    res.writeHead(200,{"content-type": "text/html"});
    readStream.pipe(res);
    
}).listen(3000);
*/


//Debug.
//----------------------
//console.log("Hello World"); //Test to see if Node is installed.
//console.log("DB_SYSTEM_HOST = " + process.env.DB_SYSTEM_HOST); //Test .env variables.
//console.log("configSystemName = " + gSystemConfig.configSystemName); //Test config variables.
//console.log("configSystemName = " + SyncSystemNS.gSystemConfig.configSystemName); //Test config variables.

//console.log("configLanguageFrontend = "); //Test language file.
//console.log(gSystemConfig.configLanguageFrontend); //Test language file.
//console.log(gSystemConfig.configLanguageBackend); //Test language file.
//console.log("languageFrontend = " + gSystemConfig.configLanguageBackend.appLabels.layoutDevelopment); //Test language file.
//console.log("appLabelsGet (layoutDevelopment) = " + JSON.stringify(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "layoutDevelopment"))); //Test language file.

//Test generic fuctions
//console.log("SyncSystemNS.FunctionsGeneric.fileExtensionGet = " + SyncSystemNS.FunctionsGeneric.fileExtensionGet("return test - extension"));
//console.log("SyncSystemNS.FunctionsGeneric.contentMaskWrite = " + SyncSystemNS.FunctionsGeneric.contentMaskWrite("return test - data"));


//console.log(SyncSystemNS.FunctionsDB.counterUniversalCreate());
//var strReturnCallback = "";
//SyncSystemNS.FunctionsDB.counterUniversalCreate(1, function(result){
    //strReturnCallback = result;
//});
//console.log("SyncSystemNS.FunctionsDB.counterUniversalSelect = ");
//console.log(strReturnCallback);
//console.log(SyncSystemNS.FunctionsDB.counterUniversalCreate());

//Promise method.
/*
SyncSystemNS.FunctionsDB.counterUniversalSelect()
    .then(function(results){
        //render(results)
        console.log("SyncSystemNS.FunctionsDB.counterUniversalSelect", results);
        //console.log(results);
    }); //working
*/

/*
console.log("SyncSystemNS.FunctionsDB.counterUniversalUpdate = ");
SyncSystemNS.FunctionsDB.counterUniversalUpdate()
    .then(function(results){
        //render(results)
        console.log(results);
    }); //working
*/

/*
console.log("SyncSystemNS.FunctionsDBInsert.insertCounter = ");
SyncSystemNS.FunctionsDBInsert.counterInsert(99, 
    1000,
    "Insert testing")
    .then(function(pResults){
        //render(results)
        console.log(pResults);
    })
    .catch(function(pError){
        console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage3"), pError);
    }); //working
*/   



//console.log("SyncSystemNS.FunctionsGeneric.categoriesInsert=", SyncSystemNS.FunctionsDBInsert.categoriesInsert("123", {}));
/*
SyncSystemNS.FunctionsDBInsert.categoriesInsert("", {})
    .then(function(pResultsCategoriesInsert){
        //render(results)
        console.log("SyncSystemNS.FunctionsDBInsert.categoriesInsert()=", pResultsCategoriesInsert);
        //console.log(pResultsCategoriesInsert);
    })
    .catch(function(pErrorCategoriesInsert){
        console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage3"), pErrorCategoriesInsert);
    });
*/
/*
SyncSystemNS.FunctionsDBInsert.categoriesInsert("123", {})
    .then(function(pResultsCategoriesInsert){
        //render(results)
        console.log("SyncSystemNS.FunctionsDBInsert.categoriesInsert('123')=", pResultsCategoriesInsert);
        //console.log(pResultsCategoriesInsert);
    })
    .catch(function(pErrorCategoriesInsert){
        console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage3"), pErrorCategoriesInsert);
    });//----------------------
*/

//async
//console.log("SyncSystemNS.FunctionsDB.counterUniversalSelect_async=", SyncSystemNS.FunctionsDB.counterUniversalSelect_async("return test - async")); //working
/*
(async function(){  //async marks the block
    try{ 
      console.log(1);
      //let counterUniversalSelect_async_result = await SyncSystemNS.FunctionsDB.counterUniversalSelect_async("return test - async");
      let counterUniversalSelect_async_result = await SyncSystemNS.FunctionsDB.counterUniversalSelect_async(1);
      console.log(3);
      console.log("counterUniversalSelect_async_result=", counterUniversalSelect_async_result);
    }catch(aError){
      console.error(aError);
    }finally{

    }
})()
*/

//console.log("SyncSystemNS.FunctionsDB.counterUniversalUpdate_async=", SyncSystemNS.FunctionsDB.counterUniversalUpdate_async(1));
(async function(){ //async marks the block
    try{ 
        //console.log(1);
        //let counterUniversalSelect_async_result = await SyncSystemNS.FunctionsDB.counterUniversalSelect_async("return test - async");
        //let counterUniversalUpdate_async_result = await SyncSystemNS.FunctionsDB.counterUniversalUpdate_async(1);
        //console.log(3);
        //console.log("counterUniversalSelect_async_result=", counterUniversalUpdate_async_result); //working

        //let counterUniversalUpdate_async_result2 = await SyncSystemNS.FunctionsDB.counterUniversalUpdate_async(1);
        //console.log("counterUniversalUpdate_async_result2=", counterUniversalUpdate_async_result2); //working

        //let categoriesInsert_async_debug1 = await SyncSystemNS.FunctionsDBInsert.categoriesInsert_async(123,{}); //working
        //console.log("categoriesInsert_async_debug1=", categoriesInsert_async_debug1); //working
    
        //let categoriesInsert_async_debug2 = await SyncSystemNS.FunctionsDBInsert.categoriesInsert_async("",{});  //working
        //console.log("categoriesInsert_async_debug2=", categoriesInsert_async_debug2); //working

        //let categoriesInsert_async_debug3 = await SyncSystemNS.FunctionsDBInsert.categoriesInsert_async("",{
        /*let categoriesInsert_async_debug3 = await SyncSystemNS.FunctionsDBInsert.categoriesInsert_async({
            _tblCategoriesIdParent: "0",
            _tblCategoriesSortOrder: "6",
            _tblCategoriesCategoryType: "2",
            _tblCategoriesDateCreation: "",
            _tblCategoriesDateTimezone: "",
            _tblCategoriesDateEdit: "",
            _tblCategoriesIdRegisterUser: "0",
            _tblCategoriesIdRegister1: "0",
            _tblCategoriesIdRegister2: "0",
            _tblCategoriesIdRegister3: "0",
            _tblCategoriesIdRegister4: "0",
            _tblCategoriesIdRegister5: "0",
            _tblCategoriesTitle: "Category insert test",
            _tblCategoriesDescription: "",
            _tblCategoriesURLAlias: "",
            _tblCategoriesKeywordsTags: "",
            _tblCategoriesMetaDescription: "",
            _tblCategoriesMetaTitle: "",
            _tblCategoriesMetaInfo: "",
            _tblCategoriesInfo1: "",
            _tblCategoriesInfo2: "",
            _tblCategoriesInfo3: "",
            _tblCategoriesInfo4: "",
            _tblCategoriesInfo5: "",
            _tblCategoriesInfo6: "",
            _tblCategoriesInfo7: "",
            _tblCategoriesInfo8: "",
            _tblCategoriesInfo9: "",
            _tblCategoriesInfo10: "",
            _tblCategoriesInfoSmall1: "",
            _tblCategoriesInfoSmall2: "",
            _tblCategoriesInfoSmall3: "",
            _tblCategoriesInfoSmall4: "",
            _tblCategoriesInfoSmall5: "",
            _tblCategoriesNumber1: "",
            _tblCategoriesNumber2: "",
            _tblCategoriesNumber3: "",
            _tblCategoriesNumber4: "",
            _tblCategoriesNumber5: "",
            _tblCategoriesNumberSmall1: "",
            _tblCategoriesNumberSmall2: "",
            _tblCategoriesNumberSmall3: "",
            _tblCategoriesNumberSmall4: "",
            _tblCategoriesNumberSmall5: "",
            _tblCategoriesDate1: "",
            _tblCategoriesDate2: "",
            _tblCategoriesDate3: "",
            _tblCategoriesDate4: "",
            _tblCategoriesDate5: "",
            _tblCategoriesIdItem1: "",
            _tblCategoriesIdItem2: "",
            _tblCategoriesIdItem3: "",
            _tblCategoriesIdItem4: "",
            _tblCategoriesIdItem5: "",
            _tblCategoriesImageMain: "",
            _tblCategoriesFile1: "",
            _tblCategoriesFile2: "",
            _tblCategoriesFile3: "",
            _tblCategoriesFile4: "",
            _tblCategoriesFile5: "",
            _tblCategoriesActivation: "1",
            _tblCategoriesActivation1: "0",
            _tblCategoriesActivation2: "0",
            _tblCategoriesActivation3: "0",
            _tblCategoriesActivation4: "0",
            _tblCategoriesActivation5: "0",
            _tblCategoriesIdStatus: "0",
            _tblCategoriesRestrictedAccess: "0",
            _tblCategoriesNotes: ""
        });
        console.log("categoriesInsert_async_debug2=", categoriesInsert_async_debug3);*/
        

       /*let counterUniversalSelectResult = await SyncSystemNS.FunctionsDB.counterUniversalSelect_async_pool(1);
       console.log("counterUniversalSelectResult=", counterUniversalSelectResult);*/


       /* let counterUniversalSelect_async_result = await SyncSystemNS.FunctionsDB.counterUniversalSelect_async(1);
       console.log("counterUniversalSelect_async_result=", counterUniversalSelect_async_result); */
    
        /*let genericTableGet02ResultDebug = await SyncSystemNS.FunctionsDB.genericTableGet02("categories", 
                                                                                            ["id_parent;0;i", "activation;1;i"], 
                                                                                            gSystemConfig.configCategoriesSort, 
                                                                                            "5", 
                                                                                            "id, id_parent, sort_order, category_type, date_creation, title, activation", 
                                                                                            1, 
                                                                                            {});
        console.log("genericTableGet02ResultDebug=", genericTableGet02ResultDebug);
        */

       
        /*
        SyncSystemNS.ObjectCategoriesListing.categoriesListingGet().then((objectCategoriesListingDebug)=>{
            console.log("objectCategoriesListingDebug=", objectCategoriesListingDebug);
        });
        */

        /*
        let objectCategoriesListingParameters = {
            _arrSearchParameters: ["id_parent;0;i", "activation;1;i"],
            _configSortOrder: gSystemConfig.configCategoriesSort,
            _strNRecords: "5",
            _objSpecialParameters: {}
        };
        */
        //let objectCategoriesListingDebug = new SyncSystemNS.ObjectCategoriesListing(); //working
        /*objectCategoriesListingDebug.init(function(){
            console.log("objectCategoriesListingDebug=", objectCategoriesListingDebug);
        });*/

        //let objectCategoriesListingDebug = new SyncSystemNS.ObjectCategoriesListing(objectCategoriesListingParameters); //working
        //await objectCategoriesListingDebug.recordsListingGet(0, 3); //working
        //console.log("objectCategoriesListingDebug=", objectCategoriesListingDebug);


        //let objectCategoriesListingDebug = await new SyncSystemNS.ObjectCategoriesListing().init();






    }catch(asyncError){
        console.error(asyncError);
    }finally{
        //Clean up.
        //----------------------
        /*Condition it after all connections went through.
        dbSystemCon.end((dbSystemError)=>{

        });*/

        /*
        dbSystemConPool.end(function (dbSystemPoolError) {
            if(dbSystemPoolError)
            {
                throw dbSystemPoolError;
            }
            // all connections in the pool have ended
        }); //working
        */
        //----------------------
    }
})();
//let counterUniversalUpdate_async_result = await SyncSystemNS.FunctionsDB.counterUniversalUpdate_async(1);
//console.log("counterUniversalUpdate_async=", counterUniversalUpdate_async_result);


//console.log("SyncSystemNS.FunctionsGeneric.timeZoneConverter=", SyncSystemNS.FunctionsGeneric.timeZoneConverter());
//let timeZoneConverterDebug = new Date(SyncSystemNS.FunctionsGeneric.timeZoneConverter());
//console.log("timeZoneConverterDebug=", timeZoneConverterDebug.toISOString().split('T')[0]); //working
//console.log("timeZoneConverterDebug=", timeZoneConverterDebug.toISOString());
//console.log("dateSQLWrite=", SyncSystemNS.FunctionsGeneric.dateSQLWrite(timeZoneConverterDebug));




//Clean up.
//----------------------
/*Condition it after all connections went through.
dbSystemCon.end((DBSystemError)=>{

});*/

//dbSystemConPool.end(function (DBSystemError) {
    // all connections in the pool have ended
//});
//----------------------


//port to listen to (after runing the node file on the terminal, you can check the browser on http://localhost:3000/) Note: ctrl + c to stop the server.
//app.listen(3000);
//app.listen(process.env.CONFIG_SYSTEM_PORT);
app.listen(process.env.PORT);

//appBackend.listen(3000);