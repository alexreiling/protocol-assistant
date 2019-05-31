import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from 'styled-components';
import App from './App';
import { Switch, Route } from 'react-router-dom'
import { BrowserRouter, withRouter } from 'react-router-dom'
import { theme } from './config';
import SimTools from './components/SimTools';

const Navigable = withRouter(class Navigable extends Component {
  constructor(props) {
    super(props)
    if (window.electron) {
      const { ipcRenderer } = window.electron
      ipcRenderer.on('navigation', (event, args) => {
        props.history.push(args)
      })
    }
  }
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path='/simtools' render={() => (<SimTools />)} />
          <Route path='/app' render={() => (<App />)} />
        </Switch>
      </ThemeProvider>
    )
  }
})


ReactDOM.render(
  <BrowserRouter>
    <Navigable />
  </BrowserRouter>
  , document.getElementById('root'));

