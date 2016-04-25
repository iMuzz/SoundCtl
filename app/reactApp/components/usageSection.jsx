import React from         'react'

export class UsageSection extends React.Component {
  constructor(props) {
    super(props);
  }

  convertBytes(bytes){
   var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
   let answer;
   if (bytes === 0 || bytes === undefined) {
    answer = {
      amount: 0,
      unit: 'GB'
    }
    return answer;
   }
   var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
   answer = {
    amount: Math.round(bytes / Math.pow(1024, i), 2),
    unit: sizes[i]
   }
   return answer
  }

  render() {
    console.log("Rendering usage Section!", this.props);
    let transferUsed = this.convertBytes(this.props.transfer);
    let transferRemaining = this.convertBytes(53687091200 - this.props.transfer);
    let clientsUsed = this.props.clients;
    let clientsRemaining = 50 - this.props.clients;

    return  ( 
      <div className='dashboard-section'>
          <div className='container'>
              <h2> Monthly Usage </h2>
              <div className='usage-cards'>
                <UsageCard title='transfer' used={transferUsed.amount} remaining={transferRemaining.amount} unitUsed={transferUsed.unit + ' used'} unitRemaining={transferRemaining.unit + ' left'} uniqueId='circle-1' percentage={transferUsed.amount / transferRemaining.amount}></UsageCard>
                <UsageCard title='clients' used={clientsUsed} remaining={clientsRemaining} unitUsed={'Clients used'} unitRemaining={'Clients left'} uniqueId='circle-2' percentage={clientsUsed / clientsRemaining}></UsageCard> 
                { /** <UsageCard title='storage' used={2.5} remaining={47.5} unitUsed={'GB used'} unitRemaining={'GB left'} uniqueId='circle-3' percentage={.05}></UsageCard>  **/ }
              </div>
          </div>
      </div>
    );
  }
}

class UsageCard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    let id = '#' + this.props.uniqueId;
    let that = this;
     $(id).circleProgress({
          value: this.props.percentage,
          size: 200,
          startAngle: 0,
          lineCap: 'round',
          thickness: 10,
          emptyFill: '#FFE0D7',
          fill: {
              gradient: ['red', 'orange']
          }
      }).on('circle-animation-progress', function(event, progress) {
          $(this).find('strong').html(parseInt((that.props.percentage * 100) * progress) + '<i>%</i>');
      });
  }

  render() {
    return  ( 
      <div className='usage-card'>
          <div className='card-title'>
            <h3> {this.props.title} </h3>
            <div className='dots'>
              <div className='dot'></div>
            </div>
          </div>
          <div className='card-dash'></div>
          <div className='circle' id={this.props.uniqueId}>
            <div className='circle-content'>
              <strong className="inner-value">
              </strong>
              <span>Used</span>
            </div>
          </div>
          <div className='usage-stats'>
            <div className='usage-stat'> <span className='used' >{this.props.used}</span> <div className='stat-unit'> {this.props.unitUsed}</div></div>
            <div className='usage-divider'></div>
            <div className='usage-stat'> <span className='remaining'>{this.props.remaining}</span> <div className='stat-unit'> {this.props.unitRemaining}</div></div>
          </div>
      </div>  
    );
  }
}