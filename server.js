"use strict";

//Import Node Modules.
//----------------------
require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.

const http = require("http"); //HTTP Module
const express = require("express"); //Express Framework.
const path = require("path"); //Necessary to serve static files.
//----------------------


//Objects instances.
//----------------------
const app = express(); //init express
//const appBackend = express();
//----------------------


app
  .use('/app', require('./app.js').app)
  .use('/app-react', require('./app-react.js').app)
  .listen(3000);
