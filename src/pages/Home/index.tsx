import * as React from 'react'
import DirectoryListener from '../../components/shared/DirectoryListener'
import { makeStyles } from '@material-ui/core/styles'
import Tree from '../../components/dataStructure/Tree/index'

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
  let rootNode

  React.useEffect(() => {
    rootNode = new Tree()
  }, [])

  return (
    <div className={classes.root}>
      <DirectoryListener rootNode={rootNode} />
    </div>
  )
}
