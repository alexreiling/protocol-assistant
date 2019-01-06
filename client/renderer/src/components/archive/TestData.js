import React, { Component } from 'react';
import { decorate, observable } from 'mobx';
import { observer } from 'mobx-react';
import specialKeyPressed from '../../util/specialKeyPressed';

const TestData = observer(class TestData extends Component {
  constructor(){
    super()
    this.text = ''
    this.keyword = ''
    this.addParagraph = this.addParagraph.bind(this)
    this.addKeyword = this.addKeyword.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }
  addParagraph(){
    if (this.text !== ''){
      this.props.conv.addParagraph(this.text)
      this.text = ''
    }
  }
  addKeyword(){
    if (this.keyword !== ''){
      this.props.conv.addKeyword(this.keyword)
      this.keyword = ''
    }
  }
  handleKeyPress(e){
    if(specialKeyPressed(e,'enter')) 
      if(e.target.name==='text') this.addParagraph()
      else this.addKeyword()
  }
  render() {
    return (
      <div>
        <div>
          <h3>Enter Paragraph</h3>
          <input type='input' value={this.text} name='text' onKeyPress={this.handleKeyPress} onChange={(e)=>this[e.target.name] = e.target.value}/>
          <button type='button' onClick={this.addParagraph}>Enter</button> 
        </div>
        <div>
          <h3>Enter Keyword</h3>
          <input type='input' value={this.keyword} name='keyword' onKeyPress={this.handleKeyPress} onChange={(e)=>this[e.target.name] = e.target.value}/>
          <button type='button' onClick={this.addKeyword}>Enter</button>
        </div>
      </div>
    );
  }
})
decorate(TestData,{
  text: observable,
  test: observable,
  keyword: observable
})
export default TestData;