'use strict'; // eslint-disable-line
// TODO: test to check if '' is required in the comments.

// Import Node Modules.
// ----------------------
// import gSystemConfig from "../config-application.js";
// const gSystemConfig = require("../config-application.js"); // System configuration.
// const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
import { SyncSystemNSContext } from '../components_react/syncsystem-ns-cb-context.js'; // eslint-disable-line

// import React from "react";
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import ReactDOMServer from 'react-dom/server';
// import {Helmet} from "react-helmet";
// import Safe from "react-safe";

// import HTMLReactParser from "html-react-parser"; // error / webpack // put in the context
// const Parser = require('html-react-parser');
// import Parser from 'html-react-parser/dist/html-react-parser';
// import ReactRenderHTML from "react-render-html";
// const HtmlToReactParser = require('html-to-react').Parser;
// import HtmlToReactParser from 'html-to-react'.Parser;

// const TrackingCode = require("../tracking-code");
import TrackingCode from '../tracking-code.js';
import { tagsMetaDefault1, tagsStyleCSS, tagsFavicons, tagsMetaDefault2, tagsMetaDynamic1, javaScriptHead, javaScriptFoot } from './layout-frontend-elements.js';

// CSS.
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import StylesFrontend from '../app_styles/styles-frontend.css';
// import StylesFrontend from ("../" + gSystemConfig.configDirectoryStyles + "/styles-frontend.css");

// import StylesFrontend from '/app_styles/styles-frontend.css';
// import "../app_js/functions-syncsystem.js";

// import "babel-polyfill";

// Popper.
// import Popper from "popper.js";
// window.Popper = Popper;
// import "../app_js/popper/popper.min.js";
// import Popper from "../app_js/popper/popper.min.js";

// JQuery.
// import $ from 'jquery';
// import jQuery from 'jquery';
// window.jQuery = jQuery;
// window.$ = jQuery;
// import $ from 'jquery';

// import * as $ from "jquery";
// window.jQuery = window.$ = $;
// global.jQuery = require('jquery');

// Bootstrap.
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../app_styles/styles-frontend-bootstrap.scss";
// import '../node_modules/jquery/dist/jquery.min.js'

// import "bootstrap/dist/js/bootstrap.bundle.min.js";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap";
// require('bootstrap'); // caused error: $.fn.emulateTransitionEnd = function (duration)
// window.Bootstrap = require('bootstrap'); // caused: ReferenceError: window is not defined
// import "bootstrap/dist/js/bootstrap.js";

// Components.
import FrontendBanners from '../components_react/frontend-banners-cb-component.js'; // eslint-disable-line
// ----------------------

class LayoutFrontendMain extends Component {
  // Context.
  static contextType = SyncSystemNSContext;

  // Constructor.
  // **************************************************************************************
  constructor(props, context) {
    super(props, context);

    // State creation.
    this.state = {
      // titleCurrent: "old title"
      titleCurrent: '',
    };

    // Bind with method.
    // this.handleChange = this.handleChange.bind(this);
    this.setTitleCurrent = this.setTitleCurrent.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
  }
  // **************************************************************************************

  // Function to change the state of the title.
  // **************************************************************************************
  /**
   * Function to change the state of the title.
   * @param {string} sProperty
   * @param {string} strMessage
   * @example
   */
  setTitleCurrent(sProperty, strMessage) {
    this.setState({
      // [stateProperty]: strMessage
      // titleCurrent: strMessage
      titleCurrent: strMessage,
    });
  }
  // **************************************************************************************

  // Function to change the state.
  // TODO: transfer to an external file.
  // **************************************************************************************
  /**
   * Function to change the state.
   * @param {string} key
   * @param {string} value
   * @example
   */
  layoutStateHandler(key, value) {
    this.setState({
      [key]: value,
    });
  }
  // **************************************************************************************

  // Function to handle the back to top button.
  // TODO: change function name.
  // **************************************************************************************
  /**
   * Function to change the state.
   * @param {*} e
   * @example
   */
  handleScroll(e) {
    const { FunctionsSyncSystem } = this.context;

    FunctionsSyncSystem.elementShowByPosition('btnTopFixed', 'top', '50');
  }
  // **************************************************************************************

  // Lifecycle methods.

  // Return the new, updated state based upon the props (desincouraged by the react developer team)
  /*
    static getDerivedStateFromProps(props, state)
    {
        // Note: Returns error if returns nothing.

    }
    */

  // Create a backup of the current way things are.
  /*
    getSnapshotBeforeUpdate()
    {
        // Note: Returns error if returns nothing.

    }
    */

  // Teardown or cleanup your code before your component disappears.
  componentWillUnmount() {
    // TODO:
  }

  componentDidMount() {
    // Variables.
    // ----------------------
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser, Safe } = this.context;
    // ----------------------

    // Listeners.
    window.addEventListener('scroll', this.handleScroll);

    // Logic.
    // ----------------------
    /**/
    try {
      // Jump to anchor.
      // ----------------------
      // if (this.props.location.hash !== '#anchorPricing') {
      if (this.props.location.hash !== '') {
        const anchorTarget = this.props.location.hash;

        // Function to wait for the value to change.
        const flagFrontendHomeLoaded = () => {
          if (this.context.frontendHomeLoaded === false) {
            setTimeout(flagFrontendHomeLoaded, 50);
            return;
          }
          FunctionsSyncSystem.scrollToTarget(anchorTarget.replace('#', ''));
          // TODO: modify scrollToTarget to make the replace.
          // console.log('this.state.frontendHomeLoad=', this.state.frontendHomeLoad);
        };

        flagFrontendHomeLoaded();
      }
      // ----------------------
    } catch (asyncError) {
      if (gSystemConfig.configDebug === true) {
        console.error(asyncError);
      }
    } finally {
      // TODO:
      // console.log('React.Children.count=', React.Children.count(this.props.children));
    }
    // ----------------------
  }

  // UNSAFE_componentWillReceiveProps(myNextProps) (deprecated)
  componentWillReceiveProps(myNextProps) {
    /*
    if(myNextProps.whatever != this.props.whaever)
    {
        // do something
    }*/
  }

  // Optmize the app´s resources.
  /*
    shouldComponentUpdate(myNextProps, myNextState)
    {
        // Note: Returns error if returns nothing.

        //  return true if want it to update
        
        //  return false if not want to update 


    }
    */

  // Render.
  // **************************************************************************************
  render() {
    // Variables.
    // ----------------------
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser, Safe } = this.context;
    // let objHtmlToReactParser = new HtmlToReactParser();
    // let hrpTrackingCode = objHtmlToReactParser.parse(TrackingCode);
    // ----------------------

    return (
      /* <html lang="pt-br"> */
      <html lang="en-us">
        <head>
          {HTMLReactParser(TrackingCode)}
          {/* ReactRenderHTML(TrackingCode) */}
          {/* hrpTrackingCode */}

          <meta charSet="UTF-8" />

          {/* ReactRenderHTML(metaTagsDefault1) */}
          {HTMLReactParser(tagsMetaDefault1)}

          <title></title>

          {HTMLReactParser(tagsStyleCSS)}

          {HTMLReactParser(tagsFavicons)}

          {/* head dynamic tags  */}
          {HTMLReactParser(tagsMetaDynamic1)}

          {HTMLReactParser(tagsMetaDefault2)}

          {HTMLReactParser(javaScriptHead)}
        </head>

        <body className={/* StylesFrontend["ss-frontend-body01"]*/ 'ss-frontend-body01'}>
          <noscript>Please Enable JavaScript</noscript>
          <div id="root">
            <header className="ss-frontend-layout-header01">
              <div>
                <a href="/" title="Home" className="ss-frontend-layout-header-logo">
                </a>
                <a href={'tel:' + gSystemConfig.configSystemClientCel.replace(' ', '-')} title="Phone" className="ss-frontend-link-contact01 ss-frontend-link-contact-layout">
                  {gSystemConfig.configSystemClientCel}
                </a>

                {/* Social Media */}
                <address className="ss-frontend-social-media-layout">
                  <a href="https://www.linkedin.com/in/xxx/" target="_blank" title="LinkedIn" className="ss-frontend-social-media">
                    <i className="fab fa-linkedin-in" />
                  </a>
                  <a href="https://youtu.be/xxx" target="_blank" title="YouTube" className="ss-frontend-social-media">
                    <i className="fab fa-youtube" />
                  </a>
                  <a href={'mailto:' + gSystemConfig.configSystemClientEmail} target="_blank" title="e-mail" className="ss-frontend-social-media">
                    <i className="fas fa-envelope" />
                  </a>
                </address>

                {/* Shortcuts */}
                <a
                  onClick={() => {
                    FunctionsSyncSystem.scrollToTarget('anchorFAQ');
                  }}
                  title="Frequently Asked Questions"
                  className="ss-frontend-btn-generic-bg-color01"
                  style={{ '--btnGenericBGColor': '#000000', '--btnGenericBGColorHover': '#ffffff', '--btnGenericColor': '#78c3ae', '--btnGenericColorHover': '#0000ff' }}
                >
                  <span>FAQ</span>
                </a>

                <a
                  {...this.props.location.pathname !== '/' ? 
                      { href: "/#anchorFAQ", }
                    :
                      {}
                  }
                  onClick={() => {
                    // FunctionsSyncSystem.scrollToTarget('anchorFAQ');
                    
                    /*
                    let waitForValueUpdate = (valueCheck, valueReference, _callBackFunction) => {
                      if (valueCheck !== valueReference) {
                        // setTimeout(flagFrontendHomeLoaded, 50);
                        setTimeout(waitForValueUpdate(valueCheck, valueReference, _callBackFunction), 3000);
                        return;
                      }
        
                      _callBackFunction();
                      // Debug.
                      // console.log("this.state.frontendHomeLoad=", this.state.frontendHomeLoad);
                    };
        
                    waitForValueUpdate(this.state.frontendHomeLoad, true, () => {
                      console.log("this.state.frontendHomeLoad=", this.state.frontendHomeLoad);
                    });
                    */ /* caused problem on the online sandbox - test on production and try to make it external function */

                    // Function to wait for the value to change.
                    let flagFrontendHomeLoaded = () => {
                      if (this.context.frontendHomeLoaded === false) {
                        setTimeout(flagFrontendHomeLoaded, 50);
                        return;
                      }
                      FunctionsSyncSystem.scrollToTarget('anchorFAQ');
                      // console.log('this.state.frontendHomeLoad=', this.state.frontendHomeLoad);
                    };

                    flagFrontendHomeLoaded();
                  }}
                  title="Frequently Asked Questions"
                  className="ss-frontend-btn-generic-bg-color01"
                  style={{ '--btnGenericBGColor': '#000000', '--btnGenericBGColorHover': '#ffffff', '--btnGenericColor': '#78c3ae', '--btnGenericColorHover': '#0000ff' }}
                >
                  <span>FAQ</span>
                </a>
              </div>
            </header>

            {/* Desktop. */}
            <div className="d-none d-lg-block d-xl-block">
              <nav>
                <a className="ss-frontend-link01" href={'/'} title={'Home'}>
                  Link - Home
                </a>
                <a className="ss-frontend-link01" href={'/' + gSystemConfig.configRouteFrontendCategories + '/813/'} title={'Categories'}>
                  Link - Categories
                </a>
                <a className="ss-frontend-link01" href={'/' + gSystemConfig.configRouteFrontendContent + '/849/'} title={'Content'}>
                  Link - Content
                </a>
                <a className="ss-frontend-link01" href={'/' + gSystemConfig.configRouteFrontendContent + '/849/?idTbForms=904'} title={'Content'}>
                  Link - Content with form
                </a>
                <a className="ss-frontend-link01" href={'/' + gSystemConfig.configRouteFrontendProducts + '/960/'} title={'Products'}>
                  Link - Products
                </a>
                <a className="ss-frontend-link01" href={'/' + gSystemConfig.configRouteFrontendPublications + '/1369/'} title={'Publications'}>
                  Link - Publications
                </a>
                <a className="ss-frontend-link01" href={'/' + gSystemConfig.configRouteFrontendQuizzes + '/1648/'} title={'Quizzes'}>
                  Link - Quizzes
                </a>
                <a className="ss-frontend-link01" href={'/' + gSystemConfig.configRouteFrontendLogin + '/'} title={'Login'}>
                  Link - Login
                </a>
                <a className="ss-frontend-link01" href={'/' + gSystemConfig.configRouteFrontendLogoff + '/'} title={'Logoff'}>
                  Link - Logoff
                </a>
                <a className="ss-frontend-link01" href={'/' + gSystemConfig.configRouteFrontendDashboard + '/'} title={'Dashboard'}>
                  Link - Dashboard
                </a>
              </nav>
            </div>

            {/* Mobile. */}
            <div className="d-lg-none">
              {/* Menu mobile. */}
              <a
                onclick="elementShowHideToggle('navMenu');"
                onClick={() => {
                  FunctionsSyncSystem.elementShowHideToggle('navMenu');
                }}
                title="Mobile Menu"
                className="ss-frontend-mobile-layout-header-nav-menu d-lg-none"
              >
                <i className="fa fa-bars" />
              </a>
              {/*
              <a
                onClick={() => {
                  FunctionsSyncSystem.htmlGenericStyle01('divMenuMobile01', 'display', 'block');
                }}
                style={{ position: 'relative', display: 'block', padding: '5px', cursor: 'pointer' }}
                title="Menu"
              >
                <img src="/files-layout/frontend-mobile-menu01.png" alt="Menu" />
              </a>
              */}

              <nav id="navMenu" className="ss-frontend-layout-header-nav d-none d-lg-block d-xl-block">
                <a
                  id="navLinkClose"
                  onClick={() => {
                    // FunctionsSyncSystem.htmlGenericStyle01('divMenuMobile01', 'display', 'none');
                    FunctionsSyncSystem.elementShowHideToggle('navMenu');
                  }}
                  className="ss-frontend-mobile-links-layout01 ss-frontend-mobile-links01"
                  style={{ cursor: 'pointer' }}
                  title="Close Menu"
                >
                  X Close
                </a>
                <a id="navLinkHome" href="/" className="ss-frontend-mobile-links-layout01 ss-frontend-mobile-links01" title="Home">
                  Home
                </a>
                <a href={'/' + gSystemConfig.configRouteFrontendContent + '/107/'} className="ss-frontend-mobile-links-layout01 ss-frontend-mobile-links01" title="About Us">
                  About Us
                </a>
                <a href={'/' + gSystemConfig.configRouteFrontendProducts + '/108/'} className="ss-frontend-mobile-links-layout01 ss-frontend-mobile-links01" title="Real Estate Showcase">
                  Real Estate Showcase
                </a>
                <a href={'/' + gSystemConfig.configRouteFrontendContent + '/109/?idTbForms=117'} className="ss-frontend-mobile-links-layout01 ss-frontend-mobile-links01" title="Send Us Your Project">
                  Send Us Your Project
                </a>
                <a href={'/' + gSystemConfig.configRouteFrontendContent + '/111/'} className="ss-frontend-mobile-links-layout01 ss-frontend-mobile-links01" title="Partnerships">
                  Partnerships
                </a>
                <a href={'/' + gSystemConfig.configRouteFrontendContent + '/110/?idTbForms=115'} className="ss-frontend-mobile-links-layout01 ss-frontend-mobile-links01" title="Contact">
                  Contact
                </a>
                <a href={'/' + gSystemConfig.configRouteFrontendContent + '/112/'} className="ss-frontend-mobile-links-layout01 ss-frontend-mobile-links01" title="Privacy and Cookie Policy">
                  Privacy and Cookie Policy
                </a>
              </nav>
            </div>

            {this.props.location.pathname == '/' ? <FrontendBanners idParentBanners={''} idTbCategories={''} configLayoutType={22} configDisplay={'horizontal'} configContentNRecords={''} configContentSort={''}></FrontendBanners> : ``}

            {/* Content place holder - current title */}
            <h1 id="titleCurrent" className="ss-frontend-heading01">
              {this.state.titleCurrent}
              {/* this.props.cphTitle*/ ''}
            </h1>

            {/* Content place holder - current title (mobile */}
            <h1 id="titleCurrentMobile" className="ss-frontend-heading01">
              {this.state.titleCurrent}
              {/* this.props.cphTitle*/ ''}
            </h1>

            {/* Messages */}
            <div id="messageSuccess" className="ss-frontend-success" style={{ display: 'none' }}></div>
            <div id="messageError" className="ss-frontend-error" style={{ display: 'none' }}></div>
            <div id="messageAlert" className="ss-frontend-alert" style={{ display: 'none' }}></div>

            {/* Content place holder - body */}
            <main>{this.props.cphBody}</main>

            <footer className="ss-frontend-layout-footer01">
              <a
                onClick={() => {
                  FunctionsSyncSystem.scrollToTarget('anchorTop');
                }}
                title={SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, 'backendButtonBackTop')}
                className="ss-frontend-btn-top"
              >
              </a>

              <nav>
                <ul className="ss-frontend-links-ul02 d-none d-lg-block d-xl-block" style={{ position: 'absolute', left: '0px', top: '0px' }}>
                  <li className="ss-frontend-links-li02">
                    <a href={'/'} title="Home" className="ss-frontend-footer-links01">
                      Home
                    </a>
                    <a href={'/'} title="Home" className="ss-frontend-footer-links01">
                      Home
                    </a>
                    <a href={'/'} title="Home" className="ss-frontend-footer-links01">
                      Home
                    </a>
                  </li>
                </ul>

                <a href={'tel:' + gSystemConfig.configSystemClientCel} title="Phone" className="ss-frontend-footer-links01 ss-frontend-footer-contact-layout">
                  {gSystemConfig.configSystemClientCel}
                </a>
                <a href={'mailto:' + gSystemConfig.configSystemClientEmail} title="e-mail" className="ss-frontend-footer-links01 ss-frontend-footer-email-layout d-none d-lg-block d-xl-block">
                  {gSystemConfig.configSystemClientEmail}
                </a>
              </nav>

              {/* Social Media */}
              <address className="ss-frontend-social-media-layout-footer">
                <a href="https://www.linkedin.com/in/xxx/" target="_blank" title="LinkedIn" className="ss-frontend-social-media-footer">
                  <i className="fab fa-linkedin-in" />
                </a>
                <a href="https://youtu.be/xxx" target="_blank" title="YouTube" className="ss-frontend-social-media-footer">
                  <i className="fab fa-youtube" />
                </a>
                <a href="https://t.me/username?text=" target="_blank" title="Telegram" className="ss-frontend-social-media-footer">
                  <i className="fab fa-telegram-plane" />
                </a>
                <a href={'mailto:' + gSystemConfig.configSystemClientEmail} target="_blank" title="e-mail" className="ss-frontend-social-media-footer d-lg-none">
                  <i className="fas fa-envelope" />
                </a>
              </address>

              {/* Credits. */}
              <small className="ss-frontend-copyright ss-frontend-credit-layout">
                {SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, 'layoutCopyright')} ©&nbsp;
                {gSystemConfig.configCopyrightYear}&nbsp;
                {SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, 'configSiteTile')}.&nbsp;
                {SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, 'layoutCopyright1')}
                {/* Development. */}
                <a href={gSystemConfig.configDevSite} target="_blank" className="ss-frontend-credit" style={{ float: 'right' }}>
                  {SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, 'layoutDevelopment')}:&nbsp;
                  {SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, 'layoutDevName')}
                </a>
              </small>
            </footer>
          </div>

          {/* Button Scroll to Top (fixed). */}
          <button
            id="btnTopFixed"
            onClick={() => {
              FunctionsSyncSystem.scrollToTarget('anchorTop');
            }}
            className="ss-frontend-shadow01 ss-frontend-btn-top-fixed"
            style={{ visibility: 'hidden' }}
          >
            <i className="fas fa-caret-up" />
          </button>

          {/* React bundle script - SSR. */}
          <Safe.script src="/bundle.react.client.js"></Safe.script>
          <Safe.script>{`try{Typekit.load({ async: true });}catch(e){}`}</Safe.script>

          {HTMLReactParser(javaScriptFoot)}
        </body>
      </html>
    );
  }
  // **************************************************************************************
}

export default LayoutFrontendMain;
// export default withStyles(StylesFrontend)(LayoutFrontendMain);
