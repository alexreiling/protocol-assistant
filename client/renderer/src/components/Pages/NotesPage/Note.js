import React, { Component } from 'react';
import styled from 'styled-components'
import Entry from './Entry';
import ExitButton from '../../common/ExitButton';
import H3 from '../../common/H3';
import { observer } from 'mobx-react';

const Wrapper = styled.div`
`

const Header = styled.div`
  display:flex;
  align-items:center;
  > * {
    margin-right: 8px;
  }
`
const Footer = styled.div`

`

const Note = observer(class Note extends Component{
  constructor(){
    super();
    this.addEntry = this.addEntry.bind(this)
  }
  addEntry(){
    const note = this.props.data
    note.addEntry({})
  }
  render() {
    const {data:note} = this.props;
    return (
      <Wrapper>
        <Header>
          <H3>{note.label}</H3>
          <ExitButton onClick={this.addEntry}>+</ExitButton>
        </Header>
          {note.getEntries().map(entry => <Entry data={entry}/>)}
        <Footer>Footer</Footer>
      </Wrapper>
    )
  }

})

export default Note;