const Node = function (node) {
  this.name = node.name
  this.type = node.type
  this.id = node.id
  this.children = []
  this.active = false
}

const Tree = function () {
  this.root = new Node(null)
}

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Tree.prototype.insert = function (newNode, parent) {
  if (!parent) {
    this.root.children.push(newNode)
    return
  } else {
    let queue = [this.root]
    let child
    while (queue.length > 0) {
      child = queue.unshift()
      if (child.name === parent.name) {
        child.children.push(newNode)
        return
      } else {
        queue.push(...child.children)
      }
    }
  }
}

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Tree.prototype.search = function (word) {
  let node = this.root
  for (const letter of word) {
    if (letter in node.children) {
      node = node.children[letter]
    } else {
      return false
    }
  }
  return node.isWord
}
/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Tree.prototype.startsWith = function (prefix) {
  let node = this.root
  for (const letter of prefix) {
    if (letter in node.children) {
      node = node.children[letter]
    } else {
      return false
    }
  }
  return true
}
/**
 * Your Tree object will be instantiated and called as such:
 * var obj = new Tree()
 * obj.insert(word)
 * var param_2 = obj.search(word)
 * var param_3 = obj.startsWith(prefix)
 */
