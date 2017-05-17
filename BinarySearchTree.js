function Node(data) {
  this.data = data;
  this.left = this.right = null;
}

function BinarySearchTree() {
  this.root = null;
}

BinarySearchTree.prototype.addNode = function(data){
  var node = new Node(data);
  if (this.root){
    var tmp = this.root;
    while(tmp) {
      if (tmp.data > node.data) {
        if (!tmp.left){
          tmp.left = node;
          break;
        }
        tmp = tmp.left;
      }else if (tmp.data < node.data) {
        if (!tmp.right){
          tmp.right = node;
          break;
        }
        tmp = tmp.right;
      }else{
        break;
      }
    }
  }else{
    this.root = node;
  }
};
BinarySearchTree.prototype.removeNode = function(data) {
  if (this.root){
    this.root = this._removeNode(this.root, data);
  }else{
    console.log("Root node not found!");
  }
};
BinarySearchTree.prototype._removeNode = function(node, data){
  if (node) {
    if (node.data > data){
      node.left = this._removeNode(node.left, data); // set returned node to parent(node.left or node.right)
    }else if (node.data < data){
      node.right = this._removeNode(node.right, data);
    }else{
      if (!node.left){
        return node.right;
      }
      if(!node.right){
        return node.left;
      }
      node.data = this.minValue(node.right);  // assign min. value in node from right tree to current node
      node.right = this._removeNode(node.right, node.data); // remove min.value node from right tree of current node
    }
  }
  return node;
};
BinarySearchTree.prototype.minValue = function(node){
  var tmp = node;
  while(tmp.left){
    tmp = tmp.left;
  }
  return tmp.data;
};
BinarySearchTree.prototype.print = function() {
  if (!this.root) {
    return console.log("Root node not found!");
  }
  var newLine = new Node("|"), string = "";
  var queue = [this.root, newLine];
  while(queue.length){
    var node = queue.shift();
    string += node.data.toString() + " ";
    if (node === newLine && queue.length) {
      queue.push(newLine);
    }
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  console.log(string.slice(0, -2).trim());
};
BinarySearchTree.prototype.printByLevel = function() {
  if (!this.root) {
    return console.log("Root node not found!");
  }
  var newLine = new Node("\n"), string = "", queue = [this.root, newLine];
  while(queue.length) {
    var node = queue.shift();
    string += node.data.toString() + (node.data === "\n" ? "" : " ");
    if (node === newLine && queue.length) {
      queue.push(node);
    }
    if (node.left) {
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
  console.log(string.trim());
};

BinarySearchTree.prototype.lowestCommonAncestorRecursive = function(val1, val2){
  return this._lowestCommonAncestor(this.root, val1, val2);
};
// Lowest Common Ancestor concept is very useful to find distance between node with value1 to node with value2

// Complexity O(h) where h is height of tree. Recursive method takes up O(h) space extra in function callstack due to recursive calls
BinarySearchTree.prototype._lowestCommonAncestor = function(node, val1, val2){
  if (node.data < val1 && node.data < val2) {
    return this._lowestCommonAncestor(node.right, val1, val2);
  }
  if (node.data > val1 && node.data > val2){
    return this._lowestCommonAncestor(node.left, val1, val2);
  }
  return node;
};
// Use iterative method to avoid extra space of O(h) in function callstack
BinarySearchTree.prototype.lowestCommonAncestorIterative = function(val1, val2){
  var node = this.root;
  while(node){
    if (node.data < val1 && node.data < val2){
      node = node.right;
    }else if (node.data > val1 && node.data > val2){
      node = node.left;
    }else{
      break;
    }
  }
  return node;
};
