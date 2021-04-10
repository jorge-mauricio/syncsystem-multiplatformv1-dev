"use strict";

//Import Node Modules.
//----------------------
const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

//const formidable = require("formidable"); //Form file upload.
//----------------------


//API - Files - listing - GET.
//**************************************************************************************
//Debug: http://localhost:3000/api/files/960/?apiKey=createSecretPassword
router.get("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIFiles + "/:idParentFiles?", (req, res)=>{ //working, with the async block
    //Variables.
    //----------------------
    let objReturn = {returnStatus: false};
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");
   
    //let ocdRecord;
    //let ocdRecordParameters;

    let oflRecords;
    let oflRecordsParameters;
    let objSpecialParameters;

    //let cdBackend;
    let idParentFiles = "";
    let fileType = "";
    
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
    if(req.params.idParentFiles)
    {
        idParentFiles = req.params.idParentFiles;
    }
    if(req.query.fileType)
    {
        fileType = req.query.fileType;
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
    console.log("idParentFiles=", idParentFiles);
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            if(idParentFiles != "")
            {
                //if(configAPIKey == apiKey)
                if(configAPIKey == SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, "env"), 2))
                {
                    //Check if it´s an ID (number).
                    if(isNaN(idParentFiles))
                    {
                        //Search for friendly name.
                        let resultURLAlias = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                                ["url_alias;" + idParentFiles + ";s", "activation;1;i"], 
                                                                                                gSystemConfig.configCategoriesSort, 
                                                                                                "", 
                                                                                                "id, id_parent", 
                                                                                                1, 
                                                                                                {returnType: 3}); //debug: asdfa / 308
    
                        if(resultURLAlias)
                        {
                            idParentFiles = resultURLAlias[0]["id"];
                        }else{
                            idParentFiles = -1;
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
                    oflRecordsParameters = {
                        _arrSearchParameters: ["id_parent;" + idParentFiles + ";i"],
                        _configSortOrder: gSystemConfig.configFilesSort,
                        _strNRecords: "",
                        _objSpecialParameters: objSpecialParameters
                    };
                    if(fileType != "")
                    {
                        oflRecordsParameters._arrSearchParameters.push("file_type;" + fileType + ";i")
                    }
                    //Revision {returnType: 3} = objSpecialParameters

                    //Build object - listing.
                    oflRecords = new SyncSystemNS.ObjectFilesListing(oflRecordsParameters);
                    await oflRecords.recordsListingGet(0, 3);
                        

                    //Build return object.
                    objReturn.returnStatus = true;
                    //objReturn.ocdRecord = ocdRecord;
                    objReturn.oflRecords = oflRecords;
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


//API - Files - details - GET.
//**************************************************************************************
//Debug: http://localhost:3000/api/files/details/1291/?apiKey=createSecretPassword
router.get("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIFiles + "/" + gSystemConfig.configRouteAPIDetails + "/:idTbFiles?", (req, res)=>{ //working, with the async block
    //Variables.
    //----------------------
    let objReturn = {returnStatus: false};
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");
    //let clBackend = new FilesListing();
   
    let opdRecord;
    let opdRecordParameters;

    //let oclRecords;
    //let oclRecordsParameters;

    //let cdBackend;
    let idTbFiles = "";
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
    if(req.params.idTbFiles)
    {
        idTbFiles = req.params.idTbFiles;
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
            if(idTbFiles != "")
            {
                //if(configAPIKey == apiKey)
                if(configAPIKey == SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, "env"), 2))
                {
                    //Parameters build - details.
                    opdRecordParameters = {
                        _arrSearchParameters: ["id;" + idTbFiles + ";i", "activation;1;i"],
                        _idTbFiles: idTbFiles,
                        _terminal: terminal,
                        _objSpecialParameters: {returnType: 3}
                    };

                    //Build object - details.
                    opdRecord = new SyncSystemNS.ObjectFilesDetails(opdRecordParameters);
                    await opdRecord.recordDetailsGet(0, 3);
                    

                    //Parameters build - listing.
                    /*
                    oclRecordsParameters = {
                        _arrSearchParameters: ["id_parent;" + idTbFiles + ";i"],
                        _configSortOrder: gSystemConfig.configFilesSort,
                        _strNRecords: "",
                        _objSpecialParameters: {returnType: 3}
                    };
                    */
                    //Build object - listing.
                    //oclRecords = new SyncSystemNS.ObjectFilesListing(oclRecordsParameters);
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
            cdBackend = new FilesDetails({
                idTbFiles: idTbFiles,
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
            //res.send(idTbFiles);
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