import * as React from 'react'
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox'
import BlockIcon from '@material-ui/icons/Block'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import FileIcon from '../../../../assets/icons/file.png'
import DirectoryIcon from '../../../../assets/icons/folder.png'
import useAppContext from '../../../../context/AppContext'
import ContextMenuContainer from '../../ContextMenu/ContextMenuContainer'

const DraggableItems = (props) => {
  const nameRef = React.useRef(null)
  const { tree, node, setContent } = useAppContext()

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

  const handleNewItemName = (item) => () => {
    tree.rename(item, nameRef.current.innerText)
  }

  const removeItem = (item) => () => {
    tree.remove(item)
    setContent([...node.children])
  }

  const renameItem = () => {
    nameRef.current.focus()
  }

  const copyItem = (item) => () => {
    props.setCopiedItem(item)
  }

  const pasteItemToChildNode = (child) => () => {
    tree.copy(props.copiedItem, child)
    props.setCopiedItem(null)
    setContent([...node.children])
  }

  return (
    <ContextMenuContainer
      isVisible
      style={{ height: 109, marginRight: 30 }}
      key={props.item.id}
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
                onClick: renameItem
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
          width={92}
          height={109}
        />
        <div
          style={{ textAlign: 'center' }}
          contentEditable
          ref={nameRef}
          onKeyUp={handleNewItemName(props.item)}
        >
          {props.item.type ? props.item.name : ''}
        </div>
      </div>
    </ContextMenuContainer>
  )
}

export default DraggableItems
