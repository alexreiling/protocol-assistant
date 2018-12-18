import React, { Component } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display:flex;
  width:480px;
  overflow-x: scroll;
`
const Item = styled.div`
  flex-grow:1;
`


class Scrollable extends Component {
  render() {
    return (
      <Container>
        <Item>Test</Item>
        <Item>Test</Item>
        <Item>Test</Item>
        <Item>Test</Item>
        <Item>Test</Item>
        <Item>Test</Item>
        <Item>Test</Item>
        <Item>Test</Item>
        <Item>Test</Item>
        <Item>Test</Item>

      </Container>
    );
  }
}


export default Scrollable;