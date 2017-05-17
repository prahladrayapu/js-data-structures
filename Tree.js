function Node(val) {
  this.data = val;
  this.children = [];
}

function Tree() {
  this.root = null;
}
Tree.prototype.add = function(data, toNodeData){
  var node = new Node(data);
  var parent = toNodeData ? this.findBFS(toNodeData) : null;
  if (parent) {
    parent.children.push(node);
  }else {
    if (!this.root){
      this.root = node;
    }else {
      return "Root node is already assigned";
    }
  }
};
Tree.prototype.remove = function(data){
  if (this.root.data === data) {
    this.root = null;
  }
  var queue = [this.root];

  while(queue.length > 0) {
    var node = queue.shift(); // pop first element in queue
    for (var i = 0; i < node.children.length; i++) {
      if (node.children[i].data === data) {
        node.children.splice(i, 1); // remove if node with value `data` is found
      }else{
        queue.push(node.children[i]);
      }
    }
  }
};
Tree.prototype.contains = function(data) { // check if node is present in tree
  return this.findBFS(data) ? true : false;
};
Tree.prototype.findBFS = function(data) { // searching for node with data
  var queue = [this.root];
  while(queue.length > 0) {
    var node = queue.shift();
    if (node.data === data){
      return node;
    }else {
      for (var i =0; i < node.children.length; i++) {
        queue.push(node.children[i]);
      }
    }
  }
};
Tree.prototype._preOrder = function(node, fn) {
  if (node) {
    if (fn) {
      fn(node);
    }
    for (var i = 0; i < node.children.length; i++) {
      this._preOrder(node.children[i], fn);
    }
  }
};
Tree.prototype._postOrder = function(node, fn) {
  if (node) {
    for (var i = 0; i < node.children.length; i++) {
      this._postOrder(node.children[i], fn);
    }
    if (fn) {
      fn(node);
    }
  }
};
Tree.prototype.traverseDFS = function(fn , method) {
  var curNode = this.root;
  if (method) {
    this.['_' + method](curNode, fn);
  }else{
    this._preOrder(curNode, fn); // defaults to preOrder DFS traversal
  }
};
Tree.prototype.traverseBFS = function(fn) {
  var queue = [this.root];
  while(queue.length > 0) {
    var node = queue.shift();
    if (fn) {
      fn(node);
    }
    for (var i = 0; i < node.children.length; i++) {
      queue.push(node.children[i]);
    }
  }
};
Tree.prototype.print = function() {
  if (!this.root) {
    console.log("No root node is found for this tree");
  }
  var newLine = new Node("|"), string = "";
  var queue = [this.root, newLine];
  while(queue.length > 0) {
    var node = queue.shift();
    string += node.data.toString() + " ";
    if (node === newLine && queue.length > 0) {
      queue.push(node);
    }
    for (var i = 0 ; i < node.children.length; i++) {
      queue.push(node.children[i]);
    }
  }
  console.log(string.slice(0, -2).trim());  // remove last " | " characters
};
Tree.prototype.printByLevel = function() {
  if (!this.root) {
    console.log("No root node is found");
  }
  var newLine = new Node("/n"), string = "";
  var queue = [this.root, newLine];
  while(queue.length) {
    var node = queue.shift();
    string += (node.data + (node.data === "/n" ? "" : " "));
    if (node === newLine && queue.length) {
      queue.push(newLine);
    }
    for (var i = 0; i < node.children.length; i++) {
      queue.push(node.children[i]);
    }
  }
  console.log(string.trim());
};
