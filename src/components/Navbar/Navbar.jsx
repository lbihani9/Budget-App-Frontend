import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { SERVER } from "../../config";

function Navbar() {
	function handleLogout(event) {
		window.open(SERVER + "/auth/logout", "_self");
	}

	return (
		<header>
			<nav className="navbar navbar-light bg-light">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						Budget App
					</Link>
					<a href="#" onClick={handleLogout}>
						Signout
					</a>
				</div>
			</nav>
		</header>
	);
}

export default Navbar;
