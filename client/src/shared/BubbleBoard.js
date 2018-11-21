import styled from 'styled-components';
export const BubbleBoard = styled.div`
  display: flex;
  flex-direction: column;
`
export const BubbleBoardBubble = styled.div`
  margin: 8px;
  background-color: #EEDDDD;
  border-radius: 8px;
  padding: 8px;
  display:flex;
  max-width: 512px;
  align-self: ${props => props.side === 0 ? 'center' : props.side === 1 ? 'flex-start' : 'flex-end'};
  background-color: ${props => props.side === 0 ? props.theme.bubbleThey : props.side ===1 ? props.theme.bubbleStd: props.theme.bubbleMe};
/*   > .bubbleTools {
    align-self: right;
  } */
`