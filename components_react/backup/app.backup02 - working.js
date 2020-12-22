"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.

import React from "react";
import { Switch, Route } from "react-router";

//Provider.
import SyncSystemNSContextProvider from "./syncsystem-ns-cb-context.js";

//Components.
import Home from "./testHomePageComponent.js";

import LayoutFrontendMainMulti from "../app_views/layout-frontend-main-multi-cb-component.js";
//import LayoutFrontendMain from "../app_views/layout-frontend-main-cb-component.js";
//import LayoutFrontendMain from("../app_views/layout-frontend-main-cb-component.js");
const LayoutFrontendMain = require("../app_views/layout-frontend-main-cb-component.js").default; //working
const LayoutFrontendIframe = require("../app_views/layout-frontend-iframe-cb-component.js").default; //working

import FrontendCategoriesListing from "./frontend-categories-listing-cb-component.js";

import FrontendCategoriesListingBody from "./frontend-categories-listing-body-cb-component.js";
import FrontendCategoriesListingHead from "./frontend-categories-listing-head-cb-component.js";
import FrontendCategoriesListingTitle from "./frontend-categories-listing-title-cb-component.js";
import FrontendCategoriesListingTitleCurrent from "./frontend-categories-listing-title-current-cb-component.js";
//----------------------


class App extends React.Component {
    //Main method.
    render(){
        //Variables - style objects.


        //Display logic.


        //Use class methods
        //this.myclassmethods();

        /*
                <Route path="/layout" exact render={props => (
                    <FrontendCategoriesListing {...props}>

                    </FrontendCategoriesListing>
                )} />
        */

        //setTitleCurrent={this.setState} 
        return(
            <SyncSystemNSContextProvider>
                <Switch>
                    <Route path="/" exact render={props => (
                        <Home {...props} />
                    )} />

                    
                    {/*Layout arquitecture test. */ + ''}
                    <Route path="/layout" exact render={props => (
                        <LayoutFrontendMain
                            cphBody={<FrontendCategoriesListing />}
                            {...props}>
                            {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */ + ''}
                        </LayoutFrontendMain>
                    )} />
                    

                    {/*Categories. */ + ''}
                    {/*http://localhost:3001/categories */ + ''}
                    <Route path={"/" + gSystemConfig.configRouteFrontendCategories + "/:idParentCategories?"} exact render={props => (
                        <LayoutFrontendMain
                            cphBody={<FrontendCategoriesListing {...props} />}
                            {...props}>
                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */ + ''}
                        </LayoutFrontendMain>
                    )} />
                    

                    <Route path="/layoutmulti" exact render={props => (
                        <LayoutFrontendMainMulti 
                            cphHead={<FrontendCategoriesListingHead />}
                            cphTitle={<FrontendCategoriesListingTitle />} 
                            cphTitleCurrent={<FrontendCategoriesListingTitleCurrent />} 
                            cphBody={<FrontendCategoriesListingBody />} 
                            {...props}>

                        </LayoutFrontendMainMulti>
                    )} />
                </Switch>
            </SyncSystemNSContextProvider>
        )
    }
}

export default App;