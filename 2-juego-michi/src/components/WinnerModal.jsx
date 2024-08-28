import { Square } from "./Square"

export function WinnerModal({winner, resetGame}) {
    
    if(winner == null ) return null
    const winnerText = winner == false ? 'Empate': 'Ganador'

    return(
        <section className='winner'>
            <div className='text'>
              <h2>
              {winnerText}
              </h2>
              <header className='win'>
                {
                  winner && 
                            winner ? <Square>{winner}</Square> 
                                  : <div className='result'><Square>X</Square> <Square>O</Square></div>
                }
              </header>
              
              <footer>
                <button onClick={resetGame} >Reiniciar</button>
              </footer>
            </div>
          </section>
    )
}