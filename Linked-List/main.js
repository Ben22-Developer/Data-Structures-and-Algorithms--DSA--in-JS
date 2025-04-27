let headNode,tempNode,tailNode,linkedListTraversal,previousNode,currentNode,numberOfAllNodes = 0;

class Node {
    constructor (data) {
        this.data = data;
        this.nextNode = null;
    }
}

class LinkedList {
    static i;
    append (data) {
        this.newNode = new Node (data);
        if (!headNode) {
            headNode = this.newNode;
        }
        else {
            tempNode.nextNode = this.newNode;
        }
        tempNode = this.newNode;
        tailNode = this.newNode;
        numberOfAllNodes += 1;
        console.log(`Data ${tempNode.data} inserted perfectly at the end of the linked list!`);
        return `Data ${tempNode.data} inserted perfectly at the end of the linked list!`;
    }

    prepend (data) {
        this.newNode = new Node (data);
        this.newNode.nextNode = headNode;
        headNode = this.newNode;
        numberOfAllNodes += 1;
        console.log(`Data ${headNode.data} inserted perfectly at the beginning of the linked list!`);
        return `Data ${headNode.data} inserted perfectly at the beginning of the linked list!`;
    }

    insertAt (data,index) {
        if (index < 1 || index > (numberOfAllNodes + 1)) {
            console.log("Invalid index!");
            return "Invalid index!";
        }
        if (index == 1) {
            this.prepend (data);
            return `Data ${headNode.data} inserted perfectly at the beginning of the linked list!`;
        }
        if (index == numberOfAllNodes + 1) {
            this.append (data);
            return `Data ${tailNode.data} inserted perfectly at the end of the linked list!`;
        }

        this.setVariablesForSpecificIndex ();

        while (currentNode) {
            if (this.i === index) {
                this.newNode = new Node (data);
                this.newNode.nextNode = currentNode;
                previousNode.nextNode = this.newNode;
                numberOfAllNodes ++;
                console.log(`Data ${this.newNode.data} is successfully inserted at position ${index}`);
                return `Data ${this.newNode.data} is successfully inserted at position ${index}`;
            }
            this.i ++;
            previousNode = currentNode;
            currentNode = currentNode.nextNode;
        }
    }

    size () {
        console.log(`The total number of nodes in the linked list: ${numberOfAllNodes}`);
        return `The total number of nodes in the linked list: ${numberOfAllNodes}`;
    }

    head () {
        console.log(`The data in the head node of the list is ${headNode.data}`);
        return `The data in the head node of the list is ${headNode.data}`;
    }

    tail () {
        console.log(`The last node's data is ${tailNode.data}`);
        return `The last node's data is ${tailNode.data}`;
    }

    at (index) {
        if (index < 1) {
            console.log("Invalid index");
            return "Invalid index";
        }
        this.i = 1;
        linkedListTraversal = headNode;
        while (linkedListTraversal) {
            if (this.i == index) {
                console.log(`At position ${index} there is data "${linkedListTraversal.data}"`);
                return `At position ${index} there is data "${linkedListTraversal.data}"`;
            }
            this.i ++;
            linkedListTraversal =  linkedListTraversal.nextNode;
        }
        console.log(`There is no node found at position ${index}`);
        return `There is no node found at position ${index}`;
    }

    contains (data) {
        linkedListTraversal = headNode;
        while (linkedListTraversal) {
            if (linkedListTraversal.data == data) {
                console.log("true");
                return true;
            }
            linkedListTraversal = linkedListTraversal.nextNode;
        }
        console.log("false");
        return false;  
    }

    find (data) {
        linkedListTraversal = headNode;
        this.i = 1;
        while (linkedListTraversal) {
            if (linkedListTraversal.data == data) {
                console.log(`Data "${data}" is in the list at position ${this.i}`);
                return `Data "${data}" is in the list at position ${this.i}`;
            }
            this.i ++;
            linkedListTraversal = linkedListTraversal.nextNode;
        }
        console.log(`Data "${data}" is not in the list!`);
        return `Data "${data}" is not in the list!`;
    }

    unshift () {
        const theDeletedData = headNode.data;
        headNode = headNode.nextNode;
        numberOfAllNodes --;
        console.log(`Data ${theDeletedData} has successfully been deleted!`);
        return `Data ${theDeletedData} has successfully been deleted!`;
    }

    pop () {
        linkedListTraversal = headNode;
        while (linkedListTraversal) {
            if (linkedListTraversal.nextNode == tailNode) {
                const theDeletedData = tailNode.data;
                linkedListTraversal.nextNode = null;
                tailNode = linkedListTraversal;
                numberOfAllNodes --;
                console.log(`Data ${theDeletedData} has successfully been deleted!`);
                return `Data ${theDeletedData} has successfully been deleted!`;
            }
            linkedListTraversal = linkedListTraversal.nextNode;
        }
        console.log("The list is empty!");
        return "The list is empty!";
    }

    removeAt (index) {
        if (index < 1 || index > numberOfAllNodes) {
            console.log("Invalid index!");
            return "Invalid index!";
        }
        if (index == 1) {
            console.log(this.unshift ());
            return " ";
        }
        if (index == numberOfAllNodes) {
            console.log(this.pop ());
            return " ";
        }
        
        this.setVariablesForSpecificIndex();

        while (currentNode) {
            if (this.i == index) {
                const theDeletedData = currentNode.data;
                previousNode.nextNode = currentNode.nextNode;
                currentNode.nextNode = null;
                numberOfAllNodes --;
                console.log(`Data ${theDeletedData} has successfully been deleted!`);
                return `Data ${theDeletedData} has successfully been deleted!`;
            }
            this.i ++;
            previousNode = currentNode;
            currentNode = currentNode.nextNode;
        }
    }

    toString () {
        const dispayDataArray = [];
        linkedListTraversal = headNode;
        while (linkedListTraversal) {
            const aData = "( "+linkedListTraversal.data+" )"+" --> ";
            dispayDataArray.push(aData);
            linkedListTraversal = linkedListTraversal.nextNode;
        } 
        dispayDataArray.push(" null");
        const displayDataString = dispayDataArray.join(" ");
        console.log(displayDataString);
        return displayDataString;
    }

    reverseList () {
        this.firstPtr = headNode;
        this.secondPtr = this.firstPtr.nextNode;
        this.thirdPtr = this.secondPtr.nextNode;
        this.firstPtr.nextNode = null;
        tailNode = this.firstPtr;
        this.secondPtr.nextNode = this.firstPtr;
        while (this.thirdPtr) {
            this.firstPtr = this.thirdPtr;
            this.thirdPtr = this.thirdPtr.nextNode;
            this.firstPtr.nextNode = this.secondPtr;
            this.secondPtr = this.firstPtr;
        }
        headNode = this.firstPtr;
        // console.log(this.toString());
        console.log("Linked list reversed!");
        return "Linked list reversed!";
    }

    setVariablesForSpecificIndex () {
        previousNode = headNode;
        currentNode = headNode.nextNode;
        this.i = 2;
    }

}

const list = new LinkedList();
list.append("dog");
list.append("cat");
list.append("parrot");
list.append("hamster");
list.append("tiger");
list.append("turtle");
list.toString();
list.prepend("penguin");
list.prepend("lion");
list.prepend("snake");
list.size();
list.head();
list.tail();
list.at(2);
list.at(1);
list.removeAt(5);
list.unshift();
list.pop();
list.reverseList();
list.contains("parrot");
list.find("lion");
list.insertAt("eagle",3);
list.toString();
list.removeAt("4");
list.toString();
list.reverseList();
list.toString();
