import * as React from 'react'
import DirectoryListener from '../../components/shared/DirectoryListener'
import { makeStyles } from '@material-ui/core/styles'
import { Tree } from '../../components/dataStructure/Tree'
import AppHeader from '../../components/shared/AppHeader'
import useAppContext from '../../context/AppContext'

const useHomeStyles = makeStyles(
  {
    root: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh'
    },
    directoryListener: {
      padding: 50,
      flex: 1
    },
    rest: {
      flex: 1
    }
  },
  { name: 'Home' }
)

export default function () {
  const classes = useHomeStyles()
  const { setTree, setNode, setContent } = useAppContext()
  const [visitedDirs, setVisitedDirs] = React.useState([])

  React.useEffect(() => {
    const currentTree = new Tree()
    setTree(currentTree)
    setNode(currentTree.getRootNode())
    setContent(currentTree.getRootNode().children)
  }, [setContent, setNode, setTree])

  const onItemDoubleClick = (node) => () => {
    if (node.type === 'directory') {
      setNode(node)
      if (!visitedDirs.some((dir) => dir.id === node.id)) {
        setVisitedDirs([...visitedDirs, node])
      }
      setContent(node.children)
    }
  }

  return (
    <div className={classes.root}>
      <AppHeader visitedDirs={visitedDirs} setVisitedDirs={setVisitedDirs} />
      <div className={classes.directoryListener}>
        <DirectoryListener handleItemDoubleClick={onItemDoubleClick} />
      </div>
    </div>
  )
}
