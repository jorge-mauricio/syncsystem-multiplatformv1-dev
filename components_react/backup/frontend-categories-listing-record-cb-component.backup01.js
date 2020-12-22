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
        //ConfigLayoutType: 1 - table listing (simple) | 2 - div | 3 - table listing (bootstrap) | 4 - table listing (dashboard)


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
    
    
    //
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
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;
        var configLayoutType = null;
        var arrCategoriesListing;
        //----------------------


        //Define values.
        //----------------------
        configLayoutType = this.props.configLayoutType;
        arrCategoriesListing = this.props.arrCategoriesListing;
        //arrCategoriesListing = await this.props.arrCategoriesListing;
        //----------------------


        //Table listing.
        //----------------------
        if(configLayoutType == 1)
        {
            if(arrCategoriesListing.length > 0)
            {
                //Not empty.
                return(
                    <section className="ss-backend-layout-section-data01">
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
                    </section>
                );
            }else{
                //Empty.
                return(
                    <section className="ss-frontend-layout-section-data01">
                        <div className="ss-frontend-alert">
                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendMessageCategoriesEmpty") }
                        </div>
                    </section>
                );
            }
        }
        //----------------------


        //div
        //----------------------
        if(configLayoutType == 2)
        {
            return(
                <section className="ss-frontend-layout-section-containers01">
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

                                    { categoriesRow.image_main != "" ?
                                        <figure className="ss-frontend-categories-listing-image01-container">
                                            <a href="#" className="ss-frontend-categories-listing-image01" style="background-image: url(https://dummyimage.com/200x100/666/999.jpg&text=test)">
                                                img
                                            </a>
                                        </figure>                                        
                                         : `image not available`
                                    }

                                    <p className="ss-frontend-categories-listing-content-row01">
                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.description, "db") }
                                    </p>


                                    { /*Row content.*/}
                                    <div className="ss-frontend-categories-listing-content-row01">
                                        <div className="ss-frontend-categories-listing-subheading01">
                                            Subtitle
                                        </div>
                                        More content.
                                    </div>


                                    { /*Block content.*/}
                                    <div className="ss-frontend-categories-listing-content-row01">
                                        <div className="ss-frontend-categories-listing-content-block01">
                                            <div className="ss-frontend-categories-listing-subheading01">
                                                x
                                            </div>
                                            y
                                        </div>

                                    </div>

                                </article>
                            );
                        }
                    ) }
                </section>
            );
        }
        //----------------------
    }    
    //**************************************************************************************
}


export default FrontendCategoriesListingRecord;