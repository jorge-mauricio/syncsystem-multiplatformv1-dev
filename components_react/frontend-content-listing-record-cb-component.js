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


class FrontendContentListingRecord extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;

    
    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //arrContentListing: (array of objects)
        //configLayoutType: 1 - table listing (custom) | 2 - div layout (custom) | 11 - table listing (bootstrap) | 22 - div layout (bootstrap) | 111 - table listing (dashboard - custom) 


        super(props, context);
        /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */


        //Properties.
        //----------------------
        this.arrContentListing;
        this.configLayoutType = null;
        //----------------------


        //Define values - props parameters.
        //----------------------
        this.arrContentListing = this.props.arrContentListing;
        this.configLayoutType = this.props.configLayoutType;
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
        var configLayoutType;
        var arrContentListing;
        //----------------------


        //Define values.
        //----------------------
        configLayoutType = this.configLayoutType;
        arrContentListing = this.arrContentListing;


        //Debug.
        //console.log("configLayoutType (record)=", configLayoutType);
        //console.log("arrContentListing (record)=", arrContentListing);
        //----------------------


        //div layout (custom).
        //----------------------
        if(configLayoutType == 2)
        {
            if(arrContentListing.length > 0)
            {
                //Output.
                return(
                    <div className="ss-frontend-content-listing-container">
                        {arrContentListing.map((contentRow, contentRowKey)=>{
                            return(
                                <React.Fragment>
                                    { /*Heading title.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 1 ?
                                        <h2 key={ contentRowKey } 
                                            className="ss-frontend-content-container ss-frontend-content-heading-title" 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")) }
                                        </h2>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*Subheading title.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 2 ?
                                        <h3 key={ contentRowKey } 
                                            className="ss-frontend-content-container ss-frontend-content-subheading-title" 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")) }
                                        </h3>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*Content text.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 3 ?
                                        <p key={ contentRowKey } 
                                            className="ss-frontend-content-container ss-frontend-content-text" 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db,linkStyle=ss-frontend-content-links")) }
                                        </p>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*Tab.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 4 ?
                                        <p key={ contentRowKey } 
                                            className="ss-frontend-content-container ss-frontend-content-text ss-frontend-content-text-tab" 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db,linkStyle=ss-frontend-content-links")) }
                                        </p>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*Image.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 5 || contentRow.content_type == 9 ?
                                        <React.Fragment>
                                            { /*Left.*/ }
                                            { contentRow.align_image == 3 ?
                                                <div key={ contentRowKey } 
                                                    className="ss-frontend-content-container">
                                                    <React.Fragment>
                                                    { contentRow.file != "" ?
                                                        <figure className="ss-frontend-content-images-container-left">
                                                            <picture>
                                                                { /*<!--source media="(min-width:650px)" srcset="${ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }">
                                                                <source media="(min-width:465px)" srcset="${ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }"-->*/ }
                                                                
                                                                <React.Fragment>
                                                                { contentRow.content_url != "" ? 
                                                                    <a href={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_url, "url")} 
                                                                        target="_blank"
                                                                        title={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")}>
                                                                        <img src={
                                                                                contentRow.content_type == 9 ?
                                                                                    gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                :
                                                                                    gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                } 
                                                                            alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                            className="ss-frontend-content-images">
                                                                        </img>
                                                                    </a>
                                                                :
                                                                    <React.Fragment>
                                                                        { /*No pop-up.*/ }
                                                                        { gSystemConfig.configImagePopup == 0 ?
                                                                            <img src={
                                                                                    contentRow.content_type == 9 ?
                                                                                    gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                    :
                                                                                    gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                } 
                                                                                alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                className="ss-frontend-content-images">
                                                                            </img>
                                                                            : ``
                                                                        }


                                                                        { /*GLightbox.*/ }
                                                                        { gSystemConfig.configImagePopup == 4 ?
                                                                            <React.Fragment>
                                                                                <a href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + contentRow.file}
                                                                                    title={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                    className={"glightbox_categories_image_main" + contentRow.id}
                                                                                    data-glightbox={"title:" + SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")}
                                                                                    >
                                                                                    <img src={
                                                                                            contentRow.content_type == 9 ?
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                            :
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                        } 
                                                                                        alt={
                                                                                            //contentRow.caption != "" ?
                                                                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")
                                                                                            //: 
                                                                                            //HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db"))
                                                                                        } 
                                                                                        className="ss-frontend-content-images">
                                                                                    </img>
                                                                                </a>
                                                                            
                                                                                {/* HTMLReactParser(
                                                                                    `<script type="text/babel">
                                                                                        alert("testing simple script");
                                                                                        document.addEventListener('DOMContentLoaded', function(event) {
                                                                                            alert("testing simple script (inside addeventlistener)");
                                                                                            gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ contentRow.id }";
                                                                                            //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                                                            //data-glightbox="title: Title example.; description: Description example."
                                                                                            var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                                                        });
                                                                                    </script>`
                                                                                    ) */}

                                                                                {
                                                                                /*`<script type="text/babel">
                                                                                alert("testing simple script");
                                                                                document.addEventListener('DOMContentLoaded', function(event) {
                                                                                    alert("testing simple script (inside addeventlistener)");
                                                                                    gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ contentRow.id }";
                                                                                    //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                                                    //data-glightbox="title: Title example.; description: Description example."
                                                                                    var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                                                });
                                                                                </script>`*/
                                                                                }
                                                                                <Safe.script type="text/babel">
                                                                                    {`
                                                                                        alert("testing simple script");
                                                                                    `}
                                                                                </Safe.script>
                                                                            </React.Fragment>
                                                                            : ``
                                                                        }
                                                                    </React.Fragment>
                                                                }
                                                                </React.Fragment>
                                                            </picture>

                                                            { contentRow.caption != "" ?
                                                                <figcaption className="ss-frontend-content-caption ss-frontend-content-images-caption">
                                                                    { SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }
                                                                </figcaption>
                                                                :``
                                                            }
                                                        </figure>
                                                        : ``
                                                    }

                                                    { contentRow.content_text != "" ?
                                                        <p className="ss-frontend-content-text" style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db,linkStyle=ss-frontend-content-links")) }
                                                        </p>
                                                        :``
                                                    }
                                                    </React.Fragment>
                                                </div>
                                                : ``
                                            }


                                            { /*Center.*/ }
                                            { contentRow.align_image == 2 ?
                                                <div key={ contentRowKey } 
                                                    className="ss-frontend-content-container">
                                                    <React.Fragment>
                                                    { contentRow.file != "" ?
                                                        <figure className="ss-frontend-content-images-container-center">
                                                            <picture>
                                                                { /*<!--source media="(min-width:650px)" srcset="${ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }">
                                                                <source media="(min-width:465px)" srcset="${ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }"-->*/ }
                                                                
                                                                <React.Fragment>
                                                                { contentRow.content_url != "" ? 
                                                                    <a href={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_url, "url")} 
                                                                        target="_blank"
                                                                        title={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")}>
                                                                        <img src={
                                                                                contentRow.content_type == 9 ?
                                                                                gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                :
                                                                                gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + contentRow.file 
                                                                            } 
                                                                            alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                            className="ss-frontend-content-images">
                                                                        </img>
                                                                    </a>
                                                                :
                                                                    <React.Fragment>
                                                                        { /*No pop-up.*/ }
                                                                        { gSystemConfig.configImagePopup == 0 ?
                                                                            <img src={
                                                                                    contentRow.content_type == 9 ?
                                                                                    gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                    :
                                                                                    gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + contentRow.file 
                                                                                } 
                                                                                alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                className="ss-frontend-content-images">
                                                                            </img>
                                                                            : ``
                                                                        }


                                                                        { /*GLightbox.*/ }
                                                                        { gSystemConfig.configImagePopup == 4 ?
                                                                            <React.Fragment>
                                                                                <a href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + contentRow.file}
                                                                                    title={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                    className={"glightbox_categories_image_main" + contentRow.id}
                                                                                    data-glightbox={"title:" + SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")}
                                                                                    >
                                                                                    <img src={
                                                                                            contentRow.content_type == 9 ?
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                            :
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + contentRow.file 
                                                                                        } 
                                                                                        alt={
                                                                                            //contentRow.caption != "" ?
                                                                                            SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")
                                                                                            //: 
                                                                                            //SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                                        } 
                                                                                        className="ss-frontend-content-images">
                                                                                    </img>
                                                                                </a>
                                                                            
                                                                                {/* HTMLReactParser(
                                                                                    `<script type="text/babel">
                                                                                        alert("testing simple script");
                                                                                        document.addEventListener('DOMContentLoaded', function(event) {
                                                                                            alert("testing simple script (inside addeventlistener)");
                                                                                            gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ contentRow.id }";
                                                                                            //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                                                            //data-glightbox="title: Title example.; description: Description example."
                                                                                            var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                                                        });
                                                                                    </script>`
                                                                                    ) */}
                                                                            </React.Fragment>
                                                                            : ``
                                                                        }
                                                                    </React.Fragment>
                                                                }
                                                                </React.Fragment>
                                                            </picture>

                                                            { contentRow.caption != "" ?
                                                                <figcaption className="ss-frontend-content-caption ss-frontend-content-images-caption">
                                                                    { SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }
                                                                </figcaption>
                                                                :``
                                                            }
                                                        </figure>
                                                        : ``
                                                    }

                                                    { contentRow.content_text != "" ?
                                                        <p className="ss-frontend-content-text" style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db,linkStyle=ss-frontend-content-links")) }
                                                        </p>
                                                        :``
                                                    }
                                                    </React.Fragment>
                                                </div>
                                                : ``
                                            }


                                            { /*Right.*/ }
                                            { contentRow.align_image == 1 ?
                                                <div key={ contentRowKey } 
                                                    className="ss-frontend-content-container">
                                                    <React.Fragment>
                                                    { contentRow.file != "" ?
                                                        <figure className="ss-frontend-content-images-container-right">
                                                            <picture>
                                                                { /*<!--source media="(min-width:650px)" srcset="${ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }">
                                                                <source media="(min-width:465px)" srcset="${ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }"-->*/ }
                                                                
                                                                <React.Fragment>
                                                                { contentRow.content_url != "" ? 
                                                                    <a href={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_url, "url")} 
                                                                        target="_blank"
                                                                        title={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")}>
                                                                        <img src={
                                                                                contentRow.content_type == 9 ?
                                                                                gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                :
                                                                                gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                            } 
                                                                            alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                            className="ss-frontend-content-images">
                                                                        </img>
                                                                    </a>
                                                                :
                                                                    <React.Fragment>
                                                                        { /*No pop-up.*/ }
                                                                        { gSystemConfig.configImagePopup == 0 ?
                                                                            <img src={
                                                                                    contentRow.content_type == 9 ?
                                                                                    gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                    :
                                                                                    gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                } 
                                                                                alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                className="ss-frontend-content-images">
                                                                            </img>
                                                                            : ``
                                                                        }


                                                                        { /*GLightbox.*/ }
                                                                        { gSystemConfig.configImagePopup == 4 ?
                                                                            <React.Fragment>
                                                                                <a href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + contentRow.file}
                                                                                    title={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                    className={"glightbox_categories_image_main" + contentRow.id}
                                                                                    data-glightbox={"title:" + SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")}
                                                                                    >
                                                                                    <img src={
                                                                                            contentRow.content_type == 9 ?
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                            :
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                        } 
                                                                                        alt={
                                                                                            //contentRow.caption != "" ?
                                                                                            SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")
                                                                                            //: 
                                                                                            //SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                                        } 
                                                                                        className="ss-frontend-content-images">
                                                                                    </img>
                                                                                </a>
                                                                            
                                                                                {/* HTMLReactParser(
                                                                                    `<script type="text/babel">
                                                                                        alert("testing simple script");
                                                                                        document.addEventListener('DOMContentLoaded', function(event) {
                                                                                            alert("testing simple script (inside addeventlistener)");
                                                                                            gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ contentRow.id }";
                                                                                            //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                                                            //data-glightbox="title: Title example.; description: Description example."
                                                                                            var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                                                        });
                                                                                    </script>`
                                                                                    ) */}

                                                                                <Safe.script type="text/babel">
                                                                                    {`
                                                                                        alert("testing simple script");
                                                                                    `}
                                                                                </Safe.script>
                                                                            </React.Fragment>
                                                                            : ``
                                                                        }
                                                                    </React.Fragment>
                                                                }
                                                                </React.Fragment>
                                                            </picture>

                                                            { contentRow.caption != "" ?
                                                                <figcaption className="ss-frontend-content-caption ss-frontend-content-images-caption">
                                                                    { SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }
                                                                </figcaption>
                                                                :``
                                                            }
                                                        </figure>
                                                        : ``
                                                    }

                                                    { contentRow.content_text != "" ?
                                                        <p className="ss-frontend-content-text" style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db,linkStyle=ss-frontend-content-links")) }
                                                        </p>
                                                        :``
                                                    }
                                                    </React.Fragment>
                                                </div>
                                                : ``
                                            }

                                        </React.Fragment>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*Videos.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 6 ?
                                        <div key={ contentRowKey } 
                                            className="ss-frontend-content-container ss-frontend-content-text" 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")) }
                                        </div>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*HTML.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 7 ?
                                        <div key={ contentRowKey } 
                                            className="ss-frontend-content-container ss-frontend-content-text" 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db,linkStyle=ss-frontend-content-links")) }
                                        </div>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*File.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 8 ?
                                        <div key={ contentRowKey } 
                                            className="ss-frontend-content-container ss-frontend-content-text" 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { contentRow.file !== "" ? 
                                                <React.Fragment>
                                                    { /*Download link.*/ }
                                                    { contentRow.file_config == 3 ?
                                                        <a download href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + contentRow.file}
                                                            target="_blank"
                                                            title={
                                                                contentRow.content_text != "" ?
                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                    : 
                                                                    contentRow.file
                                                                }
                                                            className="ss-frontend-content-links">
                                                                { contentRow.content_text != "" ?
                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                    : 
                                                                    contentRow.file
                                                                }
                                                        </a>
                                                        : ``
                                                    }


                                                    { /*Open on media.*/ }
                                                    { contentRow.file_config == 4 ?
                                                        <a href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + contentRow.file}
                                                            target="_blank"
                                                            title={
                                                                contentRow.content_text != "" ?
                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                    : 
                                                                    contentRow.file
                                                                }
                                                            className="ss-frontend-content-links">
                                                                { contentRow.content_text != "" ?
                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                    : 
                                                                    contentRow.file
                                                                }
                                                        </a>
                                                        : ``
                                                    }
                                                </React.Fragment>
                                                : 
                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") 
                                            }
                                        </div>
                                        : ``
                                    }
                                    { /*----------------------*/ }
                                    


                                    { /*Columns.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 10 ?
                                        <div key={ contentRowKey } 
                                            className="ss-frontend-content-container ss-frontend-content-text" 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")) }
                                        </div>
                                        : ``
                                    }
                                    { /*----------------------*/ }



                                    { /*Debug.*/ }
                                    { /*<div key={ contentRowKey } className="ss-frontend-content-container">
                                        id = { contentRow.id }
                                    </div>*/ }
                                    { /*
                                    id = { contentRow.id }
                                    <br />
                                    align_image = { contentRow.align_image }
                                    <br />
                                    file = { contentRow.file }
                                    */ }
                                </React.Fragment>
                            );
                        })}
                    </div>
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


        //div layout (bootstrap).
        //----------------------
        if(configLayoutType == 22)
        {
            if(arrContentListing.length > 0)
            {
                //Output.
                return(
                    <div className="container">
                        {arrContentListing.map((contentRow, contentRowKey) =>{
                            return(
                                <React.Fragment>
                                    { /*Heading title.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 1 ?
                                        <h2 key={ contentRowKey } 
                                            className={"row " + SyncSystemNS.FunctionsGeneric.formattingHTML("bootstrapClassTextAlignFlex", contentRow.align_text) +" ss-frontend-content-heading-title"} 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")) }
                                        </h2>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*Subheading title.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 2 ?
                                        <h3 key={ contentRowKey } 
                                            className={"row " + SyncSystemNS.FunctionsGeneric.formattingHTML("bootstrapClassTextAlignFlex", contentRow.align_text) +" ss-frontend-content-subheading-title"} 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")) }
                                        </h3>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*Content text.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 3 ?
                                        <p key={ contentRowKey } 
                                            className={"row " + SyncSystemNS.FunctionsGeneric.formattingHTML("bootstrapClassTextAlignFlex", contentRow.align_text) +" ss-frontend-content-text"}>
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db,linkStyle=ss-frontend-content-links")) }
                                        </p>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*Tab.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 4 ?
                                        <p key={ contentRowKey } 
                                            className={"row " + SyncSystemNS.FunctionsGeneric.formattingHTML("bootstrapClassTextAlignFlex", contentRow.align_text) +" ss-frontend-content-tab"} 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db,linkStyle=ss-frontend-content-links")) }
                                        </p>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*Image.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 5 || contentRow.content_type == 9 ?
                                        <React.Fragment>
                                            { /*Left.*/ }
                                            { contentRow.align_image == 3 ?
                                                <React.Fragment>
                                                    <div key={ contentRowKey } 
                                                        className="row justify-content-start">
                                                        <React.Fragment>
                                                        { contentRow.file != "" ?
                                                            <React.Fragment>
                                                                <figure className="img-left">
                                                                    <picture>
                                                                        { /*<!--source media="(min-width:650px)" srcset="${ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }">
                                                                        <source media="(min-width:465px)" srcset="${ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }"-->*/ }
                                                                        
                                                                        <React.Fragment>
                                                                        { contentRow.content_url != "" ? 
                                                                            <a href={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_url, "url")} 
                                                                                target="_blank"
                                                                                title={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")}>
                                                                                <img src={
                                                                                        contentRow.content_type == 9 ?
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                        :
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                        } 
                                                                                    alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                    className="ss-frontend-content-images">
                                                                                </img>
                                                                            </a>
                                                                        :
                                                                            <React.Fragment>
                                                                                { /*No pop-up.*/ }
                                                                                { gSystemConfig.configImagePopup == 0 ?
                                                                                    <img src={
                                                                                            contentRow.content_type == 9 ?
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                            :
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                        } 
                                                                                        alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                        className="ss-frontend-content-images">
                                                                                    </img>
                                                                                    : ``
                                                                                }


                                                                                { /*GLightbox.*/ }
                                                                                { gSystemConfig.configImagePopup == 4 ?
                                                                                    <React.Fragment>
                                                                                        <a href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + contentRow.file}
                                                                                            title={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                            className={"glightbox_categories_image_main" + contentRow.id}
                                                                                            data-glightbox={"title:" + SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")}
                                                                                            >
                                                                                            <img src={
                                                                                                    contentRow.content_type == 9 ?
                                                                                                    gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                                    :
                                                                                                    gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                                } 
                                                                                                alt={
                                                                                                    contentRow.caption != "" ?
                                                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")
                                                                                                    : 
                                                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                                                } 
                                                                                                className="ss-frontend-content-images">
                                                                                            </img>
                                                                                        </a>
                                                                                    
                                                                                        {/* HTMLReactParser(
                                                                                            `<script type="text/babel">
                                                                                                alert("testing simple script");
                                                                                                document.addEventListener('DOMContentLoaded', function(event) {
                                                                                                    alert("testing simple script (inside addeventlistener)");
                                                                                                    gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ contentRow.id }";
                                                                                                    //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                                                                    //data-glightbox="title: Title example.; description: Description example."
                                                                                                    var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                                                                });
                                                                                            </script>`
                                                                                            ) */}

                                                                                        {
                                                                                        /*`<script type="text/babel">
                                                                                        alert("testing simple script");
                                                                                        document.addEventListener('DOMContentLoaded', function(event) {
                                                                                            alert("testing simple script (inside addeventlistener)");
                                                                                            gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ contentRow.id }";
                                                                                            //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                                                            //data-glightbox="title: Title example.; description: Description example."
                                                                                            var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                                                        });
                                                                                        </script>`*/
                                                                                        }
                                                                                        <Safe.script type="text/babel">
                                                                                            {`
                                                                                                alert("testing simple script");
                                                                                            `}
                                                                                        </Safe.script>
                                                                                    </React.Fragment>
                                                                                    : ``
                                                                                }
                                                                            </React.Fragment>
                                                                        }
                                                                        </React.Fragment>
                                                                    </picture>

                                                                    { contentRow.caption != "" ?
                                                                        <figcaption className="text-center ss-frontend-content-caption ss-frontend-content-images-caption">
                                                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }
                                                                        </figcaption>
                                                                        :``
                                                                    }
                                                                </figure>
                                                            </React.Fragment>
                                                            : ``
                                                        }
                                                        </React.Fragment>
                                                        <React.Fragment>
                                                            { contentRow.content_text != "" ?
                                                                <p className="ss-frontend-content-text" style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db,linkStyle=ss-frontend-content-links")) }
                                                                </p>
                                                                :``
                                                            }
                                                        </React.Fragment>
                                                    </div>
                                                </React.Fragment>
                                                : ``
                                            }


                                            { /*Center.*/ }
                                            { contentRow.align_image == 2 ?
                                                <React.Fragment>
                                                    <React.Fragment>
                                                        <div key={ contentRowKey } 
                                                            className="row justify-content-center">
                                                            <React.Fragment>
                                                            { contentRow.file != "" ?
                                                                <figure className="ss-frontend-content-images-container-center">
                                                                    <picture>
                                                                        { /*<!--source media="(min-width:650px)" srcset="${ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }">
                                                                        <source media="(min-width:465px)" srcset="${ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }"-->*/ }
                                                                        
                                                                        <React.Fragment>
                                                                        { contentRow.content_url != "" ? 
                                                                            <a href={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_url, "url")} 
                                                                                target="_blank"
                                                                                title={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")}>
                                                                                <img src={
                                                                                        contentRow.content_type == 9 ?
                                                                                        gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                        :
                                                                                        gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + contentRow.file 
                                                                                    } 
                                                                                    alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                    className="ss-frontend-content-images">
                                                                                </img>
                                                                            </a>
                                                                        :
                                                                            <React.Fragment>
                                                                                { /*No pop-up.*/ }
                                                                                { gSystemConfig.configImagePopup == 0 ?
                                                                                    <img src={
                                                                                            contentRow.content_type == 9 ?
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                            :
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + contentRow.file 
                                                                                        } 
                                                                                        alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                        className="ss-frontend-content-images">
                                                                                    </img>
                                                                                    : ``
                                                                                }


                                                                                { /*GLightbox.*/ }
                                                                                { gSystemConfig.configImagePopup == 4 ?
                                                                                    <React.Fragment>
                                                                                        <a href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + contentRow.file}
                                                                                            title={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                            className={"glightbox_categories_image_main" + contentRow.id}
                                                                                            data-glightbox={"title:" + SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")}
                                                                                            >
                                                                                            <img src={
                                                                                                    contentRow.content_type == 9 ?
                                                                                                    gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                                    :
                                                                                                    gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + contentRow.file 
                                                                                                } 
                                                                                                alt={
                                                                                                    contentRow.caption != "" ?
                                                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")
                                                                                                    : 
                                                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                                                } 
                                                                                                className="ss-frontend-content-images">
                                                                                            </img>
                                                                                        </a>
                                                                                    
                                                                                        {/* HTMLReactParser(
                                                                                            `<script type="text/babel">
                                                                                                alert("testing simple script");
                                                                                                document.addEventListener('DOMContentLoaded', function(event) {
                                                                                                    alert("testing simple script (inside addeventlistener)");
                                                                                                    gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ contentRow.id }";
                                                                                                    //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                                                                    //data-glightbox="title: Title example.; description: Description example."
                                                                                                    var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                                                                });
                                                                                            </script>`
                                                                                            ) */}
                                                                                    </React.Fragment>
                                                                                    : ``
                                                                                }
                                                                            </React.Fragment>
                                                                        }
                                                                        </React.Fragment>
                                                                    </picture>

                                                                    { contentRow.caption != "" ?
                                                                        <figcaption className="text-center ss-frontend-content-caption ss-frontend-content-images-caption">
                                                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }
                                                                        </figcaption>
                                                                        :``
                                                                    }
                                                                </figure>
                                                                : ``
                                                            }
                                                            </React.Fragment>
                                                        </div>
                                                    </React.Fragment>
                                                    <React.Fragment>
                                                        { contentRow.content_text != "" ?
                                                            <p className={"row " + SyncSystemNS.FunctionsGeneric.formattingHTML("bootstrapClassTextAlignFlex", contentRow.align_text) +" ss-frontend-content-text"}>
                                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db,linkStyle=ss-frontend-content-links")) }
                                                            </p>
                                                            :``
                                                        }
                                                    </React.Fragment>
                                                </React.Fragment>
                                                : ``
                                            }


                                            { /*Right.*/ }
                                            { contentRow.align_image == 1 ?
                                                <React.Fragment>
                                                    <div key={ contentRowKey } 
                                                        className="row justify-content-end">
                                                        <React.Fragment>
                                                            <React.Fragment>
                                                                { contentRow.content_text != "" ?
                                                                    <p className={"row " + SyncSystemNS.FunctionsGeneric.formattingHTML("bootstrapClassTextAlignFlex", contentRow.align_text) +" ss-frontend-content-text"}>
                                                                        { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db,linkStyle=ss-frontend-content-links")) }
                                                                    </p>
                                                                    :``
                                                                }
                                                            </React.Fragment>
                                                            { contentRow.file != "" ?
                                                                <React.Fragment>
                                                                    <figure className="img-right">
                                                                        <picture>
                                                                            { /*<!--source media="(min-width:650px)" srcset="${ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }">
                                                                            <source media="(min-width:465px)" srcset="${ gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file }"-->*/ }
                                                                            
                                                                            <React.Fragment>
                                                                            { contentRow.content_url != "" ? 
                                                                                <a href={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_url, "url")} 
                                                                                    target="_blank"
                                                                                    title={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")}>
                                                                                    <img src={
                                                                                            contentRow.content_type == 9 ?
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                            :
                                                                                            gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                        } 
                                                                                        alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                        className="ss-frontend-content-images">
                                                                                    </img>
                                                                                </a>
                                                                            :
                                                                                <React.Fragment>
                                                                                    { /*No pop-up.*/ }
                                                                                    { gSystemConfig.configImagePopup == 0 ?
                                                                                        <img src={
                                                                                                contentRow.content_type == 9 ?
                                                                                                gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                                :
                                                                                                gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                            } 
                                                                                            alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                            className="ss-frontend-content-images">
                                                                                        </img>
                                                                                        : ``
                                                                                    }


                                                                                    { /*GLightbox.*/ }
                                                                                    { gSystemConfig.configImagePopup == 4 ?
                                                                                        <React.Fragment>
                                                                                            <a href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/g" + contentRow.file}
                                                                                                title={SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")} 
                                                                                                className={"glightbox_categories_image_main" + contentRow.id}
                                                                                                data-glightbox={"title:" + SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")}
                                                                                                >
                                                                                                <img src={
                                                                                                        contentRow.content_type == 9 ?
                                                                                                        gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/o" + contentRow.file 
                                                                                                        :
                                                                                                        gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/r" + contentRow.file 
                                                                                                    } 
                                                                                                    alt={
                                                                                                        contentRow.caption != "" ?
                                                                                                        SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db")
                                                                                                        : 
                                                                                                        SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                                                    } 
                                                                                                    className="ss-frontend-content-images">
                                                                                                </img>
                                                                                            </a>
                                                                                        
                                                                                            {/* HTMLReactParser(
                                                                                                `<script type="text/babel">
                                                                                                    alert("testing simple script");
                                                                                                    document.addEventListener('DOMContentLoaded', function(event) {
                                                                                                        alert("testing simple script (inside addeventlistener)");
                                                                                                        gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main${ contentRow.id }";
                                                                                                        //Note: With ID in the selector, will open individual pop-ups. Without id (same class name in all links) will enable scroll.
                                                                                                        //data-glightbox="title: Title example.; description: Description example."
                                                                                                        var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);
                                                                                                    });
                                                                                                </script>`
                                                                                                ) */}

                                                                                            <Safe.script type="text/babel">
                                                                                                {`
                                                                                                    alert("testing simple script");
                                                                                                `}
                                                                                            </Safe.script>
                                                                                        </React.Fragment>
                                                                                        : ``
                                                                                    }
                                                                                </React.Fragment>
                                                                            }
                                                                            </React.Fragment>
                                                                        </picture>

                                                                        { contentRow.caption != "" ?
                                                                            <figcaption className="text-center ss-frontend-content-caption ss-frontend-content-images-caption">
                                                                                { SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.caption, "db") }
                                                                            </figcaption>
                                                                            :``
                                                                        }
                                                                    </figure>
                                                                </React.Fragment>
                                                                : ``
                                                            }
                                                        </React.Fragment>
                                                    </div>
                                                </React.Fragment>
                                                : ``
                                            }
                                        </React.Fragment>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*Videos.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 6 ?
                                        <div key={ contentRowKey } 
                                            className="row ss-frontend-content-text" 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                        </div>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*HTML.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 7 ?
                                        <p key={ contentRowKey } 
                                            className={"row " + SyncSystemNS.FunctionsGeneric.formattingHTML("bootstrapClassTextAlignFlex", contentRow.align_text) +" ss-frontend-content-text"}>
                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db,linkStyle=ss-frontend-content-links")) }
                                        </p>
                                        : ``
                                    }
                                    { /*----------------------*/ }


                                    { /*File.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 8 ?
                                        <div key={ contentRowKey } 
                                            className={"row " + SyncSystemNS.FunctionsGeneric.formattingHTML("bootstrapClassTextAlignFlex", contentRow.align_text) +" ss-frontend-content-text"} 
                                            style={{textAlign: SyncSystemNS.FunctionsGeneric.formattingHTML("cssTextAlign", contentRow.align_text)}}>
                                            { contentRow.file !== "" ? 
                                                <React.Fragment>
                                                    { /*Download link.*/ }
                                                    { contentRow.file_config == 3 ?
                                                        <a download href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + contentRow.file}
                                                            target="_blank"
                                                            title={
                                                                contentRow.content_text != "" ?
                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                    : 
                                                                    contentRow.file
                                                                }
                                                            className="ss-frontend-content-links">
                                                                { contentRow.content_text != "" ?
                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                    : 
                                                                    contentRow.file
                                                                }
                                                        </a>
                                                        : ``
                                                    }


                                                    { /*Open on media.*/ }
                                                    { contentRow.file_config == 4 ?
                                                        <a href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + contentRow.file}
                                                            target="_blank"
                                                            title={
                                                                contentRow.content_text != "" ?
                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                    : 
                                                                    contentRow.file
                                                                }
                                                            className="ss-frontend-content-links">
                                                                { contentRow.content_text != "" ?
                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")
                                                                    : 
                                                                    contentRow.file
                                                                }
                                                        </a>
                                                        : ``
                                                    }
                                                </React.Fragment>
                                                : 
                                                HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db")) 
                                            }
                                        </div>
                                        : ``
                                    }
                                    { /*----------------------*/ }
                                    


                                    { /*Columns.*/ }
                                    { /*----------------------*/ }
                                    { contentRow.content_type == 10 ?
                                        <p key={ contentRowKey } 
                                            className={"row " + SyncSystemNS.FunctionsGeneric.formattingHTML("bootstrapClassTextAlignFlex", contentRow.align_text) +" ss-frontend-content-text"}>
                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(contentRow.content_text, "db") }
                                        </p>
                                        : ``
                                    }
                                    { /*----------------------*/ }



                                    { /*Debug.*/ }
                                    { /*<div key={ contentRowKey } className="ss-frontend-content-container">
                                        id = { contentRow.id }
                                    </div>*/ }
                                    { /*
                                    id = { contentRow.id }
                                    <br />
                                    align_image = { contentRow.align_image }
                                    <br />
                                    file = { contentRow.file }
                                    */ }
                                </React.Fragment>
                            );
                        })}
                    </div>
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


export default FrontendContentListingRecord;