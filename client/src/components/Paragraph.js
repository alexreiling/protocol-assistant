import React, { Component } from 'react';
import styled from 'styled-components';

const ParagraphBubble = styled.div`
  margin: 8px;
  background-color: #EEDDDD;
  border-radius: 8px;
  padding: 8px;
`
class Keyword{

}
class Markup{
  constructor(){
    
  }
}

class Paragraph extends Component {

  render() {
    return (
      <ParagraphBubble>
        {this.props.p.text}
      </ParagraphBubble>
    );
  }
}

export default Paragraph;