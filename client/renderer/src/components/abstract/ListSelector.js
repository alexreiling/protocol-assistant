import React, { Component } from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css'
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Wrapper = styled.div`
  display:flex;
  /*wichtig*/
  overflow: auto;
  flex-grow:0;

  
  > .ReactTable{
    flex:1;
  }
  .rt-thead{
    padding-right: ${p => p.theme.scrollbar.thickness};
  }
  .ReactTable{
    border-width: 0;
    border-bottom:0;
  }
  .rt-tr-group{
    max-height:24px;
  	:first-of-type > .rt-tr:not(.-padRow){
      background-color: #EFE !important;
    }
  }

  .rt-td, .rt-th{
    font-size:12px;
    font-weight:400;
    padding:.3em !important;
  }
`


class ListSelector extends Component {
  render() {
    const {data, columns, noHeaders, onSelect,style} = this.props
    var conditionalProps = {}
    if(noHeaders) conditionalProps['TheadComponent'] = () => null;
    return (
      <Wrapper style={style}>

        <ReactTable
          data={data}
          columns={columns}
          className='-highlight'
          showPagination={false}
          column={{
            ...ReactTableDefaults.column,
            minWidth: 50
          }}
          minRows={2}
          pageSize={100}
          {...conditionalProps}

          getTdProps={(state,row,column,instance) => {
            return{
              onClick: (e, handleOriginal) => {
                if(row) onSelect(row.original)
                //if (handleOriginal) handleOriginal();
              }
            }
          }}
          getTbodyProps={() => {
            return {
              className: 'custom-scroll'
            }
          }}
          noDataText='Keine Daten'

        />
      </Wrapper>
    );
  }
}

ListSelector.propTypes = {
  data: PropTypes.array,
  columns: PropTypes.array.isRequired,
  noHeaders: PropTypes.bool,
  onSelect: PropTypes.func
}

export default ListSelector;