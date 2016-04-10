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
              <ElapsedTime startTime={'Sat Apr 06 2016 04:05:09 GMT+0100 (CET)'}></ElapsedTime>
          </div>
      </div>
    );
  }
}