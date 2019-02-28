import React, { Component } from 'react';
import ipcMessage from './ipcMessage';
import Button from '../common/Button';
import { ipcRenderer } from '../../util/electronHelpers';

class Audio extends Component {
  constructor(props){
    super(props)
    this.state = {
      recorderState: ''
    }
  }
  componentDidMount(){
    this.setState({recorderState: ipcMessage('recorder-action',{respond: true, action: 'getState'})})
    ipcRenderer.on('recorder-state', async(e, {state}) => {
      console.log(state.text)
      this.setState({recorderState: state.text})
    })

  }
  render(){
    const {recorderState} = this.state
    return (
      <div>
        <Button 
          type='button'
          strong
          style={{marginRight:8}}
          onClick={() => ipcMessage('recorder-action',{action: 'startRecording'})}>
          Start Recording</Button>
        <Button 
          type='button'
          strong
          onClick={() => ipcMessage('recorder-action',{action: 'stopRecording'})}>
          Stop Recording</Button>
        <div style={{marginTop:'1em'}}>Recorder state: <b>{recorderState}</b></div>
      </div>
    )
  }
}

export default Audio;