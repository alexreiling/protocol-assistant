let workers = {}
async function loop(worker){
  let iteration = worker.counter++
  console.log(worker.id + '[' + iteration + ']: want to start')
  if(!worker.busy){
    worker.busy = true
    console.log(worker.id + '[' + iteration + ']: starting cycle')
    worker.task().then(()=>{
      worker.busy = false
      console.log(worker.id + '[' + iteration + ']: finished cycle')  
    }).catch(error => {
      worker.errorHandler ? worker.errorHandler(error) : console.log(error)
      worker.active = false
      worker.busy = false
    })
  }
  else{
    console.log(worker.id + '[' + iteration + ']: still busy')
  }
  if(worker.active) setTimeout(() => loop(worker),worker.options.timeout)
  else{
    console.log(worker.id + '[' + iteration + ']: terminating loop')      
  }
}
function get(workerId){
  let worker = workers[workerId]
  if(!worker) throw new Error(`Worker with id ${workerId} does not exist`)
  return worker
}
const Workers = {
  createWorker: (workerId, periodicTask, options, errorHandler, returnIfExists = false) => {
    let worker = workers[workerId]
    if (worker && returnIfExists) return worker 
    else if (worker) throw new Error(`Creation failed: Worker with id ${workerId} already exists`)
    workers[workerId] = {
      id: workerId,
      task: periodicTask,
      errorHandler: errorHandler,
      options: options,
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
  setTimeout: (workerId, timeout) => get(workerId).options.timeout = timeout    
  
}
Object.freeze(Workers)
export default Workers