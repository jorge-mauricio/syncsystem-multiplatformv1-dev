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
import FrontendFormsRecord from "./frontend-forms-record-cb-component.js";
//----------------------


class FrontendForms extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //idTbForms: (individual record)
        //contentType: ()

        //configLayoutType: 1 - table listing - field names by the side of fields (custom) | 2 - div layout - field names on top fields (custom) | 3 - field names inside of fields (custom) |  21 - table listing - field names by the side of fields (bootstrap) | 22 - div layout - field names on top fields (bootstrap) | 23 - field names inside of fields (bootstrap)
        //configFormsSort: (custom order)


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
        this.idTbForms;
        this.configLayoutType;
        //this.configFormsNRecords;
        this.configFormsSort;

        this.queryDefault = ""; //NOTE: try to get from parent

        this.objForms = {};
        this.objFormsDetails = {};
        //this.arrFormsDetails = [];
        //this.arrFormsFieldsListing = [];
        //this.arrFormsFieldsOptionsListing = [];
        //----------------------


        //Define values - props parameters.
        //----------------------
        this.idTbForms = this.props.idTbForms;
        this.configLayoutType = this.props.configLayoutType;
        //this.configFormsNRecords = this.props.configFormsNRecords;
        this.configFormsSort = this.props.configFormsSort;
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
                objFormsDetails: this.objFormsDetails,
                //arrFormsDetails: this.arrFormsDetails,
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

        var apiURLFormsDetails = "";
        var apiFormsDetailsResponse;

        //Debug.
        //console.log("gSystemConfig (inside home cb component)=", gSystemConfig);
        //console.log("this.context (inside home cb component)=", this.context);
        //----------------------
        

        //Logic.
        //----------------------
        /**/
        try
        {
            //API - build URL string.
            //apiURLFormsDetails = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIForms + "/" + gSystemConfig.configRouteAPIDetails + "/" + this.idTbForms + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            apiURLFormsDetails = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIForms + "/" + gSystemConfig.configRouteAPIDetails + "/" + this.idTbForms + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2);
            //console.log("apiURLCategoriesDetailsCurrent=", apiURLCategoriesDetailsCurrent);

            //API - fetch data from backend.
            apiFormsDetailsResponse = await fetch(apiURLFormsDetails);
            this.objForms = await apiFormsDetailsResponse.json();

            //Debug.
            //console.log("apiFormsDetailsResponse (frontend forms cb component)=",apiFormsDetailsResponse);
            //console.log("this.objForms (frontend forms cb component)=",this.objForms);


            //Value definition.
            this.objFormsDetails = this.objForms.ofdRecord;
            //this.arrFormsDetails = this.objForms.ofdRecord.resultsFormsDetails;

        }catch(buildError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(buildError);
            }
        }finally{
            //Update state.
            this.setState({ objForms: this.objForms });
            this.setState({ objFormsDetails: this.objFormsDetails });
            //this.setState({ arrFormsDetails: this.arrFormsDetails });

            //Note: Place on the last part of the logic.
            this.setState({ dataLoaded: true });
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
        
        var objForms;
        var objFormsDetails;
        //var arrFormsDetails;
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
        objFormsDetails = this.state.objFormsDetails;
        //arrFormsDetails = this.state.arrFormsDetails;
        objForms = this.state.objForms;



        //Debug.
        //console.log("idTbForms (frontend forms cb component)=", this.idTbForms);
        //console.log("configLayoutType (frontend forms cb component)=", this.configLayoutType);
        //console.log("configFormsSort (frontend forms cb component)=", this.configFormsSort);

        //console.log("objFormsDetails (frontend forms cb component)=", objFormsDetails);
        //console.log("objForms (frontend forms cb component)=", objForms);
        //console.log("arrContentListing=", arrContentListing);
        //----------------------


        //Output.
        //----------------------
        return(
            <React.Fragment>
                <FrontendFormsRecord
                    configLayoutType={this.configLayoutType} 
                    objForms={objForms}>
                </FrontendFormsRecord>
            </React.Fragment>
        );
        //----------------------
    }
    //**************************************************************************************
}


export default FrontendForms;