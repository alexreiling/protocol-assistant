import React, { Component } from 'react';
import { decorate, observable } from 'mobx';
import { observer } from 'mobx-react' 
import { PropTypes } from 'prop-types';
import ListSelector from './ListSelector';
import H3 from '../common/H3';
import styled from 'styled-components';

const Grid = styled.div`
  display:flex;
  flex-direction: column;


`
const Headline = styled.div`
  display:flex;
  flex-direction: row;
  flex-shrink:0;
  align-content:flex-end;
  > * {
    margin-right: 16px;
  }
  
`
const SelectAndRender = observer(class SelectAndRender extends Component {
  constructor(){
    super()
    this.selected = null;
    this.handleSelect = this.handleSelect.bind(this)
  }
  handleSelect(selected){
    this.selected = selected
    this.props.onSelect && this.props.onSelect(selected)
  }

  render() {
    const {data, columns, label,headOverview, headSelected ,sub, noHeaders, className} = this.props
    return (
      <Grid className={className}>        
        <Headline>
          {label && <H3>
            {label}
          </H3>}
          {!this.selected && headOverview}
          {headSelected && this.selected && headSelected(this.selected, this.handleSelect)}
        </Headline>
        {/* <ListSelector style={{display: this.selected ? 'none' : 'initial'}}
            data={data}
            columns={columns}
            onSelect={this.handleSelect}
            noHeaders={noHeaders}/>
        {this.selected && render(this.selected,this.handleSelect)} */}
        <ListSelector 
          style={{display: this.selected ? 'none' : 'flex', height: '100%'}}
          data={data}
          columns={columns}
          onSelect={this.handleSelect}
          noHeaders={noHeaders}/>
        {this.selected && data && sub && sub(this.selected,this.handleSelect)}
      </Grid>
    );
  }
})

SelectAndRender.propTypes = {
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  label: PropTypes.string,
  head: PropTypes.func,
  sub: PropTypes.func,
  noHeaders: PropTypes.bool
}

decorate(SelectAndRender,{
  selected: observable
})
export default SelectAndRender;