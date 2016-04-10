import React from         'react'

export class UsageSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return  ( 
      <div className='usage-section'>
          <div className='container'>
              <h2> Monthly Usage </h2>
              <div className='usage-cards'>
                <UsageCard title='transfer' uniqueId='circle-1' percentage={.75}></UsageCard>
                <UsageCard title='clients' uniqueId='circle-2' percentage={.33}></UsageCard> 
                <UsageCard title='storage' uniqueId='circle-3' percentage={.05}></UsageCard> 
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
            <div className='usage-stat'> <span className='used' >36.5</span> <div className='stat-unit'> GB Used</div></div>
            <div className='usage-divider'></div>
            <div className='usage-stat'> <span className='remaining'>13.5</span> <div className='stat-unit'> GB Used</div></div>
          </div>
      </div>  
    );
  }
}