import React, { Component } from 'react';
import styled from 'styled-components';
import H2 from '../common/H2';
import { theme } from '../../config';
import ToggleSwitch from '../common/ToggleSwitch';

import Section from './Section';
import Clients from './Clients';
import Button from '../common/Button';
import ipcMessage from './ipcMessage';

// TODO: pack in function


const Layout = styled.div`
  color: ${theme.font.color.dark};
  overflow: auto;
  height: 100vh;
  box-sizing: border-box;
`
class SimTools extends Component {
  render() {
    return (
      <Layout>
        <Section>
          <H2>eLisA SimTools</H2>
          <p>Mit diesem Panel können verschiedene Betriebszustände von eLisA getestet werden.</p>
        </Section>
        <Section
          title='Beginn eines neuen Kundengespräches'
          description='Simuliert den Beginn eines neuen Kundengespräches'>
          <Button strong onClick={() => ipcMessage('store-action',{
            action: 'createNewConversation'
          })}>Neues Gespräch initiieren</Button>
        </Section>
{/*         <Section 
          title='Aktivität/Einverständnis Versicherungsnehmer'
          description='Steuert die Aktivität von eLisA, die abhängig von der Einverständniserklärung des Versicherungsnehmers ist.'>
          
          <ToggleSwitch
            onChange={(checked)=>console.log(checked)}/>
        </Section> */}
        <Section 
          title='Datenänderung:'
          description='Simuliert die Änderung von Daten im Backend.'>
          <Clients/>
        </Section>
      </Layout>
    );
  }
}

export default SimTools;