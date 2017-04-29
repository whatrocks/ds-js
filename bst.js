/*

each node has two children: left and right
left is less than parents value
right is greater than parents value


*/

var Node = function(val) {
  this.value = val;
  this.left = null;
  this.right = null;
}

var BST = function() {
  this.root = null;
}

BST.prototype.contains = function(value) {
  // We start at the beginning
  let current = this.root;

  while (current) {

    // If value is greater than current.value, move right
    if (value > current.value) {
      current = current.right;
    } else if (value < current.value) {
      current = current.left;
    } else {
      return true;
    }
  }

  return false;
}

BST.prototype.add = function(value) {
  var node = new Node(value);

  if (this.root === null) {
    this.root = node;
    return;
  }

  // Start at the root
  let current = this.root;

  // Loop until addee item or discovered it exists
  while (true) {
    if (value > current.value) {
      if (!current.right) {
        current.right = node;
        break;
      }
      current = current.right;
    } else if (value < current.value) {

      if (!current.left) {
        current.left = node;
        break;
      }
      current = current.left;
    } else {
      break;
    }

  }
}

var binary = new BST();
binary.add(5);
binary.add(10);
binary.add(8);
binary.add(1);
console.log(binary);
