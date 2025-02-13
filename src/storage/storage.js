import { TURNS } from '../constants'

export const saveGameToStorage = ({board, turn}) => {
    window.localStorage.setItem('board', JSON.stringify(board))
    window.localStorage.setItem('turn', JSON.stringify(turn))
}

export const resetGameStorage = () => {
    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
}

export const saveScoreToStorage = ({turn}) => {
    let totalGames = window.localStorage.getItem('totalGames') ? parseInt(window.localStorage.getItem('totalGames'))+1 : 1
    window.localStorage.setItem('totalGames', totalGames)

    if(turn==TURNS.p1){
        let winsP1 = window.localStorage.getItem('winsP1') ? parseInt(window.localStorage.getItem('winsP1'))+1 : 1
        window.localStorage.setItem('winsP1', winsP1)
    }else if(turn==TURNS.p2){
        let winsP2 = window.localStorage.getItem('winsP2') ? parseInt(window.localStorage.getItem('winsP2'))+1 : 1
        window.localStorage.setItem('winsP2', winsP2)
    }
}

export const resetScoreStorage = () => {
    window.localStorage.removeItem('totalGames')
    window.localStorage.removeItem('winsP1')
    window.localStorage.removeItem('winsP2')
}
