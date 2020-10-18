import * as React from 'react'
import { Dialog, DialogActions, DialogTitle, Button } from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import { useDialogStyles } from './style'
import { useItemDialogStyles } from './style'

const ItemDialog = (props) => {
  const dialogClasses = useDialogStyles()
  const classes = useItemDialogStyles()

  return (
    <Dialog
      open={props.modalState}
      onClose={props.closeModal}
      aria-labelledby='New Item Dialog'
      classes={dialogClasses}
    >
      <DialogTitle id='new-item-dialog' className={classes.title}>
        <span> {props.title} </span>
        <div onClick={props.closeModal}>
          <CloseIcon />
        </div>
      </DialogTitle>
      {props.dialogContent && props.dialogContent}
      <DialogActions className={classes.actionsRoot}>
        <Button
          color='primary'
          variant='contained'
          className={classes.createButton}
          onClick={props.onSubmit}
        >
          {props.primaryLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ItemDialog
