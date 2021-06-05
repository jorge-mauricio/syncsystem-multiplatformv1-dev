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
//import FrontendProductsDetailsRecord from "./frontend-products-details-record-cb-component.js";
//----------------------

class FrontendFormsSend extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //configLayoutType: 1 - div layout (custom) | 11 - div layout (bootstrap)

        super(props, context);

        //Variables.
        //----------------------
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, qs } = this.context;
        //----------------------


        //Properties.
        //----------------------
        this.objParametersQueryString = qs.parse(this.props.location.search);
        this.configLayoutType = 1;

        this._idTbForms = 0;
        
        this._masterPageFrontendSelect = "";

        this._messageSuccess = "";
        this._messageError = "";
        this._messageAlert = "";

        this.queryDefault = "";

        this.objFormsDetailsJson;
        this.objFormsDetails = {};
        this.objFormsListing = {};
        this.arrFormsListing = [];

        //this.ofdRecordParameters;
        //this.ofdRecord;
    
        this.titleCurrent = "";

        this.metaTitle = "";
        this.metaDescription = "";
        this.metaKeywords = "";
        this.metaURLCurrent = "";
        //----------------------


        //Value definition - props parameters.
        //----------------------
        if(this.props.match.params.idTbForms)
        {
            this._idTbForms = this.props.match.params.idTbForms;
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
            objFormsDetails: this.objFormsDetails,
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
    
        var apiURLFormsDetails = "";
        var apiFormsDetailsResponse;
        //----------------------


        //Logic.
        //----------------------
        try
        {
            //API - build URL string.
            //apiURLFormsDetails = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIForms + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idTbForms + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            apiURLFormsDetails = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIForms + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idTbForms + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2);

            //API - fetch data from backend.
            apiFormsDetailsResponse = await fetch(apiURLFormsDetails);
            this.objFormsDetailsJson = await apiFormsDetailsResponse.json();
            this.objFormsDetails = this.objFormsDetailsJson.ofdRecord;
            //console.log("apiURLFormsDetails=", apiURLFormsDetails);
            console.log("this.objFormsDetails=", this.objFormsDetails);
            //console.log("this._idTbForms=", this._idTbForms);
            

            /*
            this.ofdRecordParameters = {
                _arrSearchParameters: ["id;" + this._idTbForms + ";i"],
                _idTbForms: idTbForms,
                _terminal: 0,
                _objSpecialParameters: {returnType: 3}
            }

            this.ofdRecord = new SyncSystemNS.ObjectFormsDetails(this.ofdRecordParameters);
            await this.ofdRecord.recordDetailsGet(0, 3);
            */
            

            //Value definition.
            //this.titleCurrent = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objFormsDetails.tblFormsFormTitle);
            this.titleCurrent = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsSendTitleMain");

            this.metaTitle = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configSiteTile");
            this.metaTitle += " - " + this.titleCurrent; //Bellow 160 characters.

            this.metaDescription = ""; //Bellow 100 characters.
            this.metaKeywords = ""; //Bellow 60 characters.
            this.metaURLCurrent = gSystemConfig.configSystemURL + "/" + gSystemConfig.configRouteFrontendForms + "/" + gSystemConfig.configRouteFrontendActionSend + "/" + this._idTbForms + "?pageNumber=" + this._pageNumber;


            //Debug.
            //console.log("this.objCategoryCurrent", this.objCategoryCurrent);
            //console.log("this.objFormsDetails=", this.objFormsDetails);
            //console.log("this.objFormsDetails=", this.objFormsDetails);
            //console.log("this.objFormsDetails(stringify)=", JSON.stringify(this.objFormsDetails));
            //console.log("this.ofdRecord", this.ofdRecord);
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{
            //Update state.
            this.setState({ objFormsDetails: this.objFormsDetails });
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
        
        //if(this.objProductsDetails.tblProductsImageMain != "")
        //{
            //document.querySelector('meta[property="og:image"]').setAttribute("content", gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/" + this.objProductsDetails.tblProductsImageMain);
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
        //console.log("this.objProductsListing=",this.objProductsListing);
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
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser } = this.context;
    

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
                { /*div layout (custom). */}
                { this.configLayoutType == 1 ?
                    <section className="ss-frontend-layout-section-content01">
                        {
                            this._messageSuccess != "" ?
                                <div className="ss-frontend-success">
                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, this._messageSuccess)) }
                                </div>
                            :
                            ``
                        }
                        {
                            this._messageError != "" ?
                                <div className="ss-frontend-error">
                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, this._messageError)) }
                                </div>
                            :
                            ``
                        }
                        {
                            this._messageAlert != "" ?
                                <div className="ss-frontend-alert">
                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, this._messageAlert)) }
                                </div>
                            :
                            ``
                        }

                        <div className="ss-frontend-forms-text-success" style={{textAlign: "center"}}>
                            { gSystemConfig.enableFormsMessageSuccess == 1 ?
                                HTMLReactParser(this.objFormsDetails.tblFormsMessageSuccess)
                                //this.objFormsDetails.tblFormsMessageSuccess
                            :
                                HTMLReactParser(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsMessageSendSuccess"))
                            }
                        </div>
                    </section>
                :``
                }

                { /*div layout (bootstrap). */}
                { this.configLayoutType == 11 ?
                    <section className="container">
                        <div className="alert alert-success" role="alert" style={{textAlign: "center"}}>
                            { gSystemConfig.enableFormsMessageSuccess == 1 ?
                                HTMLReactParser(this.objFormsDetails.tblFormsMessageSuccess)
                            :
                                HTMLReactParser(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsMessageSendSuccess"))
                            }
                        </div>
                    </section>
                :``
                }
            </React.Fragment>
        );
    }
    //**************************************************************************************
    
}


export default FrontendFormsSend;      