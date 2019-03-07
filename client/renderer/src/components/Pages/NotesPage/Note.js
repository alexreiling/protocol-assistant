import React, { Component } from 'react';
import styled from 'styled-components'
import Entry from './Entry';
import H3 from '../../common/H3';
import { observer } from 'mobx-react';
import OnClickInput from '../../common/OnClickInput';
import RoundButton from '../../common/RoundButton';
import { theme } from '../../../config';
import conversations from '../../../stores/ConversationStore';

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
  }
  addEntry(){
    const note = this.props.data
    this.setChangeFlags()
    note.entries.push({createdLocally:true})
  }
  handleChange(e){
    this.props.note.data[e.target.name] = e.target.value
  }
  render() {
    const {note} = this.props;
    return (
      <Wrapper>
        <Header>
          <OnClickInput
            contrast
            onChange={this.handleChange}
            value={note.data.name}
            name='name'>
            <H3 style={{color: note.data.displayColor}}><b>{note.data.name}</b></H3>
          </OnClickInput>
          {note.localChange && <div style={{color: theme.font.color.red, fontStyle:'italic'}}>nicht gespeichert</div>}
          {note.uncommittedChanges && <div style={{color: theme.font.color.red, fontStyle:'italic'}}>not committed</div>}
          <div style={{color: theme.font.color.green}}></div>
          
          {/* <RoundButton onClick={this.addEntry}>＋</RoundButton> */}
          <NoteNavigator className='note-nav'>
            <RoundButton onClick={()=>conversations.changeNoteIndex(note,-1)}>🡅</RoundButton>
            <RoundButton onClick={()=>conversations.changeNoteIndex(note,1)}>🡇</RoundButton>
          </NoteNavigator>
        </Header>
        {/*note.entries.filter(entry => !entry.deleted).map((entry,key) => <Entry key={key} data={entry} onEdit={this.setChangeFlags}/>)*/}
        <Entry note={note}/>
        {/* <Footer>{note.transactions.map(t => <div>{t.text}</div>)}</Footer> */}
      </Wrapper>
    )
  }

})

export default Note;