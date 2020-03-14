const parse = require('csv-parser');
const fs = require('fs');
const moment = require('moment');

module.exports.parseExport = (
    {
        filepath,
        dateColumn,
        dateFormatString,
        descriptionColumn,
        debitColumn,
        creditColumn,
        source
    },
    headers
) => {
    const transactions = [];
    return new Promise((resolve, reject) => {
        fs.createReadStream(filepath)
            .on('error', reject)
            .pipe(parse(headers))
            .on('data', row => {
                const normalizedTransaction = {
                    date: moment(row[dateColumn], dateFormatString).format(),
                    description: row[descriptionColumn],
                    amount: Number(row[debitColumn] || row[creditColumn]),
                    source
                };
                transactions.push(normalizedTransaction);
            })
            .on('end', () => {
                resolve(transactions);
            });
    });
};
