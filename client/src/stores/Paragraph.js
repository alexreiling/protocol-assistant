import { decorate, observable, computed, toJS } from "mobx";

class Paragraph{
  constructor(id,text,party){
    this.id = id
    this.party = party || 0
    this.text = text || ''
    this.markup = []
  }
  setProp(name, value){
    this[name] = value;
  }
  setMarkup(keywords){
    if(keywords){
      this.markup.clear();
      var term = keywords.reduce((result,current) => result + current + '|','\\b(?:')
      const regex = new RegExp(term.substr(0,term.length-1) + ')\\b',"g")
      var match, i = 0
      while ((match = regex.exec(this.text)) !== null) { this.markup.push([match['index'], match[0].length]);i++;}
    }
  }
  getMarkup(){
    return toJS(this.markup);
  }

  /**
   * Splits the paragraph into two paragraphs at a given index
   * @param {Integer} index first index of the original paragraph's text that will belong to the second sub paragraph
   */
  split(index){
    throw new Error('Not implemented')
  }
}
decorate(Paragraph,{
  party: observable,
  markup: observable,
})
export default Paragraph