import React, { Component } from 'react';
import styled from 'styled-components'
const MarkedUpTerm = styled.span`
  text-decoration-line: underline overline;
  text-decoration-style: dotted;
  color:green;
`
class MarkedUp extends Component {
  render() {
    return (
      <MarkedUpTerm>
        {this.props.text}
      </MarkedUpTerm>
    );
  }
}
export default MarkedUp