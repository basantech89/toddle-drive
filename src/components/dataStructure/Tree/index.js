import { v4 } from 'uuid'

export const Node = function (node) {
  this.name = node.name
  this.type = node.type
  this.id = node.id
  this.parent = node.parent
  this.children = []
}

const alreadyExist = (fromNode, toNode) =>
  toNode.children.some((child) => child.name === fromNode.name)

const getNodeName = (fromNode, toNode) => {
  let newName = fromNode.name
  if (alreadyExist(fromNode, toNode)) {
    newName = `${fromNode.name}-copy`
    fromNode.name = newName
    return getNodeName(fromNode, toNode)
  }
  return newName
}

export class Tree {
  constructor() {
    this.root = new Node({
      name: 'home',
      type: null,
      id: v4(),
      parent: null
    })
  }

  getRootNode() {
    return this.root
  }

  insert(newItem) {
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

  rename(node, newName) {
    let queue = [this.root]
    let child
    while (queue.length > 0) {
      child = queue.shift()
      if (child.id === node.id) {
        child.name = newName
        return ''
      } else {
        queue.push(...child.children)
      }
    }
  }

  remove(node) {
    let queue = [this.root]
    let child
    while (queue.length > 0) {
      child = queue.shift()
      if (child.id === node.id) {
        const parent = child.parent
        const childIdx = parent.children.findIndex(
          (item) => item.id === node.id
        )
        parent.children.splice(childIdx, 1)
        return
      } else {
        queue.push(...child.children)
      }
    }
  }

  copy(copiedNode, toNode) {
    let queue = [this.root]
    let child
    while (queue.length > 0) {
      child = queue.shift()
      if (child.id === toNode.id) {
        const pastedNode = new Node({
          name: copiedNode.name,
          type: copiedNode.type,
          parent: child,
          id: v4()
        })
        pastedNode.name = getNodeName(pastedNode, toNode)
        pastedNode.children = [...copiedNode.children]
        child.children.push(pastedNode)
        return
      } else {
        queue.push(...child.children)
      }
    }
  }

  reorder(nodeID, reOrderedChildren) {
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

  move(fromIdx, toID) {
    let queue = [this.root]
    let toNode
    let child
    while (queue.length > 0) {
      child = queue.shift()
      if (child.id === toID) {
        toNode = child
        const fromNode = toNode.parent.children.splice(fromIdx, 1)[0]
        fromNode.name = getNodeName(fromNode, toNode)
        fromNode.parent = toNode
        toNode.children.push(fromNode)
        return toNode.parent.children
      } else {
        queue.push(...child.children)
      }
    }
  }
}
