import styled from 'styled-components'
const rDefault = 10;
export default styled.div`
  cursor: pointer;
  padding: ${p => .25 * (p.r || rDefault) + 'px'};
  border-radius: ${p => 2 * (p.r || rDefault) + 'px'};
  text-align: center;
  line-height: ${p => 2 * (p.r || rDefault) + 'px'};
  height:${p => 2 * (p.r || rDefault) + 'px'};
  width: ${p => 2 * (p.r || rDefault) + 'px'};
  :hover{
    background-color: ${p => p.theme.colors.button.bright.hover}
  }
`