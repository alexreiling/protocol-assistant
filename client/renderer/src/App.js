// modules
import React, { Component } from 'react';
import {Switch,Route,Redirect, withRouter} from 'react-router-dom'
import styled from 'styled-components';
import { decorate, observable } from 'mobx';
import { observer } from 'mobx-react';

// config
import { theme, menues } from './config';

// components
import Header from './components/Header/index';
import NavBar from './components/abstract/NavBar';
import NotesPage from './components/Pages/NotesPage';
import ProtocolPage from './components/Pages/ProtocolPage/index';
import SellingPage from './components/Pages/SellingPage';
import Toggler from './components/abstract/Toggler';
import Button from './components/abstract/NavBar/Button';
import conversations from './stores/ConversationStore';
import { isElectron, ipcRenderer, sendToMain } from './util/electronHelpers';
import img from './assets/img';
import { Image } from './components/abstract/NavBar/NavButton';

const AppLayout = styled.div`
  width: ${p => p.appWidth + 'px'};
  min-height: 500px;
  overflow: hidden;
  height: 100vh;
  background-color: ${p => p.theme.bg.bright};
  box-sizing: border-box;
  display: grid;
  grid-template-columns: ${p => `${p.theme.nav.thickness.main} calc(${p.appWidth}px - ${p.theme.nav.thickness.main})`};
  grid-template-areas:
  "nav main";
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
    // method bindings
    this.toggleHeader = this.toggleHeader.bind(this)
    this.toggleAppCollapse = this.toggleAppCollapse.bind(this)
    if(isElectron) {
      ipcRenderer.on('toggled',(e,args) => {
        console.log(args.width)

        if(this.appWidth !== args.width) 
        {
          this.appCollapsed = args.width < this.appWidth
          this.appWidth = args.width
        }
      })
    }
    this.appWidth = window.innerWidth;
    this.headerVisible = true
    this.appCollapsed = true
    
  }
  toggleAppCollapse(){
    sendToMain('toggle-width')
  }
  toggleHeader(){
    this.headerVisible = !this.headerVisible;
  }
  openSimTools(){
    sendToMain('open-sim-tools')    
  }
  openDevTools(){
    sendToMain('open-dev')
  }
  componentDidMount(){
    sendToMain('ready-to-show')
    conversations.createNewConversation()
  }
  closeApp(){
    sendToMain('close-app')
  }
  render() {
    const conv = conversations.getConversation()
    return (
      <AppLayout appWidth={this.appWidth}>
        <NavBar 
          vertical
          items={menues.main}
          onToggle={this.toggleWidth}
          style={{paddingTop:'1em',borderRight: `1px solid ${theme.gridline.color}`}}>
          {isElectron && <Button
            style={{ height: theme.nav.thickness.main, lineHeight: theme.nav.thickness.main}}
            onClick={this.openSimTools}>
            SIM
          </Button>}
          {isElectron && <Button
            style={{ height: theme.nav.thickness.main, lineHeight: theme.nav.thickness.main}}
            onClick={this.openDevTools}>
            DEV
          </Button>}
          <Toggler
            onClick={this.toggleAppCollapse}
            style={{ height: theme.nav.thickness.main, lineHeight: theme.nav.thickness.main}}
            displayState={!this.appCollapsed}
            vertical/>
          <Button 
            style={{ height: theme.nav.thickness.main, lineHeight: theme.nav.thickness.main}}
            onClick={this.closeApp}
            red>✕</Button>
        </NavBar>
        {conv ?
        <Main>
            <Header style={{display: !this.headerVisible && 'none'}}/>
            <NavBar 
              items={[
                {
                  to:'/selling',
                  label: 'Up-/Crossselling',
                  img: img.upsellingActive,
                  imgInactive: img.upsellingInactive,
                  unseen: conversations.getNumOfUnseenHints(),
                  onClick: ()=>conv.sellingHints.unseenCounter = 0
                },
                {
                  to:'/notes',
                  label: 'Gesprächsnotizen',
                  img: img.notesActive,
                  imgInactive: img.notesInactive,
                  unseen: conversations.getNumOfUnseenNotes()
                },
              ]} 
              style={{borderTop: `1px solid ${theme.gridline.color}`}}>
              <Toggler
                onClick={this.toggleHeader}
                style={{width: '48px', lineHeight: theme.nav.thickness.sub}}
                displayState={this.headerVisible}
              />
            </NavBar>
            <Switch>
              <Route exact path='/' render={()=>(<Redirect to='/selling'/>)}/>
              <Route exact path='/selling/' render={()=>(<SellingPage items={conversations.getSellingHints()}/>)}/>              
              <Route exact path='/notes/' render={()=>(<NotesPage store={conversations}/>)}/>
              <Route exact path='/protocol/' render={()=>(<ProtocolPage/>)}/>
            </Switch>
        </Main>
        : !this.appCollapsed && <div style={{display:'flex',flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
          <img src={img.robotInactive} style={{width:'50px'}}/>
          <div style={{fontSize:24, color: theme.font.color.gray, marginTop:'1em'}}>eLisA schläft...</div>
        </div>}
      </AppLayout>
    )
  }
})
decorate(App,{
  headerVisible: observable,
  appCollapsed: observable,
  appWidth: observable
})

export default withRouter(App);
