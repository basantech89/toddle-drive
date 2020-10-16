import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import EditIcon from '@material-ui/icons/Edit'
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox'

const useListStyles = makeStyles(
  {
    root: {
      padding: '20px 0',
      position: 'absolute',
      backgroundColor: 'white',
      border: '1px solid',
      borderColor: '#eceaea',
      borderRadius: 5
    }
  },
  { name: 'ContextMenu-List' }
)

export default function (props) {
  const listClasses = useListStyles()
  const [isVisible, setVisibility] = React.useState(false)
  const [x, setX] = React.useState(0)
  const [y, setY] = React.useState(0)

  React.useEffect(() => {
    const parent = props.parentRef.current
    if (!parent) {
      return
    }

    const showMenu = (event) => {
      event.preventDefault()
      setVisibility(true)
      setX(event.clientX)
      setY(event.clientY)
    }

    const closeMenu = () => {
      setVisibility(false)
    }

    parent.addEventListener('contextmenu', showMenu)
    window.addEventListener('click', closeMenu)

    return () => {
      parent.removeEventListener('contextmenu', showMenu)
      window.removeEventListener('click', closeMenu)
    }
  })

  // console.log(parentRef.current, item)

  const style = {
    top: y,
    left: x
  }

  return isVisible ? (
    <List
      classes={listClasses}
      style={style}
      component='nav'
      aria-labelledby='Context Menu'
    >
      <ListItem button onClick={props.renameItem}>
        <ListItemIcon>
          <EditIcon />
        </ListItemIcon>
        <ListItemText primary='Rename' />
      </ListItem>
      <ListItem button onClick={props.removeItem}>
        <ListItemIcon>
          <DeleteForeverIcon />
        </ListItemIcon>
        <ListItemText primary='Delete' />
      </ListItem>
      <ListItem button onClick={props.copyItem}>
        <ListItemIcon>
          <FileCopyIcon />
        </ListItemIcon>
        <ListItemText primary='Copy' />
      </ListItem>
    </List>
  ) : null
}
