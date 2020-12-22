"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //{path: '../.env'}
//const { CONFIG_API_URL } = process.env;
//const { REACT_APP_CONFIG_API_URL } = process.env;

const gSystemConfig = require("../config-application.js"); //System configuration.
//const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//const FunctionsDB = require("../" + gSystemConfig.configDirectoryComponents + "/functions-db.js");
const FunctionsGeneric = require("../" + gSystemConfig.configDirectoryComponents + "/functions-generic.js");
const FunctionsCrypto = require("../" + gSystemConfig.configDirectoryComponents + "/functions-crypto.js");


//import React from "react";
import React, {Component} from "react";
import ReactDOM from "react-dom";

//import "../app_js/functions-syncsystem.js";
import {elementMessage01} from "../app_js/functions-syncsystem.js";
//import FunctionsSyncSystem from "../app_js/functions-syncsystem.js";
/*
if (typeof window !== 'undefined') {
    import "../app_js/functions-syncsystem.js";
}
*/

const qs = require('query-string');
//----------------------

/*
var elementMessage01 = (idElement, strMessage) => {
    //Variables.
    //----------------------
    let elementHTML = "";
    //----------------------


    //Logic.
    //----------------------
    if(idElement.indexOf("iframe:") >= 0)
    {

    }else{
        elementHTML = document.getElementById(idElement);

		//input type - hidden
		if(elementHTML.getAttribute("type") == "hidden")
		{
			elementHTML.value = strMessage;
		}
		
		//input type - text
		if(elementHTML.getAttribute("type") == "text")
		{
			elementHTML.value = strMessage;
		}
		
		//input type - checkbox
		if(elementHTML.getAttribute("type") == "checkbox")
		{
			elementHTML.value = strMessage;
        }

        //element tag - a
        //if(elementHTML.getAttribute("type") == "a")
        //if(elementHTML.tagName == "A") //tag names return in uppercase
        if(elementHTML.tagName.toLowerCase() == "a")
		{
			elementHTML.innerHTML = strMessage;
        }

        //element tag - div
        if(elementHTML.tagName.toLowerCase() == "div")
		{
			elementHTML.innerHTML = strMessage;
        }
    }
    //----------------------


    //Usage.
    //----------------------
    //elementMessage01('formCategoririesListing_method', 'DELETE');
    //----------------------
};
*/

class FrontendCategoriesListing extends Component
{
    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {

        super(props, context);


        //Properties.
        //----------------------
        this.objParametersQueryString = qs.parse(this.props.location.search);

        this._idParentCategories = 0;

        this._pagingNRecords = gSystemConfig.configCategoriesBackendPaginationNRecords;
        this._pagingTotalRecords = 0;
        this._pagingTotal = 0;
        //this._pageNumber = this.props.location.query.pageNumber;
        this._pageNumber = 1;
        this._masterPageFrontendSelect = "";

        this._messageSuccess = "";
        this._messageError = "";
        this._messageAlert = "";
        this._nRecords = "";

        this.queryDefault = "";

        this.objCategoriesCurrent = {};
        this.titleCurrent = "";

        this.objCategoriesListing = {};
        this.arrCategoriesListing = [];

        this.metaTitle = "";
        this.metaDescription = "";
        this.metaKeywords = "";
        this.metaURLCurrent = "";
        //----------------------


        //Value definition - props parameters.
        //----------------------
        if(this.props.match.params.idParentCategories)
        {
            this._idParentCategories = this.props.match.params.idParentCategories;
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


        /**/
        //State creation.
        this.state = {
            objCategoriesListing: this.objCategoriesListing,
            arrCategoriesListing: this.arrCategoriesListing
        };
        


        //Bind objects.
        //this.objCategoriesListing = this.objCategoriesListing.bind(this);


       //console.log("props=", props);
    }
    //**************************************************************************************
    

    //Build object´s content.
    //**************************************************************************************
    async build()
    {
        //Logic.
        //----------------------
        /**/
        try
        {

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


    /*
    elementMessage01(idElement, strMessage)
    {

        //this.idElement

 
        //idElement.preventDefault();
        //strMessage.preventDefault();
    }
    */

   //componentDidMount()
   async componentDidMount()
   {
        //Variables.
        //const tagsMeta = document.getElementsByTagName('meta');
        //var idParentCategories = ""
        //var titleCurrent = ""
        var apiURLCategoriesDetailsCurrent = "";
        var apiCategoriesDetailsCurrentResponse;


        //API - fetch data from backend.
        //apiURLCategoriesDetailsCurrent = "http://localhost:3000/api/categories/details/813";
        //apiURLCategoriesDetailsCurrent = process.env.CONFIG_API_URL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories + "?apiKey=" + process.env.CONFIG_API_KEY_SYSTEM;
        //apiURLCategoriesDetailsCurrent = process.env.CONFIG_API_URL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories + "?apiKey=" + FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
        //apiURLCategoriesDetailsCurrent = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories + "?apiKey=" + FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
        apiURLCategoriesDetailsCurrent = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + this._idParentCategories + "?apiKey=" + FunctionsCrypto.encryptValue(FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
        //apiURLCategoriesDetailsCurrent = process.env.CONFIG_API_URL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories + "?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
        //apiURLCategoriesDetailsCurrent = process.env.REACT_APP_CONFIG_API_URL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories;
        //apiURLCategoriesDetailsCurrent = CONFIG_API_URL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories;
        //apiURLCategoriesDetailsCurrent = REACT_APP_CONFIG_API_URL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + gSystemConfig.configRouteAPIDetails + "/" + this._idParentCategories;
        //console.log("apiURLCategoriesDetailsCurrent=", apiURLCategoriesDetailsCurrent);

        //var response = await fetch(apiURLCategoriesDetailsCurrent);
        apiCategoriesDetailsCurrentResponse = await fetch(apiURLCategoriesDetailsCurrent);
        //this.objCategoriesCurrent = await response.json();
        this.objCategoriesCurrent = await apiCategoriesDetailsCurrentResponse.json();
        //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);


        //Value definition.
        //this.titleCurrent = this.objCategoriesCurrent.tblCategoriesTitle;
        this.titleCurrent = FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesTitle);
        //console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);

        //idParentCategories = this.props.match.params.idParentCategories;

        this.metaTitle = this.objCategoriesCurrent; //Bellow 160 characters.
        this.metaDescription = FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesMetaDescription); //Bellow 100 characters.
        this.metaKeywords = FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesKeywordsTags); //Bellow 60 characters.
        this.metaURLCurrent = gSystemConfig.configSystemURL + "/" + gSystemConfig.configRouteFrontendCategories + "/" + this._idParentCategories + "?pageNumber=" + this._pageNumber;

        this.objCategoriesListing = this.objCategoriesCurrent.oclRecords;
        this.setState({ objCategoriesListing: this.objCategoriesListing });
        
        this.arrCategoriesListing = this.objCategoriesCurrent.oclRecords.resultsCategoriesListing;
        this.setState({ arrCategoriesListing: this.arrCategoriesListing });

        //console.log("this.objCategoriesListing=",this.objCategoriesListing);


        //Logic.
        //----------------------
        /**/
        try
        {
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

        //Title Current.
        //elementMessage01("titleCurrent", "Example of current title");
        //FunctionsSyncSystem.elementMessage01("titleCurrent", "Example of current title");
        elementMessage01("titleCurrent", this.titleCurrent);


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
        } catch (error) {
            console.log("error=", error);
        }
        

        //console.log("this.props=", JSON.stringify(this.props));
    }
    
    render()
    {
        //Head.
        //document.title ="Example with title tag"; 
        //document.getElementsByTagName("title").content="Example with title tag";
        /*
            <React.Fragment>
                Single component
            </React.Fragment>
        */
       
        return(
            <React.Fragment>
                Single component
                {/*onClick={this.elementMessage01("titleCurrent", "current title example")} */ + ''}
                <button onClick={/*elementMessage01("titleCurrent", "current title example")*/ + ''}>
                    Click me
                </button>

                { /*Debug.*/ + '' }
                { /*"this.objCategoriesListing=" + this.objCategoriesListing*/ + '' }
                { /*"this.state.objCategoriesListing=" + JSON.stringify(this.state.objCategoriesListing)*/ + '' }
                { /*"this.state.arrCategoriesListing=" + JSON.stringify(this.state.arrCategoriesListing)*/ + '' }

                {/**/this.state.arrCategoriesListing.map((objCategoriesRecord, objCategoriesRecordkey) =>
                    {
                        return <div key={objCategoriesRecordkey}>
                            <div>
                                id: {objCategoriesRecord.id}
                            </div>
                            <div>
                                title: {objCategoriesRecord.title}
                            </div>
                            <div>
                                activation: {objCategoriesRecord.activation}
                            </div>
                            <br />
                            <br />
                        </div>
                    }
                )}
                
            </React.Fragment>
            /*
            [
                <h1>
                    Categories listing
                </h1>,
                <h2>
                    title exemple
                </h2>,
                <div>
                    current title exemple
                </div>,
                <div>
                    body exemple
                </div>
            ]
            */
            /*
            {
                cphHead:
                <h1>
                    Categories listing
                </h1>,
                cphTitle:
                <div>
                    title exemple
                </div>,
                cphTitleCurrent:
                <div>
                    current title exemple
                </div>,
                cphBody:
                <div>
                    body exemple
                </div>
            }
            */
        );
    }
}

export default FrontendCategoriesListing;