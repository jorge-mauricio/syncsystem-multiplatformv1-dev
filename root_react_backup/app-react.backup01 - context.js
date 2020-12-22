"use strict";
//Import Node Modules.
//----------------------
import "babel-polyfill"; //with babel, we can use the import syntax.

const gSystemConfig = require("./config-application.js"); //System configuration.
const SyncSystemNS = require("./" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

const express = require("express"); //Express Framework.
const path = require("path"); //Necessary to serve static files.
const bodyParser = require("body-parser"); //Body parser module.
const methodOverride = require('method-override'); //Necessary for using in the hidden fields in the form to use the additinal methods.
const _ = require('lodash'); //Loadash

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
//const AppReact = require("./components_react/app.js");
import AppReact from "./components_react/app.js";
//import { renderToString } from "react-dom/server";
import ContextProvider from './components_react/context-provider.js';

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

    //const context = {};
    const css = new Set()
    const context = { insertCss: (...styles) => 
      styles.forEach(style => css.add(style._getCss()))}

    const content = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <ContextProvider context={context}> 
                <AppReact />
            </ContextProvider>
        </StaticRouter>
    );

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