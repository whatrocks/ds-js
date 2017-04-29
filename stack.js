var assert = require('assert');

/*
LIFO
push and pop are O(1)
*/
var Stack = function() {
  this.storage = [];
  this.length = 0;
}

Stack.prototype.push = function(value) {
  this.storage[this.length] = value;
  this.length++;
}

Stack.prototype.pop = function() {
  if (!this.length) return;

  var result = this.storage[this.length - 1];
  delete this.storage[this.length - 1];
  this.length--;
  return result;
}

Stack.prototype.peek = function () {
  return this.storage[this.length - 1];
}

var stacky = new Stack();
stacky.push("Bruce");
stacky.push("Wayne");
console.log(stacky.peek());
assert.equal(stacky.pop(), "Wayne");
assert.equal(stacky.length, 1);
