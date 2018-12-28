import React, { Component } from 'react';
import styled from 'styled-components';
import ListSelector from './ListSelector';
import {columns} from '../config/config';
import {clients, concerns} from '../data/dummy';
import SelectAndRender from './SelectAndRender';
import ClientDetails from './ClientDetails';
import ConcernDetails from './ConcernDetails';
const Grid = styled.div`
  display: flex;
  padding: 1em;
  > div {
    flex-basis:50%;
    display: flex;
    flex-direction: column;
    :nth-child(odd) {
      padding-right: .5em;
    } 
    :nth-child(even) {
      padding-left: .5em;
    } 
  }

  
`

class ContentHeader extends Component {
  render() {
    return (
      <Grid>
        <div>
          <SelectAndRender 
            data={clients}
            label='Auswahl Versicherungsnehmer'
            columns={columns.client}
            render={(selected,onExit) => <ClientDetails client={selected} onExit={onExit}/>}
          />
            
          <SelectAndRender 
            data={concerns}
            label='Auswahl Anliegen'
            columns={columns.concern}            
            render={(selected,onExit) => <ConcernDetails concern={selected} onExit={onExit}/>}
            noHeaders/>
        </div>
        <div>
          <ListSelector
            label='Verträge und Vorgänge'
            data={clients}
            columns={columns.client}
            noHeader/>
          <ListSelector
            data={clients}
            columns={columns.client}
            noHeader/>
        </div>
      </Grid>
    );
  }
}

export default ContentHeader;