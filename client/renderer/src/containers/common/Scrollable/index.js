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
        {this.props.children}
      </Container>
    );
  }
}


export default Scrollable;