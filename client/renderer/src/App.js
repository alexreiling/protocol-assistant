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
var userAgent = navigator.userAgent.toLowerCase();
const isElectron = userAgent.indexOf(' electron/') > -1
const ipcRenderer = isElectron ? window.electron.ipcRenderer : null;


const AppLayout = styled.div`
  width: ${p => p.appWidth + 'px'};
  min-height: 500px;
  overflow: hidden;
  height: 100vh;
  background-color: ${p => p.theme.bg.bright};
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${p => p.theme.nav.thickness.main} 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
  "nav main"
  "test main";
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
  flex-direction: column;
  height: ${window.innerHeight+'px'};
  grid-area: main;

  .header{
    height:${p => p.theme.layout.header.height};
    flex-grow:0;
    flex-shrink:0;
  }
  .nav-bar{
    height: ${p => p.theme.nav.thickness.sub};
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
    this.toggleHeader = this.toggleHeader.bind(this)
    if(isElectron) ipcRenderer.on('toggled',(e,args) => {
      if(this.appWidth !== args.width) this.appWidth = args.width
    })
    this.appWidth = window.innerWidth;
    this.noteStore = new NoteStore();
    this.noteStore.init();
    this.headerVisible = true
  }
  toggleWidth(){
    ipcRenderer.send('toggle-width')
  }
  toggleHeader(){
    this.headerVisible = !this.headerVisible;
  }
  componentDidMount(){
    if(isElectron) {
      ipcRenderer.send('ready-to-show')
    }
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <AppLayout appWidth={this.appWidth}>
          <NavBar vertical items={menues.main} style={{paddingTop:'1em',borderRight: `1px solid ${theme.gridline.color}`}}/>
          <button style={{gridArea:'test',border: '1px solid limegreen'}}type='button' onClick={this.toggleWidth}>Test</button>

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
  headerVisible: observable,
  appWidth: observable
})

export default withRouter(App);
