import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  box-sizing:border-box;
  text-align: center;
`

const Img = styled.img`
  max-height:100%;
  max-width:100%;
`
class Image extends Component {
  render() {
    const {imgName} = this.props;
    return (
      <Container {...this.props}>
        <Img  src={require(`../../../assets/img/${imgName}`)} />
      </Container>
    );
  }
}

export default Image;