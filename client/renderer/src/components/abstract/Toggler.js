import React from 'react';
import styled from 'styled-components';
const Div = styled.div`
  text-align: center;
  color: ${p => p.theme.font.color.gray};
  cursor: pointer;
  :hover {
    background-color: ${p => p.theme.button.hover.backgroundColor};
  }
`
export default (props) => {
  const {displayState,onClick,style} = props
  return (
    <Div style={style} onClick={onClick}>{displayState ? '▲' : '▼'}</Div>
  )
}