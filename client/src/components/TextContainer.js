import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Paragraph from './Paragraph';

const MarkedDown = styled.b`
  color: red;
  font-size: 2em;
`
// words[<0:start,1:length,2:mapper>]
function chunkText(text,words){
  words.sort((a,b) => a[0]>b[0]?1:-1)
  var chunks = []
  var offset = 0
  words.forEach((section,i) => {
    let cutoff = section[0] - offset
    if (cutoff < 0 || cutoff + section[1] > text.length) throw new Error('oops')
    let left = text.substr(0,cutoff)
    if(left) chunks.push(<span key={left+i.toString()}>{left}</span>)
    let word =text.substr(cutoff,section[1])
    chunks.push(section[2](word,word+i.toString()))
    text = text.substr(cutoff + section[1])
    offset = section[0] + section[1]
  })
  if (text) chunks.push(<span key={text}>{text}</span>)
  return chunks
}


const TextContainer = observer(class TextContainer extends Component {
  prepareParagraphs(){
/*     var words = new Array(this.props.paragraphs.length)
    for (let i = 0; i < words.length; i++) words[i] = []
    this.props.keywords.forEach(entry => {
      words[entry[3]].push([entry[2],entry[0].length,(word,key)=><MarkedDown key={key}>{word}</MarkedDown>])
    })
    var paragraphs = [];
    this.props.paragraphs.forEach((paragraph,i) => {
      paragraphs.push(<TextBubble key={i.toString()}>{ chunkText(paragraph,words[i])}</TextBubble>)
    })
    console.log("called") */
    return this.props.paragraphs.map(p=><Paragraph p={p}/>)
  }
  render() {
    return (
      <div>
        {this.prepareParagraphs()}
      </div>
    );
  }
})

export default TextContainer;