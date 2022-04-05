import React, { useEffect, useState } from "react";
import {
	faFacebook,
	faLinkedin,
	faGoogle,
	faGithub,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./LandingPage.css";
import { Link } from "react-router-dom";
import { SERVER } from "../../config";

// think of few statements to put in this array.
const sentences = [
	"Do you spend too much and don't know what to do?",
	"Signup and Start Saving.",
];

// test array of sentences.
// const sentences = ["I'm a test sentence.", "I'm used for testing."];

function LandingPage() {
	const [sentenceId, setSentenceId] = useState(0);
	const [index, setIndex] = useState(0);
	const [sentence, setSentence] = useState("");
	const [reverse, setReverse] = useState(false);
	// const [isEnd, setEnd] = useState(false);

	// typewriter effect
	useEffect(() => {
		if (
			sentenceId === sentences.length - 1 &&
			index >= sentences[sentenceId].length
		) {
			// setEnd(true);
			return;
		}
		if (index >= sentences[sentenceId].length && !reverse) {
			setReverse(true);
			return;
		}
		if (index === 0 && reverse) {
			// console.log(index, reverse, sentence);
			setReverse(false);
			setSentenceId((prevId) => prevId + 1);
			setSentence("");
			return;
		}
		const timeout = setTimeout(() => {
			setSentence((prev) =>
				reverse ? prev.slice(0, -1) : prev + sentences[sentenceId][index]
			);
			setIndex((prevIndex) => prevIndex + (reverse ? -1 : 1));
		}, 120);

		return () => clearTimeout(timeout);
	}, [index, sentenceId, sentence, reverse]);

	function handleLogin(event) {
		window.open(`${SERVER}/auth/google`, "_self");
	}

	return (
		<main>
			<header>
				<nav className="navbar navbar-light bg-light">
					<div className="container-fluid">
						<Link to="/" className="navbar-brand">
							Budget App
						</Link>
						{/* <a className="navbar-brand">Budget App</a> */}
					</div>
				</nav>
			</header>

			<section className="main-content container-fluid">
				{/* main content with typewriter effect */}
				<div className="content">
					<p className="statements">{sentence}</p>
				</div>

				{/* third party authentication */}
				<div className="auth">
					{/* Uncomment this after implementing github authentication */}
					{/* <button type="button" className="btn btn-secondary lpb">
						<a href="#" className="social-icon">
							<FontAwesomeIcon icon={faGithub} />
						</a>
					</button> */}
					<p>Sign in with </p>
					<button
						type="button"
						className="btn btn-secondary lpb"
						onClick={handleLogin}
					>
						<a href="#" className="social-icon">
							<FontAwesomeIcon icon={faGoogle} />
						</a>
					</button>
				</div>
			</section>

			<footer className="container-fluid">
				<div className="social-div">
					{/* <p className="social-icon">Contact Me</p> */}
					<a
						href="https://www.linkedin.com/in/lokesh-bihani-186531173/"
						className="social-icon"
					>
						<FontAwesomeIcon icon={faLinkedin} />
					</a>
					<a href="mailto:lokeshbihani99@gmail.com" className="social-icon">
						<FontAwesomeIcon icon={faGoogle} />
					</a>
					<a href="https://github.com/lbihani9" className="social-icon">
						<FontAwesomeIcon icon={faGithub} />
					</a>
					<a
						href="https://www.facebook.com/lokesh.bihani.99/"
						className="social-icon"
					>
						<FontAwesomeIcon icon={faFacebook} />
					</a>
				</div>
			</footer>
		</main>
	);
}

export default LandingPage;
