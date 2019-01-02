import React, { Component } from 'react';
import PropTypes from 'prop-types';
import H2 from '../../common/H2';
import VerticalCardList from '../../abstract/VerticalCardList';
import Selling from './Selling';
import Page from '../Page';


class SellingPage extends Component {
  render() {
    return (
      <Page title='Cross- und Upselling'>
        <VerticalCardList className={'custom-scroll'}
          items={this.props.items}
          renderItem={(item)=><Selling item={item}/>}/>
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