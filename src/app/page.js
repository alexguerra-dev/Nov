'use client'

import { useState } from 'react'
import Setup from './components/Setup'
import Game from './components/Game'

export default function Home() {
    const [gameStarted, setGameStarted] = useState(false)
    const [players, setPlayers] = useState([])

    const handleSetupComplete = (players) => {
        setPlayers(players)
        setGameStarted(true)
    }

    return (
        <div className="container mx-auto p-4">
            <header>
                <h1 className="text-4xl font-bold text-center my-8">
                    Dice Game
                </h1>
            </header>
            <main>
                {gameStarted ? (
                    <Game players={players} />
                ) : (
                    <Setup onFinished={handleSetupComplete} />
                )}
            </main>
        </div>
    )
}
