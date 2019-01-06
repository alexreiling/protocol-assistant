import { decorate, observable } from "mobx";
import { remoteNotes } from "./TransportLayer";
import shortId from 'shortid';
import { defaults } from "../config";

class Entry {
  constructor(entry, note){
    this.iid = shortId()
    this.note = note
    this.store = note.store;
    entry = entry || {}
    this.text = entry.text;
    this.deleted = false;
    this.converted = false;
  }
  setProp(name,value){
    this[name] = value
  }
  delete(){
    this.deleted = true;
  }
  convert(){
    this.store.convert(this)
    this.converted = true;
  }
}

decorate(Entry,{
  text: observable,
  deleted: observable,
  converted: observable
})
class Note{
  constructor(data, store, index){
    this.iid = shortId()
    this.index = index;
    this.store = store
    this.transactions = data.transactions || []
    this.entries = []
    this.text = data.text
    if(data.entries) data.entries.forEach(entry => this.addEntry(entry))
  }
  addEntry(data){
    let entry = new Entry(data,this)
    this.entries.push(entry)
  }
  setProp(name,value) {
    this[name]=value
  }
  changeIndex(incrOrDecr){
    this.store.changeIndex(this,incrOrDecr)
  }
  getEntries(){
    return this.entries.filter(entry => !(entry.deleted || entry.converted))
  }
  getTransactions(){
    return this.transactions
  }
}

decorate(Note,{
  entries: observable,
  text: observable,
  index: observable
})

class NoteStore{
  constructor() {
    this.indexCounter = 0;
    this.notes = []
    this.remote = {
      get: remoteNotes.get
    }
  }
  async init() {
    let notes = await this.remote.get()
    notes.forEach(note => this.addNote(note));
  }
  addNote(data){
    let note = new Note(data,this,this.indexCounter++)
    this.notes.push(note)
  }
  changeIndex(noteA, incrOrDecr){
    if (noteA.index + incrOrDecr < 0 || noteA.index + incrOrDecr > this.indexCounter - 1) return
    let noteB = this.notes.find(b => b.index === noteA.index + incrOrDecr)
    noteB.index -= incrOrDecr
    noteA.index += incrOrDecr
    this.notes.replace(this.notes.slice().sort((a,b)=> a.index-b.index))
  }
  getNotes(){
    return this.notes
  }
  convert({text}) {
    this.addNote({text})
  }
}
decorate(NoteStore,{
  notes: observable,
  indexCounter:observable
})
export default NoteStore