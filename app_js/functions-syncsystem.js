'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const configDebug = true;
const FunctionsSyncSystem = {};
const inputDataReorder = (_arrInputOrder) => {
    const arrInputOrder = [..._arrInputOrder];
    let tableRowReference;
    let tableRowMove;
    if (arrInputOrder) {
        for (let countInputDataIDs = 0; countInputDataIDs < arrInputOrder.length; countInputDataIDs++) {
            if (countInputDataIDs > 0) {
                tableRowMove = document.getElementById(arrInputOrder[countInputDataIDs]);
                tableRowReference = document.getElementById(arrInputOrder[countInputDataIDs - 1]);
                if (tableRowMove && tableRowReference) {
                    tableRowReference.parentNode.insertBefore(tableRowMove, tableRowReference.nextSibling);
                    if (configDebug === true) {
                        console.log('tableRowMove=true');
                    }
                }
                if (configDebug === true) {
                    console.log('countInputDataIDs > 0=true');
                    console.log('tableRowMove=', tableRowMove);
                    console.log('tableRowReference=', tableRowReference);
                }
            }
            if (configDebug === true) {
                console.log('arrInputOrder=', arrInputOrder[countInputDataIDs]);
            }
        }
        if (configDebug === true) {
            console.log('arrInputOrder=', arrInputOrder);
        }
    }
};
FunctionsSyncSystem.inputDataReorder = inputDataReorder;
const formSubmit = (idForm, formTarget, formMethod, formAction) => {
    let formElement;
    if (idForm.indexOf('iframe:') >= 0) {
        formElement = document.getElementById(idForm);
    }
    else {
        formElement = document.getElementById(idForm);
    }
    if (formElement) {
        if (formTarget !== '') {
            formElement.target = formTarget;
        }
        if (formMethod !== '') {
            formElement.method = formMethod;
        }
        if (formAction !== '') {
            formElement.action = formAction;
        }
        formElement.submit();
    }
};
FunctionsSyncSystem.formSubmit = formSubmit;
const htmlGenericStyle01 = (idHTML, styleName, parameterValue) => {
    const elementHTML = document.getElementById(idHTML);
    if (elementHTML) {
        if (styleName === 'display') {
            elementHTML.setAttribute('style', styleName + ': ' + parameterValue + ' !important;');
        }
        if (styleName === 'height') {
            elementHTML.setAttribute('style', styleName + ': ' + parameterValue + ' !important;');
        }
        if (styleName === 'min-height') {
            elementHTML.setAttribute('style', styleName + ': ' + parameterValue + ' !important;');
        }
        if (styleName === 'margin-bottom') {
            elementHTML.setAttribute('style', styleName + ': ' + parameterValue + ' !important;');
        }
    }
};
FunctionsSyncSystem.htmlGenericStyle01 = htmlGenericStyle01;
const elementMessage01 = (idElement, strMessage) => {
    let elementHTML;
    if (idElement.indexOf('iframe:') >= 0) {
    }
    else if (idElement.indexOf('multiple:') >= 0) {
        const arrParameters = idElement.split(':');
        const [selectorType, strQuerySelector] = arrParameters;
        let arrElements;
        if (selectorType === 'id') {
            arrElements = document.querySelectorAll('[id^="' + strQuerySelector + '"]');
            arrElements.forEach((nodeElement) => {
                if (nodeElement) {
                    elementMessage01(nodeElement.getAttribute('id'), strMessage);
                }
            });
        }
    }
    else {
        elementHTML = document.getElementById(idElement);
        if (elementHTML) {
            if (elementHTML.getAttribute('type') === 'hidden') {
                elementHTML.value = strMessage;
            }
            if (elementHTML.getAttribute('type') === 'text') {
                elementHTML.value = strMessage;
            }
            if (elementHTML.getAttribute('type') === 'checkbox') {
                elementHTML.value = strMessage;
            }
            if (elementHTML.tagName.toLowerCase() === 'a') {
                elementHTML.innerHTML = strMessage;
            }
            if (elementHTML.tagName.toLowerCase() === 'div') {
                elementHTML.innerHTML = strMessage;
            }
            if (elementHTML.tagName.toLowerCase() === 'span') {
                elementHTML.innerHTML = strMessage;
            }
            if (elementHTML.tagName.toLowerCase() === 'h1') {
                elementHTML.innerHTML = strMessage;
            }
        }
    }
};
FunctionsSyncSystem.elementMessage01 = elementMessage01;
const dataHTMLCopy = (idElementOrigin, idElementTarget) => {
    let elementOrigin = document.getElementById(idElementOrigin);
    let elementTarget = document.getElementById(idElementTarget);
    if (elementOrigin) {
        if (elementTarget) {
            elementTarget.innerHTML = "";
            elementTarget.innerHTML = elementOrigin.innerHTML;
        }
    }
};
FunctionsSyncSystem.dataHTMLCopy = dataHTMLCopy;
const elementCSSAdd = (idElement, classNameCSS) => {
    let elementHTML = document.getElementById(idElement);
    if (elementHTML) {
        elementHTML.classList.add(classNameCSS);
    }
};
function elementCSSRemove(idElement, classNameCSS) {
    let elementHTML = document.getElementById(idElement);
    if (elementHTML) {
        elementHTML.classList.remove(classNameCSS);
    }
}
;
FunctionsSyncSystem.elementCSSAdd = elementCSSAdd;
const ajaxRecordsPatch01_async = (_urlReference, _objBody, _callBackFunction = null) => __awaiter(void 0, void 0, void 0, function* () {
    yield fetch(_urlReference, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(_objBody)
    })
        .then(res => {
        if (res.ok) {
            if (configDebug == true) {
                console.log("res.ok (success)=", res.ok);
            }
        }
        else {
            if (configDebug == true) {
                console.log("res.ok (error / not success)=", res.ok);
            }
        }
        return res.json();
    })
        .then(resObjReturn => {
        _callBackFunction(resObjReturn);
        if (configDebug == true) {
            console.log("resObjReturn=", resObjReturn);
        }
    });
});
FunctionsSyncSystem.ajaxRecordsPatch01_async = ajaxRecordsPatch01_async;
const cookieCreate = (cookieName, cookieValue, cookieOptions = {}) => {
    let strReturn = false;
    let cookiePeriod = "";
    let cookieString = "";
    let path = "/";
    let domain = "";
    let expires = "";
    let maxAge = "";
    let secure = false;
    if (cookieOptions.hasOwnProperty("cookiePeriod") === true) {
        cookiePeriod = cookieOptions.cookiePeriod;
    }
    if (cookieOptions.hasOwnProperty("path") === true) {
        path = cookieOptions.path;
    }
    if (cookieOptions.hasOwnProperty("domain") === true) {
        domain = cookieOptions.domain;
    }
    if (cookieOptions.hasOwnProperty("expires") === true) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (cookieOptions.expires * 24 * 60 * 60 * 1000));
    }
    if (cookieOptions.hasOwnProperty("maxAge") === true) {
        maxAge = cookieOptions.maxAge;
    }
    if (cookieOptions.hasOwnProperty("secure") === true) {
        secure = cookieOptions.secure;
    }
    if (cookiePeriod == "1") {
        maxAge = 60 * 60 * 24 * 365;
    }
    if (cookieValue) {
        strReturn = true;
        cookieString += cookieName + "=" + cookieValue;
        cookieString += "; SameSite=strict";
        cookieString += "; path=" + path;
        if (domain != "") {
            cookieString += "; domain=" + domain;
        }
        if (expires != "") {
            cookieString += "; expires=" + expires;
        }
        if (maxAge != "") {
            cookieString += "; max-age=" + maxAge;
        }
        if (secure === true) {
            cookieString += "; Secure";
        }
        document.cookie = cookieString;
    }
    return strReturn;
};
FunctionsSyncSystem.cookieCreate = cookieCreate;
const cookieRead = (cookieName = "") => {
    let strReturn = "";
    let cookies = document.cookie;
    let arrCookies = [];
    if (cookieName) {
        arrCookies = cookies.trim().split(";");
        arrCookies.forEach(cookiePair => {
            let arrCookiePair = cookiePair.split("=");
            if (cookieName == arrCookiePair[0].trim()) {
                strReturn = arrCookiePair[1].trim();
            }
        });
    }
    else {
        strReturn = document.cookie;
    }
    return strReturn;
};
FunctionsSyncSystem.cookieRead = cookieRead;
const cookieDelete = (cookieName = "", cookieOptions = {}) => {
    let strReturn = false;
    let cookieString = "";
    let path = "/";
    let domain = "";
    let secure = false;
    if (cookieOptions.hasOwnProperty("path") === true) {
        path = cookieOptions.path;
    }
    if (cookieOptions.hasOwnProperty("domain") === true) {
        domain = cookieOptions.domain;
    }
    if (cookieOptions.hasOwnProperty("secure") === true) {
        secure = cookieOptions.secure;
    }
    if (cookieName) {
        cookieString = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        cookieString += "; path=" + path;
        if (domain != "") {
            cookieString += "; domain=" + path;
        }
        if (secure === true) {
            cookieString += "; Secure";
        }
        document.cookie = cookieString;
        strReturn = true;
    }
    return strReturn;
};
FunctionsSyncSystem.cookieDelete = cookieDelete;
//# sourceMappingURL=functions-syncsystem.js.map