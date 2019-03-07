import React, { Component } from 'react';
import styled from 'styled-components';
import H2 from '../common/H2';
import { theme } from '../../config';

import Section from './Section';
import ConversationStore from './ConversationStore';
import Button from '../common/Button';
import ipcMessage from './ipcMessage';
import Audio from './Audio';

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
          description='Aktiviert oder deaktiviert die Datenupdates vom Server.'>
          <ConversationStore/>
        </Section>
        <Section
          title='Audiotranskription'
          description='Steuert die Aufnahme per Mikrofon und Übermittlung an den Server'>
          <Audio/>
        </Section>
      </Layout>
    );
  }
}

export default SimTools;