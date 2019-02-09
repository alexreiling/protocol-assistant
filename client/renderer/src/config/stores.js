import clients from "../data/clients";
import {concerns, sellingHints} from '../data/dummy';
import shortId from 'shortid';


async function dummyRequest(data, manipulator = (data) => data, delay = 500, failureProb = 0) {
  return new Promise((resolve,reject)=> {
    setTimeout(() => {
      return (Math.random() < failureProb) ? reject({status: 400, msg: 'dummy request failed'}) : resolve({status: 200, body: manipulator(data)})
    }, delay)
  })
}
function dummyConversation(){
  let limit1 = Math.random() * clients.length - 1
  let limit2 = Math.random() * clients.length - 1
  return {
    customers: clients.slice(Math.min(limit1,limit2), Math.max(limit1,limit2)),
    concerns: concerns,
    sellingHints: sellingHints,
    notes: []
  }
}
export const stores = {
  conversations: {
    storeName: 'clients',
    workers:{
      updateSelected: {
        workerId: 'updateSelected',
        timeout: 2000,
      }
    }, 
    remoteMethods: {
      createOne:{
        method: 'POST',
        endpoint: '/create',
        override: (reqData) => dummyRequest({converationId: shortId()},data=>data,3000),
        postProcessor: (resData) => resData.body 
      },
      getMany:{

      },
      getOne:{
        method: 'GET',
      },
      updateOne: {
        method: 'PUT',
        endpoint: '/update',
        override: (reqData) => dummyRequest(dummyConversation()),
        postProcessor: (resData) => resData.body
      }
    }
  },
  clients: {
    storeName: 'clients',
    options: {
      timeout: 1000
    }
  },
  defaultOptions: {
    workers: {
      timeout: 2000
    }
  }
}
export default stores