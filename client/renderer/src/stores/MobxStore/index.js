import { decorate, observable } from 'mobx';
import { defaultConfig } from './defaultConfig';
import httpRequest from './httpRequest'
import  workers  from  '../../util/workers'


class Store {
  static instances = {}
  constructor(storeName, options = {}, remoteMethods = {}, workerConfigs = {}){
    if(!storeName) throw new Error('Could not create store: storeName prop missing')
    if(! Store.instances[storeName]){
      this._data = new Map();
      this._selected = null
      this._storeName = storeName      
      this._options = Object.assign(defaultConfig.options, options)
      this._keyProp = this._options.keyProperty
      this._remote = remoteMethods
      this._protectedProps = {}

      // webSocket
      //this._ws = this._options.wsUrl ? new WebSocket(this._options.wsUrl) : null

      // workers
      Object.keys(workerConfigs).forEach(workerId => {
        let worker = workerConfigs[workerId] 
        const cbWithStore = () => worker.callback(this)
        this.createWorker(worker.workerId, cbWithStore, worker.options)
      })

      Store.instances[storeName] = this;
    }
   return Store.instances[storeName];
  }
  // remote
  async remote(method, data, checkAutoFire){
    if(!this._remote[method]) return data
    if (checkAutoFire && !this._remote[method].autoFire) return data
    return httpRequest(this._remote[method], data, this)
  }

  async reopenWebsocket(){
    if (undefined != this._ws){
      this._ws.close()
    }
    this._ws = new WebSocket(this._options.wsUrl)
  }


  // local
  async createOne(localData = {}, ignoreRemote = false){
    // TODO: key conflicts, try-catch?
    let remoteData = await this.remote('createOne',localData,true)
    this._data.set(remoteData[this._keyProp],remoteData)
    return remoteData
  }
  async createMany(localDataArray=[], ignoreRemote = false){
    let remoteDataArray = await this.remote('createMany',localDataArray,true)
    // TODO: make non-blocking
    for(let i = 0; i < remoteDataArray.length; i++) {
      this.createOne(remoteDataArray[i],ignoreRemote);
    }
    return remoteDataArray
  }
  getOne(key){
    return this._data.get(key)
  }
  async updateOne(item){
    let prevObj = this.getOne(item[this._keyProp])
    let updatedObj = await this.remote('updateOne', item).catch(error => {
      console.log(error)
      return prevObj
    })
    if(prevObj) {
      Object.keys(this._protectedProps).forEach(key => {
        if(this._protectedProps[key]) updatedObj[key] = prevObj[key]
      })
    }
    this._data.set(updatedObj[this._keyProp], updatedObj)
    return updatedObj
  }
  async updateSelected(){
    if (!this.selected) return null
    let updatedObj = await this.updateOne(this.selected)
    this.setSelected(updatedObj[this._keyProp])
    return updatedObj
  }
  async getMany(){
    let remoteDataArray = await this.remote('getMany')
    if (remoteDataArray) {
      this._data = new Map()
      return this.createMany(remoteDataArray)
    }
    return [...this._data.values()]
  }
  deleteOne(key){
    const {softDelete,softDeleteProperty} = this._options
    if(softDelete) this._data.get(key)[softDeleteProperty] = true
    else this._data.delete(key)
  }
  
  deleteMany(localDataArray=[], ignoreRemote = false){
    throw new Error('Not implemented')
  }
  setSelected(id){
    this._selected = this.getOne(id)
  }
  get selected(){
    return this._selected
  }

  getFullWorkerName(workerId){ return this._storeName + '_' + workerId}
  // worker control flow
  createWorker(workerId,callback, options){
    return workers.createWorker(this.getFullWorkerName(workerId),callback,options)
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

  freezeProp(propName){
    this._protectedProps[propName] = true
  }
  unfreezeProp(propName) {this._protectedProps[propName] = false}
  unfreezeAllProps(){this._protectedProps = {}}
}

decorate(Store,{
  _data: observable,
  _selected:observable
})
export default Store;
