import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Image from '../common/Image';
import Collapsible from '../abstract/Collapsible';
import styled from 'styled-components';


const InlineTextAndImage = styled.div`
  display: flex;
  width:100%;
  div:nth-child(1){
    width:16px;
    padding:2px;
    margin-right:4px;
  }

`
class ClientDetails extends Component {
  render() {
    // eslint-disable-next-line
    const {firstName,middleName,lastName,clientId,email,phone,dateOfBirth,maritalStatus,address} = this.props.client
    const {home, mobile} = phone || {}
    const iconStyle = {width:28, padding: '4px'}
    return (
      <div>

        <Collapsible
          open
          switch={<Image style={iconStyle}imgName={'icon-address.png'}/>}>
          <div>{address.streetName} {address.number}</div>
          <div>{address.zipCode} {address.city}</div>
          {address.country && <div> {address.country}</div>}
        </Collapsible>
        
        {email && 
        <Collapsible
          open
          switch={<Image style={iconStyle}imgName={'icon-email.png'}/>}>
          <div>{email}</div>
        </Collapsible>}
        {phone && <Collapsible
          open
          switch={<Image style={iconStyle}imgName={'icon-contact.png'}/>}>
          {home && <InlineTextAndImage><Image imgName={'icon-phone.png'}/> {phone.home}</InlineTextAndImage>}
          {mobile && <InlineTextAndImage><Image imgName={'icon-mobile.png'}/> {phone.mobile}</InlineTextAndImage>}
        </Collapsible>}


      </div>
    );
  }
}

ClientDetails.propTypes = {
  client: PropTypes.shape({
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]).isRequired,
    firstName: PropTypes.string.isRequired,
    middleName: PropTypes.string,
    lastName: PropTypes.string.isRequired,
    gender: PropTypes.oneOf(['M','F']),
    email: PropTypes.string,
    clientId: PropTypes.string.isRequired,
    dateOfBirth: PropTypes.instanceOf(Date).isRequired,
    address: PropTypes.shape({
      streetName: PropTypes.string,
      number: PropTypes.string,
      zipCode: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
      ]),
      city: PropTypes.string,
      country: PropTypes.string
    }),
    phone: PropTypes.shape({
      mobile: PropTypes.string,
      home: PropTypes.string
    }),
    occupation: PropTypes.string
  }).isRequired,
  onExit: PropTypes.func.isRequired
}

export default ClientDetails;