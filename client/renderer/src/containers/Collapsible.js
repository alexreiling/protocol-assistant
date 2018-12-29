import React, { Component } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display:flex;
  margin-top: 4px;
  > .switch{
    cursor:pointer;
    :hover{
      background-color: ${p => p.theme.colors.button.bright.hover}
    }
  }
  
`
const Content = styled.div`
  margin-left: 4px;
  border-left: 1px solid coral;
  padding-left: 4px;
  width: 100%;
`

class Collapsible extends Component {
  constructor(props){
    super()
    this.state = {
      open: props.open || false
    }
  }
  render() {
    const {style} = this.props
    return (
      <Wrapper style={style} >
        {React.cloneElement(this.props.switch,{
          onClick: () => this.setState({open: !this.state.open}),
          className: 'switch'
        })}
        {this.state.open && <Content>
          {this.props.children}
        </Content>}
      </Wrapper>
    );
  }
}

export default Collapsible;