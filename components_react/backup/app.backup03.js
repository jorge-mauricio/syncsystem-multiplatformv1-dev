"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.

//Node modules.
const qs = require('query-string');

import React from "react";
import { Switch, Route } from "react-router";
import { withRouter } from 'react-router-dom';

//Provider.
import SyncSystemNSContextProvider from "./syncsystem-ns-cb-context.js";

//Components.
//import Home from "./testHomePageComponent.js"; //Debug.

//Layoouts
import LayoutFrontendMainMulti from "../app_views/layout-frontend-main-multi-cb-component.js";
//import LayoutFrontendMain from "../app_views/layout-frontend-main-cb-component.js";
//import LayoutFrontendMain from("../app_views/layout-frontend-main-cb-component.js");
const LayoutFrontendMain = require("../app_views/layout-frontend-main-cb-component.js").default; //working
const LayoutFrontendIframe = require("../app_views/layout-frontend-iframe-cb-component.js").default; //working

//Home
import FrontendHome from "./frontend-home-cb-component";

//Categories.
import FrontendCategoriesListing from "./frontend-categories-listing-cb-component.js";
import FrontendCategoriesDetails from "./frontend-categories-details-cb-component.js";

import FrontendCategoriesListingBody from "./frontend-categories-listing-body-cb-component.js"; //Testing
import FrontendCategoriesListingHead from "./frontend-categories-listing-head-cb-component.js"; //Testing
import FrontendCategoriesListingTitle from "./frontend-categories-listing-title-cb-component.js"; //Testing
import FrontendCategoriesListingTitleCurrent from "./frontend-categories-listing-title-current-cb-component.js"; //Testing

//Content.
import FrontendContentListing from "./frontend-content-listing-cb-component.js";
//----------------------


class App extends React.Component {
    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        super(props, context);
        //super(location);


        //Properties.
        //----------------------
        this.objParametersQueryString = qs.parse(this.props.location.search);
        
        this._masterPageFrontendSelect = "";
        //----------------------


        //Value definition - props parameters.
        //----------------------
        if(this.objParametersQueryString.masterPageFrontendSelect)
        {
            this._masterPageFrontendSelect = this.objParametersQueryString.masterPageFrontendSelect;
        }
        //----------------------


        //State creation.
        /*this.state = {
            //titleCurrent: "old title"
            //titleCurrent: ""
        }*/
        

        //Bind with method.
        //this.handleChange = this.handleChange.bind(this);
        //this.setTitleCurrent = this.setTitleCurrent.bind(this);


        //Debug.
        //console.log("props(constructor)=", this.props);
        //console.log("this.objParametersQueryString(constructor)=", this.objParametersQueryString);
    }
    //**************************************************************************************


    //Render method.
    //**************************************************************************************
    render(){
        //Variables - style objects.
        //var masterPageFrontendSelect = this._masterPageFrontendSelect;
        //var masterPageSelect = new URLSearchParams( location. search).get('masterPageSelect');
        //var objParameters = new URLSearchParams(this.props.location.search);
        //var objParameters = qs.parse(this.props.location.search);


        //Debug.
        //console.log("props(render)=", this.props);
        //console.log("objParameters(render)=", objParameters);
        //console.log("context.url(render)=", context.url);
        

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
                    {/*Debug. */ + ''}
                    {/*
                    <Route path="/" exact render={props => (
                        <Home {...props =>{

                        }} />
                    )} />
                     */ + ''}
                    
                    {/*Layout arquitecture test. */ + ''}
                    {/*
                        
                        <Route path="/layout" exact render={props => (
                        <LayoutFrontendMain
                            cphBody={<FrontendCategoriesListing />}
                            {...props}>
                            {/setTitleCurrent={this.setTitleCurrent} / /passing function as prop - not in use / + ''}
                        </LayoutFrontendMain>
                    )} />
                    </SyncSystemNSContextProvider>*/ + ''}

                    {/*
                    working - experiment
                    <Route path="/layoutmulti" exact render={props => (
                        <LayoutFrontendMainMulti 
                            cphHead={<FrontendCategoriesListingHead />}
                            cphTitle={<FrontendCategoriesListingTitle />} 
                            cphTitleCurrent={<FrontendCategoriesListingTitleCurrent />} 
                            cphBody={<FrontendCategoriesListingBody />} 
                            {...props}>

                        </LayoutFrontendMainMulti>
                    )} />
                    */ + ''}
                    
                    

                    {/*Home. */ + ''}
                    {/*//---------------------- */ + ''}
                    <Route exact 
                            path={["/", "/" + gSystemConfig.configRouteFrontend + "/"]} 
                            render={props => (
                                <React.Fragment>
                                    {/*Debug. */}
                                    {/*console.log("Route - Home=true")*/}
                                    
                                    {/*Layout select. */}
                                    { /*new URLSearchParams(props.location.search).get("masterPageSelect") == "layout-frontend-iframe" ?*/ }
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendHome {...props} />}
                                            {...props}>
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendHome {...props} />}
                                            {...props}>
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */ + ''}
                    

                    {/*Categories - listing. */ + ''}
                    {/*//---------------------- */ + ''}
                    {/*http://localhost:3001/categories/123 */ + ''}
                    {/*Note: http://localhost:3001/categories/0 - testing with this parameter may cause "TypeError: Cannot read property 'id' of undefined" on the console, since there´s no categary with id = 0 */ + ''}
                    <Route exact 
                            path={"/" + gSystemConfig.configRouteFrontendCategories + "/:idParentCategories?"} 
                            render={props => (
                                
                                <React.Fragment>
                                    {/*Debug. */}
                                    { /*console.log("props(route)=", props)*/ }
                                    { /*console.log("props.location.search(route)=", props.location.search)*/ }
                                    

                                    {/*Layout select. */}
                                    { /*new URLSearchParams(props.location.search).get("masterPageSelect") == "layout-frontend-iframe" ?*/ }
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendCategoriesListing {...props} />}
                                            {...props}>
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */ + ''}
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendCategoriesListing {...props} />}
                                            {...props}>
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */ + ''}
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */ + ''}


                    {/*Categories - details. */ + ''}
                    {/*//---------------------- */ + ''}
                    {/*http://localhost:3001/categories/details/123 */ + ''}
                    <Route exact 
                            path={"/" + gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/:idTbCategories?"} 
                            render={props => (
                                <React.Fragment>
                                    {/*Layout select. */}
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendCategoriesDetails {...props} />}
                                            {...props}>
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendCategoriesDetails {...props} />}
                                            {...props}>
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */ + ''}


                    {/*Content - listing. */ + ''}
                    {/*//---------------------- */ + ''}
                    {/*http://localhost:3001/content/123 */ + ''}
                    {/*Note: http://localhost:3001/categories/0 - testing with this parameter may cause "TypeError: Cannot read property 'id' of undefined" on the console, since there´s no categary with id = 0 */ + ''}
                    <Route exact 
                            path={"/" + gSystemConfig.configRouteFrontendContent + "/:idParentContent?"} 
                            render={props => (
                                <React.Fragment>
                                    {/*Layout select. */}
                                    { /*new URLSearchParams(props.location.search).get("masterPageSelect") == "layout-frontend-iframe" ?*/ }
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendContentListing {...props} />}
                                            {...props}>
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */ + ''}
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendContentListing {...props} />}
                                            {...props}>
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */ + ''}
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */ + ''}


                </Switch>
            </SyncSystemNSContextProvider>
        )
    }
    //**************************************************************************************
}

//export default App;
export default withRouter(App);