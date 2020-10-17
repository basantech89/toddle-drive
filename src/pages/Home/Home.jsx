import * as React from 'react'
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
      padding: 50,
      flex: 1
    },
    rest: {
      flex: 1
    }
  },
  { name: 'Home' }
)

const Home = () => {
  const classes = useHomeStyles()

  const { setTree, setNode, setContent } = useAppContext()
  const [visitedDirs, setVisitedDirs] = React.useState([])

  React.useEffect(() => {
    const currentTree = new Tree()
    setTree(currentTree)
    setNode(currentTree.getRootNode())
    setContent(currentTree.getRootNode().children)
  }, [setContent, setNode, setTree])

  // React.useEffect(() => {
  //   const itemNames = window.location.pathname.split('/').slice(1)
  //   let node = tree?.getRootNode()
  //   let name
  //   console.log(node)
  //   if (node) {
  //     for (let i = 0; i < itemNames.length; i++) {
  //       name = itemNames[i]
  //       if (node.name === name) {
  //         if (i === itemNames.length - 1) {
  //           setNode(node)
  //           setContent(node.children)
  //           return
  //         }
  //         node = node.children.find((child) => child.name === itemNames[i + 1])
  //       } else {
  //         history.push('/')
  //         return
  //       }
  //     }
  //   }
  // }, [window.location.pathname])

  const onItemDoubleClick = (node) => () => {
    if (node.type === 'directory') {
      setNode(node)
      if (!visitedDirs.some((dir) => dir.id === node.id)) {
        setVisitedDirs([...visitedDirs, node])
      }
      setContent(node.children)
      // history.push(`${window.location.pathname}/${node.name}`)
    }
  }

  return (
    <>
      <div className={classes.root}>
        <AppHeader visitedDirs={visitedDirs} setVisitedDirs={setVisitedDirs} />
        <div className={classes.directoryListener}>
          <DirectoryListener handleItemDoubleClick={onItemDoubleClick} />
        </div>
      </div>
    </>
  )
}

export default Home
