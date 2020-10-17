import * as React from 'react'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button
} from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { v4 } from 'uuid'
import CloseIcon from '@material-ui/icons/Close'
import {
  useDialogStyles,
  useNewItemModalStyles,
  useToggleButtonGroupStyles
} from './style'

const NewItemModal = (props) => {
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

export default NewItemModal
