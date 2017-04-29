var assert = require('assert');

/*
FIFO
*/
var Queue = function() {
  this.length = 0;
  this.storage = [];
};

Queue.prototype.enqueue = function(value) {
  this.storage.push(value);
  this.length++;
}

Queue.prototype.dequeue = function() {
  if (!this.length) {
    return;
  }
  this.length--;
  return this.storage.shift();
}

Queue.prototype.peek = function() {
  return this.storage[0];
}

var myQ = new Queue();
myQ.enqueue(1);
myQ.enqueue(2);
console.log(myQ);
var firstOut = myQ.dequeue();
console.log("firstOut: ", firstOut);
console.log(myQ);
