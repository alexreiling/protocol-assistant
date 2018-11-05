import { decorate, observable, action, computed } from "mobx";
const uuidv1 = require('uuid/v1');
class Unit{
  constructor(){
    this.id = uuidv1()
    this.keywords = new Map()
    this.paragraphs = []
    //key: word, value: Array<word,ordinal,index,paragraphIndex>
    this.wordLookup = new Map()
  }
  /*
    Analyzes given paragraph and returns:
    [0]: the word
    [1]: ordinal number in paragraph
    [2]: index of first character in paragraph string
  */
  splitParagraph(paragraph){
    if(!paragraph) return []
    const regex = /\w+\.\w+|[\u00C0-\u017F\w]+[-\u00C0-\u017F\w]*/g
    var i = 0
    var match
    var words = []
    while ((match = regex.exec(paragraph)) !== null) {
      words.push([match[0],i,match['index']])
      i++
    }
    return words
  }
  addKeyword(keyword){
    this.keywords.set(keyword,keyword)
  }
  get getKeywords(){
    return [...this.keywords.values()]
  }
  addParagraph(paragraph){
    this.paragraphs.push(paragraph)
    var pIndex = this.paragraphs.length - 1
    this.splitParagraph(paragraph).forEach(entry => {
      var occurences = this.wordLookup.get(entry[0]) || []
      entry.push(pIndex)
      occurences.push(entry)
      this.wordLookup.set(entry[0],occurences)
    })
  }
  get getParagraphs(){
    return this.paragraphs
  }
  get getKeywordsLookup(){
    var list = []
    this.getKeywords.forEach(keyword => {
      var occurences = this.wordLookup.get(keyword)
      if(occurences) list.push(...occurences)
    })
    return list
  }
}

class UnitStore {
  constructor(){
    this.units = new Map()
  }
  createUnit(){
    var unit = new Unit();
    this.units.set(unit.id,unit)
    return unit
  }
}

decorate(Unit,{
  keywords: observable,
  paragraphs:observable,
  wordLookup:observable,
  getKeywords: computed,
  getParagraphs: computed,
  getKeywordsLookup: computed
})
export default UnitStore