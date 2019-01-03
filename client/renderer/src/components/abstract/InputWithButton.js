import React, { Component } from 'react';
import styled from 'styled-components'
const Wrapper = styled.div`
  display:flex;
`
const Input = styled.input`
`
const Button = styled.button`
`
class InputWithButton extends Component {
  constructor(){
    super()
    this.state = {text: ''}
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  handleSubmit(){
    const {onSubmit, validator, messageOnInvalid} = this.props
    if(validator && !validator(this.state.text)) {
      alert(messageOnInvalid || 'Invalid Input')
      return
    }
    this.props.onSubmit(this.state.text)
    this.setState({text: ''})
  }
  handleKeyPress(e){
    if(e.charCode===13) 
      this.handleSubmit(e)
  }
  render() {
    const {onSubmit, buttonText} = this.props
    return (
      <Wrapper>
        <Input name='text'value={this.state.text} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
        <Button onClick={this.handleSubmit}>{buttonText}</Button>
      </Wrapper>
    );
  }
}


export default InputWithButton;