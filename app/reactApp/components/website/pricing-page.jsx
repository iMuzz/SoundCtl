import React from         'react';
import { Link } from      'react-router';
import { HeroNav } from     './heroNav';
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
										<li> 50 Clients  </li>
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
											<li> Unlimited Clients </li>
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
											<li> Unlimited Clients </li>
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
							<h2 className="question"> What is a client? </h2>
							<p className="answer"> A client is a device connected to a SoundCTL instance. The max clients is based on concurrent connections and not the total amount of connections.</p>
						</div> 

						<div className="question-block">
							<h2 className="question">What forms of payments do you accept? </h2>
							<p className="answer">We accept all major credit cards (Visa, MasterCard, Discover and American Express), Bitcoin,  Apple Pay. </p>
						</div>

						<div className="question-block">
							<h2 className="question">Can I see my usage metrics?  </h2>
							<p className="answer"> Yes, at any time you’ll be able to see exactly the number of clients connected to your instance, bandwidth usage and active inputs/outputs. </p>
						</div> 

					</div> 

					<div className="question-column">
						<div className="question-block">
							<h2 className="question"> Can I upgrade, downgrade, or cancel my plan? </h2>
							<p className="answer">Yes. You can change your paid plan or even cancel at any time.</p>
						</div>
						<div className="question-block">
							<h2 className="question"> What happens if I exceed my monthly transfer limit? </h2>
							<p className="answer"> If you exceed the transfer limit of your plan, you’ll be charged $0.10 for each GB over your allowed quota. </p>
						</div> 
						<div className="question-block">
							<h2 className="question"> Still have a question? </h2>
							<p className="answer"> Please feel free to contact us at <a className="text row" href="mailto:support@soundctl.io?Subject=Help%20me!"> support@soundctl.io </a> and we’ll get back at you in no time :)</p>
						</div> 
					</div> 
				</div>
			</div>
		);
	}
}