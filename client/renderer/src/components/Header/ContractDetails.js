import React, { Component } from 'react';
import RoundButton from '../common/RoundButton';

const ContractDetails = (props) =>{
  const {contract, onExit} = props
  return (
    <div>
      <RoundButton onClick={()=>onExit()}>✕</RoundButton>
    </div>
  );
}
export default ContractDetails;