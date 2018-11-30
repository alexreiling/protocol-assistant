import React from 'react';
import styled from 'styled-components';
const TGrid = styled.div`
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: 50% 50%;
  grid-template-areas:
    "meta meta"
    "conversation details";
  grid-gap: 8px;
  height:100%;
`;

const CardGrid = (props) => (
  <TGrid>
    {props.children}
  </TGrid>
)
export default CardGrid