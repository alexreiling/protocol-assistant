import React, { Component } from 'react';
import styled from 'styled-components';
import H2 from '../common/H2';
import H3 from '../common/H3';
import { theme } from '../../config';
import ToggleSwitch from '../common/ToggleSwitch';

const Layout = styled.div`
  color: ${theme.font.color.dark};
`
const Section = styled.div`
  border-top: 1px solid ${theme.gridline.color};
  background-color: ${theme.bg.bright};
  padding: 8px;
  :first-child {
    background-color: ${theme.bg.contrast};
  }
`
class SimTools extends Component {
  render() {
    return (
      <Layout>
        <Section>
        <H2>eLisA SimTools</H2>
        <p>Mit diesem Panel können verschiedene Betriebszustände von eLisA getestet werden.</p>

        </Section>
        <Section>
          <H3>Aktivität/Einverständnis Versicherungsnehmer</H3>
          <p>Steuert die Aktivität von eLisA, die abhängig von der Einverständniserklärung des Versicherungsnehmers ist.</p>
          <ToggleSwitch
            onChange={(checked)=>console.log(checked)}/>
        </Section>
      </Layout>
    );
  }
}

export default SimTools;