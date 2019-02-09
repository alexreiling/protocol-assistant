import { decorate, observable, computed } from 'mobx';
import { workers } from '@alexreiling/utilities';
import { defaultConfig } from './defaultConfig';
import httpRequest from './httpRequest'
class Store {
  static instances = {}
  constructor(storeName,options = {},remoteMethods = {}){
    if(!storeName) throw new Error('Could not create store: storeName prop missing')
    if(! Store.instances[storeName]){
      // default props
      this._selected = null
      options = Object.assign(defaultConfig.options, options)
      this._remote = remoteMethods
      this._data = new Map();
      this._storeName = storeName
      Store.instances[storeName] = this;
    }
   return Store.instances[storeName];
  }
  // remote
  async remote(method, body){
    if(!this._remote[method]) throw new Error(`cannot execute remote request without ${method} config`)
    return httpRequest(this._remote[method], body)
  }

  // local
  async createOne(obj, keyPropName, createRemote){
    // TODO: key conflicts, try-catch?
    
    if(createRemote){
      console.log('create remote')
      let newObject = await this.remote('createOne',obj)
      console.log('test')
      this._data.set(newObject[keyPropName],newObject)
      return newObject
    }
    else {
      this._data.set(obj[keyPropName],obj)
      return obj
    }
  }

  get data(){
    return [...this._data.values()]
  }
  getOne(key){
    return this._data.get(key)
  }
  remove(key){
    this._data.delete(key)
  }
  setSelected(id){
    this._selected = this.getOne(id)
  }
  get selected(){
    return this._selected
  }

  getFullWorkerName(workerId){ return this._storeName + '_' + workerId}
  // worker control flow
  createWorker(workerId,timeout,callback){
    workers.createWorker(this.getFullWorkerName(workerId),timeout,callback)
  }
  activateWorker(workerId){
    workers.activate(this.getFullWorkerName(workerId))
  }
  deactivateWorker(workerId){
    workers.deactivate(this.getFullWorkerName(workerId))    
  }
  setWorkerTimeout(workerId,timeout){
    workers.setTimeout(this.getFullWorkerName(workerId),timeout)
  }
  getWorker(workerId) {
    return workers.getWorker(this.getFullWorkerName(workerId))
  }

}

decorate(Store,{
  _data: observable,
  _selected:observable,
  data: computed
})
export default Store;
