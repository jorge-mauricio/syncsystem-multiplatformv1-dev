import React from "react";
import { Switch, Route } from "react-router";

import Home from "./testHomePageComponent.js";

import LayoutFrontendMainMulti from "../app_views/layout-frontend-main-multi-cb-component.js";
import LayoutFrontendMain from "../app_views/layout-frontend-main-cb-component.js";

import FrontendCategoriesListing from "./frontend-categories-listing-cb-component.js";
import FrontendCategoriesListingBody from "./frontend-categories-listing-body-cb-component.js";
import FrontendCategoriesListingHead from "./frontend-categories-listing-head-cb-component.js";
import FrontendCategoriesListingTitle from "./frontend-categories-listing-title-cb-component.js";
import FrontendCategoriesListingTitleCurrent from "./frontend-categories-listing-title-current-cb-component.js";

class App extends React.Component {
    //Main method.
    render(){
        //Variables - style objects.


        //Display logic.


        //Use class methods
        //this.myclassmethods();


        return(
            <Switch>
                <Route path="/" exact render={props => (
                    <Home {...props} />
                )} />

                <Route path="/layout" render={props => (
                    <LayoutFrontendMain
                        cphBody={<FrontendCategoriesListing />} 
                        {...props}>

                    </LayoutFrontendMain>
                )} />

                <Route path="/layoutmulti" render={props => (
                    <LayoutFrontendMainMulti 
                        cphHead={<FrontendCategoriesListingHead />}
                        cphTitle={<FrontendCategoriesListingTitle />} 
                        cphTitleCurrent={<FrontendCategoriesListingTitleCurrent />} 
                        cphBody={<FrontendCategoriesListingBody />} 
                        {...props}>

                    </LayoutFrontendMainMulti>
                )} />
            </Switch>
        )
    }
}

export default App;