import React, { Component } from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
  display:flex;
  align-items: center;
  > * {
    margin-left: 16px;
    font-size: 1.25em;
    padding: .5em 0 .5em ;
  }

`
const ClientName = styled.div`
  font-weight: 500;
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
  return(<Wrapper>
    <ClientName>{firstName} {middleName && middleName + ' '}{lastName}</ClientName>
    <div>{clientId}</div>
    <ExitButton onClick={()=>props.onExit()}>✕</ExitButton>

  </Wrapper>
)
}
