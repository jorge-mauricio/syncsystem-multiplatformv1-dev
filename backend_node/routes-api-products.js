"use strict";

//Import Node Modules.
//----------------------
const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

//const formidable = require("formidable"); //Form file upload.
//----------------------


//API - Products - listing - GET.
//**************************************************************************************
//Debug: http://localhost:3000/api/products/960/?apiKey=createSecretPassword
router.get("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIProducts + "/:idParentProducts?", (req, res)=>{ //working, with the async block
    //Variables.
    //----------------------
    let objReturn = {returnStatus: false};
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");
   
    //let ocdRecord;
    //let ocdRecordParameters;

    let oplRecords;
    let oplRecordsParameters;

    let arrSearchParameters = [];
    let objSpecialParameters;

    let activation;
    let activation1;
    let activation2;
    let activation3;
    let activation4;
    let activation5;

    //let cdBackend;
    let idParentProducts = "";
    let pageNumber = "";
    let pagingNRecords = "";
    let strNRecords = "";
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
    if(req.params.idParentProducts)
    {
        idParentProducts = req.params.idParentProducts;
    }

    if(req.query.activation)
    {
        activation = req.query.activation;
    }
    if(req.query.activation1)
    {
        activation1 = req.query.activation1;
    }
    if(req.query.activation2)
    {
        activation2 = req.query.activation2;
    }
    if(req.query.activation3)
    {
        activation3 = req.query.activation3;
    }
    if(req.query.activation4)
    {
        activation4 = req.query.activation4;
    }
    if(req.query.activation5)
    {
        activation5 = req.query.activation5;
    }

    if(req.query.pageNumber)
    {
        pageNumber = req.query.pageNumber;
    }
    if(req.query.pagingNRecords)
    {
        pagingNRecords = req.query.pagingNRecords;
    }
    if(req.query.strNRecords)
    {
        strNRecords = req.query.strNRecords;
    }    

    if(req.query.apiKey)
    {
        apiKey = req.query.apiKey;
    }


    //Debug.
    //console.log("idParentProducts=", idParentProducts);
    //console.log("strNRecords=", strNRecords);
    //----------------------


    //Logic.
    //----------------------
    (async function(){ //async marks the block
        try
        { 
            if(idParentProducts != "")
            {
                //if(configAPIKey == apiKey)
                if(configAPIKey == SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, "env"), 2))
                {
                    //Check if it´s an ID (number).
                    if(isNaN(idParentProducts))
                    {
                        //Search for friendly name.
                        let resultURLAlias = await SyncSystemNS.FunctionsDB.genericTableGet02(gSystemConfig.configSystemDBTableCategories, 
                                                                                                ["url_alias;" + idParentProducts + ";s", "activation;1;i"], 
                                                                                                gSystemConfig.configCategoriesSort, 
                                                                                                "", 
                                                                                                "id, id_parent", 
                                                                                                1, 
                                                                                                {returnType: 3}); //debug: asdfa / 308
    
                        if(resultURLAlias)
                        {
                            idParentProducts = resultURLAlias[0]["id"];
                        }else{
                            idParentProducts = -1;
                        }        


                        //Debug.
                        //console.log("number=false");
                        //console.log("resultURLAlias=", resultURLAlias);
                    }else{
                        //Debug.
                        //console.log("number=true");
                    }


                    //Parameters build.
                    arrSearchParameters.push("id_parent;" + idParentProducts + ";s");
                    if(activation)
                    {
                        arrSearchParameters.push("activation;" + activation + ";i");
                    }/*else{
                        arrSearchParameters.push("activation;1;i");
                    }*/
                    if(activation1)
                    {
                        arrSearchParameters.push("activation1;" + activation1 + ";i");
                    }
                    if(activation2)
                    {
                        arrSearchParameters.push("activation2;" + activation2 + ";i");
                    }
                    if(activation3)
                    {
                        arrSearchParameters.push("activation3;" + activation3 + ";i");
                    }
                    if(activation4)
                    {
                        arrSearchParameters.push("activation4;" + activation4 + ";i");
                    }
                    if(activation5)
                    {
                        arrSearchParameters.push("activation5;" + activation5 + ";i");
                    }
                    
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
                        _arrSearchParameters: ["id_parent;" + idParentProducts + ";i"],
                        _configSortOrder: gSystemConfig.configProductsSort,
                        _strNRecords: "",
                        _objSpecialParameters: objSpecialParameters
                    };
                    //Revision {returnType: 3} = objSpecialParameters

                    if(strNRecords != "")
                    {
                        oplRecordsParameters._strNRecords = strNRecords;
                    }

                    //Build object - listing.
                    oplRecords = new SyncSystemNS.ObjectProductsListing(oplRecordsParameters);
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


//API - Products - details - GET.
//**************************************************************************************
//Debug: http://localhost:3000/api/products/details/1291/?apiKey=createSecretPassword
router.get("/" + gSystemConfig.configRouteAPI + "/" + gSystemConfig.configRouteAPIProducts + "/" + gSystemConfig.configRouteAPIDetails + "/:idTbProducts?", (req, res)=>{ //working, with the async block
    //Variables.
    //----------------------
    let objReturn = {returnStatus: false};
    let configAPIKey = SyncSystemNS.FunctionsGeneric.contentMaskWrite(process.env.CONFIG_API_KEY_SYSTEM, "env");
    //let clBackend = new ProductsListing();
   
    let opdRecord;
    let opdRecordParameters;

    //let oclRecords;
    //let oclRecordsParameters;

    //let cdBackend;
    let idTbProducts = "";
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
    if(req.params.idTbProducts)
    {
        idTbProducts = req.params.idTbProducts;
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
            if(idTbProducts != "")
            {
                //if(configAPIKey == apiKey)
                if(configAPIKey == SyncSystemNS.FunctionsCrypto.decryptValue(SyncSystemNS.FunctionsGeneric.contentMaskRead(apiKey, "env"), 2))
                {
                    //Parameters build - details.
                    opdRecordParameters = {
                        _arrSearchParameters: ["id;" + idTbProducts + ";i", "activation;1;i"],
                        _idTbProducts: idTbProducts,
                        _terminal: terminal,
                        _objSpecialParameters: {returnType: 3}
                    };

                    //Build object - details.
                    opdRecord = new SyncSystemNS.ObjectProductsDetails(opdRecordParameters);
                    await opdRecord.recordDetailsGet(0, 3);
                    

                    //Parameters build - listing.
                    /*
                    oclRecordsParameters = {
                        _arrSearchParameters: ["id_parent;" + idTbProducts + ";i"],
                        _configSortOrder: gSystemConfig.configProductsSort,
                        _strNRecords: "",
                        _objSpecialParameters: {returnType: 3}
                    };
                    */
                    //Build object - listing.
                    //oclRecords = new SyncSystemNS.ObjectProductsListing(oclRecordsParameters);
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
            cdBackend = new ProductsDetails({
                idTbProducts: idTbProducts,
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
            //res.send(idTbProducts);
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