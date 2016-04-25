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
                  <div className='content'> <input type="text" readOnly value={this.props.apiKey}/> </div>
                </div>
                <div className='row'>
                  <div className='label'> API Endpoint</div>
                  <div className='content'> <input type="text" readOnly value={'https://'+ this.props.instanceID+'.soundctl.io'}/> </div>
                </div>
                <div className='row'>
                  <div className='label'> Instance ID</div>
                  <div className='content'><input type="text" readOnly value={this.props.instanceID}/> </div>
                </div>
              </div>
          </div>
      </div>
    );
  }
}