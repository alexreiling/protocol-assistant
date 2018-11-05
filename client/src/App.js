import React, { Component } from 'react';
import Unit from './components/Unit';
import {Switch,Route} from 'react-router-dom'
import styled from 'styled-components';
import UnitStore from './stores/UnitStore';
const AppLayout = styled.div`
  display: grid;
  height: 100%;
  grid-template-rows: 50px auto 100px;
  grid-template-areas:
    "header"
    "main"
    "footer";
`

const Header = styled.header`
  background-color: #222222;
  color: white;
  padding: 8px;
  font-size: 1.5em;
  font-weight: 700;
`
const Main = styled.main`
  background-color: whitesmoke;
`
const Footer = styled.footer`
  background-color: #222222;
`
class App extends Component {
  constructor(){
    super()
    this.store = new UnitStore()

  }
  render() {
    return (
      <AppLayout>
        <Header>
          Digital Protocol Assistant
        </Header>
        <Main>
          <Switch>
            <Route path='/' render={()=>(<Unit unit={this.store.createUnit()}/>)}/>
          </Switch>
        </Main>
        <Footer/>
      </AppLayout>
    );
  }
}

export default App;
