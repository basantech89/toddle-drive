import * as React from 'react'
import DirectoryListener from '../../components/shared/DirectoryListener'
import { makeStyles } from '@material-ui/core/styles'
import { Tree } from '../../components/dataStructure/Tree'
import AppHeader from '../../components/shared/AppHeader'

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
      // display: 'inline-block'
    },
    rest: {
      flex: 1
    }
  },
  { name: 'Home' }
)

export default function () {
  const classes = useHomeStyles()
  const [tree, setTree] = React.useState()
  const [node, setNode] = React.useState(null)

  const [content, setContent] = React.useState([])
  const [visitedDirs, setVisitedDirs] = React.useState([])

  React.useEffect(() => {
    const currentTree = new Tree()
    setTree(currentTree)
    setNode(currentTree.getRootNode())
    setContent(currentTree.getRootNode().children)
  }, [])

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
      <AppHeader
        node={node}
        setNode={setNode}
        visitedDirs={visitedDirs}
        content={content}
        setContent={setContent}
        setVisitedDirs={setVisitedDirs}
        rootNode={tree?.getRootNode()}
      />
      <div className={classes.directoryListener}>
        <DirectoryListener
          tree={tree}
          node={node}
          content={content}
          setContent={setContent}
          handleItemDoubleClick={onItemDoubleClick}
        />
      </div>
    </div>
  )
}
