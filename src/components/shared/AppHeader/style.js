import { emphasize, makeStyles, withStyles } from '@material-ui/core/styles'
import { Chip, createStyles, fade } from '@material-ui/core'

export const useAppHeaderStyles = makeStyles(
  (theme) =>
    createStyles({
      toolbar: {
        justifyContent: 'space-between'
      },
      title: {
        flexGrow: 1,
        // display: 'none',
        color: '#fff',
        textDecoration: 'none',
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
      backButton: ({ name }) => ({
        cursor: name === 'Home' ? 'default' : 'pointer',
        '& path': {
          fill: name === 'Home' ? '#c9c7c7' : '#fff'
        }
      }),
      inputRoot: {
        color: 'inherit'
      },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '18ch',
          '&:focus': {
            width: '30ch'
          }
        }
      }
    }),
  {
    name: 'AppHeader'
  }
)

export const useBreadcrumbStyles = makeStyles({
  separator: {
    color: 'white'
  }
})

export const StyledBreadcrumb = withStyles((theme) => ({
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
