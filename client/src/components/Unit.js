import React, { Component } from 'react';
import styled from 'styled-components';
import TextContainer from './TextContainer';
import FormContainer from './FormContainer';

const UnitGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 8px;
  grid-gap: 8px;
  * {
    background-color: white;
  }
`;
class Unit extends Component {
  render() {
    return (
      <UnitGrid>
        <TextContainer/>
        <FormContainer/>
      </UnitGrid>
    );
  }
}

export default Unit;