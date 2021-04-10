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
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";

//Components.
import FrontendContent from "./frontend-content-cb-component.js";
//----------------------


class FrontendPublicationsListingRecord extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //configLayoutType: 1 - table listing (custom) | 2 - div layout (custom) | 3 - div row (custom) | 11 - table listing (bootstrap) | 22 - div layout (bootstrap) | 33 - div row (bootstrap) | 111 - table listing (dashboard - custom) 


        super(props, context);
        /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */

        //Bind.
        this.convertRC2String = this.convertRC2String.bind(this);

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


    convertRC2String(reactComponent)
    {
        const reactComponentConvert = ReactDOMServer.renderToString(reactComponent);
        return reactComponentConvert;
    }

    
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
        var arrPublicationsListing;

        //var contentToString;
        //----------------------


        //Define values.
        //----------------------
        configLayoutType = this.props.configLayoutType;
        arrPublicationsListing = this.props.arrPublicationsListing;
        //arrPublicationsListing = await this.props.arrPublicationsListing;

        /*
        contentToString = ReactDOMServer.renderToString(<FrontendContent key={1} 
            idParentContent={ 1369 } 
            idTbContent={ "" } 
            contentType={ 3 } 
            configLayoutType={ 2 } 
            configContentNRecords={ "" } 
            configContentSort={ "" }>
        </FrontendContent>);
        
        contentToString = React.createClass({
           render: function(){
            var convert = ReactDOMServer.renderToString(<FrontendContent key={1} 
                idParentContent={ 1369 } 
                idTbContent={ "" } 
                contentType={ 3 } 
                configLayoutType={ 2 } 
                configContentNRecords={ "" } 
                configContentSort={ "" }>
            </FrontendContent>);

                return convert
           }
        });
        */
       /*
       https://thinkster.io/tutorials/iterating-and-rendering-loops-in-react

        var Hello = React.createClass({
            render: function() {
                var names = ['Jake', 'Jon', 'Thruster'];
                var namesList = names.map(function(name){
                                return <li>{name}</li>;
                            })

                return  <ul>{ namesList }</ul>
            }
        });
        */

        //Debug.
        //console.log("configLayoutType(publications listing record)=", configLayoutType);
        //console.log("arrPublicationsListing(publications listing record)=", arrPublicationsListing);
        //----------------------


        //div layout (custom).
        //----------------------
        if(configLayoutType == 2)
        {
            if(arrPublicationsListing.length > 0)
            {
                //Output.
                return(
                    <div className="ss-frontend-publications-listing-container">
                        { arrPublicationsListing.map((publicationsRow, publicationsRowKey) =>{
                            return (
                                <article key={publicationsRowKey} 
                                        className="ss-frontend-publications-container ss-frontend-publications-listing-text01">
                                    <h2 className="ss-frontend-publications-listing-title01">
                                        <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id} 
                                            className="ss-frontend-publications-listing-title-link01"
                                            title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }>
                                            { /*publicationsRow.title*/ }
                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }
                                        </a>
                                    </h2>

                                    { gSystemConfig.enablePublicationsImageMain == 1 ? 
                                        <React.Fragment>
                                            { publicationsRow.image_main != "" ?
                                                <figure className="ss-frontend-publications-listing-image01-container">
                                                    <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id} 
                                                        title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }
                                                        className="ss-frontend-publications-listing-image01" 
                                                        style={{ backgroundImage: "url(" + gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + publicationsRow.image_main + ")" }}>
                                                        
                                                    </a>
                                                </figure>                                        
                                                : 
                                                <React.Fragment>
                                                    {/* Placeholder.*/}
                                                    { gSystemConfig.configPublicationsImagePlaceholder == 1 ?
                                                        <figure className="ss-frontend-publications-listing-image01-container">
                                                            <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id} 
                                                                title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }
                                                                className="ss-frontend-publications-listing-image01" 
                                                                style={{ backgroundImage: "url(" + gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesLayoutSD + "/frontend-layout-image-placeholder-t0.png)" }}>
                                                                
                                                            </a>
                                                        </figure>                                        
                                                        : ``
                                                    }
                                                </React.Fragment>
                                            }
                                        </React.Fragment>
                                        : ``
                                    }

                                    
                                    { gSystemConfig.enablePublicationsDescription == 1 && publicationsRow.description != "" ? 
                                        <p className="ss-frontend-publications-listing-content-row01">
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.description, "db")) }
                                        </p>
                                        : ``
                                    }

                                    { /*Details.*/ }
                                    <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id} 
                                        className="ss-frontend-btn-base ss-frontend-btn-action"
                                        title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }>
                                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") }
                                    </a>


                                    { /*Row content.*/ }
                                    <div style={{position: "relative", display: "block", overflow: "hidden"}}>
                                        { /*Information 1.*/ }
                                        { gSystemConfig.enablePublicationsInfo1 == 1 && gSystemConfig.configPublicationsInfo1FieldType == 2 && publicationsRow.info1 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-row01">
                                                <div className="ss-frontend-publications-listing-content-row-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo1") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-row-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info1, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 2.*/ }
                                        { gSystemConfig.enablePublicationsInfo2 == 1 && gSystemConfig.configPublicationsInfo2FieldType == 2 && publicationsRow.info2 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-row01">
                                                <div className="ss-frontend-publications-listing-content-row-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo2") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-row-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info2, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 3.*/ }
                                        { gSystemConfig.enablePublicationsInfo3 == 1 && gSystemConfig.configPublicationsInfo3FieldType == 2 && publicationsRow.info3 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-row01">
                                                <div className="ss-frontend-publications-listing-content-row-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo3") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-row-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info3, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 4.*/ }
                                        { gSystemConfig.enablePublicationsInfo4 == 1 && gSystemConfig.configPublicationsInfo4FieldType == 2 && publicationsRow.info4 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-row01">
                                                <div className="ss-frontend-publications-listing-content-row-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo4") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-row-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info4, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 5.*/ }
                                        { gSystemConfig.enablePublicationsInfo5 == 1 && gSystemConfig.configPublicationsInfo5FieldType == 2 && publicationsRow.info5 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-row01">
                                                <div className="ss-frontend-publications-listing-content-row-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo5") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-row-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info5, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 6.*/ }
                                        { gSystemConfig.enablePublicationsInfo6 == 1 && gSystemConfig.configPublicationsInfo6FieldType == 2 && publicationsRow.info6 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-row01">
                                                <div className="ss-frontend-publications-listing-content-row-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo6") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-row-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info6, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }
                                        
                                        { /*Information 7.*/ }
                                        { gSystemConfig.enablePublicationsInfo7 == 1 && gSystemConfig.configPublicationsInfo7FieldType == 2 && publicationsRow.info7 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-row01">
                                                <div className="ss-frontend-publications-listing-content-row-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo7") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-row-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info7, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 8.*/ }
                                        { gSystemConfig.enablePublicationsInfo8 == 1 && gSystemConfig.configPublicationsInfo8FieldType == 2 && publicationsRow.info8 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-row01">
                                                <div className="ss-frontend-publications-listing-content-row-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo8") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-row-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info8, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 9.*/ }
                                        { gSystemConfig.enablePublicationsInfo9 == 1 && gSystemConfig.configPublicationsInfo9FieldType == 2 && publicationsRow.info9 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-row01">
                                                <div className="ss-frontend-publications-listing-content-row-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo9") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-row-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info9, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 10.*/ }
                                        { gSystemConfig.enablePublicationsInfo10 == 1 && gSystemConfig.configPublicationsInfo10FieldType == 2 && publicationsRow.info10 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-row01">
                                                <div className="ss-frontend-publications-listing-content-row-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo10") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-row-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info10, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }
                                    </div>


                                    { /*Block content.*/ }
                                    <div style={{position: "relative", display: "block", overflow: "hidden"}}>
                                        { /*Information 1.*/ }
                                        { gSystemConfig.enablePublicationsInfo1 == 1 && gSystemConfig.configPublicationsInfo1FieldType == 1 && publicationsRow.info1 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-block01">
                                                <div className="ss-frontend-publications-listing-content-block-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo1") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-block-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info1, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 2.*/ }
                                        { gSystemConfig.enablePublicationsInfo2 == 1 && gSystemConfig.configPublicationsInfo2FieldType == 1 && publicationsRow.info2 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-block01">
                                                <div className="ss-frontend-publications-listing-content-block-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo2") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-block-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info2, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 3.*/ }
                                        { gSystemConfig.enablePublicationsInfo3 == 1 && gSystemConfig.configPublicationsInfo3FieldType == 1 && publicationsRow.info3 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-block01">
                                                <div className="ss-frontend-publications-listing-content-block-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo3") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-block-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info3, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 4.*/ }
                                        { gSystemConfig.enablePublicationsInfo4 == 1 && gSystemConfig.configPublicationsInfo4FieldType == 1 && publicationsRow.info4 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-block01">
                                                <div className="ss-frontend-publications-listing-content-block-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo4") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-block-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info4, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 5.*/ }
                                        { gSystemConfig.enablePublicationsInfo5 == 1 && gSystemConfig.configPublicationsInfo5FieldType == 1 && publicationsRow.info5 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-block01">
                                                <div className="ss-frontend-publications-listing-content-block-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo5") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-block-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info5, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 6.*/ }
                                        { gSystemConfig.enablePublicationsInfo6 == 1 && gSystemConfig.configPublicationsInfo6FieldType == 1 && publicationsRow.info6 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-block01">
                                                <div className="ss-frontend-publications-listing-content-block-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo6") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-block-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info6, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 7.*/ }
                                        { gSystemConfig.enablePublicationsInfo7 == 1 && gSystemConfig.configPublicationsInfo7FieldType == 1 && publicationsRow.info7 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-block01">
                                                <div className="ss-frontend-publications-listing-content-block-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo7") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-block-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info7, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 8.*/ }
                                        { gSystemConfig.enablePublicationsInfo8 == 1 && gSystemConfig.configPublicationsInfo8FieldType == 1 && publicationsRow.info8 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-block01">
                                                <div className="ss-frontend-publications-listing-content-block-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo8") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-block-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info8, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 9.*/ }
                                        { gSystemConfig.enablePublicationsInfo9 == 1 && gSystemConfig.configPublicationsInfo9FieldType == 1 && publicationsRow.info9 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-block01">
                                                <div className="ss-frontend-publications-listing-content-block-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo9") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-block-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info9, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }

                                        { /*Information 10.*/ }
                                        { gSystemConfig.enablePublicationsInfo10 == 1 && gSystemConfig.configPublicationsInfo10FieldType == 1 && publicationsRow.info10 != "" ? 
                                            <div className="ss-frontend-publications-listing-content-block01">
                                                <div className="ss-frontend-publications-listing-content-block-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo10") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-block-data01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info10, "db")) }
                                                </div>
                                            </div>
                                            : ``
                                        }
                                    </div>

                                    { /*Number - block content.*/ }
                                    <div style={{position: "relative", display: "block", overflow: "hidden"}}>
                                        { /*Number 1.*/ }
                                        { gSystemConfig.enablePublicationsNumber1 == 1 ? 
                                            <div className="ss-frontend-publications-listing-content-block01">
                                                <div className="ss-frontend-publications-listing-content-block-label01 ss-frontend-publications-listing-subheading01">
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsNumber1") }:
                                                </div>
                                                <div className="ss-frontend-publications-listing-content-block-data01">
                                                    { gSystemConfig.configPublicationsNumber1FieldType == 2 || gSystemConfig.configPublicationsNumber1FieldType == 4 ? 
                                                        <React.Fragment>
                                                            { gSystemConfig.configSystemCurrency + " " }
                                                        </React.Fragment>
                                                    : ``
                                                    }

                                                    { /*NOTE dev: think of alternative funcion. Maybe, BigNumber is causing error. ref: https://github.com/ethereum/web3.js/issues/1356 */ }
                                                    { /*SyncSystemNS.FunctionsGeneric.valueMaskRead(publicationsRow.number1, gSystemConfig.configSystemCurrency, gSystemConfig.configPublicationsNumber1FieldType)*/ }
                                                    { publicationsRow.number1 }
                                                </div>
                                            </div>
                                            : ``
                                        }
                                    </div>
                                </article>
                            );
                        }) }
                    </div>
                );
            }else{
                //Output - empty.
                return(
                    <div className="ss-frontend-alert">
                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendMessagePublicationsEmpty") }
                    </div>
                );
            }
        }
        //----------------------


        //div row (custom).
        //----------------------
        if(configLayoutType == 3)
        {
            if(arrPublicationsListing.length > 0)
            {
                //Output.
                return(
                    <React.Fragment>
                        { arrPublicationsListing.map((publicationsRow, publicationsRowKey) =>{
                            return (
                                //record
                                <article className="ss-frontend-publications-container-row">
                                    {/* Column 1.*/}
                                    { gSystemConfig.enablePublicationsImageMain == 1 ?
                                        //Image.
                                        <figure className="ss-frontend-publications-container-row-column01">
                                            <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id } 
                                                title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }>

                                                { publicationsRow.image_main != "" ?
                                                    <img src={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + publicationsRow.image_main} 
                                                        alt={
                                                            gSystemConfig.enablePublicationsImageMainCaption == 1 && publicationsRow.image_main_caption != "" ?
                                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.image_main_caption, "db")
                                                            :
                                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db")
                                                            } 
                                                        class="ss-frontend-publications-listing-image02" />
                                                    :
                                                    <React.Fragment>
                                                        {/* Placeholder.*/}
                                                        { gSystemConfig.configPublicationsImagePlaceholder == 1 ?
                                                            <img src={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesLayoutSD + "/frontend-layout-image-placeholder-t0.png"} 
                                                                alt={
                                                                    gSystemConfig.enablePublicationsImageMainCaption == 1 && publicationsRow.image_main_caption != "" ?
                                                                        SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.image_main_caption, "db")
                                                                    :
                                                                        SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db")
                                                                    } 
                                                                class="ss-frontend-publications-listing-image02" />
                                                            :``
                                                        }
                                                    </React.Fragment>
                                                }

                                            </a>

                                            { gSystemConfig.enablePublicationsImageMainCaption == 1 && publicationsRow.image_main_caption != "" ?
                                                <figcaption className="ss-frontend-publications-listing-caption01">
                                                    {SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.image_main_caption, "db")}
                                                </figcaption>
                                            :``
                                            }
                                        </figure>
                                    :``
                                    }


                                    {/* Column 2.*/}
                                    <div className="ss-frontend-publications-container-row-column02 ss-frontend-publications-listing-text01">
                                        <h2 className="ss-frontend-publications-listing-title01">
                                            <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id} 
                                                className="ss-frontend-publications-listing-title-link01"
                                                title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }>
                                                { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }
                                            </a>
                                        </h2>
                                        
                                        <time className="ss-frontend-publications-listing-caption01" style={{textAlign: "left"}}>
                                            {/* publicationsRow.date_creation */}
                                            { SyncSystemNS.FunctionsGeneric.dateRead01(publicationsRow.date_creation, 
                                                                                        gSystemConfig.configFrontendDateFormat, 
                                                                                        0,
                                                                                        3)/*1 | 2 | 3 | 66*/ }
                                        </time>
                                        
                                        { /*Content*/ }
                                        <p style={{position: "relative", display: "block"}}>
                                                

                                            { /*Content.*/ }

                                            { /*contentToString*/ }
                                            {
                                            /**/    
                                            <FrontendContent key={publicationsRowKey} 
                                                idParentContent={ publicationsRow.id } 
                                                idTbContent={ "" } 
                                                contentType={ 3 } 
                                                configLayoutType={ 2 } 
                                                configContentNRecords={ "" } 
                                                configContentSort={ "" }>
                                            </FrontendContent>
                                            /*working */
                                            }

                                            { /*ReactDOMServer.renderToString(<FrontendContent key={publicationsRowKey} 
                                                idParentContent={ publicationsRow.id } 
                                                idTbContent={ "" } 
                                                contentType={ 3 } 
                                                configLayoutType={ 2 } 
                                                configContentNRecords={ "" } 
                                                configContentSort={ "" }>
                                            </FrontendContent>, (reactComponent)=>{
                                                return reactComponent
                                            }) */}

                                            { /*ReactDOMServer.renderToStaticMarkup(<FrontendContent key={publicationsRowKey} 
                                                idParentContent={ publicationsRow.id } 
                                                idTbContent={ "" } 
                                                contentType={ 3 } 
                                                configLayoutType={ 2 } 
                                                configContentNRecords={ "" } 
                                                configContentSort={ "" }>
                                            </FrontendContent>)*/ }


                                            {/*SyncSystemNS.FunctionsGeneric.removeHTML01(<FrontendContent key={publicationsRowKey} 
                                                idParentContent={ publicationsRow.id } 
                                                idTbContent={ "" } 
                                                contentType={ 3 } 
                                                configLayoutType={ 2 } 
                                                configContentNRecords={ "" } 
                                                configContentSort={ "" }>
                                            </FrontendContent>)*/}

                                            {/*(<FrontendContent key={publicationsRowKey} 
                                                idParentContent={ publicationsRow.id } 
                                                idTbContent={ "" } 
                                                contentType={ 3 } 
                                                configLayoutType={ 2 } 
                                                configContentNRecords={ "" } 
                                                configContentSort={ "" }>
                                            </FrontendContent>).toString()*/}

                                            {/*this.convertRC2String(<FrontendContent key={publicationsRowKey} 
                                                idParentContent={ publicationsRow.id } 
                                                idTbContent={ "" } 
                                                contentType={ 3 } 
                                                configLayoutType={ 2 } 
                                                configContentNRecords={ "" } 
                                                configContentSort={ "" }>
                                            </FrontendContent>)*/}
                                        </p>
                                        
                                        <div style={{position: "relative", display: "block", marginTop: "10px", textAlign: "right"}}>
                                            <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id } 
                                                className="ss-frontend-btn-base ss-frontend-btn-action"
                                                title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }>
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
                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendMessagePublicationsEmpty") }
                    </div>
                );
            }
        }
        //----------------------


        //div layout (bootstrap).
        //----------------------
        if(configLayoutType == 22)
        {
            if(arrPublicationsListing.length > 0)
            {
                //Output.
                return(
                    <div className="container-fluid">
                        <div className="row">
                            { arrPublicationsListing.map((publicationsRow, publicationsRowKey) =>
                                {
                                    return (
                                        //*record
                                        <article className="col-md-4 product-grid">
                                            { gSystemConfig.enablePublicationsImageMain == 1 ? 
                                                <React.Fragment>
                                                    { publicationsRow.image_main != "" ?
                                                        <figure className="image text-center">
                                                            <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id} 
                                                                title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }>
                                                                {/* 
                                                                    img-fluid (Responsive image) | img-thumbnail
                                                                */}
                                                                <img src={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + publicationsRow.image_main } 
                                                                    alt={ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") } 
                                                                    className="w-100" 
                                                                    />
                                                            </a>
                                                        </figure>
                                                        :
                                                        <React.Fragment>
                                                            {/* Placeholder.*/}
                                                            { gSystemConfig.configPublicationsImagePlaceholder == 1 ?
                                                                <figure className="image text-center">
                                                                    <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id} 
                                                                        title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }>
                                                                        {/* 
                                                                            img-fluid (Responsive image) | img-thumbnail
                                                                        */}
                                                                        <img src={ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesLayoutSD + "/frontend-layout-image-placeholder-t0.png" } 
                                                                            alt={ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") } 
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
                                                { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }
                                            </h2>

                                            { /*Information 1.*/}
                                            { gSystemConfig.enablePublicationsInfo1 == 1 && gSystemConfig.configPublicationsInfo1FieldType == 2 && publicationsRow.info1 != "" ? 
                                                <p className="text-center">
                                                    <strong>
                                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendPublicationsInfo1") }: 
                                                    </strong>
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.info1, "db")) }
                                                </p>
                                                : ``
                                            }
                                            
                                            <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id} 
                                                title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") } 
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
                //Output - empty.
                return(
                    <div className="container-fluid">
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
            if(arrPublicationsListing.length > 0)
            {
                //Output.
                return(
                    <React.Fragment>
                        { arrPublicationsListing.map((publicationsRow, publicationsRowKey) =>{
                            return (
                                //record
                                <article className="row align-items-start">
                                    { /*Column 1.*/ }
                                    { gSystemConfig.enablePublicationsImageMain == 1 ?
                                        //Image
                                        <figure className="col-sm-4 text-center">
                                            <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id } 
                                                title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }>

                                                { publicationsRow.image_main != "" ?
                                                    <img src={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/t" + publicationsRow.image_main} 
                                                        alt={
                                                            gSystemConfig.enablePublicationsImageMainCaption == 1 && publicationsRow.image_main_caption != "" ?
                                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.image_main_caption, "db")
                                                            :
                                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db")
                                                            } 
                                                        class="img-fluid ss-frontend-publications-listing-image02" />
                                                    :
                                                    <React.Fragment>
                                                        {/* Placeholder.*/}
                                                        { gSystemConfig.configPublicationsImagePlaceholder == 1 ?
                                                            <img src={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesLayoutSD + "/frontend-layout-image-placeholder-t0.png"} 
                                                                alt={
                                                                    gSystemConfig.enablePublicationsImageMainCaption == 1 && publicationsRow.image_main_caption != "" ?
                                                                        SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.image_main_caption, "db")
                                                                    :
                                                                        SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db")
                                                                    } 
                                                                class="img-fluid ss-frontend-publications-listing-image02" />
                                                            :``
                                                        }
                                                    </React.Fragment>
                                                }

                                            </a>

                                            { gSystemConfig.enablePublicationsImageMainCaption == 1 && publicationsRow.image_main_caption != "" ?
                                                <figcaption className="ss-frontend-publications-listing-caption01">
                                                    {SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.image_main_caption, "db")}
                                                </figcaption>
                                            :``
                                            }
                                        </figure>
                                    :``
                                    }


                                    {/* Column 2.*/}
                                    <div className="col-sm-8 ss-frontend-publications-listing-text01">
                                        <h2 className="ss-frontend-publications-listing-title01">
                                            <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id} 
                                                className="ss-frontend-publications-listing-title-link01"
                                                title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }>
                                                { SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }
                                            </a>
                                        </h2>
                                        
                                        <time className="ss-frontend-publications-listing-caption01" style={{textAlign: "left"}}>
                                            {/* publicationsRow.date_creation */}
                                            { SyncSystemNS.FunctionsGeneric.dateRead01(publicationsRow.date_creation, 
                                                                                        gSystemConfig.configFrontendDateFormat, 
                                                                                        0,
                                                                                        3)/*1 | 2 | 3 | 66*/ }
                                        </time>
                                        
                                        { /*Content*/ }
                                        <p style={{position: "relative", display: "block"}}>
                                                

                                            { /*Content.*/ }

                                            { /*contentToString*/ }
                                            {
                                            /**/    
                                            <FrontendContent key={publicationsRowKey} 
                                                idParentContent={ publicationsRow.id } 
                                                idTbContent={ "" } 
                                                contentType={ 3 } 
                                                configLayoutType={ 2 } 
                                                configContentNRecords={ "" } 
                                                configContentSort={ "" }>
                                            </FrontendContent>
                                            /*working */
                                            }

                                            { /*ReactDOMServer.renderToString(<FrontendContent key={publicationsRowKey} 
                                                idParentContent={ publicationsRow.id } 
                                                idTbContent={ "" } 
                                                contentType={ 3 } 
                                                configLayoutType={ 2 } 
                                                configContentNRecords={ "" } 
                                                configContentSort={ "" }>
                                            </FrontendContent>, (reactComponent)=>{
                                                return reactComponent
                                            }) */}

                                            { /*ReactDOMServer.renderToStaticMarkup(<FrontendContent key={publicationsRowKey} 
                                                idParentContent={ publicationsRow.id } 
                                                idTbContent={ "" } 
                                                contentType={ 3 } 
                                                configLayoutType={ 2 } 
                                                configContentNRecords={ "" } 
                                                configContentSort={ "" }>
                                            </FrontendContent>)*/ }


                                            {/*SyncSystemNS.FunctionsGeneric.removeHTML01(<FrontendContent key={publicationsRowKey} 
                                                idParentContent={ publicationsRow.id } 
                                                idTbContent={ "" } 
                                                contentType={ 3 } 
                                                configLayoutType={ 2 } 
                                                configContentNRecords={ "" } 
                                                configContentSort={ "" }>
                                            </FrontendContent>)*/}

                                            {/*(<FrontendContent key={publicationsRowKey} 
                                                idParentContent={ publicationsRow.id } 
                                                idTbContent={ "" } 
                                                contentType={ 3 } 
                                                configLayoutType={ 2 } 
                                                configContentNRecords={ "" } 
                                                configContentSort={ "" }>
                                            </FrontendContent>).toString()*/}

                                            {/*this.convertRC2String(<FrontendContent key={publicationsRowKey} 
                                                idParentContent={ publicationsRow.id } 
                                                idTbContent={ "" } 
                                                contentType={ 3 } 
                                                configLayoutType={ 2 } 
                                                configContentNRecords={ "" } 
                                                configContentSort={ "" }>
                                            </FrontendContent>)*/}
                                        </p>
                                        
                                        <div style={{position: "relative", display: "block", marginTop: "10px", textAlign: "right"}}>
                                            <a href={"/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + publicationsRow.id } 
                                                className="ss-frontend-btn-base ss-frontend-btn-action"
                                                title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendItemDetails") + " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(publicationsRow.title, "db") }>
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

    }    
    //**************************************************************************************
}


export default FrontendPublicationsListingRecord;