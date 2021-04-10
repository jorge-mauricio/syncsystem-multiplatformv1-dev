"use strict";

//Import Node Modules.
//----------------------
//const gSystemConfig = require("../config-application.js"); //System configuration.
//const FunctionsGeneric = require("../" + gSystemConfig.configDirectoryComponents + "/functions-generic.js");
//const FunctionsCrypto = require("../" + gSystemConfig.configDirectoryComponents + "/functions-crypto.js");

//Context.
import { SyncSystemNSContext } from "./syncsystem-ns-cb-context.js";

//import React from "react";
import React, {Component} from "react";
import ReactDOM from "react-dom";
//import { Link } from 'react-router-dom';
//----------------------


class FrontendFilesImagesListingRecord extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;

    
    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //arrFilesListing: (array of objects)
        //configLayoutType:  1 - thumbnails (custom) | 11 - thumbnails (bootstrap) | 42 - slider BxSlider (custom)
        //configFilesZoom: 0 - disabled | 1 - JQuery ElevateZoom | 2 - JQuery PanZoom


        super(props, context);
        /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */


        //Properties.
        //----------------------
        this.arrFilesListing;
        this.configLayoutType;
        this.configFilesZoom;
        //----------------------


        //Define values - props parameters.
        //----------------------
        this.arrFilesListing = this.props.arrFilesListing;
        this.configLayoutType = this.props.configLayoutType;
        this.configFilesZoom = this.props.configFilesZoom;
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
    componentDidMount()
    {
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
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser, Safe } = this.context;
        var arrFilesListing;
        var configLayoutType;
        var configFilesZoom;
        //----------------------


        //Define values.
        //----------------------
        arrFilesListing = this.arrFilesListing;
        configLayoutType = this.configLayoutType;
        configFilesZoom = this.configFilesZoom;


        //Debug.
        //console.log("arrFilesListing (frontend files listing recor)=", arrFilesListing);
        //console.log("configLayoutType (frontend files listing recor)=", configLayoutType);
        //console.log("configFilesZoom (frontend files listing recor)=", configFilesZoom);
        //----------------------


        //thumbnails (custom).
        //----------------------
        if(configLayoutType == 1)
        {
            if(arrFilesListing.length > 0)
            {
                //Output.
                return(
                    <React.Fragment>
                        <div className="ss-frontend-files-listing-container ss-frontend-files-text01">
                            {arrFilesListing.map((filesRow, filesRowKey)=>{
                                return(
                                    //Row.
                                    <div key={filesRowKey} className="ss-frontend-files-container">
                                        <img src={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + filesRow.file} 
                                            alt={ SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") } 
                                            className="ss-frontend-files-image01" />

                                        <div className="ss-frontend-files-caption01">
                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") }
                                        </div>
                                        { /*
                                        id = { filesRow.id }
                                        */ }
                                    </div>
                                );
                            })}
                        </div>
                    </React.Fragment>
                );
            }else{
                //Empty.
                return(
                    <React.Fragment>
                        
                    </React.Fragment>
                );
            }
        }
        //----------------------


        //thumbnails (bootstrap).
        //----------------------
        if(configLayoutType == 11)
        {
            if(arrFilesListing.length > 0)
            {
                //Output.
                return(
                    <React.Fragment>
                        <div className="container ss-frontend-files-text01">
                            <div className="row text-center text-lg-left">
                                {arrFilesListing.map((filesRow, filesRowKey)=>{
                                    return(
                                        //Row.
                                        <div key={filesRowKey} 
                                            className="col-lg-3 col-md-4 col-6" 
                                            style={{marginBottom: "20px"}}>

                                            <a href={""} 
                                                className="d-block text-center" 
                                                title={SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db")}>
                                                <img src={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + filesRow.file} 
                                                    alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db")}
                                                    className="img-fluid img-thumbnail" />
                                            </a>
                                            <div className="ss-frontend-files-caption01">
                                                { SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") }
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </React.Fragment>
                );
            }else{
                //Empty.
                return(
                    <React.Fragment>
                        
                    </React.Fragment>
                );
            }
        }
        //----------------------
    }    
    //**************************************************************************************
}


export default FrontendFilesImagesListingRecord;