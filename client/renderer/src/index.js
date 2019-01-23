import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ThemeProvider } from 'styled-components';
import App from './App';
import {Switch,Route} from 'react-router-dom'
import {BrowserRouter} from 'react-router-dom'
import { theme } from './config';
import SimTools from './components/SimTools';

ReactDOM.render(
<BrowserRouter>
  <ThemeProvider theme={theme}>
    <Switch>
      <Route exact path='/simtools' render={()=>(<SimTools/>)}/>
      <Route path='/' render={()=>(<App/>)}/>
    </Switch>
  </ThemeProvider> 
</BrowserRouter>
, document.getElementById('root'));

