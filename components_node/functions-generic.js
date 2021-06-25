"use strict";

//Import Node Modules.
//----------------------
//require("dotenv").config(); //Load the dotenv dependency and call the config method on the imported object.
const mysql = require("mysql");//MySQL package.

const gSystemConfig = require("../config-application.js"); //System configuration.
//const dbSystemCon = require("../config-application-db.js"); //DB.
//const SyncSystemNS = require("./syncsystem-ns.js"); //Node JS import method supported by jest.
//const BigNumber = require('big-number');
const BigNumber = require('bignumber.js');
//const BigNumber = require('bignumber.js').default;
//const BigNumber = require('bignumber.js').BigNumber;
//const bigDecimal = require('js-big-decimal');
//----------------------


//Create the namespace (nested object).
//var SyncSystemNS = SyncSystemNS || {};


//module.exports = SyncSystemNS = class FunctionsGeneric
//module.exports = class FunctionsGeneric extends SyncSystemNS
module.exports = class FunctionsGeneric
{
    //Return the label in the right terminal.
    //**************************************************************************************
    /**
     * Return the label in the right terminal.
     * @static
     * @param {object} objAppLabels 
     * @param {string} labelName 
     * @returns {string}
     * @example
     * SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, "labelName")
     */
    static appLabelsGet(objAppLabels, labelName)
    {
        //Variables.
        //----------------------
        var strReturn = "";
        //----------------------


        if(labelName != null && labelName != "" && (typeof labelName !== 'undefined') 
            && objAppLabels != null && objAppLabels != "" && (typeof objAppLabels !== 'undefined'))
        {
            if(objAppLabels.hasOwnProperty(labelName)) //check if object as property
            {
                strReturn = objAppLabels[labelName];
                strReturn = strReturn.replace(/(?:\r\n|\r|\n)/g, "<br />");
            }
            //strReturn = "test app label"; //debug.
        }else{
            strReturn = "";
        }


        //Debug.
        //strReturn = objAppLabels;


        return strReturn;
    }
    //**************************************************************************************


    //Return date with a specific time zone.
    //ref: 
    //https://stackoverflow.com/questions/8083410/how-can-i-set-the-default-timezone-in-node-js
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString
   //**************************************************************************************
    /**
     * Return date with a specific time zone.
     * @static
     * @param {string} timezoneLocal 
     * @param {string} configDateFormat 1 - portuguese dd/mm/yyyy | 2 - britanic mm/dd/yyyy
     * @returns {Date} 
     * @example
     * SyncSystemNS.FunctionsGeneric.timeZoneConverter()
     */
    static timeZoneConverter(timezoneLocal = "", configDateFormat = "")
    {
        //Variables.
        //----------------------
        let strReturn = new Date();
        let timezoneLocale = "en-US";
        //----------------------


        //Variables values.
        if(configDateFormat == "1")
        {
            timezoneLocale = "pt-BR";
        }
        if(configDateFormat == "2")
        {
            //timezoneLocale = "en-US";
            timezoneLocale = "en-GB";
        }


        //Logic.
        strReturn = Date().toLocaleString(timezoneLocale, {
            timeZone: gSystemConfig.configSystemTimeZone
        });


        //Debug.
        //return nDate;
        //const nDate = new Date().toLocaleString('en-US', {
                //timeZone: gSystemConfig.configSystemTimeZone
        //});


        //Aditional information:
        /*
        const map = new Map([
        [-11, 'Pacific/Niue'],
        [-10, 'Pacific/Tahiti'],
        [-9, 'Pacific/Gambier'],
        [-8, 'Pacific/Pitcairn'],
        [-7, 'America/Vancouver'],
        [-6, 'America/Denver'],
        [-5, 'America/Rio_Branco'],
        [-4, 'America/Manaus'],
        [-3, 'America/Cayenne'],
        [-2, 'Atlantic/South_Georgia'],
        [-1, 'Atlantic/Azores'],
        [0, 'GMT'],
        [1, 'Europe/Brussels'],
        [2, 'Europe/Helsinki'],
        [3, 'Asia/Riyadh'],
        [4, 'Asia/Dubai'],
        [5, 'Asia/Tashkent'],
        [6, 'Asia/Urumqi'],
        [7, 'Asia/Bangkok'],
        [8, 'Asia/Singapore'],
        [9, 'Asia/Chita'],
        [10, 'Pacific/Chuuk'],
        [11, 'Pacific/Pohnpei'],
        [12, 'Pacific/Wake'],
        ])*/


        //return strReturn;
        return new Date(strReturn);
    }
    //**************************************************************************************
    

    //Date format for SQL write.
    //**************************************************************************************
    /**
     * Date format for SQL write.
     * @static
     * @param {string | Date} dateInput  
     * @param {string} configDateFormat 1 - PT | 2 - UK
     * @returns {string | Date} If `configDateFormat` is empty, will return Date
     * @example
     * SyncSystemNS.FunctionsGeneric.dateSQLWrite(dateObjName)
     */
    static dateSQLWrite(dateInput, configDateFormat = "")
    {
        //Variables.
        //----------------------
        let strReturn = "";
        let dateObj = new Date();
        let arrDateFull = [];
        let arrDate = [];
        let strDateTime = "";
        //----------------------


        if(dateInput)
        {

            //Detect input format (2000-30-01 or 01/30/2000).


            //Logic - returns yyyy-mm-dd hh:MM:ss.
            //----------------------
            //ref: https://blog.dotmaui.com/2017/10/17/javascript-current-date-with-format-yyyy-mm-dd-hhmmss/
            if(!configDateFormat)
            {
                //Variable value.
                dateObj = dateInput;
                //let dateObj = new Date(dateInput);

                
                //Variables
                let dateYear = dateObj.getFullYear();
                let dateDay = dateObj.getDate();
                let dateMonth = (dateObj.getMonth() + 1);
            
                let dateHour = dateObj.getHours();
                let dateMinute = dateObj.getMinutes();
                let dateSecond = dateObj.getSeconds();
            
                let dateFormated = dateYear + "-" + dateMonth + "-" + dateDay;


                //Ajustments.
                if(dateDay < 10)
                {
                    dateDay = "0" + dateDay;
                }
            
                if(dateMonth < 10)
                {
                    dateMonth = "0" + dateMonth;
                }

                if(dateHour < 10)
                {
                    dateHour = "0" + dateHour;
                }
            
                if(dateMinute< 10)
                {
                    dateMinute = "0" + dateMinute;
                }
            
                if(dateSecond < 10)
                {
                    dateSecond = "0" + dateSecond;
                }
            
                strReturn = dateFormated + " " + dateHour + ":" + dateMinute + ":" + dateSecond;
            }
            //----------------------


            //Forced format.
            //----------------------
            if(configDateFormat)
            {
                if(dateInput.includes("/"))
                {
                    //Variables values definitions.
                    /**/
                    //if(dateInput.length > 10)
                    //{
                        arrDateFull = dateInput.split(" ");
                        
                        arrDate = arrDateFull[0].split("/");
                        //if(typeof arrDateFull[1] !== "undefined")
                        if(arrDateFull[1])
                        {
                            strDateTime = arrDateFull[1];
                        }
                    //}else{
                        //arrDate = dateInput.split("/");
                    //}
                    //arrDate = dateInput.split("/");


                    //portuguese dd/mm/yyyy
                    if(configDateFormat == 1)
                    {
                        strReturn = arrDate[2] + "-" + arrDate[1] + "-" + arrDate[0];
                    }

                    //britanic mm/dd/yyyy
                    if(configDateFormat == 2)
                    {
                        strReturn = arrDate[2] + "-" + arrDate[0] + "-" + arrDate[1];
                    }


                    if(strDateTime != "")
                    {
                        strReturn = strReturn + " " + strDateTime;
                    }/**/
                }else{
                    strReturn = null;
                }
            }
            //----------------------
        }

        return strReturn;


        //Usage.
        //----------------------
        //SyncSystemNS.FunctionsGeneric.dateSQLWrite("15/02/2020", gSystemConfig.configBackendDateFormat)
        //----------------------
    }
    //**************************************************************************************


    //Function to read special date input based on flexible configuration, to prepare for recording.
    //**************************************************************************************
    /**
     * Function to read special date input based on flexible configuration, to prepare for recording.
     * @static
     * @param {object} objDateInput {
                            dateField: "",
                            dateFieldDay: "",
                            dateFieldMonth: "",
                            dateFieldYear: "",
                            dateFieldHour: "",
                            dateFieldMinute: "",
                            dateFieldSeconds: ""
                        }
     * @param {integer} configDateFormat 1 - PT | 2 - UK | configBackendDateFormat | configFrontendDateFormat
     * @param {*} dateFormatReturn 
     * @returns {string}
     */
    static dateMount(objDateInput,  configDateFormat, dateFormatReturn = "")
    {
        //configDateFormat: 1 - pt | 2 uk | configBackendDateFormat | configFrontendDateFormat
        /*
        objDateInput : objDateInput = {
                            dateField: "",
                            dateFieldDay: "",
                            dateFieldMonth: "",
                            dateFieldYear: "",
                            dateFieldHour: "",
                            dateFieldMinute: "",
                            dateFieldSeconds: ""
                        }
        */

        //Variables.
        //----------------------
        let strReturn = "";
        let strDateMount = "";
        //----------------------

        if(objDateInput)
        {
            //if(objDateInput.dateFieldDay == "" && objDateInput.dateFieldMonth == "" && objDateInput.dateFieldYear == "")
            if((!objDateInput.dateFieldDay) && (!objDateInput.dateFieldMonth) && (!objDateInput.dateFieldYear))
            {
                strDateMount = objDateInput.dateField;
            }else{
                //1 - portuguese dd/mm/yyyy
                if(configDateFormat == 1)
                {
                    strDateMount = objDateInput.dateFieldDay + "/" + objDateInput.dateFieldMonth + "/" + objDateInput.dateFieldYear;
                }
                //2 - britanic mm/dd/yyyy
                if(configDateFormat == 2)
                {
                    strDateMount = objDateInput.dateFieldMonth + "/" + objDateInput.dateFieldDay + "/" + objDateInput.dateFieldYear;
                }
            }


            //if(objDateInput.dateFieldHour !== "" && objDateInput.dateFieldMinute !== "" && objDateInput.dateFieldSeconds !== "")
            if((objDateInput.dateFieldHour) && (objDateInput.dateFieldMinute) && (objDateInput.dateFieldSeconds))
            {
                strDateMount = strDateMount + " " + objDateInput.dateFieldHour + ":" + objDateInput.dateFieldMinute + ":" + objDateInput.dateFieldSeconds;
            //}else if(objDateInput.dateFieldHour !== "" && objDateInput.dateFieldMinute !== "" && objDateInput.dateFieldSeconds == "")
            }else if((objDateInput.dateFieldHour) && (objDateInput.dateFieldMinute) && (!objDateInput.dateFieldSeconds))
            {
                strDateMount = strDateMount + " " + objDateInput.dateFieldHour + ":" + objDateInput.dateFieldMinute + ":00";
            }
        }
        
        //Check for empty.
        if(strDateMount)
        {
            strReturn = strDateMount;
        }

        return strReturn;


        //Usage.
        //----------------------
        /*dateField = SyncSystemNS.FunctionsGeneric.dateMount({
                                                                dateField: "",
                                                                dateFieldDay: "",
                                                                dateFieldMonth: "",
                                                                dateFieldYear: "",
                                                                dateFieldHour: "",
                                                                dateFieldMinute: "",
                                                                dateFieldSeconds: ""
                                                            },  
                                                            gSystemConfig.configBackendDateFormat, 
                                                            "");
                                                            */
        //----------------------
    }
    //**************************************************************************************


    //Function to return formatted date.
    //**************************************************************************************
    /**
     * Function to return formatted date.
     * @static
     * @param {string} strDate 14/01/2016 |  01/14/2016
     * @param {integer} configDateFormat 1 - PT | 2 - UK | configBackendDateFormat | configFrontendDateFormat
     * @param {integer} dateFormatReturn 0 - deactivated (automatic from dateType) | 1 - (dd/mm/yyyy | mm/dd/yyyy) | 2 - (dd/mm/yyyy hh:mm:ss | mm/dd/yyyy hh:mm:ss) | 3 - yyyy-mm-dd hh:mm:ss | 10 - (yyyy-mm-dd) | 11 - yyyy-mm-ddThh:mm:ss | 22 - hh:mm:ss | 101 - written date (weekday, month day year)
     * @param {integer} dateType null - deactivated | 1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on) | 6 - history date (backwards on)  | 55 - task date with hour and minute (forward on) | 66 - history date with hour and minute (backwards on)
     * @returns {string} 
     */
    static dateRead01(strDate, configDateFormat, dateFormatReturn, dateType = null)
    {
        //configDateFormat: 1 - pt | 2 uk | configBackendDateFormat | configFrontendDateFormat
        //dateFormatReturn: 0 - deactivated (automatic from dateType) | 1 - (dd/mm/yyyy | mm/dd/yyyy) | 2 - (dd/mm/yyyy hh:mm:ss | mm/dd/yyyy hh:mm:ss) | 3 - yyyy-mm-dd hh:mm:ss | 10 - (yyyy-mm-dd) | 11 - yyyy-mm-ddThh:mm:ss | 22 - hh:mm:ss | 101 - written date (weekday, month day year)
        //dateType: null - deactivated | 1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on) | 6 - history date (backwards on)  | 55 - task date with hour and minute (forward on) | 66 - history date with hour and minute (backwards on)


        //Variables.
        //----------------------
        let strReturn = "";
        //let dateObj = new Date();
        let dateObj;
        let dateYear, dateDay, dateMonth, dateHour, dateMinute, dateSecond;
        //----------------------


        if(strDate)
        {
            //Variable value.
            //dateObj = strDate; //worked with node, but didn´t work with react
            dateObj = new Date(strDate);

            dateYear = dateObj.getFullYear();
            dateDay = dateObj.getDate();
            dateMonth = (dateObj.getMonth() + 1);
        
            //dateHour = dateObj.getHours();
            dateHour = ("0" + dateObj.getHours()).slice(-2);
            //dateMinute = dateObj.getMinutes();
            dateMinute = ("0" + dateObj.getMinutes()).slice(-2);
            //dateSecond = dateObj.getSeconds();
            dateSecond = ("0" + dateObj.getSeconds()).slice(-2);


            //Automatic define dateFormatReturn.
            if(dateType)
            {
                if(dateType == 1 || dateType == 4)
                {
                    dateFormatReturn = 1;
                }else{
                    dateFormatReturn = 2;
                }
            }
            

            //1 - (dd/mm/yyyy | mm/dd/yyyy)
            if(dateFormatReturn == 1)
            {
                //1 - pt
                if(configDateFormat == 1)
                {
                    strReturn = dateDay + "/" + dateMonth + "/" + dateYear;
                }

                //2 uk
                if(configDateFormat == 2)
                {
                    strReturn =  dateMonth + "/" + dateDay + "/" + dateYear;
                }
            }


            //2 - (dd/mm/yyyy hh:mm:ss | mm/dd/yyyy hh:mm:ss)
            if(dateFormatReturn == 2)
            {
                //1 - pt
                if(configDateFormat == 1)
                {
                    strReturn = dateDay + "/" + dateMonth + "/" + dateYear + " " + dateHour + ":" + dateMinute + ":" + dateSecond;
                }

                //2 uk
                if(configDateFormat == 2)
                {
                    strReturn =  dateMonth + "/" + dateDay + "/" + dateYear + " " + dateHour + ":" + dateMinute + ":" + dateSecond;
                }
            }

            //3 - yyyy-mm-dd hh:mm:ss
            if(dateFormatReturn == 3)
            {
                strReturn = dateYear + "-" + dateMonth + "-" + dateDay + " " + dateHour + ":" + dateMinute + ":" + dateSecond;
            }

        }


        return strReturn;


        //Usage.
        //----------------------
        /*
        SyncSystemNS.FunctionsGeneric.dateRead01(categoriesRow.date1, 
                                                gSystemConfig.configBackendDateFormat, 
                                                0, 
                                                gSystemConfig.configCategoriesDate1Type);
        */
        //----------------------
    }
    //**************************************************************************************
    

    //Fill timetable values.
    //**************************************************************************************
    /**
     * Fill timetable values.
     * @static
     * @param {string} timeTableType mm - months | d - day | y - year |  h - hour | m - minute | s - seconds
     * @param {integer} fillType 1 - conventional interval
     * @returns {array}
     */
    static timeTableFill01(timeTableType, fillType, specialParameters = {})
    {
        //timeTableType: mm - months | d - day | y - year |  h - hour | m - minute | s - seconds
        //fillType: 1 - conventional interval
        //specialParameters: {yearEndValue: 2050, dateType: 1}
            //dateType: 1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute) | 4 - birth date (limited range) | 5 - task date (forward on) | 6 - history date (backwards on)  | 55 - task date with hour and minute (forward on) | 66 - history date with hour and minute (backwards on)


        //Variables.
        //----------------------
        let strReturn = [];

        let dateNow = new Date(FunctionsGeneric.timeZoneConverter())
        let dateNowDay = dateNow.getDate();
        let dateNowMonth = dateNow.getMonth() + 1; //(0-11)
        let dateNowYear = dateNow.getFullYear();
        let dateNowMinute = dateNow.getMinutes();
        let dateNowHour = dateNow.getHours();
        let dateNowSecond = dateNow.getSeconds();
        //----------------------


        //Conventional interval.
        //----------------------
        if(fillType == 1)
        {
            //Months.
            if(timeTableType == "mm")
            {
                for(let countMonths = 1; countMonths <= 12; countMonths++)
                {
                    strReturn.push(countMonths);
                }
            }


            //Days.
            if(timeTableType == "d")
            {
                for(let countDays = 1; countDays <= 31; countDays++)
                {
                    strReturn.push(countDays);
                }
            }


            //Years.
            if(timeTableType == "y")
            {
                //1 - simple date (year, month, day) | 2 -  complete date (year, month, day, hour, minute, seconds) | 3 - semi-complete date (year, month, day, hour, minute)
                if(specialParameters.dateType === undefined || specialParameters.dateType == 1 || specialParameters.dateType == 2 | specialParameters.dateType == 3)
                {
                    for(let countYears = 1900; countYears <= (dateNowYear + 20); countYears++)
                    {
                        strReturn.push(countYears);
                    }
                }

                //4 - birth date (limited range)
                if(specialParameters.dateType == 4)
                {
                    for(let countYears = 1900; countYears <= dateNowYear; countYears++)
                    {
                        strReturn.push(countYears);
                    }
                }

                //5 - task date (forward on)
                if(specialParameters.dateType == 5 || specialParameters.dateType == 55)
                {
                    for(let countYears = dateNowYear; countYears <= (dateNowYear + 20); countYears++)
                    {
                        strReturn.push(countYears);
                    }
                }

                //6 - history date (backwards on)
                if(specialParameters.dateType == 6 || specialParameters.dateType == 66)
                {
                    for(let countYears = 1900; countYears <= dateNowYear; countYears++)
                    {
                        strReturn.push(countYears);
                    }
                }
            }


            //Hours.
            if(timeTableType == "h")
            {
                for(let countHours = 0; countHours <= 23; countHours++)
                {
                    strReturn.push(countHours);
                }
            }


            //Hours.
            if(timeTableType == "m")
            {
                for(let countMinutes = 0; countMinutes <= 59; countMinutes++)
                {
                    strReturn.push(countMinutes);
                }
            }
            

            //Seconds.
            if(timeTableType == "s")
            {
                for(let countSeconds = 0; countSeconds <= 59; countSeconds++)
                {
                    strReturn.push(countSeconds);
                }
            }
        }
        //----------------------


        return strReturn;


        //Usage.
        //----------------------
        /*
        ${SyncSystemNS.FunctionsGeneric.timeTableFill01("y", 1).map((arrayRow)=>{
            return `
                <option value="${ arrayRow }">${ arrayRow }</option>
            `}).join(",") }
        */
        //----------------------
    }
    //**************************************************************************************


    //Return the extension of a file.
    //**************************************************************************************
    /**
     * Return the extension of a file.
     * @static
     * @param {string} filePath 
     * @returns {string}
     */
    static fileExtensionGet(filePath)
    {
        //Variables.
        //----------------------
        let strReturn = "";
        //----------------------


        if(filePath !== null && typeof(filePath) !== 'undefined')
        {
            strReturn = filePath;
        }else{
            strReturn = "";
        }

        return strReturn;
    }
    //**************************************************************************************


    //Data treatment for displaying information.
    //**************************************************************************************
    /**
     * Data treatment for displaying information.
     * @static
     * @param {string} strContent 
     * @param {string} specialInstructions 
     * @returns {string}
     * @example
     * 
     */
    static contentMaskRead(strContent, specialInstructions = "")
    {
		//specialInstructions: db | utf8_encode | htmlentities | config-application | env (.env - environment variables) | pdf (convert to text) | json_encode (JavaScript String Encode) | url | linkStyle=ss-backend-links01

        //Variables.
        //----------------------
        let strReturn = strContent;
        //----------------------


        //Detect edit field type.
        //----------------------
        if(specialInstructions.includes("editTextBox=17") == true || specialInstructions.includes("editTextBox=18") == true)
        {
            specialInstructions += ", db"; //include especial instruction
        }
        //----------------------


        //db
        //----------------------
        if(specialInstructions.includes("db") == true)
        {
            if(strReturn)
            {
                //strReturn = strContent;

                //Convert line breaks to html br tags.
                //ref: https://stackoverflow.com/questions/784539/how-do-i-replace-all-line-breaks-in-a-string-with-br-tags
                //strReturn = strContent.replace(/(?:\r\n|\r|\n)/g, "<br />");
                strReturn = strReturn.replace(/(?:\r\n|\r|\n)/g, "<br />");
            }
        }
        //----------------------


        //apply link style
        //----------------------
        if(specialInstructions.includes("linkStyle") == true)
        {
            //Variables.
            let arrSpecialInstructions = specialInstructions.split(",");
            let styleApply;


            //Value definition.
            arrSpecialInstructions.filter((array)=>{
                if(array.includes("linkStyle"))
                {
                    styleApply = array;
                }
            });


            //Data treatment.
            styleApply = styleApply.replace("linkStyle=", "");


            //Logic.
            //strReturn = strReturn.replace('target="_blank"', 'target="_blank" class="' + styleApply + '"');
            strReturn = strReturn.replace('href="', 'class="' + styleApply + '" href="');
            

            //Debug.
            //console.log("arrSpecialInstructions[1]=", arrSpecialInstructions[1]);
            //console.log("styleApply=", styleApply);
        }
        //----------------------


        //config-application
        //----------------------
        //if(specialInstructions == "config-application")
        if(specialInstructions.includes("config-application") == true)
        {
            //strReturn = strContent;
            strReturn = strReturn;
        }
        //----------------------


        //env (.env - environment variables)
        //----------------------
        if(specialInstructions.includes("env") == true)
        {
            //strReturn = strContent;
            strReturn = strReturn;
        }
        //----------------------


        //URL
        //----------------------
        //TODO: check and correct url links.
        if(specialInstructions.includes("url") == true)
        {
            //strReturn = strContent;
            strReturn = strReturn;
        }
        //----------------------


        return strReturn;
    }
    //**************************************************************************************


    //Data treatment for writing content.
    //**************************************************************************************
    /**
     * Data treatment for writing content.
     * @static
     * @param {string} strContent 
     * @param {string} specialInstructions db_write_text | db_sanitize | utf8_encode | htmlentities | config-application | env (.env - environment variables) | pdf (convert to text) | json_encode (JavaScript String Encode)
     * @returns {string}
     * @example
     * SyncSystemNS.FunctionsGeneric.contentMaskWrite(variableNameOrText, "db_write_text")
     */
    static contentMaskWrite(strContent, specialInstructions = "")
    {
		//specialInstructions: db_write_text | db_sanitize | utf8_encode | htmlentities | config-application | env (.env - environment variables) | pdf (convert to text) | json_encode (JavaScript String Encode)

        //Variables.
        //----------------------
        let strReturn = strContent;
        //----------------------

        
        //if(strReturn !== null && typeof(strReturn) !== 'undefined')
        if(strReturn)
        {
            //db_write_text
            //----------------------
            if(specialInstructions == "db_write_text") //TODO: substitute condition with search in string.
            {
                strReturn = strReturn;
            }
            //----------------------


            //db_sanitize
            //----------------------
            if(specialInstructions == "db_sanitize")
            {
                strReturn = strReturn;
            }
            //----------------------


            //env (.env - environment variables)
            //----------------------
            if(specialInstructions == "env")
            {
                strReturn = strReturn;
            }
            //----------------------
        }else{
            strReturn = "";
        }
        

        return strReturn;


        //Usage.
        //----------------------
        //SyncSystemNS.FunctionsGeneric.contentMaskWrite("return test - data", "db_write_text");
        //----------------------
    }
    //**************************************************************************************


    //Data treatment for writing values.
    //**************************************************************************************
    /**
     * Data treatment for writing value.
     * @static
     * @param {string} valueData 
     * @param {int} valueType 1 - general number | 2 - system currency | 3 - decimal | 4 - system currency (decimal)
     * @param {*} specialInstructions 
     * @returns {int | double | string}
     * @example
     * SyncSystemNS.FunctionsGeneric.valueMaskWrite(variableNameOrText, 2)
     */
    static valueMaskWrite(valueData, valueType = 2, specialInstructions = null)
    {
        //valueType: 1 - general number | 2 - system currency | 3 - decimal (máximum: 34 digits) | 4 - system currency (decimal)

        //Variables.
        //----------------------
        let strReturn = valueData;
        //----------------------


        //Logic.
        if(strReturn !== null || typeof(strReturn) !== "undefined")
        {
            //system currency
            if(valueType == 2)
            {
                //strReturn = strReturn.replace(",", "");
                strReturn = strReturn.replace(/\,/g, "");
                strReturn = strReturn.replace(/\./g, "");
            }

            //decimal
            if(valueType == 3)
            {
                strReturn = strReturn.replace(/\,/g, "");
            }


            //system currency (decimals)
            if(valueType == 4)
            {
                //R$ - Real.
                if(gSystemConfig.configSystemCurrency == "R$")
                {
                    strReturn = strReturn.replace(/\./g, "");
                    strReturn = strReturn.replace(/\,/g, ".");
                }

                //$ - Dollar.
                if(gSystemConfig.configSystemCurrency == "$")
                {
                    strReturn = strReturn.replace(/\,/g, "");
                }                
            }
        }


        return strReturn;
    }
    //**************************************************************************************



    //Data treatment to read values.
    //**************************************************************************************
    /**
     * Data treatment to read values.
     * @static
     * @param {string} valueData 
     * @param {int} valueType 1 - general number | 2 - system currency | 3 - decimal | 4 - system currency (with decimals)
     * @param {*} specialInstructions 
     * @returns {int | double}
     * @example
     * SyncSystemNS.FunctionsGeneric.valueMaskWrite(variableNameOrText, 2)
     */
    static valueMaskRead(valueData, configCurrency = "$", valueType = 2, specialInstructions = null)
    //static valueMaskRead(valueData, configCurrency, valueType, specialInstructions)
    {
        //valueType: 1 - general number | 2 - system currency | 3 - decimal

        //Default values.
        //----------------------
        /*
        if(configCurrency === undefined) {
            configCurrency = "$";
        }
        if(valueType === undefined) {
            valueType = 2;
        }
        if(specialInstructions === undefined) {
            specialInstructions = null;
        }
        */
        //----------------------


        //Variables.
        //----------------------
        let strReturn = "";
        let strValue = valueData;
        //----------------------


        //Logic.
        //if(strValue !== null || typeof(strValue) !== "undefined")
        if(strValue !== null && typeof(strValue) !== "undefined")
        {
            //Set default configuration.
            //Note: Check if this configuration can be applied only to an instance.
            BigNumber.config({
                //EXPONENTIAL_AT: 1000,
                DECIMAL_PLACES: 30,
                FORMAT: {
                    decimalSeparator: '.', // decimal separator
                }
            });

            //let n1 = new bigDecimal(strValue.toString());
            //let n1 = new bigDecimal(strValue);
            let bnStrValue = new BigNumber(strValue.toString()); //documentation: https://mikemcl.github.io/bignumber.js/
            //let n1 = new BigNumber("12312312312312312312312311.000000000000000000000000000000");
            //let strDecimal;
            //let bnStrValueFormated = new BigNumber();
            /*var formatValueBR = new Intl.NumberFormat('pt-BR', {
                //style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
            });
            var formatValueUS = new Intl.NumberFormat('en-US', {
                //style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
            });*/


            //Generic number.
            if(valueType == 1)
            {
                //bnStrValue = bnStrValue.toFixed(0);
                //bnStrValue = bnStrValue.toFixed(2);
                bnStrValue = bnStrValue.integerValue();
                

                strReturn = bnStrValue;
            }


            //System currency.
            if(valueType == 2)
            {
                bnStrValue = bnStrValue.toFixed();

                //Check if it´s a decimal.
                if(bnStrValue.includes("."))
                {
                    bnStrValue = new BigNumber(bnStrValue).toFormat(2); //reduce to just 2 decimal spaces
                    //console.log("bnStrValue (valueMaskRead)=", bnStrValue); //debug
                    bnStrValue = bnStrValue.replace(/\./g, "");
                }

                //Ajust input number.
                if(bnStrValue.length < 3)
                {
                    bnStrValue = "00" + bnStrValue.toString();
                }

                let strDecimal = bnStrValue.substr((bnStrValue.length - 2), bnStrValue.length);
                let bnStrValueFormated = new BigNumber(bnStrValue.substr(0, (bnStrValue.length - 2)) + "." + strDecimal);


                //Currency.
                //R$ (Real)
                if(configCurrency == "R$")
                {
                    BigNumber.config({
                        FORMAT: {
                            prefix: '', // string to prepend
                            decimalSeparator: ',', // decimal separator
                            groupSeparator: '.', // grouping separator of the integer part
                            groupSize: 3 // primary grouping size of the integer part
                        }
                    });
                }
    

                //$ (dollar)
                if(configCurrency == "$")
                {
                    BigNumber.config({
                        FORMAT: {
                            prefix: '', // string to prepend
                            decimalSeparator: '.', // decimal separator
                            groupSeparator: ',', // grouping separator of the integer part
                            groupSize: 3 // primary grouping size of the integer part
                        }
                    });
                }


                //strReturn = formatValueBR.format(bnStrValueFormated);
                //strReturn = bnStrValue.toFixed();
                strReturn = bnStrValueFormated.toFormat(2);
                //strReturn = bnStrValueFormated;
            }


            //Decimals.
            if(valueType == 3)
            {
                bnStrValue = bnStrValue.toFixed();
                strReturn = bnStrValue;
            }


            //System currency with decimals.
            if(valueType == 4)
            {
                bnStrValue = bnStrValue.toFixed();

                //Check if it´s a decimal.
                if(bnStrValue.includes("."))
                {
                    bnStrValue = new BigNumber(bnStrValue).toFormat(2); //reduce to just 2 decimal spaces
                    //console.log("bnStrValue (valueMaskRead)=", bnStrValue); //debug
                    bnStrValue = bnStrValue.replace(/\./g, "");
                }

                //Ajust input number.
                if(bnStrValue.length < 3)
                {
                    bnStrValue = "00" + bnStrValue.toString();
                }

                let strDecimal = bnStrValue.substr((bnStrValue.length - 2), bnStrValue.length);
                let bnStrValueFormated = new BigNumber(bnStrValue.substr(0, (bnStrValue.length - 2)) + "." + strDecimal);


                //Currency.
                //R$ (Real)
                if(configCurrency == "R$")
                {
                    BigNumber.config({
                        FORMAT: {
                            prefix: '', // string to prepend
                            decimalSeparator: ',', // decimal separator
                            groupSeparator: '.', // grouping separator of the integer part
                            groupSize: 3 // primary grouping size of the integer part
                        }
                    });
                }
    

                //$ (dollar)
                if(configCurrency == "$")
                {
                    BigNumber.config({
                        FORMAT: {
                            prefix: '', // string to prepend
                            decimalSeparator: '.', // decimal separator
                            groupSeparator: ',', // grouping separator of the integer part
                            groupSize: 3 // primary grouping size of the integer part
                        }
                    });
                }

                strReturn = bnStrValueFormated.toFormat(2);

                //bnStrValue = bnStrValue.toFixed();
                //strReturn = bnStrValue;
            }


            //Debug.
            //strReturn = strValue;
            //strReturn = n1.minus(10.1).toFixed();
            //strReturn = n1.toFixed();
            //strReturn = n1.toFixed(); //working
            //strReturn = n1.getValue();
            //strReturn = bigDecimal(strValue.toString());
            //strReturn = BigNumber("'" + strValue + "'");
            //strReturn = BigNumber(strValue.toString());
            //strReturn = BigNumber(strValue.toString(), 10);
            //strReturn = BigNumber(strValue.toString()).toFixed();
            
            //strReturn = strValue.toLocaleString('fullwide', {useGrouping:false}); //not working
        }


        return strReturn;
    }
    //**************************************************************************************
    

    //Configuration function for categories types.
    //**************************************************************************************
    static categoryConfigSelect(categoryType, returnInfo)
    {
        //returnInfo: 0 - Query String | 1 - pageLinkFrontend | 2 - variableFrontend | 3 - pageLinkBackend | 4 - variableBackend | 5 - function name | 11 - pageLinkDashboard | 12 - variableDashboard

        //Variables.
        //----------------------
        let strReturn = "";

        let pageLinkFrontend = "";
        let variableFrontend = "";
        let pageLinkBackend = "";
        let variableBackend = "";
        let pageLinkDashboard = "";
        let variableDashboard = "";
        //----------------------


        //Logic - category type definition.
        //----------------------

        //Content.
        if(categoryType == 1)
        {
            pageLinkFrontend = gSystemConfig.configRouteBackendContent;
            variableFrontend = "idParentContent";

            pageLinkBackend = gSystemConfig.configRouteFrontendContent;
            variableBackend = "idParentContent";

            pageLinkDashboard = gSystemConfig.configRouteFrontendDashboardContent;
            variableDashboard = "idParentContent";
    

            //Debug.
            //console.log("configCategoryType=");
            //console.log(gSystemConfig.configCategoryType);
        }


        //Products.
        if(categoryType == 2)
        {
            pageLinkFrontend = gSystemConfig.configRouteFrontendProducts;
            variableFrontend = "idParentProducts";

            pageLinkBackend = gSystemConfig.configRouteBackendProducts;
            variableBackend = "idParentProducts";

            pageLinkDashboard = gSystemConfig.configRouteFrontendDashboardProducts;
            variableDashboard = "idParentProducts";
    

            //Debug.
            //console.log("configCategoryType=");
            //console.log(gSystemConfig.configCategoryType);
        }


        //Publications - news.
        if(categoryType == 3)
        {
            pageLinkFrontend = gSystemConfig.configRouteFrontendPublications;
            variableFrontend = "idParentPublications";

            pageLinkBackend = gSystemConfig.configRouteBackendPublications;
            variableBackend = "idParentPublications";

            pageLinkDashboard = gSystemConfig.configRouteFrontendDashboardPublications;
            variableDashboard = "idParentPublications";
        }
        //Publications - photo gallery.
        if(categoryType == 4)
        {
            pageLinkFrontend = gSystemConfig.configRouteFrontendPublications;
            variableFrontend = "idParentPublications";

            pageLinkBackend = gSystemConfig.configRouteBackendPublications;
            variableBackend = "idParentPublications";

            pageLinkDashboard = gSystemConfig.configRouteFrontendDashboardPublications;
            variableDashboard = "idParentPublications";
        }
        //Publications - articles.
        if(categoryType == 5)
        {
            pageLinkFrontend = gSystemConfig.configRouteFrontendPublications;
            variableFrontend = "idParentPublications";

            pageLinkBackend = gSystemConfig.configRouteBackendPublications;
            variableBackend = "idParentPublications";

            pageLinkDashboard = gSystemConfig.configRouteFrontendDashboardPublications;
            variableDashboard = "idParentPublications";
        }
        //Publications - publications.
        if(categoryType == 6)
        {
            pageLinkFrontend = gSystemConfig.configRouteFrontendPublications;
            variableFrontend = "idParentPublications";

            pageLinkBackend = gSystemConfig.configRouteBackendPublications;
            variableBackend = "idParentPublications";

            pageLinkDashboard = gSystemConfig.configRouteFrontendDashboardPublications;
            variableDashboard = "idParentPublications";
        }

        //Polls.
        if(categoryType == 7)
        {
            pageLinkFrontend = gSystemConfig.configRouteFrontendQuizzes;
            variableFrontend = "idParentQuizzes";

            pageLinkBackend = gSystemConfig.configRouteBackendQuizzes;
            variableBackend = "idParentQuizzes";

            pageLinkDashboard = gSystemConfig.configRouteFrontendDashboardQuizzes;
            variableDashboard = "idParentQuizzes";
    

            //Debug.
            //console.log("configCategoryType=");
            //console.log(gSystemConfig.configCategoryType);
        }
        


        //Categories.
        if(categoryType == 9)
        {
            //pageLinkFrontend = "categories";
            pageLinkFrontend = gSystemConfig.configRouteFrontendCategories;
            variableFrontend = "idParentCategories";

            //pageLinkBackend = "categories";
            pageLinkBackend = gSystemConfig.configRouteBackendCategories;
            variableBackend = "idParentCategories";

            pageLinkDashboard = gSystemConfig.configRouteFrontendDashboardCategories;
            variableDashboard = "idParentCategories";
    

            //Debug.
            //console.log("configCategoryType=");
            //console.log(gSystemConfig.configCategoryType);
        }


        //Forms.
        if(categoryType == 12)
        {
            pageLinkFrontend = gSystemConfig.configRouteBackendForms;
            variableFrontend = "idParentForms";

            pageLinkBackend = "forms";
            variableBackend = "idParentForms";

            pageLinkDashboard = "dashboard-forms";
            variableDashboard = "idParentForms";
    

            //Debug.
            //console.log("configCategoryType=");
            //console.log(gSystemConfig.configCategoryType);
        }


        //Registers.
        if(categoryType == 13)
        {
            pageLinkFrontend = gSystemConfig.configRouteFrontendRegisters;
            variableFrontend = "idParentRegisters";

            pageLinkBackend = gSystemConfig.configRouteBackendRegisters;
            variableBackend = "idParentRegisters";

            pageLinkDashboard = gSystemConfig.configRouteFrontendDashboardRegisters;
            variableDashboard = "idParentRegisters";
    

            //Debug.
            //console.log("configCategoryType=");
            //console.log(gSystemConfig.configCategoryType);
        }


        //Quizzes.
        if(categoryType == 17)
        {
            pageLinkFrontend = gSystemConfig.configRouteFrontendQuizzes;
            variableFrontend = "idParentQuizzes";

            pageLinkBackend = gSystemConfig.configRouteBackendQuizzes;
            variableBackend = "idParentQuizzes";

            pageLinkDashboard = gSystemConfig.configRouteFrontendDashboardQuizzes;
            variableDashboard = "idParentQuizzes";
    

            //Debug.
            //console.log("configCategoryType=");
            //console.log(gSystemConfig.configCategoryType);
        }
        //----------------------


        //Logic - return info definition.
        //----------------------
        if(returnInfo == 0)
        {
            for(let countObjArray = 0; countObjArray < gSystemConfig.configCategoryType.length; countObjArray++)
            {
                let objCategoryType = gSystemConfig.configCategoryType[countObjArray];
                for(let key in objCategoryType)
                {
                    //if(key == "category_type")
                    //{
                        if(objCategoryType[key] == categoryType)
                        {
                            strReturn = objCategoryType["queryString"];
                            //strReturn = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, objCategoryType["category_type_function_label"]);
                            //console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, objCategoryType["category_type_function_label"]));
                            //console.log("category_type=", objCategoryType["category_type_function_label"]);
                        }
                    //}

                    //console.log(key + "=" + objCategoryType[key]);
                }
            }
        }
        
        if(returnInfo == 1)
        {
            strReturn = pageLinkFrontend;
        }
        if(returnInfo == 2)
        {
            strReturn = variableFrontend;
        }

        if(returnInfo == 3)
        {
            strReturn = pageLinkBackend;
        }
        if(returnInfo == 4)
        {
            strReturn = variableBackend;
        }

        if(returnInfo == 5)
        {
            //Loop through category types config.
            /*
            for(var property in gSystemConfig.configCategoryType) {
                if(gSystemConfig.configCategoryType.hasOwnProperty(property)) {
                    console.log("property=");
                    console.log(property);

                    console.log("property.category_type_function_label=");
                    console.log(property.category_type_function_label);
                }
            }
            */

            for(let countObjArray = 0; countObjArray < gSystemConfig.configCategoryType.length; countObjArray++)
            {
                let objCategoryType = gSystemConfig.configCategoryType[countObjArray];
                for(let key in objCategoryType)
                {
                    //if(key == "category_type")
                    //{
                        if(objCategoryType[key] == categoryType)
                        {
                            strReturn = FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, objCategoryType["category_type_function_label"]);
                            //console.log(FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageBackend.appLabels, objCategoryType["category_type_function_label"]));
                            //console.log("category_type=", objCategoryType["category_type_function_label"]);
                        }
                    //}

                    //console.log(key + "=" + objCategoryType[key]);
                }
            }
              
              
            //strReturn = variableFrontend;
        }

        if(returnInfo == 11)
        {
            strReturn = pageLinkDashboard;
        }
        if(returnInfo == 12)
        {
            strReturn = variableDashboard;
        }
        //----------------------


        return strReturn;
    }
    //**************************************************************************************


    //Function to help build the SQL queries.
    //**************************************************************************************
    /**
     * Function to help build the SQL queries.
     * @param {string} strTable categories (configSystemDBTableCategories) | files (configSystemDBTableFiles) | content (configSystemDBTableContent) | forms | filters_generic (configSystemDBTableFiltersGeneric) | filters_generic_binding (configSystemDBTableFiltersGenericBinding)
     * @param {string} buildType all | backend_optimized | frontend_optimized
     * @param {string} returnMethod array | string (separated by commas)
     * @returns {array | string}
     */
    static tableFieldsQueryBuild01(strTable, buildType, returnMethod)
    {
        //buildType: all | files
        //returnMethod: array | string (separated by commas)


        //Variables.
        //----------------------
        let strReturn;
        let arrTableFieldsQueryBuild = [];
        //----------------------


        //Buid the field search array (to be converted to string).

        //Categories.
        //----------------------
        //if(strTable == "categories")
        if(strTable == gSystemConfig.configSystemDBTableCategories)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_parent"];
                gSystemConfig.enableCategoriesSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                arrTableFieldsQueryBuild.push("category_type", "date_creation", "date_timezone", "date_edit");
                gSystemConfig.enableCategoriesBindRegisterUser == 1 ? arrTableFieldsQueryBuild.push("id_register_user") : '';
                gSystemConfig.enableCategoriesBindRegister1 == 1 ? arrTableFieldsQueryBuild.push("id_register1") : '';
                gSystemConfig.enableCategoriesBindRegister2 == 1 ? arrTableFieldsQueryBuild.push("id_register2") : '';
                gSystemConfig.enableCategoriesBindRegister3 == 1 ? arrTableFieldsQueryBuild.push("id_register3") : '';
                gSystemConfig.enableCategoriesBindRegister4 == 1 ? arrTableFieldsQueryBuild.push("id_register4") : '';
                gSystemConfig.enableCategoriesBindRegister5 == 1 ? arrTableFieldsQueryBuild.push("id_register5") : '';
                arrTableFieldsQueryBuild.push("title", "url_alias", "keywords_tags", "meta_description", "meta_title", "meta_info");
                gSystemConfig.enableCategoriesDescription == 1 ? arrTableFieldsQueryBuild.push("description") : '';
                gSystemConfig.enableCategoriesInfo1 == 1 ? arrTableFieldsQueryBuild.push("info1") : '';
                gSystemConfig.enableCategoriesInfo2 == 1 ? arrTableFieldsQueryBuild.push("info2") : '';
                gSystemConfig.enableCategoriesInfo3 == 1 ? arrTableFieldsQueryBuild.push("info3") : '';
                gSystemConfig.enableCategoriesInfo4 == 1 ? arrTableFieldsQueryBuild.push("info4") : '';
                gSystemConfig.enableCategoriesInfo5 == 1 ? arrTableFieldsQueryBuild.push("info5") : '';
                gSystemConfig.enableCategoriesInfo6 == 1 ? arrTableFieldsQueryBuild.push("info6") : '';
                gSystemConfig.enableCategoriesInfo7 == 1 ? arrTableFieldsQueryBuild.push("info7") : '';
                gSystemConfig.enableCategoriesInfo8 == 1 ? arrTableFieldsQueryBuild.push("info8") : '';
                gSystemConfig.enableCategoriesInfo9 == 1 ? arrTableFieldsQueryBuild.push("info9") : '';
                gSystemConfig.enableCategoriesInfo10 == 1 ? arrTableFieldsQueryBuild.push("info10") : '';
                gSystemConfig.enableCategoriesInfoS1 == 1 ? arrTableFieldsQueryBuild.push("info_small1") : '';
                gSystemConfig.enableCategoriesInfoS2 == 1 ? arrTableFieldsQueryBuild.push("info_small2") : '';
                gSystemConfig.enableCategoriesInfoS3 == 1 ? arrTableFieldsQueryBuild.push("info_small3") : '';
                gSystemConfig.enableCategoriesInfoS4 == 1 ? arrTableFieldsQueryBuild.push("info_small4") : '';
                gSystemConfig.enableCategoriesInfoS5 == 1 ? arrTableFieldsQueryBuild.push("info_small5") : '';
                gSystemConfig.enableCategoriesNumber1 == 1 ? arrTableFieldsQueryBuild.push("number1") : '';
                gSystemConfig.enableCategoriesNumber2 == 1 ? arrTableFieldsQueryBuild.push("number2") : '';
                gSystemConfig.enableCategoriesNumber3 == 1 ? arrTableFieldsQueryBuild.push("number3") : '';
                gSystemConfig.enableCategoriesNumber4 == 1 ? arrTableFieldsQueryBuild.push("number4") : '';
                gSystemConfig.enableCategoriesNumber5 == 1 ? arrTableFieldsQueryBuild.push("number5") : '';
                gSystemConfig.enableCategoriesNumberS1 == 1 ? arrTableFieldsQueryBuild.push("number_small1") : '';
                gSystemConfig.enableCategoriesNumberS2 == 1 ? arrTableFieldsQueryBuild.push("number_small2") : '';
                gSystemConfig.enableCategoriesNumberS3 == 1 ? arrTableFieldsQueryBuild.push("number_small3") : '';
                gSystemConfig.enableCategoriesNumberS4 == 1 ? arrTableFieldsQueryBuild.push("number_small4") : '';
                gSystemConfig.enableCategoriesNumberS5 == 1 ? arrTableFieldsQueryBuild.push("number_small5") : '';
                gSystemConfig.enableCategoriesDate1 == 1 ? arrTableFieldsQueryBuild.push("date1") : '';
                gSystemConfig.enableCategoriesDate2 == 1 ? arrTableFieldsQueryBuild.push("date2") : '';
                gSystemConfig.enableCategoriesDate3 == 1 ? arrTableFieldsQueryBuild.push("date3") : '';
                gSystemConfig.enableCategoriesDate4 == 1 ? arrTableFieldsQueryBuild.push("date4") : '';
                gSystemConfig.enableCategoriesDate5 == 1 ? arrTableFieldsQueryBuild.push("date5") : '';
                //arrTableFieldsQueryBuild.push("image_main");
                gSystemConfig.enableCategoriesImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                gSystemConfig.enableCategoriesFile1 == 1 ? arrTableFieldsQueryBuild.push("file1") : '';
                gSystemConfig.enableCategoriesFile2 == 1 ? arrTableFieldsQueryBuild.push("file2") : '';
                gSystemConfig.enableCategoriesFile3 == 1 ? arrTableFieldsQueryBuild.push("file3") : '';
                gSystemConfig.enableCategoriesFile4 == 1 ? arrTableFieldsQueryBuild.push("file4") : '';
                gSystemConfig.enableCategoriesFile5 == 1 ? arrTableFieldsQueryBuild.push("file5") : '';
                arrTableFieldsQueryBuild.push("activation");
                gSystemConfig.enableCategoriesActivation1 == 1 ? arrTableFieldsQueryBuild.push("activation1") : '';
                gSystemConfig.enableCategoriesActivation2 == 1 ? arrTableFieldsQueryBuild.push("activation2") : '';
                gSystemConfig.enableCategoriesActivation3 == 1 ? arrTableFieldsQueryBuild.push("activation3") : '';
                gSystemConfig.enableCategoriesActivation4 == 1 ? arrTableFieldsQueryBuild.push("activation4") : '';
                gSystemConfig.enableCategoriesActivation5 == 1 ? arrTableFieldsQueryBuild.push("activation5") : '';
                gSystemConfig.enableCategoriesStatus == 1 ? arrTableFieldsQueryBuild.push("id_status") : '';
                gSystemConfig.enableCategoriesRestrictedAccess == 1 ? arrTableFieldsQueryBuild.push("restricted_access") : '';
                gSystemConfig.enableCategoriesNotes == 1 ? arrTableFieldsQueryBuild.push("notes") : '';
            }


            //File fields.
            if(buildType == "files")
            {
                arrTableFieldsQueryBuild.push("image_main");
                gSystemConfig.enableCategoriesFile1 == 1 ? arrTableFieldsQueryBuild.push("file1") : '';
                gSystemConfig.enableCategoriesFile2 == 1 ? arrTableFieldsQueryBuild.push("file2") : '';
                gSystemConfig.enableCategoriesFile3 == 1 ? arrTableFieldsQueryBuild.push("file3") : '';
                gSystemConfig.enableCategoriesFile4 == 1 ? arrTableFieldsQueryBuild.push("file4") : '';
                gSystemConfig.enableCategoriesFile5 == 1 ? arrTableFieldsQueryBuild.push("file5") : '';
            }
        }
        //----------------------


        //Files.
        //----------------------
        if(strTable == gSystemConfig.configSystemDBTableFiles)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_parent"];
                gSystemConfig.enableFilesSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                //arrTableFieldsQueryBuild.push("file_type", "file_config", "date_creation", "date_timezone", "date_edit");
                arrTableFieldsQueryBuild.push("file_type", "file_config", "date_creation", "date_edit");
                gSystemConfig.enableFilesTitle == 1 ? arrTableFieldsQueryBuild.push("title") : '';
                arrTableFieldsQueryBuild.push("caption");
                gSystemConfig.enableFilesDescription == 1 ? arrTableFieldsQueryBuild.push("description") : '';
                gSystemConfig.enableFilesHTMLCode == 1 ? arrTableFieldsQueryBuild.push("html_code") : '';
                arrTableFieldsQueryBuild.push("url_alias", "keywords_tags", "meta_description", "meta_title", "meta_info");
                gSystemConfig.enableFilesInfo1 == 1 ? arrTableFieldsQueryBuild.push("info1") : '';
                gSystemConfig.enableFilesInfo2 == 1 ? arrTableFieldsQueryBuild.push("info2") : '';
                gSystemConfig.enableFilesInfo3 == 1 ? arrTableFieldsQueryBuild.push("info3") : '';
                gSystemConfig.enableFilesInfo4 == 1 ? arrTableFieldsQueryBuild.push("info4") : '';
                gSystemConfig.enableFilesInfo5 == 1 ? arrTableFieldsQueryBuild.push("info5") : '';
                gSystemConfig.enableFilesInfoS1 == 1 ? arrTableFieldsQueryBuild.push("info_small1") : '';
                gSystemConfig.enableFilesInfoS2 == 1 ? arrTableFieldsQueryBuild.push("info_small2") : '';
                gSystemConfig.enableFilesInfoS3 == 1 ? arrTableFieldsQueryBuild.push("info_small3") : '';
                gSystemConfig.enableFilesInfoS4 == 1 ? arrTableFieldsQueryBuild.push("info_small4") : '';
                gSystemConfig.enableFilesInfoS5 == 1 ? arrTableFieldsQueryBuild.push("info_small5") : '';
                gSystemConfig.enableFilesNumber1 == 1 ? arrTableFieldsQueryBuild.push("number1") : '';
                gSystemConfig.enableFilesNumber2 == 1 ? arrTableFieldsQueryBuild.push("number2") : '';
                gSystemConfig.enableFilesNumber3 == 1 ? arrTableFieldsQueryBuild.push("number3") : '';
                gSystemConfig.enableFilesNumber4 == 1 ? arrTableFieldsQueryBuild.push("number4") : '';
                gSystemConfig.enableFilesNumber5 == 1 ? arrTableFieldsQueryBuild.push("number5") : '';
                gSystemConfig.enableFilesNumberS1 == 1 ? arrTableFieldsQueryBuild.push("number_small1") : '';
                gSystemConfig.enableFilesNumberS2 == 1 ? arrTableFieldsQueryBuild.push("number_small2") : '';
                gSystemConfig.enableFilesNumberS3 == 1 ? arrTableFieldsQueryBuild.push("number_small3") : '';
                gSystemConfig.enableFilesNumberS4 == 1 ? arrTableFieldsQueryBuild.push("number_small4") : '';
                gSystemConfig.enableFilesNumberS5 == 1 ? arrTableFieldsQueryBuild.push("number_small5") : '';
                gSystemConfig.enableFilesDate1 == 1 ? arrTableFieldsQueryBuild.push("date1") : '';
                gSystemConfig.enableFilesDate2 == 1 ? arrTableFieldsQueryBuild.push("date2") : '';
                gSystemConfig.enableFilesDate3 == 1 ? arrTableFieldsQueryBuild.push("date3") : '';
                gSystemConfig.enableFilesDate4 == 1 ? arrTableFieldsQueryBuild.push("date4") : '';
                gSystemConfig.enableFilesDate5 == 1 ? arrTableFieldsQueryBuild.push("date5") : '';
                
                arrTableFieldsQueryBuild.push("file");
                gSystemConfig.enableFilesThumbnails == 1 ? arrTableFieldsQueryBuild.push("file_thumbnail") : '';
                arrTableFieldsQueryBuild.push("file_size", "file_duration", "file_dimensions", "file_original_name");

                gSystemConfig.enableFilesFile1 == 1 ? arrTableFieldsQueryBuild.push("file1") : '';
                gSystemConfig.enableFilesFile2 == 1 ? arrTableFieldsQueryBuild.push("file2") : '';
                gSystemConfig.enableFilesFile3 == 1 ? arrTableFieldsQueryBuild.push("file3") : '';
                gSystemConfig.enableFilesFile4 == 1 ? arrTableFieldsQueryBuild.push("file4") : '';
                gSystemConfig.enableFilesFile5 == 1 ? arrTableFieldsQueryBuild.push("file5") : '';
                arrTableFieldsQueryBuild.push("activation");
                gSystemConfig.enableFilesActivation1 == 1 ? arrTableFieldsQueryBuild.push("activation1") : '';
                gSystemConfig.enableFilesActivation2 == 1 ? arrTableFieldsQueryBuild.push("activation2") : '';
                gSystemConfig.enableFilesActivation3 == 1 ? arrTableFieldsQueryBuild.push("activation3") : '';
                gSystemConfig.enableFilesActivation4 == 1 ? arrTableFieldsQueryBuild.push("activation4") : '';
                gSystemConfig.enableFilesActivation5 == 1 ? arrTableFieldsQueryBuild.push("activation5") : '';
                gSystemConfig.enableFilesNotes == 1 ? arrTableFieldsQueryBuild.push("notes") : '';
            }


            //File fields.
            if(buildType == "files")
            {
                arrTableFieldsQueryBuild.push("file");
                gSystemConfig.enableFilesThumbnails == 1 ? arrTableFieldsQueryBuild.push("file_thumbnail") : '';
                gSystemConfig.enableFilesFile1 == 1 ? arrTableFieldsQueryBuild.push("file1") : '';
                gSystemConfig.enableFilesFile2 == 1 ? arrTableFieldsQueryBuild.push("file2") : '';
                gSystemConfig.enableFilesFile3 == 1 ? arrTableFieldsQueryBuild.push("file3") : '';
                gSystemConfig.enableFilesFile4 == 1 ? arrTableFieldsQueryBuild.push("file4") : '';
                gSystemConfig.enableFilesFile5 == 1 ? arrTableFieldsQueryBuild.push("file5") : '';
            }
        }
        //----------------------


        //Content.
        //----------------------
        if(strTable == gSystemConfig.configSystemDBTableContent)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_parent"];
                gSystemConfig.enableContentSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                //arrTableFieldsQueryBuild.push("date_creation", "date_timezone", "date_edit");
                arrTableFieldsQueryBuild.push("date_creation", "date_edit");
                gSystemConfig.enableContentBindRegisterUser == 1 ? arrTableFieldsQueryBuild.push("id_register_user") : '';
                arrTableFieldsQueryBuild.push("content_type");
                gSystemConfig.enableContentColumns == 1 ? arrTableFieldsQueryBuild.push("content_columns") : '';
                arrTableFieldsQueryBuild.push("align_text", "align_image", "content_text");
                gSystemConfig.enableContentURL == 1 ? arrTableFieldsQueryBuild.push("content_url") : '';
                arrTableFieldsQueryBuild.push("caption", "file", "file_size", "file_duration", "file_dimensions", "file_original_name", "file_config");
                gSystemConfig.enableContentFileThumbnail == 1 ? arrTableFieldsQueryBuild.push("file_thumbnail") : '';
                arrTableFieldsQueryBuild.push("activation");
            }


            //File fields.
            if(buildType == "files")
            {
                arrTableFieldsQueryBuild.push("file");
                gSystemConfig.enableContentFileThumbnail == 1 ? arrTableFieldsQueryBuild.push("file_thumbnail") : '';
            }
        }
        //----------------------


        //Products.
        //----------------------
        if(strTable == gSystemConfig.configSystemDBTableProducts)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_parent"];
                gSystemConfig.enableProductsSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                gSystemConfig.enableProductsType == 1 ? arrTableFieldsQueryBuild.push("id_type") : '';
                arrTableFieldsQueryBuild.push("date_creation", "date_edit");
                gSystemConfig.enableProductsCode == 1 ? arrTableFieldsQueryBuild.push("code") : '';

                gSystemConfig.enableProductsBindRegisterUser == 1 ? arrTableFieldsQueryBuild.push("id_register_user") : '';
                gSystemConfig.enableProductsBindRegister1 == 1 ? arrTableFieldsQueryBuild.push("id_register1") : '';
                gSystemConfig.enableProductsBindRegister2 == 1 ? arrTableFieldsQueryBuild.push("id_register2") : '';
                gSystemConfig.enableProductsBindRegister3 == 1 ? arrTableFieldsQueryBuild.push("id_register3") : '';
                gSystemConfig.enableProductsBindRegister4 == 1 ? arrTableFieldsQueryBuild.push("id_register4") : '';
                gSystemConfig.enableProductsBindRegister5 == 1 ? arrTableFieldsQueryBuild.push("id_register5") : '';
                
                //arrTableFieldsQueryBuild.push("code", "title");
                arrTableFieldsQueryBuild.push("title");
                gSystemConfig.enableProductsDescription == 1 ? arrTableFieldsQueryBuild.push("description") : '';
                arrTableFieldsQueryBuild.push("url_alias", "keywords_tags", "meta_description", "meta_title", "meta_info");
                
                gSystemConfig.enableProductsInfo1 == 1 ? arrTableFieldsQueryBuild.push("info1") : '';
                gSystemConfig.enableProductsInfo2 == 1 ? arrTableFieldsQueryBuild.push("info2") : '';
                gSystemConfig.enableProductsInfo3 == 1 ? arrTableFieldsQueryBuild.push("info3") : '';
                gSystemConfig.enableProductsInfo4 == 1 ? arrTableFieldsQueryBuild.push("info4") : '';
                gSystemConfig.enableProductsInfo5 == 1 ? arrTableFieldsQueryBuild.push("info5") : '';
                gSystemConfig.enableProductsInfo6 == 1 ? arrTableFieldsQueryBuild.push("info6") : '';
                gSystemConfig.enableProductsInfo7 == 1 ? arrTableFieldsQueryBuild.push("info7") : '';
                gSystemConfig.enableProductsInfo8 == 1 ? arrTableFieldsQueryBuild.push("info8") : '';
                gSystemConfig.enableProductsInfo9 == 1 ? arrTableFieldsQueryBuild.push("info9") : '';
                gSystemConfig.enableProductsInfo10 == 1 ? arrTableFieldsQueryBuild.push("info10") : '';
                gSystemConfig.enableProductsInfo11 == 1 ? arrTableFieldsQueryBuild.push("info11") : '';
                gSystemConfig.enableProductsInfo12 == 1 ? arrTableFieldsQueryBuild.push("info12") : '';
                gSystemConfig.enableProductsInfo13 == 1 ? arrTableFieldsQueryBuild.push("info13") : '';
                gSystemConfig.enableProductsInfo14 == 1 ? arrTableFieldsQueryBuild.push("info14") : '';
                gSystemConfig.enableProductsInfo15 == 1 ? arrTableFieldsQueryBuild.push("info15") : '';
                gSystemConfig.enableProductsInfo16 == 1 ? arrTableFieldsQueryBuild.push("info16") : '';
                gSystemConfig.enableProductsInfo17 == 1 ? arrTableFieldsQueryBuild.push("info17") : '';
                gSystemConfig.enableProductsInfo18 == 1 ? arrTableFieldsQueryBuild.push("info18") : '';
                gSystemConfig.enableProductsInfo19 == 1 ? arrTableFieldsQueryBuild.push("info19") : '';
                gSystemConfig.enableProductsInfo20 == 1 ? arrTableFieldsQueryBuild.push("info20") : '';

                gSystemConfig.enableProductsInfoS1 == 1 ? arrTableFieldsQueryBuild.push("info_small1") : '';
                gSystemConfig.enableProductsInfoS2 == 1 ? arrTableFieldsQueryBuild.push("info_small2") : '';
                gSystemConfig.enableProductsInfoS3 == 1 ? arrTableFieldsQueryBuild.push("info_small3") : '';
                gSystemConfig.enableProductsInfoS4 == 1 ? arrTableFieldsQueryBuild.push("info_small4") : '';
                gSystemConfig.enableProductsInfoS5 == 1 ? arrTableFieldsQueryBuild.push("info_small5") : '';
                gSystemConfig.enableProductsInfoS6 == 1 ? arrTableFieldsQueryBuild.push("info_small6") : '';
                gSystemConfig.enableProductsInfoS7 == 1 ? arrTableFieldsQueryBuild.push("info_small7") : '';
                gSystemConfig.enableProductsInfoS8 == 1 ? arrTableFieldsQueryBuild.push("info_small8") : '';
                gSystemConfig.enableProductsInfoS9 == 1 ? arrTableFieldsQueryBuild.push("info_small9") : '';
                gSystemConfig.enableProductsInfoS10 == 1 ? arrTableFieldsQueryBuild.push("info_small10") : '';
                gSystemConfig.enableProductsInfoS11 == 1 ? arrTableFieldsQueryBuild.push("info_small11") : '';
                gSystemConfig.enableProductsInfoS12 == 1 ? arrTableFieldsQueryBuild.push("info_small12") : '';
                gSystemConfig.enableProductsInfoS13 == 1 ? arrTableFieldsQueryBuild.push("info_small13") : '';
                gSystemConfig.enableProductsInfoS14 == 1 ? arrTableFieldsQueryBuild.push("info_small14") : '';
                gSystemConfig.enableProductsInfoS15 == 1 ? arrTableFieldsQueryBuild.push("info_small15") : '';
                gSystemConfig.enableProductsInfoS16 == 1 ? arrTableFieldsQueryBuild.push("info_small16") : '';
                gSystemConfig.enableProductsInfoS17 == 1 ? arrTableFieldsQueryBuild.push("info_small17") : '';
                gSystemConfig.enableProductsInfoS18 == 1 ? arrTableFieldsQueryBuild.push("info_small18") : '';
                gSystemConfig.enableProductsInfoS19 == 1 ? arrTableFieldsQueryBuild.push("info_small19") : '';
                gSystemConfig.enableProductsInfoS20 == 1 ? arrTableFieldsQueryBuild.push("info_small20") : '';
                gSystemConfig.enableProductsInfoS21 == 1 ? arrTableFieldsQueryBuild.push("info_small21") : '';
                gSystemConfig.enableProductsInfoS22 == 1 ? arrTableFieldsQueryBuild.push("info_small22") : '';
                gSystemConfig.enableProductsInfoS23 == 1 ? arrTableFieldsQueryBuild.push("info_small23") : '';
                gSystemConfig.enableProductsInfoS24 == 1 ? arrTableFieldsQueryBuild.push("info_small24") : '';
                gSystemConfig.enableProductsInfoS25 == 1 ? arrTableFieldsQueryBuild.push("info_small25") : '';
                gSystemConfig.enableProductsInfoS26 == 1 ? arrTableFieldsQueryBuild.push("info_small26") : '';
                gSystemConfig.enableProductsInfoS27 == 1 ? arrTableFieldsQueryBuild.push("info_small27") : '';
                gSystemConfig.enableProductsInfoS28 == 1 ? arrTableFieldsQueryBuild.push("info_small28") : '';
                gSystemConfig.enableProductsInfoS29 == 1 ? arrTableFieldsQueryBuild.push("info_small29") : '';
                gSystemConfig.enableProductsInfoS30 == 1 ? arrTableFieldsQueryBuild.push("info_small30") : '';
                
                gSystemConfig.enableProductsValue == 1 ? arrTableFieldsQueryBuild.push("value") : '';
                gSystemConfig.enableProductsValue1 == 1 ? arrTableFieldsQueryBuild.push("value1") : '';
                gSystemConfig.enableProductsValue2 == 1 ? arrTableFieldsQueryBuild.push("value2") : '';
                gSystemConfig.enableProductsWeight == 1 ? arrTableFieldsQueryBuild.push("weight") : '';
                gSystemConfig.enableProductsCoefficient == 1 ? arrTableFieldsQueryBuild.push("coefficient") : '';
                
                gSystemConfig.enableProductsNumber1 == 1 ? arrTableFieldsQueryBuild.push("number1") : '';
                gSystemConfig.enableProductsNumber2 == 1 ? arrTableFieldsQueryBuild.push("number2") : '';
                gSystemConfig.enableProductsNumber3 == 1 ? arrTableFieldsQueryBuild.push("number3") : '';
                gSystemConfig.enableProductsNumber4 == 1 ? arrTableFieldsQueryBuild.push("number4") : '';
                gSystemConfig.enableProductsNumber5 == 1 ? arrTableFieldsQueryBuild.push("number5") : '';
                
                gSystemConfig.enableProductsNumberS1 == 1 ? arrTableFieldsQueryBuild.push("number_small1") : '';
                gSystemConfig.enableProductsNumberS2 == 1 ? arrTableFieldsQueryBuild.push("number_small2") : '';
                gSystemConfig.enableProductsNumberS3 == 1 ? arrTableFieldsQueryBuild.push("number_small3") : '';
                gSystemConfig.enableProductsNumberS4 == 1 ? arrTableFieldsQueryBuild.push("number_small4") : '';
                gSystemConfig.enableProductsNumberS5 == 1 ? arrTableFieldsQueryBuild.push("number_small5") : '';
                
                gSystemConfig.enableProductsURL1 != 0 ? arrTableFieldsQueryBuild.push("url1") : '';
                gSystemConfig.enableProductsURL2 != 0 ? arrTableFieldsQueryBuild.push("url2") : '';
                gSystemConfig.enableProductsURL3 != 0 ? arrTableFieldsQueryBuild.push("url3") : '';
                gSystemConfig.enableProductsURL4 != 0 ? arrTableFieldsQueryBuild.push("url4") : '';
                gSystemConfig.enableProductsURL5 != 0 ? arrTableFieldsQueryBuild.push("url5") : '';
                
                gSystemConfig.enableProductsDate1 == 1 ? arrTableFieldsQueryBuild.push("date1") : '';
                gSystemConfig.enableProductsDate2 == 1 ? arrTableFieldsQueryBuild.push("date2") : '';
                gSystemConfig.enableProductsDate3 == 1 ? arrTableFieldsQueryBuild.push("date3") : '';
                gSystemConfig.enableProductsDate4 == 1 ? arrTableFieldsQueryBuild.push("date4") : '';
                gSystemConfig.enableProductsDate5 == 1 ? arrTableFieldsQueryBuild.push("date5") : '';
                
                gSystemConfig.enableProductsImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                gSystemConfig.enableProductsImageMainCaption == 1 ? arrTableFieldsQueryBuild.push("image_main_caption") : '';
                
                gSystemConfig.enableProductsFile1 == 1 ? arrTableFieldsQueryBuild.push("file1") : '';
                gSystemConfig.enableProductsFile2 == 1 ? arrTableFieldsQueryBuild.push("file2") : '';
                gSystemConfig.enableProductsFile3 == 1 ? arrTableFieldsQueryBuild.push("file3") : '';
                gSystemConfig.enableProductsFile4 == 1 ? arrTableFieldsQueryBuild.push("file4") : '';
                gSystemConfig.enableProductsFile5 == 1 ? arrTableFieldsQueryBuild.push("file5") : '';
                
                arrTableFieldsQueryBuild.push("activation");
                gSystemConfig.enableProductsActivation1 == 1 ? arrTableFieldsQueryBuild.push("activation1") : '';
                gSystemConfig.enableProductsActivation2 == 1 ? arrTableFieldsQueryBuild.push("activation2") : '';
                gSystemConfig.enableProductsActivation3 == 1 ? arrTableFieldsQueryBuild.push("activation3") : '';
                gSystemConfig.enableProductsActivation4 == 1 ? arrTableFieldsQueryBuild.push("activation4") : '';
                gSystemConfig.enableProductsActivation5 == 1 ? arrTableFieldsQueryBuild.push("activation5") : '';
                gSystemConfig.enableProductsStatus == 1 ? arrTableFieldsQueryBuild.push("id_status") : '';
                gSystemConfig.enableProductsRestrictedAccess == 1 ? arrTableFieldsQueryBuild.push("restricted_access") : '';
                gSystemConfig.enableProductsNotes == 1 ? arrTableFieldsQueryBuild.push("notes") : '';
            }


            //File fields.
            if(buildType == "files")
            {
                gSystemConfig.enableProductsImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                gSystemConfig.enableProductsFile1 == 1 ? arrTableFieldsQueryBuild.push("file1") : '';
                gSystemConfig.enableProductsFile2 == 1 ? arrTableFieldsQueryBuild.push("file2") : '';
                gSystemConfig.enableProductsFile3 == 1 ? arrTableFieldsQueryBuild.push("file3") : '';
                gSystemConfig.enableProductsFile4 == 1 ? arrTableFieldsQueryBuild.push("file4") : '';
                gSystemConfig.enableProductsFile5 == 1 ? arrTableFieldsQueryBuild.push("file5") : '';
            }
        }
        //----------------------


        //Publications.
        //----------------------
        if(strTable == gSystemConfig.configSystemDBTablePublications)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_parent"];
                gSystemConfig.enablePublicationsSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                arrTableFieldsQueryBuild.push("id_type", "date_creation", "date_edit");
                gSystemConfig.enablePublicationsBindRegisterUser == 1 ? arrTableFieldsQueryBuild.push("id_register_user") : '';
                gSystemConfig.enablePublicationsBindRegister1 == 1 ? arrTableFieldsQueryBuild.push("id_register1") : '';
                gSystemConfig.enablePublicationsBindRegister2 == 1 ? arrTableFieldsQueryBuild.push("id_register2") : '';
                gSystemConfig.enablePublicationsBindRegister3 == 1 ? arrTableFieldsQueryBuild.push("id_register3") : '';
                gSystemConfig.enablePublicationsBindRegister4 == 1 ? arrTableFieldsQueryBuild.push("id_register4") : '';
                gSystemConfig.enablePublicationsBindRegister5 == 1 ? arrTableFieldsQueryBuild.push("id_register5") : '';

                gSystemConfig.enablePublicationsDateStart == 1 ? arrTableFieldsQueryBuild.push("date_start") : '';
                gSystemConfig.enablePublicationsDateEnd == 1 ? arrTableFieldsQueryBuild.push("date_end") : '';

                arrTableFieldsQueryBuild.push("title");
                gSystemConfig.enablePublicationsDescription == 1 ? arrTableFieldsQueryBuild.push("description") : '';
                arrTableFieldsQueryBuild.push("url_alias", "keywords_tags", "meta_description", "meta_title", "meta_info");
                
                gSystemConfig.enablePublicationsInfo1 == 1 ? arrTableFieldsQueryBuild.push("info1") : '';
                gSystemConfig.enablePublicationsInfo2 == 1 ? arrTableFieldsQueryBuild.push("info2") : '';
                gSystemConfig.enablePublicationsInfo3 == 1 ? arrTableFieldsQueryBuild.push("info3") : '';
                gSystemConfig.enablePublicationsInfo4 == 1 ? arrTableFieldsQueryBuild.push("info4") : '';
                gSystemConfig.enablePublicationsInfo5 == 1 ? arrTableFieldsQueryBuild.push("info5") : '';
                gSystemConfig.enablePublicationsInfo6 == 1 ? arrTableFieldsQueryBuild.push("info6") : '';
                gSystemConfig.enablePublicationsInfo7 == 1 ? arrTableFieldsQueryBuild.push("info7") : '';
                gSystemConfig.enablePublicationsInfo8 == 1 ? arrTableFieldsQueryBuild.push("info8") : '';
                gSystemConfig.enablePublicationsInfo9 == 1 ? arrTableFieldsQueryBuild.push("info9") : '';
                gSystemConfig.enablePublicationsInfo10 == 1 ? arrTableFieldsQueryBuild.push("info10") : '';

                gSystemConfig.enablePublicationsSource == 1 ? arrTableFieldsQueryBuild.push("source") : '';
                gSystemConfig.enablePublicationsSourceURL == 1 ? arrTableFieldsQueryBuild.push("source_url") : '';
                
                gSystemConfig.enablePublicationsNumber1 == 1 ? arrTableFieldsQueryBuild.push("number1") : '';
                gSystemConfig.enablePublicationsNumber2 == 1 ? arrTableFieldsQueryBuild.push("number2") : '';
                gSystemConfig.enablePublicationsNumber3 == 1 ? arrTableFieldsQueryBuild.push("number3") : '';
                gSystemConfig.enablePublicationsNumber4 == 1 ? arrTableFieldsQueryBuild.push("number4") : '';
                gSystemConfig.enablePublicationsNumber5 == 1 ? arrTableFieldsQueryBuild.push("number5") : '';
                
                gSystemConfig.enablePublicationsURL1 != 0 ? arrTableFieldsQueryBuild.push("url1") : '';
                gSystemConfig.enablePublicationsURL2 != 0 ? arrTableFieldsQueryBuild.push("url2") : '';
                gSystemConfig.enablePublicationsURL3 != 0 ? arrTableFieldsQueryBuild.push("url3") : '';
                gSystemConfig.enablePublicationsURL4 != 0 ? arrTableFieldsQueryBuild.push("url4") : '';
                gSystemConfig.enablePublicationsURL5 != 0 ? arrTableFieldsQueryBuild.push("url5") : '';
                
                gSystemConfig.enablePublicationsDate1 == 1 ? arrTableFieldsQueryBuild.push("date1") : '';
                gSystemConfig.enablePublicationsDate2 == 1 ? arrTableFieldsQueryBuild.push("date2") : '';
                gSystemConfig.enablePublicationsDate3 == 1 ? arrTableFieldsQueryBuild.push("date3") : '';
                gSystemConfig.enablePublicationsDate4 == 1 ? arrTableFieldsQueryBuild.push("date4") : '';
                gSystemConfig.enablePublicationsDate5 == 1 ? arrTableFieldsQueryBuild.push("date5") : '';
                
                gSystemConfig.enablePublicationsImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                gSystemConfig.enablePublicationsImageMainCaption == 1 ? arrTableFieldsQueryBuild.push("image_main_caption") : '';
                
                gSystemConfig.enablePublicationsFile1 == 1 ? arrTableFieldsQueryBuild.push("file1") : '';
                gSystemConfig.enablePublicationsFile2 == 1 ? arrTableFieldsQueryBuild.push("file2") : '';
                gSystemConfig.enablePublicationsFile3 == 1 ? arrTableFieldsQueryBuild.push("file3") : '';
                gSystemConfig.enablePublicationsFile4 == 1 ? arrTableFieldsQueryBuild.push("file4") : '';
                gSystemConfig.enablePublicationsFile5 == 1 ? arrTableFieldsQueryBuild.push("file5") : '';
                
                arrTableFieldsQueryBuild.push("activation");
                gSystemConfig.enablePublicationsActivation1 == 1 ? arrTableFieldsQueryBuild.push("activation1") : '';
                gSystemConfig.enablePublicationsActivation2 == 1 ? arrTableFieldsQueryBuild.push("activation2") : '';
                gSystemConfig.enablePublicationsActivation3 == 1 ? arrTableFieldsQueryBuild.push("activation3") : '';
                gSystemConfig.enablePublicationsActivation4 == 1 ? arrTableFieldsQueryBuild.push("activation4") : '';
                gSystemConfig.enablePublicationsActivation5 == 1 ? arrTableFieldsQueryBuild.push("activation5") : '';
                gSystemConfig.enablePublicationsStatus == 1 ? arrTableFieldsQueryBuild.push("id_status") : '';
                gSystemConfig.enablePublicationsRestrictedAccess == 1 ? arrTableFieldsQueryBuild.push("restricted_access") : '';
                gSystemConfig.enablePublicationsNotes == 1 ? arrTableFieldsQueryBuild.push("notes") : '';
            }


            //File fields.
            if(buildType == "files")
            {
                gSystemConfig.enablePublicationsImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                gSystemConfig.enablePublicationsFile1 == 1 ? arrTableFieldsQueryBuild.push("file1") : '';
                gSystemConfig.enablePublicationsFile2 == 1 ? arrTableFieldsQueryBuild.push("file2") : '';
                gSystemConfig.enablePublicationsFile3 == 1 ? arrTableFieldsQueryBuild.push("file3") : '';
                gSystemConfig.enablePublicationsFile4 == 1 ? arrTableFieldsQueryBuild.push("file4") : '';
                gSystemConfig.enablePublicationsFile5 == 1 ? arrTableFieldsQueryBuild.push("file5") : '';
            }
        }
        //----------------------


        //Registers.
        //----------------------
        if(strTable == gSystemConfig.configSystemDBTableRegisters)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_parent"];
                gSystemConfig.enableRegistersSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                //gSystemConfig.enableRegistersType == 1 ? arrTableFieldsQueryBuild.push("id_type") : '';
                arrTableFieldsQueryBuild.push("date_creation", "date_timezone", "date_edit", "id_type");
                gSystemConfig.enableRegistersActivity == 1 ? arrTableFieldsQueryBuild.push("id_activity") : '';

                gSystemConfig.enableRegistersBindRegisterUser == 1 ? arrTableFieldsQueryBuild.push("id_register_user") : '';
                gSystemConfig.enableRegistersBindRegister1 == 1 ? arrTableFieldsQueryBuild.push("id_register1") : '';
                gSystemConfig.enableRegistersBindRegister2 == 1 ? arrTableFieldsQueryBuild.push("id_register2") : '';
                gSystemConfig.enableRegistersBindRegister3 == 1 ? arrTableFieldsQueryBuild.push("id_register3") : '';
                gSystemConfig.enableRegistersBindRegister4 == 1 ? arrTableFieldsQueryBuild.push("id_register4") : '';
                gSystemConfig.enableRegistersBindRegister5 == 1 ? arrTableFieldsQueryBuild.push("id_register5") : '';

                gSystemConfig.enableRegistersRegisterType == 1 ? arrTableFieldsQueryBuild.push("register_type") : '';
                
                gSystemConfig.enableRegistersNameTitle == 1 ? arrTableFieldsQueryBuild.push("name_title") : '';
                gSystemConfig.enableRegistersNameFull == 1 ? arrTableFieldsQueryBuild.push("name_full") : '';
                gSystemConfig.enableRegistersNameFirst == 1 ? arrTableFieldsQueryBuild.push("name_first") : '';
                gSystemConfig.enableRegistersNameLast == 1 ? arrTableFieldsQueryBuild.push("name_last") : '';
                gSystemConfig.enableRegistersCompanyNameLegal == 1 ? arrTableFieldsQueryBuild.push("company_name_legal") : '';
                gSystemConfig.enableRegistersCompanyNameAlias == 1 ? arrTableFieldsQueryBuild.push("company_name_alias") : '';
                gSystemConfig.enableRegistersDescription == 1 ? arrTableFieldsQueryBuild.push("description") : '';
                
                arrTableFieldsQueryBuild.push("url_alias", "keywords_tags", "meta_description", "meta_title", "meta_info"); //27
                
                gSystemConfig.enableRegistersDateBirth != 0 ? arrTableFieldsQueryBuild.push("date_birth") : '';
                gSystemConfig.enableRegistersGender == 1 ? arrTableFieldsQueryBuild.push("gender") : '';
                gSystemConfig.enableRegistersHeight == 1 ? arrTableFieldsQueryBuild.push("height") : '';
                gSystemConfig.enableRegistersWeight == 1 ? arrTableFieldsQueryBuild.push("weight") : '';

                gSystemConfig.enableRegistersDocumentType == 1 ? arrTableFieldsQueryBuild.push("document_type") : '';
                gSystemConfig.enableRegistersDocument == 1 ? arrTableFieldsQueryBuild.push("document") : '';
                gSystemConfig.enableRegistersDocument1Type == 1 ? arrTableFieldsQueryBuild.push("document1_type") : '';
                gSystemConfig.enableRegistersDocument1 == 1 ? arrTableFieldsQueryBuild.push("document1") : '';
                gSystemConfig.enableRegistersDocument2Type == 1 ? arrTableFieldsQueryBuild.push("document2_type") : '';
                gSystemConfig.enableRegistersDocument2 == 1 ? arrTableFieldsQueryBuild.push("document2") : '';

                gSystemConfig.enableRegistersDocumentCompanyType == 1 ? arrTableFieldsQueryBuild.push("document_company_type") : '';
                gSystemConfig.enableRegistersDocumentCompany == 1 ? arrTableFieldsQueryBuild.push("document_company") : '';
                gSystemConfig.enableRegistersDocumentCompany1Type == 1 ? arrTableFieldsQueryBuild.push("document_company1_type") : '';
                gSystemConfig.enableRegistersDocumentCompany1 == 1 ? arrTableFieldsQueryBuild.push("document_company1") : '';
                gSystemConfig.enableRegistersDocumentCompany2Type == 1 ? arrTableFieldsQueryBuild.push("document_company2_type") : '';
                gSystemConfig.enableRegistersDocumentCompany2 == 1 ? arrTableFieldsQueryBuild.push("document_company2") : '';

                gSystemConfig.enableRegistersZIPCode == 1 ? arrTableFieldsQueryBuild.push("zip_code") : '';
                gSystemConfig.enableRegistersAddressStreet == 1 ? arrTableFieldsQueryBuild.push("address_street") : '';
                gSystemConfig.enableRegistersAddressNumber == 1 ? arrTableFieldsQueryBuild.push("address_number") : '';
                gSystemConfig.enableRegistersAddressComplement == 1 ? arrTableFieldsQueryBuild.push("address_complement") : '';
                gSystemConfig.enableRegistersNeighborhood == 1 ? arrTableFieldsQueryBuild.push("neighborhood") : '';
                gSystemConfig.enableRegistersDistrict == 1 ? arrTableFieldsQueryBuild.push("district") : '';
                gSystemConfig.enableRegistersCounty == 1 ? arrTableFieldsQueryBuild.push("county") : '';
                gSystemConfig.enableRegistersCity == 1 ? arrTableFieldsQueryBuild.push("city") : '';
                gSystemConfig.enableRegistersState == 1 ? arrTableFieldsQueryBuild.push("state") : '';
                gSystemConfig.enableRegistersCountry == 1 ? arrTableFieldsQueryBuild.push("country") : '';
                arrTableFieldsQueryBuild.push("id_street", "id_neighborhood", "id_district", "id_county", "id_city", "id_state", "id_country");
                
                gSystemConfig.enableRegistersLocationReference == 1 ? arrTableFieldsQueryBuild.push("location_reference") : '';
                gSystemConfig.enableRegistersLocationMap != 0 ? arrTableFieldsQueryBuild.push("location_map") : ''; //62

                gSystemConfig.enableRegistersPhone1 == 1 ? arrTableFieldsQueryBuild.push("phone1_international_code", "phone1_area_code", "phone1") : '';
                gSystemConfig.enableRegistersPhone2 == 1 ? arrTableFieldsQueryBuild.push("phone2_international_code", "phone2_area_code", "phone2") : '';
                gSystemConfig.enableRegistersPhone3 == 1 ? arrTableFieldsQueryBuild.push("phone3_international_code", "phone3_area_code", "phone3") : '';
                gSystemConfig.enableRegistersWebsite == 1 ? arrTableFieldsQueryBuild.push("website") : '';
                
                gSystemConfig.enableRegistersUsername == 1 ? arrTableFieldsQueryBuild.push("username") : '';
                gSystemConfig.enableRegistersEmail == 1 ? arrTableFieldsQueryBuild.push("email") : '';
                //arrTableFieldsQueryBuild.push("password", "password_hint", "password_length");
                gSystemConfig.configRegistersPassword == 1 ? arrTableFieldsQueryBuild.push("password", "password_hint", "password_length") : ''; //78

                gSystemConfig.enableRegistersInfo1 == 1 ? arrTableFieldsQueryBuild.push("info1") : '';
                gSystemConfig.enableRegistersInfo2 == 1 ? arrTableFieldsQueryBuild.push("info2") : '';
                gSystemConfig.enableRegistersInfo3 == 1 ? arrTableFieldsQueryBuild.push("info3") : '';
                gSystemConfig.enableRegistersInfo4 == 1 ? arrTableFieldsQueryBuild.push("info4") : '';
                gSystemConfig.enableRegistersInfo5 == 1 ? arrTableFieldsQueryBuild.push("info5") : '';
                gSystemConfig.enableRegistersInfo6 == 1 ? arrTableFieldsQueryBuild.push("info6") : '';
                gSystemConfig.enableRegistersInfo7 == 1 ? arrTableFieldsQueryBuild.push("info7") : '';
                gSystemConfig.enableRegistersInfo8 == 1 ? arrTableFieldsQueryBuild.push("info8") : '';
                gSystemConfig.enableRegistersInfo9 == 1 ? arrTableFieldsQueryBuild.push("info9") : '';
                gSystemConfig.enableRegistersInfo10 == 1 ? arrTableFieldsQueryBuild.push("info10") : '';
                gSystemConfig.enableRegistersInfo11 == 1 ? arrTableFieldsQueryBuild.push("info11") : '';
                gSystemConfig.enableRegistersInfo12 == 1 ? arrTableFieldsQueryBuild.push("info12") : '';
                gSystemConfig.enableRegistersInfo13 == 1 ? arrTableFieldsQueryBuild.push("info13") : '';
                gSystemConfig.enableRegistersInfo14 == 1 ? arrTableFieldsQueryBuild.push("info14") : '';
                gSystemConfig.enableRegistersInfo15 == 1 ? arrTableFieldsQueryBuild.push("info15") : '';
                gSystemConfig.enableRegistersInfo16 == 1 ? arrTableFieldsQueryBuild.push("info16") : '';
                gSystemConfig.enableRegistersInfo17 == 1 ? arrTableFieldsQueryBuild.push("info17") : '';
                gSystemConfig.enableRegistersInfo18 == 1 ? arrTableFieldsQueryBuild.push("info18") : '';
                gSystemConfig.enableRegistersInfo19 == 1 ? arrTableFieldsQueryBuild.push("info19") : '';
                gSystemConfig.enableRegistersInfo20 == 1 ? arrTableFieldsQueryBuild.push("info20") : '';

                gSystemConfig.enableRegistersInfoS1 == 1 ? arrTableFieldsQueryBuild.push("info_small1") : '';
                gSystemConfig.enableRegistersInfoS2 == 1 ? arrTableFieldsQueryBuild.push("info_small2") : '';
                gSystemConfig.enableRegistersInfoS3 == 1 ? arrTableFieldsQueryBuild.push("info_small3") : '';
                gSystemConfig.enableRegistersInfoS4 == 1 ? arrTableFieldsQueryBuild.push("info_small4") : '';
                gSystemConfig.enableRegistersInfoS5 == 1 ? arrTableFieldsQueryBuild.push("info_small5") : '';
                gSystemConfig.enableRegistersInfoS6 == 1 ? arrTableFieldsQueryBuild.push("info_small6") : '';
                gSystemConfig.enableRegistersInfoS7 == 1 ? arrTableFieldsQueryBuild.push("info_small7") : '';
                gSystemConfig.enableRegistersInfoS8 == 1 ? arrTableFieldsQueryBuild.push("info_small8") : '';
                gSystemConfig.enableRegistersInfoS9 == 1 ? arrTableFieldsQueryBuild.push("info_small9") : '';
                gSystemConfig.enableRegistersInfoS10 == 1 ? arrTableFieldsQueryBuild.push("info_small10") : '';
                gSystemConfig.enableRegistersInfoS11 == 1 ? arrTableFieldsQueryBuild.push("info_small11") : '';
                gSystemConfig.enableRegistersInfoS12 == 1 ? arrTableFieldsQueryBuild.push("info_small12") : '';
                gSystemConfig.enableRegistersInfoS13 == 1 ? arrTableFieldsQueryBuild.push("info_small13") : '';
                gSystemConfig.enableRegistersInfoS14 == 1 ? arrTableFieldsQueryBuild.push("info_small14") : '';
                gSystemConfig.enableRegistersInfoS15 == 1 ? arrTableFieldsQueryBuild.push("info_small15") : '';
                gSystemConfig.enableRegistersInfoS16 == 1 ? arrTableFieldsQueryBuild.push("info_small16") : '';
                gSystemConfig.enableRegistersInfoS17 == 1 ? arrTableFieldsQueryBuild.push("info_small17") : '';
                gSystemConfig.enableRegistersInfoS18 == 1 ? arrTableFieldsQueryBuild.push("info_small18") : '';
                gSystemConfig.enableRegistersInfoS19 == 1 ? arrTableFieldsQueryBuild.push("info_small19") : '';
                gSystemConfig.enableRegistersInfoS20 == 1 ? arrTableFieldsQueryBuild.push("info_small20") : '';
                gSystemConfig.enableRegistersInfoS21 == 1 ? arrTableFieldsQueryBuild.push("info_small21") : '';
                gSystemConfig.enableRegistersInfoS22 == 1 ? arrTableFieldsQueryBuild.push("info_small22") : '';
                gSystemConfig.enableRegistersInfoS23 == 1 ? arrTableFieldsQueryBuild.push("info_small23") : '';
                gSystemConfig.enableRegistersInfoS24 == 1 ? arrTableFieldsQueryBuild.push("info_small24") : '';
                gSystemConfig.enableRegistersInfoS25 == 1 ? arrTableFieldsQueryBuild.push("info_small25") : '';
                gSystemConfig.enableRegistersInfoS26 == 1 ? arrTableFieldsQueryBuild.push("info_small26") : '';
                gSystemConfig.enableRegistersInfoS27 == 1 ? arrTableFieldsQueryBuild.push("info_small27") : '';
                gSystemConfig.enableRegistersInfoS28 == 1 ? arrTableFieldsQueryBuild.push("info_small28") : '';
                gSystemConfig.enableRegistersInfoS29 == 1 ? arrTableFieldsQueryBuild.push("info_small29") : '';
                gSystemConfig.enableRegistersInfoS30 == 1 ? arrTableFieldsQueryBuild.push("info_small30") : ''; //127
                
                gSystemConfig.enableRegistersNumber1 == 1 ? arrTableFieldsQueryBuild.push("number1") : '';
                gSystemConfig.enableRegistersNumber2 == 1 ? arrTableFieldsQueryBuild.push("number2") : '';
                gSystemConfig.enableRegistersNumber3 == 1 ? arrTableFieldsQueryBuild.push("number3") : '';
                gSystemConfig.enableRegistersNumber4 == 1 ? arrTableFieldsQueryBuild.push("number4") : '';
                gSystemConfig.enableRegistersNumber5 == 1 ? arrTableFieldsQueryBuild.push("number5") : '';
                
                gSystemConfig.enableRegistersNumberS1 == 1 ? arrTableFieldsQueryBuild.push("number_small1") : '';
                gSystemConfig.enableRegistersNumberS2 == 1 ? arrTableFieldsQueryBuild.push("number_small2") : '';
                gSystemConfig.enableRegistersNumberS3 == 1 ? arrTableFieldsQueryBuild.push("number_small3") : '';
                gSystemConfig.enableRegistersNumberS4 == 1 ? arrTableFieldsQueryBuild.push("number_small4") : '';
                gSystemConfig.enableRegistersNumberS5 == 1 ? arrTableFieldsQueryBuild.push("number_small5") : '';
                
                gSystemConfig.enableRegistersURL1 != 0 ? arrTableFieldsQueryBuild.push("url1") : '';
                gSystemConfig.enableRegistersURL2 != 0 ? arrTableFieldsQueryBuild.push("url2") : '';
                gSystemConfig.enableRegistersURL3 != 0 ? arrTableFieldsQueryBuild.push("url3") : '';
                gSystemConfig.enableRegistersURL4 != 0 ? arrTableFieldsQueryBuild.push("url4") : '';
                gSystemConfig.enableRegistersURL5 != 0 ? arrTableFieldsQueryBuild.push("url5") : '';
                
                gSystemConfig.enableRegistersDate1 == 1 ? arrTableFieldsQueryBuild.push("date1") : '';
                gSystemConfig.enableRegistersDate2 == 1 ? arrTableFieldsQueryBuild.push("date2") : '';
                gSystemConfig.enableRegistersDate3 == 1 ? arrTableFieldsQueryBuild.push("date3") : '';
                gSystemConfig.enableRegistersDate4 == 1 ? arrTableFieldsQueryBuild.push("date4") : '';
                gSystemConfig.enableRegistersDate5 == 1 ? arrTableFieldsQueryBuild.push("date5") : '';
                gSystemConfig.enableRegistersDate6 == 1 ? arrTableFieldsQueryBuild.push("date6") : '';
                gSystemConfig.enableRegistersDate7 == 1 ? arrTableFieldsQueryBuild.push("date7") : '';
                gSystemConfig.enableRegistersDate8 == 1 ? arrTableFieldsQueryBuild.push("date8") : '';
                gSystemConfig.enableRegistersDate9 == 1 ? arrTableFieldsQueryBuild.push("date9") : '';
                gSystemConfig.enableRegistersDate10 == 1 ? arrTableFieldsQueryBuild.push("date10") : ''; //152
                
                gSystemConfig.enableRegistersImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                gSystemConfig.enableRegistersImageMainCaption == 1 ? arrTableFieldsQueryBuild.push("image_main_caption") : '';
                gSystemConfig.enableRegistersImageLogo == 1 ? arrTableFieldsQueryBuild.push("image_logo") : '';
                gSystemConfig.enableRegistersImageBanner == 1 ? arrTableFieldsQueryBuild.push("image_banner") : '';

                gSystemConfig.enableRegistersFile1 == 1 ? arrTableFieldsQueryBuild.push("file1") : '';
                gSystemConfig.enableRegistersFile2 == 1 ? arrTableFieldsQueryBuild.push("file2") : '';
                gSystemConfig.enableRegistersFile3 == 1 ? arrTableFieldsQueryBuild.push("file3") : '';
                gSystemConfig.enableRegistersFile4 == 1 ? arrTableFieldsQueryBuild.push("file4") : '';
                gSystemConfig.enableRegistersFile5 == 1 ? arrTableFieldsQueryBuild.push("file5") : '';
                
                arrTableFieldsQueryBuild.push("activation");
                gSystemConfig.enableRegistersActivation1 == 1 ? arrTableFieldsQueryBuild.push("activation1") : '';
                gSystemConfig.enableRegistersActivation2 == 1 ? arrTableFieldsQueryBuild.push("activation2") : '';
                gSystemConfig.enableRegistersActivation3 == 1 ? arrTableFieldsQueryBuild.push("activation3") : '';
                gSystemConfig.enableRegistersActivation4 == 1 ? arrTableFieldsQueryBuild.push("activation4") : '';
                gSystemConfig.enableRegistersActivation5 == 1 ? arrTableFieldsQueryBuild.push("activation5") : '';
                gSystemConfig.enableRegistersStatus == 1 ? arrTableFieldsQueryBuild.push("id_status") : '';
                gSystemConfig.enableRegistersRestrictedAccess == 1 ? arrTableFieldsQueryBuild.push("restricted_access") : '';
                gSystemConfig.enableRegistersNotes == 1 ? arrTableFieldsQueryBuild.push("notes") : '';
            }


            //File fields.
            if(buildType == "files")
            {
                gSystemConfig.enableRegistersImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                gSystemConfig.enableRegistersImageMainCaption == 1 ? arrTableFieldsQueryBuild.push("image_main_caption") : '';
                gSystemConfig.enableRegistersImageLogo == 1 ? arrTableFieldsQueryBuild.push("image_logo") : '';
                gSystemConfig.enableRegistersImageBanner == 1 ? arrTableFieldsQueryBuild.push("image_banner") : '';
                gSystemConfig.enableRegistersFile1 == 1 ? arrTableFieldsQueryBuild.push("file1") : '';
                gSystemConfig.enableRegistersFile2 == 1 ? arrTableFieldsQueryBuild.push("file2") : '';
                gSystemConfig.enableRegistersFile3 == 1 ? arrTableFieldsQueryBuild.push("file3") : '';
                gSystemConfig.enableRegistersFile4 == 1 ? arrTableFieldsQueryBuild.push("file4") : '';
                gSystemConfig.enableRegistersFile5 == 1 ? arrTableFieldsQueryBuild.push("file5") : '';
            }
        }
        //----------------------


        //Quizzes.
        //----------------------
        if(strTable == gSystemConfig.configSystemDBTableQuizzes)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_parent"];
                gSystemConfig.enableQuizzesSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                arrTableFieldsQueryBuild.push("date_creation", "date_edit", "id_type");
                gSystemConfig.enableQuizzesBindRegisterUser == 1 ? arrTableFieldsQueryBuild.push("id_register_user") : '';

                arrTableFieldsQueryBuild.push("title");
                gSystemConfig.enableQuizzesDescription == 1 ? arrTableFieldsQueryBuild.push("description") : '';
                arrTableFieldsQueryBuild.push("url_alias", "keywords_tags", "meta_description", "meta_title", "meta_info");
                
                gSystemConfig.enableQuizzesInfo1 == 1 ? arrTableFieldsQueryBuild.push("info1") : '';
                gSystemConfig.enableQuizzesInfo2 == 1 ? arrTableFieldsQueryBuild.push("info2") : '';
                gSystemConfig.enableQuizzesInfo3 == 1 ? arrTableFieldsQueryBuild.push("info3") : '';
                gSystemConfig.enableQuizzesInfo4 == 1 ? arrTableFieldsQueryBuild.push("info4") : '';
                gSystemConfig.enableQuizzesInfo5 == 1 ? arrTableFieldsQueryBuild.push("info5") : '';

                gSystemConfig.enableQuizzesNumber1 == 1 ? arrTableFieldsQueryBuild.push("number1") : '';
                gSystemConfig.enableQuizzesNumber2 == 1 ? arrTableFieldsQueryBuild.push("number2") : '';
                gSystemConfig.enableQuizzesNumber3 == 1 ? arrTableFieldsQueryBuild.push("number3") : '';
                gSystemConfig.enableQuizzesNumber4 == 1 ? arrTableFieldsQueryBuild.push("number4") : '';
                gSystemConfig.enableQuizzesNumber5 == 1 ? arrTableFieldsQueryBuild.push("number5") : '';
                
                gSystemConfig.enableQuizzesImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                gSystemConfig.enableQuizzesImageMainCaption == 1 ? arrTableFieldsQueryBuild.push("image_main_caption") : '';
                
                gSystemConfig.enableQuizzesFile1 == 1 ? arrTableFieldsQueryBuild.push("file1") : '';
                gSystemConfig.enableQuizzesFile2 == 1 ? arrTableFieldsQueryBuild.push("file2") : '';
                gSystemConfig.enableQuizzesFile3 == 1 ? arrTableFieldsQueryBuild.push("file3") : '';
                gSystemConfig.enableQuizzesFile4 == 1 ? arrTableFieldsQueryBuild.push("file4") : '';
                gSystemConfig.enableQuizzesFile5 == 1 ? arrTableFieldsQueryBuild.push("file5") : '';
                
                arrTableFieldsQueryBuild.push("activation");
                gSystemConfig.enableQuizzesActivation1 == 1 ? arrTableFieldsQueryBuild.push("activation1") : '';
                gSystemConfig.enableQuizzesActivation2 == 1 ? arrTableFieldsQueryBuild.push("activation2") : '';
                gSystemConfig.enableQuizzesActivation3 == 1 ? arrTableFieldsQueryBuild.push("activation3") : '';
                gSystemConfig.enableQuizzesActivation4 == 1 ? arrTableFieldsQueryBuild.push("activation4") : '';
                gSystemConfig.enableQuizzesActivation5 == 1 ? arrTableFieldsQueryBuild.push("activation5") : '';
                gSystemConfig.enableQuizzesStatus == 1 ? arrTableFieldsQueryBuild.push("id_status") : '';
                arrTableFieldsQueryBuild.push("id_quizzes_options_answer");
                gSystemConfig.enableQuizzesNotes == 1 ? arrTableFieldsQueryBuild.push("notes") : '';
            }


            //File fields.
            if(buildType == "files")
            {
                gSystemConfig.enableQuizzesImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                //gSystemConfig.enableQuizzesFile1 == 1 ? arrTableFieldsQueryBuild.push("file1") : '';
                //gSystemConfig.enableQuizzesFile2 == 1 ? arrTableFieldsQueryBuild.push("file2") : '';
                //gSystemConfig.enableQuizzesFile3 == 1 ? arrTableFieldsQueryBuild.push("file3") : '';
                //gSystemConfig.enableQuizzesFile4 == 1 ? arrTableFieldsQueryBuild.push("file4") : '';
                //gSystemConfig.enableQuizzesFile5 == 1 ? arrTableFieldsQueryBuild.push("file5") : '';
            }
        }
        //----------------------


        //Quizzes Options.
        //----------------------
        if(strTable == gSystemConfig.configSystemDBTableQuizzesOptions)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_quizzes"];
                gSystemConfig.enableQuizzesOptionsSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                arrTableFieldsQueryBuild.push("date_creation", "date_edit", "title");
                //gSystemConfig.enableQuizzesOptionsDescription == 1 ? arrTableFieldsQueryBuild.push("description") : '';
                
                gSystemConfig.enableQuizzesOptionsInfo1 == 1 ? arrTableFieldsQueryBuild.push("info1") : '';
                gSystemConfig.enableQuizzesOptionsInfo2 == 1 ? arrTableFieldsQueryBuild.push("info2") : '';
                gSystemConfig.enableQuizzesOptionsInfo3 == 1 ? arrTableFieldsQueryBuild.push("info3") : '';
                gSystemConfig.enableQuizzesOptionsInfo4 == 1 ? arrTableFieldsQueryBuild.push("info4") : '';
                gSystemConfig.enableQuizzesOptionsInfo5 == 1 ? arrTableFieldsQueryBuild.push("info5") : '';

                gSystemConfig.enableQuizzesOptionsNumber1 == 1 ? arrTableFieldsQueryBuild.push("number1") : '';
                gSystemConfig.enableQuizzesOptionsNumber2 == 1 ? arrTableFieldsQueryBuild.push("number2") : '';
                gSystemConfig.enableQuizzesOptionsNumber3 == 1 ? arrTableFieldsQueryBuild.push("number3") : '';
                gSystemConfig.enableQuizzesOptionsNumber4 == 1 ? arrTableFieldsQueryBuild.push("number4") : '';
                gSystemConfig.enableQuizzesOptionsNumber5 == 1 ? arrTableFieldsQueryBuild.push("number5") : '';
                
                gSystemConfig.enableQuizzesOptionsImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                gSystemConfig.enableQuizzesOptionsImageMainCaption == 1 ? arrTableFieldsQueryBuild.push("image_main_caption") : '';
                
                arrTableFieldsQueryBuild.push("activation");
            }


            //File fields.
            if(buildType == "files")
            {
                gSystemConfig.enableQuizzesOptionsImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
            }
        }
        //----------------------
        

        //Forms.
        //----------------------
        if(strTable == gSystemConfig.configSystemDBTableForms)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_parent"];
                gSystemConfig.enableFormsSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                //arrTableFieldsQueryBuild.push("date_creation", "date_timezone", "date_edit");
                arrTableFieldsQueryBuild.push("date_creation", "date_edit");
                gSystemConfig.enableFormBindRegisterUser == 1 ? arrTableFieldsQueryBuild.push("id_register_user") : '';
                arrTableFieldsQueryBuild.push("form_title", "form_subject", "recipient_name", "recipient_email");
                gSystemConfig.enableFormsRecipientEmailCopy == 1 ? arrTableFieldsQueryBuild.push("recipient_email_copy") : '';
                gSystemConfig.enableFormsSender == 1 ? arrTableFieldsQueryBuild.push("sender_name", "sender_email") : '';
                gSystemConfig.enableFormsSenderConfig == 1 ? arrTableFieldsQueryBuild.push("sender_config") : '';
                gSystemConfig.enableFormsEmailFormat == 1 ? arrTableFieldsQueryBuild.push("email_format") : '';
                gSystemConfig.enableFormsMessageSuccess == 1 ? arrTableFieldsQueryBuild.push("message_success") : '';
                arrTableFieldsQueryBuild.push("activation");
                gSystemConfig.enableFormsNotes == 1 ? arrTableFieldsQueryBuild.push("notes") : '';
            }
        }
        //----------------------


        //Forms Fields.
        //----------------------
        if(strTable == gSystemConfig.configSystemDBTableFormsFields)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_forms"];
                gSystemConfig.enableFormsFieldsSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                //arrTableFieldsQueryBuild.push("date_creation", "date_timezone", "date_edit", "field_type", "field_name", "field_name_formatted");
                arrTableFieldsQueryBuild.push("date_creation", "date_edit", "field_type", "field_name", "field_name_formatted");
                gSystemConfig.enableFormsFieldsInstructions == 1 ? arrTableFieldsQueryBuild.push("field_instructions") : '';
                arrTableFieldsQueryBuild.push("field_size", "field_height");
                gSystemConfig.enableFormsFieldsFieldFilter == 1 ? arrTableFieldsQueryBuild.push("field_filter") : '';
                gSystemConfig.enableFormsFieldsInfoS1 == 1 ? arrTableFieldsQueryBuild.push("info_small1") : '';
                gSystemConfig.enableFormsFieldsInfoS2 == 1 ? arrTableFieldsQueryBuild.push("info_small2") : '';
                gSystemConfig.enableFormsFieldsInfoS3 == 1 ? arrTableFieldsQueryBuild.push("info_small3") : '';
                gSystemConfig.enableFormsFieldsInfoS4 == 1 ? arrTableFieldsQueryBuild.push("info_small4") : '';
                gSystemConfig.enableFormsFieldsInfoS5 == 1 ? arrTableFieldsQueryBuild.push("info_small5") : '';
                arrTableFieldsQueryBuild.push("activation");
                gSystemConfig.enableFormsFieldsRequired == 1 ? arrTableFieldsQueryBuild.push("required") : '';
            }
        }
        //----------------------


        //Forms Fields Options.
        //----------------------
        if(strTable == gSystemConfig.configSystemDBTableFormsFieldsOptions)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_forms_fields"];
                gSystemConfig.enableFormsFieldsOptionsSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                //arrTableFieldsQueryBuild.push("date_creation", "date_timezone", "date_edit", "option_name", "option_name_formatted");
                arrTableFieldsQueryBuild.push("date_creation", "date_edit", "option_name", "option_name_formatted");
                gSystemConfig.enableFormsFieldsOptionsConfigSelection == 1 ? arrTableFieldsQueryBuild.push("config_selection ") : '';
                gSystemConfig.enableFormsFieldsOptionsInfoS1 == 1 ? arrTableFieldsQueryBuild.push("info_small1") : '';
                gSystemConfig.enableFormsFieldsOptionsInfoS2 == 1 ? arrTableFieldsQueryBuild.push("info_small2") : '';
                gSystemConfig.enableFormsFieldsOptionsInfoS3 == 1 ? arrTableFieldsQueryBuild.push("info_small3") : '';
                gSystemConfig.enableFormsFieldsOptionsInfoS4 == 1 ? arrTableFieldsQueryBuild.push("info_small4") : '';
                gSystemConfig.enableFormsFieldsOptionsInfoS5 == 1 ? arrTableFieldsQueryBuild.push("info_small5") : '';
                gSystemConfig.enableFormsFieldsOptionsImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                arrTableFieldsQueryBuild.push("activation");
            }
        }
        //----------------------


        //Filters generic.
        //----------------------
        //if(strTable == "filters_generic")
        if(strTable == gSystemConfig.configSystemDBTableFiltersGeneric)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id"];
                gSystemConfig.enableFiltersGenericSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                arrTableFieldsQueryBuild.push("date_creation", "date_edit", "filter_index", "table_name", "title");
                gSystemConfig.enableFiltersGenericDescription == 1 ? arrTableFieldsQueryBuild.push("description") : '';
                gSystemConfig.configFiltersGenericURLAlias == 1 ? arrTableFieldsQueryBuild.push("url_alias") : '';
                gSystemConfig.enableFiltersGenericKeywordsTags == 1 ? arrTableFieldsQueryBuild.push("keywords_tags") : '';
                gSystemConfig.enableFiltersGenericMetaDescription == 1 ? arrTableFieldsQueryBuild.push("meta_description") : '';
                gSystemConfig.enableFiltersGenericMetaTitle == 1 ? arrTableFieldsQueryBuild.push("meta_title") : '';
                arrTableFieldsQueryBuild.push("meta_info");
                gSystemConfig.enableFiltersGenericInfoS1 == 1 ? arrTableFieldsQueryBuild.push("info_small1") : '';
                gSystemConfig.enableFiltersGenericInfoS2 == 1 ? arrTableFieldsQueryBuild.push("info_small2") : '';
                gSystemConfig.enableFiltersGenericInfoS3 == 1 ? arrTableFieldsQueryBuild.push("info_small3") : '';
                gSystemConfig.enableFiltersGenericInfoS4 == 1 ? arrTableFieldsQueryBuild.push("info_small4") : '';
                gSystemConfig.enableFiltersGenericInfoS5 == 1 ? arrTableFieldsQueryBuild.push("info_small5") : '';
                gSystemConfig.enableFiltersGenericNumberS1 == 1 ? arrTableFieldsQueryBuild.push("number_small1") : '';
                gSystemConfig.enableFiltersGenericNumberS2 == 1 ? arrTableFieldsQueryBuild.push("number_small2") : '';
                gSystemConfig.enableFiltersGenericNumberS3 == 1 ? arrTableFieldsQueryBuild.push("number_small3") : '';
                gSystemConfig.enableFiltersGenericNumberS4 == 1 ? arrTableFieldsQueryBuild.push("number_small4") : '';
                gSystemConfig.enableFiltersGenericNumberS5 == 1 ? arrTableFieldsQueryBuild.push("number_small5") : '';
                gSystemConfig.enableFiltersGenericImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                gSystemConfig.enableFiltersGenericConfigSelection == 1 ? arrTableFieldsQueryBuild.push("config_selection") : '';
                arrTableFieldsQueryBuild.push("activation");
                gSystemConfig.enableFiltersGenericActivation1 == 1 ? arrTableFieldsQueryBuild.push("activation1") : '';
                gSystemConfig.enableFiltersGenericActivation2 == 1 ? arrTableFieldsQueryBuild.push("activation2") : '';
                gSystemConfig.enableFiltersGenericActivation3 == 1 ? arrTableFieldsQueryBuild.push("activation3") : '';
                gSystemConfig.enableFiltersGenericActivation4 == 1 ? arrTableFieldsQueryBuild.push("activation4") : '';
                gSystemConfig.enableFiltersGenericActivation5 == 1 ? arrTableFieldsQueryBuild.push("activation5") : '';
                gSystemConfig.enableFiltersGenericNotes == 1 ? arrTableFieldsQueryBuild.push("notes") : '';
            }


            //File fields.
            if(buildType == "files")
            {
                gSystemConfig.enableFiltersGenericImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
            }
        }
        //----------------------


        //Filters generic binding.
        //----------------------
        //if(strTable == "filters_generic_binding")
        if(strTable == gSystemConfig.configSystemDBTableFiltersGenericBinding)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "sort_order", "date_creation", "date_edit", "id_filters_generic", "id_filter_index", "id_record", "notes"];
            }
        }
        //----------------------


        //Users.
        //----------------------
        if(strTable == gSystemConfig.configSystemDBTableUsers)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_parent"];
                gSystemConfig.enableUsersSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                arrTableFieldsQueryBuild.push("date_creation", "date_timezone", "date_edit");
                gSystemConfig.enableUsersType == 1 ? arrTableFieldsQueryBuild.push("id_type") : '';

                gSystemConfig.enableUsersNameTitle == 1 ? arrTableFieldsQueryBuild.push("name_title") : '';
                gSystemConfig.enableUsersNameFull == 1 ? arrTableFieldsQueryBuild.push("name_full") : '';
                gSystemConfig.enableUsersNameFirst == 1 ? arrTableFieldsQueryBuild.push("name_first") : '';
                gSystemConfig.enableUsersNameLast == 1 ? arrTableFieldsQueryBuild.push("name_last") : '';
                gSystemConfig.enableUsersDateBirth != 0 ? arrTableFieldsQueryBuild.push("date_birth") : '';
                gSystemConfig.enableUsersGender == 1 ? arrTableFieldsQueryBuild.push("gender") : '';
                gSystemConfig.enableUsersDocument == 1 ? arrTableFieldsQueryBuild.push("document") : '';
                gSystemConfig.enableUsersAddress == 1 ? arrTableFieldsQueryBuild.push("address_street", "address_number", "address_complement", "neighborhood", "district", "county", "city", "state", "country", "zip_code") : '';
                gSystemConfig.enableUsersPhone1 == 1 ? arrTableFieldsQueryBuild.push("phone1_international_code", "phone1_area_code", "phone1") : '';
                gSystemConfig.enableUsersPhone2 == 1 ? arrTableFieldsQueryBuild.push("phone2_international_code", "phone2_area_code", "phone2") : '';
                gSystemConfig.enableUsersPhone3 == 1 ? arrTableFieldsQueryBuild.push("phone3_international_code", "phone3_area_code", "phone3") : '';
                gSystemConfig.enableUsersUsername == 1 ? arrTableFieldsQueryBuild.push("username") : '';
                gSystemConfig.enableUsersEmail == 1 ? arrTableFieldsQueryBuild.push("email") : '';

                arrTableFieldsQueryBuild.push("password", "password_hint", "password_length");
                
                gSystemConfig.enableUsersInfo1 == 1 ? arrTableFieldsQueryBuild.push("info1") : '';
                gSystemConfig.enableUsersInfo2 == 1 ? arrTableFieldsQueryBuild.push("info2") : '';
                gSystemConfig.enableUsersInfo3 == 1 ? arrTableFieldsQueryBuild.push("info3") : '';
                gSystemConfig.enableUsersInfo4 == 1 ? arrTableFieldsQueryBuild.push("info4") : '';
                gSystemConfig.enableUsersInfo5 == 1 ? arrTableFieldsQueryBuild.push("info5") : '';
                gSystemConfig.enableUsersInfo6 == 1 ? arrTableFieldsQueryBuild.push("info6") : '';
                gSystemConfig.enableUsersInfo7 == 1 ? arrTableFieldsQueryBuild.push("info7") : '';
                gSystemConfig.enableUsersInfo8 == 1 ? arrTableFieldsQueryBuild.push("info8") : '';
                gSystemConfig.enableUsersInfo9 == 1 ? arrTableFieldsQueryBuild.push("info9") : '';
                gSystemConfig.enableUsersInfo10 == 1 ? arrTableFieldsQueryBuild.push("info10") : '';

                gSystemConfig.enableUsersImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
                
                arrTableFieldsQueryBuild.push("activation");
                gSystemConfig.enableUsersActivation1 == 1 ? arrTableFieldsQueryBuild.push("activation1") : '';
                gSystemConfig.enableUsersActivation2 == 1 ? arrTableFieldsQueryBuild.push("activation2") : '';
                gSystemConfig.enableUsersActivation3 == 1 ? arrTableFieldsQueryBuild.push("activation3") : '';
                gSystemConfig.enableUsersActivation4 == 1 ? arrTableFieldsQueryBuild.push("activation4") : '';
                gSystemConfig.enableUsersActivation5 == 1 ? arrTableFieldsQueryBuild.push("activation5") : '';
                gSystemConfig.enableUsersStatus == 1 ? arrTableFieldsQueryBuild.push("id_status") : '';
                gSystemConfig.enableUsersNotes == 1 ? arrTableFieldsQueryBuild.push("notes") : '';
            }


            //File fields.
            if(buildType == "files")
            {
                //arrTableFieldsQueryBuild.push("image_main");
                gSystemConfig.enableUsersImageMain == 1 ? arrTableFieldsQueryBuild.push("image_main") : '';
            }
        }
        //----------------------


        //Data treatment.
        //----------------------
        if(returnMethod == "array")
        {
            strReturn = arrTableFieldsQueryBuild;
        }
        if(returnMethod == "string")
        {
            strReturn = arrTableFieldsQueryBuild.join(", ");
        }
        //----------------------


        return strReturn;


        //Usage.
        //----------------------
        //FunctionsGeneric.tableFieldsQueryBuild01("categories", "all", "string");
        //FunctionsGeneric.tableFieldsQueryBuild01(gSystemConfig.configSystemDBTableFiles, "all", "string");
        //----------------------
    }
    //**************************************************************************************


    //Select image size array based on table.
    //**************************************************************************************
    /**
     * Select image size array based on table.
     * @static
     * @param {string} strTable 
     * @returns {array}
     */
    static arrImageSizeSelect(strTable)
    {
        //Variables.
        //----------------------
        var arrReturn = gSystemConfig.configArrDefaultImageSize;
        //----------------------


        //Logic.
        if(strTable)
        {
            if(gSystemConfig.enableDefaultImageSize == 0)
            {
                //Categories.
                if(strTable == gSystemConfig.configSystemDBTableCategories)
                {
                    arrReturn = gSystemConfig.configArrCategoriesImageSize;
                }
            }

        }

        return arrReturn;
    }
    //**************************************************************************************


    //Limit the maximum number of characters.
    //**************************************************************************************
    /**
     * Limit the maximum number of characters.
     * @static
     * @param {string} strData 
     * @param {integer} nCharacters 
     * @returns {string}
     */
    static limitChar(strData, nCharacters)
    {
        //Variables.
        //----------------------
        var strReturn = strData;
        //----------------------


        //Logic.
        if(strReturn != "" && nCharacters != 0)
        {
            if(strReturn.length > nCharacters)
            {
                strReturn = strReturn.substring(0, nCharacters);
            }
        }else{
            strReturn = "";
        }


        return strReturn;


        //Usage.
        //----------------------
        //FunctionsGeneric.limitChar("string", 123);
        //----------------------
    }
    //**************************************************************************************

    
    //Remove non numerical characters.
    //**************************************************************************************
    /**
     * Remove non numerical characters.
     * @static
     * @param {string} strData 
     * @returns {string}
     */
    static removeNonNumerical(strData)
    {
        //Variables.
        //----------------------
        var strReturn = strData;
        //----------------------


        //Logic.
        if(strReturn)
        {
            strReturn = strReturn.replace(/\D+/g, ""); //strip HTML
            //strReturn = strReturn.replaceAll(/\D+/, ""); //strip HTML
        }else{
            strReturn = "";
        }


        return strReturn;


        //Usage.
        //----------------------
        //FunctionsGeneric.removeNonNumerical("string");
        //----------------------
    }
    //**************************************************************************************

    
    //Remove HTML tags from string.
    //**************************************************************************************
    /**
     * Remove HTML tags from string.
     * @static
     * @param {string} strHTML 
     * @returns {string}
     */
    static removeHTML01(strHTML)
    {
        //Variables.
        //----------------------
        var strReturn = strHTML;
        //----------------------


        //Logic.
        if(strReturn)
        {
            strReturn = strReturn.replace(/<[^>]*>?/gm, ""); //strip HTML
            strReturn = strReturn.replace(/\r?\n|\r/g, " "); //strip all kinds of line breaks
        }else{
            strReturn = "";
        }


        return strReturn;


        //Usage.
        //----------------------
        //FunctionsGeneric.removeHTML01("string");
        //----------------------
    }
    //**************************************************************************************


    //Format CSS / HTML / Bootstrap elements.
    //**************************************************************************************
    /**
     * Remove HTML tags from string.
     * @static
     * @param {string} formatType 
     * @param {string} strHTML 
     * @returns {string}
     */
    static formattingHTML(formatType, strParameter)
    {
        //formatType: cssTextAlign | bootstrapClassTextAlignFlex

        //Variables.
        //----------------------
        var strReturn = "none";
        //----------------------


        //CSS Text Align.
        //----------------------
        if(formatType == "cssTextAlign")
        {
            switch(strParameter)
            {
                case 1:
                strReturn = "right";
                break;

                case 2:
                strReturn = "center";
                break;

                case 3:
                strReturn = "left";
                break;

                case 4:
                strReturn = "justify";
            }
        }
        //----------------------


        //Bootstrap Class - Text Align (flex)
        //Note: row class
        //----------------------
        if(formatType == "bootstrapClassTextAlignFlex")
        {
            switch(strParameter)
            {
                case 1:
                strReturn = "justify-content-end";
                break;

                case 2:
                strReturn = "justify-content-center";
                break;

                case 3:
                strReturn = "justify-content-start";
                break;

                case 4:
                strReturn = "justify-content-between";
            }
        }
        //----------------------


        return strReturn;
    }
    //**************************************************************************************

};

//Export module.
//module.exports.FunctionsGeneric = FunctionsGeneric;
//module.exports.SyncSystemNS    
    
//Return the extension of a file.
//**************************************************************************************
/*Working.
exports.getFileExtension = (filePath) =>
{
    //Variables.
    let strReturn = "";

    if(filePath !== null && typeof(filePath) !== 'undefined')
    {
        strReturn = filePath;
    }else{
        strReturn = "";
    }

    return strReturn;
};
*/
//**************************************************************************************