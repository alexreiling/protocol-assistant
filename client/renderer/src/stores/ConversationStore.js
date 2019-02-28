import Store from "./MobxStore/index";
import {stores} from '../config'
import { isElectron, ipcRenderer, sendToMain } from "../util/electronHelpers";
import AudioRecorder from '../util/AudioRecorder'
import {convertFloat32ToInt16} from '../util'

console.warn('Required ConversationStore')

const {recorderOptions,storeName,options,remoteMethods,workers} = stores.conversations

let store = new Store(storeName, options, remoteMethods, workers)
let conversations = {
  recorder: new AudioRecorder({
    bufferSize: recorderOptions.bufferSize,
    onData:(audioBuffer, state) => {
      let ws = store._ws
      let arrayBuffer = convertFloat32ToInt16(audioBuffer.getChannelData(0))
      if(ws.readyState === ws.OPEN) ws.send(arrayBuffer)
    },
    onStateChange: (state,error) => sendToMain('recorder-state', {state,error})
  }),


  async createNewConversation(){
    this.recorder.init()
    let newConv = await store.createOne(null,true)
    store.setSelected(newConv[store._keyProp])
    return newConv
  },

  getConversation(id){
    if(id) return store.getOne(id)
    return store.selected
  },
  setCustomer(customer){
    store.freezeProp('customer') 
    store.selected.customer = customer
  },
  setConcern(concern){
    store.freezeProp('concern') 
    store.selected.concern = concern
  },
  getCustomer(){ return store.selected.customer},
  getCustomers(){ return store.selected.customerCandidates },
  getConcerns(){ return store.selected.concernCandidates },
  getSellingHints(){ return store.selected.sellingHints },
  
  // notes
  getNotes(){ return store.selected.notes },
  addNote(data){ 
    data.entries = []
    data.transactions = []
    let notes = this.getNotes()
    notes.push(data)
    notes.forEach((note,index) => note.index = index);
  },
  getHighestNoteIndex(){
    let notes = this.getNotes()
    return notes.length ? notes[notes.length-1].index : 0
  },
  getConversationState(){
    return store.state.conversationState
  },
  exec(action,params){
    try{ return store[action](...params) }
    catch(error) { console.log(error) }
  },
  changeNoteIndex(noteA, incrOrDecr){
    
    let notes = this.getNotes()
    if (noteA.index + incrOrDecr < 0 || noteA.index + incrOrDecr > this.getHighestNoteIndex()) return
    let noteB = notes.find(b => b.index === noteA.index + incrOrDecr)
    if(noteB){
      noteA.savePending = true
      noteB.savePending = true
      noteB.index -= incrOrDecr
      noteA.index += incrOrDecr
      notes.replace(notes.slice().sort((a,b)=> a.index-b.index))
    }
  },
  convert({text}) {
    //this.addNote({text})
  }
}
if(isElectron){
  ipcRenderer.on('store-action', async(e, originalParams) => {
    const { store, args = {}, action, respond = false} = originalParams
    if(store==='conversations') {
      console.log('store:',store,'action:',action,'args:',args, 'requesting response:', respond)
      let response = conversations[action] ? await conversations[action](...args) : await conversations.exec(action,args);
      if (respond) sendToMain('store-action-response', {response, originalParams})
    }
  })
  ipcRenderer.on('recorder-action', async(e, originalParams) => {
    const {args = {}, action, respond = false} = originalParams
    console.log('recorder action:',action,'args:',args, 'requesting response:', respond)
    let response = conversations.recorder[action] ? await conversations.recorder[action](...args) : null;
    //if (respond) sendToMain('recorder-state', {response})
  })

}
export default conversations