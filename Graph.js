/*
  Graph data structure is set of Nodes (vertices, V) with set of unordered pairs of nodes (undirected graphs) or set of ordered pairs for directed graphs. These pairs are edges (directed for directed graphs, E). Each edge can carry extra attribute(value) like cost, capacity, length etc. for edge preference while traversing

  2 types of representations of Graphs are:
  1. Adjacency list: For every node(vertex) a list of adjacent vertices is stored. This can be viewed as storing the list of edges. Here you can store extra attributes on node & edge.
  2. Adjacency matrix: Data is stored as 2-D matrix, where rows are source vertices and columns represent destination vertices. In this representation, data on node & edge has to be stored externally.

  Complexities:
  Using Adjacency List:
    * Storage -> O(|V| + |E|)
    * Add vertex -> O(1)
    * Add Edge -> O(1)
    * Edge Query -> O(|V|)
  Using Adjacency Matrix:
    * Storage -> O(|V|^2)
    * Add vertex -> O(|V|^2)
    * Add Edge -> O(1)
    * Edge Query -> O(1)

  For Complexity of DS & sort algorithms, try this website: http://bigocheatsheet.com/

  Below code implements Graph structure with Adjacency List
*/

function Graph() {
  this.vertices = [];
  this.edges = [];
  this.noOfEdges = 0;
}
Graph.prototype.addVertex = function(vertex) {
  this.vertices.push(vertex);
  this.edges[vertex] = []; // initialize edges for new vertex
};
Graph.prototype.removeVertex = function(vertex) {
  var index = this.vertices.indexOf(vertex);
  if (~index) {
    this.vertices.splice(index, 1);
  }
  while(this.edges[vertex].length) { // removing edges for this vertex
    var adjacentVertex = this.edges[vertex].pop(); // last element in edges[vertex]
    this.removeEdge(adjacentVertex, vertex);
  }
};
Graph.prototype.addEdge = function(vertex1, vertex2) {
  this.edges[vertex1].push(vertex2);
  this.edges[vertex2].push(vertex1);
  this.noOfEdges++;
};
Graph.prototype.removeEdge = function(vertex1, vertex2) {
  var index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1;
  var index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1;
  if (~index1) {
    this.edges[vertex1].splice(index1, 1);
    this.noOfEdges--;
  }
  if (~index2) {
    this.edges[vertex2].splice(index2, 1);
  }
};
Graph.prototype.size = function() {
  return this.vertices.length;
};
Graph.prototype.relations = function() {
  return this.noOfEdges.length;
};
Graph.prototype.traverseDFS = function(vertex, fn) { // O(|V|+|E|)
  if (!~this.vertices.indexOf(vertex)) {
    return console.log("Not found: " + vertex);
  }
  var visited = [];
  this._traverseDFS(vertex, visited, fn);
};
Graph.prototype._traverseDFS = function(vertex, visited, fn){
  visited[vertex] = true;
  if (this.edges[vertex] !== undefined) {
    fn(vertex);
  }
  for (var i = 0; i < this.edges[vertex].length; i++) {
    if (!visited[this.edges[vertex][i]]) {
      this._traverseDFS(this.edges[vertex][i], visited, fn);
    }
  }
};
Graph.prototype.traverseBFS = function(vertex, fn) {
  if (!~this.vertices.indexOf(vertex)) {
    return console.log("Not found: " + vertex);
  }
  var queue = [vertex];
  var visited = [];
  // visited[vertex] = true;
  while(queue.length) {
    var curVertex = queue.shift();
    fn(curVertex);
    visited[curVertex] = true;
    for (var i = 0; i < this.edges[curVertex].length; i++) {
      if (!visited[this.edges[curVertex][i]]){
        // visited[this.edges[curVertex][i]] = true;
        queue.push(this.edges[curVertex][i]);
      }
    }
  }
};
Graph.prototype.pathFromTo = function(sourceVertex, destinationVertex) {
  if (!~this.vertices.indexOf(sourceVertex)){
    return console.log("Source Destination vertex not found!");
  }
  var queue = [sourceVertex];
  var visited = [];
  visited[sourceVertex] = true;
  var paths = []; // to store path between vertices
  while(queue.length) {
    var source = queue.shift();
    for (var i = 0; i < this.edges[source].length; i++) {
      if (!visited[this.edges[source][i]]){
        visited[this.edges[source][i]] = true;
        queue.push(this.edges[source][i]);
        paths[this.edges[source][i]] = source; // store path between vertices
      }
    }
  }

  if (!visited[destinationVertex]) { // in above edges loop if destinationVertex is not visited then no path exists between source & destination
    return undefined;
  }

  var path = []; // to store path from destination to source in reverse
  for (var j = destinationVertex; j !== sourceVertex; j = paths[j]) {
    path.push(j);
  }
  return path.reverse.join("->");
};
Graph.prototype.print = function() {
  console.log(this.vertices.map(function(vertex){
    return (vertex + " -> " + this.edges[vertex].join(", ")).trim();
  }, this).join(" | "));
};

Graph.prototype._isCyclic = function(vertex, visited, recStack) {
  if (!visited[vertex]) {
    visited[vertex] = true; // to keep track of visited vertices in current Graph for Cycles
    recStack[vertex] = true;
    for (var j = 0; j < this.edges[vertex].length; j++) {
      if (!visited[this.edges[vertex][j]] && this._isCyclic(this.edges[vertex][j], visited, recStack)) {
        return true;
      }else if (recStack[this.edges[vertex][j]]) { // if vertex is their in current edge vertex's ancestor or having selfloop
        return true;
      }
    }
  }
  recStack[vertex] = false;
  return false;
}

// Use DFS traversing of Graph for cycle detection in directed graphs along with an array (recStack) with boolean flags for each vertex
Graph.prototype.isDirectedCyclic = function() { // return true if atleast 1 cycle present in given Directed Graph
  var visited = [], recStack = []; // recStack is to detect loops (3 -> 3, 3 -> 4 -> 3 etc.)
  for (var i = 0; i < this.vertices.length; i++) {
    if (this._isCyclic(this.vertices[i], visited, recStack)) {
      return true;
    }
  }
  return false;
};
