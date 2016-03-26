import React from         'react';
import { Link } from      'react-router';
import { Footer } from    './footer';
import { HeroNav } from     './heroNav';
import { Countdown } from     './countdown';

export class Home extends React.Component {
	constructor(props){
		super(props);
	}

	render() {
		return (
			<div>
				<HeroSection {...this.props} />
				<div className="transition-wrapper">
					<div className="content-wrapper">
						<IntroSection />
						<InfoSection />
					</div>
				</div>
				<Footer />
			</div>
		)
	}
}

class HeroSection extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return  (
				<div className="hero-wrapper intro-animation">
					<HeroNav {...this.props}/>
					<div className="bg-hero bg-hero-1">
						<div className="invisible-wrap">
							<div className="hero-content">
								<div className="slogan animated fadeInDown delay-half-sec"> The future of real-time audio</div>
								<Countdown endTime='Wed Apr 13 2016 00:00: GMT-0700'/>
								<form className="animated fadeInDown delay-1s" id="mc-embedded-subscribe-form" action="//SoundCtl.us12.list-manage.com/subscribe/post?u=be4c8e8b746c8bbb27b92210e&amp;id=7228dc16ba" name="mc-embedded-subscribe-form" method="post" target="_blank">
									<input placeholder="Enter email address" type="email" name="EMAIL" required/>
									<input className="cta" type="submit" value="Notify Me!"/>
								</form>
							</div>
						</div>
					</div>
				</div>
		);
	}
}

class IntroSection extends React.Component {
	constructor(props) {
		super(props);
	}
	// Simply transmit your audio and start sending audio commands.  We'll process in real-time.
	render() {
		return  (
			<div className="features-section">
				<div className="intro-content">
					<h5> Shape your sound </h5>
					<h1> What is SoundCTL? </h1>
					<p> SoundCTL is an API that allows you to take full control of real-time audio streaming. Combine multiple live sources, tweak audio levels and transmit the final output, all at the speed of light. </p>
					<a className="cta" href="https://docs.soundctl.io" target="_blank"> Learn More </a>
				</div>
				<div className="features-content">
					<img src="/images/icons/multiplatform.svg"/>
					<div className="feature-desc" >
						<h3> Powerful Audio API </h3>
						<p>	SoundCTL was designed from the ground up for real-time audio mixing. Harness the true power of live audio compositing with simple API calls and take your apps to the next level. </p>
					</div>
				</div>
				<div className="features-content">
					<div className='feature-icon-wrap'>
						<div className="pulse"></div>
						<img id="network" src="/images/icons/network.svg"/>
					</div>
					<div className="feature-desc" >
						<h3> Push the boundaries </h3>
						<p> Being able to mix audio in real-time opens the door for completely new types of applications. From remote music collaboration to virtual reality, the things you can build are limited only by your imagination. </p>
					</div>
				</div>
			</div>
		);
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
							<img className='info-icon' src="/images/icons/documentation.svg"/>
							<h1> Outstanding Documentation </h1>
							<p> Our API has a powerful combination of features. We've made great documentation a priorirty and have made it easy for everyone to get started. </p>
						</div>
						<div className="info-block">
							<img className='info-icon' src="/images/icons/routing.svg"/>
							<h1> Real-time Audio Routing </h1>
							<p> Connect any number of audio inputs and merge them together instantly at your will. This allows for a whole suite of applications that couldn't exist before. </p>
						</div>
						<div className="info-block">
							<img className='info-icon' src="/images/icons/interface.svg"/>
							<h1> Multiple Audio Formats </h1>
							<i className="ti-eye"></i>
							<p> Transmit a variety of audio formats and we will automatically detect and decode. This gives you the power to create an app for any device. </p>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

class DemoSection extends React.Component {
	constructor(props) {
		super(props);

		this.showDemo = this.showDemo.bind(this);
	}
	showDemo(e){
		let source;
		if ($(e.target).is("i")) {
			source = $(e.target).parent().attr('data-vid-url');
		} else {
			source = $(e.target).attr('data-vid-url');
		}

		let lightbox = UIkit.lightbox.create([
			{'source': source, 'type':'video'}
		]);
		lightbox.show();
	}

	render() {
		return  (
			<div className="demo-section">
				<div className="demo-wrap">
					<div className="demo" data-vid-url="https://www.youtube.com/watch?v=wZZ7oFKsKzY" onClick={this.showDemo}><i className="fa fa-play"></i></div>
					<div className="demo" data-vid-url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" onClick={this.showDemo}><i className="fa fa-play"></i></div>
				</div>
			</div>
		);
	}
}