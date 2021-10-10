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
  }
  // **************************************************************************************

  setTitleCurrent(sProperty, strMessage) {
    this.setState({
      // [stateProperty]: strMessage
      // titleCurrent: strMessage
      titleCurrent: strMessage,
    });
  }

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
    // Title - current.
    // this.setTitleCurrent("", "new current title function"); // working
    // Tracking code(s).
    /*
        var frTrackingCode = new FileReader();
        frTrackingCode.readAsText("/tracking-code.txt");
        frTrackingCode.onload = () =>{
            console.log(frTrackingCode.result);
        };
        */
    /*
        // var trackingCode = fetch('/tracking-code.txt')
        fetch('../tracking-code.txt')
        // fetch('/tracking-code.txt')
        .then((r) => r.text())
        .then((text) => {
          console.log(text);
        });
        */
    /*
        const script = document.createElement("script");
        script.src = "/bundle.react.client.js";
        script.async = true;
        document.body.appendChild(script);
        // this.body.appendChild(script);
        */
    /*
        const s = document.createElement('script');
        // s.type = 'text/javascript';
        s.src = "/bundle.react.client.js";
        s.async = true;
        // s.innerHTML = "document.write('This is output by document.write()!')";
        this.instance.appendChild(s);
        */
    // GET the data I need to correctly display
    // Debug.
    // console.log("TrackingCode=", TrackingCode);
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
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser, Safe } = this.context;
    // var objHtmlToReactParser = new HtmlToReactParser();
    // var hrpTrackingCode = objHtmlToReactParser.parse(TrackingCode);

    const tagsMetaDefault1 = `
      <meta http-equiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="format-detection" content="telephone=no" />
    `;
    // const tlScriptBundleReactClient = `<script src="/bundle.react.client.js"></script>`;

    const tagsStyleCSS = `
      ${/* Bootstrap 4 CSS. */ ''}
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
      <!--link rel="stylesheet" type="text/css" href="../app_js/bootstrap/bootstrap-3.3.6-dist/css/bootstrap.min.css" media="screen" title="Default" /-->
      
      ${/* Custom CSS. */ ''}
      <link rel="stylesheet" type="text/css" href="/styles-frontend.bundle.css" media="screen" title="Default" />${/* Single css file. */ ''}
      ${/* Multiple css files (according to resolution). */ ''}
      <!--link rel="stylesheet" type="text/css" href="/styles-frontend.bundle.css" media="screen and (min-width: 991px)" title="Default" />
      <link rel="stylesheet" type="text/css" href="/styles-frontend-mobile.bundle.css" media="screen and (max-width: 991px)" title="Default" /-->
      
      ${/* Font Awesome. */ ''}
      <link rel="stylesheet" href="/${gSystemConfig.configDirectoryFontsSD}/fontawesome-free-5.15.4-web/css/all.css" />
    `;

    // Favicon - 16x16 | 32x32 | 64x64 (pixels).
    // Exportação PNG: 558 x 558 pixels.
    // https://realfavicongenerator.net/
    const tagsFavicons = `
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
      <meta name="msapplication-TileColor" content="#009154" />
      <meta name="theme-color" content="#ffffff" />
    `;

    // TODO: update iframe template.
    const tagsMetaDefault2 = `
      <meta name="robots" content="index,follow" />
      <meta name="language" content="english" />

      <meta name="author" content="${SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, 'config-application')}" />
      <meta name="designer" content="${SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configDevName, 'config-application')}" />
      <meta name="copyright" content="${gSystemConfig.configCopyrightYear}, ${SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, 'config-application')}" />
      <meta name="rating" content="general" /><?php // general | mature | restricted | 14 years?>
    `;

    const tagsMetaDynamic1 = `
      <meta name="title" content="" />${/* Below 60 characters. */ ''}
      <meta name="description" content="" />${/* Below 160 characters. */ ''}
      <meta name="keywords" content="" />${/* Below 100 characters. */ ''}

      ${/* Open Graph tags. */ ''}
      <meta property="og:title" content="" />
      <meta property="og:type" content="website" />${/* ref: http:// ogp.me/#types | https://developers.facebook.com/docs/reference/opengraph/ */ ''}
      <meta property="og:url" content="" />
      <meta property="og:description" content="" />
      
      ${
        /* 
        Dimensions:
        ref: https://iamturns.com/open-graph-image-size/
        Horizontal: 
            - home (1.9:1): 1200 x 630 pixels
            - products, articles, etc (2:1): 1200 x 600 | 300 x 157 (min) | 4096 x 4096 (max)
        Square:
            - home (1:1): 1200 x 1200 pixels
            - products, articles, etc (1:1): 600 x 600 | 144 x 144 (min) | 4096 x 4096 (max)
        */ ''
      }
      <meta property="og:image" content="" />${/* The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. 120x120px, up to 1MB | JPG ou PNG, below 300k - minimum resolution: 300x200 pixels. */ ''}
          <!--meta property="og:image:secure_url" content="" /-->
      <meta property="og:image:alt" content="" />
      
      <meta property="og:locale" content="en_US" />
    `;

    const javaScriptHead = `
      ${/* jQuery. */ ''}
      <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>

      <!--script type="text/javascript" src="functions-syncsystem.js"></script-->
      <!--script type="text/javascript" src="../js/jquery/jquery-3.4.1.min.js"></script-->
      <!--script>
          window.$ = window.jQuery = require('jquery');
          window.Bootstrap = require('bootstrap');
      </script-->


      ${/* Babel. */ ''}
      <!--script type="text/babel" src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.js"></script-->${/* No errors. */ ''}
      <!--script type="text/babel" src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.21.1/babel.min.js"></script-->${/* No errors. */ ''}


      ${/* GLightbox. */ ''}
      ${/* type="text/javascript"*/ ''}
      <script type="text/babel" src="/${gSystemConfig.configDirectoryJSSD}/glightbox/dist/js/glightbox.min.js"></script>
      ${/* type="text/css"*/ ''}
      <link rel="stylesheet" type="text/html" href="/${gSystemConfig.configDirectoryJSSD}/glightbox/dist/css/glightbox.min.css" media="screen" title="Default" />
      <script type="text/babel">
          // JGLightbox configuration.
          // var lightbox = GLightbox();
          var gLightboxBackendConfigOptions = {};

          // Backend options
          gLightboxBackendConfigOptions.autoplayVideos = true;
          gLightboxBackendConfigOptions.openEffect = "fade"; // zoom, fade, none
          gLightboxBackendConfigOptions.slideEffect = "slide"; // slide, fade, zoom, none
          gLightboxBackendConfigOptions.moreText = "+"; // more text for descriptions on mobile devices
          gLightboxBackendConfigOptions.touchNavigation = true;
          gLightboxBackendConfigOptions.descPosition = "bottom"; // global position for slides description, you can define a specific position on each slide (bottom, top, left, right)
      </script>
    `;

    const javaScriptFoot = `
      ${/* Popper. */ ''}
      <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

      ${/* Bootstrap 4. */ ''}
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    `;

    // TodoData Map Component.
    // Note: Passing methods only works whith arrow functions because of the "this" reference - ref: https://stackoverflow.com/questions/56374615/uncaught-typeerror-cannot-read-property-class-function-of-undefined-in-reactj
    /** 
        const mcTestTodoItem = this.state.sTodosData.map(function(itemLine){
            return(
                <TestTodoItem 
                    key={itemLine.id} 
                    text={itemLine.text} 
                    completed={itemLine.completed} 
                    handleChange={this.handleChange}
                />
            );
        })
        */
    /*
    const mcTestTodoItem = this.state.sTodosData.map((itemLine)=>
            {
                return(
                    <TestTodoItem 
                        key={itemLine.id} 
                        id={itemLine.id} 
                        text={itemLine.text} 
                        completed={itemLine.completed} 
                        cmHandleChange={this.handleChange}
                    />
                );
            }
        )   */

    return (
      /*<html lang="pt-br">*/
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
