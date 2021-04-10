"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
//const mysql = require("mysql");//MySQL package.

const gSystemConfig = require("../config-application.js"); //System configuration.
//const dbSystemCon = require("../config-application-db.js").dbSystemCon; //DB System - simple connection.
//const dbSystemConPool = require("../config-application-db.js").dbSystemConPool; //DB System - pool connection.
const FunctionsGeneric = require("./functions-generic.js");
const ObjectFormsDetails = require("./object-forms-details.js");
const ObjectFormsFieldsListing = require("./object-forms-fields-listing.js");

const nodemailer = require("nodemailer");
//----------------------


module.exports = class FunctionsEmail
{
    //Function to send e-mail message.
    //**************************************************************************************
    /**
     * Function to send e-mail message.
     * @static
     * @param {object} _objEmailSendParameters 
     * @returns {object}
     * @example
     * SyncSystemNS.FunctionsEmail.emailSend({})
     */
    static async emailSend(_objEmailSendParameters)
    {
        /*
        _objEmailSendParameters: {
            _emailSender: "",
            _emailSenderName: "",
            _emailSenderRecipient: "",
            _emailSenderRecipientName: "",
            _emailReply: "",
            _emailCC:[
                {
                    email: "",
                    name: ""
                },
                {
                    email: "",
                    name: ""
                }
            ],
            _emailBCC:[
                {
                    email: "",
                    name: ""
                },
                {
                    email: "",
                    name: ""
                }
            ],
            _emailSubject: "",
            _emailBodyMessageText: "",
            _emailBodyMessageHTML: "",
            _emailSendType: "", //11 - nodemailer
            _emailFormat: "" //0 - text | 1 - HTML
        }
        */


        //Variables.
        //----------------------
        let objReturn = {returnStatus: false};
        let emailSendResult;
        //----------------------


        //Logic.
        //----------------------
        //(async function(){ //async marks the block
            try{ 

                //Nodemailer.
                let nodemailerTransporterParameters;

                //Build parameters.
                nodemailerTransporterParameters = {
                    pool: true,
                    host: process.env.CONFIG_EMAIL_DEFAULT_HOST,
                    port: process.env.CONFIG_EMAIL_DEFAULT_PORT,
                    auth: {
                        user: process.env.CONFIG_EMAIL_DEFAULT_USERNAME,
                        pass: process.env.CONFIG_EMAIL_DEFAULT_PASSWORD
                    },
                    secure: false,
                    tls: {
                        rejectUnauthorized: false
                    } //Also keep in mind this leaves you vulnerable to MITM attacks on SSL. ref: https://stackoverflow.com/questions/14262986/node-js-hostname-ip-doesnt-match-certificates-altnames/16311147#16311147
                };


                //Create transport.
                const transporter = nodemailer.createTransport(nodemailerTransporterParameters);

                //Send mail.
                /*
                emailSendResult = await transporter.sendMail({
                    from: gSystemConfig.enableEmailSenderNameDefault + "<" + gSystemConfig.enableEmailSenderDefault + ">",
                    to: gSystemConfig.enableEmailRecipientNameDefault +  "<" + gSystemConfig.enableEmailRecipientDefault + ">",
                    replyTo: gSystemConfig.enableEmailSenderDefault,
                    subject: "testing e-mail sending",
                    text: _objEmailSendParameters._emailBodyMessageText,
                    html: _objEmailSendParameters._emailBodyMessageHTML, //research amp:
                    encoding: "utf-8", //hex | base64
                    priority: "normal" //high | normal | low
                    //dkim: //https://nodemailer.com/dkim/
                });*///working

                emailSendResult = await transporter.sendMail({
                    from: _objEmailSendParameters._emailSenderName + "<" + _objEmailSendParameters._emailSender + ">",
                    to: _objEmailSendParameters._emailSenderRecipientName +  "<" + _objEmailSendParameters._emailSenderRecipient + ">",
                    replyTo: _objEmailSendParameters._emailReply,
                    /*
                    cc: [
                        "foobar@example.com",
                        "Ноде Майлер <bar@example.com>"
                    ],
                    bcc: [
                        "foobar@example.com",
                        {
                            name: "Майлер, Ноде",
                            address: "foobar@example.com"
                        }
                    ],
                    */
                    subject: _objEmailSendParameters._emailSubject,
                    text: _objEmailSendParameters._emailBodyMessageText,
                    html: _objEmailSendParameters._emailBodyMessageHTML, //research amp:
                    encoding: "utf-8", //hex | base64
                    priority: "normal" //high | normal | low
                    //dkim: //https://nodemailer.com/dkim/
                });

                transporter.close();


                //Success.
                /*
                emailSendResult= {
                    accepted: [ 'xx@xxx.com' ],
                    rejected: [],
                    envelopeTime: 38,
                    messageTime: 1027,
                    messageSize: 1434,
                    response: '250 2.0.0 Ok: queued as 0D52A540746',
                    envelope: {
                        from: 'yyy@yyy.com',
                        to: [ 'xx@xxx.com' ]
                    },
                    messageId: '<3b3ff07c-160e-8933-31b8-88f6fb689045@yyy@yyy.com>'
                }*/
                if(emailSendResult.accepted.length > 0)
                {
                    objReturn.returnStatus = true;
                }

                //Debug.
                //console.log("emailSendResult=", emailSendResult);
            }catch(emailSendError){
                if(gSystemConfig.configDebug === true)
                {
                    console.log("emailSendError=", emailSendError);
                    console.error("emailSendError=", emailSendError);
                }
            }finally{
                return objReturn;
            }
        //})()
        //----------------------
    }
    //**************************************************************************************


    //Function build content based on system form.
    //**************************************************************************************
    /**
     * Function build content based on system form.
     * @static
     * @param {int} _idTbForms 
     * @param {object} _objPostData 
     * @param {int} _emailFormat 
     * @returns {object}
     * @example
     * SyncSystemNS.FunctionsEmail.emailSend({})
     */
    static async formsContent(_idTbForms, _objPostData, _emailFormat = 0)
    {
        /*
        _emailFormat: 1 //0 - text | 1 - HTML
        _objPostData: {
            _fields: {},
            _fieldsMultipleValues: {}, //For checkbox and listbox
            _files: {}
        }
        */

        //Variables.
        //----------------------
        let objReturn = {returnStatus: false}; //objReturn: {returnStatus: false, formsContentText: "", formsContentHTML: ""}
        let formsContentText = "";
        let formsContentHTML = "";

        let idTbForms; 
        let objPostData; 
        let emailFormat;

        //let ofdRecordParameters;
        //let ofdRecord;

        let offlRecordsParameters;
        let offlRecords;
        //----------------------


        //Define values.
        //----------------------
        idTbForms = _idTbForms;
        objPostData = _objPostData;
        emailFormat = _emailFormat;
        //----------------------


        //Logic.
        //----------------------
        //(async function(){ //async marks the block
            try{ 
                //Forms detail.
                /*
                ofdRecordParameters = {
                    _arrSearchParameters: ["id;" + idTbForms + ";i"],
                    _idTbForms: idTbForms,
                    _terminal: 0,
                    _objSpecialParameters: {returnType: 3}
                }

                ofdRecord = new ObjectFormsDetails(ofdRecordParameters);
                await ofdRecord.recordDetailsGet(0, 3);
                */
    

                //Forms fields.
                offlRecordsParameters = {
                    _arrSearchParameters: ["id_forms;" + idTbForms + ";i"],
                    _configSortOrder: gSystemConfig.configFormsFieldsSort,
                    _strNRecords: "",
                    _objSpecialParameters: {returnType: 3}
                };
                
                offlRecords = new ObjectFormsFieldsListing(offlRecordsParameters);
                await offlRecords.recordsListingGet(0, 3);


                //Loop through forms fields records.
                offlRecords.resultsFormsFieldsListing.forEach((formsFieldsRow)=>{
                    //formidable
                    if(gSystemConfig.configUploadComponent == 1)
                    {

                        //Text Field | Text Area | Radio Box | Dropdown Menu
                        if(formsFieldsRow.field_type == 1 
                            || formsFieldsRow.field_type == 2
                            || formsFieldsRow.field_type == 4
                            || formsFieldsRow.field_type == 5)
                        {
                            //Build content - text.
                            formsContentText += FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") + " ";
                            if(objPostData._fields[formsFieldsRow.field_name_formatted])
                            {
                                formsContentText += objPostData._fields[formsFieldsRow.field_name_formatted];
                            }
                            formsContentText += "\n";
                            
                            //Build content - HTML.
                            formsContentHTML += FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") + " ";
                            if(objPostData._fields[formsFieldsRow.field_name_formatted])
                            {
                                formsContentHTML += objPostData._fields[formsFieldsRow.field_name_formatted];
                            }
                            formsContentHTML += "<br />";

                            
                        }

                        //Check Box
                        if(formsFieldsRow.field_type == 3)
                        {
                            
                            if(objPostData._fieldsMultipleValues.hasOwnProperty(formsFieldsRow.field_name_formatted + "[]") === true)
                            {
                                //Build content - text.
                                formsContentText += FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") + " ";
                                formsContentText += objPostData._fieldsMultipleValues[formsFieldsRow.field_name_formatted + "[]"].join(", ");
                                formsContentText += "\n";

                                //Build content - HTML.
                                formsContentHTML += FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db") + " ";
                                formsContentHTML += objPostData._fieldsMultipleValues[formsFieldsRow.field_name_formatted + "[]"].join(", ");
                                formsContentHTML += "<br />";

                                //Debug.
                                //console.log("objPostData._fieldsMultipleValues[formsFieldsRow.field_name_formatted (inside function - checkbox)=", formsFieldsRow.field_name_formatted + "[]");
                            }
                        }

                        //Text Description | Subheader
                        if(formsFieldsRow.field_type == 7 
                            || formsFieldsRow.field_type == 8)
                        {
                            //Build content - HTML.
                            formsContentText += FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db");
                            formsContentText += "\n";

                            //Build content - HTML.
                            formsContentHTML += FunctionsGeneric.contentMaskRead(formsFieldsRow.field_name, "db");
                            //formsContentHTML += objPostData._fields[formsFieldsRow.field_name_formatted];
                            formsContentHTML += "<br />";
                        }
                        
                        //Debug.
                        //console.log("formsFieldsRow.field_name_formatted (inside function)=", formsFieldsRow.field_name_formatted);
                        //console.log("formsFieldsRow.field_name_formatted (inside function)=", formsFieldsRow.field_name_formatted);
                    }
                });



                //Build object return.
                objReturn.returnStatus = true;
                objReturn.formsContentHTML = formsContentHTML;
                objReturn.formsContentText = formsContentText;


                //Debug.
                //console.log("idTbForms (inside function)=", idTbForms);
                //console.log("objPostData (inside function)=", objPostData);
                //console.log("emailFormat (inside function)=", emailFormat);
                //console.log("ofdRecord (inside function)=", ofdRecord);
                //console.log("offlRecords (inside function)=", offlRecords);
            }catch(formsContentError){
                if(gSystemConfig.configDebug === true)
                {
                    console.log("formsContentError=", formsContentError);
                    console.error("formsContentError=", formsContentError);
                }
            }finally{
                return objReturn;
            }
        //})()
        //----------------------
    }
    //**************************************************************************************
};