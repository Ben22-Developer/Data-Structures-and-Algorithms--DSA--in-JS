// https://leetcode.com/problems/two-sum/description/?source=submission-noac


class Node {
    constructor (key,value) {
        this.key = key;
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

function collissionInsert (root,key,value) {
    if (!root) {
        return new Node (key,value);
    }

    if (root.value < value) {
        root.right = collissionInsert (root.right,key,value);
    }
    else if (root.value > value) {
        root.left = collissionInsert (root.left,key,value);
    }
    return root;
}

function valueInsert (hashTable,key,index) {
    if (hashTable.length) {
        if (hashTable[key]) {
            hashTable[key].headNode = collissionInsert (hashTable[key],key,index);
            return;
        }
    }
    hashTable[key] = new Node (key,index);
    hashTable[key].headNode = hashTable[key];
}

function hashSearch (hashTable,key,currIndex) {
    if (hashTable[key]?.left || hashTable[key]?.right) {
        let tempPtr = hashTable[key];
        while (tempPtr) {
            if (tempPtr.value == currIndex) {
                tempPtr = tempPtr.right;
            }
            else {
                return tempPtr.value;
            }
        }
        return Infinity;
    }
    if (hashTable[key]?.value === currIndex) {
        return Infinity;
    }
    return hashTable[key]?.value ?? Infinity;
}

var twoSum = function(nums, target) {
    const hashTable = [];
    for (let i = 0; i < nums.length; i++) {
        const key = nums[i];
        valueInsert (hashTable,nums[i],i);
    }
    for (let i = 0; i < nums.length; i++) {
        const num2Index = hashSearch (hashTable,target - nums[i],hashTable[nums[i]].value);
        if (num2Index != Infinity) {
            return [i,num2Index];
        }
    }
    return [];
};

const nums = [3,2,4];
const target = 6;
console.log(twoSum(nums,target));