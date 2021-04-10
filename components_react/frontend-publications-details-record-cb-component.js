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

//Components.
import FrontendContent from "./frontend-content-cb-component.js";
//----------------------


class FrontendPublicationsDetailsRecord extends Component
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
            this.arrPublicationsListing = props.arrPublicationsListing;
        }
        this.arrPublicationsListing = props.arrPublicationsListing;
        */

        //Properties.
        //----------------------
        this.configLayoutType = null;
        this.objPublicationsDetails;
        //----------------------


        //Define values.
        //----------------------
        this.configLayoutType = this.props.configLayoutType;
        this.objPublicationsDetails = this.props.objPublicationsDetails;
        //----------------------


        //State creation.
        /*
        this.state = {
            //arrPublicationsListing: this.props.arrPublicationsListing
            //arrPublicationsListing: props.arrPublicationsListing
            arrPublicationsListing: []
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
            //gLightboxBackendConfigOptions.selector = "glightbox_publications_image_main";
            //var glightboxPublicationsImageMain = GLightbox(gLightboxBackendConfigOptions);

        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{

        }


        //Debug.
        //this.setState({ arrPublicationsListing: this.props.arrPublicationsListing });
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
            /*if(gSystemConfig.enablePublicationsFilterGeneric1 != 0)
            {
                this.resultsPublicationsFiltersGeneric1Listing = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
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
        //console.log("this.resultsPublicationsFiltersGeneric1Listing=", this.resultsPublicationsFiltersGeneric1Listing);
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
        var objPublicationsDetails;
        //----------------------


        //Define values.
        //----------------------
        configLayoutType = this.configLayoutType;
        objPublicationsDetails = this.objPublicationsDetails;


        //Debug.
        //console.log("objPublicationsDetails(details record)=", objPublicationsDetails);
        //----------------------
        

        //Div (custom).
        //----------------------
        if(configLayoutType == 2)
        {
            //if(_.isEmpty(objPublicationsDetails) === true)
            //{
                //Output.
                return(
                    <div className="ss-frontend-publications-details-text01">
                        { gSystemConfig.enablePublicationsImageMain == 1 ? 
                            <figure className="ss-frontend-publications-details-image01-container">
                                { objPublicationsDetails.tblPublicationsImageMain != "" ?
                                    <React.Fragment>
                                        { /*No pop-up.*/ }
                                        { gSystemConfig.configImagePopup == 0 ? 
                                            <img src={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objPublicationsDetails.tblPublicationsImageMain } 
                                                alt={objPublicationsDetails.tblPublicationsImageMainCaption != "" ?
                                                        objPublicationsDetails.tblPublicationsImageMainCaption 
                                                    :
                                                        objPublicationsDetails.tblPublicationsTitle 
                                                    } 
                                                className="ss-frontend-publications-details-image01" />
                                            : ``
                                        }

                                        { /*GLightbox.*/ }
                                        { /*TODO: Not working.*/ }
                                        { /*Research: https://www.npmjs.com/package/react-image-lightbox.*/ }
                                        { gSystemConfig.configImagePopup == 4 ? 
                                            <React.Fragment>
                                                <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + objPublicationsDetails.tblPublicationsImageMain }
                                                    title={ objPublicationsDetails.tblPublicationsTitle } 
                                                    className="glightbox_publications_image_main"
                                                    data-glightbox={objPublicationsDetails.tblPublicationsImageMainCaption != "" ?
                                                                        "title:" + objPublicationsDetails.tblPublicationsImageMainCaption + ";"
                                                                    :
                                                                        "title:" + objPublicationsDetails.tblPublicationsTitle + ";"
                                                                    }>
                                                    <img src={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objPublicationsDetails.tblPublicationsImageMain } 
                                                        alt={objPublicationsDetails.tblPublicationsImageMainCaption != "" ?
                                                                    objPublicationsDetails.tblPublicationsImageMainCaption 
                                                            :
                                                                    objPublicationsDetails.tblPublicationsTitle 
                                                            } 
                                                        className="ss-frontend-publications-details-image01" />
                                                </a>
                                                { HTMLReactParser(`
                                                    <script type="text/babel">
                                                    //$(document).ready(function() {
                                                        gLightboxBackendConfigOptions.selector = "glightbox_publications_image_main";
                                                        var glightboxPublicationsImageMain = GLightbox(gLightboxBackendConfigOptions);
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
                                        { gSystemConfig.configPublicationsImagePlaceholder == 1 ? 
                                            <img src={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesLayoutSD + "/frontend-layout-image-placeholder-t0.png" } 
                                                alt={objPublicationsDetails.tblPublicationsImageMainCaption != "" ?
                                                        objPublicationsDetails.tblPublicationsImageMainCaption 
                                                    :
                                                        objPublicationsDetails.tblPublicationsTitle 
                                                    } 
                                                className="ss-frontend-publications-details-image01" />
                                            : ``
                                        }
                                    </React.Fragment>
                                }
                                
                                { /*Main image caption.*/ }
                                { gSystemConfig.enablePublicationsImageMainCaption == 1 ? 
                                    <figcaption>
                                        { objPublicationsDetails.tblPublicationsImageMainCaption }
                                    </figcaption>
                                :
                                    ``
                                }
                            </figure>
                        :``
                        }


                        { /*Content.*/ }
                        <div style={{position: "relative", display: "block", overflow: "hidden"}}>
                            { gSystemConfig.enablePublicationsContent == 1 ? 
                                <FrontendContent 
                                    idParentContent={ objPublicationsDetails.tblPublicationsID } 
                                    idTbContent={ "" } 
                                    contentType={ "" } 
                                    configLayoutType={ 2 } 
                                    configContentNRecords={ "" } 
                                    configContentSort={ "" }>
                                        {/*arrCategoriesListing={ this.arrCategoriesListing } also works*/}
                                </FrontendContent>
                            :``
                            }
                        </div>


                        { /*Row content.*/ }
                        <p style={{position: "relative", display: "block", overflow: "hidden"}}>
                            { /*Information 1.*/ }
                            { gSystemConfig.enablePublicationsInfo1 == 1 && gSystemConfig.configPublicationsInfo1FieldType == 2 && objPublicationsDetails.tblPublicationsInfo1 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo1") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo1) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 2.*/ }
                            { gSystemConfig.enablePublicationsInfo2 == 1 && gSystemConfig.configPublicationsInfo2FieldType == 2 && objPublicationsDetails.tblPublicationsInfo2 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo2") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo2) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 3.*/ }
                            { gSystemConfig.enablePublicationsInfo3 == 1 && gSystemConfig.configPublicationsInfo3FieldType == 2 && objPublicationsDetails.tblPublicationsInfo3 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo3") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo3) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 4.*/ }
                            { gSystemConfig.enablePublicationsInfo4 == 1 && gSystemConfig.configPublicationsInfo4FieldType == 2 && objPublicationsDetails.tblPublicationsInfo4 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo4") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo4) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 5.*/ }
                            { gSystemConfig.enablePublicationsInfo5 == 1 && gSystemConfig.configPublicationsInfo5FieldType == 2 && objPublicationsDetails.tblPublicationsInfo5 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo5") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo5) }
                                    </div>
                                </div>
                                : ``
                            }
                            
                            { /*Information 6.*/ }
                            { gSystemConfig.enablePublicationsInfo6 == 1 && gSystemConfig.configPublicationsInfo6FieldType == 2 && objPublicationsDetails.tblPublicationsInfo6 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo6") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo6) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 7.*/ }
                            { gSystemConfig.enablePublicationsInfo7 == 1 && gSystemConfig.configPublicationsInfo7FieldType == 2 && objPublicationsDetails.tblPublicationsInfo7 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo7") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo7) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 8.*/ }
                            { gSystemConfig.enablePublicationsInfo8 == 1 && gSystemConfig.configPublicationsInfo8FieldType == 2 && objPublicationsDetails.tblPublicationsInfo8 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo8") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo8) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 9.*/ }
                            { gSystemConfig.enablePublicationsInfo9 == 1 && gSystemConfig.configPublicationsInfo9FieldType == 2 && objPublicationsDetails.tblPublicationsInfo9 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo9") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo9) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 10.*/ }
                            { gSystemConfig.enablePublicationsInfo10 == 1 && gSystemConfig.configPublicationsInfo10FieldType == 2 && objPublicationsDetails.tblPublicationsInfo10 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo10") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo10) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 1.*/ }
                            { gSystemConfig.enablePublicationsInfoS1 == 1 && gSystemConfig.configPublicationsInfoS1FieldType == 2 && objPublicationsDetails.tblPublicationsInfoSmall1 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfoS1") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfoSmall1) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 2.*/ }
                            { gSystemConfig.enablePublicationsInfoS2 == 1 && gSystemConfig.configPublicationsInfoS2FieldType == 2 && objPublicationsDetails.tblPublicationsInfoSmall2 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfoS2") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfoSmall2) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 3.*/ }
                            { gSystemConfig.enablePublicationsInfoS3 == 1 && gSystemConfig.configPublicationsInfoS3FieldType == 2 && objPublicationsDetails.tblPublicationsInfoSmall3 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfoS3") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfoSmall3) }
                                    </div>
                                </div>
                                : ``
                            }
                            
                            { /*Information Small 4.*/ }
                            { gSystemConfig.enablePublicationsInfoS4 == 1 && gSystemConfig.configPublicationsInfoS4FieldType == 2 && objPublicationsDetails.tblPublicationsInfoSmall4 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfoS4") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfoSmall4) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 5.*/ }
                            { gSystemConfig.enablePublicationsInfoS5 == 1 && gSystemConfig.configPublicationsInfoS5FieldType == 2 && objPublicationsDetails.tblPublicationsInfoSmall5 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <div className="ss-frontend-publications-details-content-row-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfoS5") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-row-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfoSmall5) }
                                    </div>
                                </div>
                                : ``
                            }
                        </p>


                        { /*Block content.*/ }
                        <p style={{position: "relative", display: "block", overflow: "hidden"}}>
                            { /*Information 1.*/ }
                            { gSystemConfig.enablePublicationsInfo1 == 1 && gSystemConfig.configPublicationsInfo1FieldType == 1 && objPublicationsDetails.tblPublicationsInfo1 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo1") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo1) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 2.*/ }
                            { gSystemConfig.enablePublicationsInfo2 == 1 && gSystemConfig.configPublicationsInfo2FieldType == 1 && objPublicationsDetails.tblPublicationsInfo2 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo2") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo2) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 3.*/ }
                            { gSystemConfig.enablePublicationsInfo3 == 1 && gSystemConfig.configPublicationsInfo3FieldType == 1 && objPublicationsDetails.tblPublicationsInfo3 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo3") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo3) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 4.*/ }
                            { gSystemConfig.enablePublicationsInfo4 == 1 && gSystemConfig.configPublicationsInfo4FieldType == 1 && objPublicationsDetails.tblPublicationsInfo4 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo4") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo4) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 5.*/ }
                            { gSystemConfig.enablePublicationsInfo5 == 1 && gSystemConfig.configPublicationsInfo5FieldType == 1 && objPublicationsDetails.tblPublicationsInfo5 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo5") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo5) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 6.*/ }
                            { gSystemConfig.enablePublicationsInfo6 == 1 && gSystemConfig.configPublicationsInfo6FieldType == 1 && objPublicationsDetails.tblPublicationsInfo6 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo6") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo6) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 7.*/ }
                            { gSystemConfig.enablePublicationsInfo7 == 1 && gSystemConfig.configPublicationsInfo7FieldType == 1 && objPublicationsDetails.tblPublicationsInfo7 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo7") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo7) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 8.*/ }
                            { gSystemConfig.enablePublicationsInfo8 == 1 && gSystemConfig.configPublicationsInfo8FieldType == 1 && objPublicationsDetails.tblPublicationsInfo8 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo8") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo8) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 9.*/ }
                            { gSystemConfig.enablePublicationsInfo9 == 1 && gSystemConfig.configPublicationsInfo9FieldType == 1 && objPublicationsDetails.tblPublicationsInfo9 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo9") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo9) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information 10.*/ }
                            { gSystemConfig.enablePublicationsInfo10 == 1 && gSystemConfig.configPublicationsInfo10FieldType == 1 && objPublicationsDetails.tblPublicationsInfo10 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo10") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfo10) }
                                    </div>
                                </div>
                                : ``
                            } 
                            

                            { /*Information Small 1.*/ }
                            { gSystemConfig.enablePublicationsInfoS1 == 1 && gSystemConfig.configPublicationsInfoS1FieldType == 1 && objPublicationsDetails.tblPublicationsInfoSmall1 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfoS1") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfoSmall1) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 2.*/ }
                            { gSystemConfig.enablePublicationsInfoS2 == 1 && gSystemConfig.configPublicationsInfoS2FieldType == 1 && objPublicationsDetails.tblPublicationsInfoSmall2 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfoS2") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfoSmall2) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 3.*/ }
                            { gSystemConfig.enablePublicationsInfoS3 == 1 && gSystemConfig.configPublicationsInfoS3FieldType == 1 && objPublicationsDetails.tblPublicationsInfoSmall3 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfoS3") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfoSmall3) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 4.*/ }
                            { gSystemConfig.enablePublicationsInfoS4 == 1 && gSystemConfig.configPublicationsInfoS4FieldType == 1 && objPublicationsDetails.tblPublicationsInfoSmall4 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfoS4") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfoSmall4) }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Information Small 5.*/ }
                            { gSystemConfig.enablePublicationsInfoS5 == 1 && gSystemConfig.configPublicationsInfoS5FieldType == 1 && objPublicationsDetails.tblPublicationsInfoSmall5 != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfoS5") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { HTMLReactParser(objPublicationsDetails.tblPublicationsInfoSmall5) }
                                    </div>
                                </div>
                                : ``
                            }
                        </p>


                        { /*Generic filters - block content.*/ }
                        <p style={{position: "relative", display: "block", overflow: "hidden"}}>
                            { /*Generic filter 1.*/ }
                            { gSystemConfig.enablePublicationsFilterGeneric1 != 0 && objPublicationsDetails.objPublicationsFiltersGeneric1Binding_print.length > 0 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFilterGeneric1") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.enablePublicationsFilterGeneric1 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric1Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric1Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        { /*publicationsFiltersGenericRow[0].title*/ /*worked partially*/ }
                                                        { /*publicationsFiltersGenericRow[0]["title"]*/ }
                                                        { /*publicationsFiltersGenericKey[0]["title"]*/ }
                                                        { /*publicationsFiltersGenericObj.title*/ }
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }


                                                        { /*Debug.*/ }
                                                        { /*JSON.stringify(publicationsFiltersGenericRow)*/ }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 2.*/ }
                            { gSystemConfig.enablePublicationsFilterGeneric2 != 0 && objPublicationsDetails.objPublicationsFiltersGeneric2Binding_print.length > 0 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFilterGeneric2") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.enablePublicationsFilterGeneric2 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric2Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric2Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 3.*/ }
                            { gSystemConfig.enablePublicationsFilterGeneric3 != 0 && objPublicationsDetails.objPublicationsFiltersGeneric3Binding_print.length > 0 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFilterGeneric3") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.enablePublicationsFilterGeneric3 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric3Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric3Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 4.*/ }
                            { gSystemConfig.enablePublicationsFilterGeneric4 != 0 && objPublicationsDetails.objPublicationsFiltersGeneric4Binding_print.length > 0 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFilterGeneric4") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.enablePublicationsFilterGeneric4 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric4Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric4Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 5.*/ }
                            { gSystemConfig.enablePublicationsFilterGeneric5 != 0 && objPublicationsDetails.objPublicationsFiltersGeneric5Binding_print.length > 0 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFilterGeneric5") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.enablePublicationsFilterGeneric5 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric5Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric5Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 6.*/ }
                            { gSystemConfig.enablePublicationsFilterGeneric6 != 0 && objPublicationsDetails.objPublicationsFiltersGeneric6Binding_print.length > 0 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFilterGeneric6") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.enablePublicationsFilterGeneric6 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric6Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric6Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 7.*/ }
                            { gSystemConfig.enablePublicationsFilterGeneric7 != 0 && objPublicationsDetails.objPublicationsFiltersGeneric7Binding_print.length > 0 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFilterGeneric7") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.enablePublicationsFilterGeneric7 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric7Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric7Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 8.*/ }
                            { gSystemConfig.enablePublicationsFilterGeneric8 != 0 && objPublicationsDetails.objPublicationsFiltersGeneric8Binding_print.length > 0 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFilterGeneric8") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.enablePublicationsFilterGeneric8 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric8Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric8Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 9.*/ }
                            { gSystemConfig.enablePublicationsFilterGeneric9 != 0 && objPublicationsDetails.objPublicationsFiltersGeneric9Binding_print.length > 0 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFilterGeneric9") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.enablePublicationsFilterGeneric9 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric9Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric9Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                        }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Generic filter 10.*/ }
                            { gSystemConfig.enablePublicationsFilterGeneric10 != 0 && objPublicationsDetails.objPublicationsFiltersGeneric10Binding_print.length > 0 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFilterGeneric10") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.enablePublicationsFilterGeneric10 == 3 ? 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric10Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
                                                    </div>
                                                ) }
                                            </React.Fragment>
                                            : 
                                            <React.Fragment>
                                                { Object.entries(objPublicationsDetails.objPublicationsFiltersGeneric10Binding_print).map((publicationsFiltersGenericRow) => 
                                                    <div>
                                                        - { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsFiltersGenericRow[1].title, "db") }
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
                            { gSystemConfig.enablePublicationsNumber1 == 1 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsNumber1") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.configPublicationsNumber1FieldType == 2 || gSystemConfig.configPublicationsNumber1FieldType == 4 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objPublicationsDetails.tblPublicationsNumber1_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number 2.*/ }
                            { gSystemConfig.enablePublicationsNumber2 == 1 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsNumber2") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.configPublicationsNumber2FieldType == 2 || gSystemConfig.configPublicationsNumber2FieldType == 4 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objPublicationsDetails.tblPublicationsNumber2_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number 3.*/ }
                            { gSystemConfig.enablePublicationsNumber3 == 1 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsNumber3") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.configPublicationsNumber3FieldType == 2 || gSystemConfig.configPublicationsNumber3FieldType == 4 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }

                                        { objPublicationsDetails.tblPublicationsNumber3_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number 4.*/ }
                            { gSystemConfig.enablePublicationsNumber4 == 1 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsNumber4") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.configPublicationsNumber4FieldType == 2 || gSystemConfig.configPublicationsNumber4FieldType == 4 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objPublicationsDetails.tblPublicationsNumber4_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number 5.*/ }
                            { gSystemConfig.enablePublicationsNumber5 == 1 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsNumber5") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.configPublicationsNumber5FieldType == 2 || gSystemConfig.configPublicationsNumber5FieldType == 4 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objPublicationsDetails.tblPublicationsNumber5_print }
                                    </div>
                                </div>
                                : ``
                            }


                            { /*Number Small 1.*/ }
                            { gSystemConfig.enablePublicationsNumberS1 == 1 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsNumberS1") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.configPublicationsNumberS1FieldType == 2 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objPublicationsDetails.tblPublicationsNumberSmall1_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number Small 2.*/ }
                            { gSystemConfig.enablePublicationsNumberS2 == 1 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsNumberS2") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.configPublicationsNumberS2FieldType == 2 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objPublicationsDetails.tblPublicationsNumberSmall2_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number Small 3.*/ }
                            { gSystemConfig.enablePublicationsNumberS3 == 1 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsNumberS3") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.configPublicationsNumberS3FieldType == 2 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objPublicationsDetails.tblPublicationsNumberSmall3_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number Small 4.*/ }
                            { gSystemConfig.enablePublicationsNumberS4 == 1 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsNumberS4") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.configPublicationsNumberS4FieldType == 2 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objPublicationsDetails.tblPublicationsNumberSmall4_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Number Small 5.*/ }
                            { gSystemConfig.enablePublicationsNumberS5 == 1 ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsNumberS5") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { gSystemConfig.configPublicationsNumberS5FieldType == 2 ? 
                                            <React.Fragment>
                                                { gSystemConfig.configSystemCurrency + " " }
                                            </React.Fragment>
                                            : ``
                                        }
                                        
                                        { objPublicationsDetails.tblPublicationsNumberSmall5_print }
                                    </div>
                                </div>
                                : ``
                            }
                        </p>


                        { /*Dates - Block content.*/ }
                        <p style={{position: "relative", display: "block", overflow: "hidden"}}>
                            { /*Date 1.*/ }
                            { gSystemConfig.enablePublicationsDate1 == 1 && objPublicationsDetails.tblPublicationsDate1_print != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsDate1") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { objPublicationsDetails.tblPublicationsDate1_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Date 2.*/ }
                            { gSystemConfig.enablePublicationsDate2 == 1 && objPublicationsDetails.tblPublicationsDate2_print != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsDate2") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { objPublicationsDetails.tblPublicationsDate2_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Date 3.*/ }
                            { gSystemConfig.enablePublicationsDate2 == 1 && objPublicationsDetails.tblPublicationsDate3_print != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsDate3") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { objPublicationsDetails.tblPublicationsDate3_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Date 4.*/ }
                            { gSystemConfig.enablePublicationsDate2 == 1 && objPublicationsDetails.tblPublicationsDate4_print != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsDate4") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { objPublicationsDetails.tblPublicationsDate4_print }
                                    </div>
                                </div>
                                : ``
                            }

                            { /*Date 5.*/ }
                            { gSystemConfig.enablePublicationsDate2 == 1 && objPublicationsDetails.tblPublicationsDate5_print != "" ? 
                                <div className="ss-frontend-publications-details-content-block01">
                                    <div className="ss-frontend-publications-details-content-block-label01 ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsDate5") }:
                                    </div>
                                    <div className="ss-frontend-publications-details-content-block-data01">
                                        { objPublicationsDetails.tblPublicationsDate5_print }
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
                            { gSystemConfig.enablePublicationsFile1 == 1 && objPublicationsDetails.tblPublicationsFile1 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <span className="ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFile1") }:
                                    </span>
                                    <span>
                                        { gSystemConfig.configPublicationsFile1Type == 3 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objPublicationsDetails.tblPublicationsFile1 } 
                                                download={ objPublicationsDetails.tblPublicationsFile1 }  
                                                target="_blank"
                                                className="ss-frontend-publications-details-link01">
                                                { objPublicationsDetails.tblPublicationsFile1 }
                                            </a>
                                            : ``
                                        }

                                        { gSystemConfig.configPublicationsFile1Type == 34 ? 
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objPublicationsDetails.tblPublicationsFile1 } 
                                                target="_blank"
                                                className="ss-frontend-publications-details-link01">
                                                { objPublicationsDetails.tblPublicationsFile1 }
                                            </a>
                                            : ``
                                        }
                                    </span>
                                </div>
                                : ``
                            }


                            { /*File 2.*/ }
                            { gSystemConfig.enablePublicationsFile2 == 1 && objPublicationsDetails.tblPublicationsFile2 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <span className="ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFile2") }:
                                    </span>
                                    <span>
                                        { gSystemConfig.configPublicationsFile2Type == 3 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objPublicationsDetails.tblPublicationsFile2 } 
                                                download={ objPublicationsDetails.tblPublicationsFile2 }  
                                                target="_blank"
                                                className="ss-frontend-publications-details-link01">
                                                { objPublicationsDetails.tblPublicationsFile2 }
                                            </a>
                                            : ``
                                        }

                                        { gSystemConfig.configPublicationsFile2Type == 34 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objPublicationsDetails.tblPublicationsFile2 } 
                                                target="_blank"
                                                className="ss-frontend-publications-details-link01">
                                                { objPublicationsDetails.tblPublicationsFile2 }
                                            </a>
                                            : ``
                                        }
                                    </span>
                                </div>
                                : ``
                            }


                            { /*File 3.*/ }
                            { gSystemConfig.enablePublicationsFile3 == 1 && objPublicationsDetails.tblPublicationsFile3 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <span className="ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFile3") }:
                                    </span>
                                    <span>
                                        { gSystemConfig.configPublicationsFile3Type == 3 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objPublicationsDetails.tblPublicationsFile3 } 
                                                download={ objPublicationsDetails.tblPublicationsFile3 }  
                                                target="_blank"
                                                className="ss-frontend-publications-details-link01">
                                                { objPublicationsDetails.tblPublicationsFile3 }
                                            </a>
                                            : ``
                                        }

                                        { gSystemConfig.configPublicationsFile3Type == 34 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objPublicationsDetails.tblPublicationsFile3 } 
                                                target="_blank"
                                                className="ss-frontend-publications-details-link01">
                                                { objPublicationsDetails.tblPublicationsFile3 }
                                            </a>
                                            : ``
                                        }
                                    </span>
                                </div>
                                : ``
                            }


                            { /*File 4.*/ }
                            { gSystemConfig.enablePublicationsFile4 == 1 && objPublicationsDetails.tblPublicationsFile4 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <span className="ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFile4") }:
                                    </span>
                                    <span>
                                        { gSystemConfig.configPublicationsFile3Type == 3 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objPublicationsDetails.tblPublicationsFile4 } 
                                                download={ objPublicationsDetails.tblPublicationsFile4 }  
                                                target="_blank"
                                                className="ss-frontend-publications-details-link01">
                                                { objPublicationsDetails.tblPublicationsFile4 }
                                            </a>
                                            : ``
                                        }

                                        { gSystemConfig.configPublicationsFile4Type == 34 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objPublicationsDetails.tblPublicationsFile4 } 
                                                target="_blank"
                                                className="ss-frontend-publications-details-link01">
                                                { objPublicationsDetails.tblPublicationsFile4 }
                                            </a>
                                            : ``
                                        }
                                    </span>
                                </div>
                                : ``
                            }


                            { /*File 5.*/ }
                            { gSystemConfig.enablePublicationsFile5 == 1 && objPublicationsDetails.tblPublicationsFile5 != "" ? 
                                <div className="ss-frontend-publications-details-content-row01">
                                    <span className="ss-frontend-publications-details-subheading01">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsFile5") }:
                                    </span>
                                    <span>
                                        { gSystemConfig.configPublicationsFile5Type == 3 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objPublicationsDetails.tblPublicationsFile5 } 
                                                download={ objPublicationsDetails.tblPublicationsFile5 }  
                                                target="_blank"
                                                className="ss-frontend-publications-details-link01">
                                                { objPublicationsDetails.tblPublicationsFile5 }
                                            </a>
                                            : ``
                                        }

                                        { gSystemConfig.configPublicationsFile5Type == 34 ?
                                            <a href={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + objPublicationsDetails.tblPublicationsFile5 } 
                                                target="_blank"
                                                className="ss-frontend-publications-details-link01">
                                                { objPublicationsDetails.tblPublicationsFile5 }
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


export default FrontendPublicationsDetailsRecord;