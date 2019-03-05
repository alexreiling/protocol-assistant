// modules
import React, { Component } from 'react';
import styled from 'styled-components';

// config
import {columns} from '../../config';

// components
import SelectAndRender from '../abstract/SelectAndRender';
import ClientDetails from './ClientDetails';
import ConcernDetails from './ConcernDetails';
import ClientHead from './ClientHead'
import { decorate, observable } from 'mobx';
import { observer } from 'mobx-react';
import ContractDetails from './ContractDetails';
import conversations from '../../stores/ConversationStore';
import BrowserLink from '../abstract/BrowserLink';


const Grid = styled.div`

  display:flex;
  flex-direction:row;
  flex-wrap: wrap;
  
  padding: 0 1px 1px 8px;
  > * {
    flex:1;
    box-sizing: border-box;
    height: 40%;
    flex-basis:50%;

  }
  .clients {
    border-bottom: .5px solid lightgray;
    overflow-y:hidden;
    height:60%;
    flex-basis:100%;
    padding-bottom:.5px;

  }
  .contracts{
    padding-left:8px;
  }
  .concerns{
    border-right: .5px solid rgb(0,0,0,.25);
    padding-right:8px;

  }
`

const Header = observer(class Header extends Component {

  render() {
    return (
      <Grid style={this.props.style} className={'header'}>
        <SelectAndRender
          className='clients custom-scroll'
          data={conversations.getCustomers()}
          label='Erkannte Versicherungsnehmer'
          headOverview={<BrowserLink url='https://www.google.com' label='Externe Suche'><span>🔍</span></BrowserLink>}
          onSelect={(selected) => conversations.setCustomer(selected)}
          columns={columns.client}
          headSelected={(selected,onExit) => <ClientHead client={selected} onExit={onExit}/>}
          sub={(selected,onExit) => <ClientDetails client={selected} onExit={onExit}/>}
        />
        <SelectAndRender 
          data={conversations.getConcerns()}
          className='concerns custom-scroll'
          headOverview={<BrowserLink url='https://www.google.com' label='Externe Suche'><span>🔍</span></BrowserLink>}
          label='Erkannte Anliegen'
          columns={columns.concern}            
          sub={(selected,onExit) => <ConcernDetails concern={selected} onExit={onExit}/>}
          noHeaders/>
        <SelectAndRender
          className='contracts custom-scroll'
          label='Verträge und Vorgänge'
          data={conversations.getCustomer() ? conversations.getCustomer().contracts : []}
          columns={columns.contract}
          sub={(selected,onExit) => <ContractDetails contract={selected} onExit={onExit}/>}
          noHeaders/>

      </Grid>
    );
  }
})
decorate(Header,{
  selectedClient: observable
})
export default Header;