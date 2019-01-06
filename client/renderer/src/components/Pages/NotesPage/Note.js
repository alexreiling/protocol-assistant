import React, { Component } from 'react';
import styled from 'styled-components'
import Entry from './Entry';
import H3 from '../../common/H3';
import { observer } from 'mobx-react';
import OnClickInput from '../../common/OnClickInput';
import RoundButton from '../../common/RoundButton';

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
    note.addEntry({})
  }
  handleChange(e){
    this.props.data.setProp(e.target.name, e.target.value)
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
            <H3>{note.text}</H3>
          </OnClickInput>
          <RoundButton onClick={this.addEntry}>＋</RoundButton>
          <NoteNavigator className='note-nav'>
            <RoundButton onClick={()=>note.changeIndex(-1)}>🡅</RoundButton>
            <RoundButton onClick={()=>note.changeIndex(1)}>🡇</RoundButton>
          </NoteNavigator>
        </Header>
          {note.getEntries().map(entry => <Entry data={entry}/>)}
        <Footer>{note.getTransactions().map(t => <div>{t.text}</div>)}</Footer>
      </Wrapper>
    )
  }

})

export default Note;