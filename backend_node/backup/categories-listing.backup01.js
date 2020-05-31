"use strict";

//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");

const _ = require('lodash'); //Loadash
//----------------------


module.exports = class CategoriesListing
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        //objParameters = {idParentCategories: 123, configSortOrder: ""}


        //Properties.
        //----------------------
        this._idParent = objParameters.idParent;

        this.contentType = "categories-default"; //categories-default | 

        this.cphTitle = ""; //text
        this.cphHead = ""; //HTML
        this.cphTitleCurrent = ""; //text
        //this.cphBody = "html body"; 
        //this.cphBody = this.cphBodyBuild(); //HTML
        this.cphBody = ""; //HTML

        this.titleCurrent = "";

        this.metaTitle = "";
        this.metaDescription = "";
        this.metaKeywords = "";
        //----------------------

        /*
        (async function(){ 
            try{
                //cphBody = await this.cphBodyBuild();
                await this.cphBodyBuild();
            }catch(asyncError){
                console.error(asyncError);
            }finally{
                
            }
        })();
        */
    }
    //**************************************************************************************


    //Getters / Setters.
    //**************************************************************************************
    /*
    set _idParent(val){
        //console.log("setting foo")
        this._idParent = val;
    }

    get _idParent(){
        //console.log("getting foo");
        return this._idParent;
    }
    */
    //**************************************************************************************


    //Build object´s content.
    //**************************************************************************************
    async build()
    {
        //Logic.
        //----------------------
        try
        {
            //Tittle - current.
            if(this._idParent != 0)
            {
                let tblCategoryCurrent = await SyncSystemNS.FunctionsDB.genericTableGet02("categories", 
                                                                                        ["id;" + this._idParent + ";i"], 
                                                                                        "", 
                                                                                        "1", 
                                                                                        "id, title, activation", 
                                                                                        1, 
                                                                                        {returnType: 3});
                
                if(tblCategoryCurrent.length !== 0) //check for empty (not working)
                //if(!tblCategoryCurrent.length === 0) //check for empty (not working)
                //if(!_.isEmpty(tblCategoryCurrent)) //check for empty (loadash)
                {
                    
                    this.cphTitle += " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(tblCategoryCurrent[0].title, "db");
                

                    //Degug.
                    //console.log("tblCategoryCurrent (vazio) = ");
                    //console.log(tblCategoryCurrent);
                    //console.log(tblCategoryCurrent.length);
                    //console.log(tblCategoryCurrent.length);
                }
                //Debug.
                //console.log("tblCategoryCurrent = ", tblCategoryCurrent);
                //console.log(tblCategoryCurrent);
            }
                
            this.titleCurrent = "";






            //Title content placeholder.
            await this.cphTitleBuild();

            
            //Head content placeholder.
            await this.cphHeadBuild();


            //Title content placeholder.
            await this.cphTitleCurrentBuild();

            //Body content placeholder.
            await this.cphBodyBuild();
        }catch(asyncError){
            console.error(asyncError);
        }finally{

        }
        //----------------------
    }
    //**************************************************************************************


    //Build content placeholder title.
    //**************************************************************************************
    //static async cphBodyBuild()
    async cphTitleBuild()
    {
        //Logic.
        //----------------------
        try
        {
            this.cphTitle = SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleMain");

            if(this._idParent != 0)
            {
                let tblCategoryCurrent = await SyncSystemNS.FunctionsDB.genericTableGet02("categories", 
                                                                                        ["id;" + this._idParent + ";i"], 
                                                                                        "", 
                                                                                        "1", 
                                                                                        "id, title, activation", 
                                                                                        1, 
                                                                                        {returnType: 3});
                
                if(tblCategoryCurrent.length !== 0) //check for empty (not working)
                //if(!tblCategoryCurrent.length === 0) //check for empty (not working)
                //if(!_.isEmpty(tblCategoryCurrent)) //check for empty (loadash)
                {
                    
                    this.cphTitle += " - " + SyncSystemNS.FunctionsGeneric.contentMaskRead(tblCategoryCurrent[0].title, "db");
                

                    //Degug.
                    //console.log("tblCategoryCurrent (vazio) = ");
                    //console.log(tblCategoryCurrent);
                    //console.log(tblCategoryCurrent.length);
                    //console.log(tblCategoryCurrent.length);
                }


                //Debug.
                //console.log("tblCategoryCurrent = ", tblCategoryCurrent);
                //console.log(tblCategoryCurrent);
            }
            
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }            
        }finally{

        }
        //----------------------
    }
    //**************************************************************************************


    //Build content placeholder head.
    //**************************************************************************************
    async cphHeadBuild()
    {
        //Logic.
        //----------------------
        try
        {
            this.cphHead += `
                <meta name="title" content="" /> ${ /*Bellow 160 characters.*/'' }
                <meta name="description" content="" /> ${ /*Bellow 100 characters.*/'' }
                <meta name="keywords" content="" /> ${ /*Bellow 60 characters.*/'' }

                ${ /*Open Graph tags.*/'' }
                <meta property="og:title" content="" />
                <meta property="og:type" content="website" /> ${ /*http://ogp.me/#types | https://developers.facebook.com/docs/reference/opengraph/*/'' }
                <meta property="og:url" content="" />
                <meta property="og:description" content="" />
                <meta property="og:image" content="" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
                <meta property="og:image:alt" content="" />
                <meta property="og:locale" content="en_US" />
            `;

            /**
            this.cphHead += "<meta name='title' content='' />"; //Bellow 160 characters.
            this.cphHead += "<meta name='description' content='' />"; //Bellow 100 characters.
            this.cphHead += "<meta name='keywords' content='' />"; //Bellow 60 characters.

            //Open Graph tags. 
            this.cphHead += "<meta property='og:title' content='' />";
            this.cphHead += "<meta property='og:type' content='website' />"; //http://ogp.me/#types | https://developers.facebook.com/docs/reference/opengraph/
            this.cphHead += "<meta property='og:url' content='' />"; 
            this.cphHead += "<meta property='og:description' content='' />"; 
            this.cphHead += "<meta property='og:image' content='' />"; //The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.
            this.cphHead += "<meta property='og:image:alt' content='' />"; 
            this.cphHead += "<meta property='og:locale' content='en_US' />"; 
            */             
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }            
        }finally{

        }
        //----------------------
    }
    //**************************************************************************************


    //Build content placeholder current tittle of the page (in the layout).
    //**************************************************************************************
    async cphTitleCurrentBuild()
    {
        //Logic.
        //----------------------
        try
        {
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendMenuStart");
            this.cphTitleCurrent += " - ";

            this.cphTitleCurrent += `
            <a href="" class="ss-backend-links04">
                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRoot") }
            </a>
            `;
            //TODO: Breadcrumbs.


            //Debug.
            //console.log("cphTitleCurrent=",  this.cphTitleCurrent);
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }            
        }finally{

        }
        //----------------------
    }
    //**************************************************************************************

    
    //Build content placeholder body.
    //**************************************************************************************
    //static async cphBodyBuild()
    async cphBodyBuild()
    {
        //Variables.
        //----------------------
        //let strReturn = "<h1>Testing layout body</h1>"; //debug.
        let strReturn = "";
        let backendHTML = "";
        let arrSearchParameters = [];


        //Parameters build.
        arrSearchParameters.push("id_parent;" + this._idParent + ";i");
        //arrSearchParameters.push("activation;1;i");


        let oclRecords = "";
        let oclRecordsParameters = {
            _arrSearchParameters: arrSearchParameters,
            _configSortOrder: gSystemConfig.configCategoriesSort,
            _strNRecords: "5",
            _objSpecialParameters: {returnType: 3}
        };
        /*
        let oclRecordsParameters = {
            _arrSearchParameters: ["id_parent;0;i", "activation;1;i"],
            _configSortOrder: gSystemConfig.configCategoriesSort,
            _strNRecords: "5",
            _objSpecialParameters: {}
        };*/ //working (debug)
        //----------------------


        //Logic.
        //----------------------
        try
        {
            oclRecords = new SyncSystemNS.ObjectCategoriesListing(oclRecordsParameters);
            await oclRecords.recordsListingGet(0, 3);


            //this.cphBody = JSON.stringify(oclRecords);
            //this.cphBody = JSON.stringify(oclRecords.resultsCategoriesListing); //Debug. //working
            //console.log("oclRecords = ", oclRecords);
            //console.log("typeof oclRecords = ", typeof oclRecords);


            //Build HTML (template string).
            //ref: https://wesbos.com/template-strings-html/

            /**/ 
            //Loop pelos resultados (debug).
            //----------------------
            for(let countObjArray = 0; countObjArray < oclRecords.resultsCategoriesListing.length; countObjArray++)
            {
                
                let categoriesRow = oclRecords.resultsCategoriesListing[countObjArray];
                for(let key in categoriesRow)
                {
                    backendHTML += key + "=" + categoriesRow[key] + "<br />";

                }
                backendHTML += "<br />";



                //Debug.
                //backendHTML += oclRecords.resultsCategoriesListing[countObjArray];
                //backendHTML += categoriesRow.length;
            } 
            //----------------------

            /* */
            backendHTML = `
            <section style="position: relative; display: block; overflow: hidden;">
            ${
                /*Debug*/
                this._idParent/**/ /*working*/
            }
            <form id="form" name="form" method="post" action="" enctype="multipart/form-data">
                    <div style="position: relative; display: block; overflow: hidden; margin-bottom: 2px;">
                        <button class="ss-backend-btn-action-cancel" style="float: right;">
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }
                        </button>
                    </div>

                    <div style="position: relative; display: block; overflow: hidden;">
                        <table class="ss-backend-table-listing01">
                            <caption class="ss-backend-table-header-text01 ss-backend-table-title">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleMain") }
                            </caption>
                            <thead class="ss-backend-table-bg-dark ss-backend-table-header-text01 ">
                                <tr>
                                    <td style="width: 40px; text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemSortOrderA") }  
                                    </td>
                                    <td style="text-align: left;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesCategory") }  
                                    </td>
                                    <td style="width: 100px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemFunctions") }  
                                    </td>

                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActiveA") }  
                                    </td>
                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                    </td>
                                    <td style="width: 40px; text-align: center;">
                                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemDelete") }  
                                    </td>
                                </tr>
                            </thead>

                            <tbody class="ss-backend-table-listing-text01">
                            ${oclRecords.resultsCategoriesListing.map((categoriesRow)=>{
                                return `
                                    <tr class="ss-backend-table-bg-light">
                                        <td style="text-align: center;">
                                            <div>
                                                ${ categoriesRow.sort_order } 
                                            </div>
                                        </td>
                                        <td style="text-align: left;">
                                            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/" +  categoriesRow.id }" class="ss-backend-links01">
                                                ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(categoriesRow.title, "db") } 
                                            </a>
                                        </td>

                                        <td style="text-align: center;">
                                            data 
                                        </td>
                                        <td style="text-align: center;" class="${ categoriesRow.activation ? "" : "ss-backend-table-bg-deactive"}">
                                            <a href="#" class="ss-backend-links01">
                                                ${ 
                                                    categoriesRow.activation ? 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActive1A")
                                                    : 
                                                    SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemActive0A") 
                                                } 
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <a href="#" class="ss-backend-links01">
                                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemEdit") }  
                                            </a>
                                        </td>
                                        <td style="text-align: center;">
                                            <input type="checkbox" name="idsRecordsDelete[]" value="${categoriesRow.id}" class="ss-backend-field-checkbox" /> 
                                        </td>
                                    </tr>
                                `;
                            }).join("")}
                            </tbody>

                            <tfoot class="ss-backend-table-foot ss-backend-table-listing-text01" style="display: none;">
                                <tr>
                                    <td style="text-align: left;">
                                         
                                    </td>
                                    <td style="text-align: center;">
                                         
                                    </td>
                                    <td style="text-align: center;">
                                         
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </form>
            </section>
            `; 


            this.cphBody = backendHTML;

            //strReturn = JSON.stringify(oclRecords);
            //strReturn = JSON.stringify(oclRecords.resultsCategoriesListing);
            
            //return strReturn;

            //return this;
        }catch(asyncError){
            if(gSystemConfig.configDebug === true)
            {
                console.error(asyncError);
            }            
        }finally{

        }
        //----------------------
    }
    //**************************************************************************************


};