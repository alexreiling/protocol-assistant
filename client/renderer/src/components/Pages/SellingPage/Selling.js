import React, { Component } from 'react';
import styled from 'styled-components';
import H3 from '../../common/H3';
import ExitButton from '../../common/RoundButton';
import CircleDiv from '../../common/CircleDiv';
import {observer} from 'mobx-react' 
import { decorate, observable } from 'mobx';
import ReactTooltip from 'react-tooltip'
import { theme } from '../../../config';
import BrowserLink from '../../abstract/BrowserLink';
const Label = styled.div`

`
const FlexRow = styled.div`
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
      <CircleDiv  data-tip={item.text} style={{backgroundColor: item.color || theme.sellingHints.defaultColor}}r={4}/>
      <Label><BrowserLink url='https://www.google.com'  label='mehr Informationen'>{item.name}</BrowserLink></Label>
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
    //const items = this.props.item.items
    const items = [{name: this.props.item.text}]
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
    const {type, name, seen} = this.props.item
    const items = [{name: this.props.item.text}]
    return (
      <div>
        <FlexRow>
          <H3 style={{cursor: 'pointer'}} onClick={this.toggle}>{name}</H3>
            
          <FlexRow style={{opacity: !seen ? 1 : 0, fontStyle: 'italic',WebkitTransition: 'opacity 2s linear'}}>
            <CircleDiv pulsate r={4} style={{backgroundColor: '#A00'}}/>
            <div style={{color:'#A00'}}>neu!</div>
          </FlexRow>
        </FlexRow>
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