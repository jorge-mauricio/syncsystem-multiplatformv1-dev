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
import FrontendBannersRecord from "./frontend-banners-record-cb-component.js";
//----------------------


class FrontendBanners extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //idParentBanners: (banners_group id) | "" - static banner
        //idTbCategories: (categories id) 

        //configLayoutType: 1 - listing (custom) | 2 - slide show (custom) | 22 - slide show (bootstrap) 
        //configDisplay: "vertical" | "horizontal"
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
        this.idParentBanners;
        this.idTbCategories;
        this.configLayoutType;
        this.configDisplay;
        this.configContentNRecords;
        this.configContentSort;

        this.queryDefault = ""; //NOTE: try to get from parent

        //this.objContentListing = {};
        //this.arrContentListing = [];
        //----------------------


        //Define values - props parameters.
        //----------------------
        this.idParentBanners = this.props.idParentBanners;
        this.idTbCategories = this.props.idTbCategories;
        this.configLayoutType = this.props.configLayoutType;
        this.configDisplay = this.props.configDisplay;
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
                //objContentListing: this.objContentListing,
                //arrContentListing: this.arrContentListing,
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
        //----------------------
        

        //Logic.
        //----------------------
        /**/
        try
        {

            //TODO: banners api

        }catch(buildError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(buildError);
            }
        }finally{
            //Update state.
            //this.setState({ objContentListing: this.objContentListing });
            //this.setState({ arrContentListing: this.arrContentListing });
            
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
        
        var idParentBanners;
        var idTbCategories;
        var configLayoutType;
        var configDisplay;
        var configContentNRecords;
        var configContentSort;
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
        //arrContentListing = this.state.arrContentListing;
        idParentBanners = this.props.idParentBanners;
        idTbCategories = this.props.idTbCategories;
        configLayoutType = this.props.configLayoutType;
        configDisplay = this.props.configDisplay;
        configContentNRecords = this.props.configContentNRecords;
        configContentSort = this.props.configContentSort;

        //Debug.
        //console.log("idParentBanners=", this.idParentBanners);
        //console.log("configLayoutType=", this.configLayoutType);
        //console.log("configDisplay=", this.configDisplay);
        //console.log("configContentNRecords=", this.configContentNRecords);
        //console.log("configContentSort=", this.configContentSort);
        
        //console.log("arrContentListing=", arrContentListing);
        //----------------------


        //Output.
        //----------------------
        return(
            <FrontendBannersRecord
                configLayoutType={configLayoutType} 
                configDisplay={configDisplay} 
                arrBannersListing={""}>

            </FrontendBannersRecord>
        );
        //----------------------

    }    
    //**************************************************************************************

}


export default FrontendBanners;