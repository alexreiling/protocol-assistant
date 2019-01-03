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
  }
  handleChange(e){
    this.setState({[e.target.name]: e.target.value})
  }
  render() {
    const {onSubmit, buttonText} = this.props
    return (
      <Wrapper>
        <Input name='text'value={this.state.text} onChange={this.handleChange}/>
        <Button onClick={()=>onSubmit(this.state.text)}>{buttonText}</Button>
      </Wrapper>
    );
  }
}


export default InputWithButton;