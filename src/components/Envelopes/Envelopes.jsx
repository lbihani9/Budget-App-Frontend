import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { SERVER } from "../../config";
import Entry from "../Entry/Entry";
import Navbar from "../Navbar/Navbar";

function Envelopes() {
	const location = useLocation();
	const params = useParams();
	// console.log("params data", params);

	// for testing
	// const envelopes = ["Food", "Groceries", "Household Utilities", "Grooming"];

	// Make query to the backend to retrieve all the envelopes created in particular month of the year.
	const [envelopes, setEnvelopes] = useState(null);
	const [newEnvelopeName, setNewEnvelopeName] = useState(null);
	const [newBudget, setNewBudget] = useState(null);

	useEffect(() => {
		function getEnvelopes() {
			axios
				.get(`${SERVER}/api/dashboard/${params.year}/${params.month}`, {
					withCredentials: true,
				})
				.then((res) => {
					res.status === 200
						? setEnvelopes(res.data.envelopes)
						: alert(res.data.message);
				})
				.catch((err) => {
					alert(err.message);
				});
		}
		getEnvelopes();
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		axios
			.post(
				`${SERVER}/api/dashboard/${params.year}/${params.month}`,
				{ newEnvelopeName: newEnvelopeName, newBudget: newBudget },
				{ withCredentials: true }
			)
			.then((res) => {
				res.status === 201
					? setEnvelopes(
							envelopes
								? [...envelopes, { envelopeName: newEnvelopeName }]
								: [{ envelopeName: newEnvelopeName }]
					  )
					: alert(res.data.message);
				setNewEnvelopeName(null);
				setNewBudget(null);
			})
			.catch((err) => {
				console.log(err);
				alert(err.message);
			});
	}

	function handleInputChange(event) {
		if (event.target.id === "newEnvelopeName") {
			setNewEnvelopeName(event.target.value);
		} else {
			setNewBudget(event.target.value);
		}
	}

	return (
		<main>
			<Navbar />

			<div className="envelopes container-fluid">
				<div className="row">
					{/* ------------------------------------------------------------------------------------------ */}
					{/* add data for new envelops */}

					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-evenly">
						<div className="ip-form card text-center border-secondary mb-3">
							<div
								className="card-body d-flex justify-content-evenly"
								style={{ marginBottom: "50px" }}
							>
								<form onSubmit={handleSubmit}>
									<input
										type="text"
										className="form-input-field overflow-auto"
										id="newEnvelopeName"
										placeholder="Add Envelope Name"
										value={newEnvelopeName ? newEnvelopeName : ""}
										onChange={handleInputChange}
										required
									/>
									<input
										type="number"
										className="form-input-field"
										id="newBudget"
										placeholder="Add Budget"
										value={newBudget ? newBudget : ""}
										onChange={handleInputChange}
										required
									/>

									<button type="submit" className="add-button">
										<svg
											xmlns="http://www.w3.org/2000/svg"
											width={30}
											height={30}
											fill="currentColor"
											className="bi bi-plus"
											viewBox="0 0 16 16"
										>
											<path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
										</svg>
									</button>
								</form>
							</div>
						</div>
					</div>

					{/* ------------------------------------------------------------------------------------------ */}
					{envelopes
						? envelopes.map((envelope, index) => (
								<Entry
									key={index}
									title={envelope.envelopeName}
									path={`${location.pathname}/${envelope.envelopeName}`}
									canDelete={true}
								/>
						  ))
						: null}
				</div>
			</div>
		</main>
	);
}

export default Envelopes;
