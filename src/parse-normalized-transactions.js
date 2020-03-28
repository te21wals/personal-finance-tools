const fs = require('fs');
const parse = require('csv-parser');

const parseNormalizedTransaction = filepath => {
    let parsedTransactions = {};
    return new Promise((resolve, reject) => {
        fs.createReadStream(filepath)
            .on('error', reject)
            .pipe(parse())
            .on('data', row => {
                parsedTransactions[
                    `${row.date}${row.description}${Number(row.amount)}${
                        row.source
                    }`
                ] = row;
            })
            .on('end', () => {
                resolve(parsedTransactions);
            });
    });
};

module.exports = { parseNormalizedTransaction };
