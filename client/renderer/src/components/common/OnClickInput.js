import React, { Component } from 'react';
import styled from 'styled-components';
import specialKeyPressed from '../../util/specialKeyPressed';
import Input from '../abstract/Input';

const Wrapper = styled.div`
  display:flex;
`
const Div = styled.div`
  display:flex;
  justify-content:center;
  cursor:text;
  :hover{
    color: ${p => p.theme.font.color.linkHovered} !important;
    * {
      color: ${p => p.theme.font.color.linkHovered} !important;
    }
  }
`
/* const Input = styled.input`
  flex-grow:1;
  width:100%;
` */
class OnClickInput extends Component {
  constructor(props){
    super()
    this.inputRef = React.createRef();
    this.state = {
      open: props.open
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
    this.toggle = this.toggle.bind(this);
  }
  toggle(){
    this.setState({open: !this.state.open},() => this.state.open && this.inputRef.current.focus())
  }
  handleKeypress(e){
    if(specialKeyPressed(e,'enter')) return this.toggle()
  }
  handleChange(e) {
    this.props.onChange(e)
  }
  render() {
    const open = this.state.open
    const {name, value, children, placeholder, contrast} = this.props
    return (
      <Wrapper>
        {open 
          ? <Input
            contrast={contrast}
            ref={this.inputRef}
            name={name} 
            value={value} 
            onChange={this.handleChange} 
            onKeyPress={this.handleKeypress}
            onBlur={this.toggle}
            style={{width:'60vw'}}
            placeholder={placeholder}/> 
          : <Div name={name} onClick={this.toggle}>{children}</Div>}
      </Wrapper>
    );
  }
}

export default OnClickInput;