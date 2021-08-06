"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //{path: '../.env'}
//const { CONFIG_API_URL } = process.env;
//const { REACT_APP_CONFIG_API_URL } = process.env;

//Context.
import { SyncSystemNSContext } from "./syncsystem-ns-cb-context.js";


//Node modules.
//import React from "react";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import  { Redirect } from 'react-router-dom'


//Components.
//import FrontendLoginForm from "./frontend-login-form-cb-component.js";
//----------------------


class FrontendDashboard extends Component
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

        this.idTbRegistersLoggedCrypt = "";
        this.idTbRegistersLogged = "";

        this._masterPageFrontendSelect = "";

        this._messageSuccess = "";
        this._messageError = "";
        this._messageAlert = "";

        this.queryDefault = "";

        this.objRegistersDetailsJson;
        this.objRegistersDetails = {};

        this.titleCurrent = "";

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


        //Bind objects, methods and functions.
        this.build = this.build.bind(this);
        this.headBuild = this.headBuild.bind(this);
        this.titleCurrentBuild = this.titleCurrentBuild.bind(this);


        //Build.
        //(async function(){ 
            try{
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
                    objRegistersDetails: this.objRegistersDetails,
                    dataLoaded: false
                };
            }
        //})();


        //Debug.
        //console.log("document.cookie=", document.cookie);
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
            //console.log("this.props=", this.props);
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
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, qs } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).
        
        let apiURLRegistersDetailsOptions;
        let fdRegistersDetails = new FormData();
        let apiURLRegistersDetails = "";
        let apiRegistersDetailsResponse;
        //----------------------


        //Logic.
        //----------------------
        try
        {
            //Check login.
            //TODO: replace with function.
            this.idTbRegistersLoggedCrypt = FunctionsSyncSystem.cookieRead(gSystemConfig.configCookiePrefix + "_" + "idRegisterUser");
            this.idTbRegistersLogged = SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(this.idTbRegistersLoggedCrypt, "db"), 2);
            if(this.idTbRegistersLogged == "")
            {
                //Redirect.
                this.props.history.push("/" + gSystemConfig.configRouteFrontendLogin +"/?messageAlert=statusMessageLogin1a"); //it may be getting from history cache
                //return (<Redirect to={"/" + gSystemConfig.configRouteFrontendLogin +"/?messageAlert=statusMessageLogin1a"}  />);
            }

                
            //Messages.
            if(this._messageSuccess != "")
            {
                FunctionsSyncSystem.htmlGenericStyle01('messageSuccess', 'display', 'block');
                FunctionsSyncSystem.elementMessage01("messageSuccess", SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, this._messageSuccess));
            }
            if(this._messageError != "")
            {
                FunctionsSyncSystem.htmlGenericStyle01('messageError', 'display', 'block');
                FunctionsSyncSystem.elementMessage01("messageSuccess", SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, this._messageError));
            }
            if(this._messageAlert != "")
            {
                FunctionsSyncSystem.htmlGenericStyle01('messageAlert', 'display', 'block');
                FunctionsSyncSystem.elementMessage01("messageSuccess", SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, this._messageAlert));
            }


            //Build form data.
            fdRegistersDetails.append("apiKey", SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2));

            //Fetch options for post method.
            apiURLRegistersDetailsOptions = {
                method: "POST",
                /*
                headers: { 
                    //"Content-Type": "application/json; charset=utf-8" 
                    "Content-Type": "multipart/form-data"
                },
                */
                /*
                body: JSON.stringify({ 
                    id: "",
                    id_quizzes: tblQuizzesID,
                    //id_quizzes_options: this.state.quizResultsLog[countArray].tblQuizzesLogIdQuizzesOptionsAnswer,
                    id_quizzes_options: "123",
                    id_register: "1638", //get id from cookie / authentication
                    //id_quizzes_options_answer: this.state.quizResultsLog[countArray].tblQuizzesIdQuizzesOptionsAnswer,
                    id_quizzes_options_answer: "321",
                    date_creation: "",
                    notes: "",
                })
                */
                body: fdRegistersDetails
            };
            

            //API - build URL string.
            //apiURLProductsDetails = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIProducts + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idTbProducts + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            apiURLRegistersDetails = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPILogin + "/" + gSystemConfig.configRouteAPIDetails + "/" + this.idTbRegistersLoggedCrypt + "/";
        
            //?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2)


            //API - fetch data from backend.
            //apiRegistersDetailsResponse = await fetch(apiURLRegistersDetails);
            apiRegistersDetailsResponse = await fetch(apiURLRegistersDetails, apiURLRegistersDetailsOptions);
            
            this.objRegistersDetailsJson = await apiRegistersDetailsResponse.json();
            this.objRegistersDetails = this.objRegistersDetailsJson.ordRecord;
            //console.log("apiURLProductsDetails=", apiURLProductsDetails);


            //Value definition.
            this.titleCurrent = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendDashboardTitleMain");
            //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);

            //this.metaTitle = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendHomeTitleMain") + " - " + this.titleCurrent; //Bellow 160 characters.
            this.metaTitle = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configSiteTile");
            this.metaTitle += " - " + this.titleCurrent; //Bellow 160 characters.

            //this.metaDescription = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesMetaDescription); //Bellow 100 characters.
            this.metaDescription = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configSiteDescription"); //Bellow 100 characters.
            
            //this.metaKeywords = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesKeywordsTags); //Bellow 60 characters.
            this.metaKeywords = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configSiteKeywords"); //Bellow 60 characters.
            
            this.metaURLCurrent = gSystemConfig.configSystemURL + "/";


            //Debug.
            console.log("document.cookie=", document.cookie);
            console.log("this.objRegistersDetails=", this.objRegistersDetails);
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{
            //Update state.
            //this.setState({ objCategoriesListing: this.objCategoriesListing });
            
            //this.setState({ arrCategoriesListing: this.arrCategoriesListing });

            //Note: Place on the last part of the logic.
            this.setState({ 
                objRegistersDetails: this.objRegistersDetails,
                dataLoaded: true 
            });
        }
        //----------------------
    }
    //**************************************************************************************


    //Head build object´s content.
    //**************************************************************************************
    async headBuild()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, qs } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).


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
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, qs } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).


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
        //----------------------
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, qs } = this.context;

        let objRegistersDetails = this.objRegistersDetails;
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


        //Debug.
        //console.log("this._pagingTotal(inside render)=", this._pagingTotal);

        //Output.
        return(
            <section className="ss-frontend-layout-section-content01 ss-frontend-dashboard-text01">
                <strong>
                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendDashboardWelcome") }
                </strong>
                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendDashboardLoginMessage01") }: 
                { objRegistersDetails.tblRegistersNameFull }
            </section>
        );
    }
    //**************************************************************************************
}

export default FrontendDashboard;