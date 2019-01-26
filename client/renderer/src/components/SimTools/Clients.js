import React,{Component} from 'react';

import InputWithButton from '../abstract/InputWithButton';
import { Control, Label } from './Layout';
import ToggleSwitch from '../common/ToggleSwitch';
import { ipcRenderer } from '../../util/electronHelpers';
import { stores } from '../../config';

function storeAction(params){
  params.store = 'clients'
  ipcRenderer.send('store-action',params)
}


class Clients extends Component {
  constructor(){
    super()
    this.state = {
      timeout: stores.clients.options.pollingInterval || stores.defaultOptions.pollingInterval
    } 
  }
  handleChange(name, value, action){
    this.setState({[name]: value})
    if(action) storeAction({
      action: action,
      params: [value]
    })

  }
  render(){
    return (
      <React.Fragment>
        <Control style={{}}>
          <Label>Backend Polling</Label> 
          <ToggleSwitch
            onChange={(checked)=> storeAction({
            action: checked ? 'activatePolling': 'deactivatePolling'})}/>
        </Control>
        <Control style={{}}>
          <Label>Polling Intervall</Label> 
          <InputWithButton placeholder='Intervall in ms' width={75} buttonText='OK' value={this.state.timeout} onSubmit={(value)=>this.handleChange('timeout', parseInt(value,10), 'setPollingTimeout')}/>
        </Control>
      </React.Fragment>
    );
  }
}

export default Clients;