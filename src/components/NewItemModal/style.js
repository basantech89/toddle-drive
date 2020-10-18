import { makeStyles } from '@material-ui/core/styles'

export const useNewItemModalStyles = makeStyles(
  {
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
    }
  },
  { name: 'NewItemModal' }
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
