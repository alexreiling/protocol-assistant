import React from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const Container = styled.div`
  flex-shrink: 1;
  min-height:0;
  position: relative;
  display:flex;
  flex-grow:0;
  padding:2px 0;
`
const ListContainer = styled.div`
  flex-direction: column;
  flex-shrink: 1;
  flex-grow: 0;
  padding-right: 8px;
  overflow-y:auto;
  width:100%;
  max-height: 100%;
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
const Fader = styled.div`
  height: 8px;
  width: calc(100% - 10px);
  margin-right: 8px;
  position: absolute;
  content: " ";
  ${({position}) => position}: 0;
  background: ${({position}) => `linear-gradient(to ${position}, rgba(255,255,255,0),rgba(255,255,255,1))`};
`
const VerticalCardList = observer((props) =>
(
  <Container {...props}>
    <Fader position='top'/>
    <ListContainer className={'custom-scroll'}>
      {props.items.filter(item => !item.deleted).map((item,key) => <Card key={key.toString()}>{props.renderItem(item,key)}</Card>)}
    </ListContainer>
    <Fader position='bottom'/>
  </Container>
)) ;
export default VerticalCardList;