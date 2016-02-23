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
						<div className="nav-item"> soundCTL </div>
						<div className="nav-right">
							<div className="nav-item" onClick={this.showLock}> Login</div>
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
