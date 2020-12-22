"use strict";

//Import.
//----------------------
//Configuration file.
const gSystemConfig = require("../config-application.js"); //System configuration.

//Node functions.
const FunctionsGeneric = require("../" + gSystemConfig.configDirectoryComponents + "/functions-generic.js");
const FunctionsCrypto = require("../" + gSystemConfig.configDirectoryComponents + "/functions-crypto.js");


//JS functions.
//import {elementMessage01} from "../app_js/functions-syncsystem.js";
import { FunctionsSyncSystem } from "../app_js/functions-syncsystem.js";


//Node modules.
import HTMLReactParser from "html-react-parser"; //error / webpack

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

export const SyncSystemNSContext = createContext();
//----------------------


class SyncSystemNSContextProvider extends Component
{
    state = {
        gSystemConfig: gSystemConfig,
        //elementMessage01: elementMessage01,
        SyncSystemNS: 
        {
            FunctionsGeneric: FunctionsGeneric, 
            FunctionsCrypto: FunctionsCrypto
        },
        FunctionsSyncSystem: FunctionsSyncSystem,
        HTMLReactParser: HTMLReactParser
        //GLightbox: GLightbox,
        //gLightboxBackendConfigOptions: gLightboxBackendConfigOptions
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