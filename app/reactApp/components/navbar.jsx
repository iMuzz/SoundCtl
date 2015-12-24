import React from         'react';
import ReactDom from      'react-dom';
import classNames from    'classnames';

let AuthActions = require('../actions/AuthActions');

export class Navbar extends React.Component {
	constructor(props) {
		super(props)
	}
	render() {
		return (
			<nav className="nav dash">
				<div className="nav-item"> SoundCtl </div>
				<div className="nav-right">
					<div className="nav-item">
						<UserPanel {...this.props}/>
					</div>
				</div>
			</nav>
		);
	}
}

class UserPanel extends React.Component {
	constructor(props) {
		super(props);

		this.state = { isOpen: false }

		this.openDropdown = this.openDropdown.bind(this);
		this.closeDropdown = this.closeDropdown.bind(this);
		this.onClick = this.onClick.bind(this);
	}

	openDropdown() {
		this.setState({ isOpen: true });
	}

	closeDropdown() {
		this.setState({ isOpen: false});
	}

	onClick(e) {
		this.setState({
			isOpen: !this.state.isOpen
		});
	}
	render() {
		if (this.props.userProfile) {
			return (
				<div className="user-panel" onClick={this.onClick}>
					<Avatar imageUrl={this.props.userProfile.picture}/>
					<Dropdown isOpen={this.state.isOpen}/>
				</div>
			);
		} 		
		return ( <div></div>);
	}
}

UserPanel.defaultProps = { initialCount: 0}

class Dropdown extends React.Component {
	constructor() {
		super();

		this.logout = this.logout.bind(this);
	}

	logout(e) {
		console.log('Logout the user!');
		e.stopPropagation();
		AuthActions.logout();
	}
	render() {
		let dropdownClass = classNames("dropdown-wrap", {"is-open": this.props.isOpen});
		return (
			<div className={dropdownClass}>
				<div className="arrow-up"> </div>
				<div className="dropdown">
					<a onClick={this.logout}> 
						<div className="dropdown-item">		
							Logout
						</div>
					</a>
					<div className="dropdown-item">		
						Settings
					</div>
				</div>
			</div>
		);
	}
}

Dropdown.defaultProps = { isOpen: false };

class Avatar extends React.Component {
	render() {
		return (
			<div className="avatar">
				<img src={this.props.imageUrl} />
			</div>
		);
}
	}