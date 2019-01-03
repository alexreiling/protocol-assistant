import React, { Component } from 'react';
import styled from 'styled-components'
import Entry from './Entry';

const Header = styled.div`

`
const Footer = styled.div`

`

class Note extends Component{
  constructor(){
    super();
    this.entries = []
  }
  addEntry(){
    this.entries.push(new Entry())
  }
  render() {
    console.log(this.props.data)
    return (
      <div>
        <Header>Header</Header>
          {this.props.data.label}
        <Footer>Footer</Footer>
      </div>
    )
  }

}

export default Note;