import { conversation } from '../data/update';
import shortId from 'shortid';


async function dummyRequest(data, delay = 500, failureProb = 0) {
  return new Promise((resolve,reject)=> {
    setTimeout(() => {
      return (Math.random() < failureProb) 
        ? reject(new Response(JSON.stringify({msg: 'dummy request failed'}),{status:400})) 
        : resolve(new Response(JSON.stringify(data),{status:200}))
    }, delay)
  })
}
function dummyConversation(localConv){
  let dummy = Object.assign({},conversation)
  let limit1 = Math.random() * dummy.customerCandidates.length - 1
  let limit2 = Math.random() * dummy.customerCandidates.length - 1
  let notes = new Map(dummy.notes.topics.map(note => [note.id,note]))
  localConv.notes.topics.forEach(note => notes.set(note.id,note))
  dummy.notes.topics = [...notes.values()]
  dummy.customer = localConv.customer
  dummy.customerCandidates = conversation.customerCandidates.slice(Math.min(limit1,limit2), Math.max(limit1,limit2))
  return dummy
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
        callback: async(store) => store.updateSelected()
      }
    }, 
    remoteMethods: {
      createOne: {
        url: 'http://localhost:8082/create',
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
        /*override: (url,fetchOptions,body) => dummyRequest({
          state:{
            conversationState: 'APPROVAL_PENDING'
          },
          conversationId: shortId(),
          concernCandidates: [],
          customerCandidates: [],
          notes: [],
          sellingHints: []
        },1000),*/
        postProcessor: (conv, response) => {
          // TODO: improve for better performance
          conv.sellingHints = conv.sellingHints.sellingHints
          conv.notes = conv.notes.topics
          return conv
        }
      },
      createMany: {
        disabled: true
      },
      getMany:{
        disabled: true
      },
      updateOne: {
        url: 'http://localhost:8082/update',
        init: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'uselessHeader': 1
          }
        },
        mode: 'cors',
        afterPickup: (store) => {
          if(store.selected)store.selected.notes.forEach(note => note.savePending = false)
        },
        preProcessor: (conv) => {
          // make changes to body here before fetch/override
          const {notes, sellingHints} = conv
          notes.forEach(note => { note.name = note.text })
          
          conv = Object.assign(conv,{
            notes: {topics: notes},
            sellingHints: {sellingHints}})
          return conv
        },
        /*override: (data, req) => {
          console.log(data.notes)
          return dummyRequest(dummyConversation(data),1000)
        },*/
        postProcessor: (conv, res, store) => {
          // TODO: improve for better performance
          console.log(conv)
          let unsavedNotes = new Map(store.selected.notes.filter(note => note.savePending).map(note => [note.id,note]))
          conv.notes = conv.notes.topics.map((note) => {
            let unsavedNote = unsavedNotes.get(note.id)
            if (unsavedNote) note = unsavedNote
            else {
              note.text = note.name
              note.entries = note.entries || [ note.content && {text:note.content}]
              note.transactions = []
            }
            return note
          })
          conv.sellingHints = conv.sellingHints.sellingHints
          return conv
        }
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