const parse = require('csv-parser');
const fs = require('fs');
const moment = require('moment');
const { parsingConfig } = require('../config/parsing-config');

const parseExport = ({ filepath, exportType }) => {
    return new Promise((resolve, reject) => {
        const {
            mappingConfig,
            headers,
            invertTransactionAmount
        } = parsingConfig[exportType];
        const {
            dateColumn,
            dateFormatString,
            descriptionColumn,
            debitColumn,
            creditColumn,
            source
        } = mappingConfig;
        const transactions = [];
        fs.createReadStream(filepath)
            .on('error', reject)
            .pipe(parse(headers))
            .on('data', row => {
                const amount = Number(row[debitColumn] || row[creditColumn]);
                const normalizedTransaction = {
                    date: moment(row[dateColumn], dateFormatString).format(),
                    description: row[descriptionColumn].toLowerCase(),
                    amount: invertTransactionAmount
                        ? amount - amount * 2
                        : amount,
                    source
                };
                transactions.push(normalizedTransaction);
            })
            .on('end', () => {
                resolve(transactions);
            });
    });
};

module.exports = { parseExport };
