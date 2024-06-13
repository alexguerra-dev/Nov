import { useState } from 'react'

function Game({ players }) {
    const [playerList, setPlayerList] = useState(players)
    const [currentRoll, setCurrentRoll] = useState([])
    const [currentScore, setCurrentScore] = useState(0)

    const handleRollDice = () => {
        const dice = rollDice()
        const score = calculateScore(dice)
        if (score === 0) {
            // No score turn is over
            endTurn()
        } else {
            setCurrentRoll(dice)
            setCurrentScore((prev) => prev + score)
        }
    }

    const endTurn = () => {
        setPlayerList((players) =>
            players.map((player, index) => {
                if (player.isActive) {
                    return {
                        ...player,
                        score: player.score + currentScore,
                        isActive: false,
                    }
                } else {
                    return {
                        ...player,
                        isActive:
                            index ===
                            (players.findIndex((p) => p.isActive) + 1) %
                                players.length,
                    }
                }
            }),
        )
        setCurrentRoll([])
        setCurrentScore(0)
    }

    return (
        <div className="game">
            <div className="players">
                {playerList.map((player, index) => (
                    <div
                        key={index}
                        className={`player ${player.isActive ? 'active' : ''}`}
                    >
                        <h2>{player.name}</h2>
                        <img
                            src={player.image}
                            alt={`${player.name}`}
                            className="w-12 h-12 rounded-full"
                        />
                        <p>Score: {player.score}</p>
                    </div>
                ))}
            </div>
            <div className="actions">
                {currentRoll.length > 0 && (
                    <div className="dice">
                        {currentRoll.map((die, index) => (
                            <span key={index} className="die">
                                {die}
                            </span>
                        ))}
                    </div>
                )}
                <button
                    onClick={handleRollDice}
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Roll Dice
                </button>
                <button
                    onClick={endTurn}
                    className="bg-red-500 text-white p-2 rounded"
                >
                    End Turn
                </button>
            </div>
        </div>
    )
}

export default Game
