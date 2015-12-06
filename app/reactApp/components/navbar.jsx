import React from         'react';
import ReactDom from      'react-dom';
import classNames from    'classnames';

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
		console.log('called?');
		this.setState({
			isOpen: !this.state.isOpen
		});
	}

	render() {
		return (
			<div className="user-panel" onClick={this.onClick}>
				<Avatar imageUrl={'https://media.licdn.com/mpr/mpr/shrink_100_100/AAEAAQAAAAAAAAKVAAAAJGQ4NDg2ZjA4LTM2ZTctNDAwMS05ZDI2LTU2NDg0ZDlmMzJmNA.jpg'}/>
				<Dropdown isOpen={this.state.isOpen}/>
			</div>
		);
	}
}



class Dropdown extends React.Component {
	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
	}

	onClick(e) {
		console.log('A tag was clicked!');
		e.stopPropagation();
	}
	render() {
		let dropdownClass = classNames("dropdown-wrap", {"is-open": this.props.isOpen});
		return (
			<div className={dropdownClass}>
				<div className="arrow-up"> </div>
				<div className="dropdown">
					<a onClick={this.onClick} href="/"> 
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