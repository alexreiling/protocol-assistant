import Paragraph from '../components/archive/Paragraph';
import { decorate, observable,reaction, toJS } from "mobx";

const uuidv1 = require('uuid/v1');

//const regex = /\w+\.\w+|[\u00C0-\u017F\w]+[-\u00C0-\u017F\w]*/g

class Conversation{
  constructor(){
    this.id = uuidv1()
    this.keywords = new Map()
    this.paragraphs = new Map()
    //this.wordLookup = new Map()
    reaction(
      () => this.keywords.size,
      length => {
        const kw = this.getKeywords.sort((a,b)=>b.length-a.length)
        this.paragraphs.forEach(p => p.setMarkup(kw))
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
    keyword = keyword.replace(/^[ \t]+|[ \t]+$/g,'')
    this.keywords.set(keyword,keyword)
  }
  deleteKeyword(keyword){
    this.keywords.delete(keyword)
  }
  get getKeywords(){
    return toJS([...this.keywords.values()])
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
    const p = new Paragraph(uuidv1(),text);
    p.setMarkup(this.getKeywords)
    this.paragraphs.set(p.id,p);

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
  //getKeywordsLookup: computed
})
export default Conversation