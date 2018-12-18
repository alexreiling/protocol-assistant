import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const Ul = styled.ul`
  max-width:480px;
  display: flex;
  flex-direction:row;
  margin:0;
  padding:0;
  height:50px;
  overflow-y:hidden;
  overflow-x:visible;
  :hover{
    ::-webkit-scrollbar-thumb{
      background: #FFFFFF;
    }
  }
  ::-webkit-scrollbar{
    height:2px;
  };
;

`
const Li = styled.li`
  display:inline-block;
  white-space: nowrap;
  list-style: none;
  :hover {
    background-color: #333333;
  }
  :active{
    background-color:#4285f4;
  }
  a {
    display:inline-block;
    text-align: center;
    height:100%;
    line-height:50px;
    width:96px;
    padding:-2em;
    text-decoration: none;
    color: white;

  }
  
`

class AdaptiveList extends Component {
  render() {
    return (
      <Ul>
        <Li>
          <Link to='/paragraphs'>Paragraphs</Link>
        </Li>
        <Li>
          <Link to='/test'>Test</Link>
        </Li>
        <Li>
          <Link to='/scrollable'>Scrollable</Link>
        </Li>
        <Li>
          <Link to='/paragraphs'>Feature 2</Link>
        </Li>
        <Li>
          <Link to='/paragraphs'>Feature 3</Link>
        </Li>
        <Li>
          <Link to='/paragraphs'>Feature 4</Link>
        </Li>
        <Li>
          <Link to='/paragraphs'>Feature 5</Link>
        </Li>
        <Li>
          <Link to='/paragraphs'>Feature 6</Link>
        </Li>
        <Li>
          <Link to='/paragraphs'>Feature 6</Link>
        </Li>
        
      </Ul>
    );
  }
}

export default AdaptiveList;