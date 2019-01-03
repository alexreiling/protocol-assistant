import { decorate, observable } from "mobx";

class Item {
  constructor(item){
    this.text = item.text;
  }
}
class Note{
  constructor(item){
    this.label = item.label
    this.subline = ''
    this.items = []
  }
  addItem(){
    let item = new Item()
    this.items.push(item)
  }
}

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