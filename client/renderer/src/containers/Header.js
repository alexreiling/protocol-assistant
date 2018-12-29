import React, { Component } from 'react';
import styled from 'styled-components';
import {columns} from '../config';
import {concerns} from '../data/dummy';
import clients from '../data/clients';
import SelectAndRender from './SelectAndRender';
import ClientDetails from './ClientDetails';
import ConcernDetails from './ConcernDetails';
import ClientHead from '../components/ClientHead'

const Grid = styled.div`

  display:flex;
  flex-direction:row;
  flex-wrap: wrap;
  
  padding: 0 8px 0 8px;
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

class ContentHeader extends Component {
  render() {
    return (
      <Grid>
        <SelectAndRender
          className='clients custom-scroll'
          data={clients}
          label='Erkannte Versicherungsnehmer'
          columns={columns.client}
          head={(selected,onExit) => <ClientHead client={selected} onExit={onExit}/>}
          sub={(selected,onExit) => <ClientDetails client={selected} onExit={onExit}/>}
        />
        <SelectAndRender 
          data={concerns}
          className='concerns'
          label='Erkannte Anliegen'
          columns={columns.concern}            
          sub={(selected,onExit) => <ConcernDetails concern={selected} onExit={onExit}/>}
          noHeaders/>
        <SelectAndRender
          className='contracts'
          label='Verträge und Vorgänge'
          data={clients}
          columns={columns.client}
          noHeaders/>


      </Grid>
    );
  }
}

export default ContentHeader;