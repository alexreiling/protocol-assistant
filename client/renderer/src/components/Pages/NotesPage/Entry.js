import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';
import RoundButton from '../../common/RoundButton';
import OnClickInput from '../../common/OnClickInput';
import { placeholders } from '../../../config';
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
    this.props.onEdit && this.props.onEdit()
    const entry = this.props.data;
    entry[e.target.name] = e.target.value
  }
  deleteEntry(){
    this.props.onEdit && this.props.onEdit()    
    this.props.data.deleted = true
  }
  render() {
    const {data:entry} = this.props
    return (
      <Wrapper>
        {/* <RoundButton hoverColor='green' onClick={()=>alert('Nichts passiert...')}>✓</RoundButton> */}
        <RoundButton hoverColor='red' onClick={this.deleteEntry}>✕</RoundButton>
        {/* <RoundButton onClick={this.convertEntry}>⬅</RoundButton> */}
        {entry.createdLocally
        ? <OnClickInput
          contrast
          onChange={this.handleChange}
          name='text'
          value={entry.text}
          placeholder={placeholders.newEntryPlaceholder}>
          <div style={{padding: '.5em .5em 5px'}}>{entry.text|| placeholders.newEntry}</div>
        </OnClickInput>
        : <div dangerouslySetInnerHTML={{__html: entry.text}}></div>}
            
      </Wrapper>
    );
  }
})

export default Entry;