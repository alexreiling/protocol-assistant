import styled from 'styled-components'

export default styled.button`
  cursor:pointer;
  border:0;
  background-color: ${p => p.strong ? p.theme.strongButton.backgroundColor : 'inherit'};
  color: ${p => p.strong ? p.theme.strongButton.color : 'inherit'};
  border-radius: 4px;
  padding:.75em 1em;
  outline:none;
  :hover{
    background-color: ${p => p.strong ? p.theme.strongButton.hover.backgroundColor : 'inherit'};
    box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.75);

    
  }
  :active{
    background-color: ${p => p.strong ? p.theme.strongButton.active.backgroundColor : 'inherit'};
    box-shadow:none;
  }
`