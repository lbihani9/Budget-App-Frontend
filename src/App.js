import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import Dashboard from "./components/Dashboard/Dashboard";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Months from "./components/Months/Months";
import Envelopes from "./components/Envelopes/Envelopes";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./Context/AuthState";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Transactions from "./components/Transactions/Transactions";

function App() {
	const auth = useAuth();
	return (
		<BrowserRouter>
			<div className="App">
				<Routes>
					<Route exact path="/" element={<LandingPage />} />

					{/* must be a protected route */}
					<Route
						exact
						path="/dashboard"
						element={
							<Dashboard />
							// <ProtectedRoute>
							// </ProtectedRoute>
						}
					/>

					{/* must be a protected route */}

					<Route exact path="/dashboard/:year" element={<Months />} />
					<Route exact path="/dashboard/:year/:month" element={<Envelopes />} />
					<Route
						exact
						path="/dashboard/:year/:month/:envelope"
						element={<Transactions />}
					/>

					<Route path="*" element={<ErrorPage />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
