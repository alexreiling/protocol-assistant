import React, { Component } from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';

const Container = styled.ul`
  background-color: ${p => p.theme.nav.bar.backgroundColor};

  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: ${p => p.vertical ? 'column' : 'row'};
  list-style-type: none;
  align-items: stretch;
  > li{
    max-height: 100%;
    max-width: 100%;
  }
  a {
    text-decoration: none;
    color:${p => p.theme.nav.button.inactive.color};
  }
  .active>*{
    background-color: ${p => p.theme.nav.button.active.backgroundColor};
    color:${p => p.theme.nav.button.active.color};
  }

`


class NavBar extends Component {
  render() {
    const {vertical} = this.props;
    return (
      <Container className={'nav-bar'}vertical={vertical} theme={this.props.theme} style={this.props.style}>
        {this.props.items && this.props.items.map((item,key) => <li key={key.toString()}><NavButton vertical={vertical}{...item}/></li>)}
      </Container>
    );
  }
}

export default NavBar;