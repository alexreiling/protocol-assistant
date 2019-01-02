import React, { Component } from 'react';
import styled from 'styled-components';
import H3 from '../../common/H3';
import ExitButton from '../../common/ExitButton';
import CircleDiv from '../../common/CircleDiv';
import {observer} from 'mobx-react' 
import { decorate, observable } from 'mobx';
import ReactTooltip from 'react-tooltip'
const Label = styled.div`

`
const Header = styled.div`
  display:flex;
  align-items: center;
  > * {
    margin-right:4px;
  }
`
const Wrapper = styled.div`
  display:flex;
  align-items: center;
  > * {
    margin-right:8px;
  }
`


const SellingItem = (props) => {
  const {item,onFilter} = props
  return(
    <Wrapper>
      <ReactTooltip />
      <CircleDiv  data-tip={item.text} style={{backgroundColor: item.color}}r={4}/>
      <Label>{item.name}</Label>
      <ExitButton r={8} onClick={()=>onFilter(item)}>✕</ExitButton>
    </Wrapper>
  )
}

var Selling = observer(class Selling extends Component {
  constructor(){
    super()
    this.filter = new Map();
    this.filterItem = this.filterItem.bind(this)
    this.isFiltered = this.isFiltered.bind(this)
    this.toggle = this.toggle.bind(this)
  }
  toggle(){
    const items = this.props.item.items
    if([...this.filter.keys()].length===items.length) this.filter.clear()
    else items.forEach(item => this.filterItem(item))
  }
  filterItem(item){
    this.filter.set(item.name,item)
  }
  isFiltered(item){
    return this.filter.has(item.name)
  }
  render() {
    const {type, name, items} = this.props.item
    return (
      <div>
        <Header>
{/*           {this.filter.length!==items.length 
            && <ExitButton 
              r={8} 
              onClick={()=>items.forEach(item =>this.filterItem(item))}>-</ExitButton>} */}
          <H3 style={{cursor: 'pointer'}} onClick={this.toggle}>{name}</H3>
{/*           {this.filter.length>0 
            && <ExitButton 
              r={8} 
              onClick={()=>this.filter.clear()}>↻</ExitButton>} */}
        </Header>
        <div>
          {items.map((item,key) => !this.isFiltered(item)
            && <SellingItem 
              key={key.toString()}
              item={item}
              onFilter={this.filterItem}/>)}
        </div>
      </div>
    );
  }
})

decorate(Selling,{
  filter: observable
})

export default Selling;