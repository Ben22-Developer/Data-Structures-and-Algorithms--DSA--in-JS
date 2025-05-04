class Node {
    constructor (data) {
        this.data = data;
        this.parent = null;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    static duplicateRemoval (array) {
        const nonDuplicate = [];
        const set = new Set (array);
        let i = 0;
        set.forEach (elt => {
            nonDuplicate[i] = elt;
            i++
        });
        return nonDuplicate;
    }

    static sort (array,start,end) {
        if (start < end) {
            const location = this.quickSortBackBone (array,start,end);
            this.sort (array, start, location - 1);
            this.sort (array, location + 1, end);
        }
    }

    static quickSortBackBone (array,start,end) {
        const pivot = array [start];
        const pivotIndex = start;
        let temp;
        while (start < end) {
            while (pivot >= array[start] && start <= end) {
                start ++;
            }
            while (pivot < array[end] && end >= 0) {
                end --;
            }
            if (start < end) {
                temp = array[start];
                array[start] = array[end];
                array[end] = temp;
            }
        }
        if (pivotIndex != start) {
            temp = array[end];
            array[end] = array[pivotIndex];
            array[pivotIndex] = temp;
        }
        return end;
    }

    static fromScrathTreeInsertion (array,start,end,root) {
        if (start <= end) {
            const mid = Math.floor((start + end)/2);
            root = new Node (array[mid]);
            root.left = this.fromScrathTreeInsertion (array, start, mid - 1, root.left);
            root.right = this.fromScrathTreeInsertion (array, mid + 1, end, root.right);
            
            if (root.left) {
                root.left.parent = root;
            }
            if (root.right) {
                root.right.parent = root;
            }
            return root;
        }
        else {
            return null;
        }
    }

    static buildTree (array,root) {
        array = this.duplicateRemoval (array);
        this.sort (array,0,array.length - 1);
        root = this.fromScrathTreeInsertion (array,0,array.length - 1,root);
        return root;
    }

    static insert (data,root) {
        if (!root) {
            return new Node (data);
        }
        if (root.data > data) {
            root.left = this.insert (data,root.left);
            root.left.parent = root;
        }
        else if (root.data < data) {
            root.right = this.insert (data,root.right);
            root.right.parent = root;
        }
        return root;
    }
    
    static prettyPrint (node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }

    static removeRoot (data,root) {
        let rootRight = root.right;
        let prevRootRight = root;
        while (rootRight.left) {
            prevRootRight = rootRight;
            rootRight = rootRight.left;
        }

        if (prevRootRight == root) {
            root.right = rootRight.right;
        }
        else {
            prevRootRight.left = rootRight.right;
        }
        root.data = rootRight.data;
        return root;
    }

    static removeData (data,root) {
        if (!root.left && !root.right) {
            return null;
        }
        else if (!root.left && root.right) {
            return root.right;
        }
        else if (root.left && !root.right) {
            return root.left;
        }
        else {
            return this.removeRoot (data,root);
        }
    }
    
    static delete (data,root) {
        if (!root) {
            return null;
        }
        if (root.data > data) {
            root.left = this.delete (data,root.left);
        }
        else if (root.data < data) {
            root.right = this.delete (data,root.right);
        }
        else {
            root = this.removeData (data,root);
        }
        return root;
    }

    static find (data,root) {
        let findValuePtr,prevValuePtr;
        findValuePtr = root;
        
        while (findValuePtr) {
            prevValuePtr = findValuePtr.data;
            if (findValuePtr.data > data) {
                findValuePtr = findValuePtr.left;
            }
            else if (findValuePtr.data < data) {
                findValuePtr = findValuePtr.right;
            }
            else {
                return findValuePtr.data;
            }
        }
        return prevValuePtr;
    }

    static levelOrder (root) {
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

    static inOrder (root) {
        if (!root) {
            return;
        }
        this.inOrder (root.left);
        console.log(root);
        this.inOrder (root.right);
    }

    static getNode (data,root) {
        while (root) {
            if (root.data > data) {
                root = root.left;
            }
            else if (root.data < data) {
                root = root.right;
            }
            else {
                return root;
            }
        }
        return null;
    }

    static getHeight (root) {
        if (!root) {
            return -1;
        }
        let leftHeight,rightHeight;
        leftHeight = this.getHeight (root.left);
        rightHeight = this.getHeight (root.right);
        return rightHeight > leftHeight ? rightHeight += 1 : leftHeight += 1;
    }

    static height (data,root) {
        const theNode = this.getNode (data,root);
        if (theNode) {
            return this.getHeight (theNode);
        }
        return null;
    }

    static depth (data,root) {
        let i = 0;
        while (root) {
            if (root.data > data) {
                i ++;
                root = root.left;
            }
            else if (root.data < data) {
                i++;
                root = root.right;
            }
            else {
                return i;
            }
        }
        return null;
    }

    static preOrderToReBalance (array,root) {
        if (!root) {
            return;
        }
        array.push (root.data);
        this.preOrderToReBalance (array,root.left);
        this.preOrderToReBalance (array,root.right);
    }

    static checkIfTreeIsBalanced (leftHeight,rightHeight) {
        const balance = Math.abs(leftHeight - rightHeight);
        const msg1 = "Tree is balanced";
        const msg2 = "Tree is not balanced";
        if (balance >= 2) {
            console.log(msg2);
        }
        else {
            console.log(msg1);
        }
    }

    static isBalanced (root,reBal = false) {
        if (reBal) {
            const array = [];
            this.preOrderToReBalance (array,root);
            root = null;
            console.log(root);
            root = this.buildTree (array,root);
            return root;
        }

        if (!root) {
            return -1;
        }
        let leftHeight,rightHeight;
        leftHeight = this.isBalanced (root.left,reBal);
        rightHeight = this.isBalanced (root.right,reBal);
        
        if (!reBal && !root.parent) {
            this.checkIfTreeIsBalanced (leftHeight,rightHeight);
        }

        if (leftHeight > rightHeight) {
            leftHeight += 1;
        }
        else {
            rightHeight += 1;
        }
        return leftHeight > rightHeight ? leftHeight : rightHeight;
    }
}

function generateRandomNumbers (array,maxElts,bigValue) {
    array = [];
    for (let i = 0; i < maxElts; i++) {
        array.push (Math.floor(Math.random() * bigValue));
    }

    // array = [13,24,25,32,81,36,42,35,90,93];

    return array;
}

function checkIfTreeIsBalanced (root) {
    Tree.isBalanced(root);
}

function consoleSpace () {
    console.log('');
    console.log('');
    console.log('');
}

let root;
function main () {
    let maxElts;
    let array = [];
    maxElts = 20;
    
    array = generateRandomNumbers (array,maxElts,100);
    root = Tree.buildTree(array,root);
    
    Tree.prettyPrint(root);
        Tree.inOrder(root);
    checkIfTreeIsBalanced(root);


    consoleSpace();
    
    
    array = generateRandomNumbers (array,maxElts,1000);
    
    for (let i = 0; i < maxElts; i++) {
        Tree.insert (array[i],root);
    }

    console.log("After random addition of numbers");
    Tree.inOrder(root);
    
    Tree.prettyPrint(root);
    checkIfTreeIsBalanced (root);
    consoleSpace();
    
    root = Tree.isBalanced(root,true);
    Tree.prettyPrint(root);
    checkIfTreeIsBalanced (root);
}

main ();

















// let isItBalanced;
// root = Tree.buildTree ([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324],root);
// root = Tree.buildTree ([12,3,7,8,9,11,8,48,45,40,50,70,13,14,15,30,20],root);
// Tree.insert(12,root);
// Tree.insert(12,root);
// Tree.insert(11,root);
// Tree.insert(12,root);
// Tree.insert(12,root);
// Tree.insert(4.5,root);
// Tree.insert(2000,root);
// Tree.insert(10000,root);
// Tree.prettyPrint(root);
// root = Tree.delete(12,root);
// root = Tree.delete(12,root);
// root = Tree.delete(11,root);
// root = Tree.delete(12,root);
// root = Tree.delete(12,root);
// root = Tree.delete(4.5,root);
// root = Tree.delete(2000,root);
// root = Tree.delete(10000,root);
// console.log('');
// console.log('');
// console.log('');
// Tree.prettyPrint(root);
// console.log("Level Order Traversal");
// Tree.levelOrder(root);
// console.log('');
// console.log('');
// console.log('');
// console.log("In Order Traversal");
// Tree.inOrder(root);
// console.log('');
// console.log('');
// console.log('');
// Tree.prettyPrint(root);
// console.log('');
// console.log('');
// console.log('');
// Tree.insert (100,root);
// Tree.insert (90,root);
// Tree.insert (80,root);
// Tree.insert (85,root);
// Tree.insert (87,root);
// console.log('');
// console.log('');
// console.log('');
// Tree.prettyPrint(root);

// isItBalanced = Tree.isBalanced(root);

// if (isItBalanced <= 1) {
//     console.log('Tree is balanced');
// }
// else {
//     console.log('Tree is unbalanced');
// }

// console.log('');
// console.log('');
// console.log('');
// Tree.prettyPrint(root);