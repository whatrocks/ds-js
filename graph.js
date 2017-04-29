var assert = require('assert');

var Node = function(value) {
  this.value = value;
  this.edges = [];
}

var Graph = function() {
  this.nodes = [];
}

Graph.prototype.addNode = function(value) {
  var node = new Node(value);
  this.nodes.push(node);
}

Graph.prototype.find = function(value) {
  return this.nodes.find(function(node) {
    return node.value === value;
  })
}

Graph.prototype.addEdge = function(startValue, endValue) {
  // Find the nodes for each value
  var startNode = this.find(startValue);
  var endNode = this.find(endValue);

  // Bail if we can't find one
  if (!startNode || !endNode) {
    throw new Error("Whooops");
  }

  startNode.edges.push(endNode);
}

// var graphy = new Graph();
// graphy.addNode("Charlie");
// graphy.addNode("Batman");
// console.log(graphy);
// graphy.addEdge("Batman", "Charlie");
// console.log(graphy);
// console.log(graphy.find("Batman"));
// console.log(graphy.find("Charlie"));

class GraphES6 {
  constructor() {
    this.nodes = {};
    this.edges = {};
  }

  addNode(value) {
    this.nodes[value] = true;
  }

  contains(value) {
    return this.nodes[value] ? true : false;
  }

  removeNode(value) {
    var node = this.nodes[value];
    delete this.nodes[value];
    return node;
  }

  addEdge(node1, node2) {
    this.edges[node1] = this.edges[node1] || {};
    this.edges[node2] = this.edges[node2] || {};
    this.edges[node1][node2] = true;
    this.edges[node2][node1] = true;
  }

  hasEdge(node1, node2) {
    return this.edges[node1][node2] ? true : false;
  }

  removeEdge(node1, node2) {
    delete this.edges[node1][node2];
    delete this.edges[node2][node1];
  }

  forEachNode(cb) {
    for (var node in this.nodes) {
      cb(node);
    }
  }
}

var grapher = new GraphES6();
grapher.addNode("Superman");
grapher.addNode("Batman");
grapher.addNode("Harry Potter");
grapher.forEachNode(node => console.log("I am: ", node));
grapher.addEdge("Superman", "Batman");
grapher.addEdge("Superman", "Harry Potter");
console.log(grapher);
