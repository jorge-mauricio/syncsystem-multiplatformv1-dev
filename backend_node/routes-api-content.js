"use strict";

//Import Node Modules.
//----------------------
const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

//const formidable = require("formidable"); //Form file upload.
//----------------------


//API - Content - listing - GET.
//**************************************************************************************
//Debug: http://localhost:3000/api/content/849/?apiKey=createSecretPassword
//Debug: http://localhost:3000/api/content/1383/?apiKey=createSecretPassword&contentType=3
router.get("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIContent + "/:idParent?", (req, res)=>{ //working, with the async block
    //Import objects.
    //----------------------
    //const CategoriesListing = require("./" + gSystemConfig.configDirectorySystem + "/categories-listing.js");
    //const CategoriesDetails = require("../" + gSystemConfig.configDirectorySystem + "/categories-details.js");
    //----------------------


    //Variables.
    //----------------------
    let objReturn = {returnStatus: false};
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");
    //let clBackend = new CategoriesListing();
   
    //let ocdRecord;
    //let ocdRecordParameters;

    let oclRecords;
    let oclRecordsParameters;
    let objSpecialParameters;

    //let cdBackend;
    let idParent = "";
    let contentType = "";

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
    if(req.params.idParent)
    {
        idParent = req.params.idParent;
    }
    if(req.query.contentType)
    {
        contentType = req.query.contentType;
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
    //console.log("idTbCategories=", idTbCategories);
    //console.log("contentType=", contentType);
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            if(idParent != "")
            {
                //if(configAPIKey == apiKey)
                if(configAPIKey == SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, "env"), 2))
                {
                    //Check if it´s an ID (number).
                    if(isNaN(idParent))
                    {
                        //Search for friendly name.
                        let resultURLAlias = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                                ["url_alias;" + idParent + ";s", "activation;1;i"], 
                                                                                                gSystemConfig.configCategoriesSort, 
                                                                                                "", 
                                                                                                "id, id_parent", 
                                                                                                1, 
                                                                                                {returnType: 3}); //debug: asdfa / 308
    
                        if(resultURLAlias)
                        {
                            idParent = resultURLAlias[0]["id"];
                        }else{
                            idParent = -1;
                        }        


                        //Debug.
                        //console.log("number=false");
                        //console.log("resultURLAlias=", resultURLAlias);
                    }else{
                        //Debug.
                        //console.log("number=true");
                    }


                    //Parameters build - details.
                    /*
                    ocdRecordParameters = {
                        _arrSearchParameters: ["id;" + idTbCategories + ";i"],
                        _idTbCategories: idTbCategories,
                        _terminal: terminal,
                        _objSpecialParameters: {returnType: 3}
                    };
                    */

                    objSpecialParameters = {returnType: 3};
                    if(pageNumber != "")
                    {
                        objSpecialParameters.pageNumber = pageNumber;
                    }
                    if(pagingNRecords != "")
                    {
                        objSpecialParameters.pagingNRecords = pagingNRecords;
                    }

                    /*
                    ocdRecordParameters = {
                        _arrSearchParameters: ["id;" + idParent + ";i"],
                        _idTbCategories: idParent,
                        _terminal: terminal,
                        _objSpecialParameters: objSpecialParameters
                    };
                    */
                    //Debug.
                    //console.log("ocdRecordParameters=", ocdRecordParameters);
                    

                    //Build object - details.
                    //ocdRecord = new SyncSystemNS.ObjectCategoriesDetails(ocdRecordParameters);
                    //await ocdRecord.recordDetailsGet(0, 3);
                    

                    //Parameters build - listing.
                    oclRecordsParameters = {
                        _arrSearchParameters: ["id_parent;" + idParent + ";i"],
                        _configSortOrder: gSystemConfig.configContentSort,
                        _strNRecords: "",
                        _objSpecialParameters: {returnType: 3}
                    };
                    if(contentType != "")
                    {
                        oclRecordsParameters._arrSearchParameters.push("content_type;" + contentType + ";i");

                    }
        
                    //Build object - listing.
                    oclRecords = new SyncSystemNS.ObjectContentListing(oclRecordsParameters);
                    await oclRecords.recordsListingGet(0, 3);
                        

                    //Build return object.
                    objReturn.returnStatus = true;
                    //objReturn.ocdRecord = ocdRecord;
                    objReturn.oclRecords = oclRecords;
                    //console.log("objReturn=",objReturn);


                    //Serve object.
                    //res.json(ocdRecord);
                    //res.json(objReturn);
                }else{
                    //API key not the same.
                    objReturn.returnStatus = false;
                    objReturn.errorMessage = "statusMessageAPI2e";

                    ////res.json(objReturn);
                }
            }
            /*
            //Object instance.
            cdBackend = new CategoriesDetails({
                idTbCategories: idTbCategories,
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
            //res.send(idTbCategories);
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