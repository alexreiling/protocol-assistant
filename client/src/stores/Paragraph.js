class Paragraph{
  constructor(id,text,party){
    this.id = id
    this.party = party || 0
    this.text = text || ''
    this.markup = []
  }
  setMarkup(keywords){

  }
  /**
   * Splits the paragraph into two paragraphs at a given index
   * @param {Integer} index first index of the original paragraph's text that will belong to the second sub paragraph
   */
  split(index){
    throw new Error('Not implemented')
  }
}
export default Paragraph