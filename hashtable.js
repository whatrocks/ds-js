var assert = require('assert');

// Unordered, uses keys and values
// Keys are "hashable" and used to add, access, remove from memory
// very efficiently

var HashTable = function() {
  this.storage = [];
  this.storageLimit = 16;
  this.size = 0;
}

// Constant time: O(1), Worse: O(n)
HashTable.prototype.set = function(key, value) {
  console.log("Inserting: ", key, value, "...");

  var index = getIndexBelowMaxForKey(key, this.storageLimit);
  var bucket = this.storage[index] || [];
  var foundIt = false;

  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === key) {
      bucket[i][1] = value;
      foundIt = true;
    }
  }

  if (!foundIt) {
    var tuple = [key, value];
    bucket.push(tuple);
    this.size++;
  }

  this.storage[index] = bucket;

  if (this.size >= this.storageLimit * 0.75) {
    this.resize(this.storageLimit * 2)
  }
}

// Best: O(1), worse: O(n)
HashTable.prototype.get = function(key) {
  var index = getIndexBelowMaxForKey(key, this.storageLimit);
  var bucket = this.storage[index] || [];

  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === key) {
      return bucket[i][1];
    }
  }
}

HashTable.prototype.remove = function(key) {
  var index = getIndexBelowMaxForKey(key, this.storageLimit);
  var bucket = this.storage[index] || [];
  var result;

  for (var i = 0; i < bucket.length; i++) {
    if (bucket[i][0] === key) {
      result = bucket[i][1];
      bucket[i][1] === undefined;
      this.size--;
    }
  }
  this.storage[index] = bucket;

  if (this.size <= this.storageLimit * 0.25) {
    this.resize(this.storageLimit / 2);
  }

  return result;
}

HashTable.prototype.resize = function(newLimit) {
  console.log("Resizing to new limit of :", newLimit);
  var tuples = [];
  for (var i = 0; i < this.storage.length; i++) {
    if (!this.storage[i]) {
      continue;
    }
    for (var j = 0; j < this.storage[i].length; j++) {
      if (!this.storage[i][j]) {
        continue;
      }
      tuples.push(this.storage[i][j]);
    }
  }
  this.storageLimit = newLimit;
  this.storage = [];
  this.size = 0;
  for (var i = 0; i < tuples.length; i++) {
    this.set(tuples[i][0], tuples[i][1])
  }
}

var getIndexBelowMaxForKey = function(key, max) {
  var hash = 0;
  for (var i = 0; i < key.length; i++) {
    hash = (hash<<5) + hash + key.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash % max;
}

var hashy = new HashTable();
hashy.set("Darth", "Vader");
hashy.set("Luke", "Skywalker");
console.log(hashy.get("Darth"));
console.log(hashy);
assert.equal(hashy.get("Darth"), "Vader");
hashy.set("Darth", "Maul");
assert.equal(hashy.get("Darth"), "Maul");
console.log(hashy.get("Darth"));
hashy.remove("Darth");
console.log(hashy);
hashy.set("Luke", "Skywalker");
hashy.set("Leia", "Skywalker");
hashy.set("Ben", "Solo");
hashy.set("Mara", "Jade");
hashy.set("BB", "8");
hashy.set("C3", "PO");
hashy.set("Django", "Fett");
