import styled from 'styled-components';
export default styled.div`
  text-align: center;
  background-color: ${p => p.theme.nav.button.inactive.backgroundColor};
  color: ${p => p.theme.nav.button.inactive.color};
  cursor: pointer;
  :hover {
    background-color: ${p => p.red ? p.theme.nav.button.hover.red.backgroundColor : p.theme.nav.button.hover.backgroundColor};
    color: ${p => p.red ? p.theme.nav.button.hover.red.color : p.theme.nav.button.hover.color};
  }
  :active{
    background-color: ${p => p.red ? p.theme.nav.button.active.red.backgroundColor : p.theme.nav.button.active.backgroundColor};
    color: ${p => p.red ? p.theme.nav.button.active.red.color : p.theme.nav.button.active.color};
  }

`
