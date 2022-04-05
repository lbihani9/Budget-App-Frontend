import React from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Entry.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { SERVER } from "../../config";

function Entry(props) {
	const params = useParams();
	const location = useLocation();

	function handleDeletion(event, title) {
		const splittedTitle = title.split(" ");
		if (splittedTitle.length > 1) {
			title = Number(splittedTitle[1]);
		}
		axios
			.delete(SERVER + `/api${location.pathname}`, {
				withCredentials: true,
				params: {
					title: title,
				},
			})
			.then((res) => {
				res.status === 200 ? window.location.reload() : alert(res.data.message);
			})
			.catch((err) => {
				alert(err.message);
			});
	}

	return (
		<div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 d-flex justify-content-evenly">
			<div className="card text-center border-secondary mb-3">
				<div className="card-body">
					<p className="card-text">{props.title}</p>

					<div
						className="d-flex justify-content-evenly"
						style={{ marginTop: "50px" }}
					>
						<Link to={props.path} className="btn btn-secondary btn-sm dbb">
							<FontAwesomeIcon className="pen-icon" icon={faPen} />
						</Link>
						{props.canDelete && (
							<Link
								to=""
								onClick={(e) => handleDeletion(e, props.title)}
								className="btn btn-secondary btn-sm dbb"
							>
								<FontAwesomeIcon className="trash-icon" icon={faTrash} />
							</Link>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default Entry;
