import * as React from 'react'
import ContextMenu from '../index'

export default function ({ children, style, ...rest }) {
  const itemRef = React.useRef(null)

  return (
    <div ref={itemRef} style={style}>
      {children}
      <ContextMenu parentRef={itemRef} {...rest} />
    </div>
  )
}
