import styled from 'styled-components';
export default styled.div`
  text-align: center;
  background-color: ${p => p.theme.nav.button.inactive.backgroundColor};
  color: ${p => p.theme.nav.button.inactive.color};
  cursor: pointer;
  :hover {
    background-color: ${p => p.theme.nav.button.hover.backgroundColor};
    color: ${p => p.theme.nav.button.hover.color};
  }
`
