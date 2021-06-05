"use strict";

//Import Node Modules.
//----------------------
//const gSystemConfig = require("../config-application.js"); //System configuration.
//const FunctionsGeneric = require("../" + gSystemConfig.configDirectoryComponents + "/functions-generic.js");
//const FunctionsCrypto = require("../" + gSystemConfig.configDirectoryComponents + "/functions-crypto.js");

//Context.
import { SyncSystemNSContext } from "./syncsystem-ns-cb-context.js";

//const _ = require('lodash'); //Loadash

//import React from "react";
import React, {Component} from "react";
import ReactDOM from "react-dom";
//import reactSafe from "react-safe";
//import { Link } from 'react-router-dom';
//----------------------


class FrontendBannersRecord extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;

    
    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //configLayoutType: 1 - listing (custom) | 2 - slide show (custom) | 22 - slide show (bootstrap) 
        //configDisplay: "vertical" | "horizontal"


        super(props, context);
        /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */
        //Bind methods.
        //this.handleSubmit = this.handleFormSubmit.bind(this);


        //Properties.
        //----------------------
        this.configLayoutType;
        this.configDisplay;
        this.arrBannersListing;
        //----------------------


        //Define values - props parameters.
        //----------------------
        this.configLayoutType = this.props.configLayoutType;
        this.configDisplay = this.props.configDisplay;
        this.arrBannersListing = this.props.arrBannersListing;
        //----------------------


        //State creation.
        /*
        this.state = {
            //arrCategoriesListing: this.props.arrCategoriesListing
            //arrCategoriesListing: props.arrCategoriesListing
            arrCategoriesListing: []
        };
        */


        //Debug.
        //console.log("props=", props);
    }
    //**************************************************************************************
    

    //Lifecycle method.
    //**************************************************************************************
    //componentDidMount()
    async componentDidMount()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;


        //Main build.
        //await this.build();

        //Logic.
        //----------------------
        try
        {
            //gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main";
            //var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);

        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{

        }


        //Debug.
        //this.setState({ arrCategoriesListing: this.props.arrCategoriesListing });
        //console.log("this.props=", this.props);
    }
    //**************************************************************************************


    //Render.
    //**************************************************************************************
    render()
    //async render()
    {
        //Variables.
        //----------------------
        //const { gSystemConfig, FunctionsGeneric, FunctionsCrypto } = this.context;
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem,  HTMLReactParser } = this.context;

        var configLayoutType;
        var configDisplay;
        var arrBannersListing;
        //----------------------


        //Define values.
        //----------------------
        configLayoutType = this.configLayoutType;
        configDisplay = this.configDisplay;
        arrBannersListing = this.arrBannersListing;


        //Debug.
        console.log("configLayoutType(details record)=", configLayoutType);
        console.log("configDisplay(details record)=", configDisplay);
        //console.log("arrBannersListing(details record)=", arrBannersListing);
        //----------------------


        //Output.
        //----------------------
        return(
            <React.Fragment>
                { /*Slide show (custom).*/ }
                {configLayoutType == 2 ?
                    <div>
                        <img src={"" + gSystemConfig.configDirectoryFilesLayoutSD + "/layout-frontend-home-banner1.jpg"} alt="Banner" />
                    </div>
                :
                ``}
                

                { /*Slide show (bootstrap).*/ }
                { configLayoutType == 22 ?
                    <React.Fragment>
                        { /*Desktop.*/ }
                        <div className="d-none d-lg-block" style={{position: "relative", display: "block", width: "100%", height: "525px;", overflow: "hidden"}}>
                            <div id="bannersSlideshowBootstrap22" className="carousel slide carousel-fade" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div style={{position: "relative", display: "block", width: "100%", height: "525px", backgroundImage: "url(/files-layout/layout-frontend-home-banner1.jpg)", backgroundPosition: "center center"}}>

                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div style={{position: "relative", display: "block", width: "100%", height: "525px", backgroundImage: "url(/files-layout/layout-frontend-home-banner2.jpg)", backgroundPosition: "center center"}}>

                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div style={{position: "relative", display: "block", width: "100%", height: "525px", backgroundImage: "url(/files-layout/layout-frontend-home-banner3.jpg)", backgroundPosition: "center center"}}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        

                        { /*Mobile.*/ }
                        <div className="d-lg-none" style={{position: "relative", display: "block", width: "100%", height: "275px;", overflow: "hidden"}}>
                            <div id="bannersSlideshowBootstrap22" className="carousel slide carousel-fade" data-ride="carousel">
                                <div className="carousel-inner">
                                    <div className="carousel-item active">
                                        <div style={{position: "relative", display: "block", width: "100%", height: "275px", backgroundImage: "url(/files-layout/layout-frontend-mobile-home-banner1.jpg)", backgroundPosition: "center center"}}>

                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div style={{position: "relative", display: "block", width: "100%", height: "275px", backgroundImage: "url(/files-layout/layout-frontend-mobile-home-banner2.jpg)", backgroundPosition: "center center"}}>

                                        </div>
                                    </div>
                                    <div className="carousel-item">
                                        <div style={{position: "relative", display: "block", width: "100%", height: "275px", backgroundImage: "url(/files-layout/layout-frontend-mobile-home-banner3.jpg)", backgroundPosition: "center center"}}>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </React.Fragment>
                :
                ``}
            </React.Fragment>
        );
        //----------------------
    }    
    //**************************************************************************************

}


export default FrontendBannersRecord;