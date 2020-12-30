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
        let dateObj = new Date();
        let dateYear, dateDay, dateMonth, dateHour, dateMinute, dateSecond;
        //----------------------


        if(strDate)
        {
            //Variable value.
            dateObj = strDate;

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
		//specialInstructions: db | utf8_encode | htmlentities | config-application | env (.env - environment variables) | pdf (convert to text) | json_encode (JavaScript String Encode)

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
        if(strValue !== null || typeof(strValue) !== "undefined")
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
            pageLinkFrontend = "content";
            variableFrontend = "idParentContent";

            pageLinkBackend = "content";
            variableBackend = "idParentContent";

            pageLinkDashboard = "dashboard-content";
            variableDashboard = "idParentContent";
    

            //Debug.
            //console.log("configCategoryType=");
            //console.log(gSystemConfig.configCategoryType);
        }
       

        //Products.
        if(categoryType == 2)
        {
            pageLinkFrontend = "products";
            variableFrontend = "idParentProducts";

            pageLinkBackend = "products";
            variableBackend = "idParentProducts";

            pageLinkDashboard = "dashboard-products";
            variableDashboard = "idParentProducts";
    

            //Debug.
            //console.log("configCategoryType=");
            //console.log(gSystemConfig.configCategoryType);
        }
        //----------------------


        //Categories.
        if(categoryType == 9)
        {
            //pageLinkFrontend = "categories";
            pageLinkFrontend = gSystemConfig.configRouteFrontendCategories;
            variableFrontend = "idParentCategories";

            //pageLinkBackend = "categories";
            pageLinkBackend = gSystemConfig.configRouteBackendCategories;
            variableBackend = "idParentCategories";

            pageLinkDashboard = "dashboard-categories";
            variableDashboard = "idParentCategories";
    

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
     * @param {string} strTable categories
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
                gSystemConfig.enableCategoriesBindRegister1 == 3 ? arrTableFieldsQueryBuild.push("id_register3") : '';
                gSystemConfig.enableCategoriesBindRegister1 == 4 ? arrTableFieldsQueryBuild.push("id_register4") : '';
                gSystemConfig.enableCategoriesBindRegister1 == 5 ? arrTableFieldsQueryBuild.push("id_register5") : '';
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
                arrTableFieldsQueryBuild.push("image_main");
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
        //if(strTable == "categories")
        if(strTable == gSystemConfig.configSystemDBTableFiles)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "id_parent"];
                gSystemConfig.enableFilesSortOrder == 1 ? arrTableFieldsQueryBuild.push("sort_order") : '';
                arrTableFieldsQueryBuild.push("file_type", "file_config", "date_creation", "date_timezone", "date_edit");
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


        //Filters generic.
        //----------------------
        //if(strTable == "filters_generic")
        if(strTable == gSystemConfig.configSystemDBTableFiltersGeneric)
        {
            if(buildType == "all")
            {
                arrTableFieldsQueryBuild = ["id", "sort_order", "filter_index", "table_name", "title", "description", "activation", "notes"];
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