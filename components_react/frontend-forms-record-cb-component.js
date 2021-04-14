"use strict";

//Import Node Modules.
//----------------------
//const gSystemConfig = require("../config-application.js"); //System configuration.
//const FunctionsGeneric = require("../" + gSystemConfig.configDirectoryComponents + "/functions-generic.js");
//const FunctionsCrypto = require("../" + gSystemConfig.configDirectoryComponents + "/functions-crypto.js");

//Context.
import { SyncSystemNSContext } from "./syncsystem-ns-cb-context.js";

//const _ = require('lodash'); //Loadash

//import React from "react";
import React, {Component} from "react";
import ReactDOM from "react-dom";
import reactSafe from "react-safe";
//import { Link } from 'react-router-dom';
//----------------------


class FrontendFormsRecord extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;


    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //configLayoutType: 1 - table listing - field names by the side of fields (custom) | 2 - div layout - field names on top fields (custom) | 3 - field names inside of fields (custom) |  21 - table listing - field names by the side of fields (bootstrap) | 22 - div layout - field names on top fields (bootstrap) | 23 - field names inside of fields (bootstrap)


        super(props, context);
        /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */
        //Bind methods.
        this.handleSubmit = this.handleFormSubmit.bind(this);


        //Properties.
        //----------------------
        this.configLayoutType;
        this.objForms;
        this.objFormsDetails;
        this.arrFormsFieldsListing;
        this.arrFormsFieldsOptionsListing;
        //----------------------


        //Define values - props parameters.
        //----------------------
        this.configLayoutType = this.props.configLayoutType;
        this.objForms = this.props.objForms;
        //----------------------


        //Define values.
        //----------------------
        if(this.objForms.returnStatus === true)
        {
            //this.objFormsDetails = this.objForms.ofdRecord.resultsFormsDetails;
            this.objFormsDetails = this.objForms.ofdRecord;
            this.arrFormsFieldsListing = this.objForms.offlRecords.resultsFormsFieldsListing;
            this.arrFormsFieldsOptionsListing = this.objForms.offolRecords.resultsFormsFieldsOptionsListing;
        }
        //----------------------


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
    }
    //**************************************************************************************


    //Lifecycle method.
    //**************************************************************************************
    //componentDidMount()
    async componentDidMount()
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;


        //Main build.
        //await this.build();

        //Logic.
        //----------------------
        try
        {
            //gLightboxBackendConfigOptions.selector = "glightbox_categories_image_main";
            //var glightboxCategoriesImageMain = GLightbox(gLightboxBackendConfigOptions);

        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{

        }


        //Debug.
        //this.setState({ arrCategoriesListing: this.props.arrCategoriesListing });
        //console.log("this.props=", this.props);
    }
    //**************************************************************************************
    

    //Form submit handler
    //**************************************************************************************
    handleFormSubmit(event)
    {
        event.preventDefault();
        /*
        const form = event.target;
        const data = new FormData(form);
    
        for(let name of data.keys())
        {
            const input = form.elements[name];
            const parserName = input.dataset.parse;

            if(parserName)
            {
                const parser = inputParsers[parserName];
                const parsedValue = parser(data.get(name));
                data.set(name, parsedValue);
            }
        }
        */


        //Debug.
        //console.log("data=", data);
        console.log("event=", event);

        
        /*
        fetch('/api/form-submit-url', {
          method: 'POST',
          body: data,
        });
        */
    }
    //**************************************************************************************


    //Render.
    //**************************************************************************************
    render()
    //async render()
    {
        //Variables.
        //----------------------
        //const { gSystemConfig, FunctionsGeneric, FunctionsCrypto } = this.context;
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem,  HTMLReactParser } = this.context;

        var configLayoutType = null;
        var objForms;
        var objFormsDetails;
        var arrFormsFieldsListing;
        var arrFormsFieldsOptionsListing;
        //----------------------


        //Define values.
        //----------------------
        configLayoutType = this.configLayoutType;
        objForms = this.objForms;
        objFormsDetails = this.objFormsDetails;
        arrFormsFieldsListing = this.arrFormsFieldsListing;
        arrFormsFieldsOptionsListing = this.arrFormsFieldsOptionsListing;


        //Debug.
        //console.log("configLayoutType(details record)=", configLayoutType);
        //console.log("objForms(details record)=", objForms);
        //console.log("objFormsDetails(details record)=", objFormsDetails);
        //console.log("arrFormsFieldsListing(details record)=", arrFormsFieldsListing);
        //console.log("arrFormsFieldsOptionsListing(details record)=", arrFormsFieldsOptionsListing);
        //----------------------
        

        //div layout - field names on top fields (custom).
        //----------------------
        if(configLayoutType == 2)
        {
            //if(_.isEmpty(objCategoriesDetails) === true)
            //{
                //Output.
                return(
                    <div style={{position: "relative", display: "block", overflow: "hidden"}}>
                        <form id={"form" + objFormsDetails.tblFormsID} 
                            name={"form" + objFormsDetails.tblFormsID} 
                            className={"ss-frontend-form-input01"}
                            /*onSubmit={this.handleFormSubmit}*/
                            method={"POST"}
                            //action={gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIForms + "/" + gSystemConfig.configRouteAPIActionSend + "/" + objFormsDetails.tblFormsID + "/"} 
                            action={gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIForms + "/" + gSystemConfig.configRouteAPIActionSend + "/"} 
                            //encType={"application/x-www-form-urlencoded"}
                            encType={"multipart/form-data"}
                            >

                            <input type="hidden"
                                id={"form" + objFormsDetails.tblFormsID + "_idTbForms"}
                                name={"idTbForms"}
                                value={objFormsDetails.tblFormsID} />
                            <input type="hidden"
                                id={"form" + objFormsDetails.tblFormsID + "_returnURL"}
                                name={"returnURL"}
                                value={gSystemConfig.configRouteFrontendForms + "/" + gSystemConfig.configRouteFrontendActionSend} />

                            <fieldset className="ss-frontend-forms-container">

                                <legend className="ss-frontend-forms-title01">
                                    { objFormsDetails.tblFormsFormTitle } 
                                </legend>

                                {arrFormsFieldsListing.map((formsFieldsRow, formsFieldsRowKey)=>{
                                    return(
                                        <React.Fragment>
                                            { /*Text Field.*/ }
                                            { formsFieldsRow.field_type == 1 ?
                                                <div key={ formsFieldsRowKey } 
                                                    className="ss-frontend-forms-row01">
                                                    <label for={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} className="ss-frontend-forms-row-label01 ss-frontend-forms-label01">
                                                        { formsFieldsRow.required == 1 ?
                                                            <span>
                                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                            </span>
                                                            :``
                                                        }
                                                        
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                                    </label>
                                                    <div className="ss-frontend-forms-row-field01">
                                                        <input type="text" 
                                                            id={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} 
                                                            name={formsFieldsRow.field_name_formatted} 
                                                            required={
                                                                    formsFieldsRow.required == 1 ? 
                                                                        true 
                                                                    : 
                                                                        false
                                                                    } 
                                                            className="ss-frontend-forms-field-text01" 
                                                            style={  
                                                                formsFieldsRow.field_size == 0 ?
                                                                    {width: "100%;"}
                                                                :
                                                                    {width: formsFieldsRow.field_size + "px"}
                                                            } />

                                                        { gSystemConfig.enableFormsFieldsInstructions == 1 && formsFieldsRow.field_instructions != "" ?
                                                            <div className="ss-frontend-forms-instructions01">
                                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_instructions, "db")) }
                                                            </div>
                                                            :``
                                                        }
                                                    </div>
                                                </div>
                                                :``
                                            }


                                            { /*Text Area.*/ }
                                            { formsFieldsRow.field_type == 2 ?
                                                <div key={ formsFieldsRowKey } 
                                                    className="ss-frontend-forms-row01">
                                                    <label for={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} className="ss-frontend-forms-row-label01 ss-frontend-forms-label01">
                                                        { formsFieldsRow.required == 1 ?
                                                            <span>
                                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                            </span>
                                                            :``
                                                        }
                                                        
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                                    </label>
                                                    <div className="ss-frontend-forms-row-field01" style={{verticalAlign: "top"}}>
                                                        <textarea 
                                                            id={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} 
                                                            name={formsFieldsRow.field_name_formatted} 
                                                            required={
                                                                    formsFieldsRow.required == 1 ? 
                                                                        true 
                                                                    : 
                                                                        false
                                                                    } 
                                                            className="ss-frontend-forms-field-text-area01"
                                                            style={  
                                                                formsFieldsRow.field_size == 0 ?
                                                                    {width: "100%;"}
                                                                :
                                                                    {width: formsFieldsRow.field_size + "px"}
                                                            } />

                                                        { gSystemConfig.enableFormsFieldsInstructions == 1 && formsFieldsRow.field_instructions != "" ?
                                                            <div className="ss-frontend-forms-instructions01">
                                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_instructions, "db")) }
                                                            </div>
                                                            :``
                                                        }
                                                    </div>
                                                </div>
                                                :``
                                            }


                                            { /*Check Box.*/ }
                                            { formsFieldsRow.field_type == 3 ?
                                                <div key={ formsFieldsRowKey } 
                                                    className="ss-frontend-forms-row01">
                                                    <label className="ss-frontend-forms-row-label01 ss-frontend-forms-label01" style={{verticalAlign: "top"}}>
                                                        { formsFieldsRow.required == 1 ?
                                                            <span>
                                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                            </span>
                                                            :``
                                                        }
                                                        
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                                    </label>
                                                    <div className="ss-frontend-forms-row-field01" style={{verticalAlign: "top"}}>
                                                        { gSystemConfig.enableFormsFieldsInstructions == 1 && formsFieldsRow.field_instructions != "" ?
                                                            <div className="ss-frontend-forms-instructions01">
                                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_instructions, "db")) }
                                                            </div>
                                                            :``
                                                        }

                                                        { /*Loop.*/ }
                                                        { /*Loop.
                                                        arrFormsFieldsOptionsListing.filter(objFormsFieldsOptions =>
                                                            objFormsFieldsOptions.id_forms_fields == formsFieldsRow.id
                                                            ).map((formsFieldsOptionsRow)=>{
                                                                return(

                                                                );
                                                        }) //works (alternative method)

                                                        */ }
                                                        { arrFormsFieldsOptionsListing.filter((objFormsFieldsOptions)=>{
                                                                return objFormsFieldsOptions.id_forms_fields == formsFieldsRow.id

                                                                //Debug.
                                                                //console.log("objFormsFieldsOptions.id_forms_fields=", objFormsFieldsOptions.id_forms_fields);
                                                                //console.log("formsFieldsRow.id=", formsFieldsRow.id);
                                                            }).map((formsFieldsOptionsRow)=>{
                                                                return(
                                                                    <label for={"form" + objFormsDetails.tblFormsID + "_" + "formField" + formsFieldsRow.id + "_" + formsFieldsOptionsRow.option_name_formatted} className="ss-frontend-forms-field-checkbox-label">
                                                                        <input type="checkbox" 
                                                                            id={"form" + objFormsDetails.tblFormsID + "_" + "formField" + formsFieldsRow.id + "_" + formsFieldsOptionsRow.option_name_formatted} 
                                                                            name={formsFieldsRow.field_name_formatted + "[]"} 
                                                                            value={ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") } 
                                                                            className="ss-frontend-forms-field-checkbox" /> 
                                                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }
                                                                    </label>
                                                                );
                                                            }) 
                                                        }
                                                    </div>
                                                </div>
                                                :``
                                            }


                                            { /*Radio Box.*/ }
                                            { formsFieldsRow.field_type == 4 ?
                                                <div key={ formsFieldsRowKey } 
                                                    className="ss-frontend-forms-row01">
                                                    <label className="ss-frontend-forms-row-label01 ss-frontend-forms-label01" style={{verticalAlign: "top"}}>
                                                        { formsFieldsRow.required == 1 ?
                                                            <span>
                                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                            </span>
                                                            :``
                                                        }
                                                        
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                                    </label>
                                                    <div className="ss-frontend-forms-row-field01" style={{verticalAlign: "top"}}>
                                                        { gSystemConfig.enableFormsFieldsInstructions == 1 && formsFieldsRow.field_instructions != "" ?
                                                            <div className="ss-frontend-forms-instructions01">
                                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_instructions, "db")) }
                                                            </div>
                                                            :``
                                                        }

                                                        { /*Loop.*/ }
                                                        { arrFormsFieldsOptionsListing.filter((objFormsFieldsOptions)=>{
                                                                return objFormsFieldsOptions.id_forms_fields == formsFieldsRow.id
                                                            }).map((formsFieldsOptionsRow)=>{
                                                                return(
                                                                    <label for={"form" + objFormsDetails.tblFormsID + "_formField" + formsFieldsRow.id + "_" + formsFieldsOptionsRow.option_name_formatted} className="ss-frontend-forms-field-checkbox-label">
                                                                        <input type="radio" 
                                                                            id={"form" + objFormsDetails.tblFormsID + "_formField" + formsFieldsRow.id + "_" + formsFieldsOptionsRow.option_name_formatted} 
                                                                            radioGroup={formsFieldsRow.field_name_formatted} 
                                                                            name={formsFieldsRow.field_name_formatted} 
                                                                            value={ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") } 
                                                                            required={
                                                                                    formsFieldsRow.required == 1 ? 
                                                                                        true 
                                                                                    : 
                                                                                        false
                                                                                    } 
                                                                            className="ss-frontend-forms-field-checkbox" /> 
                                                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }
                                                                    </label>
                                                                );
                                                            }) 
                                                        }
                                                    </div>
                                                </div>
                                                :``
                                            }


                                            { /*Dropdown Menu.*/ }
                                            { formsFieldsRow.field_type == 5 ?
                                                <div key={ formsFieldsRowKey } 
                                                    className="ss-frontend-forms-row01">
                                                    <label for={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} className="ss-frontend-forms-row-label01 ss-frontend-forms-label01">
                                                        { formsFieldsRow.required == 1 ?
                                                            <span>
                                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                            </span>
                                                            :``
                                                        }
                                                        
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                                    </label>
                                                    <div className="ss-frontend-forms-row-field01">
                                                        <select id={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} 
                                                            name={formsFieldsRow.field_name_formatted} 
                                                            required={
                                                                    formsFieldsRow.required == 1 ? 
                                                                        true 
                                                                    : 
                                                                        false
                                                                    } 
                                                            className="ss-frontend-forms-field-dropdown01"
                                                            style={  
                                                                formsFieldsRow.field_size == 0 ?
                                                                    {width: "100%;"}
                                                                :
                                                                    {width: formsFieldsRow.field_size + "px"}
                                                            }>

                                                            <option value="" selected>

                                                            </option>
                                                            { /*Loop.*/ }
                                                            { arrFormsFieldsOptionsListing.filter((objFormsFieldsOptions)=>{
                                                                    return objFormsFieldsOptions.id_forms_fields == formsFieldsRow.id
                                                                }).map((formsFieldsOptionsRow)=>{
                                                                    return(
                                                                        <option value={ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }>
                                                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }
                                                                        </option>
                                                                    );
                                                                }) 
                                                            }
                                                        </select>

                                                        { gSystemConfig.enableFormsFieldsInstructions == 1 && formsFieldsRow.field_instructions != "" ?
                                                            <div className="ss-frontend-forms-instructions01">
                                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_instructions, "db")) }
                                                            </div>
                                                            :``
                                                        }
                                                    </div>
                                                </div>
                                                :``
                                            }


                                            { /*Text Description.*/ }
                                            { formsFieldsRow.field_type == 7 ?
                                                <div key={ formsFieldsRowKey } 
                                                    className="ss-frontend-forms-row01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db")) }
                                                </div>
                                                :``
                                            }


                                            { /*Subheader.*/ }
                                            { formsFieldsRow.field_type == 8 ?
                                                <div key={ formsFieldsRowKey } 
                                                    className="ss-frontend-forms-row01 ss-frontend-forms-subheading-title">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db")) }
                                                </div>
                                                :``
                                            }


                                            { /*Debug.*/ }
                                            { /*
                                            id = { formsFieldsRow.id }
                                            <br />
                                            key = { formsFieldsRowKey }
                                            */ }
                                        </React.Fragment>
                                    );
                                })}


                                <div className="ss-frontend-forms-row01" style={{textAlign: "right"}}>
                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsInstructions") }
                                </div>
                                <div className="ss-frontend-forms-row01" style={{textAlign: "center", marginTop: "0px"}}>
                                    <button className="ss-frontend-btn-base ss-frontend-btn-action">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendButtonSend") }
                                    </button>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                );

            //}else{
                //Redirect 404 or redirect 404 on the upper component.
            //}
        }

        //div layout - field names on top fields (bootstrap).
        //----------------------
        if(configLayoutType == 22)
        {
            //Output.
            return(
                <div className="container-fluid ss-frontend-forms-text01">
                    <form id={"form" + objFormsDetails.tblFormsID} 
                        name={"form" + objFormsDetails.tblFormsID} 
                        className={"ss-frontend-form-input01"}
                        /*onSubmit={this.handleFormSubmit}*/
                        method={"POST"}
                        //action={gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIForms + "/" + gSystemConfig.configRouteAPIActionSend + "/" + objFormsDetails.tblFormsID + "/"} 
                        action={gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIForms + "/" + gSystemConfig.configRouteAPIActionSend + "/"} 
                        //encType={"application/x-www-form-urlencoded"}
                        encType={"multipart/form-data"}
                        >

                        <input type="hidden"
                            id={"form" + objFormsDetails.tblFormsID + "_idTbForms"}
                            name={"idTbForms"}
                            value={objFormsDetails.tblFormsID} />
                        <input type="hidden"
                            id={"form" + objFormsDetails.tblFormsID + "_returnURL"}
                            name={"returnURL"}
                            value={gSystemConfig.configRouteFrontendForms + "/" + gSystemConfig.configRouteFrontendActionSend} />

                        <fieldset>
                            <legend className="row ss-frontend-forms-title01">
                                { objFormsDetails.tblFormsFormTitle } 
                            </legend>

                            {arrFormsFieldsListing.map((formsFieldsRow, formsFieldsRowKey)=>{
                                return(
                                    <React.Fragment>
                                        { /*Text Field.*/ }
                                        { formsFieldsRow.field_type == 1 ?
                                            <div key={ formsFieldsRowKey } 
                                                className="form-group">
                                                <label for={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} 
                                                    className="control-label col-sm-2">
                                                    { formsFieldsRow.required == 1 ?
                                                        <span>
                                                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                        </span>
                                                        :``
                                                    }
                                                    
                                                    { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                                </label>
                                                <div className="col-sm-10">
                                                    <input type="text" 
                                                        id={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} 
                                                        name={formsFieldsRow.field_name_formatted} 
                                                        required={
                                                                formsFieldsRow.required == 1 ? 
                                                                    true 
                                                                : 
                                                                    false
                                                                } 
                                                        className="form-control" 
                                                        style={  
                                                            formsFieldsRow.field_size == 0 ?
                                                                {width: "100%;"}
                                                            :
                                                                {width: formsFieldsRow.field_size + "px"}
                                                        } />

                                                    { gSystemConfig.enableFormsFieldsInstructions == 1 && formsFieldsRow.field_instructions != "" ?
                                                        <div className="ss-frontend-forms-instructions01">
                                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_instructions, "db")) }
                                                        </div>
                                                        :``
                                                    }
                                                </div>
                                            </div>
                                            :``
                                        }


                                        { /*Text Area.*/ }
                                        { formsFieldsRow.field_type == 2 ?
                                            <div key={ formsFieldsRowKey } 
                                                className="form-group">
                                                <label for={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} 
                                                    className="control-label col-sm-2">
                                                    { formsFieldsRow.required == 1 ?
                                                        <span>
                                                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                        </span>
                                                        :``
                                                    }
                                                    
                                                    { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                                </label>
                                                <div className="col-sm-10">
                                                    <textarea 
                                                        id={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} 
                                                        name={formsFieldsRow.field_name_formatted} 
                                                        required={
                                                                formsFieldsRow.required == 1 ? 
                                                                    true 
                                                                : 
                                                                    false
                                                                } 
                                                        className="form-control"
                                                        style={  
                                                            formsFieldsRow.field_size == 0 ?
                                                                {width: "100%;"}
                                                            :
                                                                {width: formsFieldsRow.field_size + "px"}
                                                        } />

                                                    { gSystemConfig.enableFormsFieldsInstructions == 1 && formsFieldsRow.field_instructions != "" ?
                                                        <div className="ss-frontend-forms-instructions01">
                                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_instructions, "db")) }
                                                        </div>
                                                        :``
                                                    }
                                                </div>
                                            </div>
                                            :``
                                        }


                                        { /*Check Box.*/ }
                                        { formsFieldsRow.field_type == 3 ?
                                            <div key={ formsFieldsRowKey } 
                                                className="form-group">
                                                <label for={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} 
                                                    className="control-label col-sm-2">

                                                    { formsFieldsRow.required == 1 ?
                                                        <span>
                                                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                        </span>
                                                        :``
                                                    }
                                                    
                                                    { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                                </label>
                                                <div className="col-sm-10">
                                                    { gSystemConfig.enableFormsFieldsInstructions == 1 && formsFieldsRow.field_instructions != "" ?
                                                        <div className="ss-frontend-forms-instructions01">
                                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_instructions, "db")) }
                                                        </div>
                                                        :``
                                                    }

                                                    { arrFormsFieldsOptionsListing.filter((objFormsFieldsOptions)=>{
                                                        return objFormsFieldsOptions.id_forms_fields == formsFieldsRow.id

                                                        //Debug.
                                                        //console.log("objFormsFieldsOptions.id_forms_fields=", objFormsFieldsOptions.id_forms_fields);
                                                        //console.log("formsFieldsRow.id=", formsFieldsRow.id);

                                                        }).map((formsFieldsOptionsRow)=>{
                                                            return(
                                                                <div class="form-check">
                                                                    <label for={"form" + objFormsDetails.tblFormsID + "_formField" + formsFieldsRow.id + "_" + formsFieldsOptionsRow.option_name_formatted} 
                                                                        className="form-check-label">
                                                                        <input type="checkbox" 
                                                                            id={"form" + objFormsDetails.tblFormsID + "_formField" + formsFieldsRow.id + "_" + formsFieldsOptionsRow.option_name_formatted} 
                                                                            name={formsFieldsRow.field_name_formatted + "[]"} 
                                                                            value={ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") } 
                                                                            className="form-check-input" /> 
                                                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }
                                                                    </label>
                                                                </div>
                                                            );
                                                        }) 
                                                    }
                                                </div>
                                            </div>
                                            :``
                                        }


                                        { /*Radio Box.*/ }
                                        { formsFieldsRow.field_type == 4 ?
                                            <div key={ formsFieldsRowKey } 
                                                className="form-group">
                                                <label className="control-label col-sm-2">

                                                    { formsFieldsRow.required == 1 ?
                                                        <span>
                                                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                        </span>
                                                        :``
                                                    }
                                                    
                                                    { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                                </label>
                                                <div className="col-sm-10">
                                                    { gSystemConfig.enableFormsFieldsInstructions == 1 && formsFieldsRow.field_instructions != "" ?
                                                        <div className="ss-frontend-forms-instructions01">
                                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_instructions, "db")) }
                                                        </div>
                                                        :``
                                                    }

                                                    { /*Loop.*/ }
                                                    { arrFormsFieldsOptionsListing.filter((objFormsFieldsOptions)=>{
                                                        return objFormsFieldsOptions.id_forms_fields == formsFieldsRow.id
                                                        }).map((formsFieldsOptionsRow)=>{
                                                            return(
                                                                <div class="form-check">
                                                                    <label for={"form" + objFormsDetails.tblFormsID + "_formField" + formsFieldsRow.id + "_" + formsFieldsOptionsRow.option_name_formatted} 
                                                                        className="form-check-label">
                                                                        <input type="radio" 
                                                                            id={"form" + objFormsDetails.tblFormsID + "_formField" + formsFieldsRow.id + "_" + formsFieldsOptionsRow.option_name_formatted} 
                                                                            radioGroup={formsFieldsRow.field_name_formatted} 
                                                                            name={formsFieldsRow.field_name_formatted} 
                                                                            value={ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") } 
                                                                            required={
                                                                                    formsFieldsRow.required == 1 ? 
                                                                                        true 
                                                                                    : 
                                                                                        false
                                                                                    } 
                                                                            className="form-check-input" /> 
                                                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }
                                                                    </label>
                                                                </div>
                                                            );
                                                        }) 
                                                    }
                                                </div>
                                            </div>
                                            :``
                                        }


                                        { /*Dropdown Menu.*/ }
                                        { formsFieldsRow.field_type == 5 ?
                                            <div key={ formsFieldsRowKey } 
                                                className="form-group">
                                                <label for={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} 
                                                    className="control-label col-sm-2">

                                                    { formsFieldsRow.required == 1 ?
                                                        <span>
                                                            { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                        </span>
                                                        :``
                                                    }
                                                    
                                                    { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") }
                                                </label>
                                                <div className="col-sm-10">
                                                    <select id={"form" + objFormsDetails.tblFormsID + "_" + formsFieldsRow.field_name_formatted} 
                                                        name={formsFieldsRow.field_name_formatted} 
                                                        required={
                                                                formsFieldsRow.required == 1 ? 
                                                                    true 
                                                                : 
                                                                    false
                                                                } 
                                                        className="form-control"
                                                        style={  
                                                            formsFieldsRow.field_size == 0 ?
                                                                {width: "100%;"}
                                                            :
                                                                {width: formsFieldsRow.field_size + "px"}
                                                        }>

                                                        <option value="" selected>

                                                        </option>

                                                        { /*Loop.*/ }
                                                        { arrFormsFieldsOptionsListing.filter((objFormsFieldsOptions)=>{
                                                            return objFormsFieldsOptions.id_forms_fields == formsFieldsRow.id
                                                            }).map((formsFieldsOptionsRow)=>{
                                                                return(
                                                                    <option value={ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }>
                                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }
                                                                    </option>
                                                                );
                                                            }) 
                                                        }
                                                    </select>

                                                    { gSystemConfig.enableFormsFieldsInstructions == 1 && formsFieldsRow.field_instructions != "" ?
                                                        <div className="ss-frontend-forms-instructions01">
                                                            { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_instructions, "db")) }
                                                        </div>
                                                        :``
                                                    }
                                                </div>
                                            </div>
                                            :``
                                        }


                                        { /*Text Description.*/ }
                                        { formsFieldsRow.field_type == 7 ?
                                            <div key={ formsFieldsRowKey } 
                                                className="row">
                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db")) }
                                            </div>
                                            :``
                                        }


                                        { /*Subheader.*/ }
                                        { formsFieldsRow.field_type == 8 ?
                                            <div key={ formsFieldsRowKey } 
                                                className="row ss-frontend-forms-subheading-title">
                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db")) }
                                            </div>
                                            :``
                                        }


                                        { /*Debug.*/ }
                                        { /*
                                        id = { formsFieldsRow.id }
                                        <br />
                                        key = { formsFieldsRowKey }
                                        */ }
                                    </React.Fragment>
                                );
                            })}

                            <div className="form-group" style={{marginBottom: "5px"}}>
                                <div className="col-sm-offset-2 col-sm-10" style={{textAlign: "left"}}>
                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsInstructions") }
                                </div>
                            </div>
                            <div className="form-group" style={{marginBottom: "5px"}}>
                                <div className="col-sm-offset-2 col-sm-10" style={{textAlign: "left", marginTop: "0px"}}>
                                    <button className="ss-frontend-btn-base ss-frontend-btn-action">
                                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "backendButtonSend") }
                                    </button>
                                </div>
                            </div>
                        </fieldset>
                    </form>
                </div>
            );

        }
    
    }    
    //**************************************************************************************

}


export default FrontendFormsRecord;