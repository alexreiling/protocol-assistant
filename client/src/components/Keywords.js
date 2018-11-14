import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react';

const Bubble = styled.div`
  border-radius: 4px;
  margin: 8px;
  background-color: #DDDDDD;
  padding: 8px;
  display: flex;
  flex-direction: row;
  justify-content:space-between;
  text-align: center;
  > button {
    background-color: #222222;
    color: white;
    height: 24px;
    border-radius: 12px;
    border: none;
    margin: 8px;
  }
`

class Keyword extends Component{
  render(){
    return (
      <Bubble>
        <span>{this.props.keyword}</span>
        <button type='button' onClick={()=>this.props.onDelete(this.props.keyword)}>x</button>
      </Bubble>
    )
  }
}

const Keywords = observer(class Keywords extends Component {  
  render() {
    var keywords = this.props.conv.getKeywords.map((keyword,i) => <Keyword keyword={keyword} onDelete={(kw) => this.props.conv.deleteKeyword(kw)} key={i.toString()}></Keyword>)
    return (
      <div>
        {keywords}
      </div>
    );
  }
})

export default Keywords;