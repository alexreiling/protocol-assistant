import styled from 'styled-components'
import React from 'react'
import H2 from '../common/H2';
const StyledPage = styled.div`
  padding: 8px 1px 1px 8px;
  display:flex;
  flex-direction: column;
  max-height:100%;
  box-sizing:border-box;
`
const Page = (props) => {
  const {children, style, title} = props
  return (
    <StyledPage style={style} className={'page'}>
      <H2>{title}</H2>
      {children}
    </StyledPage>
  )
}

export default Page