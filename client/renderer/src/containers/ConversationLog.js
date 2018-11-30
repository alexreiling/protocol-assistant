import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { BubbleBoard } from '../shared/BubbleBoard';
import Paragraph from '../components/Paragraph';

const ConversationLog = observer(class ConversationLog extends Component {
  prepareParagraphs(){
    return this.props.paragraphs.map(p=><Paragraph p={p} key={p.id}/>)
  }
  render() {
    return (
      <BubbleBoard>
        {this.prepareParagraphs()}
      </BubbleBoard>
    );
  }
})

export default ConversationLog;