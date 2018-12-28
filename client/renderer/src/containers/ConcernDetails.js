import React, { Component } from 'react';
import PropTypes from 'prop-types'
class ConcernDetails extends Component {
  render() {

    return (
      <div>
        CondernDetail
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