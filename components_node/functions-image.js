'use strict';

//Import Node Modules.
//----------------------
const gSystemConfig = require('../config-application.js'); //System configuration.
//const dbSystemCon = require("../config-application-db.js").dbSystemCon; //DB System - simple connection.
//const dbSystemConPool = require("../config-application-db.js").dbSystemConPool; //DB System - pool connection.

const FunctionsGeneric = require('./functions-generic.js');
//const FunctionsDB = require("./functions-db.js");

//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
//const mysql = require("mysql"); //MySQL package.
//const lodash = require("lodash"); //Utils.
const fs = require('fs'); //File System
//const fsExtra = require("fs-extra"); //File System
const path = require('path'); //Necessary to serve static files.
const sharp = require('sharp'); //Resize image.

const AWS = require('aws-sdk');
/**/
var s3 = new AWS.S3({
  accessKeyId: process.env.CONFIG_API_AWS_S3_ID,
  secretAccessKey: process.env.CONFIG_API_AWS_S3_KEY,
  //apiVersion: '2006-03-01'
});
//----------------------

module.exports = class FunctionsImage {
  //Resize images.
  //**************************************************************************************
  /**
   * Resize images.
   * @static
   * @async
   * @param {array} arrImageSize ["g;667;500","NULL;370;277","r;205;154","t;120;90"]
   * @param {string} directoryFiles  c:\directory\subdirectory | gSystemConfig.configDirectoryFilesUpload
   * @param {string} fileName
   * @returns {boolean} true (success) | false (error)
   *
   *
   */
  static async imageResize01(arrImageSize, directoryFiles, fileName) {
    //Variables.
    //----------------------
    let strReturn = true;
    //----------------------

    //Logic.
    if (gSystemConfig.configImageFormats.includes(path.extname(fileName).toLowerCase()) == true) {
      for (let arrCountImageSize = 0; arrCountImageSize < arrImageSize.length; arrCountImageSize++) {
        let arrImageSizeParameters = arrImageSize[arrCountImageSize].split(';');
        let imagePrefix = arrImageSizeParameters[0];
        if (imagePrefix == 'NULL') {
          imagePrefix = '';
        }
        let imageW = arrImageSizeParameters[1];
        let imageH = arrImageSizeParameters[2];

        //Resize.
        //----------------------
        //Sharp.
        //ref: https://sharp.pixelplumbing.com/en/stable/
        if (gSystemConfig.configImageComponent == 1) {
          //sharp.cache({files: 0}); //clear cache
          sharp.cache(false); //clear cache (ref: https://stackoverflow.com/questions/41289173/node-js-module-sharp-image-processor-keeps-source-file-open-unable-to-unlink)

          //await sharp("app_files_public/o444.jpg")
          await sharp(directoryFiles + '/o' + fileName)
            .rotate() //auto-rotated using EXIF Orientation tag
            //.resize(imageW, imageH)
            .resize(parseInt(imageW), parseInt(imageH), {
              fit: 'inside', //https://sharp.pixelplumbing.com/api-resize
              withoutEnlargement: true,
            })
            .toFile(directoryFiles + '/' + imagePrefix + fileName, (resizeError) => {
              if (resizeError) {
                //Error.
                if (gSystemConfig.configDebug === true) {
                  //console.log("Resize file error.");
                  console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, 'statusMessage19e'));
                }
                strReturn = false;
              } else {
                if (gSystemConfig.configDebug === true) {
                  //console.log("Resize file success.");
                  console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, 'statusMessage19s'));
                }
              }
            })
            .toBuffer()
            .then((fileInfo) => {
              //AWS S3.
              //----------------------
              //if(resultsFSExtraCopy === true)
              //{
              if (gSystemConfig.configUploadType == 2) {
                const fileContent = fs.readFileSync(directoryFiles + '/' + imagePrefix + fileName);
                //const fileContent = await fs.readFileSync(directoryFiles + "/" + imagePrefix + fileName);

                /*
                                const s3 = new AWS.S3({
                                    accesssKeyId: process.env.CONFIG_API_AWS_S3_ID,
                                    secretAccessKey: process.env.CONFIG_API_AWS_S3_KEY
                                })
                                */

                const uploadParameters = {
                  Bucket: process.env.CONFIG_API_AWS_S3_BUCKET,
                  Key: imagePrefix + fileName,
                  //Key: fileNameOriginal,
                  //Body: postedFile[countArrayPostedFiles] //didn´t work
                  //Body: postedFile
                  Body: fileContent,
                };

                //if(gSystemConfig.configImageFormats.includes(fileExtension) == true)
                if (gSystemConfig.configImageFormats.includes(path.extname(imagePrefix + fileName).toLowerCase()) == true) {
                  uploadParameters.ContentType = 'image/jpeg';
                }

                s3.upload(uploadParameters, (s3UploadError, s3DataReturn) => {
                  if (s3UploadError) {
                    if (gSystemConfig.configDebug === true) {
                      console.log('s3UploadError=', s3UploadError);
                    }
                  }

                  //Debug.
                  //console.log("s3DataReturn=", s3DataReturn)
                });
              }
              //}
              //----------------------
              //Debug.
              //console.log("fileInfo=", fileInfo);
              //console.log("key=", directoryFiles + "/" + imagePrefix + fileName);
            });
        }
        //----------------------

        //Debug.
        /*
                console.log("arrImageSize = " + arrImageSize[arrCountImageSize]);
                console.log("imagePrefix = " + imagePrefix);
                console.log("imageW = " + imageW);
                console.log("imageH = " + imageH);
                console.log("\n");
                */
      }
    } else {
      if (gSystemConfig.configDebug === true) {
        console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, 'statusMessage19'));
      }
    }

    return strReturn;

    //Usage.
    //resultsFunctionsImageResize01 = await SyncSystemNS.FunctionsImage.imageResize01(gSystemConfig.configArrDefaultImageSize, gSystemConfig.configDirectoryFiles, tblCategoriesImageMain);
  }
  //**************************************************************************************
};
