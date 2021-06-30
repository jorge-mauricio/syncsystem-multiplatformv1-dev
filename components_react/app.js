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


//Layout templates.
//import LayoutFrontendMain from "../app_views/layout-frontend-main-cb-component.js";
//import LayoutFrontendMain from("../app_views/layout-frontend-main-cb-component.js");
const LayoutFrontendMain = require("../app_views/layout-frontend-main-cb-component.js").default;
const LayoutFrontendIframe = require("../app_views/layout-frontend-iframe-cb-component.js").default;

//Home
import FrontendHome from "./frontend-home-cb-component.js";

//Login.
import FrontendLogin from "./frontend-login-cb-component.js";
import FrontendLogoff from "./frontend-logoff-cb-component.js";

//Categories.
import FrontendCategoriesListing from "./frontend-categories-listing-cb-component.js";
import FrontendCategoriesDetails from "./frontend-categories-details-cb-component.js";

//Content.
import FrontendContentListing from "./frontend-content-listing-cb-component.js";

//Forms.
import FrontendFormsSend from "./frontend-forms-send-cb-component.js";

//Products.
import FrontendProductsListing from "./frontend-products-listing-cb-component.js";
import FrontendProductsDetails from "./frontend-products-details-cb-component.js";

//Publications.
import FrontendPublicationsListing from "./frontend-publications-listing-cb-component.js";
import FrontendPublicationsDetails from "./frontend-publications-details-cb-component.js";

//Quizzes.
import FrontendQuizzesListing from "./frontend-quizzes-listing-cb-component.js";
//import FrontendQuizzesDetails from "./frontend-quizzes-details-cb-component.js";

//Dashboard.
import FrontendDashboard from "./frontend-dashboard-cb-component.js";
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
                    {/*Debug. */}
                    {/*
                    <Route path="/" exact render={props => (
                        <Home {...props =>{

                        }} />
                    )} />
                     */}
                    
                    {/*Layout arquitecture test. */}
                    {/*
                        
                        <Route path="/layout" exact render={props => (
                        <LayoutFrontendMain
                            cphBody={<FrontendCategoriesListing />}
                            {...props}>
                            {/setTitleCurrent={this.setTitleCurrent} / /passing function as prop - not in use / + ''}
                        </LayoutFrontendMain>
                    )} />
                    </SyncSystemNSContextProvider>*/}

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
                    */}
                    
                    
                    {/*Home. */}
                    {/*//---------------------- */}
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
                    {/*//---------------------- */}


                    {/*Login. */}
                    {/*//---------------------- */}
                    <Route exact 
                            path={["/" + gSystemConfig.configRouteFrontendLogin + "/", "/" + gSystemConfig.configRouteFrontend + "/" + gSystemConfig.configRouteFrontendLogin + "/"]} 
                            render={props => (
                                <React.Fragment>
                                    {/*Layout select. */}
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendLogin {...props} />}
                                            {...props}>
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendLogin {...props} />}
                                            {...props}>
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */}


                    {/*Logoff. */}
                    {/*//---------------------- */}
                    <Route exact 
                            path={["/" + gSystemConfig.configRouteFrontendLogoff + "/", "/" + gSystemConfig.configRouteFrontend + "/" + gSystemConfig.configRouteFrontendLogoff + "/"]} 
                            render={props => (
                                <React.Fragment>
                                    {/*Layout select. */}
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendLogoff {...props} />}
                                            {...props}>
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendLogoff {...props} />}
                                            {...props}>
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */}
                    

                    {/*Categories - listing. */}
                    {/*//---------------------- */}
                    {/*http://localhost:3001/categories/123 */}
                    {/*Note: http://localhost:3001/categories/0 - testing with this parameter may cause "TypeError: Cannot read property 'id' of undefined" on the console, since there´s no categary with id = 0 */}
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
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */}
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendCategoriesListing {...props} />}
                                            {...props}>
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */}
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */}


                    {/*Categories - details. */}
                    {/*//---------------------- */}
                    {/*http://localhost:3001/categories/details/123 */}
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
                    {/*//---------------------- */}


                    {/*Content - listing. */}
                    {/*//---------------------- */}
                    {/*http://localhost:3001/content/123 */}
                    {/*Note: http://localhost:3001/categories/0 - testing with this parameter may cause "TypeError: Cannot read property 'id' of undefined" on the console, since there´s no categary with id = 0 */}
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
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */}
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendContentListing {...props} />}
                                            {...props}>
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */}
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */}


                    {/*Forms - send. */}
                    {/*//---------------------- */}
                    {/*http://localhost:3001/forms/send/904 */}
                    <Route exact 
                            path={"/" + gSystemConfig.configRouteFrontendForms + "/" + gSystemConfig.configRouteFrontendActionSend + "/:idTbForms?"} 
                            render={props => (
                                <React.Fragment>
                                    {/*Layout select. */}
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendFormsSend {...props} />}
                                            {...props}>
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendFormsSend {...props} />}
                                            {...props}>
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */}
                    

                    {/*Products - listing. */}
                    {/*//---------------------- */}
                    {/*Debug: http://localhost:3001/products/960/ */}
                    <Route exact 
                            path={"/" + gSystemConfig.configRouteFrontendProducts + "/:idParentProducts?"} 
                            render={props => (
                                <React.Fragment>
                                    {/*Layout select. */}
                                    { /*new URLSearchParams(props.location.search).get("masterPageSelect") == "layout-frontend-iframe" ?*/ }
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendProductsListing {...props} />}
                                            {...props}>
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */}
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendProductsListing {...props} />}
                                            {...props}>
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */}
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */}


                    {/*Products - details. */}
                    {/*//---------------------- */}
                    {/*http://localhost:3001/products/details/1291 */}
                    <Route exact 
                            path={"/" + gSystemConfig.configRouteFrontendProducts + "/" + gSystemConfig.configRouteFrontendDetails + "/:idTbProducts?"} 
                            render={props => (
                                <React.Fragment>
                                    {/*Layout select. */}
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendProductsDetails {...props} />}
                                            {...props}>
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendProductsDetails {...props} />}
                                            {...props}>
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */}


                    {/*Publications - listing. */}
                    {/*//---------------------- */}
                    {/*Debug: http://localhost:3001/publications/1369/ */}
                    <Route exact 
                            path={"/" + gSystemConfig.configRouteFrontendPublications + "/:idParentPublications?"} 
                            render={props => (
                                <React.Fragment>
                                    {/*Layout select. */}
                                    { /*new URLSearchParams(props.location.search).get("masterPageSelect") == "layout-frontend-iframe" ?*/ }
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendPublicationsListing {...props} />}
                                            {...props}>
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */}
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendPublicationsListing {...props} />}
                                            {...props}>
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */}
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */}


                    {/*Publications - details. */}
                    {/*//---------------------- */}
                    {/*http://localhost:3001/publications/details/1291 */}
                    <Route exact 
                            path={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/:idTbPublications?"} 
                            render={props => (
                                <React.Fragment>
                                    {/*Layout select. */}
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendPublicationsDetails {...props} />}
                                            {...props}>
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendPublicationsDetails {...props} />}
                                            {...props}>
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */}


                    {/*Quizzes - listing. */}
                    {/*//---------------------- */}
                    {/*Debug: http://localhost:3001/quizzes/1648/ */}
                    <Route exact 
                            path={"/" + gSystemConfig.configRouteFrontendQuizzes + "/:idParentQuizzes?"} 
                            render={props => (
                                <React.Fragment>
                                    {/*Layout select. */}
                                    { /*new URLSearchParams(props.location.search).get("masterPageSelect") == "layout-frontend-iframe" ?*/ }
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendQuizzesListing {...props} />}
                                            {...props}>
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */}
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendQuizzesListing {...props} />}
                                            {...props}>
                                                {/*setTitleCurrent={this.setTitleCurrent} */ /*passing function as prop - not in use */}
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */}


                    {/*Dashboard. */}
                    {/*//---------------------- */}
                    <Route exact 
                            path={["/" + gSystemConfig.configRouteFrontendDashboard + "/", "/" + gSystemConfig.configRouteFrontend + "/" + gSystemConfig.configRouteFrontendDashboard + "/"]} 
                            render={props => (
                                <React.Fragment>
                                    {/*Layout select. */}
                                    { this._masterPageFrontendSelect == "layout-frontend-iframe" ?
                                        <LayoutFrontendIframe
                                            cphBody={<FrontendDashboard {...props} />}
                                            {...props}>
                                        </LayoutFrontendIframe>
                                    :
                                        <LayoutFrontendMain
                                            cphBody={<FrontendDashboard {...props} />}
                                            {...props}>
                                        </LayoutFrontendMain>
                                    }
                                </React.Fragment>
                            )} 
                    />
                    {/*//---------------------- */}
                </Switch>
            </SyncSystemNSContextProvider>
        )
    }
    //**************************************************************************************
}

//export default App;
export default withRouter(App);