import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { SERVER } from "../config";

const AuthContext = createContext(null);

const AuthState = (props) => {
	const [userObj, setUserObj] = useState(null);

	useEffect(() => {
		if (!userObj) {
			function getStatus() {
				axios
					.get(SERVER + "/auth/login/success", {
						withCredentials: true,
					})
					.then((res) => {
						if (res.data) {
							setUserObj(true);
						}
					});
			}
			getStatus();
		}
	}, []);

	return (
		<AuthContext.Provider value={{ userObj }}>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;

export const useAuth = () => {
	return useContext(AuthContext);
};
