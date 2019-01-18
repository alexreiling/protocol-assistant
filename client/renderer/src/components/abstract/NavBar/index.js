import React, { Component } from 'react';
import styled from 'styled-components';
import NavButton from './NavButton';
const Fixed = styled.div`
  display:flex;
  align-items: stretch;
`
const Container = styled.div`
  background-color: ${p => p.theme.nav.bar.backgroundColor};
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: ${p => p.vertical ? 'column' : 'row'};
  /* align-items: stretch; */

  a {
    text-decoration: none;
    color:${p => p.theme.nav.button.inactive.color};
  }
  .active>*{
    background-color: ${p => p.theme.nav.button.active.backgroundColor};
    color:${p => p.theme.nav.button.active.color};
  }
  ${Fixed} {
    margin-left: ${p => !p.vertical && 'auto'};
    margin-top: ${p => p.vertical && 'auto'};
    flex-direction: ${p => p.vertical ? 'column' : 'row'}
  }

`
// overflow: auto, flex-shrink:0 ==> scroll
// overflow: hidden, > { flex-shrink: 1, overflow:hidden } ==> shrink
const Overflow = styled.div`
  overflow: hidden;
  display:flex;
  > *{
    flex-shrink: 1;
    overflow:hidden;
  }
`


class NavBar extends Component {
  render() {
    const {vertical,items,style,theme, children} = this.props;
    return (
      <Container className={'nav-bar'}vertical={vertical} theme={theme} style={style}>
        <Overflow className='custom-scroll'>
          {items && items.map((item,key) => <NavButton key={key.toString()} vertical={vertical}{...item}/>)}
        </Overflow>
        <Fixed>
          {children}
        </Fixed>
      </Container>
    );
  }
}

export default NavBar;