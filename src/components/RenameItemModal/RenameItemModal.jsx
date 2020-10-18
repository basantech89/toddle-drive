import * as React from 'react'
import { DialogContent, TextField } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { useNewItemModalStyles, useToggleButtonGroupStyles } from './style'
import useAppContext from '../../context/AppContext'
import ItemDialog from '../shared/ItemDialog'

const RenameItemModal = (props) => {
  const classes = useNewItemModalStyles()
  const toggleButtonGroupClasses = useToggleButtonGroupStyles()
  const { node } = useAppContext()
  const itemNameRef = React.useRef(props.item.name)
  const [itemNameError, setItemNameError] = React.useState('')
  const resetItemError = () => setItemNameError('')

  const checkAlreadyExist = (node, name) => {
    const isMatched = node.children.some(
      (child) => child.id !== props.item.id && child.name === name
    )
    return isMatched
  }

  const onSubmit = () => {
    const itemName = itemNameRef.current?.value.trim()
    if (!itemName || /\s+$/.test(itemName)) {
      setItemNameError('Name is mandatory')
    } else if (checkAlreadyExist(node, itemName)) {
      setItemNameError('File / Folder name already exist')
    } else {
      console.log('here', itemName)
      props.onItemRename(itemName)
      props.toggleModalState()
      setItemNameError('')
    }
  }

  const closeModal = () => {
    setItemNameError('')
    props.toggleModalState()
  }

  return (
    <ItemDialog
      modalState={props.modalState}
      title='Rename Item'
      closeModal={closeModal}
      primaryLabel='Rename'
      onSubmit={onSubmit}
      dialogContent={
        <DialogContent className={classes.contentRoot}>
          <ToggleButtonGroup
            value={props.item.type}
            exclusive
            aria-label='item rename toggle buttons'
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
            defaultValue={props.item.name}
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
      }
    />
  )
}

export default RenameItemModal
