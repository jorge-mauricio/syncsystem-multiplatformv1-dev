// Import Node Modules.
// ----------------------
// Configuration file.
import gSystemConfig from '../config-application.js';

// Node functions.
const FunctionsGeneric = require('../' + gSystemConfig.configDirectoryComponents + '/functions-generic.js');
const FunctionsCrypto = require('../' + gSystemConfig.configDirectoryComponents + '/functions-crypto.js');

// const gSystemConfig = require("../config-application.js"); // System configuration.
// const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
// import { SyncSystemNSContext } from '../components_react/syncsystem-ns-cb-context.js'; // eslint-disable-line

const SyncSystemNS = { FunctionsGeneric, FunctionsCrypto };

// Context.
// const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = SyncSystemNSContext;
// ----------------------

// Variables.
// ----------------------
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

  <!--link rel="stylesheet" type="text/css" href="/styles-frontend.bundle.css" media="screen" title="Default" /-->
  <link rel="stylesheet" type="text/css" href="/styles-frontend.bundle.css" media="screen and (min-width: 991px)" title="Default" />
  <link rel="stylesheet" type="text/css" href="/styles-frontend-mobile.bundle.css" media="screen and (max-width: 991px)" title="Default" />
  
  ${/* Font Awesome. */ ''}
  <link rel="stylesheet" href="/${gSystemConfig.configDirectoryFontsSD}/fontawesome-free-5.15.4-web/css/all.css" />
`;

// Favicon - 16x16 | 32x32 | 64x64 (pixels).
// Exportação PNG: 558 x 558 pixels.
// https://realfavicongenerator.net/
// Check favicon: https://www.linkedin.com/post-inspector/ (TODO: test.)
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
  <link rel="canonical" href="" />${/* window.location.pathname + window.location.search */ ''}

  <meta name="robots" content="index,follow" />
  <meta name="language" content="english" />

  <meta name="author" content="${SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, 'config-application')}" />
  <meta name="designer" content="${SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configDevName, 'config-application')}" />
  <meta name="copyright" content="${gSystemConfig.configCopyrightYear}, ${SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, 'config-application')}" />
  <meta name="rating" content="general" />${/* general | mature | restricted | 14 years */ ''}
`;

const tagsMetaDynamic1 = `
  <meta name="title" content="" />${/*  Below 60 characters. */ ''}
  <meta name="description" content="" />${/*  Below 160 characters. */ ''}
  <meta name="keywords" content="" />${/*  Below 100 characters. */ ''}

  ${/*  Open Graph tags. */ ''}
  <meta property="og:title" content="" />
  <meta property="og:type" content="website" />${/*  ref: http:// ogp.me/#types | https://developers.facebook.com/docs/reference/opengraph/ */ ''}
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
  <meta property="og:image" content="" />${/*  The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. 120x120px, up to 1MB | JPG ou PNG, below 300k - minimum resolution: 300x200 pixels. */ ''}
      <!--meta property="og:image:secure_url" content="" /-->
  <meta property="og:image:alt" content="" />
  
  <meta property="og:locale" content="en_US" />
`;

const javaScriptHead = `
  ${/*  jQuery. */ ''}
  <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>

  <!--script type="text/javascript" src="functions-syncsystem.js"></script-->
  <!--script type="text/javascript" src="../js/jquery/jquery-3.4.1.min.js"></script-->
  <!--script>
      window.$ = window.jQuery = require('jquery');
      window.Bootstrap = require('bootstrap');
  </script-->


  ${/*  Babel. */ ''}
  <!--script type="text/babel" src="https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.8.23/browser.js"></script-->${/*  No errors. */ ''}
  <!--script type="text/babel" src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.21.1/babel.min.js"></script-->${/*  No errors. */ ''}


  ${/*  GLightbox. */ ''}
  ${/*  type="text/javascript"*/ ''}
  <script type="text/babel" src="/${gSystemConfig.configDirectoryJSSD}/glightbox/dist/js/glightbox.min.js"></script>
  <!--script type="text/babel" src="https://cdn.jsdelivr.net/gh/mcstudios/glightbox/dist/js/glightbox.min.js"></script-->
  
  ${/*  type="text/css"*/ ''}
  <link rel="stylesheet" type="text/html" href="/${gSystemConfig.configDirectoryJSSD}/glightbox/dist/css/glightbox.min.css" media="screen" title="Default" />
  <!--link rel="stylesheet" type="text/html" href="https://cdn.jsdelivr.net/npm/glightbox/dist/css/glightbox.min.css" media="screen" title="Default" /-->
  <script type="text/babel">
      // JGLightbox configuration.
      // let lightbox = GLightbox();
      let gLightboxBackendConfigOptions = {};

      // Backend options
      gLightboxBackendConfigOptions.autoplayVideos = true;
      gLightboxBackendConfigOptions.openEffect = 'fade'; // zoom, fade, none
      gLightboxBackendConfigOptions.slideEffect = 'slide'; // slide, fade, zoom, none
      gLightboxBackendConfigOptions.moreText = '+'; // more text for descriptions on mobile devices
      gLightboxBackendConfigOptions.touchNavigation = true;
      gLightboxBackendConfigOptions.descPosition = 'bottom'; // global position for slides description, you can define a specific position on each slide (bottom, top, left, right)
  </script>
  
  <!--script type="text/babel">
      // JGLightbox configuration.
      // let lightbox = GLightbox();
      const lightbox  = {};

      // Backend options
      lightbox.autoplayVideos = true;
      lightbox.openEffect = 'fade'; // zoom, fade, none
      lightbox.slideEffect = 'slide'; // slide, fade, zoom, none
      lightbox.moreText = '+'; // more text for descriptions on mobile devices
      lightbox.touchNavigation = true;
      lightbox.descPosition = 'bottom'; // global position for slides description, you can define a specific position on each slide (bottom, top, left, right)
  </script-->
`;

const javaScriptFoot = `
  ${/*  Popper. */ ''}
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>

  ${/*  Bootstrap 4. */ ''}
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
// ----------------------

// Export.
export { tagsMetaDefault1, tagsStyleCSS, tagsFavicons, tagsMetaDefault2, tagsMetaDynamic1, javaScriptHead, javaScriptFoot };
