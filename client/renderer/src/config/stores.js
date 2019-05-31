import { conversation } from '../data/update';
import Note from '../stores/Note';
import shortId from 'shortid'

async function dummyRequest(data, delay = 500, failureProb = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return (Math.random() < failureProb)
        ? reject(new Response(JSON.stringify({ msg: 'dummy request failed' }), { status: 400 }))
        : resolve(new Response(JSON.stringify(dummyConversation(data)), { status: 200 }))
    }, delay)
  })
}
function dummyConversation(localConv) {
  let dummy = Object.assign({}, conversation)
  let limit1 = Math.random() * dummy.customerCandidates.length - 1
  let limit2 = Math.random() * dummy.customerCandidates.length - 1
  let notes = new Map(dummy.notes.topics.map(note => [note.id, note]))
  localConv.notes.topics.forEach(note => notes.set(note.id, note))

  dummy.notes.topics = [...notes.values()]
  dummy.customer = localConv.customer
  dummy.customerCandidates = conversation.customerCandidates.slice(Math.min(limit1, limit2), Math.max(limit1, limit2))
  return dummy
}

export const stores = {
  conversations: {
    storeName: 'conversations',
    options: {
      keyProperty: "conversationId",
      softDelete: true,
      softDeleteProperty: 'deleted',
      wsUrl: 'ws://localhost:8082/audio'
    },
    recorderOptions: {
      bufferSize: 8192
    },
    workers: {
      updateSelected: {
        workerId: 'updateSelected',
        options: {
          timeout: 2000
        },
        callback: async (store) => store.updateSelected()
      }
    },
    remoteMethods: {
      createOne: {
        url: 'https://elisa.iao.fraunhofer.de/create',
        //url: 'http://localhost:8082/create',

        // fetch init object: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
        init: {
          method: 'POST',
          headers: {
            'uselessHeader': 1
          },
          mode: 'cors'
        },

        // if true: create remotely => add locally
        autoFire: true,
        // if set, the provided method will be called instead of fetch
        /*  override: (url, fetchOptions, body) => dummyRequest({
           state: {
             conversationState: 'APPROVAL_PENDING'
           },
           conversationId: shortId(),
           concernCandidates: [],
           customerCandidates: [],
           notes: [],
           sellingHints: {
             sellingHints: [],
             unseenCounter: 5
           }
         }, 1000), */
      },
      createMany: {
        disabled: true
      },
      getMany: {
        disabled: true
      },
      updateOne: {
        url: 'https://elisa.iao.fraunhofer.de/update',
        //url: 'http://localhost:8082/update',
        init: {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          mode: 'cors'
        },
        mode: 'cors',
        afterPickup: (store) => {
          if (store.selected) store.selected.notes.topics.forEach(note => note.setCommitted())
        },
        // make changes to body here before fetch/override
        preProcessor: (conv) => {
          conv.notes.topics = conv.notes.topics.map(note => note.data)
          return conv
        },
        /* override: (data, req) => {
          return dummyRequest(dummyConversation(data),1000)
        }, */
        postProcessor: (conv, res, store) => {
          // TODO: maybe improve for better performance
          // TODO: remove after fix in backend
          conv.notes.topics.sort((a, b) => a.index - b.index).forEach((note, index) => note.index = index)

          // protect uncommitted (to backend) local changes from being overridden by backend data
          let updatedNotes = conv.notes.topics.map(note => new Note(note))
          let uncommittedNotes = store.selected.notes.topics.filter(note => note.uncommittedChanges)
          uncommittedNotes.forEach(uncommittedNote => {
            let found = false
            for (let i = 0; i < updatedNotes.length; i++) {
              if (updatedNotes[i].data.id === uncommittedNote.data.id) {
                updatedNotes[i] = uncommittedNote
                found = true;
                break;
              }
            }
            if (!found) updatedNotes.push(uncommittedNote)
          })
          conv.notes.topics = updatedNotes;
          /*          conv.notes.topics = conv.notes.topics.map((noteData) => {
                     return uncommittedNotes.get(noteData.id) || new Note(noteData)
                   }) */

          let seenHints = store.selected.sellingHints.sellingHints.filter(hint => hint.seen).map(hint => hint.name)
          let unseenCounter = 0
          conv.sellingHints.sellingHints.forEach(hint => {
            if (seenHints.includes(hint.name)) hint.seen = true
            if (!hint.seen) unseenCounter++
          })
          conv.sellingHints.unseenCounter = unseenCounter
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