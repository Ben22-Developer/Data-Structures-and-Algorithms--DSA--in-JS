// receive the: startingPoint, endingPoint, unsortedArray
// base : if startingPoint < endingPoint
// calculate the midPoint ==> (endingPoint - startingPoint) / 2
// make a left subArray and pass it recursively 
    // recursive invoke by startingPoint, midPoint, unsortedArray
    // recursive invoke by midPoint + 1, endingPoint, unsortedArray
    // invoke merge by startingPoint, midPoint, endingPoint, unsortedArray
// In mergeFn
// subArray 1 is starting from the startingPoint and go till the midPoint
// subArray 2 is starting from the (midPoint + 1) and go till the endPoint
    //---> u'll be initializing iterator variables to do stand for these subArrays
// as u perfom the comparison u'll be having another array where you add up the sorted list
// spice from the endingpoint + 1, then add up the by spreading the newely formed array

function merge (startingPoint, midPoint, endingPoint, unsortedArray) {

    let i = startingPoint; 
    let j = midPoint + 1;
    const sortedSubArray = [];

    while (i <= midPoint && j <= endingPoint) {
        if (unsortedArray[i] < unsortedArray[j]) {
            sortedSubArray.push(unsortedArray[i]);
            i ++;
        }
        else {
            sortedSubArray.push(unsortedArray[j]);
            j ++; 
        }
    }

    for (i; i <= midPoint; i++) {
        sortedSubArray.push(unsortedArray[i]);
    }
    for (j; j <= endingPoint; j++) {
        sortedSubArray.push(unsortedArray[j]);
    }
    j = 0;
    for (i = startingPoint; i <= endingPoint; i++) {
        unsortedArray[i] = sortedSubArray[j];
        j ++;
    }
}

function mergeSort (startingPoint,endingPoint,unsortedArray) {
    if (startingPoint < endingPoint) {
        const midPoint = Math.floor((startingPoint + endingPoint)/2);
        mergeSort (startingPoint ,midPoint , unsortedArray);
        mergeSort (midPoint + 1, endingPoint, unsortedArray);
        merge (startingPoint, midPoint, endingPoint, unsortedArray);
    }
}

let arrayToBeSorted = [3, 2, 1, 13, 8, 5, 0, 1];
mergeSort (0,arrayToBeSorted.length - 1, arrayToBeSorted);
console.log(arrayToBeSorted);
arrayToBeSorted = [105, 79, 100, 110];
mergeSort (0,arrayToBeSorted.length - 1, arrayToBeSorted);
console.log(arrayToBeSorted);