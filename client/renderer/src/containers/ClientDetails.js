import React, { Component } from 'react';
import PropTypes from 'prop-types';

class ClientDetails extends Component {
  render() {
    // eslint-disable-next-line
    const {firstName,lastName,clientId,dateOfBirth,maritalStatus} = this.props.client
    const {onExit} = this.props
    return (
      <div>
        <div>ClientData goes Here</div>
        <div>{`ClientId: ${clientId}`}</div>
        <button type='button' onClick={()=>onExit()}>Leave Component here</button>
      </div>
    );
  }
}

ClientDetails.propTypes = {
  client: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    clientId: PropTypes.string,
    dateOfBirth: PropTypes.instanceOf(Date),
    maritalStatus: PropTypes.string
  }).isRequired,
  onExit: PropTypes.func.isRequired
}

export default ClientDetails;