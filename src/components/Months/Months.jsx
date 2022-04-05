import React from "react";
import { useLocation } from "react-router-dom";
import Entry from "../Entry/Entry";
import Navbar from "../Navbar/Navbar";

function Months() {
	const months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];

	const location = useLocation();
	// console.log(location);

	return (
		<main>
			<Navbar />

			<div className="months container-fluid">
				<div className="row">
					{months.map((month, index) => (
						<Entry
							key={index}
							title={month}
							path={`${location.pathname}/${month}`}
							canDelete={false}
						/>
					))}
				</div>
			</div>
		</main>
	);
}

export default Months;
