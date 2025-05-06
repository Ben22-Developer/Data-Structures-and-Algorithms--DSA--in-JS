function knightMoves (start,end) {
    const inputNotArray = "Only the arrays are needed here";
    const exceedBoundaries = "The board is in range 0 - 7 in both x and y for both the of the arrays";
    const invalidArrayLength = "They must be only 2 elements in each of the array";

    if (!Array.isArray(start) || !Array.isArray(end)) {
        return inputNotArray;
    }
    
    if (start.find((element) => element > 7) || end.find((element) => element > 7)) {
        return exceedBoundaries;
    }

    if (start.length > 2 || start.length < 2 || end.length < 2 || end.length > 2) {
        return invalidArrayLength;
    }

const possibleMoves = [ [2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2] ];
    
    
    const occupiedCells = [];
    const BFSQueue = [];
    BFSQueue.push (start);

    let endHash,startHash,hashString;
    let hashCode = 0;

    hashString = end.join("");
    for (let k = 0; k < hashString.length; k++) {
        hashCode = (hashCode * 31) + hashString[k].charCodeAt();
    }
    endHash = hashCode % 200;

    hashCode = 0;
    hashString = start.join("");

    for (let k = 0; k < hashString.length; k++) {
        hashCode = (hashCode * 31) + hashString[k].charCodeAt();
    }

    startHash = hashCode % 200;
    occupiedCells[startHash] = start;
    
    while (true) {

        let loopEnd = false;
        let i = 0;
        while (i < possibleMoves.length) {
            const aMove = [];
            aMove[0] = possibleMoves[i][0] + BFSQueue[0][0];
            aMove[1] = possibleMoves[i][1] + BFSQueue[0][1];
            
            if(aMove[0] < 0 || aMove[0] > 7 || aMove[1] < 0 || aMove[1] > 7) {
                i ++;
                continue;
            }
            
            hashString = aMove.join("");
            hashCode = 0;

            for (let k = 0; k < hashString.length; k++) {
                hashCode = (hashCode * 31) + hashString[k].charCodeAt();
            }
            hashCode = hashCode % 200;

            if (!occupiedCells[hashCode]) {
                occupiedCells[hashCode] = BFSQueue[0];
                BFSQueue.push (aMove);
            }

            if (hashCode == endHash) {
                loopEnd = true;
                break;
            }
            i ++;
        }

        if (loopEnd) {
            break;
        }

        BFSQueue.shift();
    }

    const theKnightWay = [];
    theKnightWay.push (end);

    while (true) {
        theKnightWay.unshift (occupiedCells[hashCode]);
        hashString = theKnightWay[0].join("");
        hashCode = 0;

        for (let k = 0; k < hashString.length; k++) {
            hashCode = (hashCode * 31) + hashString[k].charCodeAt();
        }
        hashCode = hashCode % 200;
        if (hashCode == startHash) {
            break;
        }
    }

    console.log (`The knight takes ${theKnightWay.length - 1} moves to go from ${start} to ${end}`);
    theKnightWay.forEach((move) => {
        console.log(move);
    })

}

export {knightMoves};