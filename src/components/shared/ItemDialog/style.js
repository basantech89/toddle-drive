import { makeStyles } from '@material-ui/core/styles'

export const useDialogStyles = makeStyles(
  {
    paper: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingBottom: 20,
      width: 450,
      overflow: 'hidden'
    }
  },
  {
    name: 'ItemDialog-Dialog'
  }
)

export const useItemDialogStyles = makeStyles(
  {
    createButton: {
      width: 255,
      borderRadius: 15,
      backgroundColor: '#4AB7FF',
      padding: '8px 0',
      margin: '8px 0',
      '&:hover': {
        backgroundColor: '#679ac6'
      }
    },
    title: {
      paddingTop: 25,
      paddingBottom: 0,
      width: '100%',
      '& h2': {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
        '& span': {
          marginLeft: 'auto',
          marginRight: 'auto'
        },
        '& div': {
          cursor: 'pointer',
          '& svg': {
            stroke: 'grey'
          }
        }
      }
    },
    actionsRoot: {
      paddingTop: 0
    }
  },
  { name: 'ItemDialog' }
)
