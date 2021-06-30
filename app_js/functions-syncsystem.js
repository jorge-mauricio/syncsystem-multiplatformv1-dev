"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
//require('dotenv').load();
//----------------------


//Variables.
//----------------------
var configDebug = true;
const FunctionsSyncSystem = {};

//var importOrigin = document.currentScript.getAttribute("importOrigin");
//----------------------


//Function to reorder the rowns on a input table or other elements.
//TODO: Maybe think of a way to also move cells next to other cells.
//TODO: Create a special configuration to set display: none; on the table row.
//ref:
/*
Note: Reorder table rows with jquery:
https://stackoverflow.com/questions/28862402/how-to-move-reorder-an-html-table-row

JS:
https://www.geeksforgeeks.org/how-to-remove-the-table-row-in-a-table-using-javascript/
https://stackoverflow.com/questions/21599772/move-table-rows
*/
//**************************************************************************************
/**
 * Function to reorder the rowns on a input table or other elements.
 * @param {string} _arrInputOrder ["inputRowCategories_field_name1", "inputRowCategories_field_name2", "inputRowCategories_field_name3", "inputRowCategories_field_name4", "inputRowCategories_field_name5", "inputRowCategories_field_name6"]
 * @example
 * inputDataReorder(["inputRowCategories_field_name1", "inputRowCategories_field_name2", "inputRowCategories_field_name3", "inputRowCategories_field_name4", "inputRowCategories_field_name5", "inputRowCategories_field_name6"])
 */
//export default function inputDataReorder(_arrInputOrder)
//export function inputDataReorder(_arrInputOrder)
//function inputDataReorder(_arrInputOrder)
const inputDataReorder = (_arrInputOrder) =>
{
    //Variables.
    //----------------------
    let arrInputOrder = _arrInputOrder;

    //let inputTable = document.getElementById("input_table_name");

    let tableRowReference = "";
    let tableRowMove = "";
    //alert("Ready!");
    //----------------------


    //Logic.
    //----------------------
    if(arrInputOrder)
    {
        //Reverse array items in array, in order for the logic to work.
        //arrInputOrder.reverse();

        //Loop.
        for(let countInputDataIDs = 0; countInputDataIDs < arrInputOrder.length; countInputDataIDs++)
        {
            if(countInputDataIDs > 0)
            {
                //Define values.
                //tableRowMove = document.getElementById("input_tr_field_name2");
                tableRowMove = document.getElementById(arrInputOrder[countInputDataIDs]);
                //tableRowReference = document.getElementById("input_tr_field_name5");
                tableRowReference = document.getElementById(arrInputOrder[countInputDataIDs - 1]);


                //Move rows.
                if(tableRowMove !== null && tableRowReference !== null)
                {
                    //tableRowMove.parentNode.insertBefore(tableRowMove, tableRowReference); //working
                    tableRowReference.parentNode.insertBefore(tableRowMove, tableRowReference.nextSibling); //working - simulates insertAfter (jquery)
                }
            }


            //Debug.
            //console.log("arrInputOrder=", arrInputOrder[countInputDataIDs]);
        }


        //Debug.
        //console.log("arrInputOrder=", arrInputOrder);
    }
    //----------------------


    //Usage.
    //----------------------
    /*
    document.addEventListener('DOMContentLoaded', function() {
        //inputDataReorder()
        inputDataReorder(["inputRowCategories_field_name1", "inputRowCategories_field_name2", "inputRowCategories_field_name3", "inputRowCategories_field_name4", "inputRowCategories_field_name5", "inputRowCategories_field_name6"])
    }, false);
    */
    //----------------------
}
FunctionsSyncSystem.inputDataReorder = inputDataReorder;
//**************************************************************************************


//Function to changing some form properties and submitting.
//**************************************************************************************
/**
 * Function to changing some form properties and submitting.
 * @param {*} idForm iframe:iframe_id, id_form_inside_iframe
 * @param {*} formTarget _blank | _parent | _self | iframe_name
 * @param {*} formMethod POST | GET
 * @param {*} formAction 
 * @example 
 * 
 */
//function formSubmit(idForm, formTarget, formMethod, formAction)
const formSubmit = (idForm, formTarget, formMethod, formAction) => 
{
    //idForm: iframe:iframe_id, id_form_inside_iframe

    //Variables.
    //----------------------
    let formElement = "";
    //----------------------


    //Logic.
    //----------------------
    //Check if form is in iframe
    if(idForm.indexOf("iframe:") >= 0)
    {

    }else{
        formElement = document.getElementById(idForm);
    }


    //Form modifications.

    //Target.
	if(formTarget != "")
	{
		formElement.target = formTarget;
    }
    
    //Method.
	if(formMethod != "")
	{
		formElement.method = formMethod;
	}

    //Action.
    if(formAction != "")
	{
		formElement.action = formAction;
    }
    
    //Submit.
    formElement.submit();
    //----------------------


    //Usage.
    //formSubmit('formCategoririesListing', '', '', '/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories }/?_method=DELETE');
}
FunctionsSyncSystem.formSubmit = formSubmit;
//**************************************************************************************


//Function to apply a style to HTML element.
//**************************************************************************************
/**
 * Function to apply a style to HTML element.
 * @param {*} idHTML 
 * @param {*} styleName display | height | min-height | margin-bottom
 * @param {*} parameterValue 
 * @example
 * htmlGenericStyle01('divTest1', 'display', 'none');
 */
//function htmlGenericStyle01(idHTML, styleName, parameterValue)
const htmlGenericStyle01 = (idHTML, styleName, parameterValue) => 
{
    //Variables.
    //----------------------
    let elementHTML = document.getElementById(idHTML);
    //----------------------


    //Logic.
	if(elementHTML)
	{
		//display
		if(styleName == "display")
		{
			elementHTML.style.display = parameterValue;
		}
		
		//height
		if(styleName == "height")
		{
			elementHTML.style.height = parameterValue;
		}
		
		//min-height
		if(styleName == "min-height")
		{
			//if(parameterValue == "scrollHeight")
			//{
				//document.getElementById(idHTML).style.minHeight = $("#" + idHTML)[0].scrollHeight;
			//}else{
				elementHTML.style.minHeight = parameterValue;
			//}
		}
	
		//margin-bottom
		if(styleName == "margin-bottom")
		{
			elementHTML.style.marginBottom = parameterValue;
		}
	}

}
FunctionsSyncSystem.htmlGenericStyle01 = htmlGenericStyle01;
//**************************************************************************************


//Function to set a value to an HTML element.
//**************************************************************************************
/**
 * Function to set a value to an HTML element.
 * @param {string} idElement 
 * @param {string} strMessage 
 * @example 
 * elementMessage01('formCategoririesListing_method', 'DELETE');
 */

//function elementMessage01(idElement, strMessage)
//export function elementMessage01(idElement, strMessage) //working
//export default function elementMessage01(idElement, strMessage)
const elementMessage01 = (idElement, strMessage) =>
{
    //idElement: id | iframe: (inside iframe) | multiple: (multiple elements)

    //Variables.
    //----------------------
    let elementHTML = "";
    //----------------------


    //Logic.
    //----------------------
    if(idElement.indexOf("iframe:") >= 0)
    {

    }else if(idElement.indexOf("multiple:") >= 0){
        //Variables.
        let arrParameters = idElement.split(":");
        let selectorType = arrParameters[1]; //id | element | class
        let strQuerySelector = arrParameters[2];
        //let strQuerySelector = '[id^="linkIdQuizzesOptionsAnswer"]'; //debug

        let arrElements;
        //let arrElements = document.querySelectorAll(strQuerySelector); //debug.


        //Logic
        //ID.
        if(selectorType === "id")
        {
            //Define values.
            arrElements = document.querySelectorAll('[id^="' + strQuerySelector + '"]');


            //Loop through nodes.
            arrElements.forEach((nodeElement)=> { 

                //Apply changes to each element.
                elementMessage01(nodeElement.getAttribute("id"), strMessage);

                //Debug.
                //console.log("id=", nodeElement.getAttribute("id"))
            });


            //Debug.
            //console.log("arrElements=", arrElements);
        }


        //Debug.
        //console.log("arrParameters=", arrParameters);
        //console.log("selectorType=", selectorType);
    }else{
        elementHTML = document.getElementById(idElement);

		//input type - hidden
		if(elementHTML.getAttribute("type") == "hidden")
		{
			elementHTML.value = strMessage;
		}
		
		//input type - text
		if(elementHTML.getAttribute("type") == "text")
		{
			elementHTML.value = strMessage;
		}
		
		//input type - checkbox
		if(elementHTML.getAttribute("type") == "checkbox")
		{
			elementHTML.value = strMessage;
        }

        //element tag - a
        //if(elementHTML.getAttribute("type") == "a")
        //if(elementHTML.tagName == "A") //tag names return in uppercase
        if(elementHTML.tagName.toLowerCase() == "a")
		{
			elementHTML.innerHTML = strMessage;
        }

        //element tag - div
        if(elementHTML.tagName.toLowerCase() == "div")
		{
			elementHTML.innerHTML = strMessage;
        }

        //element tag - span
        if(elementHTML.tagName.toLowerCase() == "span")
        {
            elementHTML.innerHTML = strMessage;
        }

        //element tag - h1
        if(elementHTML.tagName.toLowerCase() == "h1")
        {
            elementHTML.innerHTML = strMessage;
        }
    }
    //----------------------


    //Debug.        
    //console.log("idElement.indexOf=", idElement.indexOf("multiple:"));
    //console.log("idElement=", idElement);


    //Usage.
    //----------------------
    //elementMessage01('formCategoririesListing_method', 'DELETE');
    //elementMessage01('multiple:id:nameofinicialvalue', 'DELETE');
    //----------------------
}
FunctionsSyncSystem.elementMessage01 = elementMessage01; //Add function to object to export later.
//window.elementMessage01 = elementMessage01;
//**************************************************************************************


//Copy HTML from one element to another.
//**************************************************************************************
//function dataHTMLCopy(idElementOrigin, idElementTarget)
const dataHTMLCopy = (idElementOrigin, idElementTarget) =>
{
    //Variables.
    //----------------------
    let elementOrigin = document.getElementById(idElementOrigin);
    let elementTarget = document.getElementById(idElementTarget);
    //----------------------
    
    if(elementOrigin)
    {
        if(elementTarget)
        {
            elementTarget.innerHTML = ""; //clar target data
            
            elementTarget.innerHTML = elementOrigin.innerHTML;
        }
    }
    
    
    //Usage.
    /*
    $(document).ready(function (){
        dataHTMLCopy("divContentDesktop", "divContentMobile");
    });
    */
    
}
FunctionsSyncSystem.dataHTMLCopy = dataHTMLCopy; //Add function to object to export later.
//**************************************************************************************



//Functions to add / remove css classes.
//**************************************************************************************
//function elementCSSAdd(idElement, classNameCSS)
const elementCSSAdd = (idElement, classNameCSS) =>
{
    //Variables.
    //----------------------
    let elementHTML = document.getElementById(idElement);
    //----------------------

    if(elementHTML)
    {
        elementHTML.classList.add(classNameCSS);
    }

}

function elementCSSRemove(idElement, classNameCSS)
{
    //Variables.
    //----------------------
    let elementHTML = document.getElementById(idElement);
    //----------------------

    if(elementHTML)
    {
        elementHTML.classList.remove(classNameCSS);
    }

}
FunctionsSyncSystem.elementCSSAdd = elementCSSAdd; //Add function to object to export later.
//**************************************************************************************



//Function to build ajax mecanisms to apply changes to a record.
//**************************************************************************************
//async function ajaxRecordsPatch01_async(_urlReference, _objBody, _callBackFunction = null)
const ajaxRecordsPatch01_async = async (_urlReference, _objBody, _callBackFunction = null) => {
    //_objBody.apiKey = process.env.CONFIG_API_KEY_SYSTEM;

    //await fetch('http://example.com/movies.json',{
    await fetch(_urlReference,{
        //method: 'POST',
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        }, //Necessary to send data.
        //mode: 'no-cors', //Note: no-cors doesn´t support PATCH
        /*
        body: {
            name: "User 1"
        },
        
        body: JSON.stringify({
            name: "User 5" //Debug.
        })*/ //Method GET/HEAD cannot have body. Body has to be sent as Json. 
        body: JSON.stringify(_objBody)//Method GET/HEAD cannot have body. Body has to be sent as Json. 
        //mode: 'no-cors'
    })
    //.then(res => console.log(res));
    .then(res => {
        if(res.ok) //returned status code between 200 and 299
        {
            if(configDebug == true)
            {
                console.log("res.ok (success)=", res.ok);
            }
        }else{
            if(configDebug == true)
            {
                console.log("res.ok (error / not success)=", res.ok);
            }
        }

        return res.json();
        //return res;
    })
    .then(resObjReturn => {
        //Call back function.
        //_callBackFunction();
        _callBackFunction(resObjReturn); //returns data to callback function
        

        //Debug.
        if(configDebug == true)
        {
            console.log("resObjReturn=", resObjReturn);
        }
    });

    //Debug.
    //console.log(fetch('http://example.com/movies.json'));




    /*
    let fetchResult = await fetch('http://example.com/movies.json',{
        //method: 'GET',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    })
    .then((response) => {
        //return response.json();
    })
    .then((data) => {
        console.log(data);
    });
    */
}
FunctionsSyncSystem.ajaxRecordsPatch01_async = ajaxRecordsPatch01_async; //Add function to object to export later.
//**************************************************************************************


//Function to create / set cookie.
//**************************************************************************************
/**
 * Function to create / set cookie.
 * @static
 * @param {string} cookieName 
 * @param {string} cookieValue 
 * @param {object} cookieOptions 
 * @returns {boolean}
 * @example 
 * cookieCreate('key5', 'exemple 5', {cookiePeriod: 1});
 */
//static cookieCreate(cookieName, _cookieValue, _cookiePeriod = "", objRoute = null)
//cookieCreate = (cookieName, _cookieValue, _cookiePeriod = "") => {
const cookieCreate = (cookieName, cookieValue, cookieOptions = {}) => {
    /*_cookieOptions: {
        cookiePeriod: 1, //1 - stay connected
        maxAge: 123, 
        expires: 
    }
    */
        //cookiePeriod: 1 - stay connected

    //Variables.
    //----------------------
    let strReturn = false;
    let cookiePeriod = ""; //1 - stay connected
    //let cookieOptions = cookieOptions;
    let cookieString = "";

    let path = "/";
    let domain = "";
    let expires = ""; //date-in-GMTString-format (Fri, 31 Dec 9999 23:59:59 GMT)
    let maxAge = ""; //seconds | 86400 = 1 day | 60*60*24*365 = 1 year
    let secure = false; //true | false
    //----------------------


    //Define values.
    //----------------------
    if(cookieOptions.hasOwnProperty("cookiePeriod") === true)
    {
        cookiePeriod = cookieOptions.cookiePeriod;
    }

    if(cookieOptions.hasOwnProperty("path") === true)
    {
        path = cookieOptions.path;
    }

    if(cookieOptions.hasOwnProperty("domain") === true)
    {
        domain = cookieOptions.domain;
    }

    if(cookieOptions.hasOwnProperty("expires") === true)
    {
        const expires = new Date();
        expires.setTime(expires.getTime() + (cookieOptions.expires*24*60*60*1000));
    } //TODO: test.

    if(cookieOptions.hasOwnProperty("maxAge") === true)
    {
        maxAge = cookieOptions.maxAge;
    }

    if(cookieOptions.hasOwnProperty("secure") === true)
    {
        secure = cookieOptions.secure;
    }

    //Stay conected option.
    if(cookiePeriod == "1")
    {
        maxAge = 60*60*24*365;
        //cookiePeriod = new Date(Date.now() + (86400 * 30 * 365));
    }
    //----------------------


    //Logic.
    if(cookieValue)
    {
        strReturn = true;

        //Build string.
        cookieString += cookieName + "=" + cookieValue;
        cookieString += "; SameSite=strict";
        cookieString += "; path=" + path;

        if(domain != "")
        {
            cookieString += "; domain=" + domain;
        }

        if(expires != "")
        {
            cookieString += "; expires=" + expires;
        }

        if(maxAge != "")
        {
            cookieString += "; max-age=" + maxAge;
        }

        if(secure === true)
        {
            cookieString += "; Secure";
        }

        //Format
        // SameSite=None: cross-origin. (lax, strict or none) Note: check if makes diference small caps.
        // Secure: SSL
        // It is more common not to set the `SameSite` attribute, which results in the default,
        // and more secure, value of `SameSite=Lax;`
        //document.cookie = "key_name=key name example; path=/; domain=example.com; SameSite=None; Secure";
        


        //Cookie set.
        //document.cookie = cookieName + "=" + +";max-age=604800";
        document.cookie = cookieString;
    }


    //Debug.
    //console.log("document.cookie=", document.cookie);
    //console.log("cookiePeriod=", cookiePeriod);
    //console.log("cookieName=", cookieName);
    //console.log("cookieValue=", cookieValue);
    //console.log("cookieString=", cookieString);

    return strReturn;
}
FunctionsSyncSystem.cookieCreate = cookieCreate; //Add function to object to export later.
//**************************************************************************************


//Function read cookie value.
//**************************************************************************************
/**
 * Function read cookie value.
 * @static
 * @param {string} cookieName "login" - returns login cookie | "temp" - returns temporary cookie (temporary id) | "" returns all cookies
 * @returns {string}
 * @example
 * SyncSystemNS.FunctionsGeneric.cookieRead()
 */
//static cookieRead(cookieName = "")
//cookieRead = async(cookieName = "") => {
const cookieRead = (cookieName = "") => {
    //Variables.
    //----------------------
    let strReturn = "";
    let cookies = document.cookie;
    let arrCookies = [];
    //----------------------


    //Logic.
    if(cookieName)
    {
        arrCookies = cookies.trim().split(";");

        //Loop through pairs:
        arrCookies.forEach(cookiePair => {
            let arrCookiePair = cookiePair.split("=");
            if(cookieName == arrCookiePair[0].trim())
            {
                strReturn = arrCookiePair[1].trim();
            }
            //Debug.
            //console.log("arrCookiePair 0=", arrCookiePair[0]);
            //console.log("arrCookiePair 1=", arrCookiePair[1]);
        });


        //Debug.
        //console.log("document.cookie=", document.cookie);
        //console.log("arrCookies=", arrCookies);
        //console.log("cookieName=", cookieName);
    }else{
        strReturn = document.cookie;
    }


    return strReturn;
}
FunctionsSyncSystem.cookieRead = cookieRead; //Add function to object to export later.
//**************************************************************************************


//Function read cookie value.
//**************************************************************************************
/**
 * Function read cookie value.
 * @static
 * @param {string} cookieName 
 * @returns {string}
 * @example
 * SyncSystemNS.FunctionsGeneric.cookieRead()
 */
//static cookieRead(cookieName = "")
//cookieRead = async(cookieName = "") => {
const cookieDelete = (cookieName = "", cookieOptions = {}) => {
    //Variables.
    //----------------------
    let strReturn = false;
    let cookieString = "";

    let path = "/";
    let domain = "";
    let secure = false; //true | false
    //----------------------


    //Define values.
    //----------------------
    if(cookieOptions.hasOwnProperty("path") === true)
    {
        path = cookieOptions.path;
    }

    if(cookieOptions.hasOwnProperty("domain") === true)
    {
        domain = cookieOptions.domain;
    }

    if(cookieOptions.hasOwnProperty("secure") === true)
    {
        secure = cookieOptions.secure;
    }
    //----------------------

    
    //Logic.
    if(cookieName)
    {
        //Build string.
        cookieString = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        cookieString += "; path=" + path;

        if(domain != "")
        {
            cookieString += "; domain=" + path;
        }

        if(secure === true)
        {
            cookieString += "; Secure";
        }

        //Delete cookie.
        document.cookie = cookieString;
        strReturn = true;
    }


    return strReturn;
}
//**************************************************************************************
FunctionsSyncSystem.cookieDelete = cookieDelete; //Add function to object to export later.


//Function do download files.
//ref: https://www.convertplug.com/plus/docs/download-pdf-file-forcefully-instead-opening-browser-using-js/
//**************************************************************************************
/**
 * Function do download files.
 * @param {string} fileName 
 * @param {string} directoryDownload c:\directory\subdirectory | gSystemConfig.configDirectoryFilesUpload
 * @returns {object} {returnStatus: false, file_field_name1: "", file_field_name1: ""} 
 * @example SyncSystemNS.FunctionsFiles.filesUpload(tblCategoriesID, 
                                                this.openedFiles, 
                                                gSystemConfig.configDirectoryFilesUpload, 
                                                "");
    * 
    */
//fileDownload(fileName, directoryDownload)
function fileDownload(_fileName, fileURL)
{
    // for non-IE
    if(!window.ActiveXObject)
    {
        var save = document.createElement('a');
        save.href = fileURL + "/" + _fileName;
        save.target = '_blank';
        //var filename = fileURL.substring(fileURL.lastIndexOf('/')+1);
        var filename = _fileName;        
        //save.download = fileName || filename;
        save.download = filename;
        if(navigator.userAgent.toLowerCase().match(/(ipad|iphone|safari)/) && navigator.userAgent.search("Chrome") < 0)
        {
            document.location = save.href; 
            // window event not working here
        }else{
            var evt = new MouseEvent('click', {
                'view': window,
                'bubbles': true,
                'cancelable': false
            });
            save.dispatchEvent(evt);
            (window.URL || window.webkitURL).revokeObjectURL(save.href);
        }	
    }else if(!!window.ActiveXObject && document.execCommand)// for IE < 11
    {
        //var _window = window.open(fileURL, '_blank');
        var _window = window.open(fileURL + "/" + _fileName, '_blank');
        _window.document.close();
        _window.document.execCommand('SaveAs', true, fileURL + "/" + _fileName)
        _window.close();
    }

}
//**************************************************************************************


/*
module.exports = {
  inputDataReorder: inputDataReorder
};

export default {
   inputDataReorder: inputDataReorder
}
*/


//Export object with all functions.
//Note: Causing problem on node. Disable export for production (node). Enable to bundle for webpack (react) and disable again.
//TODO dev: Change import method on node (babel). Ref: https://stackoverflow.com/questions/38296667/getting-unexpected-token-export
//if(importOrigin != "html")
//{
    ////export default FunctionsSyncSystem;
    ////export { FunctionsSyncSystem, inputDataReorder };
    export { FunctionsSyncSystem }; //working //enable for react webpack compile || disable for backend node
    ////module.exports { FunctionsSyncSystem };
//}
