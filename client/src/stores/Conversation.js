import Paragraph from './Paragraph';
import { decorate, observable, action, computed, reaction } from "mobx";

const uuidv1 = require('uuid/v1');

const regex = /\w+\.\w+|[\u00C0-\u017F\w]+[-\u00C0-\u017F\w]*/g

class Conversation{
  constructor(){
    this.id = uuidv1()
    this.keywords = new Map()
    this.paragraphs = new Map()
    //this.wordLookup = new Map()
    reaction(
      () => this.keywords.size,
      length => {
        if(length > 0)
        {
          const kw = this.getKeywords.sort((a,b)=>a.length < b.length)
          this.paragraphs.forEach(p => p.setMarkup(kw))
        }
      }
    )
  }
  /*
    Analyzes given paragraph and returns:
    [0]: the word
    [1]: ordinal number in paragraph
    [2]: index of first character in paragraph string
  */
/*   splitParagraph(paragraph){
    if(!paragraph) return []
    
    var i = 0
    var match
    var words = []
    while ((match = regex.exec(paragraph)) !== null) {
      words.push([match[0],i,match['index']])
      i++
    }
    return words
  }*/
  addKeyword(keyword){
    if(!keyword) return
    //keyword = keyword.replace(/\s/g,'')
    this.keywords.set(keyword,keyword)
  }
  deleteKeyword(keyword){
    this.keywords.delete(keyword)
  }
  get getKeywords(){
    return [...this.keywords.values()]
  } 
  addParagraph(text){
/*     this.paragraphs.push(paragraph)
    var pIndex = this.paragraphs.length - 1
    this.splitParagraph(paragraph).forEach(entry => {
      var occurences = this.wordLookup.get(entry[0]) || []
      entry.push(pIndex)
      occurences.push(entry)
      this.wordLookup.set(entry[0],occurences)
    }) */
    const id = uuidv1();
    this.paragraphs.set(id,new Paragraph(id,text));
  }
  get getParagraphs(){
    return [...this.paragraphs.values()]
  }
  get getKeywordsLookup(){
/*     var list = []
    this.getKeywords.forEach(keyword => {
      var occurences = this.wordLookup.get(keyword)
      if(occurences) list.push(...occurences)
    })
    return list */
    return []
  }
}
decorate(Conversation,{
  keywords: observable,
  paragraphs:observable,
  wordLookup:observable,
  getKeywords: computed,
  getParagraphs: computed,
  //getKeywordsLookup: computed
})
export default Conversation