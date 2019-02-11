import clients from "../data/clients";
import {concerns, sellingHints} from '../data/dummy';
import shortId from 'shortid';


async function dummyRequest(data, manipulator = (data) => data, delay = 500, failureProb = 0) {
  return new Promise((resolve,reject)=> {
    setTimeout(() => {
      return (Math.random() < failureProb) 
        ? reject(new Response(JSON.stringify({msg: 'dummy request failed'}),{status:400})) 
        : resolve(new Response(JSON.stringify(manipulator(data)),{status:200}))
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
    storeName: 'conversations',
    options: {
      keyProperty: "conversationId",
      softDelete: true,
      softDeleteProperty: 'deleted'
    },
    workers:{
      updateSelected: {
        workerId: 'updateSelected',
        options: {
          timeout: 2000
        },
        callback: async(store) => {
          let item = await store.remote('updateOne',store.selected)
          store._data.set(item.conversationId, item)
          store.setSelected(item.conversationId)
        }
      }
    }, 
    remoteMethods: {
      createOne: {
        url: '/create',
        // fetch init object: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
        init:{
          method: 'POST',
          headers: {
            'uselessHeader': 1
          },
          mode: 'cors'
        },
        // if true: create remotely => add locally
        autoFire: true,
        // if set, the provided method will be called instead of fetch
        override: (url,fetchOptions,body) => dummyRequest({converationId: shortId()},undefined,5000),
        postProcessor: (data, response) => data
      },
      createMany: {
        disabled: true
      },
      getMany:{
        disabled: true
      },
      updateOne: {
        url: '/update',
        init: {
          method: 'PUT'
        },
        preProcessor: (storeData) => {
          let bodyData = storeData
          // make changes to body here
          return bodyData
        },
        override: (data, req) => dummyRequest(dummyConversation(),undefined,5000),
        postProcessor: (data, res) => data
      },
      updateMany: {
        disabled: true
      },
      deleteOne: {
        autoFire: true,
        disabled: true
      },
      deleteMany: {
        disabled: true
      }
    }
  }
}
export default stores