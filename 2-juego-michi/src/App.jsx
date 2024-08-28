import { useState } from 'react'
import './App.css'
import { TURNS } from './constants'
import { Square } from './components/Square'
import { WinnerModal } from './components/WinnerModal'
import { checkWinner, checkEndGame } from './logic/board'


//Componente Square

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  const [turn, setTurno] = useState(TURNS.X)
  const [winner, setWinner] = useState(null) // null hay ganador / false empate

 //checkWinner(checkBoard) 
 // checkEndGame(verifyBoard)

  const resetGame = () => {
    setBoard(Array(9).fill(null))
    setTurno(TURNS.X)
    setWinner(null)
  }



  const updateBoard = (index) => {
    if (board[index] || winner) return

    const newBoard = [...board];
    newBoard[index] = turn  // -> x / o
    setBoard(newBoard)

    const newTurn = turn == TURNS.X ? TURNS.O : TURNS.X
    setTurno(newTurn)

    const newWinner = checkWinner(newBoard) 
    console.log(newWinner)

    if (newWinner) {
      setWinner(newWinner) // indica quien GANO -> X u O
      console.log(newWinner)
    } else if (checkEndGame(newBoard)) {
        setWinner(false)
      console.log(checkEndGame(newBoard))
    }

  }

  return (
    <main className='board'>
      <h1>Juego Michi</h1>
      <section className='game'>
        {
          board.map((element, index) => {
            return (
              <Square key={index} index={index} updateBoard={updateBoard}>
                {board[index]}
              </Square>
            )
          } )
        }
      </section>

      <section className='turn'>
        <Square isSelected={turn == TURNS.X}> {TURNS.X}</Square>
        <Square isSelected={turn == TURNS.O}>{TURNS.O}</Square>       
      </section>
      
      <WinnerModal winner={winner} resetGame={resetGame} />
     

    </main>
  )
}

export default App
