import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import CopyrightIcon from "@material-ui/icons/Copyright";
import "./footer.css";

function Footer() {
	return (
		<div className="footer__box">
			<p className="footer__box-text">
				Copyright
				<span>
					<CopyrightIcon fontSize="inherit" />
				</span>
				by Mai Van Wagner
			</p>
			<a
				className="footer__box-icons-github"
				href="https://maivw.github.io/"
				target="_blank"
			>
				<GitHubIcon />
			</a>

			<a
				className="footer__box-icons-linkedIn"
				href="https://www.linkedin.com/in/mai-van-wagner-2295561aa/"
				target="_blank"
			>
				<LinkedInIcon />
			</a>
		</div>
	);
}

export default Footer;
