import React, { Component } from 'react';
import styled from 'styled-components';
import Image from '../../components/common/Image';
import ReactTable, { ReactTableDefaults } from 'react-table';
import {columns} from '../../config/';
import clients from '../../data/clients';


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

const Div2 = styled.div`
  display:flex;
  flex-direction:column;
  flex:1;
  height:100px;
  box-sizing:border-box;

`
class NotesPage extends Component {
  render() {
    return (
      <div>
      <Div>
        <Container>
          <Image style={{border: '1px solid red'}} imgName='robot-active.png'/>
        <div>Test</div>

        </Container>
        
      </Div>
      <Container>
      
      <div style={{display: 'grid',height:'400px', gridTemplateRows:'200px 1fr'}}> 

        <Div2 >
          <ReactTable
                    style={{height:'100%'}}
                    data={clients}
                    showPagination={false}
                    columns={columns.client}/>
          <div style={{display: 'flex', flexDirection: 'column', flexShrink: 1}}>
            <div>Header</div>
            <div style={{display: 'flex', height:'100px', flexShrink: 1, boxSizing: 'border-box'}}>    
              
            </div>

          </div>

          </Div2>
          <div style={{ overflow:'hidden', flexShrink:1,minHeight:0, backgroundColor:'green'}}>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>
            <div>test</div>



            </div> 
          {/* <ReactTable
            style={{overflow:'auto'}}
            data={clients}
            showPagination={false}
            columns={columns.client}/> */}
 

      </div>
    </Container>
    </div>
    );
  }
}

export default NotesPage;