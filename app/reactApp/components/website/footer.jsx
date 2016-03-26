import React from         'react';
import { Link } from      'react-router';


export class Footer extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="footer-wrap">
				<div className="uk-grid content-wrap">
					<div className="uk-width-1-4">
						<div className="text header"> Company </div>
						<div className="text row"> Blog </div>
						<div className="text row">Jobs </div>
					</div>
					<div className="uk-width-1-4">
						<div className="text header"> Product </div>
						<a className="text row" href="https://docs.soundctl.io"> Documentation </a>
						<Link to="/pricing" className="text row"> Pricing </Link>
						<div className="text row"> Uptime & Status </div>
					</div>
					<div className="uk-width-1-4">
						<div className="text header"> Support </div>
						<a className="text row" href="mailto:admin@soundctl.com?Subject=Help%20me!"> Email Us </a>
						<div className="text row">Call Us </div>
					</div>
					<div className="uk-width-1-4">
						<div className="text header"> Connect </div>
						<div className="text row"><span className="fa fa-facebook"></span><a href="https://facebook.com/soundctl" target="_blank"> Facebook</a> </div>
						<div className="text row"><span className="fa fa-twitter"></span><a href="https://twitter.com/soundctl" target="_blank"> Twitter</a></div>
						<div className="text row"><span className="fa fa-github"></span> <a href="https://github.com/soundctl" target="_blank"> GitHub </a></div>
					</div>
				</div>
			</div>
		)
	}
}
