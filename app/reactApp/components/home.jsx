import React from         'react';
import { Link } from      'react-router';

export class Home extends React.Component {
	constructor(props){
		super(props);
		this.showLock = this.showLock.bind(this);
	}
	showLock() {
		this.props.lock.show();
	}

	render() {
		return (
			<div>
				<div className="hero-wrapper">
					<nav className="nav">
						<div className="nav-item-wrap">
							<div className="nav-item logo"> SoundCTL </div>
							<div className="nav-right">
								<div className="nav-item"> Features </div>
								<div className="nav-item"> Pricing </div>
								<div className="nav-item" onClick={this.showLock}> Docs </div>
								<div className="nav-item" onClick={this.showLock}> Login</div>
							</div>
						</div>
					</nav>
					<div className="bg-hero bg-hero-1"></div>
					<div className="hero-content">
						<div className="company"> Audio streaming, from the future </div>
						{/**<button className="hero-cta"> Request Demo </button **/}
						<form id="mc-embedded-subscribe-form" action="//SoundCtl.us12.list-manage.com/subscribe/post?u=be4c8e8b746c8bbb27b92210e&amp;id=7228dc16ba" name="mc-embedded-subscribe-form" method="post" target="_blank">
							<input placeholder="Enter email address" type="email" name="EMAIL" required/>
							<input className="cta-base" type="submit" value="Signup"/>
						</form>
					</div>
					<div id="wave-container"></div>
				</div>
				<InfoSection />
				<Footer />
			</div>
		)
	}
}

export class Footer extends React.Component { 
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="footer-wrap">
				<table className="uk-table">
					<tbody>
						<thead>
							<tr>
								<th> Company</th>
								<th> Product</th>
								<th> Support</th>
								<th> Connect</th>
							</tr>
						</thead>
						<tr>
							<td><a href=""> Meet The Team </a></td>
							<td><a href=""> Pricing </a></td> 
							<td><a href=""> Email Us </a></td>
							<td> <span className="fa fa-github"> GitHub </span></td>
						</tr>
						<tr>
							<td>Blog</td>
							<td>Features</td> 
							<td>Call Us</td>
							<td> <span className="fa fa-twitter"> Twitter </span></td>
						</tr>
						<tr>
							<td>Jobs</td>
							<td>Uptime & Status</td> 
							<td></td> 
							<td> <span className="fa fa-facebook"> Facebook </span></td>
						</tr>
						<tr>
							<td></td>
							<td>Documentation</td> 
							<td></td> 
						</tr>
					</tbody>
				</table>
			</div>
		)
	}
}


export class InfoSection extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<div className="info-section-container">
					<div className="info-block">
						<img src="/images/icons/tower.svg"/>
						<h1>Build Powerful Audio-Streaming Apps</h1>
						<p>SoundCtl is a simple API that allows you mix audio in realtime. SoundCtl is a simple API that allows you mix audio in realtime. SoundCtl is a simple API that allows you mix audio in realtime. </p>
					</div>
					<div className="info-block">
						<img src="/images/icons/tower.svg"/>
						<h1>Take control of Audio</h1>
						<i className="ti-eye"></i>
						<p> Harness the power of a top of the line audio mixer with a JSON patch. Harness the power of a top of the line audio mixer with a JSON patch. Harness the power of a top of the line audio mixer with a JSON patch. </p>
					</div>
					<div className="info-block">
						<img src="/images/icons/tower.svg"/>
						<h1> SoundCtl grows with you </h1>
						<p> SoundCtl will automatically spin up more servers based on the number of listeners that you have.  SoundCtl will automatically spin up more servers based on the number of listeners that you have.</p>
					</div>
				</div>
			</div>
		)
	}
}