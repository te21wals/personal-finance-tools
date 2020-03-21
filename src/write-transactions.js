const fastcsv = require('fast-csv');
const fs = require('fs');

const writeTransactions = (transactions, outputFile) => {
    const ws = fs.createWriteStream(outputFile);
    fastcsv.write(transactions, { headers: true }).pipe(ws);
};

module.exports = { writeTransactions };
