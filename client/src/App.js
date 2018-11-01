import React, { Component } from 'react';
import Unit from './components/Unit';
import {Switch,Route} from 'react-router-dom'
import styled from 'styled-components';
const AppLayout = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 100px auto 100px;
  grid-template-areas:
    "header"
    "main"
    "footer";
`

const Header = styled.header`
  background-color: #222222;
  color: white;
  padding: 8px;
  font-size: 3em;
`
const Main = styled.main`
  background-color: #555555;
`
const Footer = styled.footer`
  background-color: #222222;
`
class App extends Component {
  render() {
    return (
      <AppLayout>
        <Header>
          Digital Protocol Assistant
        </Header>
        <Main>
          <Switch>
            <Route path='/' render={()=>(<Unit/>)}/>
          </Switch>
        </Main>
        <Footer/>
      </AppLayout>
    );
  }
}

export default App;
