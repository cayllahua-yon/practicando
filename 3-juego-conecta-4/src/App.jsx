import { useState } from "react";
import "./App.css";

// const TURNS = {X:'X', O: 'O'}
const ROWS = 6;
const COLS = 7;

 const saveGameStorage = ({newGameState,newAvailableRows,newCurrentPlayer}) => {
  
  window.localStorage.setItem('gameState', JSON.stringify(newGameState))
  window.localStorage.setItem('currentPlayer', JSON.stringify(newCurrentPlayer))  
  window.localStorage.setItem('availableRows', JSON.stringify(newAvailableRows))
}


 const resetGameStorage = () => {
  window.localStorage.removeItem('gameState');
  window.localStorage.removeItem('currentPlayer');
  window.localStorage.removeItem('availableRows');
}

const Square = ({ children, isSelected, cell, handleCellClick, indexCol }) => {
  const claseNameCell = `cell ${cell}`;

  const handleClick = () => {
    handleCellClick(indexCol);
  };

  return (
    <div onClick={handleClick} className={claseNameCell}>
      {children}
    </div>
  );
};

const Winner = ({status, currentPlayer , resetGame }) => {

  if (status == "") return "" 
  const textResult = status && <Square cell={currentPlayer}></Square>
  const handleClickReset = () => {
    resetGame()
  }

  return (
    <section className="winner">
          <div className="text">
            <h2>{status}</h2>
            <header className="win">
              {textResult}
            </header>

            <footer>
                 <button className="resetGame" onClick={handleClickReset}>Empezar de nuevo</button>
            </footer>
          </div>
    </section>
  )
}

function App() {
  const [gameState, setGameState] = useState( () => {
    const gameStateFromStorage = window.localStorage.getItem('gameState');
    
    return gameStateFromStorage ? JSON.parse(gameStateFromStorage) :  Array.from({ length: ROWS }, () => Array(COLS).fill(""))
  })
  console.log(gameState)

  const [currentPlayer, setCurrentPlayer] = useState(() =>{
   const  currentPlayerFromStorage = window.localStorage.getItem('currentPlayer')
   return currentPlayerFromStorage ? JSON.parse(currentPlayerFromStorage) : "R"
  })

  console.log(currentPlayer)

  const [availableRows, setAvailableRows] = useState( () => {
    const  availableRowsFromStorage = window.localStorage.getItem('availableRows')

    return availableRowsFromStorage ? 
      JSON.parse(availableRowsFromStorage)
      :  Array(COLS).fill(ROWS - 1) 
  } )

  console.log(availableRows)

  const [gameActive, setGameActive] = useState(true);
  const [status, setStatus] = useState("");

  const resetGame = () => {
    setGameState( Array.from({ length: ROWS }, () => Array(COLS).fill("")) )
    setCurrentPlayer("R")
    setAvailableRows(Array(COLS).fill(ROWS - 1))
    setGameActive(true)
    setStatus("")

    resetGameStorage()
  };

  const handleCellClick = (col) => {
    if (!gameActive || availableRows[col] < 0) return;

    const row = availableRows[col];
    const newGameState = gameState.map((arr) => arr.slice()); // Copia profunda de gameState [...gameState]
    newGameState[row][col] = currentPlayer;
    setGameState(newGameState);

    const newAvailableRows = [...availableRows];
    newAvailableRows[col]--;
    
    // setAvailableRows(newAvailableRows, newGameState);
    setAvailableRows(newAvailableRows);

    const newCurrentPlayer = currentPlayer ===  "R" ? "Y" : "R"
  
    saveGameStorage({newGameState, newAvailableRows, newCurrentPlayer })

    if (checkWinner(newGameState, row, col)) {
      setStatus(`¡Jugador ${currentPlayer == "R" ? "Rojo" : "Amarillo"} gana!`);
      setGameActive(false);
    } else if (newAvailableRows.every((r) => r < 0)) {
      setStatus("¡Es un empate!");
      setGameActive(false);
    } else {
      // const newCurrentPlayer = currentPlayer ===  "R" ? "Y" : "R"
      setCurrentPlayer(newCurrentPlayer);
    }
  };

  const checkWinner = (state, row, col) => {
    return [
      [1, 0],
      [0, 1],
      [1, 1],
      [1, -1],
    ].some(
      ([rowDir, colDir]) =>
        countInDirection(state, row, col, rowDir, colDir) +
          countInDirection(state, row, col, -rowDir, -colDir) -
          1 >=
        4
    );
  };

  const countInDirection = (state, row, col, rowDir, colDir) => {
    let r = row,
      c = col,
      count = 0;
    while (
      r >= 0 &&
      r < ROWS &&
      c >= 0 &&
      c < COLS &&
      state[r][c] === currentPlayer
    ) {
      count++;
      r += rowDir;
      c += colDir;
    }
    return count;
  };

  return (
    <div className="App">
        <h1>Juego 4 en raya</h1>
        <button className="resetGame" onClick={resetGame}>Empezar de nuevo</button>

      <div className="board">
        {gameState.map((rowArray, row) =>
          rowArray.map((cell, col) => (
            <Square
              key={`${row}-${col}`}
              cell={cell}
              handleCellClick={handleCellClick}
              indexCol={col}
            ></Square>
          ))
        )}
      </div>

      <section className="turn-game">
        <h2>Turno</h2>
        <Square cell={currentPlayer}> </Square>
      </section>

        <Winner status={status} resetGame={resetGame} currentPlayer={currentPlayer}>
        </Winner>

      
    </div>
  );
}

export default App;
