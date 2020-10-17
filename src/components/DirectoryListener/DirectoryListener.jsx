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

  // React.useEffect(() => {
  //   const itemNames = window.location.pathname.split('/')
  //   let node = tree?.getRootNode()
  //   // let children = []
  //   console.log(node)
  //   if (node) {
  //     itemNames.forEach((name, index) => {
  //       if (node.name === name) {
  //         // children = node.children
  //         if (index !== itemNames.length - 1) {
  //           node = node.children.find(
  //             (child) => child.name === itemNames[index + 1]
  //           )
  //         }
  //         setNode(node)
  //       } else {
  //         history.push('/home')
  //       }
  //     })
  //   }
  // }, [window.location.pathname])

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
          style={{ marginRight: 30, cursor: 'pointer' }}
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
          />
        ) : (
          <div className={classes.blankPage}>
            <BlankPageIcon className={classes.icon} />
            <p> use the "Plus" button to create new items </p>
          </div>
        )}
      </div>
      <ContextMenuContainer
        isVisible={!!copiedItem}
        style={{ height: '90%' }}
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
