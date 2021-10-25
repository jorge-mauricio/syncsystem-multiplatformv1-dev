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
// ----------------------

class FrontendElementsLoading extends Component {
  // Context.
  static contextType = SyncSystemNSContext;

  // Constructor.
  // **************************************************************************************
  constructor(props, context) {
    // Component options.
    // configLayoutType: 1 - Circles Zoom

    super(props, context);
    /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */

    // Variables.
    // ----------------------
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; // Deconstruct variables (each variable is allocated to it´s correspondent name).
    // ----------------------

    // Properties.
    // ----------------------
    this.configLayoutType;

    this.queryDefault = ''; // NOTE: try to get from parent

    // this.objContentListing = {};
    // this.arrContentListing = [];
    // ----------------------

    // Define values - props parameters.
    // ----------------------
    this.configLayoutType = this.props.configLayoutType;
    // ----------------------

    // Logic
    // ----------------------
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
      /*
      this.state = {
        // objContentListing: this.objContentListing,
        // arrContentListing: this.arrContentListing,
        dataLoaded: false,
      };
      */
    }
    // ----------------------
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
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; // Deconstruct variables (each variable is allocated to it´s correspondent name).
    // ----------------------

    // Logic.
    // ----------------------
    /**/
    try {
      // Main build.
      // await this.build();

      // Head content.
      // await this.headBuild();

      // Title content.
      // await this.titleCurrentBuild();

      /*
            fetch("http:// localhost:3000/api/categories/details/813")
            .then(response => response.json())
            .then((data)=>{
                this.objCategoriesCurrent = data;

                // Define value - current category title.
                this.titleCurrent = this.objCategoriesCurrent.tblCategoriesTitle;

                // Set state.
                // this.setState({titleCurrent: "testing after fetch"});


                // Debug.
                console.log("this.titleCurrent=",this.titleCurrent);
                console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);
            });
            */
      // Check if this._idParentCategories is number. If not, search for the id based on the friendly name.

      // API - fetch data from backend.
      // let response = await fetch("http:// localhost:3000/api/categories/details/813");
      // this.objCategoriesCurrent = await response.json();
      // console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);
    } catch (asyncError) {
      if (gSystemConfig.configDebug === true) {
        console.error(asyncError);
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
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; // Deconstruct variables (each variable is allocated to it´s correspondent name).
    // ----------------------

    // Logic.
    // ----------------------
    /**/
    try {
      // TODO: elementsLoading api
    } catch (buildError) {
      if (gSystemConfig.configDebug === true) {
        console.error(buildError);
      }
    } finally {
      // Update state.
      // this.setState({ objContentListing: this.objContentListing });
      // this.setState({ arrContentListing: this.arrContentListing });

      // this.setState({ dataLoaded: true }); // Note: Place on the last part of the logic.
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
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;

    let configLayoutType;
    // ----------------------

    // Define values.
    // ----------------------
    /* eslint-disable */
    // arrContentListing = this.state.arrContentListing;
    configLayoutType = this.props.configLayoutType;
    /* eslint-enable */

    // Debug.
    // console.log("configLayoutType=", this.configLayoutType);
    // ----------------------

    // Output.
    // ----------------------
    return (
      // Circles Zoom.
      configLayoutType === 1 ? 
        <section className="ss-frontend-layout-section-content01" style={{ position: 'relative', display: 'block', textAlign: 'center' }}>
          <div className="loadingio-spinner-interwind-zd49qx49xdb">
            <div className="ldio-4184arakpp2">
              <div>
                <div>
                  <div>
                    <div>
                    </div>
                  </div>
                </div>
                <div>
                  <div>
                    <div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      :
        ``
    );
    // ----------------------
  }
  // **************************************************************************************
}

export default FrontendElementsLoading;
