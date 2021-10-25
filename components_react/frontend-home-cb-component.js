'use strict'; // eslint-disable-line

// Import Node Modules.
// ----------------------
// require("dotenv").config(); // {path: '../.env'}
// const { CONFIG_API_URL } = process.env;
// const { REACT_APP_CONFIG_API_URL } = process.env;

// const gSystemConfig = require("../config-application.js"); // System configuration.
// // const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
// // const FunctionsDB = require("../" + gSystemConfig.configDirectoryComponents + "/functions-db.js");
// const FunctionsGeneric = require("../" + gSystemConfig.configDirectoryComponents + "/functions-generic.js");
// const FunctionsCrypto = require("../" + gSystemConfig.configDirectoryComponents + "/functions-crypto.js");

// Context.
import { SyncSystemNSContext } from './syncsystem-ns-cb-context.js';

// Provider.
// import SyncSystemNSContextProvider from "./syncsystem-ns-cb-context.js";

// Node modules.
// const qs = require('query-string');

// import React from "react";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// import "../app_js/functions-syncsystem.js";
// import {elementMessage01} from "../app_js/functions-syncsystem.js"; // working
// import FunctionsSyncSystem from "../app_js/functions-syncsystem.js";
/*
if (typeof window !== 'undefined') {
    import "../app_js/functions-syncsystem.js";
}
*/

// Components.
// import FrontendCategoriesListingRecord from "./frontend-categories-listing-record-cb-component.jsx";
// import FrontendCategoriesListingRecord from "./frontend-categories-listing-record-cb-component.js";
// import FrontendBanners from "./frontend-banners-cb-component.js";
import FrontendCategories from './frontend-categories-cb-component.js';
import FrontendProducts from './frontend-products-cb-component.js';
import FrontendPublications from './frontend-publications-cb-component.js';
import FrontendContent from './frontend-content-cb-component.js';

// import FrontendElementsLoading from './frontend-elements-loading.js';
// ----------------------

class FrontendHome extends Component {
  // Context.
  static contextType = SyncSystemNSContext;

  // Constructor.
  // **************************************************************************************
  constructor(props, context) {
    // Component options.
    // configLayoutType: 1 - div layout (custom) | 11 - div layout (bootstrap) | 111 - responsive

    super(props, context);

    // Variables.
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, qs } = this.context;

    // Properties.
    // ----------------------
    this.objParametersQueryString = qs.parse(this.props.location.search);
    this.configLayoutType = 1;
    // this._idParentCategories = 0;

    // this._pagingNRecords = gSystemConfig.configCategoriesFrontendPaginationNRecords;
    // this._pagingTotalRecords = 0;
    // this._pagingTotal = 0;
    // // this._pageNumber = this.props.location.query.pageNumber;
    // this._pageNumber = 1;
    this._masterPageFrontendSelect = '';

    this._messageSuccess = '';
    this._messageError = '';
    this._messageAlert = '';
    // this._nRecords = "";

    this.queryDefault = '';

    // this.objCategoriesCurrent = {};
    this.titleCurrent = '';

    // this._idParentCategoriesHome = '104'; // working
    // this.objCategoriesHomeJson = {}; // working
    // this.objCategoriesHomeListing = {}; // working
    // this.arrCategoriesHomeListing = []; // working

    // this._idParentPublicationsHome = '129'; // working
    // this.objPublicationsListingHomeJson; // working
    // this.objPublicationsHomeListing = {}; // working
    // this.arrPublicationsHomeListing = []; // working

    this.metaTitle = '';
    this.metaDescription = '';
    this.metaKeywords = '';
    this.metaURLCurrent = '';
    // ----------------------

    // Value definition - props parameters.
    // ----------------------
    /*
        if(this.props.match.params.idParentCategories)
        {
            this._idParentCategories = this.props.match.params.idParentCategories;
        }
        */
    // ----------------------

    // Value definition - query string.
    // ----------------------
    /*
        if(this.objParametersQueryString.pageNumber)
        {
            this._pageNumber = this.objParametersQueryString.pageNumber;
        }
        */

    if (this.objParametersQueryString.masterPageFrontendSelect) {
      this._masterPageFrontendSelect = this.objParametersQueryString.masterPageFrontendSelect;
    }

    if (this.objParametersQueryString.messageSuccess) {
      this._messageSuccess = this.objParametersQueryString.messageSuccess;
    }

    if (this.objParametersQueryString.messageError) {
      this._messageError = this.objParametersQueryString.messageError;
    }

    if (this.objParametersQueryString.messageAlert) {
      this._messageAlert = this.objParametersQueryString.messageAlert;
    }

    /*
        if(this.objParametersQueryString.nRecords)
        {
            this._nRecords = this.objParametersQueryString.nRecords;
        }
        */
    // ----------------------

    // Default query.
    if (this._masterPageFrontendSelect) {
      this.queryDefault += '&masterPageFrontendSelect=' + this._masterPageFrontendSelect;
    }

    // Bind objects, methods and functions.
    // this.objCategoriesListing = this.objCategoriesListing.bind(this);
    this.build = this.build.bind(this);
    this.headBuild = this.headBuild.bind(this);
    this.titleCurrentBuild = this.titleCurrentBuild.bind(this);

    // Build.
    // (async function () {
    (async () => {
      try {
        // await this.build();
        // this.build();
      } catch (asyncError) {
        if (gSystemConfig.configDebug === true) {
          console.error(asyncError);
        }
      } finally {
        // State creation.
        this.state = {
          // objCategoriesHomeListing: this.objCategoriesHomeListing, // working
          // arrCategoriesHomeListing: this.arrCategoriesHomeListing, // working

          // objPublicationsHomeListing: this.objPublicationsHomeListing, // working
          // arrPublicationsHomeListing: this.arrPublicationsHomeListing, // working

          dataLoaded: false,
        };
      }
    })();

    // Debug.
    // console.log("props=", props);
    // console.log("this.objParametersQueryString(categories listing)=", this.objParametersQueryString);
    // console.log("this.queryDefault=", this.queryDefault);
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
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, qs } = this.context;

    // Logic.
    // ----------------------
    /**/
    try {
      // Main build.
      await this.build();

      // Head content.
      await this.headBuild();

      // Title content.
      await this.titleCurrentBuild();

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
    try {
      // props.setTitleCurrent("", "new current title from child (props.setTitleCurrent)");
      // props.setTitleCurrent.setTitleCurrent("", "new current title from child (props.setTitleCurrent.setTitleCurrent)");
      // this.props.setTitleCurrent("", "new current title from child");
      // this.props.setTitleCurrent.setTitleCurrent("", "new current title from child");
      // this.props.this.setState({ titleCurrent: "new current title from child" });
      // this.props.setState({ titleCurrent: "new current title from child" });
      // props.this.setState({ titleCurrent: "new current title from child" });
      // console.log("this.props=", this.props);
      // console.log("props=", props);
      // console.log("this.props.match.params.idParentCategories=", this.props.match.params.idParentCategories);
      // console.log("this.props.location.query=", this.props.location.query);
      // console.log("this.props=", this.props);
      // console.log("this.props=", this.props.location.search);
      // console.log("this.paramsQueryString=", this.paramsQueryString);
    } catch (componentDidMountError) {
      if (gSystemConfig.configDebug === true) {
        console.log('componentDidMountError=', componentDidMountError);
      }
    }

    // console.log("this.props=", JSON.stringify(this.props));
  }
  // **************************************************************************************

  // Build object´s content.
  // **************************************************************************************
  async build() {
    // Variables.
    // ----------------------
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; // Deconstruct variables (each variable is allocated to it´s correspondent name).

    // let apiURLCategoriesHomeListing = ''; // working
    // let apiCategoriesHomeListingResponse; // working

    // let apiURLPublicationsHomeListing = ''; // working
    // let apiPublicationsListingHomeResponse; // working
    // ----------------------

    // Logic.
    // ----------------------
    /**/
    try {
      // API - build URL string.
      // apiURLCategoriesHomeListing = gSystemConfig.configAPIURL + '/' + gSystemConfig.configRouteAPI + '/' + gSystemConfig.configRouteAPICategories + '/' + this._idParentCategoriesHome + '?apiKey=' + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, 'env'), 2); // working
      // apiURLPublicationsHomeListing = gSystemConfig.configAPIURL + '/' + gSystemConfig.configRouteAPI + '/' + gSystemConfig.configRouteAPIPublications + '/' + this.idParentPublications + '/?strNRecords=' + this.configPublicationsNRecords;

      // // apiURLPublicationsHomeListing = gSystemConfig.configAPIURL + '/' + gSystemConfig.configRouteAPI + '/' + gSystemConfig.configRouteAPIPublications + '/' + this.idParentPublications + '/?strNRecords=' + this.configPublicationsNRecords;
      // apiURLPublicationsHomeListing = gSystemConfig.configAPIURL + '/' + gSystemConfig.configRouteAPI + '/' + gSystemConfig.configRouteAPIPublications + '/' + this._idParentPublicationsHome + '/?strNRecords=';
      /* 
      if (this.activation) {
        apiURLPublicationsHomeListing += '&activation=' + this.activation;
      }
      if (this.activation1) {
        apiURLPublicationsHomeListing += '&activation1=' + this.activation1;
      }
      if (this.activation2) {
        apiURLPublicationsHomeListing += '&activation2=' + this.activation2;
      }
      if (this.activation3) {
        apiURLPublicationsHomeListing += '&activation3=' + this.activation3;
      }
      if (this.activation4) {
        apiURLPublicationsHomeListing += '&activation4=' + this.activation4;
      }
      if (this.activation5) {
        apiURLPublicationsHomeListing += '&activation5=' + this.activation5;
      }
      */
      // apiURLPublicationsHomeListing += "&apiKey=" + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env"), 2);
      // apiURLPublicationsHomeListing += '&apiKey=' + SyncSystemNS.FunctionsCrypto.encryptValue(SyncSystemNS.FunctionsGeneric.contentMaskWrite(gSystemConfig.configAPIKeySystem, 'env'), 2);  // working

      // API - fetch data from backend.
      // apiCategoriesHomeListingResponse = await fetch(apiURLCategoriesHomeListing); // working
      // apiPublicationsListingHomeResponse = await fetch(apiURLPublicationsHomeListing);

      // this.objCategoriesHomeJson = await apiCategoriesHomeListingResponse.json(); // working
      // this.objPublicationsListingHomeJson = await apiPublicationsListingHomeResponse.json();

      // Value definition.
      // this.titleCurrent = this.objCategoriesCurrent.tblCategoriesTitle;
      // this.titleCurrent = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesTitle);
      this.titleCurrent = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, 'frontendHomeTitleMain');
      // console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);

      // idParentCategories = this.props.match.params.idParentCategories;

      // this.metaTitle = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendHomeTitleMain") + " - " + this.titleCurrent; // Bellow 160 characters.
      this.metaTitle = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, 'configSiteTile');
      this.metaTitle += ' - ' + this.titleCurrent; // Bellow 160 characters.

      // this.metaDescription = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesMetaDescription); // Bellow 100 characters.
      this.metaDescription = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, 'configSiteDescription'); // Bellow 100 characters.

      // this.metaKeywords = SyncSystemNS.FunctionsGeneric.removeHTML01(this.objCategoriesCurrent.ocdRecord.tblCategoriesKeywordsTags); // Bellow 60 characters.
      this.metaKeywords = SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, 'configSiteKeywords'); // Bellow 60 characters.

      this.metaURLCurrent = gSystemConfig.configSystemURL + '/';

      // this.objCategoriesHomeListing = this.objCategoriesHomeJson.oclRecords; // working
      // this.arrCategoriesHomeListing = this.objCategoriesHomeJson.oclRecords.resultsCategoriesListing; // working

      // this.objPublicationsHomeListing = this.objPublicationsListingHomeJson.oplRecords; // working
      // this.arrPublicationsHomeListing = this.objPublicationsListingHomeJson.oplRecords.resultsPublicationsListing; // working

      // Debug.
      // console.log("this.objCategoriesCurrent=",this.objCategoriesCurrent);
    } catch (asyncError) {
      if (gSystemConfig.configDebug === true) {
        console.error(asyncError);
      }
    } finally {
      // Update state.
      // this.setState({ objCategoriesHomeListing: this.objCategoriesHomeListing }); // working
      // this.setState({ arrCategoriesHomeListing: this.arrCategoriesHomeListing }); // working

      // objPublicationsHomeListing: this.objPublicationsHomeListing,
      // arrPublicationsHomeListing: this.arrPublicationsHomeListing,

      // Note: Place on the last part of the logic.
      this.setState({ dataLoaded: true });

      // Change state of in context.
      this.context.frontendHomeLoaded = true;
    }
    // ----------------------
  }
  // **************************************************************************************

  // Head build object´s content.
  // **************************************************************************************
  async headBuild() {
    // Variables.
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; // Deconstruct variables (each variable is allocated to it´s correspondent name).

    // Head elements.
    // document.title = this.titleCurrent;
    document.title = this.metaTitle;

    // Meta tags.
    /**/
    document.querySelector('meta[name="title"]').setAttribute('content', this.metaTitle);
    document.querySelector('meta[name="description"]').setAttribute('content', this.metaDescription);
    document.querySelector('meta[name="keywords"]').setAttribute('content', this.metaKeywords);

    document.querySelector('meta[property="og:title"]').setAttribute('content', this.metaTitle);
    document.querySelector('meta[property="og:type"]').setAttribute('content', 'website');
    document.querySelector('meta[property="og:url"]').setAttribute('content', this.metaURLCurrent);
    document.querySelector('meta[property="og:description"]').setAttribute('content', this.metaDescription);

    // if(this.objCategoriesCurrent.ocdRecord.tblCategoriesImageMain != "")
    // {
    // document.querySelector('meta[property="og:image"]').setAttribute("content", gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesSD + "/" + this.objCategoriesCurrent.ocdRecord.tblCategoriesImageMain);
    // }else{
    document.querySelector('meta[property="og:image"]').setAttribute('content', gSystemConfig.configSystemURL + '/' + gSystemConfig.configDirectoryFilesLayoutSD + '/' + 'icon-logo-og.png');
    // }
    // document.querySelector('meta[property="og:image:secure_url"]').setAttribute("content", "Example with image url secure");
    document.querySelector('meta[property="og:image:alt"]').setAttribute('content', this.metaTitle);

    // document.querySelector('meta[property="og:locale"]').setAttribute("content", gSystemConfig.configBackendLanguage);
    document.querySelector('meta[property="og:locale"]').setAttribute('content', SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, 'configFrontendLanguage'));

    // document.querySelector('meta[property="og:title"]').setAttribute("content", "Example with title meta tag");

    // document.getElementsByTagName("meta")["og:title"].content = "Example with title meta tag";
    // document.head.querySelector('meta[name=og:title]').content = 'Example with title meta tag';

    // Debug.
    // console.log("this.objCategoriesListing=",this.objCategoriesListing);
  }
  // **************************************************************************************

  // Head build object´s content.
  // **************************************************************************************
  async titleCurrentBuild() {
    // Variables.
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context; // Deconstruct variables (each variable is allocated to it´s correspondent name).

    // Title Current.
    // elementMessage01("titleCurrent", "Example of current title");
    // FunctionsSyncSystem.elementMessage01("titleCurrent", "Example of current title");
    // elementMessage01("titleCurrent", this.titleCurrent); // working
    // console.log("FunctionsSyncSystem=", FunctionsSyncSystem);
    FunctionsSyncSystem.elementMessage01('titleCurrent', this.titleCurrent);
    FunctionsSyncSystem.elementMessage01('titleCurrentMobile', this.titleCurrent);
  }
  // **************************************************************************************

  // Render.
  // **************************************************************************************
  render() {
    // Variables.
    // ----------------------
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser, SyncSystemRC } = this.context;

    // let objCategoriesHome105; // working
    // let objPublicationsHome236; // working
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

    // Value definition.
    // ----------------------
    /*
    objCategoriesHome105 = this.state.arrCategoriesHomeListing.filter((obj) => {
      return obj.id == '105';
    })[0]; // working
    JSX: {HTMLReactParser(SyncSystemNS.FunctionsGeneric.contentMaskRead(objCategoriesHome105.description, 'db'))}
    
    objPublicationsHosting236 = this.state.arrPublicationsHomeListing.filter((obj) => {
      return obj.id == '236';
    })[0];
    */
    // ----------------------

    // Debug.
    // console.log("this._pagingTotal(inside render)=", this._pagingTotal);
    // console.log('this.state.objCategoriesHomeListing=', this.state.objCategoriesHomeListing);
    // console.log('this.state.arrCategoriesHomeListing=', this.state.arrCategoriesHomeListing);
    // console.log('objCategoriesHome106=', objCategoriesHome106);

    // Output.
    return (
      <React.Fragment>
        <React.Fragment>
          {/*d iv layout (custom). */}
          {this.configLayoutType === 1 ? (
            <React.Fragment>
              <section className="ss-frontend-layout-section-content01">home content</section>
            </React.Fragment>
          ) : (
            ``
          )}

          {/* div layout (bootstrap). */}
          {this.configLayoutType === 11 ? (
            <section className="container">
              <div className="alert alert-success" role="alert" style={{ textAlign: 'center' }}></div>
              bootstrap
            </section>
          ) : (
            ``
          )}

          {/* div layout (responsive). */}
          {this.configLayoutType === 111 ? (
            <React.Fragment>
              {/* Desktop */}
              <div className="d-none d-lg-block d-xl-block">
                {' '}
                {/* Note: If the content is not complex, these parameters can be incorporate to the section tag.*/}
                <section className="ss-frontend-layout-section-content01 ss-frontend-text01">home content desktop</section>
              </div>

              {/* Mobile */}
              <div className="d-lg-none">
                <section class="ss-frontend-mobile-layout-section-content01 ss-frontend-text01">home content mobile</section>
              </div>
            </React.Fragment>
          ) : (
            ``
          )}
        </React.Fragment>

        {/* Categories component. */}
        <FrontendCategories key={117} idParentCategories={'117'} idRegisterUser={''} configLayoutType={1} configCategoriesNRecords={''} configCategoriesSort={gSystemConfig.configCategoriesSort} activation={1} activation1={''} activation2={''} activation3={''} activation4={''} activation5={''}></FrontendCategories>

        {/* Content component.*/}
        <FrontendContent key={106} idParentContent={'106'} idTbContent={''} contentType={''} configLayoutType={2} configContentNRecords={''} configContentSort={''}>
          {/* arrCategoriesListing={ this.arrCategoriesListing } also works */}
        </FrontendContent>

        {/* Products component. */}
        <FrontendProducts key={960} idParentProducts={'960'} idRegisterUser={''} configLayoutType={2} configProductsNRecords={'3'} configProductsSort={gSystemConfig.configProductsSort} activation={1} activation1={''} activation2={''} activation3={''} activation4={''} activation5={''}></FrontendProducts>

        {/* Publications component. */}
        <FrontendPublications key={130} idParentPublications={'130'} idRegisterUser={''} configLayoutType={2} configPublicationsNRecords={''} configPublicationsSort={gSystemConfig.configPublicationsSort} activation={1} activation1={''} activation2={''} activation3={''} activation4={''} activation5={''}></FrontendPublications>
      </React.Fragment>
    );
  }
  // **************************************************************************************
}

export default FrontendHome;
