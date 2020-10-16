import * as React from 'react'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import ToggleButton from '@material-ui/lab/ToggleButton'
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import { v4 } from 'uuid'
import CloseIcon from '@material-ui/icons/Close'

const useNewItemModalStyles = makeStyles(
  {
    createButton: {
      width: 255,
      borderRadius: 15,
      backgroundColor: '#4AB7FF',
      padding: '8px 0',
      margin: '20px 0',
      '&:hover': {
        backgroundColor: '#679ac6'
      }
    },
    title: {
      paddingBottom: 0,
      width: '100%',
      '& h2': {
        display: 'flex',
        justifyContent: 'space-between',
        padding: '0 20px',
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
    }
  },
  { name: 'NewItemModal' }
)

const useDialogStyles = makeStyles(
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

const useToggleButtonGroupStyles = makeStyles(
  {
    root: {
      display: 'flex',
      justifyContent: 'center',
      borderRadius: 10,
      paddingTop: 40,
      paddingBottom: 30,
      '& span': {
        padding: '0 10px'
      },
      '& button': {
        color: '#6f6f6f',
        lineHeight: 1.2
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

export default function (props) {
  const classes = useNewItemModalStyles()
  const dialogClasses = useDialogStyles()
  const toggleButtonGroupClasses = useToggleButtonGroupStyles()

  const itemName = React.useRef()
  const [itemType, setItemType] = React.useState('file')
  const handleItemType = (event, newAlignment) => {
    setItemType(newAlignment)
  }

  const handleSubmit = () => {
    props.handleItemCreate({
      name: itemName.current?.value,
      type: itemType,
      active: false,
      id: v4()
    })
    props.toggleModalState()
  }

  return (
    <Dialog
      open={props.modalState}
      onClose={props.toggleModalState}
      aria-labelledby='New Item Dialog'
      classes={dialogClasses}
    >
      <DialogTitle id='new-item-dialog' className={classes.title}>
        <span> Create New </span>
        <div onClick={props.toggleModalState}>
          <CloseIcon />
        </div>
      </DialogTitle>
      <DialogContent>
        <ToggleButtonGroup
          value={itemType}
          exclusive
          onChange={handleItemType}
          aria-label='item type toggle buttons'
          classes={toggleButtonGroupClasses}
        >
          <ToggleButton value='file' aria-label='file toggle button'>
            File
          </ToggleButton>
          <ToggleButton value='directory' aria-label='folder toggle button'>
            Folder
          </ToggleButton>
        </ToggleButtonGroup>
        <TextField
          id='outlined-basic'
          label='Name'
          variant='outlined'
          inputRef={itemName}
          InputLabelProps={{
            classes: {
              root: classes.inputLabel
            }
          }}
          InputProps={{
            classes: {
              input: classes.input
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          variant='contained'
          className={classes.createButton}
          onClick={handleSubmit}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
