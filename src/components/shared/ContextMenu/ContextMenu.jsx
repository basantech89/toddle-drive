import * as React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

const useListStyles = makeStyles(
  {
    root: {
      padding: '10px 0',
      position: 'absolute',
      backgroundColor: 'white',
      border: '1px solid',
      borderColor: '#eceaea',
      borderRadius: 5
    }
  },
  { name: 'ContextMenu-List' }
)

const ContextMenu = (props) => {
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
      props.setContextMenu(props.menuKey)
      setVisibility(true)
      setX(event.clientX)
      setY(event.clientY)
    }

    const closeMenu = () => {
      props.setContextMenu(null)
      setVisibility(false)
    }

    parent.addEventListener('contextmenu', showMenu)
    window.addEventListener('click', closeMenu)

    return () => {
      parent.removeEventListener('contextmenu', showMenu)
      window.removeEventListener('click', closeMenu)
    }
  })

  const style = {
    top: y,
    left: x
  }

  return isVisible && props.isVisible ? (
    <List
      classes={listClasses}
      style={style}
      dense
      component='nav'
      aria-labelledby='Context Menu'
    >
      {props.menuItems.map((item, index) => (
        <ListItem key={index} button onClick={item.onClick}>
          <ListItemIcon>{item.icon}</ListItemIcon>
          <ListItemText primary={item.title} />
        </ListItem>
      ))}
    </List>
  ) : null
}

export default ContextMenu
