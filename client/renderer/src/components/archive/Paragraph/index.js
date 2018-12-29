import React, { Component } from 'react';
import { observer } from 'mobx-react';
import ParagraphButton from './ParagraphButton';
import { BubbleBoardBubble } from '../../shared/BubbleBoard';
import MarkedUp from './MarkedUpTerm';
import { chunkAndMap } from '../../util';

const markUp = (word,key) => <MarkedUp key={key} text={word}/>

const Paragraph = observer(class Paragraph extends Component {
  constructor(){
    super()
    this.setParty = this.setParty.bind(this)
  }
  setParty(){
    if(this.props.p.party === 2)
      this.props.p.setProp('party',-1)
    this.props.p.setProp('party',this.props.p.party + 1)
  }

  render() {
    const chunks = chunkAndMap(this.props.p.text,this.props.p.getMarkup.map(mu => {mu.push(markUp); return mu}))
    return (
      <BubbleBoardBubble side={this.props.p.party}>
        <div>{chunks}</div>
        <div className='bubbleTools'>
          <ParagraphButton type='button' onClick={this.setParty}>{'↔'}</ParagraphButton>
          <ParagraphButton type='button' onClick={this.setParty}>{'🞩'}</ParagraphButton>
        </div>
      </BubbleBoardBubble>
    );
  }
})

export default Paragraph;