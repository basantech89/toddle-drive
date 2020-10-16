import * as React from 'react'
import NewItemModal from '../../NewItemModal'
import ContextMenuContainer from '../ContextMenu/ContextMenuContainer'
import NewItemIcon from '../../../assets/icons/add_new_button.png'
import FileIcon from '../../../assets/icons/file.png'
import DirectoryIcon from '../../../assets/icons/folder.png'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import FileCopyIcon from '@material-ui/icons/FileCopy'
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox'
import BlockIcon from '@material-ui/icons/Block'

const DirectoryListener = (props) => {
  const nameRef = React.useRef()
  const [copiedItem, setCopiedItem] = React.useState(null)
  const [newItemModal, setNewItemModal] = React.useState(false)
  const toggleNewItemModal = () => setNewItemModal(!newItemModal)

  const getImgIcon = (itemType) => {
    switch (itemType) {
      case 'file':
        return FileIcon
      case 'directory':
        return DirectoryIcon
      default:
        throw new Error('Invalid Item Type')
    }
  }

  const createItem = (item) => {
    props.tree.insert({ ...item, parent: props.node })
    props.setContent([...props.node.children])
  }

  const removeItem = (item) => () => {
    props.tree.remove(item)
    props.setContent([...props.node.children])
  }

  const renameItem = () => {
    nameRef.current.focus()
  }

  const handleNewItemName = (item) => () => {
    props.tree.rename(item, nameRef.current.innerText)
  }

  const copyItem = (item) => () => {
    setCopiedItem(item)
  }

  const pasteItemToCurrentNode = () => {
    props.tree.copy(copiedItem, props.node)
    setCopiedItem(null)
    props.setContent([...props.node.children])
  }

  const pasteItemToChildNode = (child) => () => {
    props.tree.copy(copiedItem, child)
    setCopiedItem(null)
    props.setContent([...props.node.children])
  }

  const cancelPaste = () => {
    setCopiedItem(null)
  }

  return (
    <>
      <NewItemModal
        modalState={newItemModal}
        toggleModalState={toggleNewItemModal}
        handleItemCreate={createItem}
      />
      <div style={{ display: 'inline-flex' }}>
        <div
          role='button'
          style={{ marginRight: 30, cursor: 'pointer', height: 109 }}
          onClick={toggleNewItemModal}
        >
          <img
            src={NewItemIcon}
            alt='Create New Icon'
            width={92}
            height={109}
          />
        </div>
        {props.content.map((child) => (
          <ContextMenuContainer
            isVisible
            style={{ height: 109, marginRight: 30 }}
            key={child.id}
            menuItems={
              copiedItem
                ? [
                    {
                      title: `Paste to ${child.name}`,
                      icon: <MoveToInboxIcon />,
                      onClick: pasteItemToChildNode(child)
                    },
                    {
                      title: `Cancel Paste`,
                      icon: <BlockIcon />,
                      onClick: cancelPaste
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
                      onClick: removeItem(child)
                    },
                    {
                      title: 'Copy',
                      icon: <FileCopyIcon />,
                      onClick: copyItem(child)
                    }
                  ]
            }
          >
            <div
              key={child.id}
              onDoubleClick={props.handleItemDoubleClick(child)}
            >
              <img
                src={getImgIcon(child.type)}
                alt={child.name}
                width={92}
                height={109}
              />
              <div
                style={{ textAlign: 'center' }}
                contentEditable
                ref={nameRef}
                onKeyUp={handleNewItemName(child)}
              >
                {child.type ? child.name : ''}
              </div>
            </div>
          </ContextMenuContainer>
        ))}
      </div>
      <ContextMenuContainer
        isVisible={!!copiedItem}
        style={{ height: '100%' }}
        menuItems={[
          {
            title: `Paste to ${props.node?.name}`,
            icon: <MoveToInboxIcon />,
            onClick: pasteItemToCurrentNode
          },
          {
            title: `Cancel Paste`,
            icon: <BlockIcon />,
            onClick: cancelPaste
          }
        ]}
      />
    </>
  )
}

export default DirectoryListener
