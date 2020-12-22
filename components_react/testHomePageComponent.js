import React from "react";

class Home extends React.Component {
    exampleMethod()
    {
        console.log("JS is running");
    }


    //Main method.
    render(){
        //Variables - style objects.


        //Display logic.


        //Use class methods
        //this.myclassmethods();


        return(
            <div>
                <h1>Testing react component</h1>
                <button onClick={()=>this.exampleMethod()}>
                    Console log text
                </button>
            </div>
        )
    }
}

export default Home;