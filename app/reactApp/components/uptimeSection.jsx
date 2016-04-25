import React from         'react';
import {ElapsedTime} from   './elapsedTime';

export class UptimeSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return  ( 
      <div className='dashboard-section'>
          <div className='container'>
              <h2> Instance Uptime </h2>
              <ElapsedTime startTime={this.props.startTime}></ElapsedTime>
          </div>
      </div>
    );
  }
}