import { decorate, observable, computed, toJS } from "mobx";
function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
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
    this.markup.clear();
    if(keywords.length>0){
      var term = keywords.reduce((result,current) => result + escapeRegExp(current) + '|','\\b(?:')
      const regex = new RegExp(term.substr(0,term.length-1) + ')\\b',"g")
      var match, i = 0
      while ((match = regex.exec(this.text)) !== null) { 
        this.markup.push([match['index'], match[0].length]);
        i++;}
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