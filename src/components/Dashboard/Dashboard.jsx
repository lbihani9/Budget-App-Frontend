import React, { useEffect, useState } from "react";
import axios from "axios";
import Entry from "../Entry/Entry";
import Navbar from "../Navbar/Navbar";
import { useLocation } from "react-router-dom";
import "./Dashboard.css";
import { SERVER } from "../../config";

function Dashboard() {
	const location = useLocation();

	//2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015,

	const [years, setYears] = useState(null);
	const [newYear, setNewYear] = useState(0);

	useEffect(() => {
		async function getYears() {
			axios
				.get(SERVER + "/api/dashboard/", { withCredentials: true })
				.then((res) => {
					res.status === 200
						? setYears(res.data.years)
						: alert(res.data.message);
				})
				.catch((err) => {
					alert(
						"Make sure your're logged in and hasn't made any errors while submitting the form."
					);
				});
		}
		getYears();
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		axios
			.post(SERVER + "/api/dashboard/", { newYear }, { withCredentials: true })
			.then((res) => {
				res.status === 201
					? setYears(years ? [newYear, ...years] : [newYear])
					: alert(res.data.message);
				setNewYear(null);
			})
			.catch((err) => {
				alert(
					"Make sure your're logged in and hasn't made any errors while submitting the form."
				);
			});
	}

	function handleInputChange(event) {
		setNewYear(event.target.value);
	}

	return (
		<main className="main">
			<Navbar />

			<div className="records container-fluid">
				<div className="row">
					{/* --------------------------------------------------------------------- */}
					<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-evenly">
						<div className="ip-form card text-center border-secondary mb-3">
							<div
								className="card-body d-flex justify-content-evenly"
								style={{ marginBottom: "50px" }}
							>
								<form onSubmit={handleSubmit}>
									<input
										type="number"
										id="newYear"
										name="newYear"
										value={newYear ? newYear : ""}
										placeholder="add new year"
										onChange={handleInputChange}
										className="form-input-field"
										required
									></input>
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
					{/* ----------------------------------------------------------------------------------- */}

					{years
						? years.map((year, index) => (
								<Entry
									key={index}
									title={`Year ${year}`}
									path={`${location.pathname}/${year}`}
									canDelete={true}
								/>
						  ))
						: null}
				</div>
			</div>
		</main>
	);
}

export default Dashboard;
