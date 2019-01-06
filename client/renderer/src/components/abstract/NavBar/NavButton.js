import React from 'react';
import styled from 'styled-components';
import Image from '../../../components/common/Image';
import {NavLink} from 'react-router-dom';

const Wrapper = styled.div`
  :hover{
    background-color: ${p => p.theme.nav.button.hover.backgroundColor};
  }
  height:100%;
  width:100%;
  display:flex;
  flex-direction: ${p => p.vertical ? 'column' : 'row'};
  flex-direction:row;
  box-sizing:border-box;
  >*{
  text-decoration: none;

    min-height:2em;
  }
`

const Label = styled.div`
  text-align:center;
  line-height:24px;
  padding: 0 1em;
  margin: auto;
  font-weight: ${p => p.theme.nav.button.fontWeight};

`

function NavButton (props){
  const {to, imgName, label, vertical} = props
  return (
    <NavLink to={to} theme={props.theme}>
      <Wrapper vertical={vertical}>
        {imgName && <Image vertical={vertical} imgName={imgName}/>}
        {label && <Label>{label}</Label>}
      </Wrapper>
    </NavLink>
  )
}

export default NavButton;
