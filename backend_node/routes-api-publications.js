'use strict';

// Import Node Modules.
// ----------------------
const express = require('express');
const router = express.Router();

const gSystemConfig = require('../config-application.js'); // System configuration.
const SyncSystemNS = require('../' + gSystemConfig.configDirectoryComponents + '/syncsystem-ns.js');

const FunctionsGeneric = require('../' + gSystemConfig.configDirectoryComponents + '/functions-generic.js');
const FunctionsDB = require('../' + gSystemConfig.configDirectoryComponents + '/functions-db.js');
const FunctionsCrypto = require('../' + gSystemConfig.configDirectoryComponents + '/functions-crypto.js');
const ObjectFiltersGenericListing = require('../' + gSystemConfig.configDirectoryComponents + '/object-filters-generic-listing.js');
// const formidable = require("formidable"); // Form file upload.
// ----------------------

// API - Publications - listing - GET.
// **************************************************************************************
// Debug: http:// localhost:3000/api/publications/1369/?apiKey=createSecretPassword
router.get('/' + gSystemConfig.configRouteAPI + '/' + gSystemConfig.configRouteAPIPublications + '/:idParentPublications?', (req, res) => {
  // working, with the async block
  // Variables.
  // ----------------------
  let objReturn = { returnStatus: false }; // eslint-disable-line
  let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, 'env'); // eslint-disable-line

  // let ocdRecord;
  // let ocdRecordParameters;

  let oplRecords;
  let oplRecordsParameters;

  let arrSearchParameters = []; // eslint-disable-line
  let objSpecialParameters;

  let activation;
  let activation1;
  let activation2;
  let activation3;
  let activation4;
  let activation5;

  let ofglRecords;

  let arrIdsPublicationsFiltersGeneric1 = [];
  let arrIdsPublicationsFiltersGeneric2 = [];
  let arrIdsPublicationsFiltersGeneric3 = [];
  let arrIdsPublicationsFiltersGeneric4 = [];
  let arrIdsPublicationsFiltersGeneric5 = [];
  let arrIdsPublicationsFiltersGeneric6 = [];
  let arrIdsPublicationsFiltersGeneric7 = [];
  let arrIdsPublicationsFiltersGeneric8 = [];
  let arrIdsPublicationsFiltersGeneric9 = [];
  let arrIdsPublicationsFiltersGeneric10 = [];

  let objIdsPublicationsFiltersGenericBinding;

  // let cdBackend;
  let idParentPublications = '';
  let pageNumber = '';
  let pagingNRecords = ''; // eslint-disable-line
  // eslint-disable-next-line
  let terminal = 0; // get from query
  // let masterPageSelect = "layout-backend-main";

  // let messageSuccess = "";
  // let messageError = "";
  // let messageAlert = "";
  // let nRecords = "";

  let apiKey = '';
  // ----------------------

  // Value definition.
  // ----------------------
  if (req.params.idParentPublications) {
    idParentPublications = req.params.idParentPublications;
  }

  if (req.query.activation) {
    activation = req.query.activation;
  }
  if (req.query.activation1) {
    activation1 = req.query.activation1;
  }
  if (req.query.activation2) {
    activation2 = req.query.activation2;
  }
  if (req.query.activation3) {
    activation3 = req.query.activation3;
  }
  if (req.query.activation4) {
    activation4 = req.query.activation4;
  }
  if (req.query.activation5) {
    activation5 = req.query.activation5;
  }

  if (req.query.pageNumber) {
    pageNumber = req.query.pageNumber;
  }
  if (req.query.pagingNRecords) {
    pageNumber = req.query.pagingNRecords;
  }

  if (req.query.apiKey) {
    apiKey = req.query.apiKey;
  }

  // Debug.
  // console.log("idParentPublications=", idParentPublications);
  // ----------------------

  // Logic.
  // ----------------------
  // (async function () {
  (async () => {
    // async marks the block
    try {
      if (idParentPublications != '') {
        // if(configAPIKey == apiKey)
        if (configAPIKey === SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, 'env'), 2)) {
          // Check if it´s an ID (number).
          if (isNaN(idParentPublications)) {
            // Search for friendly name.
            // eslint-disable-next-line
            let resultURLAlias = await SyncSystemNS.FunctionsDB.genericTableGet02(
              gSystemConfig.configSystemDBTableCategories, 
              ['url_alias;' + idParentPublications + ';s', 'activation;1;i'], 
              gSystemConfig.configCategoriesSort, 
              '', 
              'id, id_parent', 
              1, 
              { returnType: 3 }
            ); // debug: asdfa / 308

            if (resultURLAlias) {
              idParentPublications = resultURLAlias[0]['id'];
            } else {
              idParentPublications = -1;
            }

            // Debug.
            // console.log("number=false");
            // console.log("resultURLAlias=", resultURLAlias);
          } else {
            // Debug.
            // console.log("number=true");
          }

          // Parameters build.
          objSpecialParameters = { returnType: 3 };
          if (pageNumber != '') {
            objSpecialParameters.pageNumber = pageNumber;
          }
          if (pagingNRecords != '') {
            objSpecialParameters.pagingNRecords = pagingNRecords;
          }

          // Parameters build - listing.
          arrSearchParameters.push('id_parent;' + idParentPublications + ';s');
          if (activation) {
            arrSearchParameters.push('activation;' + activation + ';i');
          }

          if (activation1) {
            arrSearchParameters.push('activation1;' + activation1 + ';i');
          }
          if (activation2) {
            arrSearchParameters.push('activation2;' + activation2 + ';i');
          }
          if (activation3) {
            arrSearchParameters.push('activation3;' + activation3 + ';i');
          }
          if (activation4) {
            arrSearchParameters.push('activation4;' + activation4 + ';i');
          }
          if (activation5) {
            arrSearchParameters.push('activation5;' + activation5 + ';i');
          }

          oplRecordsParameters = {
            // _arrSearchParameters: ['id_parent;' + idParentPublications + ';i'],
            _arrSearchParameters: arrSearchParameters,
            _configSortOrder: gSystemConfig.configPublicationsSort,
            _strNRecords: '',
            _objSpecialParameters: objSpecialParameters,
          };
          // Revision {returnType: 3} = objSpecialParameters

          // Build object - listing.
          oplRecords = new SyncSystemNS.ObjectPublicationsListing(oplRecordsParameters);
          await oplRecords.recordsListingGet(0, 3);
          // Debug.
          // console.log('oplRecords=', oplRecords);

          // Filters generic.
          ofglRecords = new ObjectFiltersGenericListing({
            _arrSearchParameters: [],
            _configSortOrder: 'title',
            _strNRecords: '',
            _objSpecialParameters: { returnType: 3 },
          });
          await ofglRecords.recordsListingGet(0, 3);

          // Add generic filters.
          for (let countArray = 0; countArray < oplRecords.resultsPublicationsListing.length; countArray++) {
            let objIdsPublicationsFiltersGeneric1Binding;
            let objIdsPublicationsFiltersGeneric2Binding;
            let objIdsPublicationsFiltersGeneric3Binding;
            let objIdsPublicationsFiltersGeneric4Binding;
            let objIdsPublicationsFiltersGeneric5Binding;
            let objIdsPublicationsFiltersGeneric6Binding;
            let objIdsPublicationsFiltersGeneric7Binding;
            let objIdsPublicationsFiltersGeneric8Binding;
            let objIdsPublicationsFiltersGeneric9Binding;
            let objIdsPublicationsFiltersGeneric10Binding;

            let objPublicationsFiltersGeneric1Binding_print;
            let objPublicationsFiltersGeneric2Binding_print;
            let objPublicationsFiltersGeneric3Binding_print;
            let objPublicationsFiltersGeneric4Binding_print;
            let objPublicationsFiltersGeneric5Binding_print;
            let objPublicationsFiltersGeneric6Binding_print;
            let objPublicationsFiltersGeneric7Binding_print;
            let objPublicationsFiltersGeneric8Binding_print;
            let objPublicationsFiltersGeneric9Binding_print;
            let objPublicationsFiltersGeneric10Binding_print;

            let arrIdsPublicationsFiltersGeneric1Binding = [];
            let arrIdsPublicationsFiltersGeneric2Binding = [];
            let arrIdsPublicationsFiltersGeneric3Binding = [];
            let arrIdsPublicationsFiltersGeneric4Binding = [];
            let arrIdsPublicationsFiltersGeneric5Binding = [];
            let arrIdsPublicationsFiltersGeneric6Binding = [];
            let arrIdsPublicationsFiltersGeneric7Binding = [];
            let arrIdsPublicationsFiltersGeneric8Binding = [];
            let arrIdsPublicationsFiltersGeneric9Binding = [];
            let arrIdsPublicationsFiltersGeneric10Binding = [];

            // Filters generic bindings.
            objIdsPublicationsFiltersGenericBinding = await FunctionsDB.genericTableGet02(
              gSystemConfig.configSystemDBTableFiltersGenericBinding, 
              ['id_record;' + oplRecords.resultsPublicationsListing[countArray].id + ';i'], 
              '', 
              '', 
              FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiltersGenericBinding, 'all', 'string'), 
              1, 
              { returnType: 3 }
            );

            // Filters generic - separation.
            if (gSystemConfig.enablePublicationsFilterGeneric1 !== 0) {
              objIdsPublicationsFiltersGeneric1Binding = objIdsPublicationsFiltersGenericBinding.filter((obj) => {
                return obj.id_filter_index == 101;
              });

              if (objIdsPublicationsFiltersGeneric1Binding) {
                arrIdsPublicationsFiltersGeneric1Binding = Object.keys(objIdsPublicationsFiltersGeneric1Binding).map((key) => objIdsPublicationsFiltersGeneric1Binding[key]['id_filters_generic']);

                if (arrIdsPublicationsFiltersGeneric1Binding) {
                  // let arrIdsPublicationsFiltersGeneric1Binding = arrIdsPublicationsFiltersGeneric1Binding;
                  objPublicationsFiltersGeneric1Binding_print = ofglRecords.resultsFiltersGenericListing.filter((obj) => {
                    return arrIdsPublicationsFiltersGeneric1Binding.includes(obj.id);
                  });
                }
              }
            }

            if (gSystemConfig.enablePublicationsFilterGeneric2 !== 0) {
              this.objIdsPublicationsFiltersGeneric2Binding = this.objIdsPublicationsFiltersGenericBinding.filter((obj) => {
                return obj.id_filter_index == 102;
              });

              if (this.objIdsPublicationsFiltersGeneric2Binding) {
                this.arrIdsPublicationsFiltersGeneric2Binding = Object.keys(this.objIdsPublicationsFiltersGeneric2Binding).map((key) => this.objIdsPublicationsFiltersGeneric2Binding[key]['id_filters_generic']);

                if (this.arrIdsPublicationsFiltersGeneric2Binding) {
                  // let arrIdsPublicationsFiltersGeneric2Binding = this.arrIdsPublicationsFiltersGeneric2Binding;

                  this.objPublicationsFiltersGeneric2Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter((obj) => {
                    return arrIdsPublicationsFiltersGeneric2Binding.includes(obj.id);
                  });
                }
              }
            }

            if (gSystemConfig.enablePublicationsFilterGeneric3 !== 0) {
              this.objIdsPublicationsFiltersGeneric3Binding = this.objIdsPublicationsFiltersGenericBinding.filter((obj) => {
                return obj.id_filter_index == 103;
              });

              if (this.objIdsPublicationsFiltersGeneric3Binding) {
                this.arrIdsPublicationsFiltersGeneric3Binding = Object.keys(this.objIdsPublicationsFiltersGeneric3Binding).map((key) => this.objIdsPublicationsFiltersGeneric3Binding[key]['id_filters_generic']);

                if (this.arrIdsPublicationsFiltersGeneric3Binding) {
                  // let arrIdsPublicationsFiltersGeneric3Binding = this.arrIdsPublicationsFiltersGeneric3Binding;

                  this.objPublicationsFiltersGeneric3Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter((obj) => {
                    return arrIdsPublicationsFiltersGeneric3Binding.includes(obj.id);
                  });
                }
              }
            }

            if (gSystemConfig.enablePublicationsFilterGeneric4 !== 0) {
              this.objIdsPublicationsFiltersGeneric4Binding = this.objIdsPublicationsFiltersGenericBinding.filter((obj) => {
                return obj.id_filter_index == 104;
              });

              if (this.objIdsPublicationsFiltersGeneric4Binding) {
                this.arrIdsPublicationsFiltersGeneric4Binding = Object.keys(this.objIdsPublicationsFiltersGeneric4Binding).map((key) => this.objIdsPublicationsFiltersGeneric4Binding[key]['id_filters_generic']);

                if (this.arrIdsPublicationsFiltersGeneric4Binding) {
                  // let arrIdsPublicationsFiltersGeneric4Binding = this.arrIdsPublicationsFiltersGeneric4Binding;

                  this.objPublicationsFiltersGeneric4Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter((obj) => {
                    return arrIdsPublicationsFiltersGeneric4Binding.includes(obj.id);
                  });
                }
              }
            }

            if (gSystemConfig.enablePublicationsFilterGeneric5 !== 0) {
              this.objIdsPublicationsFiltersGeneric5Binding = this.objIdsPublicationsFiltersGenericBinding.filter((obj) => {
                return obj.id_filter_index == 105;
              });

              if (this.objIdsPublicationsFiltersGeneric5Binding) {
                this.arrIdsPublicationsFiltersGeneric5Binding = Object.keys(this.objIdsPublicationsFiltersGeneric5Binding).map((key) => this.objIdsPublicationsFiltersGeneric5Binding[key]['id_filters_generic']);

                if (this.arrIdsPublicationsFiltersGeneric5Binding) {
                  // let arrIdsPublicationsFiltersGeneric5Binding = this.arrIdsPublicationsFiltersGeneric5Binding;

                  this.objPublicationsFiltersGeneric5Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter((obj) => {
                    return arrIdsPublicationsFiltersGeneric5Binding.includes(obj.id);
                  });
                }
              }
            }

            if (gSystemConfig.enablePublicationsFilterGeneric6 !== 0) {
              this.objIdsPublicationsFiltersGeneric6Binding = this.objIdsPublicationsFiltersGenericBinding.filter((obj) => {
                return obj.id_filter_index == 106;
              });

              if (this.objIdsPublicationsFiltersGeneric6Binding) {
                this.arrIdsPublicationsFiltersGeneric6Binding = Object.keys(this.objIdsPublicationsFiltersGeneric6Binding).map((key) => this.objIdsPublicationsFiltersGeneric6Binding[key]['id_filters_generic']);

                if (this.arrIdsPublicationsFiltersGeneric6Binding) {
                  // let arrIdsPublicationsFiltersGeneric6Binding = this.arrIdsPublicationsFiltersGeneric6Binding;

                  this.objPublicationsFiltersGeneric6Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter((obj) => {
                    return arrIdsPublicationsFiltersGeneric6Binding.includes(obj.id);
                  });
                }
              }
            }

            if (gSystemConfig.enablePublicationsFilterGeneric7 !== 0) {
              this.objIdsPublicationsFiltersGeneric7Binding = this.objIdsPublicationsFiltersGenericBinding.filter((obj) => {
                return obj.id_filter_index == 107;
              });

              if (this.objIdsPublicationsFiltersGeneric7Binding) {
                this.arrIdsPublicationsFiltersGeneric7Binding = Object.keys(this.objIdsPublicationsFiltersGeneric7Binding).map((key) => this.objIdsPublicationsFiltersGeneric7Binding[key]['id_filters_generic']);

                if (this.arrIdsPublicationsFiltersGeneric7Binding) {
                  // let arrIdsPublicationsFiltersGeneric7Binding = this.arrIdsPublicationsFiltersGeneric7Binding;

                  this.objPublicationsFiltersGeneric7Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter((obj) => {
                    return arrIdsPublicationsFiltersGeneric7Binding.includes(obj.id);
                  });
                }
              }
            }

            if (gSystemConfig.enablePublicationsFilterGeneric8 !== 0) {
              this.objIdsPublicationsFiltersGeneric8Binding = this.objIdsPublicationsFiltersGenericBinding.filter((obj) => {
                return obj.id_filter_index == 108;
              });

              if (this.objIdsPublicationsFiltersGeneric8Binding) {
                this.arrIdsPublicationsFiltersGeneric8Binding = Object.keys(this.objIdsPublicationsFiltersGeneric8Binding).map((key) => this.objIdsPublicationsFiltersGeneric8Binding[key]['id_filters_generic']);

                if (this.arrIdsPublicationsFiltersGeneric8Binding) {
                  // let arrIdsPublicationsFiltersGeneric8Binding = this.arrIdsPublicationsFiltersGeneric8Binding;

                  this.objPublicationsFiltersGeneric8Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter((obj) => {
                    return arrIdsPublicationsFiltersGeneric8Binding.includes(obj.id);
                  });
                }
              }
            }

            if (gSystemConfig.enablePublicationsFilterGeneric9 !== 0) {
              this.objIdsPublicationsFiltersGeneric9Binding = this.objIdsPublicationsFiltersGenericBinding.filter((obj) => {
                return obj.id_filter_index == 109;
              });

              if (this.objIdsPublicationsFiltersGeneric9Binding) {
                this.arrIdsPublicationsFiltersGeneric9Binding = Object.keys(this.objIdsPublicationsFiltersGeneric9Binding).map((key) => this.objIdsPublicationsFiltersGeneric9Binding[key]['id_filters_generic']);

                if (this.arrIdsPublicationsFiltersGeneric9Binding) {
                  // let arrIdsPublicationsFiltersGeneric9Binding = this.arrIdsPublicationsFiltersGeneric9Binding;

                  this.objPublicationsFiltersGeneric9Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter((obj) => {
                    return arrIdsPublicationsFiltersGeneric9Binding.includes(obj.id);
                  });
                }
              }
            }

            if (gSystemConfig.enablePublicationsFilterGeneric10 !== 0) {
              this.objIdsPublicationsFiltersGeneric10Binding = this.objIdsPublicationsFiltersGenericBinding.filter((obj) => {
                return obj.id_filter_index == 110;
              });

              if (this.objIdsPublicationsFiltersGeneric10Binding) {
                this.arrIdsPublicationsFiltersGeneric10Binding = Object.keys(this.objIdsPublicationsFiltersGeneric10Binding).map((key) => this.objIdsPublicationsFiltersGeneric10Binding[key]['id_filters_generic']);

                if (this.arrIdsPublicationsFiltersGeneric10Binding) {
                  // let arrIdsPublicationsFiltersGeneric10Binding = this.arrIdsPublicationsFiltersGeneric10Binding;

                  this.objPublicationsFiltersGeneric10Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter((obj) => {
                    return arrIdsPublicationsFiltersGeneric10Binding.includes(obj.id);
                  });
                }
              }
            }

            if (arrIdsPublicationsFiltersGeneric1Binding.length !== 0) {
              oplRecords.resultsPublicationsListing[countArray].objIdsPublicationsFiltersGeneric1Binding = arrIdsPublicationsFiltersGeneric1Binding;
              oplRecords.resultsPublicationsListing[countArray].objPublicationsFiltersGeneric1Binding_print = objPublicationsFiltersGeneric1Binding_print;
            }

            if (arrIdsPublicationsFiltersGeneric2Binding.length !== 0) {
              oplRecords.resultsPublicationsListing[countArray].objIdsPublicationsFiltersGeneric2Binding = arrIdsPublicationsFiltersGeneric2Binding;
              oplRecords.resultsPublicationsListing[countArray].objPublicationsFiltersGeneric2Binding_print = objPublicationsFiltersGeneric2Binding_print;
            }

            if (arrIdsPublicationsFiltersGeneric3Binding.length !== 0) {
              oplRecords.resultsPublicationsListing[countArray].objIdsPublicationsFiltersGeneric3Binding = arrIdsPublicationsFiltersGeneric3Binding;
              oplRecords.resultsPublicationsListing[countArray].objPublicationsFiltersGeneric3Binding_print = objPublicationsFiltersGeneric3Binding_print;
            }

            if (arrIdsPublicationsFiltersGeneric4Binding.length !== 0) {
              oplRecords.resultsPublicationsListing[countArray].objIdsPublicationsFiltersGeneric4Binding = arrIdsPublicationsFiltersGeneric4Binding;
              oplRecords.resultsPublicationsListing[countArray].objPublicationsFiltersGeneric4Binding_print = objPublicationsFiltersGeneric4Binding_print;
            }

            if (arrIdsPublicationsFiltersGeneric5Binding.length !== 0) {
              oplRecords.resultsPublicationsListing[countArray].objIdsPublicationsFiltersGeneric5Binding = arrIdsPublicationsFiltersGeneric5Binding;
              oplRecords.resultsPublicationsListing[countArray].objPublicationsFiltersGeneric5Binding_print = objPublicationsFiltersGeneric5Binding_print;
            }

            if (arrIdsPublicationsFiltersGeneric6Binding.length !== 0) {
              oplRecords.resultsPublicationsListing[countArray].objIdsPublicationsFiltersGeneric6Binding = arrIdsPublicationsFiltersGeneric6Binding;
              oplRecords.resultsPublicationsListing[countArray].objPublicationsFiltersGeneric6Binding_print = objPublicationsFiltersGeneric6Binding_print;
            }

            if (arrIdsPublicationsFiltersGeneric7Binding.length !== 0) {
              oplRecords.resultsPublicationsListing[countArray].objIdsPublicationsFiltersGeneric7Binding = arrIdsPublicationsFiltersGeneric7Binding;
              oplRecords.resultsPublicationsListing[countArray].objPublicationsFiltersGeneric7Binding_print = objPublicationsFiltersGeneric7Binding_print;
            }

            if (arrIdsPublicationsFiltersGeneric8Binding.length !== 0) {
              oplRecords.resultsPublicationsListing[countArray].objIdsPublicationsFiltersGeneric8Binding = arrIdsPublicationsFiltersGeneric8Binding;
              oplRecords.resultsPublicationsListing[countArray].objPublicationsFiltersGeneric8Binding_print = objPublicationsFiltersGeneric8Binding_print;
            }

            if (arrIdsPublicationsFiltersGeneric9Binding.length !== 0) {
              oplRecords.resultsPublicationsListing[countArray].objIdsPublicationsFiltersGeneric9Binding = arrIdsPublicationsFiltersGeneric9Binding;
              oplRecords.resultsPublicationsListing[countArray].objPublicationsFiltersGeneric9Binding_print = objPublicationsFiltersGeneric9Binding_print;
            }

            if (arrIdsPublicationsFiltersGeneric10Binding.length !== 0) {
              oplRecords.resultsPublicationsListing[countArray].objIdsPublicationsFiltersGeneric10Binding = arrIdsPublicationsFiltersGeneric10Binding;
              oplRecords.resultsPublicationsListing[countArray].objPublicationsFiltersGeneric10Binding_print = objPublicationsFiltersGeneric10Binding_print;
            }

            // Debug.
            // console.log('oplRecords.oplRecords.resultsPublicationsListing=', oplRecords.resultsPublicationsListing[countArray]);
          }

          // Build return object.
          objReturn.returnStatus = true;
          // objReturn.ocdRecord = ocdRecord;
          objReturn.oplRecords = oplRecords;
          // console.log("objReturn=",objReturn);

          // Serve object.
          // res.json(ocdRecord);
          // res.json(objReturn);
        } else {
          // API key not the same.
          objReturn.returnStatus = false;
          objReturn.errorMessage = 'statusMessageAPI2e';

          // res.json(objReturn);
        }
      }
    } catch (asyncError) {
      if (gSystemConfig.configDebug === true) {
        console.error(asyncError);
      }
    } finally {
      // Serve object.
      res.json(objReturn);
    }
  })();
  // ----------------------
});
// **************************************************************************************

// API - Publications - details - GET.
// **************************************************************************************
// Debug: http:// localhost:3000/api/publications/details/1291/?apiKey=createSecretPassword
router.get('/' + gSystemConfig.configRouteAPI + '/' + gSystemConfig.configRouteAPIPublications + '/' + gSystemConfig.configRouteAPIDetails + '/:idTbPublications?', (req, res) => {
  // working, with the async block
  // Variables.
  // ----------------------
  let objReturn = { returnStatus: false }; // eslint-disable-line
  let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, 'env'); // eslint-disable-line
  // let clBackend = new PublicationsListing();

  let opdRecord;
  let opdRecordParameters;

  // let oclRecords;
  // let oclRecordsParameters;

  // let cdBackend;
  let idTbPublications = '';
  let pageNumber = '';
  // eslint-disable-next-line
  let terminal = 0; // get from query
  // let masterPageSelect = "layout-backend-main";

  // let messageSuccess = "";
  // let messageError = "";
  // let messageAlert = "";
  // let nRecords = "";

  let apiKey = '';
  // ----------------------

  // Value definition.
  // ----------------------
  if (req.params.idTbPublications) {
    idTbPublications = req.params.idTbPublications;
  }
  if (req.query.pageNumber) {
    pageNumber = req.query.pageNumber;
  }

  if (req.query.apiKey) {
    apiKey = req.query.apiKey;
  }
  // ----------------------

  // Logic.
  // ----------------------
  // (async function () {
  (async () => {
    // async marks the block
    try {
      if (idTbPublications != '') {
        // if(configAPIKey == apiKey)
        if (configAPIKey === SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, 'env'), 2)) {
          // Parameters build - details.
          opdRecordParameters = {
            _arrSearchParameters: ['id;' + idTbPublications + ';i', 'activation;1;i'],
            _idTbPublications: idTbPublications,
            _terminal: terminal,
            _objSpecialParameters: { returnType: 3 },
          };

          // Build object - details.
          opdRecord = new SyncSystemNS.ObjectPublicationsDetails(opdRecordParameters);
          await opdRecord.recordDetailsGet(0, 3);

          // Parameters build - listing.
          /*
                    oclRecordsParameters = {
                        _arrSearchParameters: ["id_parent;" + idTbPublications + ";i"],
                        _configSortOrder: gSystemConfig.configPublicationsSort,
                        _strNRecords: "",
                        _objSpecialParameters: {returnType: 3}
                    };
                    */
          // Build object - listing.
          // oclRecords = new SyncSystemNS.ObjectPublicationsListing(oclRecordsParameters);
          // await oclRecords.recordsListingGet(0, 3);

          // Build return object.
          objReturn.returnStatus = true;
          objReturn.opdRecord = opdRecord;
          // objReturn.oclRecords = oclRecords;
          // console.log("objReturn=",objReturn);

          // Serve object.
          // res.json(ocdRecord);
          // res.json(objReturn);
        } else {
          // API key not the same.
          objReturn.returnStatus = false;
          objReturn.errorMessage = 'statusMessageAPI2e';

          // res.json(objReturn);
        }
      }
      /*
            // Object instance.
            cdBackend = new PublicationsDetails({
                idTbPublications: idTbPublications,
                pageNumber: pageNumber,
                masterPageSelect: masterPageSelect,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert,
                nRecords: nRecords
            });  
            
            // Build object data.
            await cdBackend.build();

            // return res.json(categoriesListingResultJsonObj);
            // res.send(idTbPublications);
            res.json(cdBackend);
            */
    } catch (asyncError) {
      if (gSystemConfig.configDebug === true) {
        console.error(asyncError);
      }
    } finally {
      // Serve object.
      res.json(objReturn);
    }
  })();
  // ----------------------
});
// **************************************************************************************

// Export.
module.exports = router;
