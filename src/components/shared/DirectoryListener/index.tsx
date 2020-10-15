import * as React from 'react'
import { v4 } from 'uuid'
import NewItemIcon from '../../../assets/icons/add_new_button.png'
import FileIcon from '../../../assets/icons/file.png'
import DirectoryIcon from '../../../assets/icons/folder.png'

declare interface IContent {
  type: 'file' | 'directory' | null
  name: string
  active: boolean
  id: string | null
  // parent: IContent | null
}

declare interface IDirectoryListenerPropsType {
  content: Array<IContent>
  rootNode: any
}

const DirectoryListener = (props: IDirectoryListenerPropsType) => {
  const [newItemModal, setNewItemModal] = React.useState(false)
  const toggleNewItemModal = () => setNewItemModal(!newItemModal)

  const newItem = [
    {
      type: null,
      name: 'Create New Item',
      active: false,
      id: v4()
    }
  ]

  const getImgIcon = (itemType: IContent['type']) => {
    switch (itemType) {
      case null:
        return NewItemIcon
      case 'file':
        return FileIcon
      case 'directory':
        return DirectoryIcon
      default:
        throw new Error('Invalid Item Type')
    }
  }

  const handleItemClick = (type: IContent['type']) => () => {
    if (typeof type === null) {
      toggleNewItemModal()
    }
  }

  return (
    <>
      {props.content.concat(newItem).map((item) => (
        <img
          key={item.id}
          src={getImgIcon(item.type)}
          alt={item.name}
          onClick={handleItemClick(item.type)}
        />
      ))}
    </>
  )
}

DirectoryListener.defaultProps = {
  content: []
}

export default DirectoryListener
