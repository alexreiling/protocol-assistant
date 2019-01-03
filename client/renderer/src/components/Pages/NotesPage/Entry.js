import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import ExitButton from '../../common/ExitButton';
const Wrapper = styled.div`
  display:flex;
`
const Label = styled.input`

`
const Entry = observer(class Entry extends Component {
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(e){
    const entry = this.props.data;
    entry.setProp(e.target.name, e.target.value)
  }
  render() {
    const {data:entry} = this.props
    return (
      <Wrapper>
        <ExitButton>⬅</ExitButton>
        <ExitButton>✓</ExitButton>
        <ExitButton>✕</ExitButton>

        <Label onChange={this.handleChange} name='text' value={entry.text}/>
      </Wrapper>
    );
  }
})

export default Entry;