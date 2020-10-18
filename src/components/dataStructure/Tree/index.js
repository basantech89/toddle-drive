import { v4 } from 'uuid'

export const Node = function (node) {
  this.name = node.name
  this.type = node.type
  this.id = node.id
  this.parent = node.parent
  this.children = []
}

export const Tree = function () {
  this.root = new Node({
    name: 'Home',
    type: null,
    id: v4(),
    parent: null
  })
}

Tree.prototype.getRootNode = function () {
  return this.root
}

Tree.prototype.insert = function (newItem) {
  let newNode
  newNode = new Node(newItem)
  if (!newItem.parent) {
    newNode.parent = this.root
    this.root.children.push(newNode)
  } else {
    let queue = [this.root]
    let child
    while (queue.length > 0) {
      child = queue.shift()
      if (child.id === newItem.parent.id) {
        newNode.parent = child
        child.children.push(newNode)
        return
      } else {
        queue.push(...child.children)
      }
    }
  }
}

Tree.prototype.rename = function (node, newName) {
  let queue = [this.root]
  let child
  while (queue.length > 0) {
    child = queue.shift()
    if (child.id === node.id) {
      const alreadyExists = child.parent.children.some(
        (currentNode) =>
          currentNode.id !== node.id && currentNode.name === newName
      )
      if (alreadyExists) {
        return 'File / Folder with this name already Exists!'
      }
      child.name = newName
      return ''
    } else {
      queue.push(...child.children)
    }
  }
}

Tree.prototype.remove = function (node) {
  let queue = [this.root]
  let child
  while (queue.length > 0) {
    child = queue.shift()
    if (child.id === node.id) {
      const parent = child.parent
      const childIdx = parent.children.findIndex((item) => item.id === node.id)
      parent.children.splice(childIdx, 1)
      return
    } else {
      queue.push(...child.children)
    }
  }
}

function getNodeName(fromNode, toNode) {
  let newName = fromNode.name
  if (fromNode.parent === toNode) {
    newName = `${fromNode.name}-copy`
  } else {
    const alreadyExist = toNode.children.some(
      (child) => child.name === fromNode.name
    )
    if (alreadyExist) {
      newName = `${fromNode.name}-copy`
    }
  }
  return newName
}

Tree.prototype.copy = function (copiedNode, toNode) {
  let queue = [this.root]
  let child
  while (queue.length > 0) {
    child = queue.shift()
    if (child.id === toNode.id) {
      const pastedNode = new Node({
        name: getNodeName(copiedNode, toNode),
        type: copiedNode.type,
        parent: child,
        id: v4()
      })
      pastedNode.children = [...copiedNode.children]
      child.children.push(pastedNode)
      return
    } else {
      queue.push(...child.children)
    }
  }
}

Tree.prototype.reorder = function (nodeID, reOrderedChildren) {
  let queue = [this.root]
  let child
  while (queue.length > 0) {
    child = queue.shift()
    if (child.id === nodeID) {
      child.children = [...reOrderedChildren]
      return
    } else {
      queue.push(...child.children)
    }
  }
}

Tree.prototype.move = function (fromIdx, toID) {
  let queue = [this.root]
  let toNode
  let child
  while (queue.length > 0) {
    child = queue.shift()
    if (child.id === toID) {
      toNode = child
      const fromNode = toNode.parent.children.splice(fromIdx, 1)[0]
      fromNode.parent = toNode
      fromNode.name = getNodeName(fromNode, toNode)
      toNode.children.push(fromNode)
      return toNode.parent.children
    } else {
      queue.push(...child.children)
    }
  }
}
