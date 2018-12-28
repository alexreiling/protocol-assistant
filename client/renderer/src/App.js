import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components';
import UnitStore from './stores/UnitStore';
import Conversation from './containers/Conversation';
import ContentHeader from './containers/ContentHeader';
import NavBar from './containers/common/NavBar';
import NotesPage from './containers/NotesPage';

const AppLayout = styled.div`
  width: ${window.innerWidth+'px'};
  min-height: 500px;
  overflow: hidden;
  margin: auto;
  height: 100%;
  border-left: 2px solid cornflowerblue;

  display: grid;
  grid-template-columns: 48px 1fr;
  grid-template-areas:
    "nav content";
`
const Main = styled.main`
  background-color: whitesmoke;
  display: flex;
  flex-direction: column;
  > * {
    flex-shrink: 0;
  }
`

const theme = {
  bubbleMe: '#dcf8c6',
  bubbleThey: '#e6f2ff',
  bubbleStd: '#f5f5f5',
  colors: {
    bg: {
      dark: '#222222',
      bright: 'whitesmoke'
    },
    fonts: {
      bright: 'white',
      dark: 'black'
    }
    
  }
}
class App extends Component {
  constructor(){
    super()
    this.store = new UnitStore()

  }
/*   render() {
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
  } */

  render() {
    const mainMenu = [{
      to:'/#',
      imgName:'robot-active.png', 
    }]
    const subMenu = [
      {
        to:'/#',
        label: 'Up-/Crossselling'
      },
      {
        to:'/notes',
        label: 'Gesprächsnotizen',
      },
      {
        to:'/#',
        label: 'Protokoll'
      }
    ]
    return (
      <ThemeProvider theme={theme}>
        <AppLayout>
          <NavBar vertical items={mainMenu} style={{borderRight: '5px solid cornflowerblue'}}/>
          <Main>
            <ContentHeader/>
            <NavBar items={subMenu} style={{height:'32px', backgroundColor: '#222'}}/>
            <Switch>
              <Route exact path='/' render={()=>(<Redirect to='/paragraphs/'/>)}/>
              <Route exact path='/paragraphs/' render={()=>(<Conversation conv={this.store.createConv()}/>)}/>            
              <Route exact path='/notes/' render={()=>(<NotesPage/>)}/>
            </Switch>
          </Main>
        </AppLayout>
      </ThemeProvider>
    )
  }
}

export default App;
