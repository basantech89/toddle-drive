import * as React from 'react'
import { v4 } from 'uuid'

export const Node = function (node) {
  this.name = node.name
  this.type = node.type
  this.id = node.id
  this.parent = node.parent
  this.active = false
  this.children = []
}

class Tree extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      root: new Node({
        name: 'Create New Item',
        type: null,
        id: v4(),
        parent: null
      })
    }
    this.getRootNode = this.getRootNode.bind(this)
    this.insert = this.insert.bind(this)
    this.rename = this.rename.bind(this)
    this.remove = this.remove.bind(this)
  }

  getRootNode() {
    return this.state.root
  }

  insert(newItem) {
    let newNode
    newNode = new Node(newItem)
    if (!newItem.parent) {
      newNode.parent = this.root
      this.root.children.push(newNode)
    } else {
      let queue = [this.state.root]
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

  rename(newName) {
    let queue = [this.state.root]
    let child
    while (queue.length > 0) {
      child = queue.shift()
      if (child.id === node.id) {
        child.name = newName
        return
      } else {
        queue.push(...child.children)
      }
    }
  }

  remove(node) {
    let queue = [this.state.root]
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
}
