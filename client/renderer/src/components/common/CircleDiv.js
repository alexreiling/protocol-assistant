import styled from 'styled-components'
const rDefault = 10;
export default styled.div`
  @keyframes pulse-dot {
    0% {
      transform: scale(.75);
    }
    50% {
      transform: scale(.8);
    }
    100% {
      transform: scale(.75);
    }
  }
  @keyframes pulse-ring {
    0% {
      transform: scale(.5);
    }
    50% {
      transform: scale(1.25)
    }
    100% {
      opacity: 0;
      transform: scale(4/3)
    }
  }
  border-radius: ${p => 2 * (p.r || rDefault) + 'px'};
  line-height: ${p => 2 * (p.r || rDefault) + 'px'};
  height:${p => 2 * (p.r || rDefault) + 'px'};
  width: ${p => 2 * (p.r || rDefault) + 'px'};
  ${({ pulsate }) => pulsate && `
    animation: pulse-dot 1.25s cubic-bezier(0.455, 0.03, 0.515, 0.955) -.4s infinite};
    &:before {
      content: '';
      position: relative;
      display: block;
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      border-radius: 45px;
      background-color: inherit;
      animation: pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
    }
  `}

`