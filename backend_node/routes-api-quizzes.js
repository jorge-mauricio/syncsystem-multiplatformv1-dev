"use strict";

//Import Node Modules.
//----------------------
const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

const formidable = require("formidable"); //Form file upload.
const fetch = require("node-fetch");
//const nodemailer = require("nodemailer");
//----------------------


//API - Quizzes - listing - GET.
//**************************************************************************************
//Debug: http://localhost:3000/api/quizzes/1648/?apiKey=createSecretPassword
router.get("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIQuizzes + "/:idParentQuizzes?", (req, res)=>{ //working, with the async block
    //Variables.
    //----------------------
    let objReturn = {returnStatus: false};
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");
   
    //let ocdRecord;
    //let ocdRecordParameters;

    let oqlRecords;
    let oqlRecordsParameters;
    let objSpecialParameters;

    let oqolRecords;
    let oqolRecordsParameters;

    //let cdBackend;
    let idParentQuizzes = "";
    let pageNumber = "";
    let pagingNRecords = "";
    let terminal = 0; //get from query
    //let masterPageSelect = "layout-backend-main";

    //let messageSuccess = "";
    //let messageError = "";
    //let messageAlert = "";
    //let nRecords = "";

    let apiKey = "";
    //----------------------


    //Value definition.
    //----------------------
    if(req.params.idParentQuizzes)
    {
        idParentQuizzes = req.params.idParentQuizzes;
    }

    if(req.query.pageNumber)
    {
        pageNumber = req.query.pageNumber;
    }
    if(req.query.pagingNRecords)
    {
        pageNumber = req.query.pagingNRecords;
    }

    if(req.query.apiKey)
    {
        apiKey = req.query.apiKey;
    }


    //Debug.
    //console.log("idParentQuizzes=", idParentQuizzes);
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            if(idParentQuizzes != "")
            {
                //if(configAPIKey == apiKey)
                if(configAPIKey == SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, "env"), 2))
                {
                    //Check if it´s an ID (number).
                    if(isNaN(idParentQuizzes))
                    {
                        //Search for friendly name.
                        let resultURLAlias = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                                ["url_alias;" + idParentQuizzes + ";s", "activation;1;i"], 
                                                                                                gSystemConfig.configCategoriesSort, 
                                                                                                "", 
                                                                                                "id, id_parent", 
                                                                                                1, 
                                                                                                {returnType: 3}); //debug: asdfa / 308
    
                        if(resultURLAlias)
                        {
                            idParentQuizzes = resultURLAlias[0]["id"];
                        }else{
                            idParentQuizzes = -1;
                        }        


                        //Debug.
                        //console.log("number=false");
                        //console.log("resultURLAlias=", resultURLAlias);
                    }else{
                        //Debug.
                        //console.log("number=true");
                    }


                    //Parameters build.
                    objSpecialParameters = {returnType: 3};
                    if(pageNumber != "")
                    {
                        objSpecialParameters.pageNumber = pageNumber;
                    }
                    if(pagingNRecords != "")
                    {
                        objSpecialParameters.pagingNRecords = pagingNRecords;
                    }

                    //Parameters build - listing.
                    oqlRecordsParameters = {
                        _arrSearchParameters: ["id_parent;" + idParentQuizzes + ";i"],
                        _configSortOrder: gSystemConfig.configQuizzesSort,
                        _strNRecords: "",
                        _objSpecialParameters: objSpecialParameters
                    };
                    //Revision {returnType: 3} = objSpecialParameters

                    //Build object - listing.
                    oqlRecords = new SyncSystemNS.ObjectQuizzesListing(oqlRecordsParameters);
                    await oqlRecords.recordsListingGet(0, 3);


                    //Quizzes options.
                    //Loop through quizzes.
                    for(let countArray = 0; countArray < oqlRecords.resultsQuizzesListing.length; countArray++)
                    {
                        //Parameters build - options listing.
                        oqolRecordsParameters = {
                            _arrSearchParameters: ["id_quizzes;" + oqlRecords.resultsQuizzesListing[countArray].id + ";i"],
                            _configSortOrder: gSystemConfig.configQuizzesOptionsSort,
                            _strNRecords: "",
                            _objSpecialParameters: objSpecialParameters
                        };

                        //Build object - listing.
                        oqolRecords = new SyncSystemNS.ObjectQuizzesOptionsListing(oqolRecordsParameters);
                        await oqolRecords.recordsListingGet(0, 3);

                        
                        //Add options listing to output.
                        //oqlRecords.resultsQuizzesListing[countArray].quizzesOptions = {id: "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"};//debug.
                        oqlRecords.resultsQuizzesListing[countArray].quizzesOptions = oqolRecords.resultsQuizzesOptionsListing;
                        

                        //Debug.
                        //console.log("oqlRecords.resultsQuizzesListing[]=", oqlRecords.resultsQuizzesListing[countArray]);
                    }
                    //Debug.
                    //console.log("oqlRecords.resultsQuizzesListing.length=", oqlRecords.resultsQuizzesListing.length);
                        

                    //Build return object.
                    objReturn.returnStatus = true;
                    //objReturn.ocdRecord = ocdRecord;
                    objReturn.oqlRecords = oqlRecords;
                    //console.log("objReturn=",objReturn);


                    //Serve object.
                    //res.json(ocdRecord);
                    //res.json(objReturn);
                }else{
                    //API key not the same.
                    objReturn.returnStatus = false;
                    objReturn.errorMessage = "statusMessageAPI2e";

                    //res.json(objReturn);
                }
            }
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }
        }finally{
            //Serve object.
            res.json(objReturn);
        }
    })();
    //----------------------
});
//**************************************************************************************


//Export.
module.exports = router;