// ========================================
// SLTC POINT CALCULATOR
// Calculates SLTC points for a player
// ========================================

export function calculateSLTCPoints(sltcData) {

    let totalPoints = 0;

    if (!sltcData || sltcData.length === 0) return 0;

    const totalTeams = Math.max(
        ...sltcData.map(season => Number(season.place) || 0)
    );

    sltcData.forEach(season => {

        const rank = Number(season.place) || 0;

        totalPoints += Number(season.points) || 0;

        if (rank > 0) {
            totalPoints += totalTeams - rank;
        }

        if (rank === 1) totalPoints += 100;
        if (rank === 2) totalPoints += 80;
        if (rank === 3) totalPoints += 60;
        if (rank === 4) totalPoints += 50;

    });

    return totalPoints;

}