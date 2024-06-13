export const rollDice = () => {
    // Roll five dice
    return new Array(5).fill(0).map(() => Math.floor(Math.random() * 6) + 1)
}

export const calculateScore = (dice) => {
    let score = 0
    const counts = new Array(6).fill(0)

    dice.forEach((value) => {
        counts[value - 1]++
    })

    // Single 1s and 5s
    score += counts[0] * 100
    score += counts[4] * 50

    // Three of a kind
    counts.forEach((count, index) => {
        if (count >= 3) {
            if (index === 0) {
                score += 1000
                score -= 3 * 100 // Remove the single score added thrice
            } else {
                score += (index + 1) * 100
                if (index === 4) {
                    score -= 3 * 50 // Remove the single score added thrice
                }
            }
        }
    })

    // Run or "Straight"
    if (
        counts.slice(0, 5).every((c) => c >= 1) ||
        counts.slice(1, 6).every((c) => c >= 1)
    ) {
        score += 1500
    }

    // "Five Ones"
    if (counts[0] === 5) {
        score += 5000 - 5 * 100 // Assuming previous single 1s had been added
    }

    return score
}
