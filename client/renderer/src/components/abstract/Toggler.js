import React from 'react';
import Button from './NavBar/Button';

export default (props) => {
  const {vertical,displayState,onClick,style} = props
  return (
    <Button style={style} onClick={onClick}>{vertical ? displayState ? '▶': '◀' : displayState ? '▲': '▼' }</Button>
  )
}