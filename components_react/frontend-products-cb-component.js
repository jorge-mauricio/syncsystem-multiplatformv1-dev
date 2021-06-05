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


//Components.
import FrontendProductsListingRecord from "./frontend-products-listing-record-cb-component.js";
//----------------------


class FrontendProducts extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //idParentProducts: (categories id)
        //idRegisterUser: (register id)

        //configLayoutType: 1 - table listing (custom) | 2 - div layout (custom) | 3 - div row (custom) | 11 - table listing (bootstrap) | 22 - div layout (bootstrap) | 33 - div row (bootstrap) | 111 - table listing (dashboard - custom) 
        //configProductsNRecords: (maximum number of records to show)
        //configProductsSort: (custom order)

        //activation: 
        //activation1: 
        //activation2: 
        //activation3: 
        //activation4: 
        //activation5: 


        super(props, context);
        /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */


        //Variables.
        //----------------------
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).
        //----------------------


        //Properties.
        //----------------------
        this.idParentProducts;
        this.idRegisterUser;

        this.configLayoutType;
        this.configProductsNRecords;
        this.configProductsSort;

        this.activation;
        this.activation1;
        this.activation2;
        this.activation3;
        this.activation4;
        this.activation5;

        this.queryDefault = ""; //NOTE: try to get from parent

        this.objProductsListingJson;
        this.objProductsListing = {};
        this.arrProductsListing = [];
        //----------------------


        //Define values - props parameters.
        //----------------------
        this.idParentProducts = this.props.idParentProducts;
        this.idRegisterUser = this.props.idRegisterUser;

        this.configLayoutType = this.props.configLayoutType;
        this.configProductsNRecords = this.props.configProductsNRecords;
        this.configProductsSort = this.props.configProductsSort;

        this.activation = this.props.activation;
        this.activation1 = this.props.activation1;
        this.activation2 = this.props.activation2;
        this.activation3 = this.props.activation3;
        this.activation4 = this.props.activation4;
        this.activation5 = this.props.activation5;
        //----------------------


        //Logic
        try{
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


            //await this.build();
            //this.build();
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{
            //State creation.
            this.state = {
                objProductsListing: this.objProductsListing,
                arrProductsListing: this.arrProductsListing,
                dataLoaded: false
            };            
        }

    }
    //**************************************************************************************


    //Lifecycle method.
    //**************************************************************************************
    async componentWillMount()
    {
        //Main build.
        //await this.build();

        //Head content.
        //await this.headBuild();

        //Title content.
        //await this.titleCurrentBuild();
    }
    //**************************************************************************************


    //Lifecycle method.
    //**************************************************************************************
    //componentDidMount()
    async componentDidMount()
    {
        //Logic.
        //----------------------
        /**/
        try
        {
            //Main build.
            await this.build();

            //Head content.
            //await this.headBuild();

            //Title content.
            //await this.titleCurrentBuild();
        }catch(componentDidMountError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(componentDidMountError);
            }
        }finally{

        }
        //----------------------


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
        //----------------------
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).
        
        var apiURLProductsListing = "";
        var apiProductsListingResponse;
        //----------------------


        //Logic.
        //----------------------
        try
        {
            //API - build URL string.
            //apiURLProductsListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIProducts + "/" + this.idParentProducts + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            //apiURLProductsListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIProducts + "/" + this.idParentProducts + "/?strNRecords=" + this.configProductsNRecords + "&apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            //apiURLProductsListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIProducts + "/" + this.idParentProducts + "/?strNRecords=" + this.configProductsNRecords + "&apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2);
            apiURLProductsListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIProducts + "/" + this.idParentProducts + "/?strNRecords=" + this.configProductsNRecords;
            if(this.activation)
            {
                apiURLProductsListing += "&activation=" + this.activation;
            }
            if(this.activation1)
            {
                apiURLProductsListing += "&activation1=" + this.activation1;
            }
            if(this.activation2)
            {
                apiURLProductsListing += "&activation2=" + this.activation2;
            }
            if(this.activation3)
            {
                apiURLProductsListing += "&activation3=" + this.activation3;
            }
            if(this.activation4)
            {
                apiURLProductsListing += "&activation4=" + this.activation4;
            }
            if(this.activation5)
            {
                apiURLProductsListing += "&activation5=" + this.activation5;
            }
            //apiURLProductsListing += "&apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            apiURLProductsListing += "&apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2)

            //API - fetch data from backend.
            apiProductsListingResponse = await fetch(apiURLProductsListing);
            this.objProductsListingJson = await apiProductsListingResponse.json();

            //Value definition.
            this.objProductsListing = this.objProductsListingJson.oplRecords;
            this.arrProductsListing = this.objProductsListingJson.oplRecords.resultsProductsListing;

            //TODO: limit n records
            

            //Debug.
            //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);
        }catch(buildError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(buildError);
            }
        }finally{
            //Update state.
            this.setState({ objProductsListing: this.objProductsListing });
            this.setState({ arrProductsListing: this.arrProductsListing });
            
            this.setState({ dataLoaded: true }); //Note: Place on the last part of the logic.
        }
        //----------------------
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
        //const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, SyncSystemRC } = this.context;
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;
        
        var configLayoutType;
        var arrProductsListing;
        //----------------------


        //Check if data is loaded.
        //----------------------
        if(this.state.dataLoaded === false)
        {
            if(gSystemConfig.configDebug === true)
            {
                console.log("Still loading data.");
            }

            return '';
        }
        //----------------------


        //Define values.
        //----------------------
        configLayoutType = this.props.configLayoutType;
        arrProductsListing = this.state.arrProductsListing;

        /*
        idParentFiles = this.props.idParentFiles;
        idTbFiles = this.props.idTbFiles;
        contentType = this.props.contentType;
        configLayoutType = this.props.configLayoutType;
        configFilesNRecords = this.props.configFilesNRecords;
        configFilesSort = this.props.configFilesSort;
        //arrCategoriesListing = this.props.arrCategoriesListing;
        */


        //Debug.
        console.log("configLayoutType (inside component)=", this.configLayoutType);
        console.log("arrProductsListing  (inside component)=", this.arrProductsListing);
        console.log("configProductsNRecords=", this.configProductsNRecords);
        //console.log("configFilesSort=", this.configFilesSort);
        //console.log("configFilesZoom=", this.configFilesZoom);
        
        //console.log("arrFilesListing=", arrFilesListing);
        //----------------------
    

        //Output.
        //----------------------
        return(
            <React.Fragment>
                { /*Products records.*/ }
                <FrontendProductsListingRecord 
                    arrProductsListing={ this.state.arrProductsListing } 
                    configLayoutType={ configLayoutType }>
                </FrontendProductsListingRecord>
            </React.Fragment>
        );
        //----------------------
    }    
    //**************************************************************************************
}


export default FrontendProducts;