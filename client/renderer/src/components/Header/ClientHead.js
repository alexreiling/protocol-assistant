import React from 'react';
import styled from 'styled-components';
import H3 from '../common/H3';
import ExitButton from '../common/RoundButton';
const Wrapper = styled.div`
  display:flex;
  align-items: center;
  > * {
    margin-left: 16px;
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
