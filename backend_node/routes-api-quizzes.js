'use strict';

// Import Node Modules.
// ----------------------
const express = require('express');
const router = express.Router();

const gSystemConfig = require('../config-application.js'); // System configuration.
const SyncSystemNS = require('../' + gSystemConfig.configDirectoryComponents + '/syncsystem-ns.js');

const formidable = require('formidable'); // Form file upload.
const fetch = require('node-fetch');
// const nodemailer = require("nodemailer");
// ----------------------

// API - Quizzes - listing - GET.
// **************************************************************************************
// Debug: http:// localhost:3000/api/quizzes/1648/?apiKey=createSecretPassword
router.get('/' + gSystemConfig.configRouteAPI + '/' + gSystemConfig.configRouteAPIQuizzes + '/:idParentQuizzes?', (req, res) => {
  // working, with the async block
  // Variables.
  // ----------------------
  let objReturn = { returnStatus: false }; // eslint-disable-line
  let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, 'env'); // eslint-disable-line

  // let ocdRecord;
  // let ocdRecordParameters;

  let oqlRecords;
  let oqlRecordsParameters;
  let objSpecialParameters;

  let oqolRecords;
  let oqolRecordsParameters;

  // let cdBackend;
  let idParentQuizzes = '';
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
  if (req.params.idParentQuizzes) {
    idParentQuizzes = req.params.idParentQuizzes;
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
  // console.log("idParentQuizzes=", idParentQuizzes);
  // ----------------------

  // Logic.
  // ----------------------
  // (async function () {
  (async () => {
    // async marks the block
    try {
      if (idParentQuizzes != '') {
        // if(configAPIKey == apiKey)
        if (configAPIKey === SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, 'env'), 2)) {
          // Check if it´s an ID (number).
          if (isNaN(idParentQuizzes)) {
            // Search for friendly name.
            // eslint-disable-next-line
            let resultURLAlias = await SyncSystemNS.FunctionsDB.genericTableGet02(
              gSystemConfig.configSystemDBTableCategories, 
              ['url_alias;' + idParentQuizzes + ';s', 'activation;1;i'], 
              gSystemConfig.configCategoriesSort, 
              '', 
              'id, id_parent', 
              1, 
              { returnType: 3 }
            ); // debug: asdfa / 308

            if (resultURLAlias) {
              idParentQuizzes = resultURLAlias[0]['id'];
            } else {
              idParentQuizzes = -1;
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
          oqlRecordsParameters = {
            _arrSearchParameters: ['id_parent;' + idParentQuizzes + ';i'],
            _configSortOrder: gSystemConfig.configQuizzesSort,
            _strNRecords: '',
            _objSpecialParameters: objSpecialParameters,
          };
          // Revision {returnType: 3} = objSpecialParameters

          // Build object - listing.
          oqlRecords = new SyncSystemNS.ObjectQuizzesListing(oqlRecordsParameters);
          await oqlRecords.recordsListingGet(0, 3);

          // Quizzes options.
          // Loop through quizzes.
          for (let countArray = 0; countArray < oqlRecords.resultsQuizzesListing.length; countArray++) {
            // Parameters build - options listing.
            oqolRecordsParameters = {
              _arrSearchParameters: ['id_quizzes;' + oqlRecords.resultsQuizzesListing[countArray].id + ';i'],
              _configSortOrder: gSystemConfig.configQuizzesOptionsSort,
              _strNRecords: '',
              _objSpecialParameters: objSpecialParameters,
            };

            // Build object - listing.
            oqolRecords = new SyncSystemNS.ObjectQuizzesOptionsListing(oqolRecordsParameters);
            await oqolRecords.recordsListingGet(0, 3);

            // Add options listing to output.
            // oqlRecords.resultsQuizzesListing[countArray].quizzesOptions = {id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"};// debug.
            oqlRecords.resultsQuizzesListing[countArray].quizzesOptions = oqolRecords.resultsQuizzesOptionsListing;

            // Debug.
            // console.log("oqlRecords.resultsQuizzesListing[]=", oqlRecords.resultsQuizzesListing[countArray]);
          }
          // Debug.
          // console.log("oqlRecords.resultsQuizzesListing.length=", oqlRecords.resultsQuizzesListing.length);

          // Build return object.
          objReturn.returnStatus = true;
          // objReturn.ocdRecord = ocdRecord;
          objReturn.oqlRecords = oqlRecords;
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

// API - Quizzes Log - POST.
// **************************************************************************************
// Debug: http:// localhost:3000/api/quizzes/log/?apiKey=createSecretPassword
router.post('/' + gSystemConfig.configRouteAPI + '/' + gSystemConfig.configRouteAPIQuizzes + '/' + gSystemConfig.configRouteAPIActionLog + '/', (req, res, next) => {
  // working, with the async block
  // Variables
  // ----------------------
  let objReturn = { returnStatus: false }; // eslint-disable-line
  let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, 'env'); // eslint-disable-line

  let tblQuizzesLogID = '';
  let tblQuizzesLogIdQuizzes = 0;
  let tblQuizzesLogIdQuizzesOptions = 0;
  let tblQuizzesLogIdRegister = 0;
  let tblQuizzesLogIdQuizzesOptionsAnswer = 0;
  let tblQuizzesLogNotes = '';

  // let masterPageSelect = "";
  let returnURL = '';

  let formfileFieldsReference = {}; // eslint-disable-line
  let resultsFunctionsFiles;
  let resultsFunctionsImageResize01;

  let form;
  if (gSystemConfig.configUploadComponent === 1) {
    form = new formidable.IncomingForm();
    // ref: https:// www.codediesel.com/nodejs/processing-file-uploads-in-node-js/
    // ref: https:// www.npmjs.com/package/formidable
    // ref: https:// www.youtube.com/watch?v=9Zg-5jlz74w
    // ref: https:// www.youtube.com/watch?v=cNG6VrGszck
    // let resultsFunctionsFiles;
  }
  // ----------------------

  // Formidable configuration.
  // ----------------------
  form.encoding = 'utf-8';
  form.maxFieldsSize = 20 * 1024 * 1024;
  form.maxFileSize = 200 * 1024 * 1024; // default maxFileSize is 200MB
  form.multiples = true; // default false
  // form.uploadDir = gSystemConfig.configPhysicalPathRoot + "/" + gSystemConfig.configDirectoryFilesVisualization;
  form.uploadDir = gSystemConfig.configDirectoryFilesUpload;
  form.keepExtensions = true;
  form.hash = false; // limits the number of fields that the querystring parser will decode. Defaults to 1000 (0 for unlimited).
  // ----------------------

  // Async function.
  // ----------------------
  /**/
  // (async function () {
  (async () => {
    // async marks the block
    try {
      /*
            tblQuizzesLogID = await new Promise((resolve, reject)=>{
                SyncSystemNS.FunctionsDB.counterUniversalUpdate_async(1)
                .then((results)=>{
                    if(results === undefined)
                    {
                        // Error.
                        if(gSystemConfig.configDebug === true)
                        {
                            console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "statusMessage9"));
                        }
                        reject(new Error("nCounterUpdate is undefined."));
                    }else{
                        // Success.
                        // resolve(nCounterUpdate);
                        resolve(results);
                    } // working
    
                });
            });
            */

      // let formParseResults = await new Promise(function (resolve, reject) {
      // eslint-disable-next-line
      let formParseResults = await new Promise((resolve, reject) => {
        // Variables.
        // ----------------------
        let fieldsPost;
        // eslint-disable-next-line
        let fieldsMultipleValuesPost = {}; // necessary to correct a bug in this version of formidable - maybe, the update will fix the issue of multiple selections array []
        let filesPost;
        let formParseErrorPost;
        // ----------------------

        if (gSystemConfig.configUploadComponent == 1) {
          // Request post data.
          // ----------------------
          // form.parse(req, function (formParseError, fields, files) {
          form.parse(req, (formParseError, fields, files) => {
            if (formParseError) {
              // Error.
              if (gSystemConfig.configDebug === true) {
                console.log('Form parse error: ' + formParseError);
              }

              // reject(formParseError); // working
              formParseErrorPost = formParseError;
              return;
            } else {
              if (gSystemConfig.configDebug === true) {
                console.log('Form parse success (fields): ', fields);
                console.log('Form parse success (files): ', files);
              }

              /*
              Debug.
              res.end(util.inspect({
                  fields: fields
              }));
              */

              // Define values for posted data.
              fieldsPost = fields;
              filesPost = files;

              // console.log("formParseResults.files.image_main=", formParseResults.files.image_main);
              // console.log("fieldsPost=", fieldsPost);

              // resolve({fields: fields, files: files}); // working
            }
          });
          // ----------------------

          // Field parsing.
          // ----------------------
          // let fieldsCheckbox;
          // let fieldsCheckbox = {debug: 123};
          // let fieldsCheckbox = {};
          // form.on('field', function (name, value) {
          form.on('field', (name, value) => {
            // form.on('field', (name, value, fieldsCheckbox)=>{
            // console.log("fieldsMultipleValuesPost=", fieldsMultipleValuesPost); // debug.
            if (name.toString().includes('[]') === true) {
              if (fieldsMultipleValuesPost.hasOwnProperty(name.toString()) === true) {
                fieldsMultipleValuesPost[name.toString()].push(value);
              } else {
                fieldsMultipleValuesPost[name.toString()] = []; // first, create a property key with empty array
                fieldsMultipleValuesPost[name.toString()].push(value);
              }

              // Debug.
              // console.log("[]=true");
            }
            /*
                        if(name in fieldsPost){
                            if(Array.isArray(fieldsPost[name])){
                                fieldsPost[name].push(value);
                            }else {
                                fieldsPost[name] = [fieldsPost[name],value];
                            }
                        }else{
                            fieldsPost[name] = value;
                        }
                        */

            // fieldsPost["checkbox"][name].push(value);

            /*
            if (fieldsPost[name]) {
            if (!Array.isArray(fieldsPost[name])) {
                fieldsPost[name] = [fieldsPost[name]];
            }
            fieldsPost[name].push(value);
            // arrIdsCategoriesFiltersGeneric1.push(fieldsPost.idsCategoriesFiltersGeneric1);

            } else {
                fieldsPost[name] = value;
            }*/

            // if(Array.isArray(name))
            // {
            // console.log("array true = ", name);
            // }

            // Debug.
            // console.log("form.on fieldsPost=", fields[name]);
            // console.log("form.on fieldsPost=", fieldsPost);
            // console.log("form.on common.actions.basicFormOnField=", common.actions.basicFormOnField);

            // console.log("form.on fieldsPost[name]=", fieldsPost[name]);
            // console.log("form.on name=", name);
            // console.log("form.on name.toString()=", name.toString());
            // console.log("form.on value=", value);
          });
          // console.log("fieldsMultipleValuesPost=", fieldsMultipleValuesPost);
          // ----------------------

          // Progress bar.
          // ----------------------
          // form.on('progress', function (bytesReceived, bytesExpected) {
          form.on('progress', (bytesReceived, bytesExpected) => {
            const progressPercentComplete = (bytesReceived / bytesExpected) * 100;

            // TODO: Progress bar on alert div.

            // Debug.
            if (gSystemConfig.configDebug === true) {
              console.log('Progress=');
              console.log(progressPercentComplete.toFixed(2));
            }
          });
          // ----------------------

          // Renaming.
          // ----------------------
          // form.on("end", function(fields, files){
          // form.on('end', async function (fields, files) {
          form.on('end', async (fields, files) => {
            // Note - this function structure must remain as it is or the "this" parameter looses it´s context.

            // Check fields with files.

            // Build file fields references.
            // console.log("fieldsPost.file_config=", fieldsPost.file_config); // debug
            // console.log("fieldsPost.content_type=", fieldsPost.content_type); // debug
            // if(fieldsPost.file_config !== 0)
            // {
            // console.log("fieldsPost.file_config !=true"); // debug
            // }else{
            // console.log("fieldsPost.file_config !=false"); // debug
            // }

            resultsFunctionsFiles = { returnStatus: true };

            if (resultsFunctionsFiles.returnStatus == true) {
              // Debug.
              // console.log("resultsFunctionsFiles=", resultsFunctionsFiles.returnStatus);
              // console.log("returnFileName=", resultsFunctionsFiles.returnFileName);
              // console.log("resultsFunctionsFiles=", resultsFunctionsFiles);
              // console.log("tblCategoriesImageMain=", tblCategoriesImageMain);
              // resolve({fields: fields, files: files});
              // resolve({fields: fieldsPost, files: filesPost});
              resolve({
                fields: fieldsPost,
                fieldsMultipleValues: fieldsMultipleValuesPost,
                files: filesPost,
              });
            } else {
              reject(formParseErrorPost);
            }
          });
          // ----------------------
        }
      });
      // Debug.
      // console.log("formParseResults=", formParseResults);

      // Define values.
      // ----------------------
      tblQuizzesLogID = formParseResults.fields.id;
      tblQuizzesLogIdQuizzes = formParseResults.fields.id_quizzes;
      tblQuizzesLogIdQuizzesOptions = formParseResults.fields.id_quizzes_options;
      tblQuizzesLogIdRegister = formParseResults.fields.id_register;
      tblQuizzesLogIdQuizzesOptionsAnswer = formParseResults.fields.id_quizzes_options_answer;
      tblQuizzesLogNotes = formParseResults.fields.notes;

      // Debug.
      // console.log("formParseResults.fieldsMultipleValues=", formParseResults.fieldsMultipleValues);
      // formParseResults.fields
      // formParseResults.files
      // ----------------------

      // Insert record.
      // ----------------------
      // eslint-disable-next-line
      let quizzesLogInsertResult = await new Promise((resolve, reject) => {
        SyncSystemNS.FunctionsDBInsert.quizzesLogInsert_async({
          _tblQuizzesLogID: tblQuizzesLogID,
          _tblQuizzesLogIdQuizzes: tblQuizzesLogIdQuizzes,
          _tblQuizzesLogIdQuizzesOptions: tblQuizzesLogIdQuizzesOptions,
          _tblQuizzesLogIdRegister: tblQuizzesLogIdRegister,
          _tblQuizzesLogIdQuizzesOptionsAnswer: tblQuizzesLogIdQuizzesOptionsAnswer,
          _tblQuizzesDateCreation: '',
          _tblQuizzesLogNotes: tblQuizzesLogNotes,
        }).then((results) => {
          if (results === undefined) {
            // Error.
            if (gSystemConfig.configDebug === true) {
              console.log(SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, 'statusMessage3'));
            }
            reject(new Error('nCounterUpdate is undefined.'));
          } else {
            // Success.
            // resolve(nCounterUpdate);
            resolve(results);
          } // working
        });
      });
      // ----------------------

      // Success.
      // ----------------------
      if (quizzesLogInsertResult == true) {
        objReturn.returnStatus = true;
      }
      // ----------------------
    } catch (aError) {
      if (gSystemConfig.configDebug === true) {
        console.log(aError);
        console.error(aError);
      }

      // Error.
      returnURL += '?messageError=statusMessage3';
      // returnURL += "&messageError=statusMessage3";

      // Redirect.
      // res.redirect("/" + gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" + idParent);
      // res.redirect(returnURL);
    } finally {
      // Page redirect.
      // res.redirect(returnURL);
      res.json(objReturn); // debug.
    }
  })();
  // ----------------------

  // Debug.
  // console.log(req.body);// object with the query post
  // console.log("fields = ");
  // console.log(fields);// object with the query post
});
// **************************************************************************************

// Export.
module.exports = router;
