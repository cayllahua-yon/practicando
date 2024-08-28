 import { WINNER_COMBOS } from "../constants"
 
 export const checkWinner = (checkBoard) => {
    for (const combo of WINNER_COMBOS) {
      const [a,b,c] = combo
      if (checkBoard[a] && (checkBoard[a] == checkBoard[b]) && (checkBoard[a] == checkBoard[c]) ) {
        return checkBoard[a]
      }
    }
    return null
  }

  export const checkEndGame = (verifyBoard) => {
    return verifyBoard.every((square) => square != null)
  }