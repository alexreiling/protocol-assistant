import React, { Component } from 'react';

class CallOnHighlight extends Component {
  constructor(){
    super()
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }
  handleMouseUp(e){
    var event ={}
    event.selection = window.getSelection();
    this.props.call.forEach(func => func(event));
  }
  render() {
    return (
      <div onMouseUp={this.handleMouseUp}>
        {this.props.children}
      </div>
    );
  }
}

export default CallOnHighlight;