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


class FrontendFilesListingRecord extends Component
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
        //this.configFilesZoom;
        //----------------------


        //Define values - props parameters.
        //----------------------
        this.arrFilesListing = this.props.arrFilesListing;
        this.configLayoutType = this.props.configLayoutType;
        //this.configFilesZoom = this.props.configFilesZoom;
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
        //var configFilesZoom;
        //----------------------


        //Define values.
        //----------------------
        arrFilesListing = this.arrFilesListing;
        configLayoutType = this.configLayoutType;
        //configFilesZoom = this.configFilesZoom;


        //Debug.
        console.log("arrFilesListing (frontend files listing record)=", arrFilesListing);
        console.log("configLayoutType (frontend files listing record)=", configLayoutType);
        //console.log("configFilesZoom (frontend files listing record)=", configFilesZoom);
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
                        <div className="ss-frontend-files-text01">
                            {arrFilesListing.map((filesRow, filesRowKey)=>{
                                return(
                                    //*Row.
                                    <div key={filesRowKey} className="ss-frontend-files-caption01">
                                        { filesRow.file != "" ? 
                                            <React.Fragment>
                                                { /*Download link.*/ }
                                                { filesRow.file_config == 3 ? 
                                                    <a download
                                                        href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + filesRow.file} 
                                                        target="_blank" 
                                                        title={filesRow.caption != "" ? 
                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") 
                                                                : 
                                                                    filesRow.file
                                                                }
                                                        className="ss-frontend-files-link01">
                                                            { filesRow.caption != "" ? 
                                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") 
                                                            : 
                                                                filesRow.file
                                                            }
                                                    </a>
                                                :``
                                                }

                                                { /*Open on media.*/ }
                                                { filesRow.file_config == 4 ? 
                                                    <a href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + filesRow.file}
                                                        target="_blank" 
                                                        title={filesRow.caption != "" ? 
                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") 
                                                                : 
                                                                    filesRow.file
                                                                }
                                                        className="ss-frontend-files-link01">
                                                            { filesRow.caption != "" ? 
                                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") 
                                                            : 
                                                                filesRow.file
                                                            }
                                                    </a>
                                                :``
                                                }
                                            </React.Fragment>
                                        :
                                            SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") 
                                        }
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
                            <div className="row d-block text-center">
                                {arrFilesListing.map((filesRow, filesRowKey)=>{
                                    return(
                                        //Row.
                                        <div key={filesRowKey} 
                                            className="ss-frontend-files-caption01">

                                            { filesRow.file != "" ? 
                                                <React.Fragment>
                                                    { /*Download link.*/ }
                                                    { filesRow.file_config == 3 ? 
                                                        <a download
                                                            href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + filesRow.file} 
                                                            target="_blank" 
                                                            title={filesRow.caption != "" ? 
                                                                        SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") 
                                                                    : 
                                                                        filesRow.file
                                                                    }
                                                            className="ss-frontend-files-link01">
                                                                { filesRow.caption != "" ? 
                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") 
                                                                : 
                                                                    filesRow.file
                                                                }
                                                        </a>
                                                    :``
                                                    }

                                                    { /*Open on media.*/ }
                                                    { filesRow.file_config == 4 ? 
                                                        <a href={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + "/" + filesRow.file}
                                                            target="_blank" 
                                                            title={filesRow.caption != "" ? 
                                                                        SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") 
                                                                    : 
                                                                        filesRow.file
                                                                    }
                                                            className="ss-frontend-files-link01">
                                                                { filesRow.caption != "" ? 
                                                                    SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") 
                                                                : 
                                                                    filesRow.file
                                                                }
                                                        </a>
                                                    :``
                                                    }
                                                </React.Fragment>
                                            :
                                                SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, "db") 
                                            }
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


export default FrontendFilesListingRecord;