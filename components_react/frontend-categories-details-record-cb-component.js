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


class FrontendCategoriesDetailsRecord extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //ConfigLayoutType: 2 - div layout (custom) | 22 - div layout (bootstrap) | 222 - div layout (dashboard - custom) 


        super(props, context);
        /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */

        //Properties.
        //----------------------
        /*this.resultsCategoriesFiltersGeneric1Listing;
        this.resultsCategoriesFiltersGeneric2Listing;
        this.resultsCategoriesFiltersGeneric3Listing;
        this.resultsCategoriesFiltersGeneric4Listing;
        this.resultsCategoriesFiltersGeneric5Listing;
        this.resultsCategoriesFiltersGeneric6Listing;
        this.resultsCategoriesFiltersGeneric7Listing;
        this.resultsCategoriesFiltersGeneric8Listing;
        this.resultsCategoriesFiltersGeneric9Listing;
        this.resultsCategoriesFiltersGeneric10Listing;

        this.resultsCategoriesStatusListing;
        */
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


    //Build object´s content.
    //**************************************************************************************
    async build()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;


        //Logic.
        //----------------------
        try
        {
            //Filter results acording to filter_index.
            /*if(gSystemConfig.enableCategoriesFilterGeneric1 != 0)
            {
                this.resultsCategoriesFiltersGeneric1Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                    return obj.filter_index == 101;
                    //console.log("obj = ", obj);
                });
                //console.log("ofglRecords.resultsFiltersGenericListing = ", ofglRecords.resultsFiltersGenericListing);
                //console.log("resultsFiltersGeneric1Listing = ", resultsFiltersGeneric1Listing);
            }*/
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{

        }
        //----------------------


        //Debug.
        //console.log("this.resultsCategoriesFiltersGeneric1Listing=", this.resultsCategoriesFiltersGeneric1Listing);
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
        var configLayoutType = null;
        var objCategoriesDetails;
        //----------------------


        //Define values.
        //----------------------
        configLayoutType = this.props.configLayoutType;
        objCategoriesDetails = this.props.objCategoriesDetails;
        //arrCategoriesListing = await this.props.arrCategoriesListing;
        //----------------------


        //Debug.
        //console.log("objCategoriesDetails(details record)=", objCategoriesDetails);
        

        //Div (custom).
        //----------------------
        if(configLayoutType == 2)
        {
            //if(_.isEmpty(objCategoriesDetails) === true)
            //{
                //Not empty.
                return(
                    <div className="ss-frontend-categories-details-text01">
                        <figure className="ss-frontend-categories-details-image01-container">
                            { objCategoriesDetails.tblCategoriesImageMain != "" ?
                                <React.Fragment>
                                    { /*No pop-up.*/'' }
                                    { gSystemConfig.configImagePopup == 0 ? 
                                        <img src={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objCategoriesDetails.tblCategoriesImageMain } 
                                            alt={ objCategoriesDetails.tblCategoriesTitle } 
                                            className="ss-frontend-categories-details-image01" />
                                        : ``
                                    }

                                    { /*GLightbox.*/'' }
                                    { /*TODO: Not working.*/'' }
                                    { /*Research: https://www.npmjs.com/package/react-image-lightbox.*/'' }
                                    { gSystemConfig.configImagePopup == 4 ? 
                                        <React.Fragment>
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + objCategoriesDetails.tblCategoriesImageMain }
                                                title={ objCategoriesDetails.tblCategoriesTitle } 
                                                className="glightbox_categories_image_main"
                                                data-glightbox={"title:" + objCategoriesDetails.tblCategoriesTitle + ";"}>
                                                <img src={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objCategoriesDetails.tblCategoriesImageMain } 
                                                    alt={ objCategoriesDetails.tblCategoriesTitle } 
                                                    className="ss-frontend-categories-details-image01" />
                                            </a>
                                            { HTMLReactParser(`
                                                <script type="text/babel">
                                                //$(document).ready(function() {
                                                    gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main";
                                                    var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                //});
                                                </script>
                                            `) }
                                        </React.Fragment>
                                        : ``
                                    }
                                </React.Fragment>
                            :
                                <React.Fragment>
                                    { /*Placeholder.*/ }
                                    { gSystemConfig.configCategoriesImagePlaceholder == 1 ? 
                                        <img src={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesLayoutSD + "/frontend-layout-image-placeholder-t0.png" } 
                                            alt={ objCategoriesDetails.tblCategoriesTitle } 
                                            className="ss-frontend-categories-details-image01" />
                                        : ``
                                    }
                                </React.Fragment>
                            }

                            <figcaption>
                                { objCategoriesDetails.tblCategoriesTitle }
                            </figcaption>
                        </figure>

                        { /*Row content.*/ }
                        <p style={{position: "relative", display: "block", overflow: "hidden"}}>
                            { /*Information 1.*/ }
                            { gSystemConfig.enableCategoriesInfo1 == 1 && gSystemConfig.configCategoriesInfo1FieldType == 2 && objCategoriesDetails.tblCategoriesInfo1 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo1") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo1) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 2.*/ }
                            { gSystemConfig.enableCategoriesInfo2 == 1 && gSystemConfig.configCategoriesInfo2FieldType == 2 && objCategoriesDetails.tblCategoriesInfo2 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo2") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo2) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 3.*/ }
                            { gSystemConfig.enableCategoriesInfo3 == 1 && gSystemConfig.configCategoriesInfo3FieldType == 2 && objCategoriesDetails.tblCategoriesInfo3 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo3") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo3) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 4.*/ }
                            { gSystemConfig.enableCategoriesInfo4 == 1 && gSystemConfig.configCategoriesInfo4FieldType == 2 && objCategoriesDetails.tblCategoriesInfo4 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo4") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo4) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 5.*/ }
                            { gSystemConfig.enableCategoriesInfo5 == 1 && gSystemConfig.configCategoriesInfo5FieldType == 2 && objCategoriesDetails.tblCategoriesInfo5 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo5") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo5) }
                                    </div>
                                </div>
                                : ``
                            }
                            
                            { /*Information 6.*/ }
                            { gSystemConfig.enableCategoriesInfo6 == 1 && gSystemConfig.configCategoriesInfo6FieldType == 2 && objCategoriesDetails.tblCategoriesInfo6 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo6") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo6) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 7.*/ }
                            { gSystemConfig.enableCategoriesInfo7 == 1 && gSystemConfig.configCategoriesInfo7FieldType == 2 && objCategoriesDetails.tblCategoriesInfo7 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo7") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo7) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 8.*/ }
                            { gSystemConfig.enableCategoriesInfo8 == 1 && gSystemConfig.configCategoriesInfo8FieldType == 2 && objCategoriesDetails.tblCategoriesInfo8 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo8") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo8) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 9.*/ }
                            { gSystemConfig.enableCategoriesInfo9 == 1 && gSystemConfig.configCategoriesInfo9FieldType == 2 && objCategoriesDetails.tblCategoriesInfo9 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo9") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo9) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 10.*/ }
                            { gSystemConfig.enableCategoriesInfo10 == 1 && gSystemConfig.configCategoriesInfo10FieldType == 2 && objCategoriesDetails.tblCategoriesInfo10 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo10") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo10) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 1.*/ }
                            { gSystemConfig.enableCategoriesInfoS1 == 1 && gSystemConfig.configCategoriesInfoS1FieldType == 2 && objCategoriesDetails.tblCategoriesInfoSmall1 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfoS1") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfoSmall1) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 2.*/ }
                            { gSystemConfig.enableCategoriesInfoS2 == 1 && gSystemConfig.configCategoriesInfoS2FieldType == 2 && objCategoriesDetails.tblCategoriesInfoSmall2 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfoS2") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfoSmall2) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 3.*/ }
                            { gSystemConfig.enableCategoriesInfoS3 == 1 && gSystemConfig.configCategoriesInfoS3FieldType == 2 && objCategoriesDetails.tblCategoriesInfoSmall3 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfoS3") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfoSmall3) }
                                    </div>
                                </div>
                                : ``
                            }
                            
                            { /*Information Small 4.*/ }
                            { gSystemConfig.enableCategoriesInfoS4 == 1 && gSystemConfig.configCategoriesInfoS4FieldType == 2 && objCategoriesDetails.tblCategoriesInfoSmall4 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfoS4") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfoSmall4) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 5.*/ }
                            { gSystemConfig.enableCategoriesInfoS5 == 1 && gSystemConfig.configCategoriesInfoS5FieldType == 2 && objCategoriesDetails.tblCategoriesInfoSmall5 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <div className="ss-frontend-categories-details-content-row-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfoS5") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-row-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfoSmall5) }
                                    </div>
                                </div>
                                : ``
                            }
                        </p>


                        { /*Block content.*/ }
                        <p style={{position: "relative", display: "block", overflow: "hidden"}}>
                            { /*Information 1.*/ }
                            { gSystemConfig.enableCategoriesInfo1 == 1 && gSystemConfig.configCategoriesInfo1FieldType == 1 && objCategoriesDetails.tblCategoriesInfo1 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo1") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo1) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 2.*/ }
                            { gSystemConfig.enableCategoriesInfo2 == 1 && gSystemConfig.configCategoriesInfo2FieldType == 1 && objCategoriesDetails.tblCategoriesInfo2 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo2") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo2) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 3.*/ }
                            { gSystemConfig.enableCategoriesInfo3 == 1 && gSystemConfig.configCategoriesInfo3FieldType == 1 && objCategoriesDetails.tblCategoriesInfo3 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo3") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo3) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 4.*/ }
                            { gSystemConfig.enableCategoriesInfo4 == 1 && gSystemConfig.configCategoriesInfo4FieldType == 1 && objCategoriesDetails.tblCategoriesInfo4 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo4") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo4) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 5.*/ }
                            { gSystemConfig.enableCategoriesInfo5 == 1 && gSystemConfig.configCategoriesInfo5FieldType == 1 && objCategoriesDetails.tblCategoriesInfo5 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo5") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo5) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 6.*/ }
                            { gSystemConfig.enableCategoriesInfo6 == 1 && gSystemConfig.configCategoriesInfo6FieldType == 1 && objCategoriesDetails.tblCategoriesInfo6 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo6") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo6) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 7.*/ }
                            { gSystemConfig.enableCategoriesInfo7 == 1 && gSystemConfig.configCategoriesInfo7FieldType == 1 && objCategoriesDetails.tblCategoriesInfo7 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo7") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo7) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 8.*/ }
                            { gSystemConfig.enableCategoriesInfo8 == 1 && gSystemConfig.configCategoriesInfo8FieldType == 1 && objCategoriesDetails.tblCategoriesInfo8 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo8") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo8) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 9.*/ }
                            { gSystemConfig.enableCategoriesInfo9 == 1 && gSystemConfig.configCategoriesInfo9FieldType == 1 && objCategoriesDetails.tblCategoriesInfo9 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo9") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo9) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 10.*/ }
                            { gSystemConfig.enableCategoriesInfo10 == 1 && gSystemConfig.configCategoriesInfo10FieldType == 1 && objCategoriesDetails.tblCategoriesInfo10 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo10") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfo10) }
                                    </div>
                                </div>
                                : ``
                            } 
                            

                            { /*Information Small 1.*/ }
                            { gSystemConfig.enableCategoriesInfoS1 == 1 && gSystemConfig.configCategoriesInfoS1FieldType == 1 && objCategoriesDetails.tblCategoriesInfoSmall1 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfoS1") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfoSmall1) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 2.*/ }
                            { gSystemConfig.enableCategoriesInfoS2 == 1 && gSystemConfig.configCategoriesInfoS2FieldType == 1 && objCategoriesDetails.tblCategoriesInfoSmall2 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfoS2") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfoSmall2) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 3.*/ }
                            { gSystemConfig.enableCategoriesInfoS3 == 1 && gSystemConfig.configCategoriesInfoS3FieldType == 1 && objCategoriesDetails.tblCategoriesInfoSmall3 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfoS3") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfoSmall3) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 4.*/ }
                            { gSystemConfig.enableCategoriesInfoS4 == 1 && gSystemConfig.configCategoriesInfoS4FieldType == 1 && objCategoriesDetails.tblCategoriesInfoSmall4 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfoS4") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfoSmall4) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 5.*/ }
                            { gSystemConfig.enableCategoriesInfoS5 == 1 && gSystemConfig.configCategoriesInfoS5FieldType == 1 && objCategoriesDetails.tblCategoriesInfoSmall5 != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfoS5") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { HTMLReactParser(objCategoriesDetails.tblCategoriesInfoSmall5) }
                                    </div>
                                </div>
                                : ``
                            }
                        </p>


                        { /*Generic filters - block content.*/ }
                        <p style={{position: "relative", display: "block", overflow: "hidden"}}>
                            { /*Generic filter 1.*/ }
                            { gSystemConfig.enableCategoriesFilterGeneric1 != 0 && objCategoriesDetails.objCategoriesFiltersGeneric1Binding_print.length > 0 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFilterGeneric1") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.enableCategoriesFilterGeneric1 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric1Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric1Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        { /*categoriesFiltersGenericRow[0].title*/ /*worked partially*/ }
                                                        { /*categoriesFiltersGenericRow[0]["title"]*/ }
                                                        { /*categoriesFiltersGenericKey[0]["title"]*/ }
                                                        { /*categoriesFiltersGenericObj.title*/ }
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }


                                                        { /*Debug.*/ }
                                                        { /*JSON.stringify(categoriesFiltersGenericRow)*/ }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 2.*/ }
                            { gSystemConfig.enableCategoriesFilterGeneric2 != 0 && objCategoriesDetails.objCategoriesFiltersGeneric2Binding_print.length > 0 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFilterGeneric2") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.enableCategoriesFilterGeneric2 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric2Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric2Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 3.*/ }
                            { gSystemConfig.enableCategoriesFilterGeneric3 != 0 && objCategoriesDetails.objCategoriesFiltersGeneric3Binding_print.length > 0 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFilterGeneric3") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.enableCategoriesFilterGeneric3 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric3Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric3Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 4.*/ }
                            { gSystemConfig.enableCategoriesFilterGeneric4 != 0 && objCategoriesDetails.objCategoriesFiltersGeneric4Binding_print.length > 0 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFilterGeneric4") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.enableCategoriesFilterGeneric4 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric4Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric4Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 5.*/ }
                            { gSystemConfig.enableCategoriesFilterGeneric5 != 0 && objCategoriesDetails.objCategoriesFiltersGeneric5Binding_print.length > 0 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFilterGeneric5") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.enableCategoriesFilterGeneric5 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric5Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric5Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 6.*/ }
                            { gSystemConfig.enableCategoriesFilterGeneric6 != 0 && objCategoriesDetails.objCategoriesFiltersGeneric6Binding_print.length > 0 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFilterGeneric6") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.enableCategoriesFilterGeneric6 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric6Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric6Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 7.*/ }
                            { gSystemConfig.enableCategoriesFilterGeneric7 != 0 && objCategoriesDetails.objCategoriesFiltersGeneric7Binding_print.length > 0 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFilterGeneric7") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.enableCategoriesFilterGeneric7 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric7Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric7Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 8.*/ }
                            { gSystemConfig.enableCategoriesFilterGeneric8 != 0 && objCategoriesDetails.objCategoriesFiltersGeneric8Binding_print.length > 0 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFilterGeneric8") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.enableCategoriesFilterGeneric8 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric8Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric8Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 9.*/ }
                            { gSystemConfig.enableCategoriesFilterGeneric9 != 0 && objCategoriesDetails.objCategoriesFiltersGeneric9Binding_print.length > 0 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFilterGeneric9") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.enableCategoriesFilterGeneric9 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric9Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric9Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 10.*/ }
                            { gSystemConfig.enableCategoriesFilterGeneric10 != 0 && objCategoriesDetails.objCategoriesFiltersGeneric10Binding_print.length > 0 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFilterGeneric10") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.enableCategoriesFilterGeneric10 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric10Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objCategoriesDetails.objCategoriesFiltersGeneric10Binding_print).map((categoriesFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }
                        </p>


                        { /*Number - block content.*/ }
                        <p style={{position: "relative", display: "block", overflow: "hidden"}}>
                            { /*Number 1.*/ }
                            { gSystemConfig.enableCategoriesNumber1 == 1 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesNumber1") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.configCategoriesNumber1FieldType == 2 || gSystemConfig.configCategoriesNumber1FieldType == 4 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objCategoriesDetails.tblCategoriesNumber1_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number 2.*/ }
                            { gSystemConfig.enableCategoriesNumber2 == 1 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesNumber2") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.configCategoriesNumber2FieldType == 2 || gSystemConfig.configCategoriesNumber2FieldType == 4 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objCategoriesDetails.tblCategoriesNumber2_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number 3.*/ }
                            { gSystemConfig.enableCategoriesNumber3 == 1 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesNumber3") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.configCategoriesNumber3FieldType == 2 || gSystemConfig.configCategoriesNumber3FieldType == 4 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }

                                        { objCategoriesDetails.tblCategoriesNumber3_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number 4.*/ }
                            { gSystemConfig.enableCategoriesNumber4 == 1 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesNumber4") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.configCategoriesNumber4FieldType == 2 || gSystemConfig.configCategoriesNumber4FieldType == 4 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objCategoriesDetails.tblCategoriesNumber4_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number 5.*/ }
                            { gSystemConfig.enableCategoriesNumber5 == 1 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesNumber5") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.configCategoriesNumber5FieldType == 2 || gSystemConfig.configCategoriesNumber5FieldType == 4 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objCategoriesDetails.tblCategoriesNumber5_print }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Number Small 1.*/ }
                            { gSystemConfig.enableCategoriesNumberS1 == 1 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesNumberS1") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.configCategoriesNumberS1FieldType == 2 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objCategoriesDetails.tblCategoriesNumberSmall1_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number Small 2.*/ }
                            { gSystemConfig.enableCategoriesNumberS2 == 1 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesNumberS2") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.configCategoriesNumberS2FieldType == 2 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objCategoriesDetails.tblCategoriesNumberSmall2_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number Small 3.*/ }
                            { gSystemConfig.enableCategoriesNumberS3 == 1 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesNumberS3") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.configCategoriesNumberS3FieldType == 2 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objCategoriesDetails.tblCategoriesNumberSmall3_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number Small 4.*/ }
                            { gSystemConfig.enableCategoriesNumberS4 == 1 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesNumberS4") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.configCategoriesNumberS4FieldType == 2 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objCategoriesDetails.tblCategoriesNumberSmall4_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number Small 5.*/ }
                            { gSystemConfig.enableCategoriesNumberS5 == 1 ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesNumberS5") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { gSystemConfig.configCategoriesNumberS5FieldType == 2 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objCategoriesDetails.tblCategoriesNumberSmall5_print }
                                    </div>
                                </div>
                                : ``
                            }
                        </p>


                        { /*Dates - Block content.*/ }
                        <p style={{position: "relative", display: "block", overflow: "hidden"}}>
                            { /*Date 1.*/ }
                            { gSystemConfig.enableCategoriesDate1 == 1 && objCategoriesDetails.tblCategoriesDate1_print != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesDate1") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { objCategoriesDetails.tblCategoriesDate1_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Date 2.*/ }
                            { gSystemConfig.enableCategoriesDate2 == 1 && objCategoriesDetails.tblCategoriesDate2_print != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesDate2") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { objCategoriesDetails.tblCategoriesDate2_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Date 3.*/ }
                            { gSystemConfig.enableCategoriesDate2 == 1 && objCategoriesDetails.tblCategoriesDate3_print != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesDate3") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { objCategoriesDetails.tblCategoriesDate3_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Date 4.*/ }
                            { gSystemConfig.enableCategoriesDate2 == 1 && objCategoriesDetails.tblCategoriesDate4_print != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesDate4") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { objCategoriesDetails.tblCategoriesDate4_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Date 5.*/ }
                            { gSystemConfig.enableCategoriesDate2 == 1 && objCategoriesDetails.tblCategoriesDate5_print != "" ? 
                                <div className="ss-frontend-categories-details-content-block01">
                                    <div className="ss-frontend-categories-details-content-block-label01 ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesDate5") }:
                                    </div>
                                    <div className="ss-frontend-categories-details-content-block-data01">
                                        { objCategoriesDetails.tblCategoriesDate5_print }
                                    </div>
                                </div>
                                : ``
                            }
                        </p>

                        
                        { /*Files - row content.*/ }
                        { /*TODO: Check attribute donwload issue with same origin (check todo.txt).*/ }
                        { /*ref: https://stackoverflow.com/questions/42265625/download-attribute-in-anchor-tag-in-react-component.*/ }
                        <p style={{position: "relative", display: "block", overflow: "hidden"}}>
                            { /*File 1.*/ }
                            { gSystemConfig.enableCategoriesFile1 == 1 && objCategoriesDetails.tblCategoriesFile1 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <span className="ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFile1") }:
                                    </span>
                                    <span>
                                        { gSystemConfig.configCategoriesFile1Type == 3 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objCategoriesDetails.tblCategoriesFile1 } 
                                                download={ objCategoriesDetails.tblCategoriesFile1 }  
                                                target="_blank"
                                                className="ss-frontend-categories-details-link01">
                                                { objCategoriesDetails.tblCategoriesFile1 }
                                            </a>
                                            : ``
                                        }

                                        { gSystemConfig.configCategoriesFile1Type == 34 ? 
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objCategoriesDetails.tblCategoriesFile1 } 
                                                target="_blank"
                                                className="ss-frontend-categories-details-link01">
                                                { objCategoriesDetails.tblCategoriesFile1 }
                                            </a>
                                            : ``
                                        }
                                    </span>
                                </div>
                                : ``
                            }


                            { /*File 2.*/ }
                            { gSystemConfig.enableCategoriesFile2 == 1 && objCategoriesDetails.tblCategoriesFile2 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <span className="ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFile2") }:
                                    </span>
                                    <span>
                                        { gSystemConfig.configCategoriesFile2Type == 3 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objCategoriesDetails.tblCategoriesFile2 } 
                                                download={ objCategoriesDetails.tblCategoriesFile2 }  
                                                target="_blank"
                                                className="ss-frontend-categories-details-link01">
                                                { objCategoriesDetails.tblCategoriesFile2 }
                                            </a>
                                            : ``
                                        }

                                        { gSystemConfig.configCategoriesFile2Type == 34 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objCategoriesDetails.tblCategoriesFile2 } 
                                                target="_blank"
                                                className="ss-frontend-categories-details-link01">
                                                { objCategoriesDetails.tblCategoriesFile2 }
                                            </a>
                                            : ``
                                        }
                                    </span>
                                </div>
                                : ``
                            }


                            { /*File 3.*/ }
                            { gSystemConfig.enableCategoriesFile3 == 1 && objCategoriesDetails.tblCategoriesFile3 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <span className="ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFile3") }:
                                    </span>
                                    <span>
                                        { gSystemConfig.configCategoriesFile3Type == 3 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objCategoriesDetails.tblCategoriesFile3 } 
                                                download={ objCategoriesDetails.tblCategoriesFile3 }  
                                                target="_blank"
                                                className="ss-frontend-categories-details-link01">
                                                { objCategoriesDetails.tblCategoriesFile3 }
                                            </a>
                                            : ``
                                        }

                                        { gSystemConfig.configCategoriesFile3Type == 34 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objCategoriesDetails.tblCategoriesFile3 } 
                                                target="_blank"
                                                className="ss-frontend-categories-details-link01">
                                                { objCategoriesDetails.tblCategoriesFile3 }
                                            </a>
                                            : ``
                                        }
                                    </span>
                                </div>
                                : ``
                            }


                            { /*File 4.*/ }
                            { gSystemConfig.enableCategoriesFile4 == 1 && objCategoriesDetails.tblCategoriesFile4 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <span className="ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFile4") }:
                                    </span>
                                    <span>
                                        { gSystemConfig.configCategoriesFile3Type == 3 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objCategoriesDetails.tblCategoriesFile4 } 
                                                download={ objCategoriesDetails.tblCategoriesFile4 }  
                                                target="_blank"
                                                className="ss-frontend-categories-details-link01">
                                                { objCategoriesDetails.tblCategoriesFile4 }
                                            </a>
                                            : ``
                                        }

                                        { gSystemConfig.configCategoriesFile4Type == 34 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objCategoriesDetails.tblCategoriesFile4 } 
                                                target="_blank"
                                                className="ss-frontend-categories-details-link01">
                                                { objCategoriesDetails.tblCategoriesFile4 }
                                            </a>
                                            : ``
                                        }
                                    </span>
                                </div>
                                : ``
                            }


                            { /*File 5.*/ }
                            { gSystemConfig.enableCategoriesFile5 == 1 && objCategoriesDetails.tblCategoriesFile5 != "" ? 
                                <div className="ss-frontend-categories-details-content-row01">
                                    <span className="ss-frontend-categories-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesFile5") }:
                                    </span>
                                    <span>
                                        { gSystemConfig.configCategoriesFile5Type == 3 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objCategoriesDetails.tblCategoriesFile5 } 
                                                download={ objCategoriesDetails.tblCategoriesFile5 }  
                                                target="_blank"
                                                className="ss-frontend-categories-details-link01">
                                                { objCategoriesDetails.tblCategoriesFile5 }
                                            </a>
                                            : ``
                                        }

                                        { gSystemConfig.configCategoriesFile5Type == 34 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objCategoriesDetails.tblCategoriesFile5 } 
                                                target="_blank"
                                                className="ss-frontend-categories-details-link01">
                                                { objCategoriesDetails.tblCategoriesFile5 }
                                            </a>
                                            : ``
                                        }
                                    </span>
                                </div>
                                : ``
                            }
                        </p>

                    </div>
                );

            //}else{
                //Redirect 404 or redirect 404 on the upper component.
            //}
        }
    
    }    
    //**************************************************************************************
}


export default FrontendCategoriesDetailsRecord;