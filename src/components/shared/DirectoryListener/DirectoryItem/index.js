import * as React from 'react'
import ContextMenu from '../../ContextMenu'

export default function ({ children, ...rest }) {
  const itemRef = React.useRef(null)

  return (
    <div ref={itemRef}>
      {children}
      <ContextMenu parentRef={itemRef} {...rest} />
    </div>
  )
}
