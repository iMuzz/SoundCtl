import React from         'react';

export class Countdown extends React.Component {
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
		this.interval = setInterval(this.updateRemaingTime, 1000);
	}

	componentWillUnmount(){
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