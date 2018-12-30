import styled from 'styled-components'
const rDefault = 10;
export default styled.div`
  border-radius: ${p => 2 * (p.r || rDefault) + 'px'};
  line-height: ${p => 2 * (p.r || rDefault) + 'px'};
  height:${p => 2 * (p.r || rDefault) + 'px'};
  width: ${p => 2 * (p.r || rDefault) + 'px'};
`