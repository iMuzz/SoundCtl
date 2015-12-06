import React from         'react';
import ReactDom from      'react-dom';

export class Navbar extends React.Component {
	render() {
		return (
			<nav className="nav">
				<div className="nav-item"> SoundCtl </div>
				<div className="nav-right">
					<div className="nav-item">
						<UserPanel />
					</div>
				</div>
			</nav>
		);
	}
}

class UserPanel extends React.Component {
	constructor() {
		super();
		
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		console.log('User Panel was clicked!');
	}

	render() {
		return (
			<div className="user-panel" onClick={this.handleClick}>
				<Avatar imageUrl={'https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAKVAAAAJGQ4NDg2ZjA4LTM2ZTctNDAwMS05ZDI2LTU2NDg0ZDlmMzJmNA.jpg'}/>
				<Dropdown />
			</div>
		);
	}
}



class Avatar extends React.Component {
	render() {
		return (
			<div className="avatar">
				<img src={this.props.imageUrl} />
			</div>
		);
	}
}

class Dropdown extends React.Component {
	render() {
		return (
			<div className="dropdown-wrap">
				<div className="arrow-up"> </div>
				<div className="dropdown">
					<div className="dropdown-item"> logout </div>
				</div>
			</div>
		);
	}
}

Dropdown.propTypes = {
	isOpen: React.PropTypes.bool
};

Dropdown.defaultProps = { isOpen: false };