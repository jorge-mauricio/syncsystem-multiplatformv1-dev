"use strict";

//Import Node Modules.
//----------------------
import 'babel-polyfill';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import App from "./app.js";
import ContextProvider from './context-provider.js';
//----------------------

const context = {
    insertCss: (...styles) => {
      const removeCss = styles.map(x => x._insertCss());
      return () => {
        removeCss.forEach(f => f());
      };
    },
}

ReactDOM.hydrate(
    <ContextProvider context={context}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ContextProvider>,
    document.querySelector("#root")
);