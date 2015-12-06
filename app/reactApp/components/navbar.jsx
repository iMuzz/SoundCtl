import React from         'react';
import ReactDom from      'react-dom';

export class Navbar extends React.Component {
	render() {
		return (
			<nav>
				<div className="nav-logo"> SoundCtl </div>
				<div className="nav-items">
					<div> Avatar </div>
				</div>
			</nav>
		);
	}
}