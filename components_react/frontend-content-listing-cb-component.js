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
//import FrontendContentRecord from "./frontend-content-record-cb-component.js";
import FrontendContent from "./frontend-content-cb-component.js";
import FrontendForms from "./frontend-forms-cb-component.js";
//----------------------


class FrontendContentListing extends Component
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

        this._idParentContent = 0; //parameter
        this._idTbForms = ""; //querystring

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

        this.objCategoriesCurrent = {};
        this.titleCurrent = "";

        //this.objContentListing = {};
        //this.arrContentListing = [];

        this.metaTitle = "";
        this.metaDescription = "";
        this.metaKeywords = "";
        this.metaURLCurrent = "";
        //----------------------


        //Value definition - props parameters.
        //----------------------
        if(this.props.match.params.idParentContent)
        {
            this._idParentContent = this.props.match.params.idParentContent;


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
        /*
        if(this.objParametersQueryString.pageNumber)
        {
            this._pageNumber = this.objParametersQueryString.pageNumber;
        }
        */

        if(this.objParametersQueryString.idTbForms)
        {
            this._idTbForms = this.objParametersQueryString.idTbForms;
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
            //objContentListing: this.objContentListing,
            //arrContentListing: this.arrContentListing,
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
        //console.log("this._idTbForms=", this._idTbForms);
        //console.log("this.objParametersQueryString(content listing)=", this.objParametersQueryString);
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

        var apiURLCategoriesDetailsCurrent = "";
        var apiCategoriesDetailsCurrentResponse;


        //Logic.
        //----------------------
        /**/
        try
        {
            //API - build URL string.
            //apiURLCategoriesDetailsCurrent = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + this._idParentContent + "?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
            apiURLCategoriesDetailsCurrent = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + this._idParentContent + "?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2);
            //console.log("apiURLCategoriesDetailsCurrent=", apiURLCategoriesDetailsCurrent);


            //API - fetch data from backend.
            //var response = await fetch(apiURLCategoriesDetailsCurrent);
            apiCategoriesDetailsCurrentResponse = await fetch(apiURLCategoriesDetailsCurrent);
            //this.objCategoriesCurrent = await response.json();
            this.objCategoriesCurrent = await apiCategoriesDetailsCurrentResponse.json();
            //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);


            //Value definition.
            //this.titleCurrent = this.objCategoriesCurrent.tblCategoriesTitle;
            this.titleCurrent = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesTitle);
            //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);

            //idParentCategories = this.props.match.params.idParentCategories;

            this.metaTitle = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "configSiteTile");
            this.metaTitle += " - " + this.titleCurrent; //Bellow 160 characters.

            this.metaDescription = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesMetaDescription); //Bellow 100 characters.
            this.metaKeywords = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesKeywordsTags); //Bellow 60 characters.
            this.metaURLCurrent = gSystemConfig.configSystemURL + "/" + gSystemConfig.configRouteFrontendCategories + "/" + this._idParentCategories + "?pageNumber=" + this._pageNumber;
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{
            //Update state.
            //this.setState({ objContentListing: this.objContentListing });
            
            //this.setState({ arrContentListing: this.arrContentListing });

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
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;



        //console.log("this.objCategoriesListing=",this.objCategoriesListing);


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
        

        //document.getElementsByTagName("meta")["og:title"].content = "Example with title meta tag";
        //document.head.querySelector('meta[name=og:title]').content = 'Example with title meta tag';
        
        /*
        for(let i = 0; i < tagsMeta.length; i++)
        {
            //Title.
            if(tagsMeta[i].getAttribute('name') == "title")
            {
                tagsMeta[i].setAttribute("content", "Example with title meta tag");
            }

            //Description.
            if(tagsMeta[i].getAttribute('name') == "description")
            {
                tagsMeta[i].setAttribute("content", "Example of description");
            }

            //Key-words.
            if(tagsMeta[i].getAttribute('name') == "keywords")
            {
                tagsMeta[i].setAttribute("content", "Example of key-words");
            }

            //og:title.
            if(tagsMeta[i].getAttribute('name') == "og:title")
            {
                tagsMeta[i].setAttribute("content", "Example with title meta tag");
            }

            //og:type.
            if(tagsMeta[i].getAttribute('name') == "og:type")
            {
                tagsMeta[i].setAttribute("content", "website");
            }

            //og:url.
            if(tagsMeta[i].getAttribute('name') == "og:url")
            {
                tagsMeta[i].setAttribute("content", "Example with og url");
            }

            //og:description.
            if(tagsMeta[i].getAttribute('name') == "og:description")
            {
                tagsMeta[i].setAttribute("content", "Example with og description");
            }

            //og:image.
            if(tagsMeta[i].getAttribute('name') == "og:image")
            {
                tagsMeta[i].setAttribute("content", "Example with image url");
            }

            //og:image:secure_url.
            if(tagsMeta[i].getAttribute('name') == "og:image:secure_url")
            {
                tagsMeta[i].setAttribute("content", "Example with image url secure");
            }

            //og:image:alt.
            if(tagsMeta[i].getAttribute('name') == "og:image:alt")
            {
                tagsMeta[i].setAttribute("content", "image description");
            }

            //og:locale.
            if(tagsMeta[i].getAttribute('name') == "og:locale")
            {
                tagsMeta[i].setAttribute("content", "en_US");
            }
        }
        */

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
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).
    

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
        //----------------------
        return(
            <section className="ss-frontend-layout-section-content01">
                { /*Content.*/ }
                <FrontendContent 
                    idParentContent={ this._idParentContent } 
                    idTbContent={ "" } 
                    contentType={ "" } 
                    configLayoutType={ 2 } 
                    configContentNRecords={ "" } 
                    configContentSort={ "" }>
                        {/*arrCategoriesListing={ this.arrCategoriesListing } also works*/}
                </FrontendContent>


                { /*Forms.*/ }
                {this._idTbForms != "" ?
                    <FrontendForms 
                        idTbForms={this._idTbForms} 
                        configLayoutType={ 22 } 
                        configFormsSort={ "" }>
                    </FrontendForms>
                    :``
                }
            </section>
        );
        //----------------------
    }
    //**************************************************************************************
}

export default FrontendContentListing;