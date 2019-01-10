import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  height: 100%;
  box-sizing:border-box;
  text-align: center;
  display:flex;
  
`

const Img = styled.img`
    width:100%;
    height:100%;
    object-fit: scale-down;
`
class Image extends Component {
  render() {
    const {imgName} = this.props;
    return (
      <Container {...this.props}>
        <Img src={require(`../../assets/img/${imgName}`)} />
      </Container>
    );
  }
}

export default Image;