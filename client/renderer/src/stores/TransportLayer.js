import {notes} from '../data/dummy'

export const remoteNotes = {
  get: async() => {
    return new Promise((resolve,reject) => setTimeout(() => resolve(notes),1000))
  }
} 