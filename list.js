var assert = require('assert');
/*
List is ordered sequence of values where the same
value may appear many times.
*/
var List = function() {
  this.memory = [];
  this.length = 0;
}

List.prototype.get = function(loc) {
  return this.memory[loc];
}

// Add value to end
// O(1)
List.prototype.push = function(value) {
  this.memory[this.length] = value;
  this.length++;
};

// Remove value from the end
// O(1)
List.prototype.pop = function() {
  if ( this.length === 0 ) {
    return;
  }
  var lastValue = this.memory[this.length - 1];
  delete this.memory[this.length - 1];
  this.length--;
  return lastValue;
};

//Add value to the start
// O(1)
List.prototype.unshift = function(value) {
  var previous = value;

  for (var address = 0; address < this.length; address++) {
    let current = this.memory[address];
    this.memory[address] = previous;
    previous = current;
  }

  // Add the last time in a new position at the end of the List
  this.memory[this.length] = previous;
  this.length++;
};

// Remove value from the start
// O(1)
List.prototype.shift = function() {
  if (this.length === 0) {
    return;
  }

  var value = this.memory[0];

  for (var address = 0; address < this.length; address++) {
    this.memory[address] = this.memory[address + 1];
  }

  // Delete the last one since its now in the previoous
  delete this.memory[this.length - 1];
  this.length--;

  return value;

}


var listy = new List();
listy.push(1);
listy.push(2);
assert.equal(listy.length, 2);
listy.pop();
assert.equal(listy.length, 1);
listy.unshift(100);
assert.equal(listy.length, 2);
assert.equal(listy.memory[0], 100);
listy.shift();
assert.equal(listy.length, 1);
assert.equal(listy.memory[0], 1);
