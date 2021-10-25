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

class FrontendFilesImagesListingRecord extends Component {
  // Context.
  static contextType = SyncSystemNSContext;

  // Constructor.
  // **************************************************************************************
  constructor(props, context) {
    // Component options.
    // arrFilesListing: (array of objects)
    // configLayoutType:  1 - thumbnails (custom) | 11 - thumbnails (bootstrap) | 42 - slider BxSlider (custom) | 49 - 3D Carousel (CSS / HTML)
    // configFilesZoom: 0 - disabled | 1 - JQuery ElevateZoom | 2 - JQuery PanZoom

    super(props, context);
    /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */

    // Properties.
    // ----------------------
    this.arrFilesListing;
    this.configLayoutType;
    this.configFilesZoom;

    this.itemMainImage;
    this.itemMainImageCaption;
    // ----------------------

    // Define values - props parameters.
    // ----------------------
    this.arrFilesListing = this.props.arrFilesListing;
    this.configLayoutType = this.props.configLayoutType;
    this.configFilesZoom = this.props.configFilesZoom;

    this.itemMainImage = this.props.itemMainImage;
    this.itemMainImageCaption = this.props.itemMainImageCaption;
    // ----------------------

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
  }
  // **************************************************************************************

  // Lifecycle method.
  // **************************************************************************************
  componentDidMount() {
    // Debug.
    // this.setState({ arrCategoriesListing: this.props.arrCategoriesListing });
    // console.log("this.props=", this.props);
  }
  // **************************************************************************************

  // Render.
  // **************************************************************************************
  // async render()
  render() {
    // Variables.
    // ----------------------
    // const { gSystemConfig, FunctionsGeneric, FunctionsCrypto } = this.context;
    const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser, Safe } = this.context;
    let arrFilesListing;
    let configLayoutType;
    let configFilesZoom;

    let itemMainImage;
    let itemMainImageCaption;
    // ----------------------

    // Define values.
    // ----------------------
    arrFilesListing = this.arrFilesListing;
    configLayoutType = this.configLayoutType;
    configFilesZoom = this.configFilesZoom;

    itemMainImage = this.itemMainImage;
    itemMainImageCaption = this.itemMainImageCaption;

    // Debug.
    // console.log('arrFilesListing (frontend files listing recor)=', arrFilesListing);
    // console.log('configLayoutType (frontend files listing recor)=', configLayoutType);
    // console.log('configFilesZoom (frontend files listing recor)=', configFilesZoom);
    // console.log('itemMainImage=', itemMainImage);
    // console.log('itemMainImageCaption=', itemMainImageCaption);
    // ----------------------

    // thumbnails (custom).
    // ----------------------
    if (configLayoutType == 1) {
      if (arrFilesListing.length > 0) {
        // Output.
        return (
          <React.Fragment>
            <div className="ss-frontend-files-listing-container ss-frontend-files-text01">
              {arrFilesListing.map((filesRow, filesRowKey) => {
                return (
                  // Row.
                  <div key={filesRowKey} className="ss-frontend-files-container">
                    <img src={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + '/t' + filesRow.file} alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, 'db')} className="ss-frontend-files-image01" />

                    <div className="ss-frontend-files-caption01">{SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, 'db')}</div>
                    {/*
                    id = { filesRow.id }
                    */}
                  </div>
                );
              })}
            </div>
          </React.Fragment>
        );
      } else {
        // Empty.
        return <React.Fragment></React.Fragment>;
      }
    }
    // ----------------------

    // thumbnails (bootstrap).
    // ----------------------
    if (configLayoutType === 11) {
      if (arrFilesListing.length > 0) {
        // Output.
        return (
          <React.Fragment>
            <div className="container ss-frontend-files-text01">
              <div className="row text-center text-lg-left">
                {arrFilesListing.map((filesRow, filesRowKey) => {
                  return (
                    // Row.
                    <div key={filesRowKey} className="col-lg-3 col-md-4 col-6" style={{ marginBottom: '20px' }}>
                      <a href={''} className="d-block text-center" title={SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, 'db')}>
                        <img src={gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + '/t' + filesRow.file} alt={SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, 'db')} className="img-fluid img-thumbnail" />
                      </a>
                      <div className="ss-frontend-files-caption01">{SyncSystemNS.FunctionsGeneric.contentMaskRead(filesRow.caption, 'db')}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </React.Fragment>
        );
      } else {
        // Empty.
        return <React.Fragment></React.Fragment>;
      }
    }
    // ----------------------

    // 3D Carousel (CSS / HTML).
    // ----------------------
    if (configLayoutType === 49) {
      if (arrFilesListing.length > 0) {
        // NOTE: The html document needs to have a <style> tag.
        // Build the CSS that will be injected in the <stale> tag.
        let files3DCarouselCSSInject = ``;

        arrFilesListing.map((filesRow, filesRowKey) => {
          if (filesRowKey === 0) {
            files3DCarouselCSSInject += `
              .ss-frontend-files-3d-carousel-checkbox${filesRow.id_parent}:nth-of-type(${filesRowKey + 1}):checked {
                --files3DCarouselPosition: ${filesRowKey + 1};
              }
            `;
          } else {
            files3DCarouselCSSInject += `
              .ss-frontend-files-3d-carousel-checkbox${filesRow.id_parent}:nth-of-type(${filesRowKey + 1}):checked ~ .ss-frontend-files-3d-carousel {
                --files3DCarouselPosition: ${filesRowKey + 1};
              }
            `;
          }
        });

        // Item main image.
        // if (itemMainImage != '') {
        if (itemMainImage) {
          files3DCarouselCSSInject += `
            .ss-frontend-files-3d-carousel-checkbox${arrFilesListing[0].id_parent}:nth-of-type(${arrFilesListing.length + 1}):checked ~ .ss-frontend-files-3d-carousel {
              --files3DCarouselPosition: ${arrFilesListing.length + 1};
            }
          `;
        }

        FunctionsSyncSystem.cssStyleInject(files3DCarouselCSSInject);

        // Output.
        return (
          <React.Fragment>
            <div className="ss-frontend-files-listing-container ss-frontend-files-text01">
              {/* Radio buttons. */}
              {arrFilesListing.map((filesRow, filesRowKey) => {
                return (
                  <React.Fragment>
                    {filesRowKey === 0 ? (
                      <React.Fragment>
                        <input type="radio" name="rbFiles3DCarousel" defaultChecked className={'ss-frontend-files-3d-carousel-checkbox' + filesRow.id_parent} style={{ '--configFiles3DCarouselItemPosition': filesRowKey + 1, '--configFiles3DCarouselItemPositionChecked': filesRowKey + 1, display: 'none' }} />
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        <input type="radio" name="rbFiles3DCarousel" className={'ss-frontend-files-3d-carousel-checkbox' + filesRow.id_parent} style={{ '--configFiles3DCarouselItemPosition': filesRowKey + 1, '--configFiles3DCarouselItemPositionChecked': filesRowKey + 1, display: 'none' }} />
                      </React.Fragment>
                    )}
                  </React.Fragment>
                );
              })}

              {/* Item image main. */}
              {
                // itemMainImage != '' ?
                itemMainImage ? 
                <input type="radio" name="rbFiles3DCarousel" className={'ss-frontend-files-3d-carousel-checkbox' + arrFilesListing[0].id_parent} style={{ '--configFiles3DCarouselItemPosition': arrFilesListing.length + 1, '--configFiles3DCarouselItemPositionChecked': arrFilesListing.length + 1, display: 'none' }} />
              : ``}

              {/* Images. */}
              <div id="files3DCarousel" className="ss-frontend-files-3d-carousel" style={{ '--configFiles3DCarouselItemsTotal': arrFilesListing.length + (itemMainImage ? 1 : 0) }}>
                <React.Fragment>
                  {/* Item image main. */}
                  {
                    // itemMainImage != '' ? 
                    itemMainImage ? 
                      <a className={'glightbox_files_image_main' + arrFilesListing[0].id_parent + ' ss-frontend-files-3d-carousel-item'} style={{ '--configFiles3DCarouselItemPosition': 1, '--files3DCarouselOffset': 1, backgroundImage: 'url(' + gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + '/' + itemMainImage + ')', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }}>
                          {/* Caption or image count. */}
                      </a>
                  : ``}

                  {arrFilesListing.map((filesRow, filesRowKey) => {
                    return (
                      <a className={'glightbox_files_image_main' + filesRow.id + ' ss-frontend-files-3d-carousel-item'} style={{ '--configFiles3DCarouselItemPosition': filesRowKey + 1 + (itemMainImage ? 1 : 0), '--files3DCarouselOffset': filesRowKey + 1 + (itemMainImage ? 1 : 0), backgroundImage: 'url(' + gSystemConfig.configFrontendReactURLImages + gSystemConfig.configDirectoryFilesSD + '/' + filesRow.file + ')', backgroundRepeat: 'no-repeat', backgroundPosition: 'center center', backgroundSize: 'cover' }}>
                          {/* Caption or image count. */}
                      </a>
                    );
                  })}
                </React.Fragment>
              </div>
            </div>

            <div className="mt-3" style={{ textAlign: 'center' }}>
              <a
                onClick={() => {
                  FunctionsSyncSystem.radiobuttonCheck01('ss-frontend-files-3d-carousel-checkbox' + arrFilesListing[0].id_parent, 'prev', '');
                }}
                title="Previous"
                className="ss-frontend-btn-generic-bg01 ss-frontend-btn-previous"
                style={{ marginRight: '20px' }}
              >
              </a>
              <a
                onClick={() => {
                  FunctionsSyncSystem.radiobuttonCheck01('ss-frontend-files-3d-carousel-checkbox' + arrFilesListing[0].id_parent, 'next', '');
                }}
                title="Next"
                className="ss-frontend-btn-generic-bg01 ss-frontend-btn-next"
              >
              </a>
            </div>
          </React.Fragment>
        );
      } else {
        // Empty.
        return <React.Fragment></React.Fragment>;
      }
    }
    // ----------------------
  }
  // **************************************************************************************
}

export default FrontendFilesImagesListingRecord;
