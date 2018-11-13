import React, { Component } from 'react';
import styled from 'styled-components';
import H2 from './shared/H2';
const StyledDiv = styled.div`
  grid-area: ${props => props.gridArea};
  padding:8px;
  display: grid;
  grid-template-rows: 50px auto;
  grid-gap:2px;
  > * {
    padding: 8px;
    background-color: white;
  }
`
class UnitCard extends Component {
  render() {
    return (
      <StyledDiv gridArea={this.props.gridArea}>
        <H2>{this.props.title}</H2>
        <div>{this.props.children}</div>
      </StyledDiv>
    );
  }
}

export default UnitCard;