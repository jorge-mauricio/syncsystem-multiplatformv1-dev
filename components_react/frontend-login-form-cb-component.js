"use strict";

//Import Node Modules.
//----------------------
//Context.
import { SyncSystemNSContext } from "./syncsystem-ns-cb-context.js";

//import React from "react";
import React, { Component } from "react";
import ReactDOM from "react-dom";
//import { Link } from 'react-router-dom';
//----------------------


class FrontendLoginForm extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //configLayoutType: 1 - div layout (custom) | 3 - horizontal | 4 - API | 11 - div layout (bootstrap) | 111 - responsive
        //this.configLoginOrigin: 1 - login page | 2 - shopping cart | 3 - other | 11 - API

        super(props, context);
        /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */

        //Bind methods / functions.
        //----------------------
        this.handleLoginFormSubmit = this.handleLoginFormSubmit.bind(this);
        this.handleLoginFormFieldsChange = this.handleLoginFormFieldsChange.bind(this);
        //----------------------

        
        //Variables.
        //----------------------
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; //Deconstruct variables (each variable is allocated to it´s correspondent name).
        //----------------------


        //Properties.
        //----------------------
        this.configLayoutType;
        this.configLoginOrigin;
        this.configLoginReturnURL;
        this.configLoginIDReturnURL;

        this.queryDefault = ""; //NOTE: try to get from parent
        //----------------------


        //Define values - props parameters.
        //----------------------
        this.configLayoutType = this.props.configLayoutType;
        this.configLoginOrigin = this.props.configLoginOrigin;
        this.configLoginReturnURL = this.props.configLoginReturnURL;
        this.configLoginIDReturnURL = this.props.configLoginIDReturnURL;
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
                email: "",
                password: "",
                loginOrigin: "",
                loginReturnURL: "",
                loginIDReturnURL: "",

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
        try
        {
            //Main build.
            await this.build();

            //Head content.
            //await this.headBuild();

            //Title content.
            //await this.titleCurrentBuild();
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

        //Debug.
        //console.log("gSystemConfig (inside home cb component)=", gSystemConfig);
        //console.log("this.context (inside home cb component)=", this.context);
        //----------------------
        

        //Logic.
        //----------------------
        /**/
        try
        {

        }catch(buildError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(buildError);
            }
        }finally{
            //Update state.

            //Note: Place on the last part of the logic.
            this.setState({ dataLoaded: true });
        }
        //----------------------
    }
    //**************************************************************************************


    //Login fields change.
    //**************************************************************************************
    handleLoginFormFieldsChange = (e) => {
        //Variables.
        const {name, value, type, checked} = e.target;

        
        if(type ==="checkbox")
        {
            /*
            this.setState({
                //firstName: event.target.value //working
                //[event.target.name]: event.target.value
                [name]: checked
            });
            */
        }else{
            this.setState({
                //firstName: event.target.value //working
                //[event.target.name]: event.target.value
                [name]: value
            });
        }


        //this.setState({[event.target.name]: event.target.value});


        //Debug.
        console.log("name=", name);
        console.log("value=", value);
    }
    //**************************************************************************************


    //Login form submit handler.
    //**************************************************************************************
    handleLoginFormSubmit = (e) => {
        e.preventDefault(); //Prevent form from submiting.


        //Debug.
        console.log("this.state=", this.state);
    }
    //**************************************************************************************


    //Render.
    //**************************************************************************************
    render()
    {
        //Variables.
        //----------------------
        //const { gSystemConfig, FunctionsGeneric, FunctionsCrypto } = this.context;
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;

        var configLayoutType;
        var configLoginOrigin;
        var configLoginReturnURL;
        var configLoginIDReturnURL;
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
        configLayoutType = this.configLayoutType;
        configLoginOrigin = this.configLoginOrigin;
        configLoginReturnURL = this.configLoginReturnURL;
        configLoginIDReturnURL = this.configLoginIDReturnURL;

        //Debug.
        //console.log("arrContentListing=", arrContentListing);
        //----------------------


        //1 - div layout (custom).
        //----------------------
        if(configLayoutType == 1)
        {
            //Output.
            return(
                <div style={{position: "relative", display: "block", overflow: "hidden"}}>

                    <form id={"login" + configLayoutType} 
                            name={"form" + configLayoutType} 
                            className={"ss-frontend-form-input01"}
                            //method={"POST"}
                            //action={gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPILogin + "/"} 
                            //encType={"application/x-www-form-urlencoded"}
                            //encType={"multipart/form-data"}
                            onSubmit={this.handleLoginFormSubmit}
                            >
                            <input type="hidden"
                                id={"form" + configLayoutType + "_loginOrigin"}
                                name={"loginOrigin"}
                                value={configLoginOrigin} />
                            <input type="hidden"
                                id={"form" + configLayoutType + "_loginReturnURL"}
                                name={"loginReturnURL"}
                                value={configLoginReturnURL} />
                            <input type="hidden"
                                id={"form" + configLayoutType + "_loginIDReturnURL"}
                                name={"loginIDReturnURL"}
                                value={configLoginIDReturnURL} />

                        <fieldset className="ss-frontend-login-container">
                            <legend className="ss-frontend-login-subheading-title ss-frontend-login-subheading-title-layout">
                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendLoginTitleTable") }
                            </legend>

                            <div className="ss-frontend-login-row01">

                                <label for={"form" + configLayoutType + "_email"} className="ss-frontend-login-row-label01 ss-frontend-login-label01">
                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendLoginEmail") }
                                </label>
                                <div className="ss-frontend-login-row-field01">
                                    <input type="text" 
                                        id={"form" + configLayoutType + "_email"} 
                                        name={"email"} 
                                        required={true} 
                                        className="ss-frontend-login-field-user" 
                                        onChange={this.handleLoginFormFieldsChange} 
                                        value={this.state.email} />
                                </div>
                            </div>

                            <div className="ss-frontend-login-row01">
                                <label for={"form" + configLayoutType + "_password"} className="ss-frontend-login-row-label01 ss-frontend-login-label01">
                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendLoginPassword") }
                                </label>
                                <div className="ss-frontend-login-row-field01">
                                    <input type="password" 
                                        id={"form" + configLayoutType + "_password"} 
                                        name={"password"} 
                                        required={true} 
                                        className="ss-frontend-login-field-password" 
                                        onChange={this.handleLoginFormFieldsChange}  
                                        value={this.state.password} />
                                </div>
                            </div>

                            <div className="ss-frontend-login-row01" style={{textAlign: "center", marginTop: "0px"}}>
                                <button className="ss-frontend-btn-base ss-frontend-btn-action">
                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendButtonLogin") }
                                </button>
                            </div>
                        </fieldset>
                    </form>
                </div>
            );
        }
        //----------------------
    }
    //**************************************************************************************
}


export default FrontendLoginForm;