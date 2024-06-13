import { useState } from 'react'
import { rollDice as roll, calculateScore } from '../utils/scoring'

function Game({ players }) {
    const [playerList, setPlayerList] = useState(
        players.map((player) => ({
            ...player,
            isActive: player === players[0],
        })),
    )
    const [currentRoll, setCurrentRoll] = useState([])
    const [canRoll, setCanRoll] = useState([true, true, true, true, true])
    const [currentScore, setCurrentScore] = useState(0)

    const rollDice = () => {
        const dice = roll().map((die, index) =>
            canRoll[index] ? die : currentRoll[index],
        )
        const score = calculateScore(dice)
        if (score === 0) {
            endTurn()
        } else {
            setCurrentRoll(dice)
            setCurrentScore((prev) => prev + score)
            setCanRoll(dice.map(() => true)) // Reset all dice to be rollable for simplicity
        }
    }

    const endTurn = () => {
        setPlayerList((playerList) =>
            playerList.map((player, index) => {
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
                            (playerList.findIndex((p) => p.isActive) + 1) %
                                playerList.length,
                    }
                }
            }),
        )
        setCurrentRoll([])
        setCurrentScore(0)
        setCanRoll([true, true, true, true, true])
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
                    <div className="dice flex space-x-2 mt-4">
                        {currentRoll.map((die, index) => (
                            <img
                                key={index}
                                src={`images/dice/${
                                    canRoll[index] ? 'red' : 'white'
                                }-dice${die}.png`}
                                alt={`Dice ${die}`}
                                className="w-12 h-12"
                            />
                        ))}
                    </div>
                )}
                <button
                    onClick={rollDice}
                    className="bg-blue-500 text-white p-2 rounded mt-4"
                >
                    Roll Dice
                </button>
                <button
                    onClick={endTurn}
                    className="bg-red-500 text-white p-2 rounded mt-4 ml-4"
                >
                    End Turn
                </button>
            </div>
        </div>
    )
}

export default Game
