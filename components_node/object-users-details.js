"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
//const mysql = require("mysql");//MySQL package.

const gSystemConfig = require("../config-application.js"); //System configuration.
//const SyncSystemNS = require("./syncsystem-ns.js"); //Node JS import method supported by jest.

const FunctionsGeneric = require("./functions-generic.js");
const FunctionsDB = require("./functions-db.js");
const FunctionsCrypto = require("./functions-crypto.js");

const ObjectFiltersGenericListing = require("./object-filters-generic-listing.js");
//----------------------


module.exports = class ObjectUsersDetails
{
    //Construct.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        //Error handling.
        if(objParameters == undefined)
        {
            throw new Error('Error creating object: parameters missing.');
        }
        
        
        //Properties.
        //----------------------
        this.idTbUsers = (objParameters.hasOwnProperty("_idTbUsers")) ? objParameters._idTbUsers : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsUsersDetails = "";

        this.tblUsersID = "";
        this.tblUsersIdParent = "";
        this.tblUsersSortOrder = 0;
        this.tblUsersSortOrder_print = "";

        this.tblUsersDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        this.tblUsersDateTimezone = "";
        this.tblUsersDateEdit = "";
    
        this.tblUsersIdType = 0; 
        this.tblUsersIdType_print = ""; 

        this.tblUsersNameTitle = "";
        this.tblUsersNameFull = "";
        this.tblUsersNameFirst = "";
        this.tblUsersNameLast = "";
    
        this.tblUsersDateBirth = null;
        this.tblUsersDateBirth_print = "";
        this.tblUsersDateBirthDateObj = new Date();
        this.tblUsersDateBirthDateYear, this.tblUsersDateBirthDateDay, this.tblUsersDateBirthDateMonth;
        this.tblUsersDateBirthDateHour, this.tblUsersDateBirthDateHour_print, this.tblUsersDateBirthDateMinute, this.tblUsersDateBirthDateMinute_print, this.tblUsersDateBirthDateSecond, this.tblUsersDateBirthDateSecond_print;
        this.tblUsersGender = 0; 
        this.tblUsersGender_print = "";
        this.tblUsersDocument = "";
    
        this.tblUsersAddressStreet = "";
        this.tblUsersAddressNumber = "";
        this.tblUsersAddressComplement = "";
        this.tblUsersNeighborhood = "";
        this.tblUsersDistrict = "";
        this.tblUsersCounty = "";
        this.tblUsersCity = "";
        this.tblUsersState = "";
        this.tblUsersCountry = "";
        this.tblUsersZipCode = "";
        this.tblUsersZipCode_print = "";
    
        this.tblUsersPhone1InternationalCode = "";
        this.tblUsersPhone1AreaCode = "";
        this.tblUsersPhone1 = "";
        this.tblUsersPhone1_print = "";
    
        this.tblUsersPhone2InternationalCode = "";
        this.tblUsersPhone2AreaCode = "";
        this.tblUsersPhone2 = "";
        this.tblUsersPhone2_print = "";
    
        this.tblUsersPhone3InternationalCode = "";
        this.tblUsersPhone3AreaCode = "";
        this.tblUsersPhone3 = "";
        this.tblUsersPhone3_print = "";
    
        this.tblUsersUsername = "";
        this.tblUsersEmail = "";
        this.tblUsersPassword = "";
        this.tblUsersPassword_edit = "";
        this.tblUsersPasswordHint = "";
        this.tblUsersPasswordLength = "";
    
        this.tblUsersInfo1 = "";
        this.tblUsersInfo1_edit = "";
        this.tblUsersInfo2 = "";
        this.tblUsersInfo2_edit = "";
        this.tblUsersInfo3 = "";
        this.tblUsersInfo3_edit = "";
        this.tblUsersInfo4 = "";
        this.tblUsersInfo4_edit = "";
        this.tblUsersInfo5 = "";
        this.tblUsersInfo5_edit = "";
        this.tblUsersInfo6 = "";
        this.tblUsersInfo6_edit = "";
        this.tblUsersInfo7 = "";
        this.tblUsersInfo7_edit = "";
        this.tblUsersInfo8 = "";
        this.tblUsersInfo8_edit = "";
        this.tblUsersInfo9 = "";
        this.tblUsersInfo9_edit = "";
        this.tblUsersInfo10 = "";
        this.tblUsersInfo10_edit = "";
    
        this.tblUsersImageMain = "";
    
        this.tblUsersActivation = null;
        this.tblUsersActivation_print = "";
        this.tblUsersActivation1 = null;
        this.tblUsersActivation1_print = "";
        this.tblUsersActivation2 = null;
        this.tblUsersActivation2_print = "";
        this.tblUsersActivation3 = null;
        this.tblUsersActivation3_print = "";
        this.tblUsersActivation4 = null;
        this.tblUsersActivation4_print = "";
        this.tblUsersActivation5 = null;
        this.tblUsersActivation5_print = "";
    
        this.tblUsersIdStatus = 0;
        this.tblUsersIdStatus_print = "";
        this.tblUsersNotes = "";
        this.tblUsersNotes_edit = "";

        this.ofglRecords;

        this.objIdsUsersFiltersGenericBinding;

        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectUsersDetails();
    }
    //**************************************************************************************


    //Get users details according to search parameters.
    //**************************************************************************************
    //async recordsListingGet(idParent = null, terminal = 0, returnType = 1)
    /**
     * Get users details according to search parameters.
     * @param {*} terminal 0 - backend | 1 - frontend
     * @param {*} returnType 1 - array | 3 - Json Object | 10 - html
     * @returns {json}
     */
    async recordDetailsGet(terminal = 0, returnType = 1)
    {
        //terminal: 0 - backend | 1 - frontend
        //returnType: 1 - array | 3 - Json Object | 10 - html

        try
        {
            this.resultsUsersDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableUsers, 
                                                                            this.arrSearchParameters, 
                                                                            "", 
                                                                            "", 
                                                                            FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableUsers, "all", "string"), 
                                                                            1, 
                                                                            this.objSpecialParameters);

            //Filters generic. 
            this.ofglRecords = new ObjectFiltersGenericListing({
                _arrSearchParameters: [],
                _configSortOrder: "title",
                _strNRecords: "",
                _objSpecialParameters: {returnType: 3}
            });
            await this.ofglRecords.recordsListingGet(0, 3);

            //Filters generic bindings.
            this.objIdsUsersFiltersGenericBinding = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                            ["id_record;" + this.idTbUsers + ";i"], 
                                                                                            "", 
                                                                                            "", 
                                                                                            FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiltersGenericBinding, "all", "string"), 
                                                                                            1, 
                                                                                            {returnType: 3});



            //Debug.                                                                                            
            //console.log("this.objIdsUsersFiltersGenericBinding=", this.objIdsUsersFiltersGenericBinding);


            //Define values.
            //if(this.resultsUsersDetails[0])
            //{
                //DEV: Create logic to check if record exist.
            //}
            this.tblUsersID = this.resultsUsersDetails[0].id;
            this.tblUsersIdParent = this.resultsUsersDetails[0].id_parent;

            this.tblUsersSortOrder = this.resultsUsersDetails[0].sort_order;
            this.tblUsersSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblUsersSortOrder, gSystemConfig.configSystemCurrency, 3);
            
            this.tblUsersDateCreation = this.resultsUsersDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            //this.tblUsersDateTimezone = this.resultsUsersDetails[0].date_timezone;
            this.tblUsersDateEdit = this.resultsUsersDetails[0].date_edit;

            this.tblUsersUsersIdType = this.resultsUsersDetails[0].id_type;
            this.tblUsersNameTitle = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].name_title, "db");
            this.tblUsersNameFull = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].name_full, "db");
            this.tblUsersNameFirst = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].name_first, "db");
            this.tblUsersNameLast = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].name_last, "editTextBox=" + gSystemConfig.configBackendTextBox); //TODO: condition detect terminal
            
            this.tblUsersDateBirth = this.resultsUsersDetails[0].date_birth;
            if(this.tblUsersDateBirth)
            {
                this.tblUsersDateBirthDateObj = this.tblUsersDateBirth;
                this.tblUsersDateBirthDateYear = this.tblUsersDateBirthDateObj.getFullYear();
                this.tblUsersDateBirthDateDay = this.tblUsersDateBirthDateObj.getDate();
                this.tblUsersDateBirthDateMonth = (this.tblUsersDateBirthDateObj.getMonth() + 1);
            
                this.tblUsersDateBirthDateHour = this.tblUsersDateBirthDateObj.getHours();
                this.tblUsersDateBirthDateHour_print = ("0" + this.tblUsersDateBirthDateObj.getHours()).slice(-2);

                this.tblUsersDateBirthDateMinute = this.tblUsersDateBirthDateObj.getMinutes();
                this.tblUsersDateBirthDateMinute_print = ("0" + this.tblUsersDateBirthDateObj.getMinutes()).slice(-2);

                this.tblUsersDateBirthDateSecond = this.tblUsersDateBirthDateObj.getSeconds();
                this.tblUsersDateBirthDateSecond_print = ("0" + this.tblUsersDateBirthDateObj.getSeconds()).slice(-2);

                //this.tblUsersDateBirth_print = this.tblUsersDateBirth;
                this.tblUsersDateBirth_print = FunctionsGeneric.dateRead01(this.tblUsersDateBirth, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            4);
            }

            this.tblUsersGender = this.resultsUsersDetails[0].gender;
            this.tblUsersGender_print = "";
            switch(this.tblUsersGender)
            {
                case 0:
                    this.tblUsersGender_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemGender0");
                    break;
                case 1:
                    this.tblUsersGender_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemGender1");
                    break;
                case 2:
                    this.tblUsersGender_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemGender2");
                    break;
            }
            this.tblUsersDocument = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].document, "db");
            
            this.tblUsersAddressStreet = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].address_street, "editTextBox=1");
            this.tblUsersAddressNumber = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].address_number, "db"); //TODO: include strip html
            this.tblUsersAddressComplement = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].address_complement, "db"); //TODO: include strip html
            this.tblUsersNeighborhood = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].neighborhood, "db");
            this.tblUsersDistrict = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].district, "db");
            this.tblUsersCounty = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].county, "db");
            this.tblUsersCity = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].city, "db");
            this.tblUsersState = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].state, "db");
            this.tblUsersCountry = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].country, "db");
            this.tblUsersZipCode = this.resultsUsersDetails[0].zip_code;
            this.tblUsersZipCode_print = this.tblUsersZipCode;

            this.tblUsersPhone1InternationalCode = this.resultsUsersDetails[0].phone1_international_code;
            this.tblUsersPhone1AreaCode = this.resultsUsersDetails[0].phone1_area_code;
            this.tblUsersPhone1 = this.resultsUsersDetails[0].phone1;
            this.tblUsersPhone1_print = this.tblUsersPhone1;

            this.tblUsersPhone2InternationalCode = this.resultsUsersDetails[0].phone2_international_code;
            this.tblUsersPhone2AreaCode = this.resultsUsersDetails[0].phone2_area_code;
            this.tblUsersPhone2 = this.resultsUsersDetails[0].phone2;
            this.tblUsersPhone2_print = this.tblUsersPhone2;

            this.tblUsersPhone3InternationalCode = this.resultsUsersDetails[0].phone3_international_code;
            this.tblUsersPhone3AreaCode = this.resultsUsersDetails[0].phone3_area_code;
            this.tblUsersPhone3 = this.resultsUsersDetails[0].phone3;
            this.tblUsersPhone3_print = this.tblUsersPhone3;

            this.tblUsersUsername = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].username, "db");
            this.tblUsersEmail = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].email, "db");
            this.tblUsersPassword = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].password, "db");
            this.tblUsersPassword_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].password, "db"), 2);
            this.tblUsersPasswordHint = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].password_hint, "db");
            this.tblUsersPasswordLength = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].password_length, "db");
            
            if(gSystemConfig.enableUsersInfo1 == 1)
            {
                if(gSystemConfig.configUsersInfo1FieldType == 1 || gSystemConfig.configUsersInfo1FieldType == 2)
                {
                    this.tblUsersInfo1 = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info1, "db");
                    this.tblUsersInfo1_edit = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info1, "db");
                }

                //Encrypted.
                if(gSystemConfig.configUsersInfo1FieldType == 11 || gSystemConfig.configUsersInfo1FieldType == 12)
                {
                    this.tblUsersInfo1 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info1, "db"), 2);
                    this.tblUsersInfo1_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info1, "db"), 2);
                }
            }
            if(gSystemConfig.enableUsersInfo2 == 1)
            {
                if(gSystemConfig.configUsersInfo2FieldType == 1 || gSystemConfig.configUsersInfo2FieldType == 2)
                {
                    this.tblUsersInfo2 = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info2, "db");
                    this.tblUsersInfo2_edit = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info2, "db");
                }

                //Encrypted.
                if(gSystemConfig.configUsersInfo2FieldType == 11 || gSystemConfig.configUsersInfo2FieldType == 12)
                {
                    this.tblUsersInfo2 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info2, "db"), 2);
                    this.tblUsersInfo2_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info2, "db"), 2);
                }
            }
            if(gSystemConfig.enableUsersInfo3 == 1)
            {
                if(gSystemConfig.configUsersInfo3FieldType == 1 || gSystemConfig.configUsersInfo3FieldType == 2)
                {
                    this.tblUsersInfo3 = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info3, "db");
                    this.tblUsersInfo3_edit = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info3, "db");
                }

                //Encrypted.
                if(gSystemConfig.configUsersInfo3FieldType == 11 || gSystemConfig.configUsersInfo3FieldType == 12)
                {
                    this.tblUsersInfo3 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info3, "db"), 2);
                    this.tblUsersInfo3_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info3, "db"), 2);
                }
            }
            if(gSystemConfig.enableUsersInfo4 == 1)
            {
                if(gSystemConfig.configUsersInfo4FieldType == 1 || gSystemConfig.configUsersInfo4FieldType == 2)
                {
                    this.tblUsersInfo4 = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info4, "db");
                    this.tblUsersInfo4_edit = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info4, "db");
                }

                //Encrypted.
                if(gSystemConfig.configUsersInfo4FieldType == 11 || gSystemConfig.configUsersInfo4FieldType == 12)
                {
                    this.tblUsersInfo4 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info4, "db"), 2);
                    this.tblUsersInfo4_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info4, "db"), 2);
                }
            }
            if(gSystemConfig.enableUsersInfo5 == 1)
            {
                if(gSystemConfig.configUsersInfo5FieldType == 1 || gSystemConfig.configUsersInfo5FieldType == 2)
                {
                    this.tblUsersInfo5 = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info5, "db");
                    this.tblUsersInfo5_edit = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info5, "db");
                }

                //Encrypted.
                if(gSystemConfig.configUsersInfo5FieldType == 11 || gSystemConfig.configUsersInfo5FieldType == 12)
                {
                    this.tblUsersInfo5 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info5, "db"), 2);
                    this.tblUsersInfo5_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info5, "db"), 2);
                }
            }
            if(gSystemConfig.enableUsersInfo6 == 1)
            {
                if(gSystemConfig.configUsersInfo6FieldType == 1 || gSystemConfig.configUsersInfo6FieldType == 2)
                {
                    this.tblUsersInfo6 = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info6, "db");
                    this.tblUsersInfo6_edit = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info6, "db");
                }

                //Encrypted.
                if(gSystemConfig.configUsersInfo6FieldType == 11 || gSystemConfig.configUsersInfo6FieldType == 12)
                {
                    this.tblUsersInfo6 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info6, "db"), 2);
                    this.tblUsersInfo6_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info6, "db"), 2);
                }
            }
            if(gSystemConfig.enableUsersInfo7 == 1)
            {
                if(gSystemConfig.configUsersInfo7FieldType == 1 || gSystemConfig.configUsersInfo7FieldType == 2)
                {
                    this.tblUsersInfo7 = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info7, "db");
                    this.tblUsersInfo7_edit = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info7, "db");
                }

                //Encrypted.
                if(gSystemConfig.configUsersInfo7FieldType == 11 || gSystemConfig.configUsersInfo7FieldType == 12)
                {
                    this.tblUsersInfo7 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info7, "db"), 2);
                    this.tblUsersInfo7_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info7, "db"), 2);
                }
            }
            if(gSystemConfig.enableUsersInfo8 == 1)
            {
                if(gSystemConfig.configUsersInfo8FieldType == 1 || gSystemConfig.configUsersInfo8FieldType == 2)
                {
                    this.tblUsersInfo8 = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info8, "db");
                    this.tblUsersInfo8_edit = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info8, "db");
                }

                //Encrypted.
                if(gSystemConfig.configUsersInfo8FieldType == 11 || gSystemConfig.configUsersInfo8FieldType == 12)
                {
                    this.tblUsersInfo8 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info8, "db"), 2);
                    this.tblUsersInfo8_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info8, "db"), 2);
                }
            }
            if(gSystemConfig.enableUsersInfo9 == 1)
            {
                if(gSystemConfig.configUsersInfo9FieldType == 1 || gSystemConfig.configUsersInfo9FieldType == 2)
                {
                    this.tblUsersInfo9 = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info9, "db");
                    this.tblUsersInfo9_edit = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info9, "db");
                }

                //Encrypted.
                if(gSystemConfig.configUsersInfo9FieldType == 11 || gSystemConfig.configUsersInfo9FieldType == 12)
                {
                    this.tblUsersInfo9 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info9, "db"), 2);
                    this.tblUsersInfo9_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info9, "db"), 2);
                }
            }
            if(gSystemConfig.enableUsersInfo10 == 1)
            {
                if(gSystemConfig.configUsersInfo10FieldType == 1 || gSystemConfig.configUsersInfo10FieldType == 2)
                {
                    this.tblUsersInfo10 = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info10, "db");
                    this.tblUsersInfo10_edit = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info10, "db");
                }

                //Encrypted.
                if(gSystemConfig.configUsersInfo10FieldType == 11 || gSystemConfig.configUsersInfo10FieldType == 12)
                {
                    this.tblUsersInfo10 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info10, "db"), 2);
                    this.tblUsersInfo10_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].info10, "db"), 2);
                }
            }

            this.tblUsersImageMain = this.resultsUsersDetails[0].image_main;

            this.tblUsersActivation = this.resultsUsersDetails[0].activation;
            if(this.tblUsersActivation == 0)
            {
                this.tblUsersActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblUsersActivation == 1)
            {
                this.tblUsersActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblUsersActivation1 = this.resultsUsersDetails[0].activation1;
            if(this.tblUsersActivation1 == 0)
            {
                this.tblUsersActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblUsersActivation1 == 1)
            {
                this.tblUsersActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblUsersActivation2 = this.resultsUsersDetails[0].activation2;
            if(this.tblUsersActivation2 == 0)
            {
                this.tblUsersActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblUsersActivation2 == 1)
            {
                this.tblUsersActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblUsersActivation3 = this.resultsUsersDetails[0].activation3;
            if(this.tblUsersActivation3 == 0)
            {
                this.tblUsersActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblUsersActivation3 == 1)
            {
                this.tblUsersActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblUsersActivation4 = this.resultsUsersDetails[0].activation4;
            if(this.tblUsersActivation4 == 0)
            {
                this.tblUsersActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblUsersActivation4 == 1)
            {
                this.tblUsersActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblUsersActivation5 = this.resultsUsersDetails[0].activation5;
            if(this.tblUsersActivation5 == 0)
            {
                this.tblUsersActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblUsersActivation5 == 1)
            {
                this.tblUsersActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }

            this.tblUsersIdStatus = this.resultsUsersDetails[0].id_status;
            if(this.tblUsersIdStatus == 0)
            {
                this.tblUsersIdStatus_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDropDownSelectNone");
            }else{
                this.tblUsersIdStatus_print = FunctionsGeneric.contentMaskRead(await FunctionsDB.genericFieldGet01(this.tblUsersIdStatus, gSystemConfig.configSystemDBTableFiltersGeneric, "title"), "db");
            }

            this.tblUsersNotes = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].notes, "db");
            this.tblUsersNotes_edit = FunctionsGeneric.contentMaskRead(this.resultsUsersDetails[0].notes, "db");
    

            //Debug.
            //console.log("this.arrSearchParameters=", this.arrSearchParameters)
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.log(asyncError)
            }
        }finally{

        }
    }
    //**************************************************************************************
};