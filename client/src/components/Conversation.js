import React, { Component } from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import UnitCard from './UnitCard';
import CallOnHighlight from './CallOnHighlight';
import TextContainer from './TextContainer';
import { decorate, observable } from 'mobx';
import TestData from './TestData';
import Keywords from './Keywords';

const TGrid = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 50% 50%;
  grid-template-areas:
    "meta meta"
    "conversation details";
  padding: 8px;
  grid-gap: 8px;
`;


const Unit = observer(class Unit extends Component {
  render() {
    return (
      <TGrid>
        <UnitCard gridArea='conversation' title='Your Conversation'>
          <CallOnHighlight call={[
            (e)=>this.props.unit.addKeyword(e.selection.toString())
          ]}>
            <TextContainer paragraphs={this.props.conv.getParagraphs} keywords={this.props.conv.getKeywordsLookup}/>
          </CallOnHighlight>
        </UnitCard>
        <UnitCard gridArea='details' title='Your Keywords'>
          {/**<Keywords unit={this.props.unit}/>*/}
        </UnitCard>
        <UnitCard gridArea='meta' title='Test Data'>
          <TestData conv={this.props.conv}/>
        </UnitCard>
      </TGrid>
    );
  }
})


export default Unit;