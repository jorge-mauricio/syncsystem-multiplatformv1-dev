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
        FunctionsSyncSystem: FunctionsSyncSystem
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