class Node {
    constructor (data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BST {

    static treeRoot;
    static treeTraversal;

    static createTree (data) {

        const newNode = new Node(data);
        if (!this.treeRoot) {
            this.treeRoot = newNode;
        }
        else {
            this.treeRoot = this.nodeInsertion (this.treeRoot,newNode);
        }
    }

    static nodeInsertion (root,newNode) {
        if (!root) {
            return newNode;
        }
        if (root.data > newNode.data) {
            root.left = this.nodeInsertion (root.left,newNode);
        }
        else {
            root.right = this.nodeInsertion (root.right,newNode);
        }
        return root;
    }

    static BFSTraversal () {
        console.log ("BFS Traversal");
        console.log ("---------------");
        this.bfs (this.treeRoot);
    }

    static bfs (root) {
        const queue = [];
        queue.push (root);
        while (queue.length) {
            if (queue[0].left) {
                queue.push (queue[0].left);
            }
            if (queue[0].right) {
                queue.push (queue[0].right);
            }
            console.log(queue[0].data);
            queue.shift();
        }
    }

    static inOrderTraversal () {
        console.log ("In Order Traversal");
        console.log ("--------------------");
        this.in_order (this.treeRoot);
    }

    static in_order (root) {
        if (!root) {
            return;
        }
        this.in_order (root.left);
        console.log (root.data);
        this.in_order (root.right);
    }
}

function main () {
    const data = [200,170,218,150,100,190,240,300,280,250,180,230,250];
    for (let i = 0; i < data.length; i++) {
        BST.createTree (data[i]);
    }
    BST.inOrderTraversal();
    BST.BFSTraversal();
}

main();