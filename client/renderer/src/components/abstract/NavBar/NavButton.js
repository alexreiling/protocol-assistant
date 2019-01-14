import React from 'react';
import styled from 'styled-components';
import {NavLink} from 'react-router-dom';
import { theme } from '../../../config';
// TODO: Clean up this mess
const Wrapper = styled.div`
  :hover{
    background-color: ${p => p.theme.nav.button.hover.backgroundColor};
  }
  height:100%;
  width:100%;
  display:flex;
  flex-direction: ${p => p.vertical ? 'column' : 'row'};
  flex-direction:row;
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
const ImageContainer = styled.div`
  width:100%;
  height:100%;
  z-index: 1;
  background: white center center no-repeat;
  background-color:inherit;
  background-position: center center;
  background-image: url(${p => p.img});
  background-size: contain;
`
const ImageWrapper = styled.div`
`
const Image = (props) => {
  return (
    <ImageWrapper style={props.style}>
      <ImageContainer img={props.img}/>
    </ImageWrapper>
  )
}

function NavButton (props){
  const {to, img, imgInactive, label, vertical} = props
  console.log(process.env.PUBLIC_URL)
  return (
    <NavLink to={to} theme={props.theme}>
      <Wrapper vertical={vertical}>
        {img && <Image style={{width: vertical ? theme.nav.thickness.main : theme.nav.thickness.sub, padding:'4px'}}img={img}/>}
        {/*imgName && <Image vertical={vertical} imgName={imgName}/>*/}
        {label && <Label>{label}</Label>}
      </Wrapper>
    </NavLink>
  )
}

export default NavButton;
