import * as React from 'react'
import { AppBar, InputBase, Breadcrumbs, Toolbar } from '@material-ui/core'
import useAppContext from '../../../context/AppContext'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import { ReactComponent as BackIcon } from '../../../assets/icons/up-arrow-button.svg'
import {
  StyledBreadcrumb,
  useAppHeaderStyles,
  useBreadcrumbStyles
} from './style'
import { NavLink } from 'react-router-dom'

const AppHeader = (props) => {
  const { tree, node, setNode, setContent } = useAppContext()
  const classes = useAppHeaderStyles({ name: node?.name })
  const rootNode = tree?.getRootNode()
  const breadcrumbClasses = useBreadcrumbStyles()

  const resetInputValue = () => {
    props.setSearchVal('')
    setContent(node?.children)
  }

  const handleChange = (event) => {
    props.setSearchVal(event.target.value)
    setContent(
      node?.children.filter((child) => child.name.includes(event.target.value))
    )
  }

  const goBack = () => {
    if (node.parent) {
      setNode(node.parent)
      setContent(node?.parent?.children)
      const duplicateDirs = [...props.visitedDirs]
      duplicateDirs.pop()
      props.setVisitedDirs(duplicateDirs)
    }
  }

  const handleBreadcrumbClick = (node) => () => {
    setNode(node)
    setContent(node.children)
    const nodeVisitedIdx = props.visitedDirs.findIndex(
      (dir) => dir.id === node.id
    )
    const duplicateDirs = [...props.visitedDirs]
    duplicateDirs.splice(nodeVisitedIdx + 1)
    props.setVisitedDirs(duplicateDirs)
  }

  return (
    <AppBar position={'static'} elevation={0}>
      <Toolbar className={classes.toolbar}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <NavLink to='/' variant='h6' className={classes.title} noWrap>
            Toddle Drive
          </NavLink>
          <BackIcon
            height='30'
            width='80'
            className={classes.backButton}
            onClick={goBack}
          />
          <Breadcrumbs
            aria-label='breadcrumb'
            classes={breadcrumbClasses}
            maxItems={5}
          >
            <StyledBreadcrumb
              component='a'
              label='Home'
              icon={<HomeIcon fontSize='small' />}
              onClick={handleBreadcrumbClick(rootNode)}
            />
            {props.visitedDirs.map((dir) => (
              <StyledBreadcrumb
                key={dir.id}
                component='a'
                label={dir.name}
                icon={<FolderOpenIcon fontSize='small' />}
                onClick={handleBreadcrumbClick(dir)}
              />
            ))}
          </Breadcrumbs>
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search…'
            value={props.searchVal}
            onChange={handleChange}
            onBlur={resetInputValue}
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput
            }}
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default AppHeader
