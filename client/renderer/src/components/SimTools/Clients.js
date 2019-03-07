import React,{Component} from 'react';

import InputWithButton from '../abstract/InputWithButton';
import { Control, Label } from './Layout';
import ToggleSwitch from '../common/ToggleSwitch';
import { stores } from '../../config';
import ipcMessage from './ipcMessage';
const {updateSelected: workerUpdateSelected} =stores.conversations.workers



class Clients extends Component {

  render(){
    const initialTimeout = workerUpdateSelected.timeout
    return (
      <React.Fragment>
        <Control style={{}}>
          <Label>Updates vom Server</Label> 
          <ToggleSwitch
            onChange={(checked)=> ipcMessage('store-action',{
            action: checked ? 'activateWorker': 'deactivateWorker',
            args:[workerUpdateSelected.workerId]})}/>
        </Control>
       {/* <Control style={{}}>
          <Label>Update Intervall</Label> 
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
        </Control> }
        <button type='button' onClick={()=>ipcMessage('store-action',{
          action: 'getWorker',
          args: [workerUpdateSelected.workerId],
          respond: true
        })}>Send Worker State Request</button>*/}
      </React.Fragment>
    );
  }
}

export default Clients;