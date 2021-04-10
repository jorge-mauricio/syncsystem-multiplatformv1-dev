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
        

        //Div layout - field names on top fields (custom).
        //----------------------
        if(configLayoutType == 2)
        {
            //if(_.isEmpty(objCategoriesDetails) === true)
            //{
                //Not empty.
                return(
                    <section className="ss-frontend-layout-section-content01">
                        <form id={"form" + objFormsDetails.tblFormsID} 
                            name={"form" + objFormsDetails.tblFormsID} 
                            className={"ss-frontend-form-input01"}
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

                                {arrFormsFieldsListing.map((formsfieldsRow, formsfieldsRowKey)=>{
                                    return(
                                        <React.Fragment>
                                            { /*Text Field.*/ }
                                            { formsfieldsRow.field_type == 1 ?
                                                <div key={ formsfieldsRowKey } 
                                                    className="ss-frontend-forms-row01">
                                                    <label for={"form" + objFormsDetails.tblFormsID + "_" + formsfieldsRow.field_name_formatted} className="ss-frontend-forms-row-label01 ss-frontend-forms-label01">
                                                        { formsfieldsRow.required == 1 ?
                                                            <span>
                                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                            </span>
                                                            :``
                                                        }
                                                        
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsfieldsRow.field_name, "db") }
                                                    </label>
                                                    <div className="ss-frontend-forms-row-field01">
                                                        { gSystemConfig.enableFormsFieldsInstructions == 1 && formsfieldsRow.field_instructions != "" ?
                                                            <div className="ss-frontend-forms-instructions01">
                                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsfieldsRow.field_instructions, "db")) }
                                                            </div>
                                                            :``
                                                        }
                                                        
                                                        <input type="text" 
                                                            id={"form" + objFormsDetails.tblFormsID + "_" + formsfieldsRow.field_name_formatted} 
                                                            name={formsfieldsRow.field_name_formatted} 
                                                            className="ss-frontend-forms-field-text01"
                                                            style={  
                                                                formsfieldsRow.field_size == 0 ?
                                                                    {width: "100%;"}
                                                                :
                                                                    {width: formsfieldsRow.field_size + "px"}
                                                            } />
                                                    </div>
                                                </div>
                                                :``
                                            }


                                            { /*Text Area.*/ }
                                            { formsfieldsRow.field_type == 2 ?
                                                <div key={ formsfieldsRowKey } 
                                                    className="ss-frontend-forms-row01">
                                                    <label for={"form" + objFormsDetails.tblFormsID + "_" + formsfieldsRow.field_name_formatted} className="ss-frontend-forms-row-label01 ss-frontend-forms-label01">
                                                        { formsfieldsRow.required == 1 ?
                                                            <span>
                                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                            </span>
                                                            :``
                                                        }
                                                        
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsfieldsRow.field_name, "db") }
                                                    </label>
                                                    <div className="ss-frontend-forms-row-field01" style={{verticalAlign: "top"}}>
                                                        <textarea 
                                                            id={"form" + objFormsDetails.tblFormsID + "_" + formsfieldsRow.field_name_formatted} 
                                                            name={formsfieldsRow.field_name_formatted} 
                                                            className="ss-frontend-forms-field-text-area01"
                                                            style={  
                                                                formsfieldsRow.field_size == 0 ?
                                                                    {width: "100%;"}
                                                                :
                                                                    {width: formsfieldsRow.field_size + "px"}
                                                            } />

                                                        { gSystemConfig.enableFormsFieldsInstructions == 1 && formsfieldsRow.field_instructions != "" ?
                                                            <div className="ss-frontend-forms-instructions01">
                                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsfieldsRow.field_instructions, "db")) }
                                                            </div>
                                                            :``
                                                        }
                                                    </div>
                                                </div>
                                                :``
                                            }


                                            { /*Check Box.*/ }
                                            { formsfieldsRow.field_type == 3 ?
                                                <div key={ formsfieldsRowKey } 
                                                    className="ss-frontend-forms-row01">
                                                    <label className="ss-frontend-forms-row-label01 ss-frontend-forms-label01" style={{verticalAlign: "top"}}>
                                                        { formsfieldsRow.required == 1 ?
                                                            <span>
                                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                            </span>
                                                            :``
                                                        }
                                                        
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsfieldsRow.field_name, "db") }
                                                    </label>
                                                    <div className="ss-frontend-forms-row-field01" style={{verticalAlign: "top"}}>
                                                        { gSystemConfig.enableFormsFieldsInstructions == 1 && formsfieldsRow.field_instructions != "" ?
                                                            <div className="ss-frontend-forms-instructions01">
                                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsfieldsRow.field_instructions, "db")) }
                                                            </div>
                                                            :``
                                                        }

                                                        { /*Loop.*/ }
                                                        { /*Loop.
                                                        arrFormsFieldsOptionsListing.filter(objFormsFieldsOptions =>
                                                            objFormsFieldsOptions.id_forms_fields == formsfieldsRow.id
                                                            ).map((formsFieldsOptionsRow)=>{
                                                                return(

                                                                );
                                                        }) //works (alternative method)

                                                        */ }
                                                        { arrFormsFieldsOptionsListing.filter((objFormsFieldsOptions)=>{
                                                            return objFormsFieldsOptions.id_forms_fields == formsfieldsRow.id

                                                            //Debug.
                                                            //console.log("objFormsFieldsOptions.id_forms_fields=", objFormsFieldsOptions.id_forms_fields);
                                                            //console.log("formsfieldsRow.id=", formsfieldsRow.id);

                                                            }).map((formsFieldsOptionsRow)=>{
                                                                return(
                                                                    <label for={"form" + objFormsDetails.tblFormsID + "_" + "formField" + formsfieldsRow.id + "_" + formsFieldsOptionsRow.option_name_formatted} className="ss-frontend-forms-field-checkbox-label">
                                                                        <input type="checkbox" 
                                                                            id={"form" + objFormsDetails.tblFormsID + "_" + "formField" + formsfieldsRow.id + "_" + formsFieldsOptionsRow.option_name_formatted} 
                                                                            name={formsfieldsRow.field_name_formatted + "[]"} 
                                                                            value={ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") } 
                                                                            className="ss-frontend-forms-field-checkbox" /> 
                                                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }
                                                                    </label>
                                                            );
                                                        }) }
                                                    </div>
                                                </div>
                                                :``
                                            }


                                            { /*Radio Box.*/ }
                                            { formsfieldsRow.field_type == 4 ?
                                                <div key={ formsfieldsRowKey } 
                                                    className="ss-frontend-forms-row01">
                                                    <label className="ss-frontend-forms-row-label01 ss-frontend-forms-label01" style={{verticalAlign: "top"}}>
                                                        { formsfieldsRow.required == 1 ?
                                                            <span>
                                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                            </span>
                                                            :``
                                                        }
                                                        
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsfieldsRow.field_name, "db") }
                                                    </label>
                                                    <div className="ss-frontend-forms-row-field01" style={{verticalAlign: "top"}}>
                                                        { gSystemConfig.enableFormsFieldsInstructions == 1 && formsfieldsRow.field_instructions != "" ?
                                                            <div className="ss-frontend-forms-instructions01">
                                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsfieldsRow.field_instructions, "db")) }
                                                            </div>
                                                            :``
                                                        }

                                                        { /*Loop.*/ }
                                                        { arrFormsFieldsOptionsListing.filter((objFormsFieldsOptions)=>{
                                                            return objFormsFieldsOptions.id_forms_fields == formsfieldsRow.id
                                                            }).map((formsFieldsOptionsRow)=>{
                                                                return(
                                                                    <label for={"form" + objFormsDetails.tblFormsID + "_" + "formField" + formsfieldsRow.id + "_" + formsFieldsOptionsRow.option_name_formatted} className="ss-frontend-forms-field-checkbox-label">
                                                                        <input type="radio" 
                                                                            id={"form" + objFormsDetails.tblFormsID + "_" + "formField" + formsfieldsRow.id + "_" + formsFieldsOptionsRow.option_name_formatted} 
                                                                            radioGroup={formsfieldsRow.field_name_formatted} 
                                                                            name={formsfieldsRow.field_name_formatted} 
                                                                            value={ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") } 
                                                                            className="ss-frontend-forms-field-checkbox" /> 
                                                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }
                                                                    </label>
                                                            );
                                                        }) }
                                                    </div>
                                                </div>
                                                :``
                                            }


                                            { /*Dropdown Menu.*/ }
                                            { formsfieldsRow.field_type == 5 ?
                                                <div key={ formsfieldsRowKey } 
                                                    className="ss-frontend-forms-row01">
                                                    <label for={"form" + objFormsDetails.tblFormsID + "_" + formsfieldsRow.field_name_formatted} className="ss-frontend-forms-row-label01 ss-frontend-forms-label01">
                                                        { formsfieldsRow.required == 1 ?
                                                            <span>
                                                                { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendFormsRequiredFieldsSymbol") }
                                                            </span>
                                                            :``
                                                        }
                                                        
                                                        { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsfieldsRow.field_name, "db") }
                                                    </label>
                                                    <div className="ss-frontend-forms-row-field01">
                                                        { gSystemConfig.enableFormsFieldsInstructions == 1 && formsfieldsRow.field_instructions != "" ?
                                                            <div className="ss-frontend-forms-instructions01">
                                                                { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsfieldsRow.field_instructions, "db")) }
                                                            </div>
                                                            :``
                                                        }

                                                        <select id={"form" + objFormsDetails.tblFormsID + "_" + formsfieldsRow.field_name_formatted} 
                                                            name={formsfieldsRow.field_name_formatted} 
                                                            className="ss-frontend-forms-field-dropdown01"
                                                            style={  
                                                                formsfieldsRow.field_size == 0 ?
                                                                    {width: "100%;"}
                                                                :
                                                                    {width: formsfieldsRow.field_size + "px"}
                                                            }>

                                                            <option value="" selected>

                                                            </option>
                                                            { /*Loop.*/ }
                                                            { arrFormsFieldsOptionsListing.filter((objFormsFieldsOptions)=>{
                                                                return objFormsFieldsOptions.id_forms_fields == formsfieldsRow.id
                                                                }).map((formsFieldsOptionsRow)=>{
                                                                    return(
                                                                        <option value={ SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }>
                                                                            { SyncSystemNS.FunctionsGeneric.contentMaskRead(formsFieldsOptionsRow.option_name, "db") }
                                                                        </option>
                                                                );
                                                            }) }



                                                            
                                                        </select>
                                                    </div>
                                                </div>
                                                :``
                                            }


                                            { /*Text Description.*/ }
                                            { formsfieldsRow.field_type == 7 ?
                                                <div key={ formsfieldsRowKey } 
                                                    className="ss-frontend-forms-row01">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsfieldsRow.field_name, "db")) }
                                                </div>
                                                :``
                                            }


                                            { /*Subheader.*/ }
                                            { formsfieldsRow.field_type == 8 ?
                                                <div key={ formsfieldsRowKey } 
                                                    className="ss-frontend-forms-row01 ss-frontend-forms-subheading-title">
                                                    { HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(formsfieldsRow.field_name, "db")) }
                                                </div>
                                                :``
                                            }


                                            { /*Debug.*/ }
                                            { /*
                                            id = { formsfieldsRow.id }
                                            <br />
                                            key = { formsfieldsRowKey }
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
                    </section>
                );

            //}else{
                //Redirect 404 or redirect 404 on the upper component.
            //}
        }
    
    }    
    //**************************************************************************************

}


export default FrontendFormsRecord;