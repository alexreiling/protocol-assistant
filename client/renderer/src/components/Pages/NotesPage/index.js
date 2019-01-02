import React, { Component } from 'react';
import styled from 'styled-components';
import Page from '../Page';

class NotesPage extends Component {
  render() {
    return ( 
      <Page title='Notizen'>
        <button type='button'>Neues Thema</button>
      </Page>

    );
  }
}

export default NotesPage;