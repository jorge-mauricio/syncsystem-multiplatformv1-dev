'use strict';

// Import Node Modules.
// ----------------------
// import gSystemConfig from "../config-application.js";
// const gSystemConfig = require("../config-application.js"); // System configuration.
// const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
import { SyncSystemNSContext } from '../components_react/syncsystem-ns-cb-context.js'; // eslint-disable-line

// import React from "react";
import React, { Component } from 'react'; // eslint-disable-line
import ReactDOM from 'react-dom'; // eslint-disable-line
// import ReactDOMServer from 'react-dom/server';
// import {Helmet} from "react-helmet";
import Safe from 'react-safe'; // eslint-disable-line

import HTMLReactParser from 'html-react-parser'; // error / webpack
// const Parser = require('html-react-parser');
// import Parser from 'html-react-parser/dist/html-react-parser';
// import ReactRenderHTML from "react-render-html";
// const HtmlToReactParser = require('html-to-react').Parser;
// import HtmlToReactParser from 'html-to-react'.Parser;

// const TrackingCode = require("../tracking-code");
import TrackingCode from '../tracking-code.js'; // eslint-disable-line
import { tagsMetaDefault1, tagsStyleCSS, tagsFavicons, tagsMetaDefault2, tagsMetaDynamic1, javaScriptHead, javaScriptFoot } from './layout-frontend-elements.js';

// CSS.
// import withStyles from 'isomorphic-style-loader/lib/withStyles';
import StylesFrontend from '../app_styles/styles-frontend.css'; // eslint-disable-line
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

  /**/
  // changeState(stateProperty, strMessage)
  // changeState(e)
  changeState() {
    this.setState({
      // [stateProperty]: strMessage
      // titleCurrent: strMessage
      titleCurrent: 'new current title',
    });
    // this.state[stateProperty] = strMessage;
  }

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
    if(myNextProps.whatever != this.props.whaever) {
        // do something
    }
    */
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

  // Teardown or cleanup your code before your component disappears.
  componentWillUnmount() {
    // TODO:
  }

  // Personal method - change state.
  handleChange(id) {
    // Find the id and change the value of completed.
    /*
        this.setState(myPrevState =>{
            // Create new object based on the old state with the changed value.
            const updatedTodos = myPrevState.map(sTodosData =>{
                if(sTodosData.id === id)
                {
                    sTodosData.completed = !sTodosData.completed;
                }

                return sTodosData;
            });

            // Set the old state to the updated state that was created above.
            return{
                sTodosData: updatedTodos
            }
        });
        */
    // Debug.
    // console.log("worked - id=" + id);
  }

  setData = () => {
    // TODO:
  };

  // Render.
  // **************************************************************************************
  render() {
    // Variables.
    // ----------------------
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;
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

        <body className={/* StylesFrontend["ss-frontend-body01"]*/ 'ss-frontend-body-iframe01'}>
          <div id="root">
            {/* Content place holder - current title */}
            <h1 id="titleCurrent">
              {this.state.titleCurrent}
              {/* this.props.cphTitle*/ ''}
            </h1>
            Layout Iframe (Debug Elements)
            {/* Content place holder - body */}
            <main>{this.props.cphBody}</main>
            {/* tlScriptBundleReactClient */}
            {/* <Helmet>
                            <script src="/bundle.react.client.js"></script>
                            <script>{
                        `try{Typekit.load({ async: true });}catch(e){}`
                        }</script>
                        </Helmet> */}
          </div>

          <Safe.script src="/bundle.react.client.js"></Safe.script>
          <Safe.script>{`try{Typekit.load({ async: true });}catch(e){}`}</Safe.script>

          {HTMLReactParser(javaScriptFoot)}
        </body>
      </html>
    );
  }
  // **************************************************************************************
}

export default LayoutFrontendMain; // eslint-disable-line
// export default withStyles(StylesFrontend)(LayoutFrontendMain);
