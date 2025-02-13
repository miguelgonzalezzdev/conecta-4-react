import { useState } from 'react'
import confetti from 'canvas-confetti'
import { TURNS } from './constants'
import { Square } from './components/Square' 
import { WinnerModal } from './components/WinnerModal'
import { StatsModal } from './components/StatsModal'
import { checkWinner,checkTie } from './logic/board'
import { saveGameToStorage,resetGameStorage,saveScoreToStorage } from './storage/storage'

function App() {
  const [board,setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board')
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(42).fill(null)
  }) 

  const [turn,setTurn] = useState( () => { 
    const turnFromStorage = JSON.parse(window.localStorage.getItem('turn'));
    return turnFromStorage ?? TURNS.p1
  })

  const [winner, setWinner] = useState(null)//null: no hay ganador | false: empate | true: hay ganador
  const [statsModal, setStatsModal] = useState(false)//false: modal cerrada | true: modal abierta

  const resetGame = () => {
    setBoard(Array(42).fill(null))
    setTurn(TURNS.p1)
    setWinner(null)

    resetGameStorage()
  } 

  const updateBoard = (index) => { 
    if(board[index] || winner) return //no hacer nada si ya hay algo en esa posicion o ya hay ganador

    //hacer una copia de board para no editar el board original (solo debe editarse usando setBoard)
    const newBoard = [...board]
    const move = checkMove(index) //obtener posicion de la jugada
    newBoard[move] = turn
    setBoard(newBoard)

    const newTurn = turn == TURNS.p1 ? TURNS.p2 : TURNS.p1
    setTurn(newTurn)

    saveGameToStorage({board: newBoard, turn: newTurn})

    const newWinner = checkWinner(newBoard,turn)
    if(newWinner){
      confetti()
      setWinner(turn)
      saveScoreToStorage({turn})
    }else if(checkTie(newBoard)){
      setWinner(false)
    }
  }

  //funcion para colocar la ficha en la ultima posicion posible
  const checkMove = (index) => {
    if(index>board.length-1) return index-7 //devolver la ultima posicion si se sobrepasa la longitud del tablero
    return board[index+7]==null ? checkMove(index+7) : index; //comprobar si en la casilla de abajo esta vacia para colocar la ficha ahi, en caso contrario se devuelve la ultima posicion
  }

  return (
    <main id='board' className='board'>
        <h1>Conecta 4 en <span style={{color: '#8bfff7'}}>React</span></h1>
        <section className='game'>
          {
            board.map((square, index) => {
              return(
                <Square key={index} index={index} updateBoard={updateBoard}>{square}</Square>

              )
            })
          }
        </section>
        <section className='turn'>
          <Square isSelected={turn == TURNS.p1}>
            {TURNS.p1}
          </Square>
          <Square isSelected={turn == TURNS.p2}>
            {TURNS.p2}
          </Square>
        </section>
        <section>
        <button onClick={() => {setStatsModal(true)}}>Ver estadísticas</button>
          <button onClick={resetGame}>Empezar de nuevo</button>
        </section>
        <WinnerModal winner={winner} resetGame={resetGame}/>
        <StatsModal isOpen={statsModal} closeModal={() => {setStatsModal(false)}}/>
    </main>
  )
}

export default App
