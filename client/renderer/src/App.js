import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components';
import UnitStore from './stores/UnitStore';
import Conversation from './containers/Conversation';
import AdaptiveList from './containers/AdaptiveList';
import CardGrid from './containers/CardGrid'
import Scrollable from './containers/Scrollable';

const AppLayout = styled.div`
  width: ${window.innerWidth+'px'};
  min-height: 500px;
  overflow: hidden;
  margin: auto;
  font-size: 14px;
  font-family: Roboto,Helvetica,Arial,sans-serif;
  display: grid;
  height: 100%;
  grid-template-rows: 50px 1fr 100px;
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
  grid-template-rows:24px 1fr;
`
const Footer = styled.footer`
  background-color: #222222;

`
const Nav = styled.nav`
  background-color: #222222;
  color:white;
`
const theme = {
  bubbleMe: '#dcf8c6',
  bubbleThey: '#e6f2ff',
  bubbleStd: '#f5f5f5'
}
class App extends Component {
  constructor(){
    super()
    this.store = new UnitStore()

  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppLayout>
          <Header>
            Digital Protocol Assistant
          </Header>
          <Main>
            <Nav>
              <AdaptiveList></AdaptiveList>
            </Nav>
            <Switch>
              <Route exact path='/' render={()=>(<Redirect to='/paragraphs'/>)}/>
              <Route exact path='/test' render={()=><p>Hi</p>}/>
              <Route exact path='/paragraphs' render={()=>(<Conversation conv={this.store.createConv()}/>)}/>
              <Route exact path='/scrollable' render={()=>(<Scrollable/>)}/>
            
            </Switch>
          </Main>
          <Footer/>
        </AppLayout>
  
      </ThemeProvider>
    );
  }
}

export default App;
