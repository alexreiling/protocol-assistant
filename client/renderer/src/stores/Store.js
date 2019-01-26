import tl from './TransportLayer'
import { decorate, observable, computed } from 'mobx';
import Workers from '../util/workers';
import { stores } from '../config';
class Store {
  static instances = {}
  constructor(storeName,options){
    if(!storeName) throw new Error('Could not create store: storeName prop missing')
    if(! Store.instances[storeName]){
      // default props
      options = Object.assign(stores.defaultOptions, options)
      console.log(options)
      this.getDataFromRemote = this.getDataFromRemote.bind(this)
      this._worker = Workers.createWorker(this._storeName,options.pollingInterval,this.getDataFromRemote)
      this._data = [];
      this._storeName = storeName
      Store.instances[storeName] = this;
    }
   return Store.instances[storeName];
  }
  // remote
  async getDataFromRemote(){
    console.log('store',this)
    this._data = await tl.getList(this._storeName)
    console.log('finished')
  }
  async doSomething(){
    return new Promise((resolve,reject)=> setTimeout(()=>resolve(), 1000))
  }
  // local
  add(obj){
    if(!obj.key) throw new Error('Could not add object: key prop missing')
    this._data.set(obj.key,obj)
  }
  
  get data(){
    return [...this._data.values()]
  }
  get(key){
    return this._data.get(key)
  }
  remove(key){
    this._data.delete(key)
  }
  
  // control flow
  activatePolling(){
    this._worker.activate()
  }
  deactivatePolling(){
    this._worker.deactivate()    
  }
  setPollingTimeout(timeout){
    this._worker.setTimeout(timeout)
  }
}

decorate(Store,{
  _data: observable,
  data: computed
})
export default Store;
