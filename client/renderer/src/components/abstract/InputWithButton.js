import React, { Component } from 'react';
import styled from 'styled-components'
import specialKeyPressed from '../../util/specialKeyPressed';
import Input from './Input';
import Button from '../common/Button';
const Wrapper = styled.div`
  display:flex;
  > * {
    margin-right: 8px;
  }
`
class InputWithButton extends Component {
  constructor(props){
    super(props)
    this.state = {text: props.value || ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit(){
    const {onSubmit, clearAfterSubmit, validator, messageOnInvalid} = this.props
    if(validator && !validator(this.state.text)) {
      alert(messageOnInvalid || 'Invalid Input')
      return
    }
    this.props.onSubmit(this.state.text)
    if(clearAfterSubmit) this.setState({text: ''})
  }
  handleKeyPress(e){
    if(specialKeyPressed(e,'enter')) 
      this.handleSubmit(e)
  }
  render() {
    const {placeholder, width, buttonText} = this.props
    return (
      <Wrapper>
        <Input contrast style={{width:width}}placeholder={placeholder} name='text'value={this.state.text} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <Button strong onClick={this.handleSubmit}>{buttonText}</Button>
      </Wrapper>
    );
  }
}


export default InputWithButton;