import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import Paragraph from './Paragraph';

const MarkedDown = styled.b`
  color: red;
  font-size: 2em;
`

const BubbleBoard = styled.div`
  display: flex;
  flex-direction: column;


`

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
      <BubbleBoard>
        {this.prepareParagraphs()}
      </BubbleBoard>
    );
  }
})

export default TextContainer;