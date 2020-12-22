"use strict";


//Import.
//----------------------
import "babel-polyfill"; //with babel, we can use the import syntax.

//JQuery.
//import $ from 'jquery';
//import jQuery from 'jquery';
//window.jQuery = jQuery;
//window.$ = jQuery;
//import $ from 'jquery';

/*
import $ from 'jquery';
//import {$,jQuery}  from 'jquery';
window.jQuery = $;
//global.jquery = jQuery
//window.jquery = $;
window.$ = $;

//var $ = require('jquery');
//window.$ = window.jQuery = require('jquery');
global.$ = require("jquery");
global.jQuery = require('jquery');
global.jquery = require('jquery');
//window.Bootstrap = require('bootstrap');

//import Popper from 'popper.js';
*/

const gSystemConfig = require("./config-application.js"); //System configuration.
const SyncSystemNS = require("./" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

//Provider.
//import SyncSystemNSContextProvider from "./components_react/syncsystem-ns-cb-context.js";

//Node modules.
const express = require("express"); //Express Framework.
const favicon = require("express-favicon"); //Express Favicon.
const path = require("path"); //Necessary to serve static files.
const bodyParser = require("body-parser"); //Body parser module.
const methodOverride = require('method-override'); //Necessary for using in the hidden fields in the form to use the additinal methods.
const _ = require('lodash'); //Loadash


//React modules.
//const React = require("react");
import React from "react";
//const ReactDOM = require("react-dom");
import ReactDOM from "react-dom";

//const ReactDOMServer = require("react-dom/server");
import ReactDOMServer from "react-dom/server";
//const StaticRouter = require("react-router/StaticRouter");
import { StaticRouter } from "react-router";
//const LayoutTest01 = require("./components_react/LayoutTest01.js");
//import LayoutTest01 from "./components_react/LayoutTest01";
//var AppReact = require("./components_react/app.js");
import AppReactSSR from "./components_react/app.js";
//import { renderToString } from "react-dom/server";


//Layout
//import LayoutFrontendMain from "./app_views/layout-frontend-main-cb-component.js";
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
//app.use("/", express.static("build"));
app.use("/", express.static("build/public"));

//app.use("/tracking-code.txt", express.static(path.join(__dirname, "tracking-code.txt")));

//Favicons - static
/*
app.use("/android-chrome-192x192.png", express.static(path.join(__dirname, "android-chrome-192x192.png"))); //set static folder
app.use("/android-chrome-512x512.png", express.static(path.join(__dirname, "android-chrome-512x512.png"))); //set static folder
app.use("/apple-touch-icon.png", express.static(path.join(__dirname, "apple-touch-icon.png"))); //set static folder
app.use("/favicon.ico", express.static(path.join(__dirname, "favicon.ico"))); //set static folder
app.use("/favicon-16x16.png", express.static(path.join(__dirname, "favicon-16x16.png"))); //set static folder
app.use("/favicon-32x32.png", express.static(path.join(__dirname, "favicon-32x32.png"))); //set static folder
app.use("/favicon-export.png", express.static(path.join(__dirname, "favicon-export.png"))); //set static folder
app.use("/mstile-150x150.png", express.static(path.join(__dirname, "mstile-150x150.png"))); //set static folder
app.use("/browserconfig.xml", express.static(path.join(__dirname, "browserconfig.xml"))); //set static folder
app.use("/safari-pinned-tab.svg", express.static(path.join(__dirname, "safari-pinned-tab.svg"))); //set static folder
*/
//----------------------


//Favicon.
//ref: 
//https://expressjs.com/en/resources/middleware/serve-favicon.html
//https://www.npmjs.com/package/express-favicon
//https://stackoverflow.com/questions/15463199/how-to-set-custom-favicon-in-express
//app.use("/", express.static(path.join(__dirname, "favicon-16x16.png")));
//----------------------
/*
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
*/
//----------------------


//Additional configuration / setup.
//----------------------
app.use(express.json()); //handle raw json
app.use(bodyParser.urlencoded({extended: false})); //Parse URL encoded forms.
app.use(methodOverride('_method')); //Necessary for using in the hidden fields in the form to use the additinal methods.
//----------------------


//Set local variables.
//----------------------
app.locals.gSystemConfig = gSystemConfig;
app.locals.SyncSystemNS = SyncSystemNS;
//----------------------
//**************************************************************************************


//Frontend - Home.
//**************************************************************************************
//app.get("/", (req,res)=>
app.get("/*", (req,res)=>
{
    //const jsx = ( <Layout /> );
    //const jsx = ( <LayoutTest01 /> );
    //const reactDom = ReactDOM.renderToString( jsx );

    //res.writeHead( 200, { "Content-Type": "text/html" } );
    //res.end( htmlTemplate( reactDom ) );

    const context = {};
    /*
    const content = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <AppReact />
        </StaticRouter>
    );
    */
    const content = "<!DOCTYPE html>" + ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <AppReactSSR />
        </StaticRouter>
    );

    /*
    const content = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <LayoutFrontendMain cphBody={<AppReact />}>

            </LayoutFrontendMain>
        </StaticRouter>
    );
    */

    /*
    const _cphTitle = ()=>{
        return <AppReact />;
    } 
    */
    /*
    const _cphTitle = (props) => {
        return (
          <AppReact {...props} />
        )
    }
    */

    /*
    const html = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <title>React SSR 02</title>
        </head>
        
        <body>
            <div id="root">${ content }</div>
            <script src="bundle.react.client.js"></script>
            <!--script src="/build/public/bundle.react.client.js"></script-->
        </body>
        </html> 
    `;
    */

    const html = ReactDOMServer.renderToString(
        /*<LayoutFrontendMain cphTitle={<AppReact />}>

        </LayoutFrontendMain>*/
    );

    //res.send(html);
    res.send(content);

});//Call method get.
//**************************************************************************************


//Listen setup.
//app.listen(process.env.PORT || process.env.CONFIG_SYSTEM_PORT, ()=>{
app.listen(3001, ()=>{
    if(gSystemConfig.configDebug === true)
    {
        console.log(`app-react running on port: ${ process.env.PORT || process.env.CONFIG_SYSTEM_PORT }`);
    }
}); //process.env.PORT - Heroku Dynamic Port (Note: Server variable must be first)