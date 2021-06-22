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


module.exports = class ObjectRegistersDetails
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
        this.idTbRegisters = (objParameters.hasOwnProperty("_idTbRegisters")) ? objParameters._idTbRegisters : 0;
        this.arrSearchParameters = (objParameters.hasOwnProperty("_arrSearchParameters")) ? objParameters._arrSearchParameters : [];
        
        this.terminal = (objParameters.hasOwnProperty("_terminal")) ? objParameters._terminal : 0;
        //terminal: 0 - backend | 1 - frontend
        this.labelPrefix = "backend";
        if(this.terminal == 1)
        {
            this.labelPrefix = "frontend";
        }

        this.objSpecialParameters = (objParameters.hasOwnProperty("_objSpecialParameters")) ? objParameters._objSpecialParameters : {};

        this.resultsRegistersDetails = "";


        this.tblRegistersID = "";
        this.tblRegistersIdParent = "";
        this.tblRegistersSortOrder = 0;
        this.tblRegistersSortOrder_print = "";

        this.tblRegistersDateCreation = ""; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
        this.tblRegistersDateTimezone = "";
        this.tblRegistersDateEdit = "";

        this.tblRegistersIdType = 0; 
        this.tblRegistersIdType_print = ""; 

        this.tblRegistersIdActivity = 0; 
        this.tblRegistersIdActivity_print = ""; 
        
        this.tblRegistersIdRegisterUser = 0;
        this.tblRegistersIdRegister1 = 0;
        this.tblRegistersIdRegister2 = 0;
        this.tblRegistersIdRegister3 = 0;
        this.tblRegistersIdRegister4 = 0;
        this.tblRegistersIdRegister5 = 0;

        this.tblRegistersType = 0;
        this.tblRegistersType_print = "";

        this.tblRegistersNameTitle = "";
        this.tblRegistersNameFull = "";
        this.tblRegistersNameFirst = "";
        this.tblRegistersNameLast = "";
    
        this.tblRegistersCompanyNameLegal = "";
        this.tblRegistersCompanyNameAlias = "";
    
        this.tblRegistersDescription = "";
        this.tblRegistersDescription_edit = "";

        this.tblRegistersURLAlias = "";
        this.tblRegistersKeywordsTags = "";
        this.tblRegistersMetaDescription = "";
        this.tblRegistersMetaDescription_edit = "";
        this.tblRegistersMetaTitle = "";
        this.tblRegistersMetaInfo = "";

        this.tblRegistersDateBirth = null;
        this.tblRegistersDateBirth_print = "";
        this.tblRegistersDateBirthDateObj = new Date();
        this.tblRegistersDateBirthDateYear, this.tblRegistersDateBirthDateDay, this.tblRegistersDateBirthDateMonth;
        this.tblRegistersDateBirthDateHour, this.tblRegistersDateBirthDateHour_print, this.tblRegistersDateBirthDateMinute, this.tblRegistersDateBirthDateMinute_print, this.tblRegistersDateBirthDateSecond, this.tblRegistersDateBirthDateSecond_print;
        
        this.tblRegistersGender = 0; 
        this.tblRegistersGender_print = "";

        this.tblRegistersHeight = 0;
        this.tblRegistersHeight_print = "";
        this.tblRegistersWeight = 0;
        this.tblRegistersWeight_print = "";

        this.tblRegistersDocumentType = 0;
        this.tblRegistersDocument = "";
        this.tblRegistersDocument1Type = 0;
        this.tblRegistersDocument1 = "";
        this.tblRegistersDocument2Type = 0;
        this.tblRegistersDocument2 = "";

        this.tblRegistersDocumentCompanyType = 0;
        this.tblRegistersDocumentCompany1 = "";
        this.tblRegistersDocumentCompany1Type = 0;
        this.tblRegistersDocumentCompany2 = "";
        this.tblRegistersDocumentCompany2Type = 0;
        this.tblRegistersDocumentCompany = "";

        this.tblRegistersZipCode = "";
        this.tblRegistersAddressStreet = "";
        this.tblRegistersAddressNumber = "";
        this.tblRegistersAddressComplement = "";
        this.tblRegistersNeighborhood = "";
        this.tblRegistersDistrict = "";
        this.tblRegistersCounty = "";
        this.tblRegistersCity = "";
        this.tblRegistersState = "";
        this.tblRegistersCountry = "";
    
        this.tblRegistersIdStreet = 0;
        this.tblRegistersIdNeighborhood = 0;
        this.tblRegistersIdDistrict = 0;
        this.tblRegistersIdCounty = 0;
        this.tblRegistersIdCity = 0;
        this.tblRegistersIdState = 0;
        this.tblRegistersIdCountry = 0;   
        
        this.tblRegistersLocationReference = "";
        this.tblRegistersLocationReference_edit = "";
        this.tblRegistersLocationMap = "";

        this.tblRegistersPhone1InternationalCode = "";
        this.tblRegistersPhone1AreaCode = "";
        this.tblRegistersPhone1 = "";
    
        this.tblRegistersPhone2InternationalCode = "";
        this.tblRegistersPhone2AreaCode = "";
        this.tblRegistersPhone2 = "";
    
        this.tblRegistersPhone3InternationalCode = "";
        this.tblRegistersPhone3AreaCode = "";
        this.tblRegistersPhone3 = "";
    
        this.tblRegistersWebsite = "";
    
        this.tblRegistersUsername = "";
        this.tblRegistersEmail = "";
        this.tblRegistersPassword = "";
        this.tblRegistersPasswordHint = "";
        this.tblRegistersPasswordLength = "";

        this.tblRegistersInfo1 = "";
        this.tblRegistersInfo1_edit = "";
        this.tblRegistersInfo2 = "";
        this.tblRegistersInfo2_edit = "";
        this.tblRegistersInfo3 = "";
        this.tblRegistersInfo3_edit = "";
        this.tblRegistersInfo4 = "";
        this.tblRegistersInfo4_edit = "";
        this.tblRegistersInfo5 = "";
        this.tblRegistersInfo5_edit = "";
        this.tblRegistersInfo6 = "";
        this.tblRegistersInfo6_edit = "";
        this.tblRegistersInfo7 = "";
        this.tblRegistersInfo7_edit = "";
        this.tblRegistersInfo8 = "";
        this.tblRegistersInfo8_edit = "";
        this.tblRegistersInfo9 = "";
        this.tblRegistersInfo9_edit = "";
        this.tblRegistersInfo10 = "";
        this.tblRegistersInfo10_edit = "";
        this.tblRegistersInfo11 = "";
        this.tblRegistersInfo11_edit = "";
        this.tblRegistersInfo12 = "";
        this.tblRegistersInfo12_edit = "";
        this.tblRegistersInfo13 = "";
        this.tblRegistersInfo13_edit = "";
        this.tblRegistersInfo14 = "";
        this.tblRegistersInfo14_edit = "";
        this.tblRegistersInfo15 = "";
        this.tblRegistersInfo15_edit = "";
        this.tblRegistersInfo16 = "";
        this.tblRegistersInfo16_edit = "";
        this.tblRegistersInfo17 = "";
        this.tblRegistersInfo17_edit = "";
        this.tblRegistersInfo18 = "";
        this.tblRegistersInfo18_edit = "";
        this.tblRegistersInfo19 = "";
        this.tblRegistersInfo19_edit = "";
        this.tblRegistersInfo20 = "";
        this.tblRegistersInfo20_edit = "";

        this.tblRegistersInfoSmall1 = "";
        this.tblRegistersInfoSmall1_edit = "";
        this.tblRegistersInfoSmall2 = "";
        this.tblRegistersInfoSmall2_edit = "";
        this.tblRegistersInfoSmall3 = "";
        this.tblRegistersInfoSmall3_edit = "";
        this.tblRegistersInfoSmall4 = "";
        this.tblRegistersInfoSmall4_edit = "";
        this.tblRegistersInfoSmall5 = "";
        this.tblRegistersInfoSmall5_edit = "";
        this.tblRegistersInfoSmall6 = "";
        this.tblRegistersInfoSmall6_edit = "";
        this.tblRegistersInfoSmall7 = "";
        this.tblRegistersInfoSmall7_edit = "";
        this.tblRegistersInfoSmall8 = "";
        this.tblRegistersInfoSmall8_edit = "";
        this.tblRegistersInfoSmall9 = "";
        this.tblRegistersInfoSmall9_edit = "";
        this.tblRegistersInfoSmall10 = "";
        this.tblRegistersInfoSmall10_edit = "";
        this.tblRegistersInfoSmall11 = "";
        this.tblRegistersInfoSmall11_edit = "";
        this.tblRegistersInfoSmall12 = "";
        this.tblRegistersInfoSmall12_edit = "";
        this.tblRegistersInfoSmall13 = "";
        this.tblRegistersInfoSmall13_edit = "";
        this.tblRegistersInfoSmall14 = "";
        this.tblRegistersInfoSmall14_edit = "";
        this.tblRegistersInfoSmall15 = "";
        this.tblRegistersInfoSmall15_edit = "";
        this.tblRegistersInfoSmall16 = "";
        this.tblRegistersInfoSmall16_edit = "";
        this.tblRegistersInfoSmall17 = "";
        this.tblRegistersInfoSmall17_edit = "";
        this.tblRegistersInfoSmall18 = "";
        this.tblRegistersInfoSmall18_edit = "";
        this.tblRegistersInfoSmall19 = "";
        this.tblRegistersInfoSmall19_edit = "";
        this.tblRegistersInfoSmall20 = "";
        this.tblRegistersInfoSmall20_edit = "";
        this.tblRegistersInfoSmall21 = "";
        this.tblRegistersInfoSmall21_edit = "";
        this.tblRegistersInfoSmall22 = "";
        this.tblRegistersInfoSmall22_edit = "";
        this.tblRegistersInfoSmall23 = "";
        this.tblRegistersInfoSmall23_edit = "";
        this.tblRegistersInfoSmall24 = "";
        this.tblRegistersInfoSmall24_edit = "";
        this.tblRegistersInfoSmall25 = "";
        this.tblRegistersInfoSmall25_edit = "";
        this.tblRegistersInfoSmall26 = "";
        this.tblRegistersInfoSmall26_edit = "";
        this.tblRegistersInfoSmall27 = "";
        this.tblRegistersInfoSmall27_edit = "";
        this.tblRegistersInfoSmall28 = "";
        this.tblRegistersInfoSmall28_edit = "";
        this.tblRegistersInfoSmall29 = "";
        this.tblRegistersInfoSmall29_edit = "";
        this.tblRegistersInfoSmall30 = "";
        this.tblRegistersInfoSmall30_edit = "";

        this.tblRegistersNumber1 = 0;
        this.tblRegistersNumber1_print = "";
        this.tblRegistersNumber2 = 0;
        this.tblRegistersNumber2_print = "";
        this.tblRegistersNumber3 = 0;
        this.tblRegistersNumber3_print = "";
        this.tblRegistersNumber4 = 0;
        this.tblRegistersNumber4_print = "";
        this.tblRegistersNumber5 = 0;
        this.tblRegistersNumber5_print = "";
    
        this.tblRegistersNumberSmall1 = 0;
        this.tblRegistersNumberSmall1_print = "";
        this.tblRegistersNumberSmall2 = 0;
        this.tblRegistersNumberSmall2_print = "";
        this.tblRegistersNumberSmall3 = 0;
        this.tblRegistersNumberSmall3_print = "";
        this.tblRegistersNumberSmall4 = 0;
        this.tblRegistersNumberSmall4_print = "";
        this.tblRegistersNumberSmall5 = 0;
        this.tblRegistersNumberSmall5_print = "";

        this.tblRegistersURL1 = "";
        this.tblRegistersURL1_edit = "";
        this.tblRegistersURL2 = "";
        this.tblRegistersURL2_edit = "";
        this.tblRegistersURL3 = "";
        this.tblRegistersURL3_edit = "";
        this.tblRegistersURL4 = "";
        this.tblRegistersURL4_edit = "";
        this.tblRegistersURL5 = "";
        this.tblRegistersURL5_edit = "";
    
        this.tblRegistersDate1 = null;
        this.tblRegistersDate1_print = "";
        this.tblRegistersDate1DateObj = new Date();
        this.tblRegistersDate1DateYear, this.tblRegistersDate1DateDay, this.tblRegistersDate1DateMonth;
        this.tblRegistersDate1DateHour, this.tblRegistersDate1DateHour_print, this.tblRegistersDate1DateMinute, this.tblRegistersDate1DateMinute_print, this.tblRegistersDate1DateSecond, this.tblRegistersDate1DateSecond_print;

        this.tblRegistersDate2 = null;
        this.tblRegistersDate2_print = "";
        this.tblRegistersDate2DateObj = new Date();
        this.tblRegistersDate2DateYear, this.tblRegistersDate2DateDay, this.tblRegistersDate2DateMonth;
        this.tblRegistersDate2DateHour, this.tblRegistersDate2DateHour_print, this.tblRegistersDate2DateMinute, this.tblRegistersDate2DateMinute_print, this.tblRegistersDate2DateSecond, this.tblRegistersDate2DateSecond_print;

        this.tblRegistersDate3 = null;
        this.tblRegistersDate3_print = "";
        this.tblRegistersDate3DateObj = new Date();
        this.tblRegistersDate3DateYear, this.tblRegistersDate3DateDay, this.tblRegistersDate3DateMonth;
        this.tblRegistersDate3DateHour, this.tblRegistersDate3DateHour_print, this.tblRegistersDate3DateMinute, this.tblRegistersDate3DateMinute_print, this.tblRegistersDate3DateSecond, this.tblRegistersDate3DateSecond_print;

        this.tblRegistersDate4 = null;
        this.tblRegistersDate4_print = "";
        this.tblRegistersDate4DateObj = new Date();
        this.tblRegistersDate4DateYear, this.tblRegistersDate4DateDay, this.tblRegistersDate4DateMonth;
        this.tblRegistersDate4DateHour, this.tblRegistersDate4DateHour_print, this.tblRegistersDate4DateMinute, this.tblRegistersDate4DateMinute_print, this.tblRegistersDate4DateSecond, this.tblRegistersDate4DateSecond_print;

        this.tblRegistersDate5 = null;
        this.tblRegistersDate5_print = "";
        this.tblRegistersDate5DateObj = new Date();
        this.tblRegistersDate5DateYear, this.tblRegistersDate5DateDay, this.tblRegistersDate5DateMonth;
        this.tblRegistersDate5DateHour, this.tblRegistersDate5DateHour_print, this.tblRegistersDate5DateMinute, this.tblRegistersDate5DateMinute_print, this.tblRegistersDate5DateSecond, this.tblRegistersDate5DateSecond_print;

        this.tblRegistersDate6 = null;
        this.tblRegistersDate6_print = "";
        this.tblRegistersDate6DateObj = new Date();
        this.tblRegistersDate6DateYear, this.tblRegistersDate6DateDay, this.tblRegistersDate6DateMonth;
        this.tblRegistersDate6DateHour, this.tblRegistersDate6DateHour_print, this.tblRegistersDate6DateMinute, this.tblRegistersDate6DateMinute_print, this.tblRegistersDate6DateSecond, this.tblRegistersDate6DateSecond_print;

        this.tblRegistersDate7 = null;
        this.tblRegistersDate7_print = "";
        this.tblRegistersDate7DateObj = new Date();
        this.tblRegistersDate7DateYear, this.tblRegistersDate7DateDay, this.tblRegistersDate7DateMonth;
        this.tblRegistersDate7DateHour, this.tblRegistersDate7DateHour_print, this.tblRegistersDate7DateMinute, this.tblRegistersDate7DateMinute_print, this.tblRegistersDate7DateSecond, this.tblRegistersDate7DateSecond_print;

        this.tblRegistersDate8 = null;
        this.tblRegistersDate8_print = "";
        this.tblRegistersDate8DateObj = new Date();
        this.tblRegistersDate8DateYear, this.tblRegistersDate8DateDay, this.tblRegistersDate8DateMonth;
        this.tblRegistersDate8DateHour, this.tblRegistersDate8DateHour_print, this.tblRegistersDate8DateMinute, this.tblRegistersDate8DateMinute_print, this.tblRegistersDate8DateSecond, this.tblRegistersDate8DateSecond_print;

        this.tblRegistersDate9 = null;
        this.tblRegistersDate9_print = "";
        this.tblRegistersDate9DateObj = new Date();
        this.tblRegistersDate9DateYear, this.tblRegistersDate9DateDay, this.tblRegistersDate9DateMonth;
        this.tblRegistersDate9DateHour, this.tblRegistersDate9DateHour_print, this.tblRegistersDate9DateMinute, this.tblRegistersDate9DateMinute_print, this.tblRegistersDate9DateSecond, this.tblRegistersDate9DateSecond_print;

        this.tblRegistersDate10 = null;
        this.tblRegistersDate10_print = "";
        this.tblRegistersDate10DateObj = new Date();
        this.tblRegistersDate10DateYear, this.tblRegistersDate10DateDay, this.tblRegistersDate10DateMonth;
        this.tblRegistersDate10DateHour, this.tblRegistersDate10DateHour_print, this.tblRegistersDate10DateMinute, this.tblRegistersDate10DateMinute_print, this.tblRegistersDate10DateSecond, this.tblRegistersDate10DateSecond_print;
        
        this.tblRegistersImageMain = "";
        this.tblRegistersImageMainCaption = "";
        this.tblRegistersImageLogo = "";
        this.tblRegistersImageBanner = "";
        
        this.tblRegistersFile1 = "";
        this.tblRegistersFile2 = "";
        this.tblRegistersFile3 = "";
        this.tblRegistersFile4 = "";
        this.tblRegistersFile5 = "";

        this.tblRegistersActivation = 1;
        this.tblRegistersActivation_print = "";
        this.tblRegistersActivation1 = 0;
        this.tblRegistersActivation1_print = "";
        this.tblRegistersActivation2 = 0;
        this.tblRegistersActivation2_print = "";
        this.tblRegistersActivation3 = 0;
        this.tblRegistersActivation3_print = "";
        this.tblRegistersActivation4 = 0;
        this.tblRegistersActivation4_print = "";
        this.tblRegistersActivation5 = 0;
        this.tblRegistersActivation5_print = "";

        this.tblRegistersIdStatus = 0;
        this.tblRegistersIdStatus_print = "";

        this.tblRegistersRestrictedAccess = 0;
        this.tblRegistersRestrictedAccess_print = "";

        this.tblRegistersNotes = "";
        this.tblRegistersNotes_edit = "";

        this.ofglRecords;

        this.arrIdsRegistersFiltersGeneric1 = [];
        this.arrIdsRegistersFiltersGeneric2 = [];
        this.arrIdsRegistersFiltersGeneric3 = [];
        this.arrIdsRegistersFiltersGeneric4 = [];
        this.arrIdsRegistersFiltersGeneric5 = [];
        this.arrIdsRegistersFiltersGeneric6 = [];
        this.arrIdsRegistersFiltersGeneric7 = [];
        this.arrIdsRegistersFiltersGeneric8 = [];
        this.arrIdsRegistersFiltersGeneric9 = [];
        this.arrIdsRegistersFiltersGeneric10 = [];
        this.arrIdsRegistersFiltersGeneric11 = [];
        this.arrIdsRegistersFiltersGeneric12 = [];
        this.arrIdsRegistersFiltersGeneric13 = [];
        this.arrIdsRegistersFiltersGeneric14 = [];
        this.arrIdsRegistersFiltersGeneric15 = [];
        this.arrIdsRegistersFiltersGeneric16 = [];
        this.arrIdsRegistersFiltersGeneric17 = [];
        this.arrIdsRegistersFiltersGeneric18 = [];
        this.arrIdsRegistersFiltersGeneric19 = [];
        this.arrIdsRegistersFiltersGeneric20 = [];
        this.arrIdsRegistersFiltersGeneric21 = [];
        this.arrIdsRegistersFiltersGeneric22 = [];
        this.arrIdsRegistersFiltersGeneric23 = [];
        this.arrIdsRegistersFiltersGeneric24 = [];
        this.arrIdsRegistersFiltersGeneric25 = [];
        this.arrIdsRegistersFiltersGeneric26 = [];
        this.arrIdsRegistersFiltersGeneric27 = [];
        this.arrIdsRegistersFiltersGeneric28 = [];
        this.arrIdsRegistersFiltersGeneric29 = [];
        this.arrIdsRegistersFiltersGeneric30 = [];
        this.arrIdsRegistersFiltersGeneric31 = [];
        this.arrIdsRegistersFiltersGeneric32 = [];
        this.arrIdsRegistersFiltersGeneric33 = [];
        this.arrIdsRegistersFiltersGeneric34 = [];
        this.arrIdsRegistersFiltersGeneric35 = [];
        this.arrIdsRegistersFiltersGeneric36 = [];
        this.arrIdsRegistersFiltersGeneric37 = [];
        this.arrIdsRegistersFiltersGeneric38 = [];
        this.arrIdsRegistersFiltersGeneric39 = [];
        this.arrIdsRegistersFiltersGeneric40 = [];

        this.objIdsRegistersFiltersGenericBinding;

        this.objIdsRegistersFiltersGeneric1Binding;
        this.objIdsRegistersFiltersGeneric2Binding;
        this.objIdsRegistersFiltersGeneric3Binding;
        this.objIdsRegistersFiltersGeneric4Binding;
        this.objIdsRegistersFiltersGeneric5Binding;
        this.objIdsRegistersFiltersGeneric6Binding;
        this.objIdsRegistersFiltersGeneric7Binding;
        this.objIdsRegistersFiltersGeneric8Binding;
        this.objIdsRegistersFiltersGeneric9Binding;
        this.objIdsRegistersFiltersGeneric10Binding;
        this.objIdsRegistersFiltersGeneric11Binding;
        this.objIdsRegistersFiltersGeneric12Binding;
        this.objIdsRegistersFiltersGeneric13Binding;
        this.objIdsRegistersFiltersGeneric14Binding;
        this.objIdsRegistersFiltersGeneric15Binding;
        this.objIdsRegistersFiltersGeneric16Binding;
        this.objIdsRegistersFiltersGeneric17Binding;
        this.objIdsRegistersFiltersGeneric18Binding;
        this.objIdsRegistersFiltersGeneric19Binding;
        this.objIdsRegistersFiltersGeneric20Binding;
        this.objIdsRegistersFiltersGeneric21Binding;
        this.objIdsRegistersFiltersGeneric22Binding;
        this.objIdsRegistersFiltersGeneric23Binding;
        this.objIdsRegistersFiltersGeneric24Binding;
        this.objIdsRegistersFiltersGeneric25Binding;
        this.objIdsRegistersFiltersGeneric26Binding;
        this.objIdsRegistersFiltersGeneric27Binding;
        this.objIdsRegistersFiltersGeneric28Binding;
        this.objIdsRegistersFiltersGeneric29Binding;
        this.objIdsRegistersFiltersGeneric30Binding;
        this.objIdsRegistersFiltersGeneric31Binding;
        this.objIdsRegistersFiltersGeneric32Binding;
        this.objIdsRegistersFiltersGeneric33Binding;
        this.objIdsRegistersFiltersGeneric34Binding;
        this.objIdsRegistersFiltersGeneric35Binding;
        this.objIdsRegistersFiltersGeneric36Binding;
        this.objIdsRegistersFiltersGeneric37Binding;
        this.objIdsRegistersFiltersGeneric38Binding;
        this.objIdsRegistersFiltersGeneric39Binding;
        this.objIdsRegistersFiltersGeneric40Binding;

        this.objRegistersFiltersGeneric1Binding_print;
        this.objRegistersFiltersGeneric2Binding_print;
        this.objRegistersFiltersGeneric3Binding_print;
        this.objRegistersFiltersGeneric4Binding_print;
        this.objRegistersFiltersGeneric5Binding_print;
        this.objRegistersFiltersGeneric6Binding_print;
        this.objRegistersFiltersGeneric7Binding_print;
        this.objRegistersFiltersGeneric8Binding_print;
        this.objRegistersFiltersGeneric9Binding_print;
        this.objRegistersFiltersGeneric10Binding_print;
        this.objRegistersFiltersGeneric11Binding_print;
        this.objRegistersFiltersGeneric12Binding_print;
        this.objRegistersFiltersGeneric13Binding_print;
        this.objRegistersFiltersGeneric14Binding_print;
        this.objRegistersFiltersGeneric15Binding_print;
        this.objRegistersFiltersGeneric16Binding_print;
        this.objRegistersFiltersGeneric17Binding_print;
        this.objRegistersFiltersGeneric18Binding_print;
        this.objRegistersFiltersGeneric19Binding_print;
        this.objRegistersFiltersGeneric20Binding_print;
        this.objRegistersFiltersGeneric21Binding_print;
        this.objRegistersFiltersGeneric22Binding_print;
        this.objRegistersFiltersGeneric23Binding_print;
        this.objRegistersFiltersGeneric24Binding_print;
        this.objRegistersFiltersGeneric25Binding_print;
        this.objRegistersFiltersGeneric26Binding_print;
        this.objRegistersFiltersGeneric27Binding_print;
        this.objRegistersFiltersGeneric28Binding_print;
        this.objRegistersFiltersGeneric29Binding_print;
        this.objRegistersFiltersGeneric30Binding_print;
        this.objRegistersFiltersGeneric31Binding_print;
        this.objRegistersFiltersGeneric32Binding_print;
        this.objRegistersFiltersGeneric33Binding_print;
        this.objRegistersFiltersGeneric34Binding_print;
        this.objRegistersFiltersGeneric35Binding_print;
        this.objRegistersFiltersGeneric36Binding_print;
        this.objRegistersFiltersGeneric37Binding_print;
        this.objRegistersFiltersGeneric38Binding_print;
        this.objRegistersFiltersGeneric39Binding_print;
        this.objRegistersFiltersGeneric40Binding_print;

        this.arrIdsRegistersFiltersGeneric1Binding = [];
        this.arrIdsRegistersFiltersGeneric2Binding = [];
        this.arrIdsRegistersFiltersGeneric3Binding = [];
        this.arrIdsRegistersFiltersGeneric4Binding = [];
        this.arrIdsRegistersFiltersGeneric5Binding = [];
        this.arrIdsRegistersFiltersGeneric6Binding = [];
        this.arrIdsRegistersFiltersGeneric7Binding = [];
        this.arrIdsRegistersFiltersGeneric8Binding = [];
        this.arrIdsRegistersFiltersGeneric9Binding = [];
        this.arrIdsRegistersFiltersGeneric10Binding = [];
        this.arrIdsRegistersFiltersGeneric11Binding = [];
        this.arrIdsRegistersFiltersGeneric12Binding = [];
        this.arrIdsRegistersFiltersGeneric13Binding = [];
        this.arrIdsRegistersFiltersGeneric14Binding = [];
        this.arrIdsRegistersFiltersGeneric15Binding = [];
        this.arrIdsRegistersFiltersGeneric16Binding = [];
        this.arrIdsRegistersFiltersGeneric17Binding = [];
        this.arrIdsRegistersFiltersGeneric18Binding = [];
        this.arrIdsRegistersFiltersGeneric19Binding = [];
        this.arrIdsRegistersFiltersGeneric20Binding = [];
        this.arrIdsRegistersFiltersGeneric21Binding = [];
        this.arrIdsRegistersFiltersGeneric22Binding = [];
        this.arrIdsRegistersFiltersGeneric23Binding = [];
        this.arrIdsRegistersFiltersGeneric24Binding = [];
        this.arrIdsRegistersFiltersGeneric25Binding = [];
        this.arrIdsRegistersFiltersGeneric26Binding = [];
        this.arrIdsRegistersFiltersGeneric27Binding = [];
        this.arrIdsRegistersFiltersGeneric28Binding = [];
        this.arrIdsRegistersFiltersGeneric29Binding = [];
        this.arrIdsRegistersFiltersGeneric30Binding = [];
        this.arrIdsRegistersFiltersGeneric31Binding = [];
        this.arrIdsRegistersFiltersGeneric32Binding = [];
        this.arrIdsRegistersFiltersGeneric33Binding = [];
        this.arrIdsRegistersFiltersGeneric34Binding = [];
        this.arrIdsRegistersFiltersGeneric35Binding = [];
        this.arrIdsRegistersFiltersGeneric36Binding = [];
        this.arrIdsRegistersFiltersGeneric37Binding = [];
        this.arrIdsRegistersFiltersGeneric38Binding = [];
        this.arrIdsRegistersFiltersGeneric39Binding = [];
        this.arrIdsRegistersFiltersGeneric40Binding = [];
        //----------------------
    }
    //**************************************************************************************


    //Initiate class mathod.
    //**************************************************************************************
    async build()
    {
        //objectCategoriesListingDebug.recordsListingGet(0, 3); //attention on this line - it wasn´t commented before
        return new ObjectRegistersDetails();
    }
    //**************************************************************************************


    //Get register details according to search parameters.
    //**************************************************************************************
    //async recordsListingGet(idParent = null, terminal = 0, returnType = 1)
    /**
     * Get register details according to search parameters.
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
            this.resultsRegistersDetails = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableRegisters, 
                                                                                this.arrSearchParameters, 
                                                                                "", 
                                                                                "", 
                                                                                FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableRegisters, "all", "string"), 
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
            this.objIdsRegistersFiltersGenericBinding = await FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableFiltersGenericBinding, 
                                                                                            ["id_record;" + this.idTbRegisters + ";i"], 
                                                                                            "", 
                                                                                            "", 
                                                                                            FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiltersGenericBinding, "all", "string"), 
                                                                                            1, 
                                                                                            {returnType: 3});

            //Filters generic - separation.                                                                                
            if(gSystemConfig.enableRegistersFilterGeneric1 != 0)
            {
                this.objIdsRegistersFiltersGeneric1Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 101;
                });

                if(this.objIdsRegistersFiltersGeneric1Binding)
                {
                    this.arrIdsRegistersFiltersGeneric1Binding = Object.keys(this.objIdsRegistersFiltersGeneric1Binding).map(key => this.objIdsRegistersFiltersGeneric1Binding[key]["id_filters_generic"]);
                    //this.arrIdsRegistersFiltersGeneric1Binding = Object.keys(this.objIdsRegistersFiltersGeneric1Binding).map(key => this.objIdsRegistersFiltersGeneric1Binding[key]["id_filters_generic"].toStrign());


                    if(this.arrIdsRegistersFiltersGeneric1Binding)
                    {
                        var arrIdsRegistersFiltersGeneric1Binding = this.arrIdsRegistersFiltersGeneric1Binding;
                        this.objRegistersFiltersGeneric1Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            //return obj.filter_index == 101;

                            //for(let countArray = 0; countArray < this.arrIdsRegistersFiltersGeneric1Binding.length; countArray++)
                            /*for(let countArray = 0; countArray < arrIdsRegistersFiltersGeneric1Binding.length; countArray++)
                            {
                                return obj.id == arrIdsRegistersFiltersGeneric1Binding[countArray];
                            }*/
                            //return obj.id.includes(arrIdsRegistersFiltersGeneric1Binding);
                            //return this.arrIdsRegistersFiltersGeneric1Binding.includes(obj.id);
                            return arrIdsRegistersFiltersGeneric1Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric2 != 0)
            {
                this.objIdsRegistersFiltersGeneric2Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 102;
                });

                if(this.objIdsRegistersFiltersGeneric2Binding)
                {
                    this.arrIdsRegistersFiltersGeneric2Binding = Object.keys(this.objIdsRegistersFiltersGeneric2Binding).map(key => this.objIdsRegistersFiltersGeneric2Binding[key]["id_filters_generic"]);


                    if(this.arrIdsRegistersFiltersGeneric2Binding)
                    {
                        var arrIdsRegistersFiltersGeneric2Binding = this.arrIdsRegistersFiltersGeneric2Binding;

                        this.objRegistersFiltersGeneric2Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric2Binding.includes(obj.id);
                        });
                    }
                }
            }    

            if(gSystemConfig.enableRegistersFilterGeneric3 != 0)
            {
                this.objIdsRegistersFiltersGeneric3Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 103;
                });

                if(this.objIdsRegistersFiltersGeneric3Binding)
                {
                    this.arrIdsRegistersFiltersGeneric3Binding = Object.keys(this.objIdsRegistersFiltersGeneric3Binding).map(key => this.objIdsRegistersFiltersGeneric3Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric3Binding)
                    {
                        var arrIdsRegistersFiltersGeneric3Binding = this.arrIdsRegistersFiltersGeneric3Binding;

                        this.objRegistersFiltersGeneric3Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric3Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric4 != 0)
            {
                this.objIdsRegistersFiltersGeneric4Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 104;
                });

                if(this.objIdsRegistersFiltersGeneric4Binding)
                {
                    this.arrIdsRegistersFiltersGeneric4Binding = Object.keys(this.objIdsRegistersFiltersGeneric4Binding).map(key => this.objIdsRegistersFiltersGeneric4Binding[key]["id_filters_generic"]);


                    if(this.arrIdsRegistersFiltersGeneric4Binding)
                    {
                        var arrIdsRegistersFiltersGeneric4Binding = this.arrIdsRegistersFiltersGeneric4Binding;

                        this.objRegistersFiltersGeneric4Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric4Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric5 != 0)
            {
                this.objIdsRegistersFiltersGeneric5Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 105;
                });

                if(this.objIdsRegistersFiltersGeneric5Binding)
                {
                    this.arrIdsRegistersFiltersGeneric5Binding = Object.keys(this.objIdsRegistersFiltersGeneric5Binding).map(key => this.objIdsRegistersFiltersGeneric5Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric5Binding)
                    {
                        var arrIdsRegistersFiltersGeneric5Binding = this.arrIdsRegistersFiltersGeneric5Binding;

                        this.objRegistersFiltersGeneric5Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric5Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric6 != 0)
            {
                this.objIdsRegistersFiltersGeneric6Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 106;
                });

                if(this.objIdsRegistersFiltersGeneric6Binding)
                {
                    this.arrIdsRegistersFiltersGeneric6Binding = Object.keys(this.objIdsRegistersFiltersGeneric6Binding).map(key => this.objIdsRegistersFiltersGeneric6Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric6Binding)
                    {
                        var arrIdsRegistersFiltersGeneric6Binding = this.arrIdsRegistersFiltersGeneric6Binding;

                        this.objRegistersFiltersGeneric6Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric6Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric7 != 0)
            {
                this.objIdsRegistersFiltersGeneric7Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 107;
                });

                if(this.objIdsRegistersFiltersGeneric7Binding)
                {
                    this.arrIdsRegistersFiltersGeneric7Binding = Object.keys(this.objIdsRegistersFiltersGeneric7Binding).map(key => this.objIdsRegistersFiltersGeneric7Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric7Binding)
                    {
                        var arrIdsRegistersFiltersGeneric7Binding = this.arrIdsRegistersFiltersGeneric7Binding;

                        this.objRegistersFiltersGeneric7Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric7Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric8 != 0)
            {
                this.objIdsRegistersFiltersGeneric8Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 108;
                });

                if(this.objIdsRegistersFiltersGeneric8Binding)
                {
                    this.arrIdsRegistersFiltersGeneric8Binding = Object.keys(this.objIdsRegistersFiltersGeneric8Binding).map(key => this.objIdsRegistersFiltersGeneric8Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric8Binding)
                    {
                        var arrIdsRegistersFiltersGeneric8Binding = this.arrIdsRegistersFiltersGeneric8Binding;

                        this.objRegistersFiltersGeneric8Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric8Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric9 != 0)
            {
                this.objIdsRegistersFiltersGeneric9Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 109;
                });

                if(this.objIdsRegistersFiltersGeneric9Binding)
                {
                    this.arrIdsRegistersFiltersGeneric9Binding = Object.keys(this.objIdsRegistersFiltersGeneric9Binding).map(key => this.objIdsRegistersFiltersGeneric9Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric9Binding)
                    {
                        var arrIdsRegistersFiltersGeneric9Binding = this.arrIdsRegistersFiltersGeneric9Binding;

                        this.objRegistersFiltersGeneric9Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric9Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric10 != 0)
            {
                this.objIdsRegistersFiltersGeneric10Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 110;
                });

                if(this.objIdsRegistersFiltersGeneric10Binding)
                {
                    this.arrIdsRegistersFiltersGeneric10Binding = Object.keys(this.objIdsRegistersFiltersGeneric10Binding).map(key => this.objIdsRegistersFiltersGeneric10Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric10Binding)
                    {
                        var arrIdsRegistersFiltersGeneric10Binding = this.arrIdsRegistersFiltersGeneric10Binding;

                        this.objRegistersFiltersGeneric10Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric10Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric11 != 0)
            {
                this.objIdsRegistersFiltersGeneric11Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 111;
                });

                if(this.objIdsRegistersFiltersGeneric11Binding)
                {
                    this.arrIdsRegistersFiltersGeneric11Binding = Object.keys(this.objIdsRegistersFiltersGeneric11Binding).map(key => this.objIdsRegistersFiltersGeneric11Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric11Binding)
                    {
                        var arrIdsRegistersFiltersGeneric11Binding = this.arrIdsRegistersFiltersGeneric11Binding;
                        this.objRegistersFiltersGeneric11Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric11Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric12 != 0)
            {
                this.objIdsRegistersFiltersGeneric12Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 112;
                });

                if(this.objIdsRegistersFiltersGeneric12Binding)
                {
                    this.arrIdsRegistersFiltersGeneric12Binding = Object.keys(this.objIdsRegistersFiltersGeneric12Binding).map(key => this.objIdsRegistersFiltersGeneric12Binding[key]["id_filters_generic"]);


                    if(this.arrIdsRegistersFiltersGeneric12Binding)
                    {
                        var arrIdsRegistersFiltersGeneric12Binding = this.arrIdsRegistersFiltersGeneric12Binding;

                        this.objRegistersFiltersGeneric12Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric12Binding.includes(obj.id);
                        });
                    }
                }
            }    

            if(gSystemConfig.enableRegistersFilterGeneric13 != 0)
            {
                this.objIdsRegistersFiltersGeneric13Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 113;
                });

                if(this.objIdsRegistersFiltersGeneric13Binding)
                {
                    this.arrIdsRegistersFiltersGeneric13Binding = Object.keys(this.objIdsRegistersFiltersGeneric13Binding).map(key => this.objIdsRegistersFiltersGeneric13Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric13Binding)
                    {
                        var arrIdsRegistersFiltersGeneric13Binding = this.arrIdsRegistersFiltersGeneric13Binding;

                        this.objRegistersFiltersGeneric13Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric13Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric14 != 0)
            {
                this.objIdsRegistersFiltersGeneric14Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 114;
                });

                if(this.objIdsRegistersFiltersGeneric14Binding)
                {
                    this.arrIdsRegistersFiltersGeneric14Binding = Object.keys(this.objIdsRegistersFiltersGeneric14Binding).map(key => this.objIdsRegistersFiltersGeneric14Binding[key]["id_filters_generic"]);


                    if(this.arrIdsRegistersFiltersGeneric14Binding)
                    {
                        var arrIdsRegistersFiltersGeneric14Binding = this.arrIdsRegistersFiltersGeneric14Binding;

                        this.objRegistersFiltersGeneric14Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric14Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric15 != 0)
            {
                this.objIdsRegistersFiltersGeneric15Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 115;
                });

                if(this.objIdsRegistersFiltersGeneric15Binding)
                {
                    this.arrIdsRegistersFiltersGeneric15Binding = Object.keys(this.objIdsRegistersFiltersGeneric15Binding).map(key => this.objIdsRegistersFiltersGeneric15Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric15Binding)
                    {
                        var arrIdsRegistersFiltersGeneric15Binding = this.arrIdsRegistersFiltersGeneric15Binding;

                        this.objRegistersFiltersGeneric15Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric15Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric16 != 0)
            {
                this.objIdsRegistersFiltersGeneric16Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 116;
                });

                if(this.objIdsRegistersFiltersGeneric16Binding)
                {
                    this.arrIdsRegistersFiltersGeneric16Binding = Object.keys(this.objIdsRegistersFiltersGeneric16Binding).map(key => this.objIdsRegistersFiltersGeneric16Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric16Binding)
                    {
                        var arrIdsRegistersFiltersGeneric16Binding = this.arrIdsRegistersFiltersGeneric16Binding;

                        this.objRegistersFiltersGeneric16Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric16Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric17 != 0)
            {
                this.objIdsRegistersFiltersGeneric17Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 117;
                });

                if(this.objIdsRegistersFiltersGeneric17Binding)
                {
                    this.arrIdsRegistersFiltersGeneric17Binding = Object.keys(this.objIdsRegistersFiltersGeneric17Binding).map(key => this.objIdsRegistersFiltersGeneric17Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric17Binding)
                    {
                        var arrIdsRegistersFiltersGeneric17Binding = this.arrIdsRegistersFiltersGeneric17Binding;

                        this.objRegistersFiltersGeneric17Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric17Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric18 != 0)
            {
                this.objIdsRegistersFiltersGeneric18Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 118;
                });

                if(this.objIdsRegistersFiltersGeneric18Binding)
                {
                    this.arrIdsRegistersFiltersGeneric18Binding = Object.keys(this.objIdsRegistersFiltersGeneric18Binding).map(key => this.objIdsRegistersFiltersGeneric18Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric18Binding)
                    {
                        var arrIdsRegistersFiltersGeneric18Binding = this.arrIdsRegistersFiltersGeneric18Binding;

                        this.objRegistersFiltersGeneric18Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric18Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric19 != 0)
            {
                this.objIdsRegistersFiltersGeneric19Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 119;
                });

                if(this.objIdsRegistersFiltersGeneric19Binding)
                {
                    this.arrIdsRegistersFiltersGeneric19Binding = Object.keys(this.objIdsRegistersFiltersGeneric19Binding).map(key => this.objIdsRegistersFiltersGeneric19Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric19Binding)
                    {
                        var arrIdsRegistersFiltersGeneric19Binding = this.arrIdsRegistersFiltersGeneric19Binding;

                        this.objRegistersFiltersGeneric19Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric19Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric20 != 0)
            {
                this.objIdsRegistersFiltersGeneric20Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 120;
                });

                if(this.objIdsRegistersFiltersGeneric20Binding)
                {
                    this.arrIdsRegistersFiltersGeneric20Binding = Object.keys(this.objIdsRegistersFiltersGeneric20Binding).map(key => this.objIdsRegistersFiltersGeneric20Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric20Binding)
                    {
                        var arrIdsRegistersFiltersGeneric20Binding = this.arrIdsRegistersFiltersGeneric20Binding;

                        this.objRegistersFiltersGeneric20Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric20Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric21 != 0)
            {
                this.objIdsRegistersFiltersGeneric21Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 121;
                });

                if(this.objIdsRegistersFiltersGeneric21Binding)
                {
                    this.arrIdsRegistersFiltersGeneric21Binding = Object.keys(this.objIdsRegistersFiltersGeneric21Binding).map(key => this.objIdsRegistersFiltersGeneric21Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric21Binding)
                    {
                        var arrIdsRegistersFiltersGeneric21Binding = this.arrIdsRegistersFiltersGeneric21Binding;
                        this.objRegistersFiltersGeneric21Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric21Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric22 != 0)
            {
                this.objIdsRegistersFiltersGeneric22Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 122;
                });

                if(this.objIdsRegistersFiltersGeneric22Binding)
                {
                    this.arrIdsRegistersFiltersGeneric22Binding = Object.keys(this.objIdsRegistersFiltersGeneric22Binding).map(key => this.objIdsRegistersFiltersGeneric22Binding[key]["id_filters_generic"]);


                    if(this.arrIdsRegistersFiltersGeneric22Binding)
                    {
                        var arrIdsRegistersFiltersGeneric22Binding = this.arrIdsRegistersFiltersGeneric22Binding;

                        this.objRegistersFiltersGeneric22Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric22Binding.includes(obj.id);
                        });
                    }
                }
            }    

            if(gSystemConfig.enableRegistersFilterGeneric23 != 0)
            {
                this.objIdsRegistersFiltersGeneric23Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 123;
                });

                if(this.objIdsRegistersFiltersGeneric23Binding)
                {
                    this.arrIdsRegistersFiltersGeneric23Binding = Object.keys(this.objIdsRegistersFiltersGeneric23Binding).map(key => this.objIdsRegistersFiltersGeneric23Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric23Binding)
                    {
                        var arrIdsRegistersFiltersGeneric23Binding = this.arrIdsRegistersFiltersGeneric23Binding;

                        this.objRegistersFiltersGeneric23Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric23Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric24 != 0)
            {
                this.objIdsRegistersFiltersGeneric24Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 124;
                });

                if(this.objIdsRegistersFiltersGeneric24Binding)
                {
                    this.arrIdsRegistersFiltersGeneric24Binding = Object.keys(this.objIdsRegistersFiltersGeneric24Binding).map(key => this.objIdsRegistersFiltersGeneric24Binding[key]["id_filters_generic"]);


                    if(this.arrIdsRegistersFiltersGeneric24Binding)
                    {
                        var arrIdsRegistersFiltersGeneric24Binding = this.arrIdsRegistersFiltersGeneric24Binding;

                        this.objRegistersFiltersGeneric24Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric24Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric25 != 0)
            {
                this.objIdsRegistersFiltersGeneric25Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 125;
                });

                if(this.objIdsRegistersFiltersGeneric25Binding)
                {
                    this.arrIdsRegistersFiltersGeneric25Binding = Object.keys(this.objIdsRegistersFiltersGeneric25Binding).map(key => this.objIdsRegistersFiltersGeneric25Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric25Binding)
                    {
                        var arrIdsRegistersFiltersGeneric25Binding = this.arrIdsRegistersFiltersGeneric25Binding;

                        this.objRegistersFiltersGeneric25Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric25Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric26 != 0)
            {
                this.objIdsRegistersFiltersGeneric26Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 126;
                });

                if(this.objIdsRegistersFiltersGeneric26Binding)
                {
                    this.arrIdsRegistersFiltersGeneric26Binding = Object.keys(this.objIdsRegistersFiltersGeneric26Binding).map(key => this.objIdsRegistersFiltersGeneric26Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric26Binding)
                    {
                        var arrIdsRegistersFiltersGeneric26Binding = this.arrIdsRegistersFiltersGeneric26Binding;

                        this.objRegistersFiltersGeneric26Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric26Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric27 != 0)
            {
                this.objIdsRegistersFiltersGeneric27Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 127;
                });

                if(this.objIdsRegistersFiltersGeneric27Binding)
                {
                    this.arrIdsRegistersFiltersGeneric27Binding = Object.keys(this.objIdsRegistersFiltersGeneric27Binding).map(key => this.objIdsRegistersFiltersGeneric27Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric27Binding)
                    {
                        var arrIdsRegistersFiltersGeneric27Binding = this.arrIdsRegistersFiltersGeneric27Binding;

                        this.objRegistersFiltersGeneric27Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric27Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric28 != 0)
            {
                this.objIdsRegistersFiltersGeneric28Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 128;
                });

                if(this.objIdsRegistersFiltersGeneric28Binding)
                {
                    this.arrIdsRegistersFiltersGeneric28Binding = Object.keys(this.objIdsRegistersFiltersGeneric28Binding).map(key => this.objIdsRegistersFiltersGeneric28Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric28Binding)
                    {
                        var arrIdsRegistersFiltersGeneric28Binding = this.arrIdsRegistersFiltersGeneric28Binding;

                        this.objRegistersFiltersGeneric28Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric28Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric29 != 0)
            {
                this.objIdsRegistersFiltersGeneric29Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 129;
                });

                if(this.objIdsRegistersFiltersGeneric29Binding)
                {
                    this.arrIdsRegistersFiltersGeneric29Binding = Object.keys(this.objIdsRegistersFiltersGeneric29Binding).map(key => this.objIdsRegistersFiltersGeneric29Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric29Binding)
                    {
                        var arrIdsRegistersFiltersGeneric29Binding = this.arrIdsRegistersFiltersGeneric29Binding;

                        this.objRegistersFiltersGeneric29Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric29Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric30 != 0)
            {
                this.objIdsRegistersFiltersGeneric30Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 130;
                });

                if(this.objIdsRegistersFiltersGeneric30Binding)
                {
                    this.arrIdsRegistersFiltersGeneric30Binding = Object.keys(this.objIdsRegistersFiltersGeneric30Binding).map(key => this.objIdsRegistersFiltersGeneric30Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric30Binding)
                    {
                        var arrIdsRegistersFiltersGeneric30Binding = this.arrIdsRegistersFiltersGeneric30Binding;

                        this.objRegistersFiltersGeneric30Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric30Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric31 != 0)
            {
                this.objIdsRegistersFiltersGeneric31Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 131;
                });

                if(this.objIdsRegistersFiltersGeneric31Binding)
                {
                    this.arrIdsRegistersFiltersGeneric31Binding = Object.keys(this.objIdsRegistersFiltersGeneric31Binding).map(key => this.objIdsRegistersFiltersGeneric31Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric31Binding)
                    {
                        var arrIdsRegistersFiltersGeneric31Binding = this.arrIdsRegistersFiltersGeneric31Binding;
                        this.objRegistersFiltersGeneric31Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric31Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric32 != 0)
            {
                this.objIdsRegistersFiltersGeneric32Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 132;
                });

                if(this.objIdsRegistersFiltersGeneric32Binding)
                {
                    this.arrIdsRegistersFiltersGeneric32Binding = Object.keys(this.objIdsRegistersFiltersGeneric32Binding).map(key => this.objIdsRegistersFiltersGeneric32Binding[key]["id_filters_generic"]);


                    if(this.arrIdsRegistersFiltersGeneric32Binding)
                    {
                        var arrIdsRegistersFiltersGeneric32Binding = this.arrIdsRegistersFiltersGeneric32Binding;

                        this.objRegistersFiltersGeneric32Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric32Binding.includes(obj.id);
                        });
                    }
                }
            }    

            if(gSystemConfig.enableRegistersFilterGeneric33 != 0)
            {
                this.objIdsRegistersFiltersGeneric33Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 133;
                });

                if(this.objIdsRegistersFiltersGeneric33Binding)
                {
                    this.arrIdsRegistersFiltersGeneric33Binding = Object.keys(this.objIdsRegistersFiltersGeneric33Binding).map(key => this.objIdsRegistersFiltersGeneric33Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric33Binding)
                    {
                        var arrIdsRegistersFiltersGeneric33Binding = this.arrIdsRegistersFiltersGeneric33Binding;

                        this.objRegistersFiltersGeneric33Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric33Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric34 != 0)
            {
                this.objIdsRegistersFiltersGeneric34Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 134;
                });

                if(this.objIdsRegistersFiltersGeneric34Binding)
                {
                    this.arrIdsRegistersFiltersGeneric34Binding = Object.keys(this.objIdsRegistersFiltersGeneric34Binding).map(key => this.objIdsRegistersFiltersGeneric34Binding[key]["id_filters_generic"]);


                    if(this.arrIdsRegistersFiltersGeneric34Binding)
                    {
                        var arrIdsRegistersFiltersGeneric34Binding = this.arrIdsRegistersFiltersGeneric34Binding;

                        this.objRegistersFiltersGeneric34Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric34Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric35 != 0)
            {
                this.objIdsRegistersFiltersGeneric35Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 135;
                });

                if(this.objIdsRegistersFiltersGeneric35Binding)
                {
                    this.arrIdsRegistersFiltersGeneric35Binding = Object.keys(this.objIdsRegistersFiltersGeneric35Binding).map(key => this.objIdsRegistersFiltersGeneric35Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric35Binding)
                    {
                        var arrIdsRegistersFiltersGeneric35Binding = this.arrIdsRegistersFiltersGeneric35Binding;

                        this.objRegistersFiltersGeneric35Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric35Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric36 != 0)
            {
                this.objIdsRegistersFiltersGeneric36Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 136;
                });

                if(this.objIdsRegistersFiltersGeneric36Binding)
                {
                    this.arrIdsRegistersFiltersGeneric36Binding = Object.keys(this.objIdsRegistersFiltersGeneric36Binding).map(key => this.objIdsRegistersFiltersGeneric36Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric36Binding)
                    {
                        var arrIdsRegistersFiltersGeneric36Binding = this.arrIdsRegistersFiltersGeneric36Binding;

                        this.objRegistersFiltersGeneric36Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric36Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric37 != 0)
            {
                this.objIdsRegistersFiltersGeneric37Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 137;
                });

                if(this.objIdsRegistersFiltersGeneric37Binding)
                {
                    this.arrIdsRegistersFiltersGeneric37Binding = Object.keys(this.objIdsRegistersFiltersGeneric37Binding).map(key => this.objIdsRegistersFiltersGeneric37Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric37Binding)
                    {
                        var arrIdsRegistersFiltersGeneric37Binding = this.arrIdsRegistersFiltersGeneric37Binding;

                        this.objRegistersFiltersGeneric37Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric37Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric38 != 0)
            {
                this.objIdsRegistersFiltersGeneric38Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 138;
                });

                if(this.objIdsRegistersFiltersGeneric38Binding)
                {
                    this.arrIdsRegistersFiltersGeneric38Binding = Object.keys(this.objIdsRegistersFiltersGeneric38Binding).map(key => this.objIdsRegistersFiltersGeneric38Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric38Binding)
                    {
                        var arrIdsRegistersFiltersGeneric38Binding = this.arrIdsRegistersFiltersGeneric38Binding;

                        this.objRegistersFiltersGeneric38Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric38Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric39 != 0)
            {
                this.objIdsRegistersFiltersGeneric39Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 139;
                });

                if(this.objIdsRegistersFiltersGeneric39Binding)
                {
                    this.arrIdsRegistersFiltersGeneric39Binding = Object.keys(this.objIdsRegistersFiltersGeneric39Binding).map(key => this.objIdsRegistersFiltersGeneric39Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric39Binding)
                    {
                        var arrIdsRegistersFiltersGeneric39Binding = this.arrIdsRegistersFiltersGeneric39Binding;

                        this.objRegistersFiltersGeneric39Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric39Binding.includes(obj.id);
                        });
                    }
                }
            }   

            if(gSystemConfig.enableRegistersFilterGeneric40 != 0)
            {
                this.objIdsRegistersFiltersGeneric40Binding = this.objIdsRegistersFiltersGenericBinding.filter(function(obj){
                    return obj.id_filter_index == 140;
                });

                if(this.objIdsRegistersFiltersGeneric40Binding)
                {
                    this.arrIdsRegistersFiltersGeneric40Binding = Object.keys(this.objIdsRegistersFiltersGeneric40Binding).map(key => this.objIdsRegistersFiltersGeneric40Binding[key]["id_filters_generic"]);

                    if(this.arrIdsRegistersFiltersGeneric40Binding)
                    {
                        var arrIdsRegistersFiltersGeneric40Binding = this.arrIdsRegistersFiltersGeneric40Binding;

                        this.objRegistersFiltersGeneric40Binding_print = this.ofglRecords.resultsFiltersGenericListing.filter(function(obj){
                            return arrIdsRegistersFiltersGeneric40Binding.includes(obj.id);
                        });
                    }
                }
            } 

            //Debug.                                                                                            
            //console.log("this.objIdsRegistersFiltersGenericBinding=", this.objIdsRegistersFiltersGenericBinding);
            //console.log("this.objIdsRegistersFiltersGeneric1Binding=", this.objIdsRegistersFiltersGeneric1Binding);
            //console.log("this.arrIdsRegistersFiltersGeneric1Binding=", this.arrIdsRegistersFiltersGeneric1Binding);
            //console.log("this.arrIdsRegistersFiltersGeneric2Binding=", this.arrIdsRegistersFiltersGeneric2Binding);
            //console.log("this.arrIdsRegistersFiltersGeneric3Binding=", this.arrIdsRegistersFiltersGeneric3Binding);
            //console.log("this.arrIdsRegistersFiltersGenericBinding=", this.arrIdsRegistersFiltersGenericBinding);
            //console.log("this.arrIdsRegistersFiltersGenericBinding=", this.arrIdsRegistersFiltersGenericBinding.includes("125"));
            //console.log("JSON.parse(this.arrIdsRegistersFiltersGenericBinding)=", JSON.parse(JSON.stringify(this.arrIdsRegistersFiltersGenericBinding[0])));
            //console.log("this.arrIdsRegistersFiltersGenericBinding.find=",  this.arrIdsRegistersFiltersGenericBinding.find(objRegistersFiltersGenericBinding => objRegistersFiltersGenericBinding.id_filters_generic == '126'));
            //console.log("this.arrIdsRegistersFiltersGenericBinding=", Object.keys(this.arrIdsRegistersFiltersGenericBinding).map(key => this.arrIdsRegistersFiltersGenericBinding[key].id_filters_generic));


            //Define values.
            //if(this.resultsRegistersDetails[0])
            //{
                //DEV: Create logic to check if record exist.
            //}
            this.tblRegistersID = this.resultsRegistersDetails[0].id;
            this.tblRegistersIdParent = this.resultsRegistersDetails[0].id_parent;

            this.tblRegistersSortOrder = this.resultsRegistersDetails[0].sort_order;
            this.tblRegistersSortOrder_print = FunctionsGeneric.valueMaskRead(this.tblRegistersSortOrder, gSystemConfig.configSystemCurrency, 3);
            
            this.tblRegistersDateCreation = this.resultsRegistersDetails[0].date_creation; //format: yyyy-mm-dd hh:MM:ss or yyyy-mm-dd
            this.tblRegistersDateTimezone = this.resultsRegistersDetails[0].date_timezone;
            this.tblRegistersDateEdit = this.resultsRegistersDetails[0].date_edit;

            this.tblRegistersIdType = this.resultsRegistersDetails[0].id_type;
            this.tblRegistersIdActivity = this.resultsRegistersDetails[0].id_activity;

            this.tblRegistersIdRegisterUser = this.resultsRegistersDetails[0].id_register_user;
            if(this.tblRegistersIdRegisterUser != 0)
            {
                this.tblRegistersIdRegisterUser_print = "";
            }
            this.tblRegistersIdRegister1 = this.resultsRegistersDetails[0].id_register1;
            if(this.tblRegistersIdRegister1 != 0)
            {
                this.tblRegistersIdRegister1_print = "";
            }
            this.tblRegistersIdRegister2 = this.resultsRegistersDetails[0].id_register2;
            if(this.tblRegistersIdRegister2 != 0)
            {
                this.tblRegistersIdRegister2_print = "";
            }
            this.tblRegistersIdRegister3 = this.resultsRegistersDetails[0].id_register3;
            if(this.tblRegistersIdRegister3 != 0)
            {
                this.tblRegistersIdRegister3_print = "";
            }
            this.tblRegistersIdRegister4 = this.resultsRegistersDetails[0].id_register4;
            if(this.tblRegistersIdRegister4 != 0)
            {
                this.tblRegistersIdRegister4_print = "";
            }
            this.tblRegistersIdRegister5 = this.resultsRegistersDetails[0].id_register5;
            if(this.tblRegistersIdRegister5 != 0)
            {
                this.tblRegistersIdRegister5_print = "";
            }

            this.tblRegistersType = this.resultsRegistersDetails[0].register_type;
            switch(this.tblRegistersType)
            {
                case 1:
                    this.tblRegistersType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "RegistersRegisterType1");
                    break;
                case 2:
                    this.tblRegistersType_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "RegistersRegisterType2");
                    break;
            }

            this.tblRegistersNameTitle = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].name_title, "db");
            this.tblRegistersNameFull = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].name_full, "db");
            this.tblRegistersNameFirst = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].name_first, "db");
            this.tblRegistersNameLast = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].name_last, "db");
            
            this.tblRegistersCompanyNameLegal = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].company_name_legal, "db");
            this.tblRegistersCompanyNameAlias = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].company_name_alias, "db");

            this.tblRegistersDescription = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].description, "db");
            this.tblRegistersDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].description, "editTextBox=" + gSystemConfig.configBackendTextBox); //TODO: condition detect terminal
            
            this.tblRegistersURLAlias = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].url_alias, "db");
            //this.tblRegistersKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].keywords_tags, "db");
            this.tblRegistersKeywordsTags = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].keywords_tags, "editTextBox=1");
            this.tblRegistersMetaDescription = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].meta_description, "db"); //TODO: include strip html
            this.tblRegistersMetaDescription_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].meta_description, "db"); //TODO: include strip html
            this.tblRegistersMetaTitle = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].meta_title, "db");
            this.tblRegistersMetaInfo = this.resultsRegistersDetails[0].meta_info;

            this.tblRegistersDateBirth = this.resultsRegistersDetails[0].date_birth;
            if(this.tblRegistersDateBirth)
            {
                this.tblRegistersDateBirthDateObj = this.tblRegistersDateBirth;
                this.tblRegistersDateBirthDateYear = this.tblRegistersDateBirthDateObj.getFullYear();
                this.tblRegistersDateBirthDateDay = this.tblRegistersDateBirthDateObj.getDate();
                this.tblRegistersDateBirthDateMonth = (this.tblRegistersDateBirthDateObj.getMonth() + 1);
            
                this.tblRegistersDateBirthDateHour = this.tblRegistersDateBirthDateObj.getHours();
                this.tblRegistersDateBirthDateHour_print = ("0" + this.tblRegistersDateBirthDateObj.getHours()).slice(-2);

                this.tblRegistersDateBirthDateMinute = this.tblRegistersDateBirthDateObj.getMinutes();
                this.tblRegistersDateBirthDateMinute_print = ("0" + this.tblRegistersDateBirthDateObj.getMinutes()).slice(-2);

                this.tblRegistersDateBirthDateSecond = this.tblRegistersDateBirthDateObj.getSeconds();
                this.tblRegistersDateBirthDateSecond_print = ("0" + this.tblRegistersDateBirthDateObj.getSeconds()).slice(-2);

                //this.tblRegistersDateBirth_print = this.tblRegistersDateBirth;
                this.tblRegistersDateBirth_print = FunctionsGeneric.dateRead01(this.tblRegistersDateBirth, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            4);
            }

            this.tblRegistersGender = this.resultsRegistersDetails[0].gender;
            this.tblRegistersGender_print = "";
            switch(this.tblRegistersGender)
            {
                case 0:
                    this.tblRegistersGender_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemGender0");
                    break;
                case 1:
                    this.tblRegistersGender_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemGender1");
                    break;
                case 2:
                    this.tblRegistersGender_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemGender2");
                    break;
            }

            this.tblRegistersHeight = this.resultsRegistersDetails[0].height;
            this.tblRegistersHeight_print = FunctionsGeneric.valueMaskRead(this.tblRegistersHeight, gSystemConfig.configSystemCurrency, 3);

            this.tblRegistersWeight = this.resultsRegistersDetails[0].weight;
            this.tblRegistersWeight_print = FunctionsGeneric.valueMaskRead(this.tblRegistersWeight, gSystemConfig.configSystemCurrency, 3);
            
            this.tblRegistersDocumentType = this.resultsRegistersDetails[0].document_type;
            this.tblRegistersDocument = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].document, "db");
            this.tblRegistersDocument1Type = this.resultsRegistersDetails[0].document1_type;
            this.tblRegistersDocument1 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].document1, "db");
            this.tblRegistersDocument2Type = this.resultsRegistersDetails[0].document2_type;
            this.tblRegistersDocument2 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].document2, "db");

            this.tblRegistersDocumentCompanyType = this.resultsRegistersDetails[0].document_company_type;
            this.tblRegistersDocumentCompany = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].document_company, "db");
            this.tblRegistersDocumentCompany1Type = this.resultsRegistersDetails[0].document_company1_type;
            this.tblRegistersDocumentCompany1 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].document_company1, "db");
            this.tblRegistersDocumentCompany2Type = this.resultsRegistersDetails[0].document_company2_type;
            this.tblRegistersDocumentCompany2 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].document_company2, "db");

            this.tblRegistersZipCode = this.resultsRegistersDetails[0].zip_code;
            this.tblRegistersZipCode_print = this.tblRegistersZipCode;
            this.tblRegistersAddressStreet = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].address_street, "editTextBox=1");
            this.tblRegistersAddressNumber = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].address_number, "db"); //TODO: include strip html
            this.tblRegistersAddressComplement = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].address_complement, "db"); //TODO: include strip html
            this.tblRegistersNeighborhood = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].neighborhood, "db");
            this.tblRegistersDistrict = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].district, "db");
            this.tblRegistersCounty = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].county, "db");
            this.tblRegistersCity = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].city, "db");
            this.tblRegistersState = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].state, "db");
            this.tblRegistersCountry = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].country, "db");

            this.tblRegistersIdStreet = this.resultsRegistersDetails[0].id_street;
            this.tblRegistersIdNeighborhood = this.resultsRegistersDetails[0].id_neighborhood;
            this.tblRegistersIdDistrict = this.resultsRegistersDetails[0].id_district;
            this.tblRegistersIdCounty = this.resultsRegistersDetails[0].id_county;
            this.tblRegistersIdCity = this.resultsRegistersDetails[0].id_city;
            this.tblRegistersIdState = this.resultsRegistersDetails[0].id_state;
            this.tblRegistersIdCountry = this.resultsRegistersDetails[0].id_country;

            this.tblRegistersLocationReference = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].location_reference, "db");
            this.tblRegistersLocationReference_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].location_reference, "editTextBox=" + gSystemConfig.configBackendTextBox); //TODO: condition detect terminal

            this.tblRegistersLocationMap = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].location_map, "db");
            
            this.tblRegistersPhone1InternationalCode = this.resultsRegistersDetails[0].phone1_international_code;
            this.tblRegistersPhone1AreaCode = this.resultsRegistersDetails[0].phone1_area_code;
            this.tblRegistersPhone1 = this.resultsRegistersDetails[0].phone1;
            this.tblRegistersPhone1_print = this.tblRegistersPhone1;

            this.tblRegistersPhone2InternationalCode = this.resultsRegistersDetails[0].phone2_international_code;
            this.tblRegistersPhone2AreaCode = this.resultsRegistersDetails[0].phone2_area_code;
            this.tblRegistersPhone2 = this.resultsRegistersDetails[0].phone2;
            this.tblRegistersPhone2_print = this.tblRegistersPhone2;

            this.tblRegistersPhone3InternationalCode = this.resultsRegistersDetails[0].phone3_international_code;
            this.tblRegistersPhone3AreaCode = this.resultsRegistersDetails[0].phone3_area_code;
            this.tblRegistersPhone3 = this.resultsRegistersDetails[0].phone3;
            this.tblRegistersPhone3_print = this.tblRegistersPhone3;

            this.tblRegistersWebsite = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].website, "db");

            this.tblRegistersUsername = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].username, "db");
            this.tblRegistersEmail = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].email, "db");
            this.tblRegistersPassword = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].password, "db");
            this.tblRegistersPassword_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].password, "db"), 2);
            this.tblRegistersPasswordHint = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].password_hint, "db");
            this.tblRegistersPasswordLength = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].password_length, "db");


            if(gSystemConfig.enableRegistersInfo1 == 1)
            {
                if(gSystemConfig.configRegistersInfo1FieldType == 1 || gSystemConfig.configRegistersInfo1FieldType == 2)
                {
                    this.tblRegistersInfo1 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info1, "db");
                    this.tblRegistersInfo1_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info1, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo1FieldType == 11 || gSystemConfig.configRegistersInfo1FieldType == 12)
                {
                    this.tblRegistersInfo1 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info1, "db"), 2);
                    this.tblRegistersInfo1_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info1, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo2 == 1)
            {
                if(gSystemConfig.configRegistersInfo2FieldType == 1 || gSystemConfig.configRegistersInfo2FieldType == 2)
                {
                    this.tblRegistersInfo2 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info2, "db");
                    this.tblRegistersInfo2_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info2, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo2FieldType == 11 || gSystemConfig.configRegistersInfo2FieldType == 12)
                {
                    this.tblRegistersInfo2 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info2, "db"), 2);
                    this.tblRegistersInfo2_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info2, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo3 == 1)
            {
                if(gSystemConfig.configRegistersInfo3FieldType == 1 || gSystemConfig.configRegistersInfo3FieldType == 2)
                {
                    this.tblRegistersInfo3 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info3, "db");
                    this.tblRegistersInfo3_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info3, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo3FieldType == 11 || gSystemConfig.configRegistersInfo3FieldType == 12)
                {
                    this.tblRegistersInfo3 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info3, "db"), 2);
                    this.tblRegistersInfo3_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info3, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo4 == 1)
            {
                if(gSystemConfig.configRegistersInfo4FieldType == 1 || gSystemConfig.configRegistersInfo4FieldType == 2)
                {
                    this.tblRegistersInfo4 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info4, "db");
                    this.tblRegistersInfo4_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info4, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo4FieldType == 11 || gSystemConfig.configRegistersInfo4FieldType == 12)
                {
                    this.tblRegistersInfo4 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info4, "db"), 2);
                    this.tblRegistersInfo4_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info4, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo5 == 1)
            {
                if(gSystemConfig.configRegistersInfo5FieldType == 1 || gSystemConfig.configRegistersInfo5FieldType == 2)
                {
                    this.tblRegistersInfo5 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info5, "db");
                    this.tblRegistersInfo5_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info5, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo5FieldType == 11 || gSystemConfig.configRegistersInfo5FieldType == 12)
                {
                    this.tblRegistersInfo5 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info5, "db"), 2);
                    this.tblRegistersInfo5_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info5, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo6 == 1)
            {
                if(gSystemConfig.configRegistersInfo6FieldType == 1 || gSystemConfig.configRegistersInfo6FieldType == 2)
                {
                    this.tblRegistersInfo6 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info6, "db");
                    this.tblRegistersInfo6_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info6, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo6FieldType == 11 || gSystemConfig.configRegistersInfo6FieldType == 12)
                {
                    this.tblRegistersInfo6 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info6, "db"), 2);
                    this.tblRegistersInfo6_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info6, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo7 == 1)
            {
                if(gSystemConfig.configRegistersInfo7FieldType == 1 || gSystemConfig.configRegistersInfo7FieldType == 2)
                {
                    this.tblRegistersInfo7 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info7, "db");
                    this.tblRegistersInfo7_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info7, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo7FieldType == 11 || gSystemConfig.configRegistersInfo7FieldType == 12)
                {
                    this.tblRegistersInfo7 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info7, "db"), 2);
                    this.tblRegistersInfo7_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info7, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo8 == 1)
            {
                if(gSystemConfig.configRegistersInfo8FieldType == 1 || gSystemConfig.configRegistersInfo8FieldType == 2)
                {
                    this.tblRegistersInfo8 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info8, "db");
                    this.tblRegistersInfo8_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info8, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo8FieldType == 11 || gSystemConfig.configRegistersInfo8FieldType == 12)
                {
                    this.tblRegistersInfo8 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info8, "db"), 2);
                    this.tblRegistersInfo8_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info8, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo9 == 1)
            {
                if(gSystemConfig.configRegistersInfo9FieldType == 1 || gSystemConfig.configRegistersInfo9FieldType == 2)
                {
                    this.tblRegistersInfo9 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info9, "db");
                    this.tblRegistersInfo9_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info9, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo9FieldType == 11 || gSystemConfig.configRegistersInfo9FieldType == 12)
                {
                    this.tblRegistersInfo9 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info9, "db"), 2);
                    this.tblRegistersInfo9_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info9, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo10 == 1)
            {
                if(gSystemConfig.configRegistersInfo10FieldType == 1 || gSystemConfig.configRegistersInfo10FieldType == 2)
                {
                    this.tblRegistersInfo10 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info10, "db");
                    this.tblRegistersInfo10_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info10, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo10FieldType == 11 || gSystemConfig.configRegistersInfo10FieldType == 12)
                {
                    this.tblRegistersInfo10 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info10, "db"), 2);
                    this.tblRegistersInfo10_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info10, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo11 == 1)
            {
                if(gSystemConfig.configRegistersInfo11FieldType == 1 || gSystemConfig.configRegistersInfo11FieldType == 2)
                {
                    this.tblRegistersInfo11 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info11, "db");
                    this.tblRegistersInfo11_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info11, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo11FieldType == 11 || gSystemConfig.configRegistersInfo11FieldType == 12)
                {
                    this.tblRegistersInfo11 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info11, "db"), 2);
                    this.tblRegistersInfo11_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info11, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo12 == 1)
            {
                if(gSystemConfig.configRegistersInfo12FieldType == 1 || gSystemConfig.configRegistersInfo12FieldType == 2)
                {
                    this.tblRegistersInfo12 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info12, "db");
                    this.tblRegistersInfo12_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info12, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo12FieldType == 11 || gSystemConfig.configRegistersInfo12FieldType == 12)
                {
                    this.tblRegistersInfo12 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info12, "db"), 2);
                    this.tblRegistersInfo12_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info12, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo13 == 1)
            {
                if(gSystemConfig.configRegistersInfo13FieldType == 1 || gSystemConfig.configRegistersInfo13FieldType == 2)
                {
                    this.tblRegistersInfo13 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info13, "db");
                    this.tblRegistersInfo13_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info13, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo13FieldType == 11 || gSystemConfig.configRegistersInfo13FieldType == 12)
                {
                    this.tblRegistersInfo13 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info13, "db"), 2);
                    this.tblRegistersInfo13_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info13, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo14 == 1)
            {
                if(gSystemConfig.configRegistersInfo14FieldType == 1 || gSystemConfig.configRegistersInfo14FieldType == 2)
                {
                    this.tblRegistersInfo14 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info14, "db");
                    this.tblRegistersInfo14_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info14, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo14FieldType == 11 || gSystemConfig.configRegistersInfo14FieldType == 12)
                {
                    this.tblRegistersInfo14 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info14, "db"), 2);
                    this.tblRegistersInfo14_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info14, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo15 == 1)
            {
                if(gSystemConfig.configRegistersInfo15FieldType == 1 || gSystemConfig.configRegistersInfo15FieldType == 2)
                {
                    this.tblRegistersInfo15 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info15, "db");
                    this.tblRegistersInfo15_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info15, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo15FieldType == 11 || gSystemConfig.configRegistersInfo15FieldType == 12)
                {
                    this.tblRegistersInfo15 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info15, "db"), 2);
                    this.tblRegistersInfo15_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info15, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo16 == 1)
            {
                if(gSystemConfig.configRegistersInfo16FieldType == 1 || gSystemConfig.configRegistersInfo16FieldType == 2)
                {
                    this.tblRegistersInfo16 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info16, "db");
                    this.tblRegistersInfo16_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info16, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo16FieldType == 11 || gSystemConfig.configRegistersInfo16FieldType == 12)
                {
                    this.tblRegistersInfo16 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info16, "db"), 2);
                    this.tblRegistersInfo16_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info16, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo17 == 1)
            {
                if(gSystemConfig.configRegistersInfo17FieldType == 1 || gSystemConfig.configRegistersInfo17FieldType == 2)
                {
                    this.tblRegistersInfo17 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info17, "db");
                    this.tblRegistersInfo17_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info17, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo17FieldType == 11 || gSystemConfig.configRegistersInfo17FieldType == 12)
                {
                    this.tblRegistersInfo17 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info17, "db"), 2);
                    this.tblRegistersInfo17_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info17, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo18 == 1)
            {
                if(gSystemConfig.configRegistersInfo18FieldType == 1 || gSystemConfig.configRegistersInfo18FieldType == 2)
                {
                    this.tblRegistersInfo18 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info18, "db");
                    this.tblRegistersInfo18_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info18, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo18FieldType == 11 || gSystemConfig.configRegistersInfo18FieldType == 12)
                {
                    this.tblRegistersInfo18 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info18, "db"), 2);
                    this.tblRegistersInfo18_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info18, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo19 == 1)
            {
                if(gSystemConfig.configRegistersInfo19FieldType == 1 || gSystemConfig.configRegistersInfo19FieldType == 2)
                {
                    this.tblRegistersInfo19 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info19, "db");
                    this.tblRegistersInfo19_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info19, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo19FieldType == 11 || gSystemConfig.configRegistersInfo19FieldType == 12)
                {
                    this.tblRegistersInfo19 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info19, "db"), 2);
                    this.tblRegistersInfo19_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info19, "db"), 2);
                }
            }
            if(gSystemConfig.enableRegistersInfo20 == 1)
            {
                if(gSystemConfig.configRegistersInfo20FieldType == 1 || gSystemConfig.configRegistersInfo20FieldType == 2)
                {
                    this.tblRegistersInfo20 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info20, "db");
                    this.tblRegistersInfo20_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info20, "db");
                }

                //Encrypted.
                if(gSystemConfig.configRegistersInfo20FieldType == 11 || gSystemConfig.configRegistersInfo20FieldType == 12)
                {
                    this.tblRegistersInfo20 = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info20, "db"), 2);
                    this.tblRegistersInfo20_edit = FunctionsCrypto.decryptValue(FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info20, "db"), 2);
                }
            }

            this.tblRegistersInfoSmall1 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small1, "db");
            this.tblRegistersInfoSmall1_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small1, "db");
            this.tblRegistersInfoSmall2 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small2, "db");
            this.tblRegistersInfoSmall2_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small2, "db");
            this.tblRegistersInfoSmall3 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small3, "db");
            this.tblRegistersInfoSmall3_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small3, "db");
            this.tblRegistersInfoSmall4 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small4, "db");
            this.tblRegistersInfoSmall4_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small4, "db");
            this.tblRegistersInfoSmall5 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small5, "db");
            this.tblRegistersInfoSmall5_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small5, "db");
            this.tblRegistersInfoSmall6 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small6, "db");
            this.tblRegistersInfoSmall6_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small6, "db");
            this.tblRegistersInfoSmall7 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small7, "db");
            this.tblRegistersInfoSmall7_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small7, "db");
            this.tblRegistersInfoSmall8 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small8, "db");
            this.tblRegistersInfoSmall8_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small8, "db");
            this.tblRegistersInfoSmall9 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small9, "db");
            this.tblRegistersInfoSmall9_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small9, "db");
            this.tblRegistersInfoSmall10 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small10, "db");
            this.tblRegistersInfoSmall10_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small10, "db");
            this.tblRegistersInfoSmall11 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small11, "db");
            this.tblRegistersInfoSmall11_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small11, "db");
            this.tblRegistersInfoSmall12 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small12, "db");
            this.tblRegistersInfoSmall12_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small12, "db");
            this.tblRegistersInfoSmall13 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small13, "db");
            this.tblRegistersInfoSmall13_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small13, "db");
            this.tblRegistersInfoSmall14 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small14, "db");
            this.tblRegistersInfoSmall14_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small14, "db");
            this.tblRegistersInfoSmall15 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small15, "db");
            this.tblRegistersInfoSmall15_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small15, "db");
            this.tblRegistersInfoSmall16 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small16, "db");
            this.tblRegistersInfoSmall16_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small16, "db");
            this.tblRegistersInfoSmall17 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small17, "db");
            this.tblRegistersInfoSmall17_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small17, "db");
            this.tblRegistersInfoSmall18 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small18, "db");
            this.tblRegistersInfoSmall18_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small18, "db");
            this.tblRegistersInfoSmall19 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small19, "db");
            this.tblRegistersInfoSmall19_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small19, "db");
            this.tblRegistersInfoSmall20 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small20, "db");
            this.tblRegistersInfoSmall20_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small20, "db");
            this.tblRegistersInfoSmall21 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small21, "db");
            this.tblRegistersInfoSmall21_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small21, "db");
            this.tblRegistersInfoSmall22 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small22, "db");
            this.tblRegistersInfoSmall22_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small22, "db");
            this.tblRegistersInfoSmall23 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small23, "db");
            this.tblRegistersInfoSmall23_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small23, "db");
            this.tblRegistersInfoSmall24 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small24, "db");
            this.tblRegistersInfoSmall24_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small24, "db");
            this.tblRegistersInfoSmall25 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small25, "db");
            this.tblRegistersInfoSmall25_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small25, "db");
            this.tblRegistersInfoSmall26 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small26, "db");
            this.tblRegistersInfoSmall26_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small26, "db");
            this.tblRegistersInfoSmall27 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small27, "db");
            this.tblRegistersInfoSmall27_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small27, "db");
            this.tblRegistersInfoSmall28 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small28, "db");
            this.tblRegistersInfoSmall28_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small28, "db");
            this.tblRegistersInfoSmall29 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small29, "db");
            this.tblRegistersInfoSmall29_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small29, "db");
            this.tblRegistersInfoSmall30 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small30, "db");
            this.tblRegistersInfoSmall30_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].info_small30, "db");

            this.tblRegistersNumber1 = this.resultsRegistersDetails[0].number1;
            this.tblRegistersNumber1_print = FunctionsGeneric.valueMaskRead(this.tblRegistersNumber1, gSystemConfig.configSystemCurrency, gSystemConfig.configRegistersNumber1FieldType);
            this.tblRegistersNumber2 = this.resultsRegistersDetails[0].number2;
            this.tblRegistersNumber2_print = FunctionsGeneric.valueMaskRead(this.tblRegistersNumber2, gSystemConfig.configSystemCurrency, gSystemConfig.configRegistersNumber2FieldType);
            this.tblRegistersNumber3 = this.resultsRegistersDetails[0].number3;
            this.tblRegistersNumber3_print = FunctionsGeneric.valueMaskRead(this.tblRegistersNumber3, gSystemConfig.configSystemCurrency, gSystemConfig.configRegistersNumber3FieldType);
            this.tblRegistersNumber4 = this.resultsRegistersDetails[0].number4;
            this.tblRegistersNumber4_print = FunctionsGeneric.valueMaskRead(this.tblRegistersNumber4, gSystemConfig.configSystemCurrency, gSystemConfig.configRegistersNumber4FieldType);
            this.tblRegistersNumber5 = this.resultsRegistersDetails[0].number5;
            this.tblRegistersNumber5_print = FunctionsGeneric.valueMaskRead(this.tblRegistersNumber5, gSystemConfig.configSystemCurrency, gSystemConfig.configRegistersNumber5FieldType);

            this.tblRegistersNumberSmall1 = this.resultsRegistersDetails[0].number_small1;
            this.tblRegistersNumberSmall1_print = FunctionsGeneric.valueMaskRead(this.tblRegistersNumberSmall1, gSystemConfig.configSystemCurrency, gSystemConfig.configRegistersNumberS1FieldType);
            this.tblRegistersNumberSmall2 = this.resultsRegistersDetails[0].number_small2;
            this.tblRegistersNumberSmall2_print = FunctionsGeneric.valueMaskRead(this.tblRegistersNumberSmall2, gSystemConfig.configSystemCurrency, gSystemConfig.configRegistersNumberS2FieldType);
            this.tblRegistersNumberSmall3 = this.resultsRegistersDetails[0].number_small3;
            this.tblRegistersNumberSmall3_print = FunctionsGeneric.valueMaskRead(this.tblRegistersNumberSmall3, gSystemConfig.configSystemCurrency, gSystemConfig.configRegistersNumberS3FieldType);
            this.tblRegistersNumberSmall4 = this.resultsRegistersDetails[0].number_small4;
            this.tblRegistersNumberSmall4_print = FunctionsGeneric.valueMaskRead(this.tblRegistersNumberSmall4, gSystemConfig.configSystemCurrency, gSystemConfig.configRegistersNumberS4FieldType);
            this.tblRegistersNumberSmall5 = this.resultsRegistersDetails[0].number_small5;
            this.tblRegistersNumberSmall5_print = FunctionsGeneric.valueMaskRead(this.tblRegistersNumberSmall5, gSystemConfig.configSystemCurrency, gSystemConfig.configRegistersNumberS5FieldType);
            
            this.tblRegistersURL1 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].url1, "db");
            this.tblRegistersURL1_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].url1, "db");
            this.tblRegistersURL2 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].url2, "db");
            this.tblRegistersURL2_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].url2, "db");
            this.tblRegistersURL3 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].url3, "db");
            this.tblRegistersURL3_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].url3, "db");
            this.tblRegistersURL4 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].url4, "db");
            this.tblRegistersURL4_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].url4, "db");
            this.tblRegistersURL5 = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].url5, "db");
            this.tblRegistersURL5_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].url5, "db");
            
            this.tblRegistersDate1 = this.resultsRegistersDetails[0].date1;
            if(this.tblRegistersDate1)
            {
                this.tblRegistersDate1DateObj = this.tblRegistersDate1;
                this.tblRegistersDate1DateYear = this.tblRegistersDate1DateObj.getFullYear();
                this.tblRegistersDate1DateDay = this.tblRegistersDate1DateObj.getDate();
                this.tblRegistersDate1DateMonth = (this.tblRegistersDate1DateObj.getMonth() + 1);
            
                this.tblRegistersDate1DateHour = this.tblRegistersDate1DateObj.getHours();
                this.tblRegistersDate1DateHour_print = ("0" + this.tblRegistersDate1DateObj.getHours()).slice(-2);

                this.tblRegistersDate1DateMinute = this.tblRegistersDate1DateObj.getMinutes();
                this.tblRegistersDate1DateMinute_print = ("0" + this.tblRegistersDate1DateObj.getMinutes()).slice(-2);

                this.tblRegistersDate1DateSecond = this.tblRegistersDate1DateObj.getSeconds();
                this.tblRegistersDate1DateSecond_print = ("0" + this.tblRegistersDate1DateObj.getSeconds()).slice(-2);

                //this.tblRegistersDate1_print = this.tblRegistersDate1;
                this.tblRegistersDate1_print = FunctionsGeneric.dateRead01(this.tblRegistersDate1, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configRegistersDate1Type);
            }

            this.tblRegistersDate2 = this.resultsRegistersDetails[0].date2;
            if(this.tblRegistersDate2)
            {
                this.tblRegistersDate2DateObj = this.tblRegistersDate2;
                this.tblRegistersDate2DateYear = this.tblRegistersDate2DateObj.getFullYear();
                this.tblRegistersDate2DateDay = this.tblRegistersDate2DateObj.getDate();
                this.tblRegistersDate2DateMonth = (this.tblRegistersDate2DateObj.getMonth() + 1);
            
                this.tblRegistersDate2DateHour = this.tblRegistersDate2DateObj.getHours();
                this.tblRegistersDate2DateHour_print = ("0" + this.tblRegistersDate2DateObj.getHours()).slice(-2);

                this.tblRegistersDate2DateMinute = this.tblRegistersDate2DateObj.getMinutes();
                this.tblRegistersDate2DateMinute_print = ("0" + this.tblRegistersDate2DateObj.getMinutes()).slice(-2);

                this.tblRegistersDate2DateSecond = this.tblRegistersDate2DateObj.getSeconds();
                this.tblRegistersDate2DateSecond_print = ("0" + this.tblRegistersDate2DateObj.getSeconds()).slice(-2);

                this.tblRegistersDate2_print = FunctionsGeneric.dateRead01(this.tblRegistersDate2, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configRegistersDate2Type);
            }

            this.tblRegistersDate3 = this.resultsRegistersDetails[0].date3;
            if(this.tblRegistersDate3)
            {
                this.tblRegistersDate3DateObj = this.tblRegistersDate3;
                this.tblRegistersDate3DateYear = this.tblRegistersDate3DateObj.getFullYear();
                this.tblRegistersDate3DateDay = this.tblRegistersDate3DateObj.getDate();
                this.tblRegistersDate3DateMonth = (this.tblRegistersDate3DateObj.getMonth() + 1);
            
                this.tblRegistersDate3DateHour = this.tblRegistersDate3DateObj.getHours();
                this.tblRegistersDate3DateHour_print = ("0" + this.tblRegistersDate3DateObj.getHours()).slice(-2);

                this.tblRegistersDate3DateMinute = this.tblRegistersDate3DateObj.getMinutes();
                this.tblRegistersDate3DateMinute_print = ("0" + this.tblRegistersDate3DateObj.getMinutes()).slice(-2);

                this.tblRegistersDate3DateSecond = this.tblRegistersDate3DateObj.getSeconds();
                this.tblRegistersDate3DateSecond_print = ("0" + this.tblRegistersDate3DateObj.getSeconds()).slice(-2);

                this.tblRegistersDate3_print = FunctionsGeneric.dateRead01(this.tblRegistersDate3, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configRegistersDate3Type);
            }

            this.tblRegistersDate4 = this.resultsRegistersDetails[0].date4;
            if(this.tblRegistersDate4)
            {
                this.tblRegistersDate4DateObj = this.tblRegistersDate4;
                this.tblRegistersDate4DateYear = this.tblRegistersDate4DateObj.getFullYear();
                this.tblRegistersDate4DateDay = this.tblRegistersDate4DateObj.getDate();
                this.tblRegistersDate4DateMonth = (this.tblRegistersDate4DateObj.getMonth() + 1);
            
                this.tblRegistersDate4DateHour = this.tblRegistersDate4DateObj.getHours();
                this.tblRegistersDate4DateHour_print = ("0" + this.tblRegistersDate4DateObj.getHours()).slice(-2);

                this.tblRegistersDate4DateMinute = this.tblRegistersDate4DateObj.getMinutes();
                this.tblRegistersDate4DateMinute_print = ("0" + this.tblRegistersDate4DateObj.getMinutes()).slice(-2);

                this.tblRegistersDate4DateSecond = this.tblRegistersDate4DateObj.getSeconds();
                this.tblRegistersDate4DateSecond_print = ("0" + this.tblRegistersDate4DateObj.getSeconds()).slice(-2);

                this.tblRegistersDate4_print = FunctionsGeneric.dateRead01(this.tblRegistersDate4, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configRegistersDate4Type);
            }

            this.tblRegistersDate5 = this.resultsRegistersDetails[0].date5;
            if(this.tblRegistersDate5)
            {
                this.tblRegistersDate5DateObj = this.tblRegistersDate5;
                this.tblRegistersDate5DateYear = this.tblRegistersDate5DateObj.getFullYear();
                this.tblRegistersDate5DateDay = this.tblRegistersDate5DateObj.getDate();
                this.tblRegistersDate5DateMonth = (this.tblRegistersDate5DateObj.getMonth() + 1);
            
                this.tblRegistersDate5DateHour = this.tblRegistersDate5DateObj.getHours();
                this.tblRegistersDate5DateHour_print = ("0" + this.tblRegistersDate5DateObj.getHours()).slice(-2);

                this.tblRegistersDate5DateMinute = this.tblRegistersDate5DateObj.getMinutes();
                this.tblRegistersDate5DateMinute_print = ("0" + this.tblRegistersDate5DateObj.getMinutes()).slice(-2);

                this.tblRegistersDate5DateSecond = this.tblRegistersDate5DateObj.getSeconds();
                this.tblRegistersDate5DateSecond_print = ("0" + this.tblRegistersDate5DateObj.getSeconds()).slice(-2);

                this.tblRegistersDate5_print = FunctionsGeneric.dateRead01(this.tblRegistersDate5, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configRegistersDate5Type);
            }

            this.tblRegistersDate6 = this.resultsRegistersDetails[0].date6;
            if(this.tblRegistersDate6)
            {
                this.tblRegistersDate6DateObj = this.tblRegistersDate6;
                this.tblRegistersDate6DateYear = this.tblRegistersDate6DateObj.getFullYear();
                this.tblRegistersDate6DateDay = this.tblRegistersDate6DateObj.getDate();
                this.tblRegistersDate6DateMonth = (this.tblRegistersDate6DateObj.getMonth() + 1);
            
                this.tblRegistersDate6DateHour = this.tblRegistersDate6DateObj.getHours();
                this.tblRegistersDate6DateHour_print = ("0" + this.tblRegistersDate6DateObj.getHours()).slice(-2);

                this.tblRegistersDate6DateMinute = this.tblRegistersDate6DateObj.getMinutes();
                this.tblRegistersDate6DateMinute_print = ("0" + this.tblRegistersDate6DateObj.getMinutes()).slice(-2);

                this.tblRegistersDate6DateSecond = this.tblRegistersDate6DateObj.getSeconds();
                this.tblRegistersDate6DateSecond_print = ("0" + this.tblRegistersDate6DateObj.getSeconds()).slice(-2);

                this.tblRegistersDate6_print = FunctionsGeneric.dateRead01(this.tblRegistersDate6, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configRegistersDate6Type);
            }

            this.tblRegistersDate7 = this.resultsRegistersDetails[0].date7;
            if(this.tblRegistersDate7)
            {
                this.tblRegistersDate7DateObj = this.tblRegistersDate7;
                this.tblRegistersDate7DateYear = this.tblRegistersDate7DateObj.getFullYear();
                this.tblRegistersDate7DateDay = this.tblRegistersDate7DateObj.getDate();
                this.tblRegistersDate7DateMonth = (this.tblRegistersDate7DateObj.getMonth() + 1);
            
                this.tblRegistersDate7DateHour = this.tblRegistersDate7DateObj.getHours();
                this.tblRegistersDate7DateHour_print = ("0" + this.tblRegistersDate7DateObj.getHours()).slice(-2);

                this.tblRegistersDate7DateMinute = this.tblRegistersDate7DateObj.getMinutes();
                this.tblRegistersDate7DateMinute_print = ("0" + this.tblRegistersDate7DateObj.getMinutes()).slice(-2);

                this.tblRegistersDate7DateSecond = this.tblRegistersDate7DateObj.getSeconds();
                this.tblRegistersDate7DateSecond_print = ("0" + this.tblRegistersDate7DateObj.getSeconds()).slice(-2);

                this.tblRegistersDate7_print = FunctionsGeneric.dateRead01(this.tblRegistersDate7, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configRegistersDate7Type);
            }

            this.tblRegistersDate8 = this.resultsRegistersDetails[0].date8;
            if(this.tblRegistersDate8)
            {
                this.tblRegistersDate8DateObj = this.tblRegistersDate8;
                this.tblRegistersDate8DateYear = this.tblRegistersDate8DateObj.getFullYear();
                this.tblRegistersDate8DateDay = this.tblRegistersDate8DateObj.getDate();
                this.tblRegistersDate8DateMonth = (this.tblRegistersDate8DateObj.getMonth() + 1);
            
                this.tblRegistersDate8DateHour = this.tblRegistersDate8DateObj.getHours();
                this.tblRegistersDate8DateHour_print = ("0" + this.tblRegistersDate8DateObj.getHours()).slice(-2);

                this.tblRegistersDate8DateMinute = this.tblRegistersDate8DateObj.getMinutes();
                this.tblRegistersDate8DateMinute_print = ("0" + this.tblRegistersDate8DateObj.getMinutes()).slice(-2);

                this.tblRegistersDate8DateSecond = this.tblRegistersDate8DateObj.getSeconds();
                this.tblRegistersDate8DateSecond_print = ("0" + this.tblRegistersDate8DateObj.getSeconds()).slice(-2);

                this.tblRegistersDate8_print = FunctionsGeneric.dateRead01(this.tblRegistersDate8, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configRegistersDate8Type);
            }

            this.tblRegistersDate9 = this.resultsRegistersDetails[0].date9;
            if(this.tblRegistersDate9)
            {
                this.tblRegistersDate9DateObj = this.tblRegistersDate9;
                this.tblRegistersDate9DateYear = this.tblRegistersDate9DateObj.getFullYear();
                this.tblRegistersDate9DateDay = this.tblRegistersDate9DateObj.getDate();
                this.tblRegistersDate9DateMonth = (this.tblRegistersDate9DateObj.getMonth() + 1);
            
                this.tblRegistersDate9DateHour = this.tblRegistersDate9DateObj.getHours();
                this.tblRegistersDate9DateHour_print = ("0" + this.tblRegistersDate9DateObj.getHours()).slice(-2);

                this.tblRegistersDate9DateMinute = this.tblRegistersDate9DateObj.getMinutes();
                this.tblRegistersDate9DateMinute_print = ("0" + this.tblRegistersDate9DateObj.getMinutes()).slice(-2);

                this.tblRegistersDate9DateSecond = this.tblRegistersDate9DateObj.getSeconds();
                this.tblRegistersDate9DateSecond_print = ("0" + this.tblRegistersDate9DateObj.getSeconds()).slice(-2);

                this.tblRegistersDate9_print = FunctionsGeneric.dateRead01(this.tblRegistersDate9, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configRegistersDate9Type);
            }

            this.tblRegistersDate10 = this.resultsRegistersDetails[0].date10;
            if(this.tblRegistersDate10)
            {
                this.tblRegistersDate10DateObj = this.tblRegistersDate10;
                this.tblRegistersDate10DateYear = this.tblRegistersDate10DateObj.getFullYear();
                this.tblRegistersDate10DateDay = this.tblRegistersDate10DateObj.getDate();
                this.tblRegistersDate10DateMonth = (this.tblRegistersDate10DateObj.getMonth() + 1);
            
                this.tblRegistersDate10DateHour = this.tblRegistersDate10DateObj.getHours();
                this.tblRegistersDate10DateHour_print = ("0" + this.tblRegistersDate10DateObj.getHours()).slice(-2);

                this.tblRegistersDate10DateMinute = this.tblRegistersDate10DateObj.getMinutes();
                this.tblRegistersDate10DateMinute_print = ("0" + this.tblRegistersDate10DateObj.getMinutes()).slice(-2);

                this.tblRegistersDate10DateSecond = this.tblRegistersDate10DateObj.getSeconds();
                this.tblRegistersDate10DateSecond_print = ("0" + this.tblRegistersDate10DateObj.getSeconds()).slice(-2);

                this.tblRegistersDate10_print = FunctionsGeneric.dateRead01(this.tblRegistersDate10, 
                                                                            gSystemConfig.configBackendDateFormat, 
                                                                            0, 
                                                                            gSystemConfig.configRegistersDate10Type);
            }

            this.tblRegistersImageMain = this.resultsRegistersDetails[0].image_main;
            this.tblRegistersImageMainCaption = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].image_main_caption, "db");
            this.tblRegistersImageLogo = this.resultsRegistersDetails[0].image_logo;
            this.tblRegistersImageBanner = this.resultsRegistersDetails[0].image_banner;
           
            this.tblRegistersFile1 = this.resultsRegistersDetails[0].file1;
            this.tblRegistersFile2 = this.resultsRegistersDetails[0].file2;
            this.tblRegistersFile3 = this.resultsRegistersDetails[0].file3;
            this.tblRegistersFile4 = this.resultsRegistersDetails[0].file4;
            this.tblRegistersFile5 = this.resultsRegistersDetails[0].file5;

            this.tblRegistersActivation = this.resultsRegistersDetails[0].activation;
            if(this.tblRegistersActivation == 0)
            {
                this.tblRegistersActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblRegistersActivation == 1)
            {
                this.tblRegistersActivation_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblRegistersActivation1 = this.resultsRegistersDetails[0].activation1;
            if(this.tblRegistersActivation1 == 0)
            {
                this.tblRegistersActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblRegistersActivation1 == 1)
            {
                this.tblRegistersActivation1_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblRegistersActivation2 = this.resultsRegistersDetails[0].activation2;
            if(this.tblRegistersActivation2 == 0)
            {
                this.tblRegistersActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblRegistersActivation2 == 1)
            {
                this.tblRegistersActivation2_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblRegistersActivation3 = this.resultsRegistersDetails[0].activation3;
            if(this.tblRegistersActivation3 == 0)
            {
                this.tblRegistersActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblRegistersActivation3 == 1)
            {
                this.tblRegistersActivation3_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblRegistersActivation4 = this.resultsRegistersDetails[0].activation4;
            if(this.tblRegistersActivation4 == 0)
            {
                this.tblRegistersActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblRegistersActivation4 == 1)
            {
                this.tblRegistersActivation4_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }
            this.tblRegistersActivation5 = this.resultsRegistersDetails[0].activation5;
            if(this.tblRegistersActivation5 == 0)
            {
                this.tblRegistersActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation0");
            }
            if(this.tblRegistersActivation5 == 1)
            {
                this.tblRegistersActivation5_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemActivation1");
            }

            this.tblRegistersIdStatus = this.resultsRegistersDetails[0].id_status;
            if(this.tblRegistersIdStatus == 0)
            {
                this.tblRegistersIdStatus_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemDropDownSelectNone");
            }else{
                this.tblRegistersIdStatus_print = FunctionsGeneric.contentMaskRead(await FunctionsDB.genericFieldGet01(this.tblRegistersIdStatus, gSystemConfig.configSystemDBTableFiltersGeneric, "title"), "db");
            }

            this.tblRegistersRestrictedAccess = this.resultsRegistersDetails[0].restricted_access;
            if(this.tblRegistersRestrictedAccess == 0)
            {
                this.tblRegistersRestrictedAccess_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemRestrictedAccess0");
            }
            if(this.tblRegistersRestrictedAccess == 1)
            {
                this.tblRegistersRestrictedAccess_print = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this.labelPrefix + "ItemRestrictedAccess1");
            }

            this.tblRegistersNotes = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].notes, "db");
            this.tblRegistersNotes_edit = FunctionsGeneric.contentMaskRead(this.resultsRegistersDetails[0].notes, "db");
    

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


    //Usage.
    //----------------------
    /*
    this.arrSearchParameters = [];
    this.ordRecord = "";
    this.ordRecordParameters = {
        _arrSearchParameters: this.arrSearchParameters,
        _idTbRegisters: this._idTbRegisters,
        _terminal: 0,
        _objSpecialParameters: {returnType: 3}
    };

    this.ordRecord = new SyncSystemNS.ObjectFormsFieldsDetails(this.ordRecordParameters);
    await this.ordRecord.recordDetailsGet(0, 3);
    */
    //----------------------
};