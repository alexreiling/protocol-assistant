import styled from 'styled-components'

export default styled.input`
  border:0;
  border-bottom: ${p => p.theme.input.borderBottom};
  border-radius: 2px;
  background-color: ${p => p.contrast ? p.theme.input.contrast.backgroundColor : 'inherit'};
  padding: .5em .5em 4px;
  :focus{
    outline:none;
    padding: .5em .5em 3px;
    border-bottom: ${p => p.theme.input.focus.borderBottom};
  }
`