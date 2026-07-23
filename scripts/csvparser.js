// ========================================
// CSV PARSER
// Converts CSV text into rows and columns
// ========================================

export function parseCSV(text) {

    const lines = text.split(/\r?\n/);

    return lines.map(line => {

        const result = [];

        let current = "";

        let inQuotes = false;


        for (let i = 0; i < line.length; i++) {

            const char = line[i];


            if (char === '"') {

                inQuotes = !inQuotes;

            } else if (char === "," && !inQuotes) {

                result.push(current);

                current = "";

            } else {

                current += char;

            }

        }


        result.push(current);

        return result;

    });

}