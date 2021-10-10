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
import FrontendCategoriesListingRecord from './frontend-categories-listing-record-cb-component.js';
// ----------------------

class FrontendCategories extends Component {
  // Context.
  static contextType = SyncSystemNSContext;

  // Constructor.
  // **************************************************************************************
  constructor(props, context) {
    // Component options.
    // idParentCategories: (categories id)
    // idRegisterUser: (register id)

    // configLayoutType: 1 - table listing (custom) | 2 - div layout (custom) | 11 - table listing (bootstrap) | 22 - div layout (bootstrap) | 111 - table listing (dashboard - custom)
    // configCategoriesNRecords: (maximum number of records to show)
    // configCategoriesSort: (custom order)

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
    this.idParentCategories;
    this.idRegisterUser;

    this.configLayoutType;
    this.configCategoriesNRecords;
    this.configCategoriesSort;

    this.activation;
    this.activation1;
    this.activation2;
    this.activation3;
    this.activation4;
    this.activation5;

    this.queryDefault = ''; // NOTE: try to get from parent

    this.objCategoriesListingJson;
    this.objCategoriesListing = {};
    this.arrCategoriesListing = [];
    // ----------------------

    // Define values - props parameters.
    // ----------------------
    this.idParentCategories = this.props.idParentCategories;
    this.idRegisterUser = this.props.idRegisterUser;

    this.configLayoutType = this.props.configLayoutType;
    this.configCategoriesNRecords = this.props.configCategoriesNRecords;
    this.configCategoriesSort = this.props.configCategoriesSort;

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
        objCategoriesListing: this.objCategoriesListing,
        arrCategoriesListing: this.arrCategoriesListing,
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

    let apiURLCategoriesListing = '';
    let apiCategoriesListingResponse;
    // ----------------------

    // Logic.
    // ----------------------
    try {
      // API - build URL string.
      // apiURLCategoriesListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + this.idParentCategories + "/?apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
      // apiURLCategoriesListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + this.idParentCategories + "/?strNRecords=" + this.configCategoriesNRecords + "&apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
      // apiURLCategoriesListing = gSystemConfig.configAPIURL + "/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPICategories + "/" + this.idParentCategories + "/?strNRecords=" + this.configCategoriesNRecords + "&apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, "env"), 2);
      apiURLCategoriesListing = gSystemConfig.configAPIURL + '/' + gSystemConfig.configRouteAPI + '/' + gSystemConfig.configRouteAPICategories + '/' + this.idParentCategories + '/?strNRecords=' + this.configCategoriesNRecords;
      if (this.activation) {
        apiURLCategoriesListing += '&activation=' + this.activation;
      }
      if (this.activation1) {
        apiURLCategoriesListing += '&activation1=' + this.activation1;
      }
      if (this.activation2) {
        apiURLCategoriesListing += '&activation2=' + this.activation2;
      }
      if (this.activation3) {
        apiURLCategoriesListing += '&activation3=' + this.activation3;
      }
      if (this.activation4) {
        apiURLCategoriesListing += '&activation4=' + this.activation4;
      }
      if (this.activation5) {
        apiURLCategoriesListing += '&activation5=' + this.activation5;
      }
      // apiURLCategoriesListing += "&apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
      apiURLCategoriesListing += '&apiKey=' + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, 'env'), 2);

      // API - fetch data from backend.
      apiCategoriesListingResponse = await fetch(apiURLCategoriesListing);
      this.objCategoriesListingJson = await apiCategoriesListingResponse.json();

      // Value definition.
      this.objCategoriesListing = this.objCategoriesListingJson.oclRecords;
      this.arrCategoriesListing = this.objCategoriesListingJson.oclRecords.resultsCategoriesListing;

      // TODO: limit n records

      // Debug.
      // console.log('this.objCategoriesCurrent=',this.objCategoriesCurrent);
       console.log('this.arrCategoriesListing=',this.arrCategoriesListing);
    } catch (buildError) {
      if (gSystemConfig.configDebug === true) {
        console.error(buildError);
      }
    } finally {
      // Update state.
      this.setState({ objCategoriesListing: this.objCategoriesListing });
      this.setState({ arrCategoriesListing: this.arrCategoriesListing });

      this.setState({ dataLoaded: true }); // Note: Place on the last part of the logic.
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
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;

    let configLayoutType;
    let arrCategoriesListing;
    // ----------------------

    // Check if data is loaded.
    // ----------------------
    if (this.state.dataLoaded === false) {
      if (gSystemConfig.configDebug === true) {
        console.log('Still loading data.');
      }

      return '';
    }
    // ----------------------

    // Define values.
    // ----------------------
    configLayoutType = this.props.configLayoutType;
    arrCategoriesListing = this.state.arrCategoriesListing;

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
    // console.log('arrCategoriesListing  (inside component)=', this.arrCategoriesListing);
    // console.log('configCategoriesNRecords=', this.configCategoriesNRecords);
    // console.log("configFilesSort=", this.configFilesSort);
    // console.log("configFilesZoom=", this.configFilesZoom);

    // console.log("arrFilesListing=", arrFilesListing);
    // ----------------------

    // Output.
    // ----------------------
    return (
      <React.Fragment>
        {/* Categories records. */}
        <FrontendCategoriesListingRecord arrCategoriesListing={this.state.arrCategoriesListing} configLayoutType={configLayoutType}></FrontendCategoriesListingRecord>
      </React.Fragment>
    );
    // ----------------------
  }
  // **************************************************************************************
}

export default FrontendCategories;
