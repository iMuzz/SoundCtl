import React from         'react';
import AppDispatcher from '../dispatcher/AppDispatcher';

export class AppInfoSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegenerate = this.handleRegenerate.bind(this);
  }

  handleRegenerate(){
    console.log("handleRegenerate!");
    AppDispatcher.dispatch({
      actionType: 'REGENERATE_API_KEY'
    });
  }

  render() {
    return  ( 
      <div className='dashboard-section'>
          <div className='container'>
              <h2> App Information </h2>
              <div className='info-table'>
                <div className='row'>
                  <div className='label'> API Key</div>
                  <div className='content'>
                    <div className='input-container'>
                      <input type="text" readOnly value={this.props.apiKey}/>
                      <div className='cta' onClick={this.handleRegenerate}> Regenerate</div>
                    </div>
                    <div className='copy'> </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='label'> API Endpoint</div>
                  <div className='content'> 
                    <input type="text" readOnly value={'https://'+ this.props.instanceID+'.soundctl.io'}/>
                    <div className='copy'> </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='label'> Instance ID</div>
                  <div className='content'> 
                    <input type="text" readOnly value={this.props.instanceID}/> 
                    <div className='copy'> </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    );
  }
}