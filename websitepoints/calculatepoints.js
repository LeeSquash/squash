// ========================================
// WEBSITE POINTS CALCULATOR
// Calculates player points by competition
// ========================================

import { calculatePeteRobertsPoints } from "./peteroberts.js";
import { calculateSLTCPoints } from "./sltc.js";
import { calculateGenerationCupPoints } from "./generationcup.js";
import { calculateJuniorClubnightPoints } from "./juniorclubnight.js";
import { calculateRacketballClubnightPoints } from "./racketballclubnight.js";

export function calculatePlayerPoints(player) {

    const breakdown = {

        peteroberts: calculatePeteRobertsPoints(
            player.competitions.peteroberts || []
        ),

        sltc: calculateSLTCPoints(
            player.competitions.sltc || []
        ),

        generationcup: calculateGenerationCupPoints(
            player.competitions.generationcup || []
        ),

        juniorclubnight: calculateJuniorClubnightPoints(
            player.competitions.juniorclubnight || []
        ),

        racketballclubnight: calculateRacketballClubnightPoints(
            player.competitions.racketballclubnight || []
        )

    };


    const total = Object.values(breakdown)
        .reduce(
            (sum, points) => sum + points,
            0
        );


    return {

        total: total,

        breakdown: breakdown

    };

}