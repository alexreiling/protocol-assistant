import React from 'react';
import styled from 'styled-components';
import H3 from './common/H3';
const Wrapper = styled.div`
  display:flex;
  align-items: center;
  > * {
    margin-left: 16px;
  }

`


const ExitButton = styled.div`
  cursor: pointer;
  padding: 4px;
  float: right;
  border-radius:16px;
  text-align: center;
  line-height: 16px;
  height:16px;
  width: 16px;
  :hover{
    background-color: ${p => p.theme.colors.button.bright.hover}
  }
`
export default (props) => {
  const {firstName,middleName,lastName,clientId} = props.client
  return(
    <Wrapper>
      <H3 style={{fontWeight: 500}}>{firstName} {middleName && middleName + ' '}{lastName}</H3>
      <H3>{clientId}</H3>
      <ExitButton onClick={()=>props.onExit()}>✕</ExitButton>
    </Wrapper>
  )
}
