// modules
import React, { Component } from 'react';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components';
import { decorate, observable } from 'mobx';
import { observer } from 'mobx-react';

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
import NoteStore from './stores/NoteStore';
import Toggler from './components/abstract/Toggler';

const AppLayout = styled.div`
  width: ${window.innerWidth+'px'};
  min-height: 500px;
  overflow: hidden;
  height: 100vh;
  background-color: ${p => p.theme.bg.bright};
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
      background: ${p => p.theme.scrollbar.color.thumb};
      border-radius: 1ex;
      box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);
    }
    ::-webkit-scrollbar-corner {
      background: ${p => p.theme.scrollbar.color.lane};
    }
  }
`
const Main = styled.main`
  display: flex;
  /* grid-template-rows: ${p => p.theme.layout.header.height} ${p => p.theme.layout.nav.thicknessSub} 1fr; */
  flex-direction: column;
  height: ${window.innerHeight+'px'};

  .header{
    height:${p => p.theme.layout.header.height};
    flex-grow:0;
    flex-shrink:0;
  }
  .nav-bar{
    height: ${p => p.theme.layout.nav.thicknessSub};
    flex-grow:0;
    flex-shrink:0;
  }
  .page{
    flex-grow: 1;
  }
`

const App = observer(class App extends Component {
  constructor(){
    super()
    //this.store = new UnitStore()
    this.noteStore = new NoteStore();
    this.noteStore.init();
    this.headerVisible = true
    this.toggleHeader = this.toggleHeader.bind(this)
  }
  toggleHeader(){
    this.headerVisible = !this.headerVisible;
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppLayout>
          <NavBar vertical items={menues.main} style={{borderRight: `1px solid ${theme.gridline.color}`}}/>
          <Main>
            <Header style={{display: !this.headerVisible && 'none'}}/>
            <Toggler
              onClick={this.toggleHeader} 
              style={{marginTop: '.5em'}}
              displayState={this.headerVisible}>Click</Toggler>
            <NavBar items={menues.sub} style={{borderTop: `1px solid ${theme.gridline.color}`}}/>
            <Switch>
              <Route exact path='/' render={()=>(<Redirect to='/selling'/>)}/>
              <Route exact path='/selling/' render={()=>(<SellingPage items={selling}/>)}/>              
              <Route exact path='/notes/' render={()=>(<NotesPage store={this.noteStore}/>)}/>
              <Route exact path='/protocol/' render={()=>(<ProtocolPage/>)}/>
            </Switch>
          </Main>
        </AppLayout>
      </ThemeProvider>
    )
  }
})

decorate(App,{
  headerVisible: observable
})

export default withRouter(App);
