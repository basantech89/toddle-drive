import * as React from 'react'
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox'
import BlockIcon from '@material-ui/icons/Block'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import FileIcon from '../../../assets/icons/file.png'
import DirectoryIcon from '../../../assets/icons/folder.png'
import useAppContext from '../../../context/AppContext'
import { ContextMenuContainer } from '../../shared/ContextMenu'
import RenameItemModal from '../../RenameItemModal'

const DraggableListenerItems = (props) => {
  const { tree, node, setContent } = useAppContext()

  const [renameDialogState, setRenameDialogState] = React.useState(false)
  const toggleRenameDialogState = () => setRenameDialogState(!renameDialogState)

  const getImgIcon = (itemType) => {
    switch (itemType) {
      case 'file':
        return FileIcon
      case 'directory':
        return DirectoryIcon
      default:
        return
    }
  }

  const handleItemRename = (newName) => {
    tree.rename(props.item, newName)
  }

  const removeItem = (item) => () => {
    tree.remove(item)
    setContent([...node.children])
  }

  const copyItem = (item) => () => {
    props.setCopiedItem(item)
    props.setContextMenu(null)
  }

  const pasteItemToChildNode = (child) => () => {
    tree.copy(props.copiedItem, child)
    props.setCopiedItem(null)
    setContent([...node.children])
  }

  console.log(
    'listener',
    props.contextMenu,
    props.item.id,
    props.contextMenu === props.item.id &&
      (props.copiedItem ? props.item.type === 'directory' : true)
  )

  return (
    <>
      <RenameItemModal
        item={props.item}
        modalState={renameDialogState}
        toggleModalState={toggleRenameDialogState}
        onItemRename={handleItemRename}
      />

      <ContextMenuContainer
        menuKey={props.item.id}
        setContextMenu={props.setContextMenu}
        isVisible={
          props.contextMenu === props.item.id &&
          (props.copiedItem ? props.item.type === 'directory' : true)
        }
        style={{ marginRight: 30 }}
        menuItems={
          props.copiedItem
            ? [
                {
                  title: `Paste to ${props.item.name}`,
                  icon: <MoveToInboxIcon />,
                  onClick: pasteItemToChildNode(props.item)
                },
                {
                  title: `Cancel Paste`,
                  icon: <BlockIcon />,
                  onClick: props.cancelPaste
                }
              ]
            : [
                {
                  title: 'Rename',
                  icon: <EditIcon />,
                  onClick: toggleRenameDialogState
                },
                {
                  title: 'Delete',
                  icon: <DeleteForeverIcon />,
                  onClick: removeItem(props.item)
                },
                {
                  title: 'Copy',
                  icon: <FileCopyIcon />,
                  onClick: copyItem(props.item)
                }
              ]
        }
      >
        <div onDoubleClick={props.handleItemDoubleClick(props.item)}>
          <img
            src={getImgIcon(props.item.type)}
            alt={props.item.name}
            width={68}
            height={80}
          />
          <div style={{ textAlign: 'center' }}>
            {props.item.type ? props.item.name : ''}
          </div>
        </div>
      </ContextMenuContainer>
    </>
  )
}

export default DraggableListenerItems
