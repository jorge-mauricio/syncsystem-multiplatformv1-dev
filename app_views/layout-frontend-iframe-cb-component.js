"use strict";

//Import Node Modules.
//----------------------
//import gSystemConfig from "../config-application.js";
//const gSystemConfig = require("../config-application.js"); //System configuration.
//const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
import { SyncSystemNSContext } from "../components_react/syncsystem-ns-cb-context.js";

//import React from "react";
import React, {Component} from "react"; //working
import ReactDOM from 'react-dom';
//import ReactDOMServer from 'react-dom/server';
//import {Helmet} from "react-helmet";
import Safe from "react-safe";

import HTMLReactParser from "html-react-parser"; //error / webpack
//const Parser = require('html-react-parser');
//import Parser from 'html-react-parser/dist/html-react-parser';
//import ReactRenderHTML from "react-render-html";
//const HtmlToReactParser = require('html-to-react').Parser;
//import HtmlToReactParser from 'html-to-react'.Parser;

//const TrackingCode = require("../tracking-code");
import TrackingCode from "../tracking-code.js";

//CSS.
//import withStyles from 'isomorphic-style-loader/lib/withStyles';
import StylesFrontend from "../app_styles/styles-frontend.css";
//import StylesFrontend from ("../" + gSystemConfig.configDirectoryStyles + "/styles-frontend.css");

//import StylesFrontend from '/app_styles/styles-frontend.css'; 
//import "../app_js/functions-syncsystem.js";


//import "babel-polyfill";

//Popper.
//import Popper from "popper.js";
//window.Popper = Popper;
//import "../app_js/popper/popper.min.js";
//import Popper from "../app_js/popper/popper.min.js";

//JQuery.
//import $ from 'jquery';
//import jQuery from 'jquery';
//window.jQuery = jQuery;
//window.$ = jQuery;
//import $ from 'jquery';

//import * as $ from "jquery";
//window.jQuery = window.$ = $;
//global.jQuery = require('jquery');

//Bootstrap.
//import 'bootstrap/dist/css/bootstrap.min.css';
//import "../app_styles/styles-frontend-bootstrap.scss";
//import '../node_modules/jquery/dist/jquery.min.js'

//import "bootstrap/dist/js/bootstrap.bundle.min.js";
//import "bootstrap/dist/css/bootstrap.min.css";
//import "bootstrap";
//require('bootstrap'); //caused error: $.fn.emulateTransitionEnd = function (duration)
//window.Bootstrap = require('bootstrap'); //caused: ReferenceError: window is not defined
//import "bootstrap/dist/js/bootstrap.js";
//----------------------


class LayoutFrontendMain extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        super(props, context);

        //State creation.
        this.state = {
            //titleCurrent: "old title"
            titleCurrent: ""
        }
        

        //Bind with method.
        //this.handleChange = this.handleChange.bind(this);
        this.setTitleCurrent = this.setTitleCurrent.bind(this);
    }
    //**************************************************************************************


    /**/
    //changeState(stateProperty, strMessage)
    //changeState(e)
    changeState()
    {
        this.setState({
            //[stateProperty]: strMessage
            //titleCurrent: strMessage
            titleCurrent: "new current title"
        });
        //this.state[stateProperty] = strMessage;
    }


    setTitleCurrent(sProperty, strMessage)
    {
        this.setState({
            //[stateProperty]: strMessage
            //titleCurrent: strMessage
            titleCurrent: strMessage
        });
    }
    

    //Lifecycle methods.
    
    //Return the new, updated state based upon the props (desincouraged by the react developer team)
    /*
    static getDerivedStateFromProps(props, state)
    {
        //Note: Returns error if returns nothing.

    }
    */


    //Create a backup of the current way things are.
    /*
    getSnapshotBeforeUpdate()
    {
        //Note: Returns error if returns nothing.

    }
    */


    componentDidMount()
    {
        //Title - current.
        //this.setTitleCurrent("", "new current title function"); //working


        //Tracking code(s).
        /*
        var frTrackingCode = new FileReader();
        frTrackingCode.readAsText("/tracking-code.txt");
        frTrackingCode.onload = () =>{
            console.log(frTrackingCode.result);
        };
        */

        /*
        //var trackingCode = fetch('/tracking-code.txt')
        fetch('../tracking-code.txt')
        //fetch('/tracking-code.txt')
        .then((r) => r.text())
        .then((text) => {
          console.log(text);
        });
        */


        /*
        const script = document.createElement("script");
        script.src = "/bundle.react.client.js";
        script.async = true;
        document.body.appendChild(script);
        //this.body.appendChild(script);
        */
        /*
        const s = document.createElement('script');
        //s.type = 'text/javascript';
        s.src = "/bundle.react.client.js";
        s.async = true;
        //s.innerHTML = "document.write('This is output by document.write()!')";
        this.instance.appendChild(s);
        */

        //GET the data I need to correctly display


        //Debug.
        //console.log("TrackingCode=", TrackingCode);
    }

    //UNSAFE_componentWillReceiveProps(myNextProps) (deprecated)
    componentWillReceiveProps(myNextProps)
    {
        /*if(myNextProps.whatever != this.props.whaever)
        {
            //do something
        }*/
    }

    //Optmize the app´s resources.
    /*
    shouldComponentUpdate(myNextProps, myNextState)
    {
        //Note: Returns error if returns nothing.

        // return true if want it to update
        
        // return false if not want to update 



    }
    */

    //Teardown or cleanup your code before your component disappears.
    componentWillUnmount()
    {

    }



    //Personal method - change state.
    handleChange(id)
    {
        //Find the id and change the value of completed.
        /*
        this.setState(myPrevState =>{
            //Create new object based on the old state with the changed value.
            const updatedTodos = myPrevState.map(sTodosData =>{
                if(sTodosData.id === id)
                {
                    sTodosData.completed = !sTodosData.completed;
                }

                return sTodosData;
            });

            //Set the old state to the updated state that was created above.
            return{
                sTodosData: updatedTodos
            }
        });
        */

        //Debug.
        //console.log("worked - id=" + id);
    }

    setData = () => {
        
    };


    //Render.
    //**************************************************************************************
    render()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;
        //var objHtmlToReactParser = new HtmlToReactParser();
        //var hrpTrackingCode = objHtmlToReactParser.parse(TrackingCode);

        const tagsMetaDefault1 = `
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        `;
        //const tlScriptBundleReactClient = `<script src="/bundle.react.client.js"></script>`;

        const tagsStyleCSS = `
            ${ /* Bootstrap 4 CSS. */ '' }
            <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
            <!--link rel="stylesheet" type="text/css" href="../app_js/bootstrap/bootstrap-3.3.6-dist/css/bootstrap.min.css" media="screen" title="Default" /-->

            <link rel="stylesheet" type="text/css" href="/styles-frontend.bundle.css" media="screen" title="Default" />
        `;

        const tagsFavicons = `
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="manifest" href="/site.webmanifest" />
            <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
            <meta name="msapplication-TileColor" content="#009154" />
            <meta name="theme-color" content="#ffffff" />
        `;

        const tagsMetaDefault2 = `
            <meta name="robots" content="index,follow" />
            <meta name="language" content="english" />

            <meta name="author" content="${ /*SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application")*/ + '' } ${ gSystemConfig.configSystemClientName }" />
            <meta name="designer" content="${ /*SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configDevName, "config-application")*/ + '' } ${ gSystemConfig.configDevName }" />
            <meta name="copyright" content="${ gSystemConfig.configCopyrightYear }, ${ /*SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application")*/ + '' } ${ gSystemConfig.configSystemClientName }" />
            <meta name="rating" content="general" /><?php //general | mature | restricted | 14 years?>
        `;
        
        const tagsMetaDynamic1 = `
            <meta name="title" content="" />${ /* Below 60 characters. */ '' }
            <meta name="description" content="" />${ /* Below 160 characters. */ '' }
            <meta name="keywords" content="" />${ /* Below 100 characters. */ '' }

            ${ /* Open Graph tags. */ '' }
            <meta property="og:title" content="" />
            <meta property="og:type" content="website" />${ /* ref: http://ogp.me/#types | https://developers.facebook.com/docs/reference/opengraph/ */ '' }
            <meta property="og:url" content="" />
            <meta property="og:description" content="" />
            
            ${ /* 
            Dimensões:
            ref: https://iamturns.com/open-graph-image-size/
            Horizontal: 
                - home (1.9:1): 1200 x 630 pixels
                - produtos, artigos, etc (2:1): 1200 x 600 | 300 x 157 (mínimo) | 4096 x 4096 (máximo)
            Quadrado:
                - home (1:1): 1200 x 1200 pixels
                - produtos, artigos, etc (1:1): 600 x 600 | 144 x 144 (mínimo) | 4096 x 4096 (máximo)
            */
            ''}
            <meta property="og:image" content="" />${ /* The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. 120x120px, up to 1MB | JPG ou PNG, below 300k - minimum resolution: 300x200 pixels. */ '' }
                <!--meta property="og:image:secure_url" content="" /-->
            <meta property="og:image:alt" content="" />
            
            <meta property="og:locale" content="en_US" />
        `;      

        const javaScriptHead = `
            <!--script type="text/javascript" src="functions-syncsystem.js"></script-->
            <!--script type="text/javascript" src="../js/jquery/jquery-3.4.1.min.js"></script-->
            <!--script>
                window.$ = window.jQuery = require('jquery');
                window.Bootstrap = require('bootstrap');
            </script-->
        `;

        const javaScriptFoot = `
            ${ /*jQuery. */ '' }
            <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
            
            ${ /*Popper. */ '' }
            <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
            
            ${ /*Bootstrap 4. */ '' }
            <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        `;


        //TodoData Map Component.
        //Note: Passing methods only works whith arrow functions because of the "this" reference - ref: https://stackoverflow.com/questions/56374615/uncaught-typeerror-cannot-read-property-class-function-of-undefined-in-reactj
        /** 
        const mcTestTodoItem = this.state.sTodosData.map(function(itemLine){
            return(
                <TestTodoItem 
                    key={itemLine.id} 
                    text={itemLine.text} 
                    completed={itemLine.completed} 
                    handleChange={this.handleChange}
                />
            );
        })
        */
        /*const mcTestTodoItem = this.state.sTodosData.map((itemLine)=>
            {
                return(
                    <TestTodoItem 
                        key={itemLine.id} 
                        id={itemLine.id} 
                        text={itemLine.text} 
                        completed={itemLine.completed} 
                        cmHandleChange={this.handleChange}
                    />
                );
            }
        )   */     


        return(
            /*<html lang="pt-br">*/
            <html lang="en-us">
                <head>
                    { HTMLReactParser(TrackingCode) }
                    {/*ReactRenderHTML(TrackingCode)*/}
                    {/*hrpTrackingCode*/}

                    <meta charSet="UTF-8" />

                    {/*ReactRenderHTML(metaTagsDefault1)*/}
                    { HTMLReactParser(tagsMetaDefault1) }

                    <title>

                    </title>

                    { HTMLReactParser(tagsStyleCSS) }
                    
                    { HTMLReactParser(tagsFavicons) }

                    { /*head dynamic tags */ }
                    { HTMLReactParser(tagsMetaDynamic1) }

                    { HTMLReactParser(tagsMetaDefault2) }

                    { HTMLReactParser(javaScriptHead) }
                </head>

                <body className={/*StylesFrontend["ss-frontend-body01"]*/ "ss-frontend-body-iframe01"}>
                    <div id="root">
                        { /*Content place holder - current title*/ }
                        <h1 id="titleCurrent">
                            { this.state.titleCurrent }
                            {/*this.props.cphTitle*/''}
                        </h1>


                        Layout Iframe (Debug Elements)
                        

                        { /*Content place holder - body*/ }
                        <main>
                            { this.props.cphBody }
                        </main>



                        { /*tlScriptBundleReactClient*/ }

                        {/*<Helmet>
                            <script src="/bundle.react.client.js"></script>
                            <script>{
                        `try{Typekit.load({ async: true });}catch(e){}`
                        }</script>
                        </Helmet>*/}

                    </div>

                    <Safe.script src="/bundle.react.client.js"></Safe.script>
                    <Safe.script>{
                    `try{Typekit.load({ async: true });}catch(e){}`
                    }
                    </Safe.script>
                    

                    { HTMLReactParser(javaScriptFoot) }
                </body>
            </html>
        );
    }
    //**************************************************************************************
}

export default LayoutFrontendMain;
//export default withStyles(StylesFrontend)(LayoutFrontendMain);