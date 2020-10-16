import * as React from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import useAppContext from '../../../../context/AppContext'
import DraggableItems from '../DraggableItems/'

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: 'none',
  background: isDragging ? '#30497b' : 'transparent',
  ...draggableStyle
})

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? 'lightblue' : null,
  display: 'flex',
  padding: '0 20px'
})

const MovableList = (props) => {
  const { tree, node, content, setContent } = useAppContext()
  const onDragEnd = (result) => {
    if (!result.destination) {
      return
    }

    const reOrderedItems = reorder(
      content,
      result.source.index,
      result.destination.index
    )

    tree.reorder(node.id, reOrderedItems)
    setContent(reOrderedItems)
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId='droppable' direction='horizontal'>
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
                    <DraggableItems item={item} {...props} />
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