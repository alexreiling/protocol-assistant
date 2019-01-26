// source: https://www.w3schools.com/howto/howto_css_switch.asp

import React, { Component } from 'react';
import styled, {css} from 'styled-components';
import { theme } from '../../config';

const height = 16;
const padding = Math.round(height / 8.5);
const Switch = styled.div`
  position: relative;
  display: inline-block;
  width: ${(height-padding)*2 + 'px'};
  height: ${height + 'px'};
`

/* The slider */
const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${p => p.checked ? theme.toggleSwitch.checked.backgroundColor : theme.toggleSwitch.backgroundColor};
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: ${height + 'px'};
  
  :before {
    position: absolute;
    content: "";
    height: ${height - 2 * padding + 'px'};
    width: ${height - 2 * padding + 'px'};
    left: ${padding + 'px'};
    bottom: ${padding + 'px'};
    background-color: ${theme.toggleSwitch.color};
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;
    ${p => p.checked && css`
      -webkit-transform: ${`translateX(${height - 2 * padding + 'px'})`};
      -ms-transform: ${`translateX(${height - 2 * padding + 'px'})`};
      transform: ${`translateX(${height - 2 * padding + 'px'})`};
    `}

  }

`
class ToggleSwitch extends Component{
  constructor(){
    super()
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      checked: false
    }
  }
  handleChange(){
    const {onChange} = this.props
    this.setState({checked: !this.state.checked},
      () => onChange && onChange(this.state.checked)
    )
  }
  render() {
    return (
      <Switch class="switch" onClick={this.handleChange}>
        <Slider checked={this.state.checked} className="slider round"></Slider>
      </Switch>
    );
  }
}

export default ToggleSwitch;