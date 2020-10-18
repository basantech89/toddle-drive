import * as React from 'react'
import { useHistory } from 'react-router-dom'
import DirectoryListener from '../../components/DirectoryListener'
import { makeStyles } from '@material-ui/core/styles'
import { Tree } from '../../components/dataStructure/Tree'
import useAppContext from '../../context/AppContext'
import AppHeader from '../../components/shared/AppHeader'

const useHomeStyles = makeStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },
    directoryListener: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column'
    }
  },
  { name: 'Home' }
)

const Home = () => {
  const history = useHistory()
  const classes = useHomeStyles()

  const { tree, setTree, setNode, setContent } = useAppContext()
  const [visitedDirs, setVisitedDirs] = React.useState([])
  const [searchVal, setSearchVal] = React.useState('')

  React.useEffect(() => {
    const currentTree = new Tree()
    setTree(currentTree)
    setNode(currentTree.getRootNode())
    setContent(currentTree.getRootNode().children)
  }, [setContent, setNode, setTree])

  React.useEffect(() => {
    let itemNames = window.location.pathname.split('/').slice(1)
    itemNames = itemNames.filter((name) => name)
    let currNode = tree?.getRootNode()
    let allNodes = [currNode]
    let name
    if (currNode) {
      for (let i = 0; i < itemNames.length; i++) {
        name = itemNames[i]
        if (currNode && currNode.name) {
          if (currNode.name === name) {
            if (i === itemNames.length - 1) {
              setNode(currNode)
              setContent(currNode.children)
              break
            }
            currNode = currNode.children.find(
              (child) => child.name === itemNames[i + 1]
            )
            allNodes.push(currNode)
          } else {
            history.push('/home')
            return
          }
        }
      }
      const visitedNodeIdx = visitedDirs.findIndex(
        (dir) => dir.id === currNode.id
      )
      if (visitedNodeIdx !== -1) {
        const duplicateDirs = [...visitedDirs]
        duplicateDirs.splice(visitedNodeIdx + 1)
        setVisitedDirs(duplicateDirs)
      } else {
        setVisitedDirs([...allNodes])
      }
    } else {
      history.push('/home')
    }
  }, [window.location.pathname, tree])

  const onItemDoubleClick = (node) => () => {
    if (node.type === 'directory') {
      setNode(node)
      setContent(node.children)
      let pathname = window.location.pathname
      if (pathname[pathname.length - 1] === '/') {
        pathname = pathname.substring(0, pathname.length - 1)
      }
      history.push(`${pathname}/${node.name}`)
    }
  }

  return (
    <>
      <div className={classes.root}>
        <AppHeader
          visitedDirs={visitedDirs}
          setVisitedDirs={setVisitedDirs}
          seachVal={searchVal}
          setSearchVal={setSearchVal}
        />
        <div className={classes.directoryListener}>
          <DirectoryListener
            handleItemDoubleClick={onItemDoubleClick}
            searchVal={searchVal}
          />
        </div>
      </div>
    </>
  )
}

export default Home
