"use strict";

//Import Node Modules.
//----------------------
const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

//const formidable = require("formidable"); //Form file upload.
//----------------------


//API - Publications - listing - GET.
//**************************************************************************************
//Debug: http://localhost:3000/api/publications/1369/?apiKey=createSecretPassword
router.get("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIPublications + "/:idParentPublications?", (req, res)=>{ //working, with the async block
    //Variables.
    //----------------------
    let objReturn = {returnStatus: false};
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");
   
    //let ocdRecord;
    //let ocdRecordParameters;

    let oplRecords;
    let oplRecordsParameters;
    let objSpecialParameters;

    //let cdBackend;
    let idParentPublications = "";
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
    if(req.params.idParentPublications)
    {
        idParentPublications = req.params.idParentPublications;
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
    //console.log("idParentPublications=", idParentPublications);
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            if(idParentPublications != "")
            {
                //if(configAPIKey == apiKey)
                if(configAPIKey == SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, "env"), 2))
                {
                    //Check if it´s an ID (number).
                    if(isNaN(idParentPublications))
                    {
                        //Search for friendly name.
                        let resultURLAlias = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                                ["url_alias;" + idParentPublications + ";s", "activation;1;i"], 
                                                                                                gSystemConfig.configCategoriesSort, 
                                                                                                "", 
                                                                                                "id, id_parent", 
                                                                                                1, 
                                                                                                {returnType: 3}); //debug: asdfa / 308
    
                        if(resultURLAlias)
                        {
                            idParentPublications = resultURLAlias[0]["id"];
                        }else{
                            idParentPublications = -1;
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
                    oplRecordsParameters = {
                        _arrSearchParameters: ["id_parent;" + idParentPublications + ";i"],
                        _configSortOrder: gSystemConfig.configPublicationsSort,
                        _strNRecords: "",
                        _objSpecialParameters: objSpecialParameters
                    };
                    //Revision {returnType: 3} = objSpecialParameters

                    //Build object - listing.
                    oplRecords = new SyncSystemNS.ObjectPublicationsListing(oplRecordsParameters);
                    await oplRecords.recordsListingGet(0, 3);
                        

                    //Build return object.
                    objReturn.returnStatus = true;
                    //objReturn.ocdRecord = ocdRecord;
                    objReturn.oplRecords = oplRecords;
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


//API - Publications - details - GET.
//**************************************************************************************
//Debug: http://localhost:3000/api/publications/details/1291/?apiKey=createSecretPassword
router.get("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIPublications + "/" + gSystemConfig.configRouteAPIDetails + "/:idTbPublications?", (req, res)=>{ //working, with the async block
    //Variables.
    //----------------------
    let objReturn = {returnStatus: false};
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");
    //let clBackend = new PublicationsListing();
   
    let opdRecord;
    let opdRecordParameters;

    //let oclRecords;
    //let oclRecordsParameters;

    //let cdBackend;
    let idTbPublications = "";
    let pageNumber = "";
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
    if(req.params.idTbPublications)
    {
        idTbPublications = req.params.idTbPublications;
    }
    if(req.query.pageNumber)
    {
        pageNumber = req.query.pageNumber;
    }

    if(req.query.apiKey)
    {
        apiKey = req.query.apiKey;
    }
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            if(idTbPublications != "")
            {
                //if(configAPIKey == apiKey)
                if(configAPIKey == SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, "env"), 2))
                {
                    //Parameters build - details.
                    opdRecordParameters = {
                        _arrSearchParameters: ["id;" + idTbPublications + ";i", "activation;1;i"],
                        _idTbPublications: idTbPublications,
                        _terminal: terminal,
                        _objSpecialParameters: {returnType: 3}
                    };

                    //Build object - details.
                    opdRecord = new SyncSystemNS.ObjectPublicationsDetails(opdRecordParameters);
                    await opdRecord.recordDetailsGet(0, 3);
                    

                    //Parameters build - listing.
                    /*
                    oclRecordsParameters = {
                        _arrSearchParameters: ["id_parent;" + idTbPublications + ";i"],
                        _configSortOrder: gSystemConfig.configPublicationsSort,
                        _strNRecords: "",
                        _objSpecialParameters: {returnType: 3}
                    };
                    */
                    //Build object - listing.
                    //oclRecords = new SyncSystemNS.ObjectPublicationsListing(oclRecordsParameters);
                    //await oclRecords.recordsListingGet(0, 3);
                        

                    //Build return object.
                    objReturn.returnStatus = true;
                    objReturn.opdRecord = opdRecord;
                    //objReturn.oclRecords = oclRecords;
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
            /*
            //Object instance.
            cdBackend = new PublicationsDetails({
                idTbPublications: idTbPublications,
                pageNumber: pageNumber,
                masterPageSelect: masterPageSelect,

                messageSuccess: messageSuccess,
                messageError: messageError,
                messageAlert: messageAlert,
                nRecords: nRecords
            });  
            
            //Build object data.
            await cdBackend.build();

            //return res.json(categoriesListingResultJsonObj);
            //res.send(idTbPublications);
            res.json(cdBackend);
            */
            

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