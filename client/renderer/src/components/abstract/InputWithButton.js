import React, { Component } from 'react';
import styled from 'styled-components'
import specialKeyPressed from '../../util/specialKeyPressed';
import Input from './Input';
import Button from '../common/Button';
const Wrapper = styled.div`
  display:flex;
  flex-shrink:0;
  > * {
    margin-right: 8px;
  }
`
class InputWithButton extends Component {
  constructor(props){
    super(props)
    this.state = {value: this.props.initValue || ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  handleChange(e){
    this.setState({value: e.target.value})
  }
  handleSubmit(){
    const {onSubmit, clearAfterSubmit, validator, messageOnInvalid} = this.props
    if(validator && !validator(this.state.value)) {
      alert(messageOnInvalid || 'Invalid Input')
      return
    }
    if(onSubmit) onSubmit(this.state.value)
    if(clearAfterSubmit) this.setState({value: ''})
  }
  handleKeyPress(e){
    if(specialKeyPressed(e,'enter')) 
      this.handleSubmit(e)
  }

  //TODO: Use destructuring
  render() {
    const {buttonText, name, ...inputProps} = this.props
    return (
      <Wrapper>
        <Input contrast name={name || 'value'} value={this.state.value} onChange={this.handleChange} onKeyPress={this.handleKeyPress} {...inputProps}/>
        <Button strong onClick={this.handleSubmit}>{buttonText}</Button>
      </Wrapper>
    );
  }
}


export default InputWithButton;