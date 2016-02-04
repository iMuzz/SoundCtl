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
		// <div className="nav-item"> <Link to="/dashboard"> Dashboard </Link> </div>
		// <form id="mc-embedded-subscribe-form" action="//SoundCtl.us12.list-manage.com/subscribe/post?u=be4c8e8b746c8bbb27b92210e&amp;id=7228dc16ba" name="mc-embedded-subscribe-form" method="post" target="_blank">
		// 	<input placeholder="Enter email address" type="email" name="EMAIL" required/>
		//	<input className="cta-base" type="submit" value="Signup"/>
		// </form>
		return (
			<div>
				<div className="hero-wrapper">
					<nav className="nav">
						<div className="nav-item"> SoundCtl </div>
						<div className="nav-right">
							<div className="nav-item" onClick={this.showLock}> Login</div>
						</div>
					</nav>
					<div className="bg-hero bg-hero-1"></div>
					<div className="hero-content">
						<div className="company"> Audio streaming, simplified </div>
						<button className="hero-cta"> Request Demo </button>
					</div>
					<div id="wave-container"></div>
				</div>
				<InfoSection />
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
			<div className="info-section-container">
				<div className="group-left">
					<h1>Communicate Seamlessly</h1>
					<p>Audio streaming with simplicity but yet  a powerful tool to reach audiences beyond the horizon.
					Soundctl powerful audio streaming starts within your reach from your browser.
					Connect  your microphone and you are ready to broadcast to the world.</p>
				</div>
				<div className="group-right">
					<img src="/images/icons/browser-window.svg" alt=""/>
				</div>
			</div>
		)
	}
}

// export class Home extends React.Component {
// 	constructor(props){
// 		super(props);
// 		this.showLock = this.showLock.bind(this);
// 	}
// 	showLock() {
// 		this.props.lock.show();
// 	}

// 	componentDidMount(){
// 		new sinewave({
// 			width: 1000,
// 			height: 300,
// 			speed: 0.009,
// 			container: document.getElementById('sinewave'),
// 			autostart: true,
// 		});
// 	}

// 	render() {
// 		return (
// 			<div>
// 				<nav className="nav">
// 					<div className="nav-item"> SoundCtl </div>
// 					<div className="nav-right">
// 						<div className="nav-item" onClick={this.showLock}> Login</div>
// 					</div>
// 				</nav>
// 				<div className="hero-wrapper">
// 					<div className="bg-hero bg-hero-1"></div>
// 					<div className="hero-content">
// 						<div className="company"> SoundCtl </div>
// 						<div className="hero-title"> This simplest way to broadcast your ideas <span className="bright"> live </span> </div>
// 						<form id="mc-embedded-subscribe-form" action="//SoundCtl.us12.list-manage.com/subscribe/post?u=be4c8e8b746c8bbb27b92210e&amp;id=7228dc16ba" name="mc-embedded-subscribe-form" method="post" target="_blank">
// 							<input placeholder="Enter email address" type="email" name="EMAIL" required/>
// 							<input className="cta-base" type="submit" value="Signup"/>
// 						</form>
// 					</div>
// 					<div id="sinewave" className="container"></div>
// 				</div>
// 			</div>
// 		)
// 	}
// }
