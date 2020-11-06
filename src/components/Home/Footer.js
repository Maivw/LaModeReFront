import React from "react";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";
import CopyrightIcon from "@material-ui/icons/Copyright";

function Footer() {
	return (
		<div>
			<p>
				Copyright
				<CopyrightIcon /> by Mai Van Wagner
			</p>
			<div>
				<a href="https://maivw.github.io/" target="_blank">
					<GitHubIcon />
				</a>
				<a
					href="https://www.linkedin.com/in/mai-van-wagner-2295561aa/"
					target="_blank"
				>
					<LinkedInIcon />
				</a>
			</div>
		</div>
	);
}

export default Footer;
