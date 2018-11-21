import React, { Component } from 'react';
import {observer} from 'mobx-react';
import GridCard from './CardGrid/GridCard';
import ConversationLog from '../containers/ConversationLog';
import CardGrid from './CardGrid';
import Keywords from '../components/Keywords';
import TestData from '../components/TestData';

const Unit = observer(class Unit extends Component {
  render() {
    return (
      <CardGrid>
        <GridCard gridArea='conversation' title='Your Conversation'>
          <ConversationLog paragraphs={this.props.conv.getParagraphs} keywords={this.props.conv.getKeywordsLookup}/>
        </GridCard>
        <GridCard gridArea='details' title='Your Keywords'>
          <Keywords conv={this.props.conv}/>
        </GridCard>
        <GridCard gridArea='meta' title='Test Data'>
          <TestData conv={this.props.conv}/>
        </GridCard>
      </CardGrid>
    );
  }
})


export default Unit;