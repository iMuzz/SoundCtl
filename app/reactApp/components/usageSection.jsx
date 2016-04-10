import React from                       'react'

export class UsageSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return  ( 
      <div className='usage-section'>
          <div>
              <h2> Monthly Usage </h2>
              <div className='usage-cards'>
                <UsageCard></UsageCard>
                <UsageCard></UsageCard>
                <UsageCard></UsageCard>
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

  render() {
    return  ( 
      <div className='usage-card'>
          Card
      </div>  
    );
  }
}