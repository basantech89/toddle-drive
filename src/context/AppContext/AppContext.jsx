import * as React from 'react'

const AppContext = React.createContext({})

const useAppContext = () => {
  const context = React.useContext(AppContext)
  if (!context) {
    throw new Error(`useAppContext must be used within a CountProvider`)
  }
  return context
}

export const AppProvider = (props) => {
  const [tree, setTree] = React.useState()
  const [node, setNode] = React.useState(null)
  const [content, setContent] = React.useState([])

  const value = React.useMemo(
    () => ({
      tree,
      node,
      content,
      setTree,
      setNode,
      setContent
    }),
    [tree, node, content]
  )
  return <AppContext.Provider value={value} {...props} />
}

export default useAppContext
