import { decorate, observable } from "mobx";
import shortId from 'shortid';
import {Note as NoteDict} from "../config/dictionary";
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
    this.addEntry({text:data.content})
    this.text = data[NoteDict.text]
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

export default Note
