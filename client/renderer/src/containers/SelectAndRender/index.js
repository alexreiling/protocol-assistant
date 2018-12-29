import React, { Component } from 'react';
import { decorate, observable } from 'mobx';
import { observer } from 'mobx-react' 
import { PropTypes } from 'prop-types';
import ListSelector from '../ListSelector';
import H3 from '../../components/common/H3';
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

  
`
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
    const {data, columns, label, head ,sub, noHeaders, className} = this.props
    return (
      <Grid className={className}>        
        <Headline>
          {label && <H3>
            {label}
          </H3>}
          {head && this.selected && head(this.selected, this.handleSelect)}
        </Headline>
        {/* <ListSelector style={{display: this.selected ? 'none' : 'initial'}}
            data={data}
            columns={columns}
            onSelect={this.handleSelect}
            noHeaders={noHeaders}/>
        {this.selected && render(this.selected,this.handleSelect)} */}
        {!this.selected ? <ListSelector 
            data={data}
            columns={columns}
            onSelect={this.handleSelect}
            noHeaders={noHeaders}/>
        : sub (this.selected,this.handleSelect)}
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