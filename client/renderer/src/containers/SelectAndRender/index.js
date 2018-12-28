import React, { Component } from 'react';
import { decorate, observable } from 'mobx';
import { observer } from 'mobx-react' 
import { PropTypes } from 'prop-types';
import ListSelector from '../ListSelector';
import H3 from '../../components/common/H3';

const SelectAndRender = observer(class SelectAndRender extends Component {
  constructor(){
    super()
    this.selected = null;
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(selected){
    this.selected = selected
  }
  render() {
    const {data, columns, label, render, noHeaders} = this.props
    return (
      <div>        
        {label && <H3>
          {label}
        </H3>}
        {!this.selected
        ? <ListSelector 
            data={data}
            columns={columns}
            onSelect={this.handleSelect}
            noHeaders={noHeaders}/>
        : render(this.selected,this.handleSelect)}
      </div>
    );
  }
})

SelectAndRender.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  label: PropTypes.string,
  render: PropTypes.func.isRequired,
  noHeaders: PropTypes.bool
}

decorate(SelectAndRender,{
  selected: observable
})
export default SelectAndRender;