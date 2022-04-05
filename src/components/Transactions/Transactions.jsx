import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SERVER } from "../../config";
import Navbar from "../Navbar/Navbar";
import Transaction from "./Transaction";
import "./Transactions.css";

function Transactions() {
	const params = useParams();

	const [transactions, setTransactions] = useState(null);
	const [newSpent, setNewSpent] = useState(null);
	const [newMessage, setNewMessage] = useState("");

	useEffect(() => {
		function getTransactions() {
			axios
				.get(
					`${SERVER}/api/dashboard/${params.year}/${params.month}/${params.envelope}`,
					{
						withCredentials: true,
					}
				)
				.then((res) => {
					res.status === 200
						? setTransactions(res.data.transactions)
						: alert(res.data.message);
				})
				.catch((err) => {
					alert(err.message);
				});
		}
		getTransactions();
	}, []);

	function handleSubmit(event) {
		event.preventDefault();
		axios
			.post(
				`${SERVER}/api/dashboard/${params.year}/${params.month}/${params.envelope}`,
				{ newSpent, newMessage },
				{ withCredentials: true }
			)
			.then((res) => {
				res.status === 201
					? setTransactions(
							transactions
								? [...transactions, { spent: newSpent, message: newMessage }]
								: [{ spent: newSpent, message: newMessage }]
					  )
					: alert(res.data.message);

				setNewMessage(null);
				setNewSpent(null);
			})
			.catch((err) => {
				console.log(err);
				alert(err.message);
			});
	}

	function handleInputChange(event) {
		if (event.target.id === "spent") {
			setNewSpent(event.target.value);
		} else {
			setNewMessage(event.target.value);
		}
	}

	return (
		<main>
			<Navbar />

			<div className="container-fluid">
				<div className="row">
					{/* ------------------------------------------------------------------------------------------- */}
					<div className="col-sm-6 d-flex justify-content-evenly mb-3">
						<div className="ip-form card w-75 ">
							<div className="card-body" style={{ marginBottom: "50px" }}>
								<form onSubmit={handleSubmit} className="add-new-transaction">
									<input
										type="text"
										className="form-input-field"
										style={{ width: "auto" }}
										id="spent"
										placeholder="Add Amount Spent"
										value={newSpent ? newSpent : ""}
										onChange={handleInputChange}
										required
									/>

									<input
										type="text"
										className="form-input-field overflow-auto"
										style={{ width: "auto" }}
										id="message"
										placeholder="Add message for the transaction (for ex: where was this amount spent)"
										value={newMessage ? newMessage : ""}
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

					{/* ------------------------------------------------------------------------------------------- */}
					{transactions
						? transactions.map((transact) => (
								<Transaction
									spent={transact.spent}
									message={transact.message}
								/>
						  ))
						: null}
				</div>
			</div>
		</main>
	);
}

export default Transactions;
