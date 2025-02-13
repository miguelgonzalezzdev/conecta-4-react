import { resetScoreStorage } from '../storage/storage.js'

export function StatsModal ({isOpen,closeModal}) {
    if(!isOpen) return null

    let totalGames = window.localStorage.getItem('totalGames') ? window.localStorage.getItem('totalGames') : 0
    let winsP1 = window.localStorage.getItem('winsP1') ? window.localStorage.getItem('winsP1') : 0
    let winsP2 = window.localStorage.getItem('winsP2') ? window.localStorage.getItem('winsP2') : 0

    const handleClick = () => {
        closeModal()
        resetScoreStorage()
    }

    return (
        <section className='modal'>
            <div className='modalText'>
                <h2>Estadísticas de la partida</h2>
                <p>Total de partidas: {totalGames}</p>
                <p>Victorias 🔴: {winsP1}</p>
                <p>Victorias 🟡: {winsP2}</p>
                <footer className="modalFooter">
                    <button onClick={closeModal}>Cerrar estadísticas</button>
                    <button onClick={handleClick}>Borrar historial</button>
                </footer>
            </div>
        </section>
    )
}