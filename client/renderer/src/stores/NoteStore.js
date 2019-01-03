import { decorate, observable } from "mobx";

class Entry {
  constructor(entry){
    entry = entry || {}
    this.text = entry.text || 'Neuer Eintrag...';
  }
  setProp(name,value){
    this[name] = value
  }
}

decorate(Entry,{
  text: observable
})
class Note{
  constructor(item){
    this.label = item.label
    this.subline = ''
    this.entries = []
  }
  addEntry(){
    let entry = new Entry()
    this.entries.push(entry)
  }
  getEntries(){
    return this.entries
  }
}

decorate(Note,{
  entries: observable
})

class NoteStore{
  constructor() {
    this.notes = []
  }
  addNote(data){
    let note = new Note(data)
    this.notes.push(note)
  }
  getNotes(){
    return this.notes
  }
}
decorate(NoteStore,{
  notes: observable
})
export default NoteStore