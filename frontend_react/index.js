import React from "react";
import ReactDOM from "react-dom";

//Exercise - Functional Components.
/**/ 
function MyInfo()
{
	return(
		<div>
			<h1>My Name</h1>
			<p>Some information</p>
			<ul>
				<li>Aruba</li>
				<li>Jamaica</li>
				<li>Bermuda</li>
			</ul>
		</div>
	)
}

ReactDOM.render(
	<MyInfo />, 
	document.getElementById("root")
);