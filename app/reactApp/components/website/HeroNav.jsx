import React from         'react';
import { Link } from      'react-router';

export class HeroNav extends React.Component {

	constructor(props) {
		super(props);
		this.showLock = this.showLock.bind(this);
	}

	showLock() {
		this.props.lock.show();
	}

	render() {
		return  (
			<nav className="nav">
				<div className="nav-item-wrap">
					<Link to="/" className="nav-item logo"> SoundCTL </Link>
					<div className="nav-right">
						{/* <div className="nav-item"> Features </div> 	*/}
						<Link  to="/pricing" className="nav-item"> PRICING </Link>
						<a className="nav-item" href="https://docs.soundctl.io" target="_blank"> DOCS </a>
						{ /* <div className="nav-item" onClick={this.showLock}> Login</div> */ }
					</div>
				</div>
			</nav>
		);
	}
}