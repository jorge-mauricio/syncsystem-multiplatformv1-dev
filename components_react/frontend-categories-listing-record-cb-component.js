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


class FrontendCategoriesListingRecord extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //configLayoutType: 1 - table listing (custom) | 2 - div layout (custom) | 11 - table listing (bootstrap) | 22 - div layout (bootstrap) | 111 - table listing (dashboard - custom) 


        super(props, context);
        /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */


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
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser } = this.context;
        
        var configLayoutType = null;
        var arrCategoriesListing;
        //----------------------


        //Define values.
        //----------------------
        configLayoutType = this.props.configLayoutType;
        arrCategoriesListing = this.props.arrCategoriesListing;
        //arrCategoriesListing = await this.props.arrCategoriesListing;
        //console.log("arrCategoriesListing=", arrCategoriesListing);
        //----------------------


        //Table listing (custom).
        //----------------------
        if(configLayoutType == 1)
        {
            if(arrCategoriesListing.length > 0)
            {
                //Not empty.
                return(
                    <div className="ss-frontend-layout-section-data01">
                        <table className="ss-frontend-categories-listing-text01 ss-frontend-table-listing01">
                            <thead className="ss-frontend-table-bg-dark ss-frontend-categories-listing-text02">
                                <tr>
                                    <th style={{width: "40px"}}>
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemID") }
                                    </th>
                                    <th>
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesCategory") }
                                    </th>
                                    <th style={{width: "100px"}}>
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemFunctions") }
                                    </th>
                                    <th style={{width: "80px"}}>
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemActivation") }
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrCategoriesListing.map((categoriesRow, categoriesRowKey) =>
                                    {
                                        return(
                                        <tr key={ categoriesRowKey }>
                                            <td style={{textAlign: "center"}}>
                                                { categoriesRow.id }
                                            </td>
                                            <td>
                                                {/*
                                                    <Link to={`/${ gSystemConfig.configRouteFrontendCategories + "/" + categoriesRow.id }`} className="ss-frontend-listing-link01">
                                                        { categoriesRow.title }
                                                    </Link>
                                                    //Didn´t work properly with sublevels.
                                                */}

                                                {/*Sublevels */}
                                                <a href={`/${ gSystemConfig.configRouteFrontendCategories + "/" + categoriesRow.id }`} 
                                                    className="ss-frontend-categories-listing-link01"
                                                    title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }>
                                                    { /*categoriesRow.title*/ }
                                                    { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }
                                                </a>
                                            </td>
                                            <td style={{textAlign: "center"}}>
                                                {/*
                                                    <Link to={`/${ gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id }`} className="ss-frontend-listing-link01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") }
                                                    </Link>
                                                */}
                                                <a href={`/${ gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id }`} 
                                                    className="ss-frontend-categories-listing-link01"
                                                    title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " +  categoriesRow.title }>
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") }
                                                </a>
                                            </td>
                                            <td style={{textAlign: "center"}}>
                                                { categoriesRow.activation ? SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemActivation1") : SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemActivation0") }
                                            </td>
                                        </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                    </div>
                );
            }else{
                //Empty.
                return(
                    <div className="ss-frontend-alert">
                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendMessageCategoriesEmpty") }
                    </div>
                );
            }
        }
        //----------------------


        //div layout (custom).
        //----------------------
        if(configLayoutType == 2)
        {
            if(arrCategoriesListing.length > 0)
            {
                //Output.
                return(
                    <div className="ss-frontend-categories-listing-container">
                        { arrCategoriesListing.map((categoriesRow, categoriesRowKey) =>
                            {
                                return (
                                    <article key={categoriesRowKey} 
                                        className="ss-frontend-categories-container ss-frontend-categories-listing-text01">
                                        <h2 className="ss-frontend-categories-listing-title01">
                                            <a href={`/${ gSystemConfig.configRouteFrontendCategories + "/" + categoriesRow.id }`} 
                                                className="ss-frontend-categories-listing-title-link01"
                                                title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }>
                                                { /*categoriesRow.title*/ }
                                                { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }
                                            </a>
                                        </h2>

                                        { gSystemConfig.enableCategoriesImageMain == 1 ? 
                                            <React.Fragment>
                                                { categoriesRow.image_main != "" ?
                                                    <figure className="ss-frontend-categories-listing-image01-container">
                                                        <a href={`/${ gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id }`} 
                                                            title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }
                                                            className="ss-frontend-categories-listing-image01" 
                                                            style={{ backgroundImage: "url(" + gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + categoriesRow.image_main + ")" }}>
                                                            
                                                        </a>
                                                    </figure>                                        
                                                    : 
                                                    <React.Fragment>
                                                        {/* Placeholder.*/}
                                                        { gSystemConfig.configCategoriesImagePlaceholder == 1 ?
                                                            <figure className="ss-frontend-categories-listing-image01-container">
                                                                <a href={`/${ gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id }`} 
                                                                title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }
                                                                className="ss-frontend-categories-listing-image01" 
                                                                style={{ backgroundImage: "url(" + gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesLayoutSD + "/frontend-layout-image-placeholder-t0.png" }}>
                                                                    
                                                                </a>
                                                            </figure>                                        
                                                            : ``
                                                        }
                                                    </React.Fragment>
                                                }
                                            </React.Fragment>
                                            : ``
                                        }

                                        
                                        { gSystemConfig.enableCategoriesDescription == 1 && categoriesRow.description != "" ? 
                                            <p className="ss-frontend-categories-listing-content-row01">
                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.description, "db")) }
                                            </p>
                                            : ``
                                        }

                                        { /*Details.*/ }
                                        <a href={`/${ gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id }`} 
                                            className="ss-frontend-btn-base ss-frontend-btn-action"
                                            title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }>
                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") }
                                        </a>


                                        { /*Row content.*/ }
                                        <div style={{position: "relative", display: "block", overflow: "hidden"}}>
                                            { /*Information 1.*/ }
                                            { gSystemConfig.enableCategoriesInfo1 == 1 && gSystemConfig.configCategoriesInfo1FieldType == 2 && categoriesRow.info1 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-row01">
                                                    <div className="ss-frontend-categories-listing-content-row-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo1") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-row-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info1, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 2.*/ }
                                            { gSystemConfig.enableCategoriesInfo2 == 1 && gSystemConfig.configCategoriesInfo2FieldType == 2 && categoriesRow.info2 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-row01">
                                                    <div className="ss-frontend-categories-listing-content-row-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo2") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-row-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info2, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 3.*/ }
                                            { gSystemConfig.enableCategoriesInfo3 == 1 && gSystemConfig.configCategoriesInfo3FieldType == 2 && categoriesRow.info3 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-row01">
                                                    <div className="ss-frontend-categories-listing-content-row-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo3") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-row-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info3, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 4.*/ }
                                            { gSystemConfig.enableCategoriesInfo4 == 1 && gSystemConfig.configCategoriesInfo4FieldType == 2 && categoriesRow.info4 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-row01">
                                                    <div className="ss-frontend-categories-listing-content-row-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo4") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-row-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info4, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 5.*/ }
                                            { gSystemConfig.enableCategoriesInfo5 == 1 && gSystemConfig.configCategoriesInfo5FieldType == 2 && categoriesRow.info5 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-row01">
                                                    <div className="ss-frontend-categories-listing-content-row-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo5") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-row-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info5, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 6.*/ }
                                            { gSystemConfig.enableCategoriesInfo6 == 1 && gSystemConfig.configCategoriesInfo6FieldType == 2 && categoriesRow.info6 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-row01">
                                                    <div className="ss-frontend-categories-listing-content-row-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo6") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-row-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info6, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }
                                            
                                            { /*Information 7.*/ }
                                            { gSystemConfig.enableCategoriesInfo7 == 1 && gSystemConfig.configCategoriesInfo7FieldType == 2 && categoriesRow.info7 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-row01">
                                                    <div className="ss-frontend-categories-listing-content-row-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo7") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-row-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info7, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 8.*/ }
                                            { gSystemConfig.enableCategoriesInfo8 == 1 && gSystemConfig.configCategoriesInfo8FieldType == 2 && categoriesRow.info8 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-row01">
                                                    <div className="ss-frontend-categories-listing-content-row-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo8") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-row-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info8, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 9.*/ }
                                            { gSystemConfig.enableCategoriesInfo9 == 1 && gSystemConfig.configCategoriesInfo9FieldType == 2 && categoriesRow.info9 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-row01">
                                                    <div className="ss-frontend-categories-listing-content-row-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo9") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-row-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info9, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 10.*/ }
                                            { gSystemConfig.enableCategoriesInfo10 == 1 && gSystemConfig.configCategoriesInfo10FieldType == 2 && categoriesRow.info10 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-row01">
                                                    <div className="ss-frontend-categories-listing-content-row-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo10") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-row-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info10, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }
                                        </div>


                                        { /*Block content.*/ }
                                        <div style={{position: "relative", display: "block", overflow: "hidden"}}>
                                            { /*Information 1.*/ }
                                            { gSystemConfig.enableCategoriesInfo1 == 1 && gSystemConfig.configCategoriesInfo1FieldType == 1 && categoriesRow.info1 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-block01">
                                                    <div className="ss-frontend-categories-listing-content-block-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo1") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-block-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info1, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 2.*/ }
                                            { gSystemConfig.enableCategoriesInfo2 == 1 && gSystemConfig.configCategoriesInfo2FieldType == 1 && categoriesRow.info2 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-block01">
                                                    <div className="ss-frontend-categories-listing-content-block-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo2") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-block-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info2, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 3.*/ }
                                            { gSystemConfig.enableCategoriesInfo3 == 1 && gSystemConfig.configCategoriesInfo3FieldType == 1 && categoriesRow.info3 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-block01">
                                                    <div className="ss-frontend-categories-listing-content-block-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo3") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-block-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info3, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 4.*/ }
                                            { gSystemConfig.enableCategoriesInfo4 == 1 && gSystemConfig.configCategoriesInfo4FieldType == 1 && categoriesRow.info4 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-block01">
                                                    <div className="ss-frontend-categories-listing-content-block-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo4") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-block-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info4, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 5.*/ }
                                            { gSystemConfig.enableCategoriesInfo5 == 1 && gSystemConfig.configCategoriesInfo5FieldType == 1 && categoriesRow.info5 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-block01">
                                                    <div className="ss-frontend-categories-listing-content-block-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo5") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-block-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info5, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 6.*/ }
                                            { gSystemConfig.enableCategoriesInfo6 == 1 && gSystemConfig.configCategoriesInfo6FieldType == 1 && categoriesRow.info6 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-block01">
                                                    <div className="ss-frontend-categories-listing-content-block-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo6") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-block-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info6, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 7.*/ }
                                            { gSystemConfig.enableCategoriesInfo7 == 1 && gSystemConfig.configCategoriesInfo7FieldType == 1 && categoriesRow.info7 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-block01">
                                                    <div className="ss-frontend-categories-listing-content-block-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo7") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-block-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info7, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 8.*/ }
                                            { gSystemConfig.enableCategoriesInfo8 == 1 && gSystemConfig.configCategoriesInfo8FieldType == 1 && categoriesRow.info8 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-block01">
                                                    <div className="ss-frontend-categories-listing-content-block-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo8") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-block-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info8, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 9.*/ }
                                            { gSystemConfig.enableCategoriesInfo9 == 1 && gSystemConfig.configCategoriesInfo9FieldType == 1 && categoriesRow.info9 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-block01">
                                                    <div className="ss-frontend-categories-listing-content-block-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo9") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-block-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info9, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                            { /*Information 10.*/ }
                                            { gSystemConfig.enableCategoriesInfo10 == 1 && gSystemConfig.configCategoriesInfo10FieldType == 1 && categoriesRow.info10 != "" ? 
                                                <div className="ss-frontend-categories-listing-content-block01">
                                                    <div className="ss-frontend-categories-listing-content-block-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo10") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-block-data01">
                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info10, "db")) }
                                                    </div>
                                                </div>
                                                : ``
                                            }

                                        </div>

                                        { /*Number - block content.*/ }
                                        <div style={{position: "relative", display: "block", overflow: "hidden"}}>
                                            { /*Number 1.*/ }
                                            { gSystemConfig.enableCategoriesNumber1 == 1 ? 
                                                <div className="ss-frontend-categories-listing-content-block01">
                                                    <div className="ss-frontend-categories-listing-content-block-label01 ss-frontend-categories-listing-subheading01">
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesNumber1") }:
                                                    </div>
                                                    <div className="ss-frontend-categories-listing-content-block-data01">
                                                        { gSystemConfig.configCategoriesNumber1FieldType == 2 || gSystemConfig.configCategoriesNumber1FieldType == 4 ? 
                                                            <React.Fragment>
                                                                { gSystemConfig.configSystemCurrency + " " }
                                                            </React.Fragment>
                                                        : ``
                                                        }

                                                        { /*NOTE dev: think of alternative funcion. Maybe, BigNumber is causing error. ref: https://github.com/ethereum/web3.js/issues/1356 */ }
                                                        { /*SyncSystemNS.FunctionsGeneric.valueMaskRead(categoriesRow.number1, gSystemConfig.configSystemCurrency, gSystemConfig.configCategoriesNumber1FieldType)*/ }
                                                        { categoriesRow.number1 }
                                                    </div>
                                                </div>
                                                : ``
                                            }
                                        </div>

                                    </article>
                                );
                            }
                        ) }
                    </div>
                );
            }else{
                //Empty.
                return(
                    <div className="ss-frontend-alert">
                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendMessageCategoriesEmpty") }
                    </div>
                );
            }
        }
        //----------------------


        //div row (custom).
        //----------------------
        if(configLayoutType == 3)
        {
            if(arrCategoriesListing.length > 0)
            {
                //Output.
                return(
                    <React.Fragment>
                        { arrCategoriesListing.map((categoriesRow, categoriesRowKey) =>{
                            return (
                                //record
                                <article className="ss-frontend-categories-container-row">
                                    {/* Column 1.*/}
                                    { gSystemConfig.enableCategoriesImageMain == 1 ?
                                        //Image.
                                        <figure className="ss-frontend-categories-container-row-column01">
                                            <a href={"/" + gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id } 
                                                title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }>

                                                { categoriesRow.image_main != "" ?
                                                    <img src={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + categoriesRow.image_main} 
                                                        alt={
                                                            gSystemConfig.enableCategoriesImageMainCaption == 1 && categoriesRow.image_main_caption != "" ?
                                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.image_main_caption, "db")
                                                            :
                                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db")
                                                            } 
                                                        class="ss-frontend-categories-listing-image02" />
                                                    :
                                                    <React.Fragment>
                                                        {/* Placeholder.*/}
                                                        { gSystemConfig.configCategoriesImagePlaceholder == 1 ?
                                                            <img src={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesLayoutSD + "/frontend-layout-image-placeholder-t0.png"} 
                                                                alt={
                                                                    gSystemConfig.enableCategoriesImageMainCaption == 1 && categoriesRow.image_main_caption != "" ?
                                                                        SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.image_main_caption, "db")
                                                                    :
                                                                        SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db")
                                                                    } 
                                                                class="ss-frontend-categories-listing-image02" />
                                                            :``
                                                        }
                                                    </React.Fragment>
                                                }

                                            </a>
                                        </figure>
                                    :``
                                    }


                                    {/* Column 2.*/}
                                    <div className="ss-frontend-categories-container-row-column02 ss-frontend-categories-listing-text01">
                                        <h2 className="ss-frontend-categories-listing-title01">
                                            <a href={"/" + gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id} 
                                                className="ss-frontend-categories-listing-title-link01"
                                                title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }>
                                                { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }
                                            </a>
                                        </h2>
                                        
                                        { /*Content*/ }
                                        <p style={{position: "relative", display: "block"}}>
                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.description, "db") }
                                        </p>
                                        
                                        <div style={{position: "relative", display: "block", marginTop: "10px", textAlign: "right"}}>
                                            <a href={"/" + gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id } 
                                                className="ss-frontend-btn-base ss-frontend-btn-action"
                                                title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }>
                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") }
                                            </a>
                                        </div>
                                    </div>
                                </article>
                                //record
                            );
                        }) }
                    </React.Fragment>
                );
            }else{
                //Output - empty.
                return(
                    <div className="ss-frontend-alert">
                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendMessageCategoriesEmpty") }
                    </div>
                );
            }
        }
        //----------------------


        //Table listing (bootstrap).
        //----------------------
        if(configLayoutType == 11)
        {
            if(arrCategoriesListing.length > 0)
            {
                //Output.
                return(
                    /*container | container-fluid */
                    <div className="container">
                        {/*bootstrap - table */}
                        {/*
                            table-borderless | table-sm (compact cells) | table-responsive | table-responsive-sm (Breakpoint specific)
                            Contextual classes: table-active | table-primary | table-secondary | table-success | table-danger | table-warning | table-info | table-light | table-dark
                                                bg-primary | etc
                        */}
                        <table className="table table-light table-striped table-hover table-bordered ss-frontend-listing-text01">
                            <caption style={{textAlign: "center", fontWeight: "bold"}}>
                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesTitleMain") }
                            </caption>
                            <thead className="ss-frontend-table-bg-dark ss-frontend-listing-text02">
                                <tr>
                                    <th scope="col" style={{width: "40px", textAlign: "center"}}>
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemID") }
                                    </th>
                                    <th scope="col">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesCategory") }
                                    </th>
                                    <th scope="col" style={{width: "100px", textAlign: "center"}}>
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemFunctions") }
                                    </th>
                                    <th scope="col" style={{width: "80px", textAlign: "center"}}>
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemActivation") }
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {arrCategoriesListing.map((categoriesRow, categoriesRowKey) =>
                                    {
                                        return(
                                            <tr>
                                                <td scope="row" style={{textAlign: "center"}}>
                                                    { categoriesRow.id }
                                                </td>
                                                <td>
                                                    {/*
                                                        <Link to={`/${ gSystemConfig.configRouteFrontendCategories + "/" + categoriesRow.id }`} className="ss-frontend-listing-link01">
                                                            { categoriesRow.title }
                                                        </Link>
                                                        //Didn´t work properly with sublevels.
                                                    */}

                                                    {/*Sublevels */}
                                                    <a href={`/${ gSystemConfig.configRouteFrontendCategories + "/" + categoriesRow.id }`} 
                                                        className="ss-frontend-categories-listing-link01"
                                                        title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }>
                                                        { /*categoriesRow.title*/ }
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }
                                                    </a>
                                                </td>
                                                <td style={{textAlign: "center"}}>
                                                    {/*
                                                        <Link to={`/${ gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id }`} className="ss-frontend-listing-link01">
                                                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") }
                                                        </Link>
                                                    */}
                                                    <a href={`/${ gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id }`} 
                                                        className="ss-frontend-categories-listing-link01"
                                                        title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " +  categoriesRow.title }>
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") }
                                                    </a>
                                                </td>
                                                <td style={{textAlign: "center"}}>
                                                    { categoriesRow.activation ? SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemActivation1") : SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemActivation0") }
                                                </td>
                                            </tr>
                                        );
                                    }
                                )}
                            </tbody>
                        </table>
                        {/*bootstrap - table */}
                    </div>
                );
            }else{
                //Empty.
                return(
                    <div className="container">
                        {/*<div className="ss-frontend-alert">
                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendMessageCategoriesEmpty") }
                        </div>*/}
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendMessageCategoriesEmpty") }

                            <button type="button" 
                                className="close" 
                                data-dismiss="alert" 
                                aria-label="Close">
                                <span aria-hidden="true">
                                    &times;
                                </span>
                            </button>                            
                        </div>
                    </div>
                );
            }
        }
        //----------------------


        //div layout (bootstrap).
        //----------------------
        if(configLayoutType == 22)
        {
            if(arrCategoriesListing.length > 0)
            {
                //Output.
                return(
                    <div className="container">
                        <div className="row">
                            { arrCategoriesListing.map((categoriesRow, categoriesRowKey) =>
                                {
                                    return (
                                        //*record
                                        <article className="col-md-4 product-grid">
                                            { gSystemConfig.enableCategoriesImageMain == 1 ? 
                                                <React.Fragment>
                                                    { categoriesRow.image_main != "" ?
                                                        <figure className="image text-center">
                                                            <a href={`/${ gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id }`} 
                                                                title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }>
                                                                {/* 
                                                                    img-fluid (Responsive image) | img-thumbnail
                                                                */}
                                                                <img src={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + categoriesRow.image_main } 
                                                                    alt={ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") } 
                                                                    className="w-100" 
                                                                    />
                                                            </a>
                                                        </figure>
                                                        :
                                                        <React.Fragment>
                                                            {/* Placeholder.*/}
                                                            { gSystemConfig.configCategoriesImagePlaceholder == 1 ?
                                                                <figure className="image text-center">
                                                                    <a href={`/${ gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id }`} 
                                                                        title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }>
                                                                        {/* 
                                                                            img-fluid (Responsive image) | img-thumbnail
                                                                        */}
                                                                        <img src={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesLayoutSD + "/frontend-layout-image-placeholder-t0.png" } 
                                                                            alt={ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") } 
                                                                            className="w-100" 
                                                                            />
                                                                    </a>
                                                                </figure>
                                                                : ``
                                                            }
                                                        </React.Fragment>
                                                    }
                                                </React.Fragment>
                                                : ``
                                            }

                                            <h2 className="text-center">
                                                { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }
                                            </h2>

                                            { /*Information 1.*/}
                                            { gSystemConfig.enableCategoriesInfo1 == 1 && gSystemConfig.configCategoriesInfo1FieldType == 2 && categoriesRow.info1 != "" ? 
                                                <p className="text-center">
                                                    <strong>
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendCategoriesInfo1") }: 
                                                    </strong>
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.info1, "db")) }
                                                </p>
                                                : ``
                                            }
                                            
                                            <a href={`/${ gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id }`} 
                                                title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") } 
                                                className="btn">
                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") }
                                            </a>
                                        </article>
                                        //*record
                                    );
                                }
                            ) }
                        </div>
                    </div>
                );
            }else{
                //Empty.
                return(
                    <div className="container">
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendMessagePublicationsEmpty") }

                            <button type="button" 
                                className="close" 
                                data-dismiss="alert" 
                                aria-label={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendButtonClose") }>
                                <span aria-hidden="true">
                                    &times;
                                </span>
                            </button>                            
                        </div>
                    </div>
                );
            }
        }
        //----------------------


        //div row (bootstrap).
        //----------------------
        if(configLayoutType == 33)
        {
            if(arrCategoriesListing.length > 0)
            {
                //Output.
                return(
                    <React.Fragment>
                        { arrCategoriesListing.map((categoriesRow, categoriesRowKey) =>{
                            return (
                                //record
                                <article className="row align-items-start">
                                    { /*Column 1.*/ }
                                    { gSystemConfig.enableCategoriesImageMain == 1 ?
                                        //Image
                                        <figure className="col-sm-4 text-center">
                                            <a href={"/" + gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id } 
                                                title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }>

                                                { categoriesRow.image_main != "" ?
                                                    <img src={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + categoriesRow.image_main} 
                                                        alt={
                                                            gSystemConfig.enableCategoriesImageMainCaption == 1 && categoriesRow.image_main_caption != "" ?
                                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.image_main_caption, "db")
                                                            :
                                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db")
                                                            } 
                                                        class="img-fluid ss-frontend-categories-listing-image02" />
                                                    :
                                                    <React.Fragment>
                                                        {/* Placeholder.*/}
                                                        { gSystemConfig.configCategoriesImagePlaceholder == 1 ?
                                                            <img src={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesLayoutSD + "/frontend-layout-image-placeholder-t0.png"} 
                                                                alt={
                                                                    gSystemConfig.enableCategoriesImageMainCaption == 1 && categoriesRow.image_main_caption != "" ?
                                                                        SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.image_main_caption, "db")
                                                                    :
                                                                        SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db")
                                                                    } 
                                                                class="img-fluid ss-frontend-categories-listing-image02" />
                                                            :``
                                                        }
                                                    </React.Fragment>
                                                }

                                            </a>
                                        </figure>
                                    :``
                                    }


                                    {/* Column 2.*/}
                                    <div className="col-sm-8 ss-frontend-categories-listing-text01">
                                        <h2 className="ss-frontend-categories-listing-title01">
                                            <a href={"/" + gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id} 
                                                className="ss-frontend-categories-listing-title-link01"
                                                title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }>
                                                { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }
                                            </a>
                                        </h2>
                                        
                                        { /*Content*/ }
                                        <p style={{position: "relative", display: "block"}}>
                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.description, "db") }
                                        </p>
                                        
                                        <div style={{position: "relative", display: "block", marginTop: "10px", textAlign: "right"}}>
                                            <a href={"/" + gSystemConfig.configRouteFrontendCategories + "/" + gSystemConfig.configRouteFrontendDetails + "/" + categoriesRow.id } 
                                                className="ss-frontend-btn-base ss-frontend-btn-action"
                                                title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") }>
                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") }
                                            </a>
                                        </div>
                                    </div>
                                </article>
                                //record
                            );
                        }) }
                    </React.Fragment>
                );
            }else{
                //Output - empty.
                return(
                    <div className="container-fuid">
                        <div className="alert alert-warning alert-dismissible fade show" role="alert">
                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendMessageCategoriesEmpty") }

                            <button type="button" 
                                className="close" 
                                data-dismiss="alert" 
                                aria-label={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendButtonClose") }>
                                <span aria-hidden="true">
                                    &times;
                                </span>
                            </button>                            
                        </div>
                    </div>
                );
            }
        }
        //----------------------
    }    
    //**************************************************************************************
}


export default FrontendCategoriesListingRecord;