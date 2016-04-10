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
          </div>
      </div>
    );
  }
}