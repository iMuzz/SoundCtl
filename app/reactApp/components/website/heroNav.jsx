import React from         'react';
import { Link } from      'react-router';

export class HeroNav extends React.Component {
	constructor(props) {
		super(props);
		this.showLock = this.showLock.bind(this);
		this.toggleNav = this.toggleNav.bind(this);
		this.state = {
			showNav: false
		};
	}

	toggleNav(){
		this.setState({showNav: !this.state.showNav});
	}
	showLock() {
		this.props.lock.show();
	}

	render() {
		let navClass = this.state.showNav ? "nav open" : "nav";
		return  (
			<nav className={navClass}>
				<div className="nav-left">
					<Link to="/" className="nav-item logo"> SoundCTL </Link>
					<i onClick={this.toggleNav} id="mobile-menu" className="nav-item fa fa-bars fa-2x"></i>
				</div>
				<div className="nav-right">
					<Link  to="/pricing" className="nav-item"> PRICING </Link>
					<a className="nav-item" href="https://docs.soundctl.io" target="_blank"> DOCS </a>
					<a className="nav-item" href="https://github.com/soundctl/help" target="_blank"> SUPPORT </a>
					<div className="nav-item" onClick={this.showLock}> LOGIN </div>  
				</div>
			</nav>
		);
	}
}