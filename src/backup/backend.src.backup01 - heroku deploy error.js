"use strict";

const gSystemConfig = require("../config-application.js"); //System configuration.


//Custom styles.
import '../app_styles/styles-backend.css'; //import doesn´t accept variables
//require("../" + gSystemConfig.configDirectoryStyles + "/styles-backend.css");
//import(`../" ${gSystemConfig.configDirectoryStyles} "/styles-backend.css`);


//Custom functions.
//require("../" + gSystemConfig.configDirectoryJS + "/functions-syncsystem.js");
//require { inputDataReorder } from ("../" + gSystemConfig.configDirectoryJS + "/functions-syncsystem.js");
//import(`../"${gSystemConfig.configDirectoryJS}"/functions-syncsystem.js`);
//import { inputDataReorder } from (`../"${gSystemConfig.configDirectoryJS}"/functions-syncsystem.js`); //not working
import { inputDataReorder } from '../app_js/functions-syncsystem.js';




//Debug.
alert("Webpack test");

//function webpackDebugTest()
export function webpackDebugTest()
{
    alert("Webpack test - inside function");
}

/*module.exports = {
    webpackDebugTest: webpackDebugTest
};*/

/*
export default {
   inputDataReorder: inputDataReorder
};*/

