import React, { Component } from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';

const Container = styled.div`
  background-color: ${p => p.theme.nav.bar.backgroundColor};
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: ${p => p.vertical ? 'column' : 'row'};
  align-items: stretch;
  .toggle-button{
    margin-top: auto;
    border: 1px solid limegreen;
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
    const {vertical,items,style,theme, children} = this.props;
    return (
      <Container className={'nav-bar'}vertical={vertical} theme={theme} style={style}>
        {items && items.map((item,key) => <NavButton key={key.toString()} vertical={vertical}{...item}/>)}
        {children}
      </Container>
    );
  }
}

export default NavBar;