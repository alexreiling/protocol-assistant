import React, { Component } from 'react';
import Page from '../Page';
import Note from './Note';
import VerticalCardList from '../../abstract/VerticalCardList';
import InputWithButton from '../../abstract/InputWithButton';
import { observer } from 'mobx-react';



const NotesPage = observer(class NotesPage extends Component {
  constructor(props){
    super(props)
    this.addNote = this.addNote.bind(this)
  }
  addNote(name) {
    this.props.store.addNote(name)
  }
  render() {
    return ( 
      <Page title='Notizen'>
        <InputWithButton 
          onSubmit={this.addNote}
          clearAfterSubmit
          buttonText='Hinzufügen'
          placeholder='Neues Thema...'
          validator={text => text}
          messageOnInvalid='Bitte benennen Sie das neue Thema'
          style={{width:'300px'}}/>
        <VerticalCardList className={'custom-scroll'}
          items={this.props.store.getNotes()}
          renderItem={(note)=><Note note={note}/>}/>
      </Page>

    );
  }
})

export default NotesPage;