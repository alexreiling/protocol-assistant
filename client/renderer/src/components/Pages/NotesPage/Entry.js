import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import RoundButton from '../../common/RoundButton';
import OnClickInput from '../../common/OnClickInput';
import { defaults } from '../../../config';
const Wrapper = styled.div`
  display:flex;
  > * { 
    margin-right: 4px;
  }
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
        <RoundButton hoverColor='green' onClick={()=>alert('Nichts passiert...')}>✓</RoundButton>
        <RoundButton hoverColor='red' onClick={()=>entry.delete()}>✕</RoundButton>
        <RoundButton onClick={()=>entry.convert()}>⬅</RoundButton>
        <OnClickInput
          contrast
          onChange={this.handleChange}
          name='text'
          value={entry.text}
          placeholder={defaults.newEntryPlaceholder}>
          <div style={{padding: '.5em .5em 5px'}}>{entry.text|| defaults.newEntryPlaceholder}</div>
        </OnClickInput>
            
      </Wrapper>
    );
  }
})

export default Entry;