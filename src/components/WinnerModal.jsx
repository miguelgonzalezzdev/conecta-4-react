import { Square } from "./Square"

export function WinnerModal ({winner,resetGame}) {
    if(winner==null) return null

    const winnerTest = winner == false ? 'Empate' : 'Ganó:'

    return (
        winner != null && (
            <section className='modal'>
            <div className='modalText'>
                <h2>{ winnerTest}</h2>
                <header className='win'>
                    {winner && <Square>{winner}</Square>} 
                </header>
                <footer>
                <button onClick={resetGame}>Empezar de nuevo</button>
                </footer>
            </div>
            </section>
        )
    )
}