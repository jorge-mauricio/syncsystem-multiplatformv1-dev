"use strict";

//Import Node Modules.
//----------------------
//const gSystemConfig = require("../config-application.js"); //System configuration.
//const FunctionsGeneric = require("../" + gSystemConfig.configDirectoryComponents + "/functions-generic.js");
//const FunctionsCrypto = require("../" + gSystemConfig.configDirectoryComponents + "/functions-crypto.js");

//Context.
import { SyncSystemNSContext } from "./syncsystem-ns-cb-context.js";

//import React from "react";
import React, {Component} from "react";
import ReactDOM from "react-dom";
//import { Link } from 'react-router-dom';
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router";

//Components.
//import FrontendContent from "./frontend-content-cb-component.js";
//----------------------


class FrontendQuizzesListingRecord extends Component
{
    //Context.
    static contextType = SyncSystemNSContext;

    /*state = {
        quizAnswersRight: 0
    };*/

    //Constructor.
    //**************************************************************************************
    constructor(props, context)
    {
        //Component options.
        //configLayoutType: 1 - table listing (custom) | 2 - div layout (custom) | 3 - div row (custom) | 11 - table listing (bootstrap) | 22 - div layout (bootstrap) | 33 - div row (bootstrap) | 111 - table listing (dashboard - custom) 


        super(props, context);
        /*
        {
            this.arrCategoriesListing = props.arrCategoriesListing;
        }
        this.arrCategoriesListing = props.arrCategoriesListing;
        */
        //Bind.
        this.handleQuizAnswer = this.handleQuizAnswer.bind(this);
        this.handleQuizResultLog = this.handleQuizResultLog.bind(this);
        this.handleQuizResultReset = this.handleQuizResultReset.bind(this);


        //Properties.


        //State creation.
        /**/
        this.state = {
            quizAnswersRight: 0,
            quizResultsLog: []
        };


        //Debug.
        //console.log("props=", props);
    }
    //**************************************************************************************


    //Lifecycle method.
    //**************************************************************************************
    componentDidMount()
    {
        //Debug.
        //this.setState({ arrCategoriesListing: this.props.arrCategoriesListing });
        //console.log("this.props=", this.props);
    }
    //**************************************************************************************


    //Quiz answer handler.
    //**************************************************************************************
    handleQuizAnswer = () =>
    {
        var countQuizAnswersRight = this.state.quizAnswersRight;
        var tblQuizzesID = "";

        //Logic.
        countQuizAnswersRight++;


        this.setState({ quizAnswersRight: countQuizAnswersRight });
        /*this.setState(({ countQuizAnswersRight }) => ({
            countQuizAnswersRight: countQuizAnswersRight + 1
        }));
        */
        /*
        this.setState((prevState) => ({
            countQuizAnswersRight: prevState.countQuizAnswersRight + 1
        }));
        */
        //this.setState(prev => ({ countQuizAnswersRight: prev.countQuizAnswersRight + 1 }));


        /*this.setState(state => {
            const newState = [...state]; //keep state immutable
            !newState[countQuizAnswersRight] && (newState[countQuizAnswersRight] = 0)
            newState[countQuizAnswersRight]++
     
            return newState
         });
         */

        /*this.setState({
            quizAnswersRight: this.state.quizAnswersRight + 1
        })*///working


        //Debug.
        console.log("quizAnswersRight", this.state.quizAnswersRight);


        //Usage.
        /*
        onClick={() => this.handleQuizAnswer()}
        */
    }
    //**************************************************************************************


    //Quiz result log handler.
    //**************************************************************************************
    handleQuizResultLog = (eventData) =>
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;

        var countQuizAnswersRight = this.state.quizAnswersRight;
        var quizResultsLog = this.state.quizResultsLog;
        var quizAnswerStatus = false;
        var tblQuizzesID = "";


        //Value definition.
        tblQuizzesID = eventData._tblQuizzesID;


        //Logic.
        //Check answer.
        if(eventData._objQuizDetails.correct_answer == "True")
        {
            quizAnswerStatus = true;
            countQuizAnswersRight++;
        }

        //Insert log in array.
        quizResultsLog.push({
            tblQuizzesID: tblQuizzesID,
            objQuizDetails: eventData._objQuizDetails,
            quizAnswerStatus: quizAnswerStatus
        });


        //Update state.
        this.setState({ quizAnswersRight: countQuizAnswersRight });
        this.setState({ quizResultsLog: quizResultsLog });


        //Frontend change.
        //FunctionsSyncSystem.htmlGenericStyle01('divQuiz' + eventData._tblQuizzesID, 'display', 'none');
        FunctionsSyncSystem.htmlGenericStyle01('divQuiz' + tblQuizzesID, 'display', 'none');
        FunctionsSyncSystem.htmlGenericStyle01('divQuiz' + (tblQuizzesID + 1), 'display', 'block');
        if(tblQuizzesID == (this.props.arrQuizzesListing.length -1))
        {
            FunctionsSyncSystem.htmlGenericStyle01('divQuizResultsLog', 'display', 'block');
        }


        //Debug.
        console.log("quizAnswersRight=", this.state.quizAnswersRight);
        console.log("eventData._eventValue=", eventData._eventValue);
        console.log("eventData._tblQuizzesID=", eventData._tblQuizzesID);
        console.log("eventData._objQuizDetails=", eventData._objQuizDetails);


        //Usage.
        //----------------------
        /*
        onClick={() => this.handleQuizResultLog(
                {
                    _eventValue: false, //true | false
                    _tblQuizzesID: quizzesRowKey,
                    _objQuizDetails: quizzesRow
                }
            )}
        */
       //----------------------
    }
    //**************************************************************************************


    //Quiz reset handler.
    //**************************************************************************************
    handleQuizResultReset = () =>
    {
        //Variables.
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem } = this.context;

        //Update state.
        this.setState({
            quizAnswersRight: 0,
            quizResultsLog: []
        });

        //Frontend change.
        FunctionsSyncSystem.htmlGenericStyle01('divQuizStart', 'display', 'block');
        FunctionsSyncSystem.htmlGenericStyle01('divQuizResultsLog', 'display', 'none');
    }
    //**************************************************************************************

    //Render.
    //**************************************************************************************
    render()
    //async render()
    {
        //Variables.
        //----------------------
        //const { gSystemConfig, FunctionsGeneric, FunctionsCrypto } = this.context;
        const { gSystemConfig, SyncSystemNS, FunctionsSyncSystem, HTMLReactParser } = this.context;
        var configLayoutType = null;
        var arrQuizzesListing;

        //var contentToString;
        //----------------------


        //Define values.
        //----------------------
        configLayoutType = this.props.configLayoutType;
        arrQuizzesListing = this.props.arrQuizzesListing;
        //arrQuizzesListing = await this.props.arrQuizzesListing;


        //Debug.
        //console.log("configLayoutType(publications listing record)=", configLayoutType);
        //console.log("arrQuizzesListing(Quizzes listing record)=", arrQuizzesListing);
        //----------------------


        //div layout (custom).
        //----------------------
        if(configLayoutType == 2)
        {
            if(arrQuizzesListing.length > 0)
            {
                //Output.
                return(
                    <React.Fragment>
                        <div id={"divQuizStart"}>
                            <button 
                                onClick={()=>{
                                    FunctionsSyncSystem.htmlGenericStyle01('divQuiz0', 'display', 'block');
                                    FunctionsSyncSystem.htmlGenericStyle01('divQuizStart', 'display', 'none');
                                }}
                                className="ss-frontend-btn-base ss-frontend-btn-action">
                                Start / Begin
                            </button>
                        </div>
                        
                        <div className="ss-frontend-quizzes-listing-container">
                            { arrQuizzesListing.map((quizzesRow, quizzesRowKey) =>{
                                return (
                                    <article id={"divQuiz" + quizzesRowKey} key={quizzesRowKey} 
                                            className="ss-frontend-quizzes-container ss-frontend-quizzes-listing-text01"
                                            style={{display: "none"}}>
                                        <h2 className="ss-frontend-quizzes-listing-title01">
                                            <a href={"/" + gSystemConfig.configRouteFrontendQuizzes + "/" + gSystemConfig.configRouteFrontendDetails + "/" /*+ quizzesRow.id*/} 
                                                className="ss-frontend-quizzes-listing-title-link01"
                                                title={ SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesRow.category, "db") }>
                                                { /*quizzesRow.title*/ }
                                                { /*SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesRow.category, "db")*/ }
                                                { HTMLReactParser(quizzesRow.category) }
                                            </a>
                                        </h2>
                                        <p className="ss-frontend-quizzes-listing-content-row01">
                                            { /*SyncSystemNS.FunctionsGeneric.contentMaskRead(quizzesRow.question, "db")*/ }
                                            { /*JSON.parse(quizzesRow.question)*/ }
                                            { HTMLReactParser(quizzesRow.question) }
                                            
                                        </p>

                                        { /*Options - store in memory.*/ }
                                        <div className="ss-frontend-quizzes-listing-content-row01">
                                            <a onClick={() => this.handleQuizResultLog(
                                                    {
                                                        _eventValue: true,
                                                        _tblQuizzesID: quizzesRowKey,
                                                        _objQuizDetails: quizzesRow
                                                    }
                                                )}
                                                className="ss-frontend-btn-base ss-frontend-btn-action-execute"
                                                title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendQuizzesAnswerYes") }>
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendQuizzesAnswerYes") }
                                            </a>

                                            <a onClick={() => this.handleQuizResultLog(
                                                    {
                                                        _eventValue: false,
                                                        _tblQuizzesID: quizzesRowKey,
                                                        _objQuizDetails: quizzesRow
                                                    }
                                                )}
                                                className="ss-frontend-btn-base ss-frontend-btn-action-cancel"
                                                title={ SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendQuizzesAnswerNo") }>
                                                    { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendQuizzesAnswerNo") }
                                            </a>
                                        </div>
                                    </article>
                                );
                            }) }
                        </div>
                        
                        { /*Results - quiz answers log.*/ }
                        <div id={"divQuizResultsLog"} style={{display: "none"}}>
                            <div>
                                Answers right:
                                { this.state.quizAnswersRight } / { arrQuizzesListing.length }
                            </div>
                            <div>
                                Answers Log:
                                { /*Debug.*/ }
                                { /*JSON.stringify(this.state.quizResultsLog)*/ }

                                {
                                    this.state.quizResultsLog.map((quizResultsLogRow, quizResultsLogKey) =>{
                                        return (
                                            <div key={quizResultsLogKey}>
                                                ID: {quizResultsLogRow.tblQuizzesID}
                                                <br />

                                                Question:
                                                <div className="ss-frontend-quizzes-listing-subheading01">
                                                    { HTMLReactParser(quizResultsLogRow.objQuizDetails.question) }
                                                </div>
                                                
                                                <br />
                                                Status: 
                                                { /*Debug.*/ }
                                                { quizResultsLogRow.quizAnswerStatus.toString() }
                                            </div>
                                        );
                                    })
                                }
                            </div>
                            <div>
                                <button 
                                    onClick={()=>{ this.handleQuizResultReset() }}
                                    className="ss-frontend-btn-base ss-frontend-btn-action">
                                    Reset
                                </button>
                            </div>
                        </div>
                    </React.Fragment>
                );
            }else{
                //Output - empty.
                return(
                    <div className="ss-frontend-alert">
                        { SyncSystemNS.FunctionsGeneric.appLabelsGet(gSystemConfig.configLanguageFrontend.appLabels, "frontendMessageQuizzesEmpty") }
                    </div>
                );
            }
        }
        //----------------------

    }    
    //**************************************************************************************
}


export default FrontendQuizzesListingRecord;