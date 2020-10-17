import { makeStyles } from '@material-ui/core/styles'

export const useNewItemModalStyles = makeStyles(
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
    inputLabel: {
      transform: 'translate(14px, 12px) scale(1)'
    },
    input: {
      padding: '10.5px 14px'
    },
    inputRoot: {
      height: 62,
      '& .MuiOutlinedInput-root': {
        borderRadius: 10
      }
    },
    contentRoot: {
      paddingBottom: 0
    },
    actionsRoot: {
      paddingTop: 0
    }
  },
  { name: 'NewItemModal' }
)

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
    name: 'NewItemModal-Dialog'
  }
)

export const useToggleButtonGroupStyles = makeStyles(
  {
    root: {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 10,
      paddingTop: 20,
      paddingBottom: 35,
      '& span': {
        padding: '0 10px'
      },
      '& button': {
        color: '#6f6f6f',
        lineHeight: 1.2,
        borderRadius: 10,
        width: 87
      },
      '& .Mui-selected': {
        '&:hover': {
          backgroundColor: '#4AB7FF',
          color: '#fff'
        },
        backgroundColor: '#4AB7FF',
        color: '#fff'
      }
    }
  },
  { name: 'NewItemModal-ToggleButtonGroup' }
)
