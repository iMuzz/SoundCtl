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
              <div className='info-table'>
                <div className='row'>
                  <div className='label'> API Key</div>
                  <div className='content'> <input type="text" value='eysOsr4UAEYqWlqq-asRyxMh0j-T8EWPV_C9vOoe-DWUXs2Z8TdTGoEjuJ1BuzAF'/> </div>
                </div>
                <div className='row'>
                  <div className='label'> API Endpoint</div>
                  <div className='content'> <input type="text" value='https://coconut.soundctl.io'/> </div>
                </div>
                <div className='row'>
                  <div className='label'> Instance ID</div>
                  <div className='content'><input type="text" value='coconut'/> </div>
                </div>
              </div>
          </div>
      </div>
    );
  }
}