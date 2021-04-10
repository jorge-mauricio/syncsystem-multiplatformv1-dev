"use strict";

//Import.
//----------------------
//Configuration file.
const gSystemConfig = require("../config-application.js"); //System configuration.

//Node functions.
const FunctionsGeneric = require("../" + gSystemConfig.configDirectoryComponents + "/functions-generic.js");
const FunctionsCrypto = require("../" + gSystemConfig.configDirectoryComponents + "/functions-crypto.js");

//Node objects.
//const ObjectFormsDetails = require("../" + gSystemConfig.configDirectoryComponents + "/object-forms-details.js");


//JS functions.
//import {elementMessage01} from "../app_js/functions-syncsystem.js";
import { FunctionsSyncSystem } from "../app_js/functions-syncsystem.js";


//Node modules.
import HTMLReactParser from "html-react-parser"; //error / webpack
const qs = require('query-string');
import Safe from "react-safe";

//GLightbox.
/*
import GLightbox from 'glightbox';
const gLightboxBackendConfigOptions = {};
gLightboxBackendConfigOptions.autoplayVideos = true;
gLightboxBackendConfigOptions.openEffect = "fade"; //zoom, fade, none
gLightboxBackendConfigOptions.slideEffect = "slide"; //slide, fade, zoom, none
gLightboxBackendConfigOptions.moreText = "+"; //more text for descriptions on mobile devices
gLightboxBackendConfigOptions.touchNavigation = true;
gLightboxBackendConfigOptions.descPosition = "bottom"; //global position for slides description, you can define a specific position on each slide (bottom, top, left, right)
*//*error - window is undefined*/


//React modules.
//import React from "react";
import React, {Component, createContext} from "react";

//const BrowserHistory = require('react-router/lib/BrowserHistory').default;

//Custom components.
//import FrontendFilesListingRecord from "./frontend-files-listing-record-cb-component.js";

export const SyncSystemNSContext = createContext();
//----------------------


class SyncSystemNSContextProvider extends Component
{
    state = {
        //Custom react components.
        /*
        SyncSystemRC:
        {
            FrontendFilesListingRecord: FrontendFilesListingRecord
        }
        */
        /*
        SyncSystemRC:
        {
            FrontendFilesListingRecord: <FrontendFilesListingRecord></FrontendFilesListingRecord>
        }
        */
        
        //Modules and components.
        HTMLReactParser: HTMLReactParser,
        Safe: Safe,
        qs: qs,
        //BrowserHistory: BrowserHistory
        //GLightbox: GLightbox,
        //gLightboxBackendConfigOptions: gLightboxBackendConfigOptions
        
        //App config file.
        gSystemConfig: gSystemConfig,
        
        //JS functions.
        FunctionsSyncSystem: FunctionsSyncSystem,
        
        //Node functions.
        SyncSystemNS: 
        {
            FunctionsGeneric: FunctionsGeneric, 
            FunctionsCrypto: FunctionsCrypto
            //ObjectFormsDetails: ObjectFormsDetails
        }
    }


    render()
    {
        return(
            <SyncSystemNSContext.Provider value={{...this.state}}>
                {this.props.children}
            </SyncSystemNSContext.Provider>
        );
    }
}

export default SyncSystemNSContextProvider;