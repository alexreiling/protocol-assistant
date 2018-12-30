import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import H2 from '../../common/H2';
import VerticalCardList from '../../abstract/VerticalCardList';
import Selling from './Selling';
const Page = styled.div`
  padding: 8px;
  display:flex;
  flex-direction: column;
`

class SellingPage extends Component {
  render() {
    return (
      <Page>
        <H2>Cross- und Upselling</H2>
        <VerticalCardList
          items={this.props.items}
          renderItem={(item)=><Selling item={item}/>}
        />
      </Page>
    );
  }
}

SellingPage.propTypes = {
  items: PropTypes.arrayOf({
    type: PropTypes.string, //cross || up
    name: PropTypes.string,
    color: PropTypes.string,
    priority: PropTypes.number
  })
}

export default SellingPage;