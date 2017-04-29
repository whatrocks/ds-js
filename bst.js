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
//
// var binary = new BST();
// binary.add(5);
// binary.add(10);
// binary.add(8);
// binary.add(1);
// console.log(binary);

class BSTES6 {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  insert(val) {
    var newBST = new BSTES6(val);

    function findPosition(node) {
      if (newBST.value < node.value) {
        if (node.left === null) {
          node.left = newBST;
        } else {
          findPosition(node.left);
        }
      } else {
        if (node.right === null) {
          node.right = newBST;
        } else {
          findPosition(node.right);
        }
      }
    }
    findPosition(this);
  }

  contains(val) {
    var found = false;
    function search(node) {
      if (!node) {
        return;
      }
      if (node.value === val) {
        found = true;
        return;
      } else {
        if (node.value > val) {
          search(node.left);
        } else {
          search(node.right);
        }
      }
    }
    search(this);
    return found;
  }

  breadthFirstLog(cb) {

    function iterate(nodeArray) {
      for (var i = 0; i < nodeArray.length; i++) {
        cb(nodeArray[i].value);
      }
      var nextLayer = [];
      for (var i = 0; i < nodeArray.length; i++) {
        if (nodeArray[i].left) {
          nextLayer.push(nodeArray[i].left);
        }
        if (nodeArray[i].right) {
          nextLayer.push(nodeArray[i].right);
        }
      }
      if (nextLayer.length) {
        iterate(nextLayer);
      }
    }
    iterate([this])
  }
}

let myBST = new BSTES6(5);
myBST.insert(23);
myBST.insert(3);
myBST.insert(8);
myBST.insert(-4);
console.log(myBST);
myBST.breadthFirstLog(function(node) {
  console.log("I am: ", node);
});
