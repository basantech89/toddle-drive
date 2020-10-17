import * as React from 'react'
import NewItemModal from '../NewItemModal'
import { ContextMenuContainer } from '../shared/ContextMenu'
import NewItemIcon from '../../assets/icons/add_new_button.png'
import MoveToInboxIcon from '@material-ui/icons/MoveToInbox'
import BlockIcon from '@material-ui/icons/Block'
import MovableList from '../shared/MovableList'
import useAppContext from '../../context/AppContext'

const DirectoryListener = (props) => {
  const { tree, node, setContent } = useAppContext()
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
        <MovableList
          cancelPaste={cancelPaste}
          setCopiedItem={setCopiedItem}
          handleItemDoubleClick={props.handleItemDoubleClick}
          copiedItem={copiedItem}
        />
      </div>
      <ContextMenuContainer
        isVisible={!!copiedItem}
        style={{ height: '100%' }}
        menuItems={[
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
        ]}
      />
    </>
  )
}

export default DirectoryListener
