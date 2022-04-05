import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import AuthState from "./Context/AuthState";

ReactDOM.render(
	<React.StrictMode>
		<AuthState>
			<App />
		</AuthState>
	</React.StrictMode>,
	document.getElementById("root")
);