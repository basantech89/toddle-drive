import * as React from 'react'
import DirectoryListener from '../../components/shared/DirectoryListener'
import { makeStyles } from '@material-ui/core/styles'
import { Tree } from '../../components/dataStructure/Tree'
import AppHeader from '../../components/shared/AppHeader'

const useHomeStyles = makeStyles(
  {
    root: {
      padding: 50
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

  const onItemDoubleClick = (node: any) => () => {
    if (node.type === 'directory') {
      setNode(node)
      if (!visitedDirs.some((dir) => dir.id === node.id)) {
        setVisitedDirs([...visitedDirs, node])
      }
      setContent(node.children)
    }
  }

  return (
    <>
      <AppHeader
        node={node}
        setNode={setNode}
        visitedDirs={visitedDirs}
        content={content}
        setContent={setContent}
        setVisitedDirs={setVisitedDirs}
        rootNode={tree?.getRootNode()}
      />
      <div className={classes.root}>
        <DirectoryListener
          tree={tree}
          node={node}
          content={content}
          rootNode={tree?.getRootNode()}
          handleItemDoubleClick={onItemDoubleClick}
        />
      </div>
    </>
  )
}
