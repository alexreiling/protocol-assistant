import React, { Component } from 'react';
import Page from '../Page';
import Note from './Note';
import VerticalCardList from '../../abstract/VerticalCardList';
import InputWithButton from '../../abstract/InputWithButton';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Button from '../../common/Button';
import ToggleSwitch from '../../common/ToggleSwitch';
import { saveFile } from '../../../util/electronHelpers';


const SaveWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding:8px;
  border-top: .5px solid rgb(0,0,0,.25);
`;
const Label = styled.div`
  margin: 0 8px 0 24px;
`;

const NotesPage = observer(class NotesPage extends Component {
  constructor(props) {
    super(props)
    this.handleNotesSave = this.handleNotesSave.bind(this)
    this.addNote = this.addNote.bind(this)
    this.state = {
      knr: false,
      vnr: false
    }
  }
  addNote(name) {
    this.props.store.addNote(name)
  }
  handleNotesSave() {

    let saveOptions = {
      filters: [
        { name: 'JSON-Datei', extensions: ['json'] }
      ]
    }
    let content = JSON.stringify(this.props.store.getNotes().map(note => note.data))
    saveFile(content, saveOptions, () => {
      this.setState({
        knr: false,
        vnr: false,
      })
      alert('Notizen wurden gespeichert.')
    })

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
          style={{ width: '300px' }} />
        <VerticalCardList
          style={{ height: '1fr', flexGrow: 1 }}
          items={this.props.store.getNotes()}
          renderItem={(note) => <Note note={note} />} />
        <SaveWrapper>
          <Label style={{ marginLeft: 0 }}>VNR:</Label>
          <ToggleSwitch checked={this.state.vnr} />
          <Label>KNR:</Label>
          <ToggleSwitch checked={this.state.knr} />
          <Button strong style={{ marginLeft: 'auto' }} onClick={this.handleNotesSave}>Speichern</Button>
        </SaveWrapper>
      </Page>

    );
  }
})

export default NotesPage;