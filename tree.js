class Node {
  constructor(value) {
    this.value = value;
    this.children = [];
  }
}

class Tree {

  constructor() {
    this.root = null;
  }

  traverse(cb) {
    // define a walk function that we can call
    // recursively on every node in the Tree
    function walk(node) {
      // First call the callback on the node
      cb(node);
      // The recursively walk on all children
      node.children.forEach(walk);
    }

    // Now kick it off
    walk(this.root);
  }

  // Add some nodes;
  add(value, parentValue) {
    let newNode = new Node(value);

    // If there is no root, then set it to our newbie
    if (!this.root) {
      this.root = newNode;
      return;
    }

    // Otherwise traverse the tree and find a node with
    // matching parent value and add new node to its kids
    this.traverse(node => {
      if (node.value === parentValue) {
        node.children.push(newNode);
      }
    })

  }
}

var treebeard = new Tree();
treebeard.add("Bilbo");
treebeard.add("Frodo", "Bilbo");
console.log(treebeard);
treebeard.add("Sam", "Frodo");
treebeard.add("Gandalf", "Bilbo");
treebeard.traverse((node) => console.log("I am: ", node.value));
