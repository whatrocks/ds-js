var BinaryHeap = function() {
  this._heap = [];
  this._compare = function(i,j) {
    return i < j;
  }
}

BinaryHeap.prototype.insert = function(node) {

  // Add node to the end of the heap
  this._heap.push(node);

  // Locate the nodes parent
  var index = this._heap.length-1;
  var parentIndex = Math.floor( (index - 1) / 2);

  // while the node has a parent and is less than parentIndex
  while (index > 0 && (this._compare(
    this._heap[index], this._heap[parentIndex])
  )) {
    swapNodesAt(index, parentIndex, this);
    index = parentIndex;
    parentIndex = Math.floor((index-1)/2);
  }
}

BinaryHeap.prototype.removeRoot = function() {
  // Swap root with the last node
  swapNodesAt(this._heap.length - 1, 0, this);

  // Remove the last node and store it to return later
  var originalRoot = this._heap.pop();

  var tempRootIndex = 0;

  // Compare children nodes to get index of lesser item
  var lesserChildIndex = getLesserChildIndex(tempRootIndex, this);

  // while there are children notes and lesser of them, is less than new root
  while (lesserChildIndex && this._compare(
    this._heap[lesserChildIndex],
    this._heap[tempRootIndex]
  )) {
    swapNodesAt(lesserChildIndex, tempRootIndex, this);
    tempRootIndex = lesserChildIndex;
    lesserChildIndex = getLesserChildIndex(tempRootIndex, this);
  }

  return originalRoot;
}

function getLesserChildIndex(parentIndex, binaryHeap) {
  var childIndices = [parentIndex * 2 + 1, parentIndex * 2 + 2].filter(function(index) {
    return index < binaryHeap._heap.length;
  })

  // compare child nodes to get the index of the lesser ofthem
  if (binaryHeap._compare(binaryHeap._heap[childIndices[0]], binaryHeap._heap[childIndices[1]])) {
    return childIndices[0];
  } else {
    return childIndices[1];
  }
}

function swapNodesAt(index, parentIndex, binaryHeap) {
  var heap = binaryHeap._heap;
  var temp = heap[index];
  heap[index] = heap[parentIndex];
  heap[parentIndex] = temp;
}

var heapy = new BinaryHeap();
heapy.insert(10);
heapy.insert(2);
heapy.insert(3);
console.log(heapy);
heapy.insert(-10);
// console.log(heapy.removeRoot());
console.log(heapy);
heapy.insert(-11);
console.log(heapy);
