var assert = require('assert');

var Node = function(val) {
  this.value = val;
  this.next = null;
}

/*
Like a graph. Nodes point to other nodes

*/

var LinkedList = function() {
  this.head = null;
  this.length = 0;
}

LinkedList.prototype.getNodeAtPosition = function(position) {
  if (position >= this.length) {
    throw new Error("outside range of length");
  }

  var current = this.head;

  for (var i = 0; i < position; i++) {
    current = current.next;
  }

  return current;
}

LinkedList.prototype.addAtPosition = function(value, position) {
  // Create the node!
  var node = new Node(value);

  // Add to the head
  if (position === 0) {
    node.next = this.head;
    this.head = node;
  } else {
    let prev = this.getNodeAtPosition(position - 1);
    let current = prev.next;
    node.next = current;
    prev.next = node;
  }
  this.length++;
}

LinkedList.prototype.removeAtPosition = function(position) {
  if (!this.head) {
    throw new Error("Empty list, yo!");
  }

  // if removing the head, set the head to the next node in the chain
  if (position === 0) {
    this.head = this.head.next;
  } else {
    let prev = this.get(position - 1);
    prev.next = prev.next.next;
  }
  this.length--;
}

var linky = new LinkedList();
linky.addAtPosition("Charlie", 0);
linky.addAtPosition("Harrington", 1);
console.log(linky);
linky.removeAtPosition(0);
console.log(linky);
