"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //{path: '../.env'}
//const { CONFIG_API_URL } = process.env;
//const { REACT_APP_CONFIG_API_URL } = process.env;

//const gSystemConfig = require("../config-application.js"); //System configuration.
////const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
////const FunctionsDB = require("../" + gSystemConfig.configDirectoryComponents + "/functions-db.js");
//const FunctionsGeneric = require("../" + gSystemConfig.configDirectoryComponents + "/functions-generic.js");
//const FunctionsCrypto = require("../" + gSystemConfig.configDirectoryComponents + "/functions-crypto.js");

//Context.
import { SyncSystemNSContext } from "./syncsystem-ns-cb-context.js";

//Provider.
//import SyncSystemNSContextProvider from "./syncsystem-ns-cb-context.js";


//Node modules.
//const qs = require('query-string');

//import React from "react";
import React, {Component} from "react";
import ReactDOM from "react-dom";

//import "../app_js/functions-syncsystem.js";
//import {elementMessage01} from "../app_js/functions-syncsystem.js"; //working
//import FunctionsSyncSystem from "../app_js/functions-syncsystem.js";
/*
if (typeof window !== 'undefined') {
    import "../app_js/functions-syncsystem.js";
}
*/

//Components.
import FrontendQuizzesListingRecord from "./frontend-quizzes-listing-record-cb-component.js";
//----------------------


class FrontendQuizzesListing extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        super(props, context);

        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, qs } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).


        //Properties.
        //----------------------
        this.objParametersQueryString = qs.parse(this.props.location.search);

        this._idParentQuizzes = 0;

        //this._pagingNRecords = gSystemConfig.configQuizzesFrontendPaginationNRecords;
        //this._pagingTotalRecords = 0;
        //this._pagingTotal = 0;
        ////this._pageNumber = this.props.location.query.pageNumber;
        //this._pageNumber = 1;
        this._masterPageFrontendSelect = "";

        this._messageSuccess = "";
        this._messageError = "";
        this._messageAlert = "";
        this._nRecords = "";

        this.queryDefault = "";

        this.objCategoriesCurrent = {};
        this.titleCurrent = "";

        this.objQuizzesListingJson;
        this.objQuizzesListing = {};
        this.arrQuizzesListing = [];

        this.metaTitle = "";
        this.metaDescription = "";
        this.metaKeywords = "";
        this.metaURLCurrent = "";
        //----------------------


        //Value definition - props parameters.
        //----------------------
        if(this.props.match.params.idParentQuizzes)
        {
            this._idParentQuizzes = this.props.match.params.idParentQuizzes;


            //Check if it´s an ID (number).
            /*
            if(isNaN(this._idParentCategories))
            {
                //Search for friendly name.


                //Debug.
                console.log("number=false");
            }else{
                //Debug.
                console.log("number=true");
            }
            */
        }
        //----------------------


        //Value definition - query string.
        //----------------------
        if(this.objParametersQueryString.pageNumber)
        {
            this._pageNumber = this.objParametersQueryString.pageNumber;
        }

        if(this.objParametersQueryString.masterPageFrontendSelect)
        {
            this._masterPageFrontendSelect = this.objParametersQueryString.masterPageFrontendSelect;
        }

        if(this.objParametersQueryString.messageSuccess)
        {
            this._messageSuccess = this.objParametersQueryString.messageSuccess;
        }

        if(this.objParametersQueryString.messageError)
        {
            this._messageError = this.objParametersQueryString.messageError;
        }

        if(this.objParametersQueryString.messageAlert)
        {
            this._messageAlert = this.objParametersQueryString.messageAlert;
        }

        if(this.objParametersQueryString.nRecords)
        {
            this._nRecords = this.objParametersQueryString.nRecords;
        }
        //----------------------
        

        //Default query.
        if(this._masterPageFrontendSelect)
        {
            this.queryDefault += "&masterPageFrontendSelect=" + this._masterPageFrontendSelect;
        }


        //State creation.
        this.state = {
            objQuizzesListing: this.objQuizzesListing,
            arrQuizzesListing: this.arrQuizzesListing,
            dataLoaded: false
        };


        //Bind objects, methods and functions.
        //this.objCategoriesListing = this.objCategoriesListing.bind(this);
        this.build = this.build.bind(this);
        this.headBuild = this.headBuild.bind(this);
        this.titleCurrentBuild = this.titleCurrentBuild.bind(this);
        

        //Build.
        (async function(){ 
            try{


                //await this.build();
                //this.build();
            }catch(asyncError){
                if(gSystemConfig.configDebug === true)
                {
                    console.error(asyncError);
                }
            }finally{
                
            }
        })();


        //Debug.
        //console.log("props=", props);
        //console.log("this.objParametersQueryString(categories listing)=", this.objParametersQueryString);
        //console.log("this.queryDefault=", this.queryDefault);
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
        //Variables.
        //const { gSystemConfig, elementMessage01, SyncSystemNS } = this.context;
        //const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;


        //Logic.
        //----------------------
        /**/
        try
        {
            //Main build.
            await this.build();

            //Head content.
            await this.headBuild();

            //Title content.
            await this.titleCurrentBuild();
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{

        }
        //----------------------


        //Debug.
        try {
            //props.setTitleCurrent("", "new current title from child (props.setTitleCurrent)");
            //props.setTitleCurrent.setTitleCurrent("", "new current title from child (props.setTitleCurrent.setTitleCurrent)");
            //this.props.setTitleCurrent("", "new current title from child");
            //this.props.setTitleCurrent.setTitleCurrent("", "new current title from child");
            //this.props.this.setState({ titleCurrent: "new current title from child" });
            //this.props.setState({ titleCurrent: "new current title from child" });
            //props.this.setState({ titleCurrent: "new current title from child" });
        
            //console.log("this.props=", this.props);
            //console.log("props=", props);
            //console.log("this.props.match.params.idParentCategories=", this.props.match.params.idParentCategories);
            //console.log("this.props.location.query=", this.props.location.query);
            //console.log("this.props=", this.props);
            //console.log("this.props=", this.props.location.search);
            //console.log("this.paramsQueryString=", this.paramsQueryString);
        } catch (componentDidMountError) {
            if(gSystemConfig.configDebug === true)
            {
                console.log("componentDidMountError=", componentDidMountError);
            }
        }
        

        //console.log("this.props=", JSON.stringify(this.props));
    }
    //**************************************************************************************


    //Build object´s content.
    //**************************************************************************************
    async build()
    {
        //Variables.
        //----------------------
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).

        var apiURLCategoriesDetailsCurrent = "";
        var apiCategoriesDetailsCurrentResponse;

        var apiURLQuizzesListing = "";
        var apiQuizzesListingResponse;
        //----------------------


        //Logic.
        //----------------------
        /**/
        try
        {
            //API - build URL string.
            //apiURLCategoriesDetailsCurrent = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + this._idParentQuizzes + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            apiURLCategoriesDetailsCurrent = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + this._idParentQuizzes + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2);
            //apiURLQuizzesListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIQuizzes + "/" + this._idParentQuizzes + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            apiURLQuizzesListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIQuizzes + "/" + this._idParentQuizzes + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2);
            //apiURLQuizzesListing = "https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean"; //Test.

            //API - fetch data from backend.
            apiCategoriesDetailsCurrentResponse = await fetch(apiURLCategoriesDetailsCurrent);
            //this.objCategoriesCurrent = await response.json();
            this.objCategoriesCurrent = await apiCategoriesDetailsCurrentResponse.json();
            //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);

            apiQuizzesListingResponse = await fetch(apiURLQuizzesListing);
            //this.objQuizzesCurrent = await response.json();
            this.objQuizzesListingJson = await apiQuizzesListingResponse.json();

            //apiQuizzesListingResponse = await fetch(apiURLQuizzesListing); //Test.
            ////this.objQuizzesCurrent = await response.json(); 
            //this.objQuizzesListingJson = await apiQuizzesListingResponse.json(); //Test.
            //console.log("this.objQuizzesListingJson=", this.objQuizzesListingJson);

            //Value definition.
            //----------------------
            this.titleCurrent = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesTitle);
            //this.titleCurrent = SyncSystemNS.FunctionsGeneric.removeHTML01("Trivia API"); //Test.
            //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);

            this.objQuizzesListing = this.objQuizzesListingJson.oqlRecords;
            this.arrQuizzesListing = this.objQuizzesListingJson.oqlRecords.resultsQuizzesListing;
            //this.objQuizzesListing = this.objQuizzesListingJson;
            //if(this.objQuizzesListing.response_code == 0)
            //{
                //this.arrQuizzesListing = this.objQuizzesListingJson.results;
            //} //Test.

            //idParentCategories = this.props.match.params.idParentCategories;
            this.metaTitle = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configSiteTile");
            this.metaTitle += " - " + this.titleCurrent; //Bellow 160 characters.

            this.metaDescription = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesMetaDescription); //Bellow 100 characters.
            //this.metaDescription = SyncSystemNS.FunctionsGeneric.removeHTML01("Trivia Meta Description"); //Bellow 100 characters. //Test.
            this.metaKeywords = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesKeywordsTags); //Bellow 60 characters.
            //this.metaKeywords = SyncSystemNS.FunctionsGeneric.removeHTML01("Trivia Meta Keywords"); //Bellow 60 characters. //Test.
            this.metaURLCurrent = gSystemConfig.configSystemURL + "/" + gSystemConfig.configRouteFrontendQuizzes + "/" + this._idParentQuizzes + "/";
            if(this._pageNumber)
            {
                this.metaURLCurrent += "?pageNumber=" + this._pageNumber;
            }
            //----------------------

            
            //Pagination.
            //----------------------
            /*
            if(gSystemConfig.enableQuizzesFrontendPagination != 0)
            {
                this._pagingTotalRecords = this.arrQuizzesListing.length
                this._pagingTotal = Math.ceil(this._pagingTotalRecords / this._pagingNRecords);
                

                //Slice array.
                //TODO: Review this logic.
                if(this._pagingTotal > 1)
                {
                    //Variables.
                    let arrQuizzesListingSliceStart = 0;
                    let arrQuizzesListingSliceEnd = 0;


                    //Logic.
                    if(this._pageNumber == 1)
                    {
                        arrQuizzesListingSliceStart = 0;
                    }else{
                        //arrQuizzesListingSliceStart = (this._pageNumber * this._pagingNRecords) - this._pagingNRecords - 1;
                        arrQuizzesListingSliceStart = (this._pageNumber * this._pagingNRecords) - this._pagingNRecords;
                    }

                    arrQuizzesListingSliceEnd = arrQuizzesListingSliceStart + this._pagingNRecords;

                    //Slice.
                    this.arrQuizzesListing = this.arrQuizzesListing.slice(arrQuizzesListingSliceStart, arrQuizzesListingSliceEnd);
                

                    //Debug.
                    //console.log("arrCategoriesListingSliceStart=", arrCategoriesListingSliceStart);
                    //console.log("arrCategoriesListingSliceEnd=", arrCategoriesListingSliceEnd);
                }


                //Debug.
                //console.log("this._idParentCategories=", this._idParentCategories);
                //console.log("this.objCategoriesCurrent.ocdRecord.tblCategoriesID=", this.objCategoriesCurrent.ocdRecord.tblCategoriesID);
                //console.log("this.arrCategoriesListing.length=", this.arrCategoriesListing.length);
                
                //console.log("this._pagingTotalRecords=", this._pagingTotalRecords);
                //console.log("this._pagingTotal=", this._pagingTotal);
                //console.log("this._pageNumber=", this._pageNumber);
                //console.log("this._pagingNRecords=", this._pagingNRecords);
            }
            */
            //----------------------
        }catch(tryError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(tryError);
            }
        }finally{
            //Update state.
            this.setState({ objQuizzesListing: this.objQuizzesListing });
            this.setState({ arrQuizzesListing: this.arrQuizzesListing });

            //Note: Place on the last part of the logic.
            this.setState({ dataLoaded: true });
        }
        //----------------------
    }
    //**************************************************************************************
    

    //Head build object´s content.
    //**************************************************************************************
    async headBuild()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).

        //Head elements.
        //document.title = this.titleCurrent; 
        document.title = this.metaTitle; 

        //Meta tags.
        document.querySelector('meta[name="title"]').setAttribute("content", this.metaTitle);
        document.querySelector('meta[name="description"]').setAttribute("content", this.metaDescription);
        document.querySelector('meta[name="keywords"]').setAttribute("content", this.metaKeywords);
        
        document.querySelector('meta[property="og:title"]').setAttribute("content", this.metaTitle);
        document.querySelector('meta[property="og:type"]').setAttribute("content", "website");
        document.querySelector('meta[property="og:url"]').setAttribute("content", this.metaURLCurrent);
        document.querySelector('meta[property="og:description"]').setAttribute("content", this.metaDescription);
        
        if(this.objCategoriesCurrent.ocdRecord.tblCategoriesImageMain != "")
        {
            document.querySelector('meta[property="og:image"]').setAttribute("content", gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/" + this.objCategoriesCurrent.ocdRecord.tblCategoriesImageMain);
        }else{
            document.querySelector('meta[property="og:image"]').setAttribute("content", gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesLayoutSD + "/" + "icon-logo-og.png");
        }
        //document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", "Example with image url secure");
        document.querySelector('meta[property="og:image:alt"]').setAttribute("content", this.metaTitle);
        
        //document.querySelector('meta[property="og:locale"]').setAttribute("content", gSystemConfig.configBackendLanguage);
        document.querySelector('meta[property="og:locale"]').setAttribute("content", SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configFrontendLanguage"));
        //document.querySelector('meta[property="og:title"]').setAttribute("content", "Example with title meta tag");


        //Debug.
        //console.log("this.objCategoriesListing=",this.objCategoriesListing);
    }
    //**************************************************************************************
    

    //Head build object´s content.
    //**************************************************************************************
    async titleCurrentBuild()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).


        //Title Current.
        FunctionsSyncSystem.elementMessage01("titleCurrent", this.titleCurrent);
        FunctionsSyncSystem.elementMessage01("titleCurrentMobile", this.titleCurrent);
    }
    //**************************************************************************************
    

    //Render.
    //**************************************************************************************
    render()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).


        //Head.
        //document.title ="Example with title tag"; 
        //document.getElementsByTagName("title").content="Example with title tag";
        /*
            <React.Fragment>
                Single component
            </React.Fragment>
        */


        //Check if data is loaded.
        //----------------------
        if(this.state.dataLoaded === false)
        {
            if(gSystemConfig.configDebug === true)
            {
                console.log("Still loading data.");
            }

            return '';
        }else{
            console.log("Data loaded.");
        }
        //----------------------


        //Debug.
        //console.log("this.state.arrPublicationsListing(frontend publications listing component)=", this.state.arrPublicationsListing);
        //console.log("this._pagingTotal(inside render)=", this._pagingTotal);


        //Output.
        return(
            <React.Fragment>
                <section className="ss-frontend-layout-section-content01"> { /*custom: ss-frontend-layout-section-content01 | bootstrap: container-fluid.*/ }
                    { /*Quizzes records.*/ }
                    <FrontendQuizzesListingRecord 
                        arrQuizzesListing={ this.state.arrQuizzesListing } 
                        configLayoutType={ 2 }>
                    </FrontendQuizzesListingRecord>
                </section>
            </React.Fragment>
        );
    }
    //**************************************************************************************
}

export default FrontendQuizzesListing;
