"use strict";

//Import Node Modules.
//----------------------
const express = require("express");
const router = express.Router();

const gSystemConfig = require("../config-application.js"); //System configuration.
//const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

//const formidable = require("formidable"); //Form file upload.
//----------------------


//Categories - get all.
//----------------------
//router.get("/api/categories", (req,res)=>
router.get("/", (req, res)=>
{
    //Variables.
    let categoriesListingResultJsonObj = ""; //read database.


    //Serve json.
    //res.json(categoriesListingResultJsonObj);
    return res.json(categoriesListingResultJsonObj); //with return, prevents error "headers already sent"
});
//----------------------


//Categories - get single.
//----------------------
//router.get("/api/categories/:id", (req,res)=>
router.get("/:id", (req, res)=>
{
    //Variables.
    let categoriesListingResultJsonObj = "";

    //Search database.


    //Check if exists.


    //Serve results.
    if(categoriesListingResultJsonObj)
    {
        return res.json(categoriesListingResultJsonObj);
    }else{
        return res.status(400).json({error_message: "Records not found. (id=" + req.params.id + ")"})
    }


    //Debug.
    res.send(req.params.id); //http://localhost:3000/api/categories/123
});
//----------------------



//Categories - insert record.
//----------------------
/*
router.post("/", (req, res)=>
{

});
*/
//----------------------


//Categories - update record.
//----------------------
/*
router.put("/", (req, res)=>
{

});
*/
//----------------------


//Categories - delete record.
//----------------------
/*
router.delete("/", (req, res)=>
{

});
*/
//----------------------


//Export.
module.exports = router;