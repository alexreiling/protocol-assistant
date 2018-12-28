import React, { Component } from 'react';
import styled from 'styled-components';
import Image from '../../components/common/Image';

const Div = styled.div`
  display: flex;
  flex-direction:row;
  max-height: 90px;
  height: 90px;
  box-sizing:border-box;

`
const Container = styled.div`
  display: flex;
  flex-direction:column;
  padding: 4px;
  height:100%;
  max-height:100%;
  box-sizing:border-box;

`

class NotesPage extends Component {
  render() {
    return (
      <Div>
        <Container>
          <Image style={{border: '1px solid red'}} imgName='robot-active.png'/>
        <div>Test</div>

        </Container>
      </Div>

    );
  }
}

export default NotesPage;