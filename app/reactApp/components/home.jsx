import React from         'react';
import { Link } from      'react-router';

export class Home extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<HeroSection {...this.props} />
				<FeaturesSection />
				<Footer />
			</div>
		)
	}
}

class HeroNav extends React.Component {

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
						<Link  to="/pricing" className="nav-item"> Pricing </Link>
						{/* <div className="nav-item"> Docs </div> 	*/}
						<div className="nav-item" onClick={this.showLock}> Login</div>
					</div>
				</div>
			</nav>
		);
	}
}

class HeroSection extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return  ( 
				<div className="hero-wrapper">
					<HeroNav {...this.props}/>
					<div className="bg-hero bg-hero-1"></div>
					<div className="hero-content">
						<div className="slogan animated fadeInDown delay-half-sec"> Audio mixing, from the future </div>
						<Countdown endTime='Mon Mar 7 2016 00:56:22 GMT-0700'/>
						{/*
						<form id="mc-embedded-subscribe-form" action="//SoundCtl.us12.list-manage.com/subscribe/post?u=be4c8e8b746c8bbb27b92210e&amp;id=7228dc16ba" name="mc-embedded-subscribe-form" method="post" target="_blank">
							<input placeholder="Enter email address" type="email" name="EMAIL" required/>
							<input className="cta-base" type="submit" value="Signup"/>
						</form>
						*/}
					</div>
				</div>
		);
	}
}

export class PricingPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return  (
			<div className="pricing-page">
				<div className="hero-wrapper">
					<HeroNav {...this.props}/>
					<div className="bg-hero bg-hero-pricing"></div>
					<div className="hero-content">
						<div className="slogan animated fadeInDown"> Pricing and Plans </div>
					</div>
				</div>
				<div className="pricing-section">
					<div className="column-row">
						<div className="pricing-column">
							<h1 className="price-tier">
								Hacker
							</h1>
							<div className="price">
								Free
							</div>
							<div className="pricing-content">
								<div className="features-included">
									<ul>
										<li> 25 Connections </li>
										<li> 10 Listeners </li>
										<li> 2GB Bandwidth </li>
										<li> 10GB Disk Space </li>
										<li> Authentication <i className="fa fa-times"></i> </li>
									</ul>
								</div>
							</div>
							<button className="cta"> Sign Up</button>
						</div>
						<div className="pricing-column inactive">
							<div id="coming-soon">Coming Soon</div>
							<h1 className="price-tier">
								Developer
							</h1>
							<div className="price">
								$ <span className="light-text"> per month</span>
							</div>
							<div className="pricing-content">
								<div className="features-included">
									<ul>
										<li> Unlimited Connections</li>
										<li> 500 Listeners </li>
										<li> 1TB Bandwidth </li>
										<li> 50GB Disk Space </li>
										<li> Authentication <i className="fa fa-check"></i> </li>
									</ul>
								</div>
							</div>
							<button className="cta"> Purchase </button>
						</div>
						<div className="pricing-column inactive">
							<div id="coming-soon">Coming Soon</div>
							<h1 className="price-tier">
								Enterprise
							</h1>
							<div className="price">
								$ <span className="light-text"> per month</span>
							</div>
							<div className="pricing-content">
								<div className="features-included">
									<ul>
										<li> Unlimited Connections</li>
										<li> 500 Listeners </li>
										<li> 1TB Bandwidth </li>
										<li> 1TB Disk Space </li>
										<li> Authentication <i className="fa fa-check"></i> </li>
									</ul>
								</div>
							</div>
							<button className="cta"> Purchase </button>
						</div>
					</div>
					<h2> 100% money back guarantee for the first 30 days on any paid plan. </h2>
				</div>
				<Countdown />
				<Footer />
			</div>
		);
	}
}

class FeaturesSection extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return  ( 
			<div className="features-section">
				<div className="intro-content">
					<h5> Let us take care of your audio</h5>
					<h1> What is it? </h1>
					<p> SoundCTL is an API, that allows you to mix audio in real-time. Transmit your audio and we'll do powerful manipulations through simple API calls. We'll decode, signal process, re-encode, and send it back at the speed of light. </p>
					<button className="cta"> Start Building </button>
				</div>
				<div className="features-content">
					<img src="/images/icons/tower.svg"/>
					<div>
						<h3> The most powerful audio streaming platform </h3>
						<p>	SoundCTL was designed from the ground up for real-time web mixing. Anything a standard sound mixer does, we do it <bold> better</bold>.</p>
					</div>
				</div>
				<div className="features-content">
					<div>
						<h3>Build on any device</h3>
						<p>Build cross-platform native mobile and web apps with our Android, iOS, and JavaScript SDKs.</p>
					</div>
					<img src="/images/icons/tower.svg"/>
				</div>
			</div>
		);
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
							<td>Blog</td>
							<td>Documentation</td> 
							<td><a href="mailto:admin@soundctl.com?Subject=Help%20me!"> Email Us </a></td>
							<td> <span className="fa fa-github"></span> <a href="https://github.com/soundctl" target="_blank"> GitHub </a></td>
						</tr>
						<tr>
							<td>Jobs</td>
							<td>Features</td> 
							<td>Call Us</td>
							<td> <span className="fa fa-twitter"></span><a href="https://twitter.com/soundctl" target="_blank"> Twitter</a></td>
						</tr>
						<tr>
							<td></td>
							<td>Uptime & Status</td> 
							<td></td> 
							<td> <span className="fa fa-facebook"></span><a href="https://facebook.com/soundctl" target="_blank"> Facebook</a></td>
						</tr>
						<tr>
							<td></td>
							<td><Link to="/pricing"> Pricing </Link></td> 
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
					<h1> Features </h1>
					<div className="info-block-container">
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
			</div>
		)
	}
}

class Countdown extends React.Component {

	constructor(props) {
		super(props);

		this.getTimeRemaining = this.getTimeRemaining.bind(this);
		this.updateRemaingTime = this.updateRemaingTime.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.componentWillUnmount = this.componentWillUnmount.bind(this);

		this.state = this.getTimeRemaining();
	}

	updateRemaingTime(){
		this.setState(this.getTimeRemaining());
	}

	getTimeRemaining(){
		var t = Date.parse(this.props.endTime) - Date.parse(new Date());
		var seconds = Math.floor((t / 1000) % 60);
		var minutes = Math.floor((t / 1000 / 60) % 60);
		var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		var days = Math.floor(t / (1000 * 60 * 60 * 24));
		var answer = {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds
		};
		return answer;
	}

	componentDidMount(){
		console.log("Component mounting...");
		this.interval = setInterval(this.updateRemaingTime, 1000);
	}

	componentWillUnmount(){
		console.log("Countdown unmounting...");
		clearInterval(this.interval);
	}

	render() {
		return  ( 
			<div className="countdown animated fadeInDown delay-half-sec">
				<div className="time-wrap">
					<div>
						<div className="time" > {this.state.days}   </div>
						<div className="time" > {this.state.hours} </div>
						<div className="time" > {this.state.minutes} </div>
						<div className="time" > {this.state.seconds} </div>
					</div>
					<div className="unit-wrap">
						<div className="unit"> Days </div>
						<div className="unit"> Hours </div>
						<div className="unit"> Minutes </div>
						<div className="unit"> Seconds </div>
					</div>
				</div>
			</div>
		);
	}
}