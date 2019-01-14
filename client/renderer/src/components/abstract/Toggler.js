import React from 'react';
import styled from 'styled-components';
const Div = styled.div`
  text-align: center;
  background-color: ${p => p.theme.nav.button.inactive.backgroundColor};
  color: ${p => p.theme.nav.button.inactive.color};
  cursor: pointer;
  :hover {
    background-color: ${p => p.theme.nav.button.hover.backgroundColor};
    color: ${p => p.theme.nav.button.hover.color};
  }
`
export default (props) => {
  const {vertical,displayState,onClick,style} = props
  return (
    <Div style={style} onClick={onClick}>{vertical ? displayState ? '▶': '◀' : displayState ? '▲': '▼' }</Div>
  )
}