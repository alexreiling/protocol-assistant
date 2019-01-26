
let workers = {}
function loop(worker){
  let id = worker.counter++
  console.log('[' + id + ']: want to start')
  if(!worker.busy){
    worker.busy = true
    console.log('[' + id + ']: starting cycle')
    //await this.getListRemote()
    worker.task().then(()=>{
      worker.busy = false
      console.log('[' + id + ']: finished cycle')  
    }).catch(error => {
      worker.errorHandler ? worker.errorHandler(error) : console.log(error)
      worker.busy = false
    })
  }
  else{
    console.log('[' + id + ']: still busy')
  }
  console.log('carrying on')
  if(worker.active) setTimeout(() => loop(worker),worker.timeout)
  else{
    console.log('[' + id + ']: terminating loop')      
  }
}
function get(workerId){
  let worker = workers[workerId]
  if(!worker) throw new Error(`Worker with id ${workerId} does not exist`)
  return worker
}
const Workers = {
  createWorker: (workerId, timeout, periodicTask, errorHandler) => {
    if (workers[workerId]) throw new Error(`Creation failed: Worker with id ${workerId} already exists`)
    workers[workerId] = {
      id: workerId,
      task: periodicTask,
      errorHandler: errorHandler,
      timeout: timeout,
      counter: 0,
      active: false,
      busy: false,
      activate: () => Workers.activate(workerId),
      deactivate: () => Workers.deactivate(workerId),
      setTimeout: (timeout) => Workers.setTimeout(workerId,timeout)
    }
    return workers[workerId]
  },
  getWorker: (workerId) => get(workerId),
  activate: (workerId) => {
    let worker = get(workerId)
    if(!worker.active) {
      worker.active = true
      loop(worker)      
    }
  },
  deactivate: (workerId) => {
    get(workerId).active = false
  },
  setTimeout: (workerId, timeout) => get(workerId).timeout = timeout
}
Object.freeze(Workers)
export default Workers