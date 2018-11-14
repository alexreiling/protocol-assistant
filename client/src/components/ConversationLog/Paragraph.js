import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const ParagraphBubble = styled.div`
  margin: 8px;
  background-color: #EEDDDD;
  border-radius: 8px;
  padding: 8px;
  display:flex;
  max-width: 512px;
  align-self: ${props => props.party === 0 ? 'center' : props.party === 1 ? 'flex-start' : 'flex-end'};
  background-color: ${props => props.party === 0 ? props.theme.bubbleThey : props.party ===1 ? props.theme.bubbleStd: props.theme.bubbleMe};
  > .bubbleTools {
    align-self: right;
  }
`

const PartyButton = styled.button`
  border:none;
  background-color: transparent;
  padding: none;
  margin: none;
  height:24px;
  border-radius: 12px;
  :hover{
    background-color: grey;
  }
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
    let word = text.substr(cutoff,section[1])
    chunks.push(section[2](word,word+i.toString()))
    text = text.substr(cutoff + section[1])
    offset = section[0] + section[1]
  })
  if (text) chunks.push(<span key={text}>{text}</span>)
  return chunks
}
function markUp(word,key) {
  return <b>{word}</b>
}
const Paragraph = observer(class Paragraph extends Component {
  constructor(){
    super()
    this.setParty =this.setParty.bind(this)
  }
  setParty(){
    if(this.props.p.party === 2)
      this.props.p.setProp('party',-1)
    this.props.p.setProp('party',this.props.p.party + 1)

  }
  
  render() {
    const chunks = chunkText(this.props.p.text,this.props.p.getMarkup().map(mu => {
      mu.push(markUp); return mu
    }))
    console.log(this.props.p.markup)

    return (
      <ParagraphBubble party={this.props.p.party}>
        <div>{chunks}</div>
        <div className='bubbleTools'>
          <PartyButton type='button' onClick={this.setParty}>{'↔'}</PartyButton>
          <PartyButton type='button' onClick={this.setParty}>{'🞩'}</PartyButton>
        </div>
      </ParagraphBubble>

    );
  }
})

export default Paragraph;