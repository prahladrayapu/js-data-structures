function Node(data) {
  this.data = data;
  this.left = null;
  this.right =  null;
}

function NodeWithHd(node, hd) {
  this.node = node;
  this.hd = hd;
}
function BinaryTree() {
  this.root = null;
}
BinaryTree.prototype.findBFS = function(nodeData) {
  var queue = [this.root];
  while(queue.length) {
    var node = queue.shift();
    if (node.data === nodeData) {
      return node;
    }
    if (node.left){
      queue.push(node.left);
    }
    if (node.right){
      queue.push(node.right);
    }
  }
};
BinaryTree.prototype.addNode = function(data, toNodeData){
  var node = new Node(data);
  var parentNode = toNodeData ? this.findBFS(toNodeData) : null;
  if (parentNode) {
    if (!parentNode.left) {
      parentNode.left = node;
    }else{
      parentNode.right = node;
    }
  }else{
    if(!this.root) {
      this.root = node;
    }else{
      console.log("Root node is already assigned!");
    }
  }
};
BinaryTree.prototype.removeNode = function(data) {
  if(this.root && this.root.data === data){
    return this.root = null;
  }
  var queue = [this.root];
  while(queue.length) {
    var node = queue.shift();
    if (node.left.data === data) {
      node.left = null;
    }else{
      queue.push(node.left);
    }
    if (node.right.data === data) {
      node.right = null;
    }else{
      queue.push(node.right);
    }
  }
};
BinaryTree.prototype.contains = function(data) {
  return this.findBFS(data) ? true : false;
};
BinaryTree.prototype._preOrder = function(fn, node){
  if (fn) {
    fn(node);
  }
  this._preOrder(fn, node.left);
  this._preOrder(fn, node.right);
};
BinaryTree.prototype._postOrder = function(fn, node){
  this._postOrder(fn, node.left);
  this._postOrder(fn, node.right);
  if (fn) {
    fn(node);
  }
};
BinaryTree.prototype.traverseDFS = function(fn, method) {
  if (method) {
    this["_" + method](fn, this.root);
  }else{
    this._preOrder(fn, this.root);
  }
};
BinaryTree.prototype.traverseBFS = function(fn) {
  var queue = [this.root];
  while(queue.length) {
    var node = queue.shift();
    if (fn) {
      fn(node);
    }
    if (node.left){
      queue.push(node.left);
    }
    if (node.right) {
      queue.push(node.right);
    }
  }
};
BinaryTree.prototype.print = function() {
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
BinaryTree.prototype.printByLevel = function() {
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
BinaryTree.prototype.maxDepth = function() {
  return this._maxDepth(this.root);
};
BinaryTree.prototype._maxDepth = function(node) {
  if (!node) {
    return 0;
  }
  var left = this._maxDepth(node.left);
  var right = this._maxDepth(node.right);
  return (Math.max(left, right) + 1);
};
BinaryTree.prototype.topView = function() {
  var visitedHd = [];
  var nodeWithHd = new NodeWithHd(this.root, 0); // root horizontal distance is 0
  this._topView(nodeWithHd, visitedHd);
};
BinaryTree.prototype._topView = function(nodeWithHd, visitedHd) {
  var queue = [nodeWithHd], string = "";
  while(queue.length){
    var nodeHd = queue.shift(), hd = nodeHd.hd, node = nodeHd.node;
    if (!~visitedHd.indexOf(hd)){
      visitedHd.push(hd);
      string += (node.data + " ");
    }
    if (node.left){queue.push(new NodeWithHd(node.left, hd - 1));}
    if (node.right){queue.push(new NodeWithHd(node.right, hd + 1));}
  }
  console.log(string.trim());
};
