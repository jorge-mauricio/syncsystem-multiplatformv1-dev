"use strict";

//Import Node Modules.
//----------------------
//const gSystemConfig = require("../config-application.js"); //System configuration.
//const FunctionsGeneric = require("../" + gSystemConfig.configDirectoryComponents + "/functions-generic.js");
//const FunctionsCrypto = require("../" + gSystemConfig.configDirectoryComponents + "/functions-crypto.js");

//Context.
import { SyncSystemNSContext } from "./syncsystem-ns-cb-context.js";

//import React from "react";
import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { Link } from 'react-router-dom';

//Components.
import FrontendContentListingRecord from "./frontend-content-listing-record-cb-component.js";
//----------------------


class FrontendContent extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //idParentContent: (category id)
        //idTbContent: (individual record)
        //contentType: ()

        //configLayoutType: 1 - table listing (custom) | 2 - div layout (custom) | 11 - table listing (bootstrap) | 22 - div layout (bootstrap) | 111 - table listing (dashboard - custom) 
        //configContentNRecords: (maximum number of records to show)
        //configContentSort: (custom order)


        super(props, context);
        /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */


        //Variables.
        //----------------------
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).
        //----------------------


        //Properties.
        //----------------------
        this.idParentContent;
        this.idTbContent;
        this.contentType;
        this.configLayoutType;
        this.configContentNRecords;
        this.configContentSort;

        this.queryDefault = ""; //NOTE: try to get from parent

        this.objContentListing = {};
        this.arrContentListing = [];
        //----------------------


        //Define values - props parameters.
        //----------------------
        this.idParentContent = this.props.idParentContent;
        this.idTbContent = this.props.idTbContent;
        this.contentType = this.props.contentType;
        this.configLayoutType = this.props.configLayoutType;
        this.configContentNRecords = this.props.configContentNRecords;
        this.configContentSort = this.props.configContentSort;
        //----------------------


        //Logic
        //----------------------
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
                objContentListing: this.objContentListing,
                arrContentListing: this.arrContentListing,
                dataLoaded: false
            };            
        }
        //----------------------
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
            
            /*
            fetch("http://localhost:3000/api/categories/details/813")
            .then(response => response.json())
            .then((data)=>{
                this.objCategoriesCurrent = data;

                //Define value - current category title.
                this.titleCurrent = this.objCategoriesCurrent.tblCategoriesTitle;

                //Set state.
                //this.setState({titleCurrent: "testing after fetch"});


                //Debug.
                console.log("this.titleCurrent=",this.titleCurrent);
                console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);
            });
            */


            //Check if this._idParentCategories is number. If not, search for the id based on the friendly name.
            

            //API - fetch data from backend.
            //var response = await fetch("http://localhost:3000/api/categories/details/813");
            //this.objCategoriesCurrent = await response.json();
            //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
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
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).

        var apiURLContentListing = "";
        var apiContentListingResponse;
        //----------------------
        

        //Logic.
        //----------------------
        /**/
        try
        {
            //API - build URL string.
            //apiURLContentListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIContent + "/" + this.idParentContent + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            //apiURLContentListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIContent + "/" + this.idParentContent + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2);
            apiURLContentListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIContent + "/" + this.idParentContent;
            apiURLContentListing += "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2); 
            if(this.contentType != "")
            {
                apiURLContentListing += "&contentType=" + this.contentType; 
            }
            //console.log("apiURLCategoriesDetailsCurrent=", apiURLCategoriesDetailsCurrent);


            //API - fetch data from backend.
            //var response = await fetch(apiURLCategoriesDetailsCurrent);
            apiContentListingResponse = await fetch(apiURLContentListing);
            //this.objContentCurrent = await response.json();
            this.objContentCurrent = await apiContentListingResponse.json(); //TODO: change to objContentCurrentJson
            //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);


            //Value definition.
            this.objContentListing = this.objContentCurrent.oclRecords;
            this.arrContentListing = this.objContentCurrent.oclRecords.resultsContentListing;



            //Check if this._idParentCategories is number. If not, search for the id based on the friendly name.
            

            //API - fetch data from backend.
            /*
            fetch("http://localhost:3000/api/categories/details/813")
            .then(response => response.json())
            .then((data)=>{
                this.objCategoriesCurrent = data;
                
                //Debug.
                console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);
            });
            */
            
            //var response = await fetch("http://localhost:3000/api/categories/details/813");
            //this.objCategoriesCurrent = await response.json();
            //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);

        }catch(buildError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(buildError);
            }
        }finally{
            //Update state.
            this.setState({ objContentListing: this.objContentListing });
            this.setState({ arrContentListing: this.arrContentListing });
            
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
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;
        
        var arrContentListing;

        /*
        var idParentContent;
        var idTbContent;
        var contentType;
        var configLayoutType;
        var configContentNRecords;
        var configContentSort;
        */
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
        arrContentListing = this.state.arrContentListing;
        /*
        idParentContent = this.props.idParentContent;
        idTbContent = this.props.idTbContent;
        contentType = this.props.contentType;
        configLayoutType = this.props.configLayoutType;
        configContentNRecords = this.props.configContentNRecords;
        configContentSort = this.props.configContentSort;
        //arrCategoriesListing = this.props.arrCategoriesListing;
        */


        //Debug.
        //console.log("idParentContent=", this.idParentContent);
        //console.log("idTbContent=", this.idTbContent);
        //console.log("contentType=", this.contentType);
        //console.log("configLayoutType=", this.configLayoutType);
        //console.log("configContentNRecords=", this.configContentNRecords);
        //console.log("configContentSort=", this.configContentSort);
        
        //console.log("arrContentListing=", arrContentListing);
        //----------------------
    

        //Output.
        //----------------------
        return(
            <React.Fragment>
                { /*Content records.*/ }
                <FrontendContentListingRecord 
                    arrContentListing={ arrContentListing } 
                    configLayoutType={ this.configLayoutType }>
                        {/*arrContentListing={ this.arrContentListing } also works*/}
                </FrontendContentListingRecord>
            </React.Fragment>
        );
        //----------------------

    }    
    //**************************************************************************************
}


export default FrontendContent;