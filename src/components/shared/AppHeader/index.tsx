import * as React from 'react'
import {
  AppBar,
  createStyles,
  fade,
  InputBase,
  Theme,
  Typography
} from '@material-ui/core'
import Toolbar from '@material-ui/core/Toolbar'
import SearchIcon from '@material-ui/icons/Search'
import { ReactComponent as BackIcon } from '../../../assets/icons/up-arrow-button.svg'
import { makeStyles } from '@material-ui/core/styles'

const useAppHeaderStyles = makeStyles(
  (theme: Theme) =>
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
      inputRoot: {
        color: 'inherit'
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch'
          }
        }
      },
      backButton: {
        '& path': {
          fill: 'white'
        }
      }
    }),
  {
    name: 'AppHeader'
  }
)

export default function () {
  const classes = useAppHeaderStyles()
  return (
    <AppBar position={'static'}>
      <Toolbar className={classes.toolbar}>
        <div style={{ display: 'flex' }}>
          <Typography variant='h6' className={classes.title} noWrap>
            Toddle Drive
          </Typography>
          <BackIcon height='30' width='80' className={classes.backButton} />
        </div>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search…'
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
