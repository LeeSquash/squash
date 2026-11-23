import { calculateSLTCPoints } from "./sltc.js";

const testPlayer = [

    {
        season: "2025/26",
        place: "5",
        score: "4"
    },

    {
        season: "2025/26",
        place: "6",
        score: "11"
    }

];


const result = calculateSLTCPoints(testPlayer);


console.log(JSON.stringify(result, null, 2));