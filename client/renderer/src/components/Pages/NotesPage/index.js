import React, { Component } from 'react';
import styled from 'styled-components';
import Page from '../Page';
import Note from './Note';
import { observer, Observer } from 'mobx-react';
import { decorate, observable } from 'mobx'
import VerticalCardList from '../../abstract/VerticalCardList';
import InputWithButton from '../../abstract/InputWithButton';


const NotesPage = class NotesPage extends Component {
  constructor(props){
    super()
    this.store = props.store;
    this.addNote = this.addNote.bind(this)
  }
  addNote(text) {
    console.log(text)
    this.store.addNote({label: text})
  }
  render() {
    return ( 
      <Page title='Notizen'>
        <InputWithButton onSubmit={this.addNote}/>
        <VerticalCardList className={'custom-scroll'}
          items={this.store.getNotes()}
          renderItem={(note)=><Note data={note}/>}/>
      </Page>

    );
  }
}

decorate(NotesPage,{
  notes: observable
})

export default NotesPage;