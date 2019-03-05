import React from 'react'
import ReactTooltip from 'react-tooltip'

const BrowserLink = ({url,children,label}) => {
  console.log('children',children)
  return(
    <div data-tip={label}style={{cursor:'pointer',display:'flex',alignItems:'center'}}onClick={()=>window.electron.shell.openExternal(url)}>
      <ReactTooltip />
      {children}
    </div>
  )
}
export default BrowserLink