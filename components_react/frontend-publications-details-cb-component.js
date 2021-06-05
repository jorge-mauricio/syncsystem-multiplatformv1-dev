"use strict";

//Import Node Modules.
//----------------------

//Context.
import { SyncSystemNSContext } from "./syncsystem-ns-cb-context.js";

//Node modules.
//const qs = require('query-string');

//React.
import React, {Component} from "react";
import ReactDOM from "react-dom";


//Components.
import FrontendPublicationsDetailsRecord from "./frontend-publications-details-record-cb-component.js";
import FrontendFilesImages from "./frontend-files-images-cb-component.js";
import FrontendFiles from "./frontend-files-cb-component.js";
//----------------------

class FrontendPublicationsDetails extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        super(props, context);

        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, qs } = this.context;
    
        //Properties.
        //----------------------
        this.objParametersQueryString = qs.parse(this.props.location.search);
        
        this._idTbPublications = 0;
        
        this._masterPageFrontendSelect = "";

        this._messageSuccess = "";
        this._messageError = "";
        this._messageAlert = "";

        this.queryDefault = "";

        this.objPublicationsDetailsJson;
        this.objPublicationsDetails = {};
        this.objPublicationsListing = {};
        this.arrPublicationsListing = [];

        this.titleCurrent = "";

        this.metaTitle = "";
        this.metaDescription = "";
        this.metaKeywords = "";
        this.metaURLCurrent = "";
        //----------------------


        //Value definition - props parameters.
        //----------------------
        if(this.props.match.params.idTbPublications)
        {
            this._idTbPublications = this.props.match.params.idTbPublications;
        }        
        //----------------------


        //Value definition - query string.
        //----------------------
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
        //----------------------


        //Default query.
        if(this._masterPageFrontendSelect)
        {
            this.queryDefault += "&masterPageFrontendSelect=" + this._masterPageFrontendSelect;
        }


        //State creation.
        this.state = {
            objPublicationsDetails: this.objPublicationsDetails,
            dataLoaded: false
        };


        //Debug.
        //console.log("this.objParametersQueryString=", this.objParametersQueryString);
        //console.log("this._idTbCategories=", this._idTbCategories);
        //console.log("this.queryDefault=", this.queryDefault);
    }
    //**************************************************************************************


    //Lifecycle method.
    //**************************************************************************************
    async componentWillMount()
    {

    }
    //**************************************************************************************


    //Lifecycle method.
    //**************************************************************************************
    async componentDidMount()
    {
        //Logic.
        //----------------------
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
    }
    //**************************************************************************************
    
    
    //Build object´s content.
    //**************************************************************************************
    async build()
    {
        //Variables.
        //----------------------
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;
    
        var apiURLPublicationsDetails = "";
        var apiPublicationsDetailsResponse;
        //----------------------


        //Logic.
        //----------------------
        try
        {
            //API - build URL string.
            //apiURLPublicationsDetails = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIPublications + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idTbPublications + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            apiURLPublicationsDetails = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIPublications + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idTbPublications + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2);
        
            //API - fetch data from backend.
            apiPublicationsDetailsResponse = await fetch(apiURLPublicationsDetails);
            this.objPublicationsDetailsJson = await apiPublicationsDetailsResponse.json();
            this.objPublicationsDetails = this.objPublicationsDetailsJson.opdRecord;
            //console.log("apiURLPublicationsDetails=", apiURLPublicationsDetails);
            //console.log("this.objPublicationsDetails=", this.objPublicationsDetails);
            

            //Value definition.
            this.titleCurrent = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objPublicationsDetails.tblPublicationsTitle);

            this.metaTitle = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configSiteTile");
            this.metaTitle += " - " + this.titleCurrent; //Bellow 160 characters.

            this.metaDescription = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objPublicationsDetails.tblPublicationsMetaDescription); //Bellow 100 characters.
            this.metaKeywords = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objPublicationsDetails.tblPublicationsKeywordsTags); //Bellow 60 characters.
            this.metaURLCurrent = gSystemConfig.configSystemURL + "/" + gSystemConfig.configRouteFrontendPublications + "/" + gSystemConfig.configRouteFrontendDetails + "/" + this._idTbPublications + "?pageNumber=" + this._pageNumber;


            //Debug.
            //console.log("this.objCategoryCurrent", this.objCategoryCurrent);
            //console.log("this.objPublicationsDetails=", this.objPublicationsDetails);
            //console.log("this.objPublicationsDetails=", this.objPublicationsDetails);
            //console.log("this.objPublicationsDetails(stringify)=", JSON.stringify(this.objPublicationsDetails));
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{
            //Update state.
            this.setState({ objPublicationsDetails: this.objPublicationsDetails });
            this.setState({ dataLoaded: true }); //Note: Place on the last part of the logic.
        }
        //----------------------
    }
    //**************************************************************************************


    //Head build object´s content.
    //**************************************************************************************
    async headBuild()
    {
        //Variables.
        //----------------------
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;
        //----------------------


        //Head elements.
        document.title = this.metaTitle; 

        //Meta tags.
        document.querySelector('meta[name="title"]').setAttribute("content", this.metaTitle);
        document.querySelector('meta[name="description"]').setAttribute("content", this.metaDescription);
        document.querySelector('meta[name="keywords"]').setAttribute("content", this.metaKeywords);
        
        document.querySelector('meta[property="og:title"]').setAttribute("content", this.metaTitle);
        document.querySelector('meta[property="og:type"]').setAttribute("content", "website");
        document.querySelector('meta[property="og:url"]').setAttribute("content", this.metaURLCurrent);
        document.querySelector('meta[property="og:description"]').setAttribute("content", this.metaDescription);
        
        if(this.objPublicationsDetails.tblPublicationsImageMain != "")
        {
            document.querySelector('meta[property="og:image"]').setAttribute("content", gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/" + this.objPublicationsDetails.tblPublicationsImageMain);
        }else{
            document.querySelector('meta[property="og:image"]').setAttribute("content", gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesLayoutSD + "/" + "icon-logo-og.png");
        }
        //document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", "Example with image url secure");
        document.querySelector('meta[property="og:image:alt"]').setAttribute("content", this.metaTitle);
        
        //document.querySelector('meta[property="og:locale"]').setAttribute("content", gSystemConfig.configBackendLanguage);
        document.querySelector('meta[property="og:locale"]').setAttribute("content", SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configFrontendLanguage"));
        //document.querySelector('meta[property="og:title"]').setAttribute("content", "Example with title meta tag");
        

        //document.getElementsByTagName("meta")["og:title"].content = "Example with title meta tag";
        //document.head.querySelector('meta[name=og:title]').content = 'Example with title meta tag';


        //Debug.
        //console.log("this.objPublicationsListing=",this.objPublicationsListing);
    }
    //**************************************************************************************
    

    //Head build object´s content.
    //**************************************************************************************
    async titleCurrentBuild()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;


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
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;
    

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


        //Output.
        return(
            <React.Fragment>
                <section className="ss-frontend-layout-section-content01">
                    { /*Publications records. */ }
                    <FrontendPublicationsDetailsRecord 
                        objPublicationsDetails={ this.state.objPublicationsDetails } 
                        configLayoutType={ 2 }>
                    </FrontendPublicationsDetailsRecord>


                    { /*Files - images - records.*/ }
                    { gSystemConfig.enablePublicationsImages == 1 ? 
                        <FrontendFilesImages
                            idParentFiles={ this._idTbPublications } 
                            configLayoutType={ 1 } 
                            configFilesNRecords={ "" } 
                            configFilesSort={ "" } 
                            configFilesZoom={ 0 }>
                        </FrontendFilesImages>
                    :``
                    }


                    { /*Files - records.*/ }
                    { gSystemConfig.enablePublicationsFiles == 1 ? 
                        <FrontendFiles
                            idParentFiles={ this._idTbPublications } 
                            configLayoutType={ 1 } 
                            configFilesNRecords={ "" } 
                            configFilesSort={ "" }>
                        </FrontendFiles>
                    :``
                    }


                    <div style={{position: "relative", display: "block", textAlign: "center", overflow: "hidden", marginTop: "20px"}}>
                        <a onClick={this.props.history.goBack} className="ss-frontend-btn-base ss-frontend-btn-action">
                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendButtonBack") }
                        </a>
                    </div>
                </section>
            </React.Fragment>
        );
    }
    //**************************************************************************************
}


export default FrontendPublicationsDetails;      