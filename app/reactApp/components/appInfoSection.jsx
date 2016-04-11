import React from         'react';

export class AppInfoSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return  ( 
      <div className='dashboard-section'>
          <div className='container'>
              <h2> App Information </h2>
          </div>
      </div>
    );
  }
}