import React,{Component} from 'react';

import InputWithButton from '../abstract/InputWithButton';
import { Control, Label } from './Layout';
import ToggleSwitch from '../common/ToggleSwitch';
import { sendToMain } from '../../util/electronHelpers';
import { stores } from '../../config';
const {updateSelected: workerUpdateSelected} =stores.conversations.workers
function ipcMessage(message,params){
  params.store = 'conversations'
  sendToMain(message,params)
}


class Clients extends Component {
  constructor(){
    super()

  }

  render(){
    const initialTimeout = workerUpdateSelected.timeout || stores.defaultOptions.workers.timeout
    return (
      <React.Fragment>
        <Control style={{}}>
          <Label>Backend Polling</Label> 
          <ToggleSwitch
            onChange={(checked)=> ipcMessage('store-action',{
            action: checked ? 'activateWorker': 'deactivateWorker',
            args:[workerUpdateSelected.workerId]})}/>
        </Control>
        <Control style={{}}>
          <Label>Polling Intervall</Label> 
          <InputWithButton 
            placeholder='Intervall in ms'
            name='timeout'
            width={75} 
            buttonText='OK' 
            initValue={initialTimeout}
            onSubmit={(value) => ipcMessage('store-action',{
              action: 'setWorkerTimeout',
              args: [workerUpdateSelected.workerId, value]
            })}/>
        </Control>
        <button type='button' onClick={()=>ipcMessage('store-action',{
          action: 'getWorker',
          args: [workerUpdateSelected.workerId],
          respond: true
        })}>Send Worker State Request</button>
      </React.Fragment>
    );
  }
}

export default Clients;