const STATE = {
  ERROR: {id:0, text: 'ERROR'},
  UNINITIALIZED: {id:1, text: 'UNINITIALIZED'},
  LAUNCHING: {id:2, text: 'LAUNCHING'},
  IDLE: {id:3, text: 'IDLE'},
  RECORDING: {id:4, text: 'RECORDING'},
  PAUSED: {id:5, text: 'PAUSED'},
  PROCESSING: {id:6, text: 'PROCESSING'}
}
const DEFAULTS = {
  bufferSize: 2048
}
class AudioRecorder{
  constructor(config){
    this.config = Object.assign(config,DEFAULTS)
    this._setState(STATE.UNINITIALIZED)
    this._data = []
    this._device = null
  }
  init() {
    navigator.mediaDevices.getUserMedia({audio:true}).then(stream => {
      this._stream = stream
      this._setState(STATE.IDLE);
    }).catch(error => {
      this._setState(STATE.ERROR, error.message)
    })
  }
  _setState(state,error = 'an error occured'){
    const {onError, onInit, onIdle, onRecording, onPaused, onProcessing, onStateChange} = this.config
    this._state = state
    switch(state){
      case STATE.ERROR: {
        if(this._context)this._context.close()
        this._error = error
        if(onError) onError(this.state, this._error);
        break;
      }
      case STATE.UNINITIALIZED: {
        break;
      }
      case STATE.LAUNCHING: {
        if(onInit) onInit(this.state);
        break;
      }
      case STATE.IDLE: {
        if(onIdle) onIdle(this.state);
        break;
      }
      case STATE.RECORDING: {
        if(onRecording) onRecording(this.state);
        break;
      }
      case STATE.PAUSED: {
        if(onPaused) onPaused(this.state);
        break;
      }
      case STATE.PROCESSING: {
        if(onProcessing) onIdle(this.state);
        break;
      }
      default: {
        break;
      }
    }
    if(onStateChange) onStateChange(this.state)
  }
  get state(){
    return Object.assign({},this._state)
  }
  _isStateOneOf(...states){
    return [...states].includes(this._state)  
  }
  _processAudio(e){
    const onData = this.config.onData
    const data = e.inputBuffer
    if(onData) onData(data,this.state)
  }
  startRecording(){
    if(this._isStateOneOf(STATE.UNINITIALIZED, STATE.LAUNCHING, STATE.PROCESSING, STATE.RECORDING)){
      return
    }
    if(this._isStateOneOf(STATE.IDLE, STATE.ERROR)){
      // start new recording
      let context = new AudioContext();
      this._context = context
      var source = context.createMediaStreamSource(this._stream);
      var recorder = context.createScriptProcessor(this.config.bufferSize, 1, 1);
      recorder.onaudioprocess = this._processAudio.bind(this)   
      recorder.connect(context.destination)   
      source.connect(recorder)
    }
    else if(this._isStateOneOf(STATE.PAUSED)) {
      // resume recording
      this._context.resume()
    }
    this._setState(STATE.RECORDING);
  }
  pauseRecording(){
    if(this._isStateOneOf(STATE.UNINITIALIZED, STATE.LAUNCHING, STATE.PROCESSING, STATE.PAUSED)){
      return
    }
    if(this._isStateOneOf(STATE.RECORDING)) {
      this._context.suspend()
      this._setState(STATE.PAUSED)
    }
  }
  stopRecording(){
    if(this._isStateOneOf(STATE.RECORDING,STATE.PAUSED)) {
      try{
        // TODO: process data
        this._context.close()
        this._setState(STATE.IDLE)
      }
      catch(error){
        this._setState(STATE.ERROR)
      }
    }
  }
  getState(){
    return this.state
  }
}

export default AudioRecorder