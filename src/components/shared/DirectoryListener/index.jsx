import * as React from 'react'
import NewItemModal from '../../NewItemModal'
import DirectoryItem from './DirectoryItem'
import NewItemIcon from '../../../assets/icons/add_new_button.png'
import FileIcon from '../../../assets/icons/file.png'
import DirectoryIcon from '../../../assets/icons/folder.png'

const DirectoryListener = (props) => {
  const nameRef = React.useRef()
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
  }

  const removeItem = (item) => () => {
    const children = props.tree.remove(item).children
    props.setContent([...children])
  }

  const renameItem = () => {
    nameRef.current.focus()
  }

  const handleNewItemName = (item) => () => {
    props.tree.rename(item, nameRef.current.innerText)
  }

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
          style={{ paddingRight: 30, cursor: 'pointer' }}
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
          <DirectoryItem
            key={child.id}
            removeItem={removeItem(child)}
            renameItem={renameItem}
          >
            <div
              key={child.id}
              style={{ paddingRight: 30 }}
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
          </DirectoryItem>
        ))}
      </div>
    </>
  )
}

export default DirectoryListener
