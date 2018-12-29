import React, { Component } from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';

const Container = styled.ul`
  padding: 0;
  margin: 0;
  background-color: ${p => p.theme.colors.bg.dark};
  color: ${p => p.theme.colors.fonts.bright};
  display: flex;
  flex-direction: ${p => p.vertical ? 'column' : 'row'};
  list-style-type: none;
  align-items: stretch;
  > li{
    max-height: 100%;
    max-width: 100%;
  }

`


class NavBar extends Component {
  render() {
    const {vertical} = this.props;
    return (
      <Container vertical={vertical} theme={this.props.theme} style={this.props.style}>
        {this.props.items && this.props.items.map((item,key) => <li key={key.toString()}><NavButton vertical={vertical}{...item}/></li>)}
      </Container>
    );
  }
}

export default NavBar;