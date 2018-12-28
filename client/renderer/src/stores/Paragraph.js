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
    if (keywords.length===0) this.markup.clear();
    else {
      var term = keywords.reduce((result,current) => result + escapeRegExp(current) + '|','\\b(?:')
      const regex = new RegExp(term.substr(0,term.length-1) + ')\\b',"g")
      var match
      var tempMarkup = []
      while ((match = regex.exec(this.text)) !== null) { 
        tempMarkup.push([match['index'], match[0].length]);
      }
      if(tempMarkup.length !== this.markup.length) this.markup = tempMarkup
    }
  }
  get getMarkup(){
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
  getMarkup: computed({options:{equals: (a,b)=>a.length-b.length}})
})
export default Paragraph