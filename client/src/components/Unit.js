import React, { Component } from 'react';
import {observer} from 'mobx-react';
import styled from 'styled-components';
import UnitCard from './UnitCard';
import CallOnHighlight from './CallOnHighlight';
import TextContainer from './TextContainer';
import { decorate, observable } from 'mobx';
import TestData from './TestData';

const UnitGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  padding: 8px;
  grid-gap: 8px;

`;
const Unit = observer(class Unit extends Component {
  render() {
    var keywords = this.props.unit.getKeywords.map((keyword,i) => <p key={i.toString()}>{keyword}</p>)
    return (
      <UnitGrid>
        <UnitCard title='Your Conversation'>
          <CallOnHighlight call={[
            (e)=>this.props.unit.addKeyword(e.selection.toString())
          ]}>
            <TextContainer paragraphs={this.props.unit.getParagraphs} keywords={this.props.unit.getKeywordsLookup}/>
          </CallOnHighlight>
        </UnitCard>
        <UnitCard title='Your Keywords'>
          {keywords}
        </UnitCard>
        <UnitCard title='Test Data'>
          <TestData unit={this.props.unit}/>
        </UnitCard>
      </UnitGrid>
    );
  }
})


export default Unit;