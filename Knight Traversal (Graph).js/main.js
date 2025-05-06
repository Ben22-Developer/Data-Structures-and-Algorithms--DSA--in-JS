import { knightMoves } from "./graphTraversal.js"

function main () {
    knightMoves ([0,0],[7,7]);
    knightMoves ([3,3],[4,3]);
    knightMoves ([4,3],[3,3]);
    knightMoves ([0,0],[3,3]);
    knightMoves ([3,3],[0,0]);
    knightMoves ([0,0],[0,0]);
    knightMoves ([0,7],[0,0]);
    knightMoves ([0,0],[0,7]);
    knightMoves ([0,0],[1,2]);
}

main ();