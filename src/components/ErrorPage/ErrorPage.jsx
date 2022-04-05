import React from "react";
import { Link, useLocation } from "react-router-dom";

function ErrorPage() {
	const location = useLocation();
	if (!location.state) {
		location.state.message = "Page not found.";
		location.state.errorCode = 404;
	}
	return (
		<section>
			<div className="error-message">
				{`Error ${location.errorCode}. ${location.message}`}
			</div>

			<div className="link-to-home">
				<Link to="/">Home Page</Link>
			</div>
		</section>
	);
}

export default ErrorPage;
