import React from 'react';
import styled from 'styled-components';
import Image from '../../../components/common/Image';
import {Link} from 'react-router-dom';

const Wrapper = styled.div`
  
  text-decoration: none;
  background-color: ${p => p.theme.colors.bg.dark};
  color: ${p => p.theme.colors.fonts.bright};
  :hover{
    background-color: #595959;
  }
  height:100%;
  width:100%;
  display:flex;
  flex-direction: ${p => p.vertical ? 'column' : 'row'};
  flex-direction:row;
  box-sizing:border-box;
  >*{
    min-height:2em;
  }
`

const Label = styled.div`
  text-align:center;
  line-height:24px;
  padding: 0 1em;
  margin: auto;

`

function NavButton (props){
  const {to, imgName, label, vertical} = props
  console.log(vertical)
  return (
    <Link style={{textDecoration: 'none'}} to={to} theme={props.theme}>
      <Wrapper vertical={vertical}>
        {imgName && <Image vertical={vertical} imgName={imgName}/>}
        {label && <Label>{label}</Label>}
      </Wrapper>
    </Link>
  )
}

export default NavButton;
