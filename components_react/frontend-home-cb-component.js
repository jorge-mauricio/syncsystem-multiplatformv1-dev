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
//import FrontendCategoriesListingRecord from "./frontend-categories-listing-record-cb-component.jsx";
//import FrontendCategoriesListingRecord from "./frontend-categories-listing-record-cb-component.js";
//import FrontendBanners from "./frontend-banners-cb-component.js";
import FrontendProducts from "./frontend-products-cb-component.js";
import FrontendContent from "./frontend-content-cb-component.js";
//----------------------


class FrontendHome extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //configLayoutType: 1 - div layout (custom) | 11 - div layout (bootstrap) | 111 - responsive


        super(props, context);

        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, qs } = this.context;


        //Properties.
        //----------------------
        this.objParametersQueryString = qs.parse(this.props.location.search);
        this.configLayoutType = 1;
        //this._idParentCategories = 0;

        //this._pagingNRecords = gSystemConfig.configCategoriesFrontendPaginationNRecords;
        //this._pagingTotalRecords = 0;
        //this._pagingTotal = 0;
        ////this._pageNumber = this.props.location.query.pageNumber;
        //this._pageNumber = 1;
        this._masterPageFrontendSelect = "";

        this._messageSuccess = "";
        this._messageError = "";
        this._messageAlert = "";
        //this._nRecords = "";

        this.queryDefault = "";

        //this.objCategoriesCurrent = {};
        this.titleCurrent = "";

        //this.objCategoriesListing = {};
        //this.arrCategoriesListing = [];

        this.metaTitle = "";
        this.metaDescription = "";
        this.metaKeywords = "";
        this.metaURLCurrent = "";
        //----------------------


        //Value definition - props parameters.
        //----------------------
        /*
        if(this.props.match.params.idParentCategories)
        {
            this._idParentCategories = this.props.match.params.idParentCategories;
        }
        */
        //----------------------


        //Value definition - query string.
        //----------------------
        /*
        if(this.objParametersQueryString.pageNumber)
        {
            this._pageNumber = this.objParametersQueryString.pageNumber;
        }
        */

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

        /*
        if(this.objParametersQueryString.nRecords)
        {
            this._nRecords = this.objParametersQueryString.nRecords;
        }
        */
        //----------------------
        

        //Default query.
        if(this._masterPageFrontendSelect)
        {
            this.queryDefault += "&masterPageFrontendSelect=" + this._masterPageFrontendSelect;
        }


        /**/
        //State creation.
        this.state = {
            //objCategoriesListing: this.objCategoriesListing,
            //arrCategoriesListing: this.arrCategoriesListing,
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
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).


        //Logic.
        //----------------------
        /**/
        try
        {
            //const tagsMeta = document.getElementsByTagName('meta');
            //var idParentCategories = ""
            //var titleCurrent = ""
            //var apiURLCategoriesDetailsCurrent = "";
            //var apiCategoriesDetailsCurrentResponse;


            //API - build URL string.
            //apiURLCategoriesDetailsCurrent = "http://localhost:3000/api/categories/details/813"; //http://localhost:3000/api/categories/813/?apiKey=createSecretPassword
            //apiURLCategoriesDetailsCurrent = process.env.CONFIG_API_URL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories + "?apiKey=" + process.env.CONFIG_API_KEY_SYSTEM;
            //apiURLCategoriesDetailsCurrent = process.env.CONFIG_API_URL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories + "?apiKey=" + FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            //apiURLCategoriesDetailsCurrent = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories + "?apiKey=" + FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            //apiURLCategoriesDetailsCurrent = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + this._idParentCategories + "?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            //apiURLCategoriesDetailsCurrent = process.env.CONFIG_API_URL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories + "?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            //apiURLCategoriesDetailsCurrent = process.env.REACT_APP_CONFIG_API_URL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories;
            //apiURLCategoriesDetailsCurrent = CONFIG_API_URL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories;
            //apiURLCategoriesDetailsCurrent = REACT_APP_CONFIG_API_URL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories;
            //console.log("apiURLCategoriesDetailsCurrent=", apiURLCategoriesDetailsCurrent);


            //API - fetch data from backend.
            //var response = await fetch(apiURLCategoriesDetailsCurrent);
            //apiCategoriesDetailsCurrentResponse = await fetch(apiURLCategoriesDetailsCurrent);
            //this.objCategoriesCurrent = await response.json();
            //this.objCategoriesCurrent = await apiCategoriesDetailsCurrentResponse.json();
            //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);


            //Value definition.
            //this.titleCurrent = this.objCategoriesCurrent.tblCategoriesTitle;
            //this.titleCurrent = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesTitle);
            this.titleCurrent = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendHomeTitleMain");
            //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);

            //idParentCategories = this.props.match.params.idParentCategories;

            //this.metaTitle = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendHomeTitleMain") + " - " + this.titleCurrent; //Bellow 160 characters.
            this.metaTitle = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configSiteTile");
            this.metaTitle += " - " + this.titleCurrent; //Bellow 160 characters.

            //this.metaDescription = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesMetaDescription); //Bellow 100 characters.
            this.metaDescription = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configSiteDescription"); //Bellow 100 characters.
            
            //this.metaKeywords = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesKeywordsTags); //Bellow 60 characters.
            this.metaKeywords = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configSiteKeywords"); //Bellow 60 characters.
            
            this.metaURLCurrent = gSystemConfig.configSystemURL + "/";
            
            //this.objCategoriesListing = this.objCategoriesCurrent.oclRecords;
            //this.arrCategoriesListing = this.objCategoriesCurrent.oclRecords.resultsCategoriesListing;
            

            //Update state.
            //this.setState({ objCategoriesListing: this.objCategoriesListing });
            
            //this.setState({ arrCategoriesListing: this.arrCategoriesListing });

            //Note: Place on the last part of the logic.
            this.setState({ dataLoaded: true });
            



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

        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{

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
        /**/
        document.querySelector('meta[name="title"]').setAttribute("content", this.metaTitle);
        document.querySelector('meta[name="description"]').setAttribute("content", this.metaDescription);
        document.querySelector('meta[name="keywords"]').setAttribute("content", this.metaKeywords);
        
        document.querySelector('meta[property="og:title"]').setAttribute("content", this.metaTitle);
        document.querySelector('meta[property="og:type"]').setAttribute("content", "website");
        document.querySelector('meta[property="og:url"]').setAttribute("content", this.metaURLCurrent);
        document.querySelector('meta[property="og:description"]').setAttribute("content", this.metaDescription);
        
        //if(this.objCategoriesCurrent.ocdRecord.tblCategoriesImageMain != "")
        //{
            //document.querySelector('meta[property="og:image"]').setAttribute("content", gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/" + this.objCategoriesCurrent.ocdRecord.tblCategoriesImageMain);
        //}else{
            document.querySelector('meta[property="og:image"]').setAttribute("content", gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesLayoutSD + "/" + "icon-logo-og.png");
        //}
        //document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", "Example with image url secure");
        document.querySelector('meta[property="og:image:alt"]').setAttribute("content", this.metaTitle);
        
        //document.querySelector('meta[property="og:locale"]').setAttribute("content", gSystemConfig.configBackendLanguage);
        document.querySelector('meta[property="og:locale"]').setAttribute("content", SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configFrontendLanguage"));
       
        //document.querySelector('meta[property="og:title"]').setAttribute("content", "Example with title meta tag");
        

        //document.getElementsByTagName("meta")["og:title"].content = "Example with title meta tag";
        //document.head.querySelector('meta[name=og:title]').content = 'Example with title meta tag';
        

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
        //elementMessage01("titleCurrent", "Example of current title");
        //FunctionsSyncSystem.elementMessage01("titleCurrent", "Example of current title");
        //elementMessage01("titleCurrent", this.titleCurrent); //working
        //console.log("FunctionsSyncSystem=", FunctionsSyncSystem);
        FunctionsSyncSystem.elementMessage01("titleCurrent", this.titleCurrent);
        FunctionsSyncSystem.elementMessage01("titleCurrentMobile", this.titleCurrent);
    }
    //**************************************************************************************
    

    //Render.
    //**************************************************************************************
    render()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;


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
        }
        //----------------------


        //Debug.
        //console.log("this._pagingTotal(inside render)=", this._pagingTotal);

        //Output.
        return(
            <React.Fragment>
                <React.Fragment>
                    { /*div layout (custom). */}
                    { this.configLayoutType == 1 ?
                        <React.Fragment>
                            <section className="ss-frontend-layout-section-content01">
                                home content
                            </section>
                        </React.Fragment>
                    :``
                    }


                    { /*div layout (bootstrap). */}
                    { this.configLayoutType == 11 ?
                        <section className="container">
                            <div className="alert alert-success" role="alert" style={{textAlign: "center"}}>
                            </div>

                            bootstrap
                        </section>
                    :``
                    }


                    { /*div layout (responsive). */}
                    { this.configLayoutType == 111 ?
                        <React.Fragment>
                            { /*Desktop */}
                            <div className="d-none d-lg-block d-xl-block"> { /*Note: If the content is not complex, these parameters can be incorporate to the section tag.*/}
                                <section className="ss-frontend-layout-section-content01 ss-frontend-text01">
                                    home content desktop
                                </section>
                            </div>


                            { /*Mobile */}
                            <div className="d-lg-none">
                                <section class="ss-frontend-mobile-layout-section-content01 ss-frontend-text01">
                                    home content mobile
                                </section>
                            </div>
                        </React.Fragment>
                    :``
                    }
                </React.Fragment>


                { /*Content component.*/ }
                <FrontendContent 
                    idParentContent={ "106" } 
                    idTbContent={ "" } 
                    contentType={ "" } 
                    configLayoutType={ 2 } 
                    configContentNRecords={ "" } 
                    configContentSort={ "" }>
                        {/*arrCategoriesListing={ this.arrCategoriesListing } also works*/}
                </FrontendContent>


                { /*Products component. */}
                <FrontendProducts
                    idParentProducts={"960"} 
                    idRegisterUser={""} 

                    configLayoutType={2} 
                    configProductsNRecords={"3"} 
                    configProductsSort={gSystemConfig.configProductsSort} 

                    activation={1} 
                    activation1={""} 
                    activation2={""} 
                    activation3={""} 
                    activation4={""} 
                    activation5={""}>
                </FrontendProducts>
            </React.Fragment>
        );
    }
    //**************************************************************************************
}

export default FrontendHome;