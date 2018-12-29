import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components';
import UnitStore from './stores/UnitStore';
import Conversation from './containers/Conversation';
import Header from './containers/Header';
import NavBar from './containers/common/NavBar';
import NotesPage from './containers/NotesPage';
import { theme } from './config';

const AppLayout = styled.div`
  width: ${window.innerWidth+'px'};
  min-height: 500px;
  overflow: hidden;
  height: 100%;
  border-left: 1px solid darkblue;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${p => p.theme.layout.nav.thicknessMain} 1fr;
  grid-template-areas:
  "nav content";
  .custom-scroll{
    ::-webkit-scrollbar {
      width: ${p => p.theme.scrollbar.thickness};
      height: ${p => p.theme.scrollbar.thickness};

    }
    ::-webkit-scrollbar-thumb {
      background: ${p => p.theme.colors.bg.dark};
      border-radius: 1ex;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
    }
    ::-webkit-scrollbar-corner {
      background: ${p => p.theme.colors.bg.bright};
    }
  }
`
const Main = styled.main`
  background-color: whitesmoke;
  display: grid;
  grid-template-rows: ${p => p.theme.layout.header.height} ${p => p.theme.layout.nav.thicknessSub} 1fr;
  flex-direction: column;
  > * {
    flex-shrink: 0;
  }
`


class App extends Component {
  constructor(){
    super()
    this.store = new UnitStore()
  }

  render() {
    const mainMenu = [{
      to:'/#',
      imgName:'robot-active.png', 
    }]
    const subMenu = [
      {
        to:'/#',
        label: 'Up-/Crossselling',
      imgName:'robot-active.png', 

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
          <NavBar vertical items={mainMenu} style={{borderRight: '5px solid rgb(255,100,100,.45)'}}/>
          <Main>
            <Header/>
            <NavBar items={subMenu} style={{backgroundColor: '#222'}}/>
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
