import Store from "./MobxStore/index";
import {stores} from '../config'
import { isElectron, ipcRenderer, sendToMain } from "../util/electronHelpers";

console.warn('Required ConversationStore')

const {storeName,options,remoteMethods,workers} = stores.conversations
let store = new Store(storeName, options, remoteMethods, workers)
let conversations = {
  async createNewConversation(){
    let newConv = await store.createOne(null,true)
    console.log(store.getOne(newConv.conversationId))
    store.setSelected(newConv.conversationId)
    return newConv
  },

  getConversation(id){
    if(id) return store.getOne(id)
    return store.selected
  },
  setCustomer(customer){ store.selected.customer = customer },
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
      let response = await conversations.exec(action,args);
      if (respond) sendToMain('store-action-response', {response, originalParams})
    }
  })
}
export default conversations