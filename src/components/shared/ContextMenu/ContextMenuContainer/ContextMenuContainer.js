import * as React from 'react'
import ContextMenu from '../ContextMenu'

const ContextMenuContainer = ({ children, style, ...rest }) => {
  const itemRef = React.useRef(null)

  return (
    <div ref={itemRef} style={style}>
      {children}
      <ContextMenu parentRef={itemRef} {...rest} />
    </div>
  )
}

export default ContextMenuContainer
