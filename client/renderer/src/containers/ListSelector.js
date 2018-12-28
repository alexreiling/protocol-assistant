import React, { Component } from 'react';
import ReactTable, { ReactTableDefaults } from 'react-table';
import 'react-table/react-table.css'
import styled from 'styled-components';
import PropTypes from 'prop-types';
const Wrapper = styled.div`
  margin-bottom: 1em;
`
class ListSelector extends Component {
  render() {
    const {data, columns, noHeaders, onSelect} = this.props
    var conditionalProps = {}
    if(noHeaders) conditionalProps['TheadComponent'] = () => null;
    return (
      <Wrapper>

        <ReactTable
          data={data}
          columns={columns}
          className='-striped -highlight'
          showPagination={false}
          style={{height:'10em'}}
          column={{
            ...ReactTableDefaults.column,
            minWidth: 50
          }}
          pageSize={10}
          {...conditionalProps}
          getTdProps={(state,row,column,instance) => {
            return{
              onClick: (e, handleOriginal) => {
                if(row) onSelect(row.original)
                //if (handleOriginal) handleOriginal();
              }
            }
          }}
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