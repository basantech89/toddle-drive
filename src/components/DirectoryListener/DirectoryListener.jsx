import * as React from 'react'
import NewItemModal from '../NewItemModal'
import { ContextMenuContainer } from '../shared/ContextMenu'
import { useDirectoryListenerStyles } from './style'
import NewItemIcon from '../../assets/icons/add_new_button.png'
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox'
import BlockIcon from '@material-ui/icons/Block'
import MovableList from '../shared/MovableList'
import useAppContext from '../../context/AppContext'
import { ReactComponent as BlankPageIcon } from '../../assets/icons/very-sad.svg'

const DirectoryListener = (props) => {
  const classes = useDirectoryListenerStyles()
  const [contextMenu, setContextMenu] = React.useState(1)
  const { tree, node, content, setContent } = useAppContext()

  const [copiedItem, setCopiedItem] = React.useState(null)
  const [newItemModal, setNewItemModal] = React.useState(false)
  const toggleNewItemModal = () => setNewItemModal(!newItemModal)

  const createItem = (item) => {
    tree.insert({ ...item, parent: node })
    setContent([...node.children])
  }

  const pasteItemToCurrentNode = () => {
    tree.copy(copiedItem, node)
    setCopiedItem(null)
    setContent([...node.children])
  }

  const cancelPaste = () => {
    setCopiedItem(null)
  }

  const contextMenuItems = [
    {
      title: `Paste to ${node?.name}`,
      icon: <MoveToInboxIcon />,
      onClick: pasteItemToCurrentNode
    },
    {
      title: `Cancel Paste`,
      icon: <BlockIcon />,
      onClick: cancelPaste
    }
  ]

  return (
    <>
      <NewItemModal
        modalState={newItemModal}
        toggleModalState={toggleNewItemModal}
        handleItemCreate={createItem}
      />
      <div style={{ display: 'flex' }}>
        <div
          role='button'
          style={{
            marginRight: 30,
            cursor: 'pointer',
            padding: '50px 0 0 50px'
          }}
          onClick={toggleNewItemModal}
        >
          <img
            src={NewItemIcon}
            alt='Create New Icon'
            width={88.03}
            height={103}
          />
        </div>
        {content.length ? (
          <MovableList
            cancelPaste={cancelPaste}
            setCopiedItem={setCopiedItem}
            handleItemDoubleClick={props.handleItemDoubleClick}
            copiedItem={copiedItem}
            contextMenu={contextMenu}
            setContextMenu={setContextMenu}
          />
        ) : (
          <div className={classes.blankPage}>
            <BlankPageIcon className={classes.icon} />
            <p>
              {props.searchVal
                ? 'No item found'
                : 'use the "Plus" button to create new items'}
            </p>
          </div>
        )}
        <ContextMenuContainer
          menuKey={1}
          setContextMenu={setContextMenu}
          isVisible={!!copiedItem && contextMenu === 1}
          style={{ flex: 1 }}
          menuItems={contextMenuItems}
        />
      </div>
      <ContextMenuContainer
        menuKey={2}
        setContextMenu={setContextMenu}
        isVisible={!!copiedItem && contextMenu === 2}
        style={{ flex: 1 }}
        menuItems={contextMenuItems}
      />
    </>
  )
}

export default DirectoryListener
