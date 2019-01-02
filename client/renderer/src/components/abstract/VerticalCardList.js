import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  flex-shrink: 1;
  overflow-y:auto;
  min-height:0;
  padding-right: 8px;
`
const Card = styled.div`
  margin: 8px 0;
  background-color: rgb(0,0,0,.03);
  border-radius: 8px;
  padding: 0 8px 8px 8px;

`
const VerticalCardList = (props) =>
(
 <Container {...props}>
   {props.items.map((item,key) => <Card key={key.toString()}>{props.renderItem(item)}</Card>)}
 </Container>
) ;
export default VerticalCardList;