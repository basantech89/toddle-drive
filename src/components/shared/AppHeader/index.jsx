import * as React from 'react'
import {
  AppBar,
  createStyles,
  fade,
  InputBase,
  Breadcrumbs,
  Chip,
  Toolbar,
  Typography
} from '@material-ui/core'
import { emphasize, makeStyles, withStyles } from '@material-ui/core/styles'
import useAppContext from '../../../context/AppContext'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import FolderOpenIcon from '@material-ui/icons/FolderOpen'
import { ReactComponent as BackIcon } from '../../../assets/icons/up-arrow-button.svg'

const useAppHeaderStyles = makeStyles(
  (theme) =>
    createStyles({
      toolbar: {
        justifyContent: 'space-between'
      },
      title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
          display: 'block'
        }
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25)
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          marginLeft: theme.spacing(1),
          width: 'auto'
        }
      },
      searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      },
      backButton: {
        cursor: 'pointer',
        '& path': {
          fill: 'white'
        }
      },
      inputRoot: {
        color: 'inherit'
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch'
          }
        }
      }
    }),
  {
    name: 'AppHeader'
  }
)

const useBreadcrumbStyles = makeStyles({
  separator: {
    color: 'white'
  }
})

const StyledBreadcrumb = withStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: theme.spacing(3),
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300]
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12)
    }
  }
}))(Chip)

export default function (props) {
  const classes = useAppHeaderStyles()
  const { tree, node, setNode, setContent } = useAppContext()
  const rootNode = tree?.getRootNode()
  const breadcrumbClasses = useBreadcrumbStyles()
  const [searchVal, setSearchVal] = React.useState('')

  const resetInputValue = () => {
    setSearchVal('')
    setContent(node?.children)
  }

  const handleChange = (event) => {
    setSearchVal(event.target.value)
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
    <AppBar position={'static'}>
      <Toolbar className={classes.toolbar}>
        <div style={{ display: 'flex' }}>
          <Typography variant='h6' className={classes.title} noWrap>
            Toddle Drive
          </Typography>
          <BackIcon
            height='30'
            width='80'
            className={classes.backButton}
            onClick={goBack}
          />
          <Breadcrumbs aria-label='breadcrumb' classes={breadcrumbClasses}>
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
            value={searchVal}
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
