import React, { Component } from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import GridCard from './GridCard';
import TextContainer from './ConversationLog/TextContainer';
import TestData from './TestData';
import Keywords from './Keywords';

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


const Unit = observer(class Unit extends Component {
  render() {
    return (
      <TGrid>
        <GridCard gridArea='conversation' title='Your Conversation'>

            <TextContainer paragraphs={this.props.conv.getParagraphs} keywords={this.props.conv.getKeywordsLookup}/>

        </GridCard>
        <GridCard gridArea='details' title='Your Keywords'>
          <Keywords conv={this.props.conv}/>
        </GridCard>
        <GridCard gridArea='meta' title='Test Data'>
          <TestData conv={this.props.conv}/>
        </GridCard>
      </TGrid>
    );
  }
})


export default Unit;