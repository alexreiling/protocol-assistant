import React, { Component } from 'react';
import styled from 'styled-components';
import H2 from '../../shared/H2'
const StyledDiv = styled.div`
  grid-area: ${props => props.gridArea};
  display: grid;
  grid-template-rows: 50px 1fr;
  grid-gap:2px;
  > * {
    padding: 8px;
    background-color: white;
  }
`

class GridCard extends Component {
  render() {
    return (
      <StyledDiv gridArea={this.props.gridArea}>
        <H2>{this.props.title}</H2>
        <div>{this.props.children}</div>
      </StyledDiv>
    );
  }
}

export default GridCard;