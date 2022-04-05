import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthState";

function ProtectedRoute({ children }) {
	const auth = useAuth();

	if (!auth.userObj) {
		return <Navigate to="/" replace />;
	}

	return children;
}

export default ProtectedRoute;
