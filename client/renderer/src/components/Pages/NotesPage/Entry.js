import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import RoundButton from '../../common/RoundButton';
import OnClickInput from '../../common/OnClickInput';
import { placeholders } from '../../../config';
import { markUpText } from './MarkUpHelpers';
const Wrapper = styled.div`
  display:flex;
  > ${RoundButton} {
    flex-shrink: 0;
  }
  > * { 
    margin-right: 4px;
  }
`

const Entry = observer(class Entry extends Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
    this.deleteEntry = this.deleteEntry.bind(this)
  }

  handleChange(e){
    this.props.note.data[e.target.name] = e.target.value
  }
  deleteEntry(){
    this.props.onEdit && this.props.onEdit()    
    this.props.data.deleted = true
  }
  render() {
    const {note} = this.props
    const {rawText = '', keywords = []} = note.data
    let markupDict = {}
    keywords.forEach(kw => 
      markupDict[kw.text] = {
        word: kw.text,
        markUpFunc: (text,key) => <span key={key} style={{color: kw.displayColor}}>{text}</span>
      }
    )
    const markedUpText = rawText ? markUpText(rawText, markupDict) : ''
    return (
      <Wrapper>
        {/* <RoundButton hoverColor='green' onClick={()=>alert('Nichts passiert...')}>✓</RoundButton> */}
        {/* <RoundButton hoverColor='red' onClick={this.deleteEntry}>✕</RoundButton> */}
        {/* <RoundButton onClick={this.convertEntry}>⬅</RoundButton> */}
        {/*  {entry.createdLocally
        ? <OnClickInput
          contrast
          onChange={this.handleChange}
          name='text'
          value={entry.text}
          placeholder={placeholders.newEntryPlaceholder}>
          <div style={{padding: '.5em .5em 5px'}}>{text|| placeholders.newEntry}</div>
        </OnClickInput>
        : <div dangerouslySetInnerHTML={{__html: entry.text}}></div>} */}
        <OnClickInput
          contrast
          onChange={this.handleChange}
          name='rawText'
          value={note.data.rawText}
          placeholder={placeholders.newEntry}>
          <div style={{padding: '.5em .5em 5px'}}>{markedUpText || placeholders.newEntry}</div>
        </OnClickInput>
            
      </Wrapper>
    );
  }
})

export default Entry;