"use strict";

//Import Node Modules.
//----------------------

//Context.
import { SyncSystemNSContext } from "./syncsystem-ns-cb-context.js";

//Node modules.
const qs = require('query-string');

//React.
import React, {Component} from "react";
import ReactDOM from "react-dom";


//Components.
import FrontendCategoriesDetailsRecord from "./frontend-categories-details-record-cb-component.js";
//----------------------


class FrontendCategoriesDetails extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        super(props, context);

        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;
    
        //Properties.
        //----------------------
        this.objParametersQueryString = qs.parse(this.props.location.search);
        
        this._idTbCategories = 0;
        
        this._masterPageFrontendSelect = "";

        this._messageSuccess = "";
        this._messageError = "";
        this._messageAlert = "";

        this.queryDefault = "";

        this.objCategoryCurrent = {};
        this.titleCurrent = "";

        this.objCategoriesDetails = {};
        this.objCategoriesListing = {};
        this.arrCategoriesListing = [];

        this.metaTitle = "";
        this.metaDescription = "";
        this.metaKeywords = "";
        this.metaURLCurrent = "";
        //----------------------


        //Value definition - props parameters.
        //----------------------
        if(this.props.match.params.idTbCategories)
        {
            this._idTbCategories = this.props.match.params.idTbCategories;
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
            objCategoriesDetails: this.objCategoriesDetails,
            //objCategoriesListing: this.objCategoriesListing,
            //arrCategoriesListing: this.arrCategoriesListing,
            dataLoaded: false
        };


        //Debug.
        console.log("this.objParametersQueryString=", this.objParametersQueryString);
        console.log("this._idTbCategories=", this._idTbCategories);
        console.log("this.queryDefault=", this.queryDefault);
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
        //Main build.
        await this.build();

        //Head content.
        await this.headBuild();

        //Title content.
        await this.titleCurrentBuild();
    }
    //**************************************************************************************

    
    //Build object´s content.
    //**************************************************************************************
    async build()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;
    
        var apiURLCategoriesDetailsCurrent = "";
        var apiCategoriesDetailsCurrentResponse;


        //API - build URL string.
        apiURLCategoriesDetailsCurrent = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + this._idTbCategories + "?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
    

        //API - fetch data from backend.
        apiCategoriesDetailsCurrentResponse = await fetch(apiURLCategoriesDetailsCurrent);
        this.objCategoriesCurrent = await apiCategoriesDetailsCurrentResponse.json();


        //Value definition.
        this.titleCurrent = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesTitle);

        this.metaTitle = this.titleCurrent; //Bellow 160 characters.
        this.metaDescription = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesMetaDescription); //Bellow 100 characters.
        this.metaKeywords = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesKeywordsTags); //Bellow 60 characters.
        this.metaURLCurrent = gSystemConfig.configSystemURL + "/" + gSystemConfig.configRouteFrontendCategories + "/" + this._idParentCategories + "?pageNumber=" + this._pageNumber;
        
        this.objCategoriesDetails = this.objCategoriesCurrent.ocdRecord;
        //this.objCategoriesDetails = this.objCategoriesCurrent;
        //this.objCategoriesDetails = JSON.parse(JSON.stringify(this.objCategoriesCurrent.ocdRecord));
        //this.objCategoriesDetails = Object.assign({}, this.objCategoriesCurrent.ocdRecord);
        //this.objCategoriesDetails = Object.create(this.objCategoriesCurrent.ocdRecord);


        //Update state.
        //this.setState({ objCategoryCurrent: this.objCategoryCurrent });
        this.setState({ objCategoriesDetails: this.objCategoriesDetails });

        //this.setState({ objCategoriesListing: this.objCategoriesListing });
        //this.setState({ arrCategoriesListing: this.arrCategoriesListing });

        //Note: Place on the last part of the logic.
        this.setState({ dataLoaded: true });


        //Debug.
        //console.log("this.objCategoryCurrent", this.objCategoryCurrent);
        //console.log("this.objCategoriesCurrent.ocdRecord=", this.objCategoriesCurrent.ocdRecord);
        console.log("this.objCategoriesDetails=", this.objCategoriesDetails);
        //console.log("this.objCategoriesDetails(stringify)=", JSON.stringify(this.objCategoriesDetails));
    }
    //**************************************************************************************


    //Head build object´s content.
    //**************************************************************************************
    async headBuild()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;



        //console.log("this.objCategoriesListing=",this.objCategoriesListing);


        //Head elements.
        //document.title ="Example with title tag"; 
        //document.title = this.state.titleCurrent; 
        document.title = this.titleCurrent; 
        

        //Meta tags.
        /**/
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
        
        document.querySelector('meta[property="og:locale"]').setAttribute("content", gSystemConfig.configBackendLanguage);
        //document.querySelector('meta[property="og:title"]').setAttribute("content", "Example with title meta tag");
        

        //document.getElementsByTagName("meta")["og:title"].content = "Example with title meta tag";
        //document.head.querySelector('meta[name=og:title]').content = 'Example with title meta tag';
    }
    //**************************************************************************************
    

    //Head build object´s content.
    //**************************************************************************************
    async titleCurrentBuild()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;


        //Title Current.
        //elementMessage01("titleCurrent", "Example of current title");
        //FunctionsSyncSystem.elementMessage01("titleCurrent", "Example of current title");
        //elementMessage01("titleCurrent", this.titleCurrent); //working
        //console.log("FunctionsSyncSystem=", FunctionsSyncSystem);
        FunctionsSyncSystem.elementMessage01("titleCurrent", this.titleCurrent);
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
        }
        //----------------------


        return(
            <React.Fragment>
                { /*Categories records.*/ }
                <FrontendCategoriesDetailsRecord 
                    objCategoriesDetails={ this.state.objCategoriesDetails } 
                    configLayoutType={ 2 }>
                </FrontendCategoriesDetailsRecord>
            </React.Fragment>
        );
    }
    //**************************************************************************************
}

export default FrontendCategoriesDetails;      