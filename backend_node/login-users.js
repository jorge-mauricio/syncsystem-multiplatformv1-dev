"use strict";


//Import Node Modules.
//----------------------
const gSystemConfig = require("../config-application.js"); //System configuration.
const SyncSystemNS = require("../" + gSystemConfig.configDirectoryComponents + "/syncsystem-ns.js");
//----------------------


module.exports = class LoginUsers
{
    //Constructor.
    //**************************************************************************************
    constructor(objParameters = {})
    {
        //Properties.
        //----------------------
        this._masterPageSelect = objParameters.masterPageSelect;

        this._messageSuccess = objParameters.messageSuccess;
        this._messageError = objParameters.messageError;
        this._messageAlert = objParameters.messageAlert;

        this.queryDefault = "";

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
        this.metaURLCurrent = "";

        this.dateNow = new Date(SyncSystemNS.FunctionsGeneric.timeZoneConverter())
        this.dateNowDay = this.dateNow.getDate();
        this.dateNowMonth = this.dateNow.getMonth() + 1;
        this.dateNowYear = this.dateNow.getFullYear();
        this.dateNowMinute = this.dateNow.getMinutes();
        this.dateNowHour = this.dateNow.getHours();
        this.dateNowSecond = this.dateNow.getSeconds();
        //----------------------
    }
    //**************************************************************************************


    //Build object´s content.
    //**************************************************************************************
    async build()
    {
        //Logic.
        //----------------------
        try
        {
            //Default query.
            this.queryDefault += "masterPageSelect=" + this._masterPageSelect;

            //Meta title.
            this.metaTitle += SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendCategoriesTitleMain");
            if(this.titleCurrent)
            {
                this.metaTitle += " - " + this.titleCurrent;
            }

            //Meta description.
            this.metaDescription += "";

            //Meta keywords.
            this.metaKeywords += "";

            //Meta URL current.
            this.metaURLCurrent += gSystemConfig.configSystemURL + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackend + "/";
            this.metaURLCurrent += gSystemConfig.configRouteBackendCategories + "/";
            this.metaURLCurrent += this._idParent + "/";
            //if(this._masterPageSelect !== "")
            //{
                this.metaURLCurrent += "?masterPageSelect=" + this._masterPageSelect;
            //}

            //Title content placeholder.
            await this.cphTitleBuild();

            
            //Head content placeholder.
            await this.cphHeadBuild();


            //Title content placeholder.
            await this.cphTitleCurrentBuild();


            //Body content placeholder.
            await this.cphBodyBuild();
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


    //Build content placeholder title.
    //**************************************************************************************
    async cphTitleBuild()
    {
        //Logic.
        //----------------------
        try
        {
            this.cphTitle = SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") + 
            " - " + 
            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendLoginTitleMain");

            if(this.titleCurrent)
            {
                this.cphTitle += " - " + this.titleCurrent;
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
                <meta name="title" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaTitle) }" /> ${ /*Bellow 160 characters.*/'' }
                <meta name="description" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaDescription) }" /> ${ /*Bellow 100 characters.*/'' }
                <meta name="keywords" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaKeywords) }" /> ${ /*Bellow 60 characters.*/'' }

                ${ /*Open Graph tags.*/'' }
                <meta property="og:title" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaTitle) }" />
                <meta property="og:type" content="website" /> ${ /*http://ogp.me/#types | https://developers.facebook.com/docs/reference/opengraph/*/'' }
                <meta property="og:url" content="${ this.metaURLCurrent }" />
                <meta property="og:description" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaDescription) }" />
                <meta property="og:image" content="${ gSystemConfig.configSystemURL + "/" +  gSystemConfig.configDirectoryFilesLayoutSD + "/" + "icon-logo-og.png" }" /> ${ /*The recommended resolution for the OG image is 1200x627 pixels, the size up to 5MB. //120x120px, up to 1MB JPG ou PNG, lower than 300k and minimum dimension 300x200 pixels.*/'' }
                <meta property="og:image:alt" content="${ SyncSystemNS.FunctionsGeneric.removeHTML01(this.metaTitle) }" />
                <meta property="og:locale" content="${ gSystemConfig.configBackendLanguage }" />
            `;
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


    //Build content placeholder current title of the page (in the layout).
    //**************************************************************************************
    async cphTitleCurrentBuild()
    {
        //Logic.
        //----------------------
        try
        {
            /*
            this.cphTitleCurrent += SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendMenuStart");
            this.cphTitleCurrent += " - ";

            this.cphTitleCurrent += `
            <a href="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories + "/0" }" class="ss-backend-links04">
                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendItemRoot") }
            </a>
            `;
            if(this.titleCurrent)
            {
                this.cphTitleCurrent += " - " + this.titleCurrent;
            }
            */


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
        let backendHTML = "";
        //----------------------


        //Logic.
        //----------------------
        try
        {
            backendHTML = `
                ${ /*Desktop version.*/'' }
                <div style="position: absolute; 
                display: block; 
                height: 270px; 
                width: 100%; 
                top: 50%; 
                margin-top: -135px; 
                background-image: url(/${ gSystemConfig.configDirectoryFilesLayoutSD }/backend-layout-login-bg01.jpg), url(/${ gSystemConfig.configDirectoryFilesLayoutSD }/backend-layout-login-bg02.jpg);
                background-position: top, bottom;
                background-repeat: repeat-x, repeat-x;">

                    ${ /*Logo.*/'' }
                    <img src="/${ gSystemConfig.configDirectoryFilesLayoutSD }/backend-layout-logo-client.png" 
                    alt="Logo - ${ SyncSystemNS.FunctionsGeneric.contentMaskRead(gSystemConfig.configSystemClientName, "config-application") }" 
                    style="max-height: 230px;
                    position: absolute;  
                    top: 0px;  
                    bottom: 0px;  
                    left: 10px;  
                    margin: auto;" />


                    ${ /*Header.*/'' }
                    <header class="ss-backend-title01" style="position: absolute; display: block; right: 10px; top: 30px; text-align: right; font-size: 24px;">
                        ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendLoginUsersTitleMain") }
                    </header>


                    ${ /*Login.*/'' }
                    <main class="ss-backend-text01" style="position: absolute; display: block; right: 10px; bottom: 30px; text-align: right;">
                        <div id="divMessageSuccess" class="ss-backend-success" style="text-align: right;">
                            ${ 
                                (this._messageSuccess) ? 
                                `
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this._messageSuccess) }
                                `
                                : 
                                ``
                            } 
                        </div>
                        <div id="divMessageError" class="ss-backend-error" style="text-align: right;">
                            ${ 
                                (this._messageError) ? 
                                `
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this._messageError) }
                                `
                                : 
                                ``
                            } 
                        </div>
                        <div id="divMessageAlert" class="ss-backend-alert" style="text-align: right;">
                            ${ 
                                (this._messageAlert) ? 
                                `
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, this._messageAlert) }
                                `
                                : 
                                ``
                            } 
                        
                            ${
                                /*Debug.*/
                                /*"FunctionsCrypto.encryptValue=" + SyncSystemNS.FunctionsCrypto.encryptValue("testing encryption", 2) + "<br />" +*/
                                ''
                            }
                        </div>
                        <form id="formLoginUsers" name="formLoginUsers" method="POST" action="/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendLoginUsers  }" enctype="multipart/form-data">
                            <div style="position: relative; display: block;">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendLoginUser") }: 
                                <input type="text" id="username" name="username" class="ss-backend-field-text01" />
                            </div>
                            <div style="position: relative; display: block; margin: 5px 0px;">
                                ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendLoginPassword") }: 
                                <input type="password" id="password" name="password" class="ss-backend-field-text01" />
                            </div>
                            <div style="position: relative; display: block;">
                                <button class="ss-backend-btn-base ss-backend-btn-action">
                                    ${ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "backendButtonLogin") }
                                </button>
                            </div>
                        </form>
                    </main>


                    ${ /*Footer.*/'' }
                    <footer class="ss-backend-copyright" style="position: absolute; 
                                                                display: block;
                                                                right: 0px;
                                                                bottom: -5px;  
                                                                left: 0px; 
                                                                text-align: center;">
                        ${ 
                            SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "layoutCopyright") + 
                            " ® " + SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "layoutDevName") + 
                            " " + SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "layoutCopyright1") + 
                            "."
                        } 
                    </footer>

                </div>
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