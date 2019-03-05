import { observable, decorate, reaction } from "mobx";

class Note {
  constructor(data,store){
    this.setUncommitted = this.setUncommitted.bind(this)
    this.data = data
    this.localChange = false
    this.uncommittedChanges = false 
    reaction(
      () => {
        const {name,index,rawText} = this.data
        return {name,index,rawText}
      },
      data => {
        console.log('reaction')
        this.setUncommitted()
      }
    );
  }

  setCommitted(){
    this.uncommittedChanges = false
  }
  setUncommitted(){
    this.localChange = true;
    this.uncommittedChanges = true;
  }
  resetChangeFlags(){
    this.localChange = false;
    this.uncommittedChanges = false;
  }
}
decorate(Note,{
  data: observable,
  localChange: observable,
  uncommittedChanges: observable
})
export default Note