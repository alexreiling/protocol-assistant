import React from 'react'
import styled from 'styled-components'
import { theme } from '../../config';
import H3 from '../common/H3';

const Wrapper = styled.div`
  border-top: 1px solid ${theme.gridline.color};
  background-color: ${theme.bg.bright};
  padding: 8px;
  :first-child {
    background-color: ${theme.bg.contrast};
  }
`
const Desc = styled.p`
  color: ${theme.font.color.gray};
  margin: 8px 0;
  padding: 0;
`
const Section = (props) => {
  const {children, title, description} = props
  return (
    <Wrapper>
      {title && <H3>{title}</H3>}
      {description && <Desc>{description}</Desc>}
      {children}
    </Wrapper>
  )
}

export default Section