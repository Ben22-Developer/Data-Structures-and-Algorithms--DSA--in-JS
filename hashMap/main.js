class Node {
    constructor (key,value) {
        this.key = key;
        this.value = value;
        this.nextCollide = null;
    }
}

class HashMap {
    
    static insertedNodes = 0;
    static hashTableSize = 16;
    static hashTable = [];

    static add (key,value) {
        const bucket = this.getBucket (key);
        const twinEntry = this.checkForTwinEntry (bucket,key,value);
        if (twinEntry) {
            return;
        }
        this.insertInHashTable (bucket,key,value);
        this.capacity ();
    }

    static getBucket (key) {
        let hashCode = 0;
        hashCode = this.generateHashCode(hashCode,key);
        return hashCode % this.hashTableSize;
    }

    static generateHashCode (hashCode,key) {
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);
        }
        return hashCode;
    }

    static checkForTwinEntry (bucket,key,value) {
        let tempPtr = this.hashTable[bucket]?.headNode ?? undefined;
        while (tempPtr) {
            if (tempPtr.key === key && tempPtr.value === value) {
                return true;
            }
            tempPtr = tempPtr.nextCollide;
        }
        return false;
    }

    static insertInHashTable (bucket,key,value) {
        const newNode = new Node (key,value);
        if (!this.hashTable [bucket]) {
            this.hashTable [bucket] = newNode;
            this.hashTable [bucket].headNode = newNode;
        }
        else {
            this.insertDetectedCollision (bucket,newNode);
        }
    }

    static insertDetectedCollision (bucket,newNode) {
        let tempPtr = this.hashTable[bucket].headNode;
        while (tempPtr.nextCollide) {
            tempPtr = tempPtr.nextCollide;
        }
        tempPtr.nextCollide = newNode;
    }

    static capacity () {
        this.insertedNodes ++;
        const loadFactor = parseFloat((this.insertedNodes/this.hashTableSize).toFixed(2));
        if (loadFactor >= 0.75) {
            this.reHashTheTable ();
        }
    }

    static hashTableTraversal () {
        for (let i = 0; i < this.hashTable.length; i++) {
            if (this.hashTable[i]) {
                let tempPtr = this.hashTable[i].headNode;
                console.log(`At index ${i} we have node(s): `);
                while (tempPtr) {
                    console.log(`Node Key: ${tempPtr.key}, Node Value: ${tempPtr.value}`);
                    tempPtr = tempPtr.nextCollide;
                }
            }
        }
    }

    static reHashTheTable () {
        const hashTableTwin = this.hashTable.slice(0);
        this.hashTable.splice(0);
        this.hashTableSize *= 2;
        this.insertedNodes = 0;
        for (let i = 0; i < hashTableTwin.length; i++) {
            if (hashTableTwin[i]) {
                let tempPtr = hashTableTwin[i].headNode;
                while (tempPtr) {
                    this.add (tempPtr.key,tempPtr.value);
                    tempPtr = tempPtr.nextCollide;
                }
            }
        }
    } 

    static getValue (key) {
        let value = [];
        const bucket = this.getBucket (key);
        if (this.hashTable[bucket]) {
            let tempPtr = this.hashTable[bucket].headNode;
            while (tempPtr) {
                if (tempPtr.key === key) {
                    value.push(tempPtr.value);
                }
                tempPtr = tempPtr.nextCollide;
            }
        }
        return value.length ? value : null;
    }

    static hasKey (key) {
        const bucket = this.getBucket (key);
        if (this.hashTable[bucket]) {
            let tempPtr = this.hashTable[bucket].headNode;
            while (tempPtr) {
                if (tempPtr.key === key) {
                    return true;
                }
                tempPtr = tempPtr.nextCollide;
            }
        }
        return false;
    }

    static removeEntry (key) {
        let removed = false;
        const bucket = this.getBucket (key);
        if (this.hashTable[bucket]) {
            let prevNode;
            let tempPtr = this.hashTable[bucket].headNode;
            while (tempPtr) {
                let deleted = false;
                if (tempPtr.key === key) {
                    deleted = true;
                    removed = true;
                    tempPtr = this.eraseANode (prevNode,tempPtr,bucket);
                    console.log(tempPtr);
                }
                if (!deleted) {
                    prevNode = tempPtr;
                    tempPtr = tempPtr.nextCollide;
                }
            }
            this.hashTableTraversal();
        }
        return removed;
    }

    static eraseANode (prevNode,currNode,bucket) {
        if (this.hashTable [bucket].headNode === currNode) {
            if (!currNode.nextCollide) {
                this.hashTable[bucket] = undefined;
                return null;
            }
            console.log(currNode.key,currNode);
            console.log(currNode.nextCollide);
            const nextHeadNode = currNode.nextCollide;
            this.hashTable[bucket].headNode = nextHeadNode;

            currNode.nextCollide = null;
            currNode = null;
            console.log(this.hashTable[bucket].headNode);
            return nextHeadNode;
        }
        else {
            prevNode.nextCollide = currNode.nextCollide;
            currNode = null;
            console.log(prevNode);
            return prevNode.nextCollide;
        }
    }

    static length () {
        return this.insertedNodes;
    }

   static clear () {
    this.hashTable.splice(0);
    this.hashTableSize = 16;
    this.insertedNodes = 0; 
   }

   static keys () {
    const keysArray = [];
    for (let i = 0; i < this.hashTable.length; i++) {
        if (this.hashTable[i]) {
            let tempPtr = this.hashTable[i].headNode;
            while (tempPtr) {
                    keysArray.push (tempPtr.key);
                    tempPtr = tempPtr.nextCollide;
                }
            }
        }
        return keysArray;
    }

    static values () {
        const valuesArray = [];
        for (let i = 0; i < this.hashTable.length; i++) {
        if (this.hashTable[i]) {
            let tempPtr = this.hashTable[i].headNode;
            while (tempPtr) {
                    valuesArray.push (tempPtr.value);
                    tempPtr = tempPtr.nextCollide;
                }
            }
        }
        return valuesArray;  
    }
    static entries () {
        const entriesArray = [];
        for (let i = 0; i < this.hashTable.length; i++) {
        if (this.hashTable[i]) {
            let tempPtr = this.hashTable[i].headNode;
            while (tempPtr) {
                    entriesArray.push ([tempPtr.key,tempPtr.value]);
                    tempPtr = tempPtr.nextCollide;
                }
            }
        }
        return entriesArray;  
    }
}



function main () {
    
    HashMap.add('apple', 'red');
    HashMap.add('apple', 'red');
    HashMap.add('banana', 'yellow');
    HashMap.add('carrot', 'orange');
    HashMap.add('dog', 'brown');
    HashMap.add('elephant', 'gray');
    HashMap.add('frog', 'green');
    HashMap.add('grape', 'purple');
    HashMap.add('hat', 'black');
    HashMap.add('ice cream', 'white');
    HashMap.add('jacket', 'blue');
    HashMap.add('kite', 'pink');
    HashMap.add('lion', 'golden');
    HashMap.add('moon', 'silver');
    HashMap.hashTableTraversal();

}

main ();