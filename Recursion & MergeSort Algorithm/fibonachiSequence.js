//must be having the initial [0] element in the array
//if the arrLen is greater than 1 then first push 1
//get the length of the array currently which will be 2
//iterate while array.length <= arrLen 
//each added elt will be the sum of array[array.length - 2] + array [array.length - 1]

// fibonachiSequence.js

function fibsIteratorFn (arrLen) {
    if (arrLen <= 0) {
        return [];
    }
    const fiboArr = [0];
    if (arrLen > 1) {
        fiboArr.push(1);
        while (fiboArr.length < arrLen) {
            fiboArr.push (fiboArr[fiboArr.length - 1] + fiboArr[fiboArr.length - 2]);
        }
    }
    return fiboArr;
}

const fibonachiArray = fibsIteratorFn(8);
console.log('From iterator function: ',fibonachiArray);


// get arrLen 
// check if the arrLen is less or equal to 0
//     if so do return []
// check if the arrLen is greater than 1
//     if not return the initial array [0]
//     else
// push 1 to the array
// call another function which will recurse, by passing the array and arrLen
// the function checks if the array.length < arrLen
//     if so it pushes a new element array.push(array[array.length - 1] + array[array.length - 2])
// then it again call itself, by passing expected argument

function makeRecursionToFitUserInput (fiboArray,arrLen) {
    if (fiboArray.length < arrLen) {
        fiboArray.push(fiboArray[fiboArray.length - 1] + fiboArray[fiboArray.length - 2]);
        makeRecursionToFitUserInput(fiboArray,arrLen);
    }
    return fiboArray;
}

function receiveUserArgument (arrLen) {
    if (arrLen <= 0) {
        return [];
    }
    let fiboArray  = [0];
    if (arrLen > 1) {
        fiboArray.push(1);
        fiboArray = makeRecursionToFitUserInput (fiboArray,arrLen);
    }
    return fiboArray;
}

const fiboRecursionArr = receiveUserArgument(2);
console.log('From recursive function: ',fiboRecursionArr);