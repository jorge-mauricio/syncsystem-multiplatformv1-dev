'use strict'; // eslint-disable-line

// Import Node Modules.
// ----------------------
// const gSystemConfig = require("../config-application.js"); // System configuration.
// const FunctionsGeneric = require("../" + gSystemConfig.configDirectoryComponents + "/functions-generic.js");
// const FunctionsCrypto = require("../" + gSystemConfig.configDirectoryComponents + "/functions-crypto.js");

// Context.
import { SyncSystemNSContext } from './syncsystem-ns-cb-context.js';

// import React from "react";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import { Link } from 'react-router-dom';

// Components.
import FrontendPublicationsListingRecord from './frontend-publications-listing-record-cb-component.js';
// ----------------------

class FrontendPublications extends Component {
  // Context.
  static contextType = SyncSystemNSContext;

  // Constructor.
  // **************************************************************************************
  constructor(props, context) {
    // Component options.
    // idParentPublications: (categories id)
    // idRegisterUser: (register id)

    // configLayoutType: 1 - table listing (custom) | 2 - div layout (custom) | 3 - div row (custom) | 11 - table listing (bootstrap) | 22 - div layout (bootstrap) | 33 - div row (bootstrap) | 111 - table listing (dashboard - custom)
    // configPublicationsNRecords: (maximum number of records to show)
    // configPublicationsSort: (custom order)

    // activation:
    // activation1:
    // activation2:
    // activation3:
    // activation4:
    // activation5:

    super(props, context);
    /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */

    // Variables.
    // ----------------------
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser } = this.context; // Deconstruct variables (each variable is allocated to it´s correspondent name).
    // ----------------------

    // Properties.
    // ----------------------
    this.idParentPublications;
    this.idRegisterUser;

    this.configLayoutType;
    this.configPublicationsNRecords;
    this.configPublicationsSort;

    this.activation;
    this.activation1;
    this.activation2;
    this.activation3;
    this.activation4;
    this.activation5;

    this.queryDefault = ''; // NOTE: try to get from parent

    this.objPublicationsListingJson;
    this.objPublicationsListing = {};
    this.arrPublicationsListing = [];
    // ----------------------

    // Define values - props parameters.
    // ----------------------
    this.idParentPublications = this.props.idParentPublications;
    this.idRegisterUser = this.props.idRegisterUser;

    this.configLayoutType = this.props.configLayoutType;
    this.configPublicationsNRecords = this.props.configPublicationsNRecords;
    this.configPublicationsSort = this.props.configPublicationsSort;

    this.activation = this.props.activation;
    this.activation1 = this.props.activation1;
    this.activation2 = this.props.activation2;
    this.activation3 = this.props.activation3;
    this.activation4 = this.props.activation4;
    this.activation5 = this.props.activation5;
    // ----------------------

    // Logic
    try {
      // State creation.
      /*
            this.state = {
                // arrCategoriesListing: this.props.arrCategoriesListing
                // arrCategoriesListing: props.arrCategoriesListing
                arrCategoriesListing: []
            };
            */
      // Debug.
      // console.log("props=", props);
      // await this.build();
      // this.build();
    } catch (asyncError) {
      if (gSystemConfig.configDebug === true) {
        console.error(asyncError);
      }
    } finally {
      // State creation.
      this.state = {
        objPublicationsListing: this.objPublicationsListing,
        arrPublicationsListing: this.arrPublicationsListing,
        dataLoaded: false,
      };
    }
  }
  // **************************************************************************************

  // Lifecycle method.
  // **************************************************************************************
  async componentWillMount() {
    // Main build.
    // await this.build();
    // Head content.
    // await this.headBuild();
    // Title content.
    // await this.titleCurrentBuild();
  }
  // **************************************************************************************

  // Lifecycle method.
  // **************************************************************************************
  // componentDidMount()
  async componentDidMount() {
    // Variables.
    // ----------------------
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser } = this.context; // Deconstruct variables (each variable is allocated to it´s correspondent name).
    // ----------------------

    // Logic.
    // ----------------------
    /**/
    try {
      // Main build.
      await this.build();

      // Head content.
      // await this.headBuild();

      // Title content.
      // await this.titleCurrentBuild();
    } catch (componentDidMountError) {
      if (gSystemConfig.configDebug === true) {
        console.error(componentDidMountError);
      }
    } finally {
      // TODO:
    }
    // ----------------------

    // Debug.
    // this.setState({ arrCategoriesListing: this.props.arrCategoriesListing });
    // console.log("this.props=", this.props);
  }
  // **************************************************************************************

  // Build object´s content.
  // **************************************************************************************
  async build() {
    // Variables.
    // ----------------------
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser } = this.context; // Deconstruct variables (each variable is allocated to it´s correspondent name).

    let apiURLPublicationsListing = '';
    let apiPublicationsListingResponse;
    // ----------------------

    // Logic.
    // ----------------------
    try {
      // API - build URL string.
      // apiURLPublicationsListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIPublications + "/" + this.idParentPublications + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
      // apiURLPublicationsListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIPublications + "/" + this.idParentPublications + "/?strNRecords=" + this.configPublicationsNRecords + "&apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
      // apiURLPublicationsListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIPublications + "/" + this.idParentPublications + "/?strNRecords=" + this.configPublicationsNRecords + "&apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2);
      apiURLPublicationsListing = gSystemConfig.configAPIURL + '/' + gSystemConfig.configRouteAPI + '/' + gSystemConfig.configRouteAPIPublications + '/' + this.idParentPublications + '/?strNRecords=' + this.configPublicationsNRecords;
      if (this.activation) {
        apiURLPublicationsListing += '&activation=' + this.activation;
      }
      if (this.activation1) {
        apiURLPublicationsListing += '&activation1=' + this.activation1;
      }
      if (this.activation2) {
        apiURLPublicationsListing += '&activation2=' + this.activation2;
      }
      if (this.activation3) {
        apiURLPublicationsListing += '&activation3=' + this.activation3;
      }
      if (this.activation4) {
        apiURLPublicationsListing += '&activation4=' + this.activation4;
      }
      if (this.activation5) {
        apiURLPublicationsListing += '&activation5=' + this.activation5;
      }
      // apiURLPublicationsListing += "&apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
      apiURLPublicationsListing += '&apiKey=' + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, 'env'), 2);

      // API - fetch data from backend.
      apiPublicationsListingResponse = await fetch(apiURLPublicationsListing);
      this.objPublicationsListingJson = await apiPublicationsListingResponse.json();

      // Value definition.
      this.objPublicationsListing = this.objPublicationsListingJson.oplRecords;
      this.arrPublicationsListing = this.objPublicationsListingJson.oplRecords.resultsPublicationsListing;

      // TODO: limit n records

      // Debug.
      // console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);
    } catch (buildError) {
      if (gSystemConfig.configDebug === true) {
        console.error(buildError);
      }
    } finally {
      // Update state.
      this.setState({ objPublicationsListing: this.objPublicationsListing });
      this.setState({ arrPublicationsListing: this.arrPublicationsListing });

      this.setState({ dataLoaded: true }); // Note: Place on the last part of the logic.

      // Change state of in context.
      this.context.frontendPublicationsListingLoaded = true;
    }
    // ----------------------
  }
  // **************************************************************************************

  // Render.
  // **************************************************************************************
  // async render()
  render() {
    // Variables.
    // ----------------------
    // const { gSystemConfig, FunctionsGeneric, FunctionsCrypto } = this.context;
    // const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, SyncSystemRC } = this.context;
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, SyncSystemRC } = this.context;

    let configLayoutType;
    let arrPublicationsListing;
    // ----------------------

    // Check if data is loaded.
    // ----------------------
    if (this.state.dataLoaded === false) {
      if (gSystemConfig.configDebug === true) {
        console.log('Still loading data.');
      }

      return (
        <SyncSystemRC.FrontendElementsLoading configLayoutType={1}>
        </SyncSystemRC.FrontendElementsLoading>
      );
    }
    // ----------------------

    // Define values.
    // ----------------------
    configLayoutType = this.props.configLayoutType;
    arrPublicationsListing = this.state.arrPublicationsListing;

    /*
        idParentFiles = this.props.idParentFiles;
        idTbFiles = this.props.idTbFiles;
        contentType = this.props.contentType;
        configLayoutType = this.props.configLayoutType;
        configFilesNRecords = this.props.configFilesNRecords;
        configFilesSort = this.props.configFilesSort;
        // arrCategoriesListing = this.props.arrCategoriesListing;
        */

    // Debug.
    // console.log('configLayoutType (inside component)=', this.configLayoutType);
    // console.log('arrPublicationsListing  (inside component)=', this.arrPublicationsListing);
    // console.log('configPublicationsNRecords=', this.configPublicationsNRecords);
    // console.log("configFilesSort=", this.configFilesSort);
    // console.log("configFilesZoom=", this.configFilesZoom);

    // console.log("arrFilesListing=", arrFilesListing);
    // ----------------------

    // Output.
    // ----------------------
    return (
      <React.Fragment>
        {/* Publications records. */}
        <FrontendPublicationsListingRecord arrPublicationsListing={this.state.arrPublicationsListing} configLayoutType={configLayoutType}></FrontendPublicationsListingRecord>
      </React.Fragment>
    );
    // ----------------------
  }
  // **************************************************************************************
}

export default FrontendPublications;
