import { useState } from 'react'

function Setup({ onFinished }) {
    const [players, setPlayers] = useState([{ name: '', image: '' }])

    const handleInputChange = (index, event) => {
        const values = [...players]
        values[index][event.target.name] = event.target.value
        setPlayers(values)
    }

    const handleImageChange = (index, event) => {
        const values = [...players]
        values[index].image = URL.createObjectURL(event.target.files[0])
        setPlayers(values)
    }

    const handleAddPlayer = () => {
        setPlayers([...players, { name: '', image: '' }])
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        onFinished(players)
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            {players.map((player, index) => (
                <div key={index} className="flex flex-col space-y-2">
                    <input
                        type="text"
                        name="name"
                        value={player.name}
                        onChange={(e) => handleInputChange(index, e)}
                        placeholder={`Player ${index + 1} Name`}
                        className="border rounded p-2"
                        required
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleImageChange(index, e)}
                        className="border rounded p-2"
                    />
                    {player.image && (
                        <img
                            src={player.image}
                            alt={`${player.name}`}
                            className="w-12 h-12 rounded-full"
                        />
                    )}
                </div>
            ))}
            <button
                type="button"
                onClick={handleAddPlayer}
                className="bg-blue-500 text-white p-2 rounded"
            >
                Add Another Player
            </button>
            <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded"
            >
                Start Game
            </button>
        </form>
    )
}

export default Setup
