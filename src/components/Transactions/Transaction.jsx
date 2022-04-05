import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Transaction(props) {
	return (
		<div className="col-sm-6 d-flex justify-content-evenly mb-3">
			<div className="card w-75">
				<div className="card-body overflow-auto">
					<p className="card-text">{`Spent = ${props.spent}`}</p>
					<p className="card-text">{`Message = ${props.message}`}</p>
					<button type="submit" className="btn btn-secondary dbb">
						<FontAwesomeIcon className="trash-icon" icon={faTrash} />
					</button>
				</div>
			</div>
		</div>
	);
}

export default Transaction;
