// modules
import React, { Component } from 'react';
import {Switch,Route,Redirect} from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components';

// config
import { theme, menues } from './config';

// mock data
import { selling } from './data/dummy';


// components
import Header from './components/Header/index';
import NavBar from './components/abstract/NavBar';
import NotesPage from './components/Pages/NotesPage';
import ProtocolPage from './components/Pages/ProtocolPage/index';
import SellingPage from './components/Pages/SellingPage';

const AppLayout = styled.div`
  width: ${window.innerWidth+'px'};
  min-height: 500px;
  overflow: hidden;
  height: 100vh;
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
    //this.store = new UnitStore()
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppLayout>
          <NavBar vertical items={menues.main} style={{borderRight: '5px solid rgb(255,100,100,.45)'}}/>
          <Main>
            <Header/>
            <NavBar items={menues.sub} style={{backgroundColor: '#222'}}/>
            <Switch>
              <Route exact path='/' render={()=>(<Redirect to='/selling'/>)}/>
              <Route exact path='/selling/' render={()=>(<SellingPage items={selling}/>)}/>              
              <Route exact path='/notes/' render={()=>(<NotesPage/>)}/>
              <Route exact path='/protocol/' render={()=>(<ProtocolPage/>)}/>
            </Switch>
          </Main>
        </AppLayout>
      </ThemeProvider>
    )
  }
}

export default App;
