const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  tree = null;

  root() {
    return this.tree;
  }

  add( data ) {
    this.tree = this.addWithin(this.tree, data);
  }
  
  addWithin(node, data) {
    if (!node) return new Node(data);
    if (data === node.data) return node;

    if (data < node.data) node.left = this.addWithin(node.left, data);
    else node.right = this.addWithin(node.right, data);

    return node;
  }  

  has( data ) {
    return !!this.findWithin(this.tree, data);
  }

  find( data ) {
    return this.findWithin(this.tree, data);
  }

  findWithin(node, data) {
    if (!node) return null;
    if (node.data === data) return node;

    return data < node.data ? this.findWithin(node.left, data) : this.findWithin(node.right, data);
  }

  remove( data ) {
    this.tree = this.removeWithin(this.tree, data);
  }

  removeWithin(node, data) {
    if (!node) return null;

    if (data < node.data) {
      node.left = this.removeWithin(node.left, data);
      return node;
    }
    
    if (data > node.data) {
      node.right = this.removeWithin(node.right, data);
      return node;
    }

    if (!node.left && !node.right) return null;

    if (!node.left) {
      node = node.right;
      return node;
    }

    if (!node.right) {
      node = node.left;
      return node;
    }

    let minFromRight = node.right;
    while (minFromRight.left) minFromRight = minFromRight.left;
    
    node.data = minFromRight.data;

    node.right = this.removeWithin(node.right, minFromRight.data);

    return node;
  }

  min() {
    let node = this.tree;

    if (!node) return;

    while (node.left) node = node.left;

    return node.data;
  }

  max() {
    let node = this.tree;

    if (!node) return;

    while (node.right) node = node.right;

    return node.data;
  }
}

module.exports = {
  BinarySearchTree
};
