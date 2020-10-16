import { v4 } from 'uuid'

export const Node = function (node) {
  this.name = node.name
  this.type = node.type
  this.id = node.id
  this.parent = node.parent
  // this.depth = node.depth
  this.active = false
  this.children = []
}

export const Tree = function () {
  this.root = new Node({
    name: 'Create New Item',
    type: null,
    id: v4(),
    parent: null
    // depth: 0
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
        console.log('here', child)
        queue.push(...child.children)
      }
    }
  }
}
