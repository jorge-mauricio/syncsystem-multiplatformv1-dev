"use strict";

//Import Node Modules.
//----------------------
//import React from "react";
import React, {Component} from "react";
import ReactDOM from "react-dom";
//----------------------

class FrontendCategoriesListingBody extends Component
{
    exampleMethod()
    {
        console.log("JS is running");
    }

    render()
    {
        return(
            <React.Fragment>
                <div>
                    body exemple
                </div>
                <button onClick={()=>this.exampleMethod()}>
                    Console log text
                </button>
            </React.Fragment>
        );
    }
}

export default FrontendCategoriesListingBody;