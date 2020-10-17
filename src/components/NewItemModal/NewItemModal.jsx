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
import useAppContext from '../../context/AppContext'

const NewItemModal = (props) => {
  const classes = useNewItemModalStyles()
  const dialogClasses = useDialogStyles()
  const toggleButtonGroupClasses = useToggleButtonGroupStyles()

  const { node } = useAppContext()
  const itemNameRef = React.useRef('')
  const [itemNameError, setItemNameError] = React.useState('')
  const resetItemError = () => setItemNameError('')

  const [itemType, setItemType] = React.useState('file')
  const handleItemType = (event, newAlignment) => {
    if (newAlignment !== null) {
      setItemType(newAlignment)
    }
  }

  const checkAlreadyExist = (node, name) => {
    const isMatched = node.children.some((child) => child.name === name)
    return isMatched
  }

  const onSubmit = () => {
    const itemName = itemNameRef.current?.value.trim()
    if (!itemName || /\s+$/.test(itemName)) {
      setItemNameError('Name is mandatory')
    } else if (checkAlreadyExist(node, itemName)) {
      setItemNameError('File / Folder name already exist')
    } else {
      props.handleItemCreate({
        name: itemName,
        type: itemType,
        active: false,
        id: v4()
      })
      props.toggleModalState()
      setItemNameError('')
    }
  }

  const closeModal = () => {
    setItemNameError('')
    props.toggleModalState()
  }

  return (
    <Dialog
      open={props.modalState}
      onClose={closeModal}
      aria-labelledby='New Item Dialog'
      classes={dialogClasses}
    >
      <DialogTitle id='new-item-dialog' className={classes.title}>
        <span> Create New </span>
        <div onClick={closeModal}>
          <CloseIcon />
        </div>
      </DialogTitle>
      <DialogContent className={classes.contentRoot}>
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
          className={classes.inputRoot}
          onFocus={resetItemError}
          error={!!itemNameError}
          helperText={itemNameError}
          id='item-name'
          label='Name'
          variant='outlined'
          inputRef={itemNameRef}
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
      <DialogActions className={classes.actionsRoot}>
        <Button
          color='primary'
          variant='contained'
          className={classes.createButton}
          onClick={onSubmit}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default NewItemModal
