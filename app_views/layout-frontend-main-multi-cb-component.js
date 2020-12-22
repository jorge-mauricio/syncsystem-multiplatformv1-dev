"use strict";

//Import Node Modules.
//----------------------
//import React from "react";
import React, {Component} from "react"; //working
//import {Helmet} from "react-helmet";
import Safe from "react-safe"
//----------------------


class LayoutFrontendMainMulti extends Component
{

    constructor(props)
    {
        super(props);

        //State creation.
        this.state = {
            //sTodosData: testTodoData
        }

        //Bind with method.
        //this.handleChange = this.handleChange.bind(this);
    }


    //Lifecycle methods.
    
    //Return the new, updated state based upon the props (desincouraged by the react developer team)
    /*
    static getDerivedStateFromProps(props, state)
    {
        //Note: Returns error if returns nothing.

    }
    */


    //Create a backup of the current way things are.
    /*
    getSnapshotBeforeUpdate()
    {
        //Note: Returns error if returns nothing.

    }
    */


    componentDidMount()
    {
        /*
        const script = document.createElement("script");
        script.src = "/bundle.react.client.js";
        script.async = true;
        document.body.appendChild(script);
        //this.body.appendChild(script);
        */
        /*
        const s = document.createElement('script');
        //s.type = 'text/javascript';
        s.src = "/bundle.react.client.js";
        s.async = true;
        //s.innerHTML = "document.write('This is output by document.write()!')";
        this.instance.appendChild(s);
        */

        //GET the data I need to correctly display

    }

    //UNSAFE_componentWillReceiveProps(myNextProps) (deprecated)
    componentWillReceiveProps(myNextProps)
    {
        /*if(myNextProps.whatever != this.props.whaever)
        {
            //do something
        }*/
    }

    //Optmize the app´s resources.
    /*
    shouldComponentUpdate(myNextProps, myNextState)
    {
        //Note: Returns error if returns nothing.

        // return true if want it to update
        
        // return false if not want to update 



    }
    */

    //Teardown or cleanup your code before your component disappears.
    componentWillUnmount()
    {

    }



    //Personal method - change state.
    handleChange(id)
    {
        //Find the id and change the value of completed.
        /*this.setState(myPrevState =>{
            //Create new object based on the old state with the changed value.
            const updatedTodos = myPrevState.sTodosData.map(sTodosData =>{
                if(sTodosData.id === id)
                {
                    sTodosData.completed = !sTodosData.completed;
                }

                return sTodosData;
            });

            //Set the old state to the updated state that was created above.
            return{
                sTodosData: updatedTodos
            }
        });*/


        //Debug.
        //console.log("worked - id=" + id);
    }


    render()
    {
        //const tlScriptBundleReactClient = `<script src="/bundle.react.client.js"></script>`;

        //TodoData Map Component.
        //Note: Passing methods only works whith arrow functions because of the "this" reference - ref: https://stackoverflow.com/questions/56374615/uncaught-typeerror-cannot-read-property-class-function-of-undefined-in-reactj
        /** 
        const mcTestTodoItem = this.state.sTodosData.map(function(itemLine){
            return(
                <TestTodoItem 
                    key={itemLine.id} 
                    text={itemLine.text} 
                    completed={itemLine.completed} 
                    handleChange={this.handleChange}
                />
            );
        })
        */
        /*const mcTestTodoItem = this.state.sTodosData.map((itemLine)=>
            {
                return(
                    <TestTodoItem 
                        key={itemLine.id} 
                        id={itemLine.id} 
                        text={itemLine.text} 
                        completed={itemLine.completed} 
                        cmHandleChange={this.handleChange}
                    />
                );
            }
        )   */     


        return(
            <html>
                <head>
                    {this.props.cphHead}
                </head>

                <body>
                    <div id="root">

                        Layout Main
                        {/*this.props.cphTitle*/''}
                        {this.props.cphTitle}
                        {this.props.cphTitleCurrent}
                        {this.props.cphBody}


                        { /*tlScriptBundleReactClient*/ }

                        {/*<Helmet>
                            <script src="/bundle.react.client.js"></script>
                            <script>{
                        `try{Typekit.load({ async: true });}catch(e){}`
                        }</script>
                        </Helmet>*/}

                    </div>

                    <Safe.script src="/bundle.react.client.js"></Safe.script>
                    <Safe.script>{
                    `try{Typekit.load({ async: true });}catch(e){}`
                    }
                    </Safe.script>
                </body>
            </html>
        );
    }
}

export default LayoutFrontendMainMulti;
