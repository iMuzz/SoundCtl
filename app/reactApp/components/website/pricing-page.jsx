import React from         'react';
import { Link } from      'react-router';
import {HeroNav} from     './HeroNav';
import { Footer } from    './footer';


export class PricingPage extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return  (
			<div className="pricing-page">
				<div className="hero-wrapper">
					<HeroNav {...this.props}/>
					<div className="bg-hero bg-hero-pricing">
						<div className="slogan animated fadeInDown"> Pricing and Plans </div>
					</div>
				</div>
				<PricingSection />
				<FaqSection />
				<Footer />
			</div>
		);
	}
}

class PricingSection extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return  ( 
				<div className="pricing-section animated fadeInDown">
					<div className="column-row">
						<div className="pricing-column ">
							<h1 className="price-tier">
								Hacker
							</h1>
							<div className="price">
								<span className="bling">$</span> <span className="cash-money">0</span>
							</div>
							<div className="pricing-content">
								<div className="features-included">
									<ul>
										<li> 50 Connections </li>
										<li> 4 Inputs </li>
										<li> 2 Outputs </li>
										<li> 50 GB Transfer </li>
										{ /*<li> Authentication <i className="fa fa-times"></i> </li> */}
									</ul>
								</div>
							</div>
							<button className="cta"> Sign Up</button>
						</div>
						<div className="pricing-column inactive ">
							<div id="coming-soon">Coming Soon</div>
							<div className="blur">
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
											<li> 1TB Transfer </li>
											<li> Authentication <i className="fa fa-check"></i> </li>
										</ul>
									</div>
								</div>
								<button className="cta"> Purchase </button>
							</div>
						</div>
						<div className="pricing-column inactive ">
							<div id="coming-soon">Coming Soon</div>
							<div className="blur">
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
											<li> 1TB Transfer </li>
											<li> Authentication <i className="fa fa-check"></i> </li>
										</ul>
									</div>
								</div>
								<button className="cta"> Purchase </button>
							</div>
						</div>
					</div>
					<h2 className=""> 100% money back guarantee for the first 30 days on any paid plan. </h2>
				</div>
		);
	}
}


class FaqSection extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		return  ( 
			<div className="faq-section animated fadeInDown">
				<h1> Frequently Asked Questions </h1>
				<div className="question-wrap">
					<div className="question-column">
						<div className="question-block">
							<h2 className="question"> What is a "Database Connection"? </h2>
							<p className="answer">A database connection is a measure of the number of devices that are using your app's database simultaneously. This isn't the same as the total number of users of your app or visitors to your site. It's any open network connection to our database servers, including streaming REST API requests.</p>
						</div>

						<div className="question-block">
							<h2 className="question"> What are the limits on the FREE Plan? </h2>
							<p className="answer">The Free and the Spark plan have a hard cap at 100 concurrent connections. When the 101st user tries to connect, the API will throw an error and any additional connections will fail. In addition, storage and transfer is limited, and your app may be disabled if it exceeds these limits during a single month. </p>
						</div> 

					</div> 

					<div className="question-column">
						<div className="question-block">
							<h2 className="question"> What is the difference between database storage and transfer and hosting storage and transfer? </h2>
							<p className="answer"> Database storage is the total amount of data stored in your Firebase database. Database transfer is the amount of data transfered in and out of your Firebase database over the course of a month. Hosting storage is the total size of all files uploaded for your website to Firebase Hosting. Hosting transfer is the bandwidth used to serve your website to end users. </p>
						</div> 
						<div className="question-block">
							<h2 className="question"> Can I see my usage metrics? </h2>
							<p className="answer">Yes. For detailed analytics, head over to your App Dashboard and click on the “Analytics” tab on the left.</p>
						</div> 
					</div> 
				</div>
			</div>
		);
	}
}