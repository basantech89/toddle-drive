import * as React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useAppContext from '../../../context/AppContext'
import { DraggableListenerItems } from '../../DirectoryListener'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  background: isDragging ? '#72a2c0' : 'transparent',
  outline: 'none',
  ...draggableStyle
})

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? '#a0bacb' : null,
  display: 'flex',
  padding: '0 20px',
  borderRadius: 10,
  flexWrap: 'wrap'
})

const MovableList = (props) => {
  const { tree, node, content, setContent } = useAppContext()
  const onDragEnd = (result) => {
    if (result.destination) {
      const reOrderedItems = reorder(
        content,
        result.source.index,
        result.destination.index
      )

      tree.reorder(node.id, reOrderedItems)
      setContent(reOrderedItems)
    } else if (result.combine) {
      const type = node.children.find(
        (child) => child.id === result.combine.draggableId
      ).type
      if (type === 'directory') {
        const updatedContent = tree.move(
          result.source.index,
          result.combine.draggableId
        )
        setContent(updatedContent)
      }
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId='droppable'
        direction='horizontal'
        isCombineEnabled={true}
      >
        {(provided, snapshot) => (
          <div
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            {...provided.droppableProps}
          >
            {content?.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(
                      snapshot.isDragging,
                      provided.draggableProps.style
                    )}
                  >
                    <DraggableListenerItems item={item} {...props} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export default MovableList
