import React, { Component } from 'react';
import styled from 'styled-components';
import AudioRecorder from '../../../util/AudioRecorder';
import { convertFloat32ToInt16 } from '../../../util';
class ProtocolPage extends Component {
  constructor(props){
    super();
    this.stop = this.stop.bind(this)
    this.data = []
    this.state = {
      recorderState: '',
      recorderError: ''
    }

  }
  componentDidMount(){
    this.recorder = new AudioRecorder({
      bufferSize: 4096,
      onStateChange: (state) => this.setState({recorderState: state.text}),
      onError: (state, error) => this.setState({recorderState: state.text, recorderError: error}),
      onData:(audioBuffer, state) => {
        let arrayBuffer = convertFloat32ToInt16(audioBuffer.getChannelData(0))
        console.log(new Uint16Array(arrayBuffer).reduce((acc,a)=>acc+a))
        this.data.push(arrayBuffer)
      }
    })
    this.recorder.init()

  }
  stop(){
    this.recorder.stopRecording()
    console.log(this.data)
  }
  render() {
    const {recorderState, recorderError} = this.state
    return (
      <div>
        <div>Recorder State: {recorderState}</div>
        {recorderError && <div>{recorderError}</div>}
        <button type='button' onClick={()=>this.recorder.startRecording()}>Record</button>
        <button type='button' onClick={()=>this.recorder.pauseRecording()}>Pause</button>
        <button type='button' onClick={this.stop}>Stop</button>
      </div>
    );
  }
}

export default ProtocolPage;