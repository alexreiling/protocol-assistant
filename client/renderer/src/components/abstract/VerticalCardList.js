import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const Container = styled.div`
  flex-shrink: 1;
  overflow-y:auto;
  min-height:0;
  padding-right: 8px;
`
const Card = styled.div`
  margin: 8px 0;
  border-radius: 4px;
  padding: 1px 8px 8px 8px;
  box-sizing:content-box;
  border-left:1px solid ${p => p.theme.gridline.color};
  :hover{
    padding: 0px 7px 7px 8px;
    border: 1px solid ${p => p.theme.gridline.color};

  }

`
const VerticalCardList = observer((props) =>
(
 <Container {...props}>
   {props.items.map((item,key) => <Card key={key.toString()}>{props.renderItem(item)}</Card>)}
 </Container>
)) ;
export default VerticalCardList;