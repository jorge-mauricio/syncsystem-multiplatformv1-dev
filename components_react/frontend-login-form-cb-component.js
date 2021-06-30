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
        //this.props = this.props.bind(this); //error
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
        //console.log("name=", name);
        //console.log("value=", value);
    }
    //**************************************************************************************


    //Login form submit handler.
    //**************************************************************************************
    handleLoginFormSubmit = (e) => {
        e.preventDefault(); //Prevent form from submiting.


        //Variables.
        //----------------------
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;

        let uesername;
        let email;
        let password;

        let apiURLLoginOptions;
        let apiURLLogin;
        let apiLoginResponse;
        let objLoginJson;
        //----------------------


        //Value definition.
        //----------------------
        email = this.state.email;
        password = this.state.password;
        //----------------------


        //Clean messages.
        //TODO: move to a separete react global function.
        FunctionsSyncSystem.elementMessage01("messageSuccess", "");
        FunctionsSyncSystem.htmlGenericStyle01('messageSuccess', 'display', 'none');
        FunctionsSyncSystem.elementMessage01("messageError", "");
        FunctionsSyncSystem.htmlGenericStyle01('messageError', 'display', 'none');
        FunctionsSyncSystem.elementMessage01("messageAlert", "");
        FunctionsSyncSystem.htmlGenericStyle01('messageAlert', 'display', 'none');

        //Logic.
        if((email) && (password))
        {
            (async function(props){ //async marks the block
                try{ 
                    //Variables.
                    let fdLogin = new FormData();

                    //Build form data.
                    fdLogin.append("email", email);
                    fdLogin.append("password", password);
                    fdLogin.append("apiKey", SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2));


                    //Fetch options for post method.
                    apiURLLoginOptions = {
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
                        body: fdLogin
                    };

                    //API - build URL string.
                    apiURLLogin = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPILogin + "/";
                    
                    //API - fetch data from backend.
                    apiLoginResponse = await fetch(apiURLLogin, apiURLLoginOptions);
                    objLoginJson = await apiLoginResponse.json();


                    //Debug.
                    //console.log("email=", email);
                    //console.log("password=", password);
                    //console.log("objLoginJson=", objLoginJson);
                    //console.log("props=", props);
                }catch(handleLoginFormSubmitError){
                    if(gSystemConfig.configDebug === true)
                    {
                        console.log("handleLoginFormSubmitError=", handleLoginFormSubmitError);
                    }
                }finally{

                    //Condition.
                    if(objLoginJson.returnStatus === false)
                    {
                        //Show connection error message (layout).
                        FunctionsSyncSystem.htmlGenericStyle01('messageError', 'display', 'block');
                        FunctionsSyncSystem.elementMessage01("messageError", SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "statusMessageAPI1e"));
                    }else{
                        if(objLoginJson.registerVerification === false)
                        {
                            //User not found error message (layout).
                            FunctionsSyncSystem.htmlGenericStyle01('messageError', 'display', 'block');
                            FunctionsSyncSystem.elementMessage01("messageError", SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "statusMessageLogin5e"));
                        }else{
                            if(objLoginJson.loginVerification === false)
                            {
                                //Password error message.
                                FunctionsSyncSystem.htmlGenericStyle01('messageError', 'display', 'block');
                                FunctionsSyncSystem.elementMessage01("messageError", SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "statusMessageLogin1e"));

                            }else{
                                if(objLoginJson.loginActivation === false)
                                {
                                    //User not activated.
                                    FunctionsSyncSystem.htmlGenericStyle01('messageAlert', 'display', 'block');
                                    FunctionsSyncSystem.elementMessage01("messageAlert", SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "statusMessageLogin3a"));
                                }else{
                                    //Create cookies.
                                    //TODO: based on the loginType
                                    /*cookieCreate(gSystemConfig.configCookiePrefix + "_" + "idRegisterUser", objLoginJson.tblRegistersIDCrypt, {
                                        cookiePeriod: 1
                                    });*/
                                    FunctionsSyncSystem.cookieCreate(gSystemConfig.configCookiePrefix + "_" + "idRegisterUser", objLoginJson.tblRegistersIDCrypt,  gSystemConfig.configCookieDefaultOptions);

                                    //let idRegisterDebug = SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(FunctionsSyncSystem.cookieRead(gSystemConfig.configCookiePrefix + "_" + "idRegisterUser"), "db"), 2);
                                   

                                    //Debug.
                                    //document.cookie = `referral_key=hello;max-age=604800;domain=localhost`;
                                    //document.cookie = `referral_key=hello;max-age=604800`;
                                    //console.log("document.cookie=", document.cookie);
                                    //console.log("idRegisterDebug=", idRegisterDebug);

                                    //Redirect with success message.
                                    //this.props.history.push('/');
                                    //props.history.push("/");//Home
                                    //props.history.push("/quizzes/123/");
                                    props.history.push("/" + gSystemConfig.configRouteFrontendDashboard +"/?messageSuccess=statusMessageLogin1");
                                    
                                    FunctionsSyncSystem.htmlGenericStyle01('messageSuccess', 'display', 'block');
                                    FunctionsSyncSystem.elementMessage01("messageSuccess", SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "statusMessageLogin1"));
                                }
                            }
                        }
                    }
                }
            })(this.props);
        }


        //Debug.
        //console.log("this.state=", this.state);
        //console.log("document.cookie=", document.cookie);
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