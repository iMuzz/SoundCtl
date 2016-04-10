import React from         'react'

export class UptimeSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return  ( 
      <div className='dashboard-section'>
          <div className='container'>
              <h2> Instance Uptime </h2>
              <ElapsedTime startTime={'Sat Apr 06 2016 04:05:09 GMT+0100 (CET)'}></ElapsedTime>
          </div>
      </div>
    );
  }
}

class ElapsedTime extends React.Component {
  constructor(props) {
    super(props);

    this.getTimeElapsed = this.getTimeElapsed.bind(this);
    this.updateRemaingTime = this.updateRemaingTime.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.componentWillUnmount = this.componentWillUnmount.bind(this);

    this.state = this.getTimeElapsed();
  }
  updateRemaingTime(){
    this.setState(this.getTimeElapsed());
  }
  getTimeElapsed(){
    let startTime = new Date(this.props.startTime);
    let endTime = new Date();
    let timeDiff = endTime - startTime;

    let seconds = Math.floor((timeDiff / 1000) % 60);
    let minutes = Math.floor((timeDiff / 1000 / 60) % 60);
    let hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
    let days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    
    var answer = {
      'total': timeDiff,
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
      <div className='elapsed-time'>
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