import { makeStyles } from '@material-ui/core/styles'

export const useDirectoryListenerStyles = makeStyles(
  {
    blankPage: {
      position: 'absolute',
      top: '35%',
      left: '35%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      '& p': {
        paddingTop: 30,
        fontSize: 'large',
        fontWeight: 'bold',
        color: '#9090A9'
      }
    },
    icon: {
      height: 300
    }
  },
  { name: 'DirectoryListener' }
)
