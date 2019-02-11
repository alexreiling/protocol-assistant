import Store from "./MobxStore/index";
import {stores} from '../config'
import { isElectron, ipcRenderer, sendToMain } from "../util/electronHelpers";

console.warn('Required ConversationStore')
const {storeName,options,remoteMethods,workers} = stores.conversations
let store = new Store(storeName, options, remoteMethods, workers)
let conversations = {
  async createNewConversation(){
    let newConv = await store.createOne(null,true)
    store.setSelected(newConv.conversationId)
    return newConv
  },

  getConversation(id){
    if(id) return store.get(id)
    return store.selected
  },
  getCustomers(){
    return store.selected ? store.selected.customers : []
  },
  getConcerns(){
    return store.selected.concerns
  },
  getSellingHints(){
    return store.selected.sellingHints
  },
  getNotes(){
    return store.selected.notes
  },
  exec(action,params){
    try{ return store[action](...params) }
    catch(error) { console.log(error) }
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