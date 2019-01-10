import React, { Component } from 'react';
import PropTypes from 'prop-types'
import RoundButton from '../common/RoundButton';
class ConcernDetails extends Component {
  render() {

    return (
      <div>
        <RoundButton onClick={()=>this.props.onExit()}>✕</RoundButton>

        ConcernDetail
      </div>
    );
  }
}
ConcernDetails.propTypes = {
  concern: PropTypes.shape({

  }).isRequired,
  onExit: PropTypes.func.isRequired
}
export default ConcernDetails;