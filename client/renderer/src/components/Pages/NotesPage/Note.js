import React, { Component } from 'react';
import styled from 'styled-components'
import Entry from './Entry';
import H3 from '../../common/H3';
import { observer } from 'mobx-react';
import OnClickInput from '../../common/OnClickInput';
import RoundButton from '../../common/RoundButton';
import { Note as NoteDict } from '../../../config/dictionary';
import conversations from '../../../stores/ConversationStore';
import CircleDiv from '../../common/CircleDiv';
import { theme } from '../../../config';

const Wrapper = styled.div`
  >*{
    margin-top: .5em;
  }
  :hover{
    .note-nav{
      visibility:visible;
    }
  }
`
const NoteNavigator = styled.div`
  display:flex;
  margin-left:auto;
  visibility:hidden;
  color: ${p => p.theme.font.color.gray};

`
const Header = styled.div`
  display:flex;
  align-items:center;
  > * {
    margin-right: 8px;
  }
`
const Footer = styled.div`
  color: ${p => p.theme.font.color.gray};
`
const Note = observer(class Note extends Component{
  constructor(){
    super();
    this.addEntry = this.addEntry.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.setSavePending = this.setSavePending.bind(this)
  }
  addEntry(){
    const note = this.props.data
    this.setSavePending()
    note.entries.push({createdLocally:true})
  }
  handleChange(e){
    this.setSavePending()
    this.props.data[e.target.name] = e.target.value
  }
  setSavePending(){
    this.props.data.savePending = true
  }
  render() {
    const {data:note} = this.props;
    return (
      <Wrapper>
        <Header>
          <OnClickInput
            contrast
            onChange={this.handleChange}
            value={note.text}
            name='text'>
            <H3 style={{color: note.displayColor}}><b>{note.text}</b></H3>
          </OnClickInput>
          {note.savePending && <div style={{color: theme.font.color.red, fontStyle:'italic'}}>nicht gespeichert</div>}
          <RoundButton onClick={this.addEntry}>＋</RoundButton>
          <NoteNavigator className='note-nav'>
          <RoundButton onClick={()=>conversations.changeNoteIndex(note,-1)}>🡅</RoundButton>
          <RoundButton onClick={()=>conversations.changeNoteIndex(note,1)}>🡇</RoundButton>
          </NoteNavigator>
        </Header>
          {note.entries.filter(entry => !entry.deleted).map((entry,key) => <Entry key={key} data={entry} onEdit={this.setSavePending}/>)}
        <Footer>{note.transactions.map(t => <div>{t.text}</div>)}</Footer>
      </Wrapper>
    )
  }

})

export default Note;