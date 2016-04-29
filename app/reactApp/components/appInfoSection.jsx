import React from         'react';
import AppDispatcher from '../dispatcher/AppDispatcher';
import clipboard from 'clipboard';
import ReactTooltip from 'react-tooltip'

export class AppInfoSection extends React.Component {
  constructor(props) {
    super(props);
    this.handleRegenerate = this.handleRegenerate.bind(this);
  }


  componentDidMount() {
    new clipboard('#copy-key');
    new clipboard('#copy-endpoint');
    new clipboard('#copy-instance');
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
                      <input type="text" id='apiKey' value={this.props.apiKey}/>
                      <div className='cta' onClick={this.handleRegenerate}> Regenerate</div>
                    </div>
                    <div data-tip="Copy to clipboard" className='copy' id='copy-key' data-clipboard-target="#apiKey" > </div>
                    <ReactTooltip place="bottom" type="dark" effect="solid"/>
                  </div>
                </div>
                <div className='row'>
                  <div className='label'> API Endpoint</div>
                  <div className='content'> 
                    <input type="text" id='apiEndpoint' readOnly value={'https://'+ this.props.instanceID+'.soundctl.io'}/>
                    <div data-tip="Copy to clipboard" className='copy' id='copy-endpoint' data-clipboard-target='#apiEndpoint'> </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='label'> Instance ID</div>
                  <div className='content'> 
                    <input type="text" id='instanceID' readOnly value={this.props.instanceID}/> 
                    <div data-tip="Copy to clipboard" className='copy' id='copy-instance' data-clipboard-target='#instanceID'> </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    );
  }
}

class CopyButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return  ( 
       <div className='copy' id='copy' data-clipboard-target="#foo" > </div>
    );
  }
}