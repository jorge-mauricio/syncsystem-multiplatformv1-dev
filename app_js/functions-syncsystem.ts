'use strict';

import { integer } from "aws-sdk/clients/cloudfront";

//  Import Node Modules.
// ----------------------
// require("dotenv").config(); // Load the dotenv dependency and call the config method on the imported object.
// require('dotenv').load();
// ----------------------

// Variables.
// ----------------------
const configDebug = true;
const FunctionsSyncSystem: any = {};

// var importOrigin = document.currentScript.getAttribute("importOrigin");
//  ----------------------

// Function to reorder the rowns on a input table or other elements.
// TODO: Maybe think of a way to also move cells next to other cells.
// TODO: Create a special configuration to set display: none; on the table row.
// ref:
/** 
Note: Reorder table rows with jquery:
https:// stackoverflow.com/questions/28862402/how-to-move-reorder-an-html-table-row

JS:
https:// www.geeksforgeeks.org/how-to-remove-the-table-row-in-a-table-using-javascript/
https:// stackoverflow.com/questions/21599772/move-table-rows
*/
// **************************************************************************************
/**
 * Function to reorder the rowns on a input table or other elements.
 * @param {string[]} _arrInputOrder ["inputRowCategories_field_name1", "inputRowCategories_field_name2", "inputRowCategories_field_name3", "inputRowCategories_field_name4", "inputRowCategories_field_name5", "inputRowCategories_field_name6"]
 * @example
 * inputDataReorder(["inputRowCategories_field_name1", "inputRowCategories_field_name2", "inputRowCategories_field_name3", "inputRowCategories_field_name4", "inputRowCategories_field_name5", "inputRowCategories_field_name6"])
 */
// export default function inputDataReorder(_arrInputOrder)
// export function inputDataReorder(_arrInputOrder)
// function inputDataReorder(_arrInputOrder)
const inputDataReorder = (_arrInputOrder: string[]): void => {
  // Variables.
  // ----------------------
  // const arrInputOrder = _arrInputOrder;
  const arrInputOrder = [..._arrInputOrder];

  // let inputTable = document.getElementById("input_table_name");

  // let tableRowReference = '';
  // let tableRowReference: HTMLElement | null;
  let tableRowReference: any;
  // let tableRowMove = '';
  // let tableRowMove: HTMLElement | null;
  let tableRowMove: any;
  // ----------------------

  // Logic.
  // ----------------------
  if (arrInputOrder) {
    // Reverse array items in array, in order for the logic to work.
    // arrInputOrder.reverse();

    // Loop.
    for (let countInputDataIDs = 0; countInputDataIDs < arrInputOrder.length; countInputDataIDs++) {
      if (countInputDataIDs > 0) {
        // Define values.
        // tableRowMove = document.getElementById("input_tr_field_name2");
        tableRowMove = document.getElementById(arrInputOrder[countInputDataIDs]); // prettier-ignore
        // tableRowReference = document.getElementById("input_tr_field_name5");
        tableRowReference = document.getElementById(arrInputOrder[countInputDataIDs - 1]); // prettier-ignore

        // Move rows.
        // if (tableRowMove !== null && tableRowReference !== null) {
        if (tableRowMove && tableRowReference) {
          // tableRowMove.parentNode.insertBefore(tableRowMove, tableRowReference); // working
          tableRowReference.parentNode.insertBefore(tableRowMove, tableRowReference.nextSibling); // prettier-ignore
          // working - simulates insertAfter (jquery)
          // Debug.
          if (configDebug === true) {
            console.log('tableRowMove=true');
          }
        }
        // }
        // Debug.
        if (configDebug === true) {
          console.log('countInputDataIDs > 0=true');
          console.log('tableRowMove=', tableRowMove);
          console.log('tableRowReference=', tableRowReference);
        }
      }

      // Debug.
      if (configDebug === true) {
        console.log('arrInputOrder=', arrInputOrder[countInputDataIDs]);
      }
    }

    // Debug.
    if (configDebug === true) {
      console.log('arrInputOrder=', arrInputOrder);
    }
  }
  // ----------------------

  // Usage.
  // ----------------------
  /*
    document.addEventListener('DOMContentLoaded', function() {
        // inputDataReorder()
        inputDataReorder(["inputRowCategories_field_name1", "inputRowCategories_field_name2", "inputRowCategories_field_name3", "inputRowCategories_field_name4", "inputRowCategories_field_name5", "inputRowCategories_field_name6"]);
    }, false);
    */
  // ----------------------
};
// **************************************************************************************
FunctionsSyncSystem.inputDataReorder = inputDataReorder;

// Function to change some form properties and submit.
// **************************************************************************************
/**
 * Function to change some form properties and submit.
 * @param {string} idForm iframe:iframe_id, id_form_inside_iframe
 * @param {string} formTarget _blank | _parent | _self | iframe_name
 * @param {string} formMethod POST | GET
 * @param {string} formAction
 * @example
 * formSubmit('formCategoririesListing', '', '', '/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories }/?_method=DELETE');
 */
const formSubmit = (idForm: string, 
  formTarget: string, 
  formMethod: string, 
  formAction: string): void => {
  // idForm: iframe:iframe_id, id_form_inside_iframe

  // Variables.
  // ----------------------
  // let formElement = '';
  // let formElement: HTMLElement | null;
  // let formElement: HTMLFormElement | HTMLElement | null;
  let formElement: HTMLFormElement | null;
  // ----------------------

  // Logic.
  // ----------------------
  // Check if form is in iframe.
  if (idForm.indexOf('iframe:') >= 0) {
    formElement = <HTMLFormElement>document.getElementById(idForm); // Typescrip typecast element.
  } else {
    formElement = <HTMLFormElement>document.getElementById(idForm);
  }

  if (formElement) {
    // Form modifications.
    // Target.
    if (formTarget !== '') {
      formElement.target = formTarget;
    }

    // Method.
    if (formMethod !== '') {
      formElement.method = formMethod;
    }

    // Action.
    if (formAction !== '') {
      formElement.action = formAction;
    }

    // Submit.
    formElement.submit();
    // ----------------------
  }

  // Usage.
  // formSubmit('formCategoririesListing', '', '', '/${ gSystemConfig.configRouteBackend + "/" + gSystemConfig.configRouteBackendCategories }/?_method=DELETE');
};
// **************************************************************************************
FunctionsSyncSystem.formSubmit = formSubmit;

// Function to apply a style to HTML element.
// **************************************************************************************
/**
 * Function to apply a style to HTML element.
 * @param {string} idHTML
 * @param {string} styleName display | height | min-height | margin-bottom
 * @param {string} parameterValue
 * @example
 * htmlGenericStyle01('divTest1', 'display', 'none');
 */
const htmlGenericStyle01 = (idHTML: string, styleName: string, parameterValue: string) => {
  // Variables.
  // ----------------------
  // let elementHTML = document.getElementById(idHTML);
  // const elementHTML: HTMLElement | null = null;
  const elementHTML = document.getElementById(idHTML);
  // ----------------------

  // Value definition.
  // ----------------------
  // elementHTML = document.getElementById(idHTML);
  // ----------------------

  // Logic.
  if (elementHTML) {
    // display
    if (styleName === 'display') {
      // elementHTML.style.display = parameterValue;
      elementHTML.setAttribute('style', styleName + ': ' + parameterValue + ' !important;');
    }

    // height
    if (styleName === 'height') {
      // elementHTML.style.height = parameterValue;
      elementHTML.setAttribute('style', styleName + ': ' + parameterValue + ' !important;');
    }

    // min-height
    if (styleName === 'min-height') {
      // if(parameterValue == "scrollHeight")
      // {
      // document.getElementById(idHTML).style.minHeight = $("#" + idHTML)[0].scrollHeight;
      // } else {
      // elementHTML.style.minHeight = parameterValue;
      elementHTML.setAttribute('style', styleName + ': ' + parameterValue + ' !important;');
      // }
    }

    // margin-bottom
    if (styleName === 'margin-bottom') {
      // elementHTML.style.marginBottom = parameterValue;
      elementHTML.setAttribute('style', styleName + ': ' + parameterValue + ' !important;');
    }
  }
};
// **************************************************************************************
FunctionsSyncSystem.htmlGenericStyle01 = htmlGenericStyle01;

// Function to set a value to an HTML element.
// **************************************************************************************
/**
 * Function to set a value to an HTML element.
 * @param {string} idElement
 * @param {string} strMessage
 * @example
 * elementMessage01('formCategoririesListing_method', 'DELETE');
 */
const elementMessage01 = (idElement: string, strMessage: string): void => {
  // idElement: id | iframe: (inside iframe) | multiple: (multiple elements)

  // Variables.
  // ----------------------
  // let elementHTML = "";
  // let elementHTML: HTMLElement | HTMLInputElement | null;
  let elementHTML: any;
  // ----------------------

  // Logic.
  // ----------------------
  if (idElement.indexOf('iframe:') >= 0) {
    // TODO: iframe logic
  } else if (idElement.indexOf('multiple:') >= 0) {
    // Variables.
    const arrParameters = idElement.split(':');
    // const selectorType = arrParameters[1]; // id | element | class
    // const strQuerySelector = arrParameters[2];
    const [selectorType, strQuerySelector] = arrParameters;
    // let strQuerySelector = '[id^="linkIdQuizzesOptionsAnswer"]'; //debug

    let arrElements;
    // let arrElements = document.querySelectorAll(strQuerySelector); //debug.

    // Logic.
    // ID.
    if (selectorType === 'id') {
      // Define values.
      arrElements = document.querySelectorAll('[id^="' + strQuerySelector + '"]');

      // Loop through nodes.
      arrElements.forEach((nodeElement: any) => {
        // Apply changes to each element.
        if (nodeElement) {
          elementMessage01(nodeElement.getAttribute('id'), strMessage);
        }

        // Debug.
        // console.log("id=", nodeElement.getAttribute("id"));
      });

      // Debug.
      // console.log("arrElements=", arrElements);
    }

    // Debug.
    // console.log("arrParameters=", arrParameters);
    // console.log("selectorType=", selectorType);
  } else {
    elementHTML = document.getElementById(idElement);

    if (elementHTML) {
      // input type - hidden
      if (elementHTML.getAttribute('type') === 'hidden') {
        elementHTML.value = strMessage;
      }

      // input type - text
      if (elementHTML.getAttribute('type') === 'text') {
        elementHTML.value = strMessage;
      }

      // input type - checkbox
      if (elementHTML.getAttribute('type') === 'checkbox') {
        elementHTML.value = strMessage;
      }

      // element tag - a
      // if(elementHTML.getAttribute("type") == "a")
      // if(elementHTML.tagName == "A") //tag names return in uppercase
      if (elementHTML.tagName.toLowerCase() === 'a') {
        elementHTML.innerHTML = strMessage;
      }

      // element tag - div
      if (elementHTML.tagName.toLowerCase() === 'div') {
        elementHTML.innerHTML = strMessage;
      }

      // element tag - span
      if (elementHTML.tagName.toLowerCase() === 'span') {
        elementHTML.innerHTML = strMessage;
      }

      // element tag - h1
      if (elementHTML.tagName.toLowerCase() === 'h1') {
        elementHTML.innerHTML = strMessage;
      }
    }
  }
  // ----------------------

  // Debug.
  // console.log("idElement.indexOf=", idElement.indexOf("multiple:"));
  // console.log("idElement=", idElement);

  // Usage.
  // ----------------------
  // elementMessage01('formCategoririesListing_method', 'DELETE');
  // elementMessage01('multiple:id:nameofinicialvalue', 'DELETE');
  // ----------------------
};
// **************************************************************************************
FunctionsSyncSystem.elementMessage01 = elementMessage01;

// Copy HTML from one element to another.
// **************************************************************************************
/**
 * Copy HTML from one element to another.
 * @param {string} idElementOrigin
 * @param {string} idElementTarget
 * @example
 * dataHTMLCopy('divContentDesktop', 'divContentMobile');
 */
const dataHTMLCopy = (idElementOrigin: string, idElementTarget: string): void => {
  // Variables.
  // ----------------------
  const elementOrigin = document.getElementById(idElementOrigin);
  const elementTarget = document.getElementById(idElementTarget);
  // ----------------------

  // Logic.
  if (elementOrigin) {
    if (elementTarget) {
      elementTarget.innerHTML = ''; // clear target data
      elementTarget.innerHTML = elementOrigin.innerHTML;
    }
  }

  // Usage.
  /*
  $(document).ready(function (){
      dataHTMLCopy('divContentDesktop', 'divContentMobile');
  });
  */
};
// **************************************************************************************
FunctionsSyncSystem.dataHTMLCopy = dataHTMLCopy;

// Functions to add / remove css classes.
// **************************************************************************************
/**
 * Functions to add css classes.
 * @param {string} idElement
 * @param {string} classNameCSS
 * @example
 */
const elementCSSAdd = (idElement: string, classNameCSS: string): void => {
  // Variables.
  // ----------------------
  const elementHTML = document.getElementById(idElement);
  // ----------------------

  // Logic.
  if (elementHTML) {
    elementHTML.classList.add(classNameCSS);
  }
};

/**
 * Functions to remove css classes.
 * @param {string} idElement
 * @param {string} classNameCSS
 * @example
 */
const elementCSSRemove = (idElement: string, classNameCSS: string): void => {
  // Variables.
  // ----------------------
  const elementHTML = document.getElementById(idElement);
  // ----------------------

  // Logic.
  if (elementHTML) {
    elementHTML.classList.remove(classNameCSS);
  }
};
// **************************************************************************************
FunctionsSyncSystem.elementCSSAdd = elementCSSAdd;
FunctionsSyncSystem.elementCSSRemove = elementCSSRemove;

// Function to scroll page to target element.
// **************************************************************************************
/*
function scrollToTarget(elementTarget) {
    document.querySelector('#' + elementTarget).scrollIntoView({
        behavior: 'smooth'
    });
}
*/
/**
 * Function to scroll page to target element.
 * @param {string} _elementTarget
 * @example
 */
const scrollToTarget = (_elementTarget: string | null): void => {
  // if (elementTarget && document) {
  // if (elementTarget !== null) {
  // if (elementTarget && elementTarget !== '') {
  if (_elementTarget) {
    // const elementTarget: HTMLElement | null = document.querySelector('#' + _elementTarget);
    const elementTarget = document.querySelector('#' + _elementTarget);
    // document.addEventListener('DOMContentLoaded', () => {
    if (elementTarget) {
      elementTarget.scrollIntoView({
        behavior: 'smooth',
      });
    }
    // });
  }
};
// **************************************************************************************
FunctionsSyncSystem.scrollToTarget = scrollToTarget;

// Function to build ajax mecanisms to apply changes to a record.
// **************************************************************************************
/**
 * Function to build ajax mecanisms to apply changes to a record.
 * @param {string} _urlReference
 * @param {object} _objBody
 * @param {function} _callBackFunction
 * @example
 * htmlGenericStyle01('divTest1', 'display', 'none');
 */
const ajaxRecordsPatch01_async = async (_urlReference: string, _objBody: unknown, _callBackFunction: any = null) => {
  // _objBody.apiKey = process.env.CONFIG_API_KEY_SYSTEM;

  // await fetch('http://example.com/movies.json',{
  await fetch(_urlReference, {
    // method: 'POST',
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    }, // Necessary to send data.
    // mode: 'no-cors', //Note: no-cors doesn´t support PATCH
    /*
    body: {
        name: "User 1"
    },
    
    body: JSON.stringify({
        name: "User 5" //Debug.
    })*/ // Method GET/HEAD cannot have body. Body has to be sent as Json.
    body: JSON.stringify(_objBody), // Method GET/HEAD cannot have body. Body has to be sent as Json.
    // mode: 'no-cors'
  })
    // .then(res => console.log(res));
    .then((res) => {
      if (res.ok) {
        // returned status code between 200 and 299
        if (configDebug === true) {
          console.log('res.ok (success)=', res.ok);
        }
      } else {
        if (configDebug === true) {
          console.log('res.ok (error / not success)=', res.ok);
        }
      }

      return res.json();
      // return res;
    })
    .then((resObjReturn) => {
      // Call back function.
      if (_callBackFunction) {
        // _callBackFunction();
        _callBackFunction(resObjReturn); // returns data to callback function
      }

      // Debug.
      if (configDebug === true) {
        console.log('resObjReturn=', resObjReturn);
      }
    });

  // Debug.
  // console.log(fetch('http://example.com/movies.json'));

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
};
// **************************************************************************************
FunctionsSyncSystem.ajaxRecordsPatch01_async = ajaxRecordsPatch01_async;

// Function to create / set cookie.
// **************************************************************************************
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
// static cookieCreate(cookieName, _cookieValue, _cookiePeriod = "", objRoute = null)
// cookieCreate = (cookieName, _cookieValue, _cookiePeriod = "") => {
const cookieCreate = (cookieName: string, cookieValue: string, cookieOptions: any = {}): boolean => {
  /* 
  _cookieOptions: {
    cookiePeriod: 1, // 1 - stay connected
    maxAge: 123, 
    expires: 
  }
  */

  // Variables.
  // ----------------------
  let strReturn = false;

  // let cookiePeriod = ''; // 1 - stay connected
  let cookiePeriod: string; // 1 - stay connected
  // let cookieOptions = cookieOptions;
  let cookieString = '';

  // let path = '/';
  let path: string;
  // let domain = '';
  let domain: string;
  // let expires = ''; // date-in-GMTString-format (Fri, 31 Dec 9999 23:59:59 GMT)
  let expires: any; // date-in-GMTString-format (Fri, 31 Dec 9999 23:59:59 GMT)
  // let maxAge = ''; // seconds | 86400 = 1 day | 60*60*24*365 = 1 year
  let maxAge: string | number; // seconds | 86400 = 1 day | 60*60*24*365 = 1 year
  let secure = false; // true | false
  // ----------------------

  // Define values.
  // ----------------------
  cookiePeriod = '';
  if (cookieOptions.hasOwnProperty('cookiePeriod') === true) {
    // cookiePeriod = cookieOptions.cookiePeriod;
    ({ cookiePeriod } = cookieOptions);
  }

  path = '/';
  if (cookieOptions.hasOwnProperty('path') === true) {
    // path = cookieOptions.path;
    ({ path } = cookieOptions);
  }

  domain = '';
  if (cookieOptions.hasOwnProperty('domain') === true) {
    // domain = cookieOptions.domain;
    ({ domain } = cookieOptions);
  }

  expires = '';
  if (cookieOptions.hasOwnProperty('expires') === true) {
    // const expires = new Date();
    expires = new Date();
    // expires.setTime(expires.getTime() + (cookieOptions.expires * 24 * 60 * 60 * 1000));
    expires.setTime(expires.getTime() + cookieOptions.expires * 24 * 60 * 60 * 1000);
  } // TODO: test.

  maxAge = '';
  if (cookieOptions.hasOwnProperty('maxAge') === true) {
    // maxAge = cookieOptions.maxAge;
    ({ maxAge } = cookieOptions);
  }

  if (cookieOptions.hasOwnProperty('secure') === true) {
    // secure = cookieOptions.secure;
    ({ secure } = cookieOptions);
  }

  // Stay conected option.
  if (cookiePeriod === '1') {
    maxAge = 60 * 60 * 24 * 365;
    // cookiePeriod = new Date(Date.now() + (86400 * 30 * 365));
  }
  // ----------------------

  // Logic.
  if (cookieValue) {
    strReturn = true;

    // Build string.
    cookieString += cookieName + '=' + cookieValue;
    cookieString += '; SameSite=strict';
    cookieString += '; path=' + path;

    if (domain !== '') {
      cookieString += '; domain=' + domain;
    }

    if (expires !== '') {
      cookieString += '; expires=' + expires;
    }

    if (maxAge !== '') {
      cookieString += '; max-age=' + maxAge;
    }

    if (secure === true) {
      cookieString += '; Secure';
    }

    // Format
    // SameSite=None: cross-origin. (lax, strict or none) Note: check if makes diference small caps.
    // Secure: SSL
    // It is more common not to set the `SameSite` attribute, which results in the default,
    // and more secure, value of `SameSite=Lax;`
    // document.cookie = "key_name=key name example; path=/; domain=example.com; SameSite=None; Secure";

    // Cookie set.
    // document.cookie = cookieName + "=" + +";max-age=604800";
    document.cookie = cookieString;
  }

  // Debug.
  // console.log("document.cookie=", document.cookie);
  // console.log("cookiePeriod=", cookiePeriod);
  // console.log("cookieName=", cookieName);
  // console.log("cookieValue=", cookieValue);
  // console.log("cookieString=", cookieString);

  return strReturn;
};
// **************************************************************************************
FunctionsSyncSystem.cookieCreate = cookieCreate;

// Function read cookie value.
// **************************************************************************************
/**
 * Function read cookie value.
 * @static
 * @param {string} cookieName "login" - returns login cookie | "temp" - returns temporary cookie (temporary id) | "" returns all cookies
 * @returns {string}
 * @example
 * SyncSystemNS.FunctionsGeneric.cookieRead()
 */
// static cookieRead(cookieName = "")
// cookieRead = async(cookieName = "") => {
const cookieRead = (cookieName = ''): string => {
  // Variables.
  // ----------------------
  let strReturn = '';
  const cookies = document.cookie;
  let arrCookies = [];
  // ----------------------

  // Logic.
  if (cookieName) {
    arrCookies = cookies.trim().split(';');

    // Loop through pairs.
    arrCookies.forEach((cookiePair) => {
      const arrCookiePair = cookiePair.split('=');
      if (cookieName === arrCookiePair[0].trim()) {
        strReturn = arrCookiePair[1].trim();
      }
      // Debug.
      // console.log("arrCookiePair 0=", arrCookiePair[0]);
      // console.log("arrCookiePair 1=", arrCookiePair[1]);
    });

    // Debug.
    // console.log("document.cookie=", document.cookie);
    // console.log("arrCookies=", arrCookies);
    // console.log("cookieName=", cookieName);
  } else {
    strReturn = document.cookie;
  }

  return strReturn;
};
// **************************************************************************************
FunctionsSyncSystem.cookieRead = cookieRead; //Add function to object to export later.

// Function to delete cookie.
// **************************************************************************************
/**
 * Function to delete cookie.
 * @static
 * @param {string} cookieName
 * @returns {string}
 * @example
 * SyncSystemNS.FunctionsGeneric.cookieRead()
 */
// static cookieRead(cookieName = "")
// cookieRead = async(cookieName = "") => {
const cookieDelete = (cookieName = '', cookieOptions: any = {}) => {
  // Variables.
  // ----------------------
  let strReturn = false;
  let cookieString = '';

  let path = '/';
  let domain = '';
  let secure = false; // true | false
  // ----------------------

  // Define values.
  // ----------------------
  if (cookieOptions.hasOwnProperty('path') === true) {
    // path = cookieOptions.path;
    ({ path } = cookieOptions);
  }

  if (cookieOptions.hasOwnProperty('domain') === true) {
    // domain = cookieOptions.domain;
    ({ domain } = cookieOptions);
  }

  if (cookieOptions.hasOwnProperty('secure') === true) {
    // secure = cookieOptions.secure;
    ({ secure } = cookieOptions);
  }
  // ----------------------

  // Logic.
  if (cookieName) {
    // Build string.
    cookieString = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC';
    cookieString += '; path=' + path;

    if (domain !== '') {
      cookieString += '; domain=' + path;
    }

    if (secure === true) {
      cookieString += '; Secure';
    }

    // Delete cookie.
    document.cookie = cookieString;
    strReturn = true;
  }

  return strReturn;
};
// **************************************************************************************
FunctionsSyncSystem.cookieDelete = cookieDelete;

// Export object with all functions.
// Note: Causing problem on node. Disable export for production (node). Enable to bundle for webpack (react) and disable again.
// TODO dev: Change import method on node (babel). Ref: https:// stackoverflow.com/questions/38296667/getting-unexpected-token-export
// if(importOrigin != "html")
// {
// // export default FunctionsSyncSystem;
// // export { FunctionsSyncSystem, inputDataReorder };
// export { FunctionsSyncSystem }; // working // enable for react webpack compile || disable for backend node
// // module.exports { FunctionsSyncSystem };
// }
