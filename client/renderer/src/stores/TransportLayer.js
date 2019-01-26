import {notes} from '../data/dummy'
import clients from '../data/clients'

export const remoteNotes = {
  get: async() => {
    return new Promise((resolve,reject) => setTimeout(() => resolve(notes),1000))
  }
}
const range = 50;
let offset = 0;
function getSection(limit){
  if (offset + range > limit) offset = 0
  const section = {lower:offset, upper:offset + range}
  offset += range
  return section
}
const config = {
  clients: {
    getList: {
      override: async() => new Promise((resolve,reject) => setTimeout(()=>{
        const {lower,upper} = getSection(clients.length)
        return resolve(clients.slice(lower,upper))},25)),
      url: '/',
      method: 'GET',
      headers: [],
      processor: (items) => items 
    }
  }
}

async function performRequest(storeName,requestType,params){
  console.log('requesting: ',storeName,requestType,params)
  if(!config[storeName]) return null
  if(!config[storeName][requestType]) return null

  const request = config[storeName][requestType]
  if(request.override) return request.override()
  else{
    throw new Error('Not implemented')
  }
}
export default {
  getList: async(storeName) => performRequest(storeName, 'getList')
}