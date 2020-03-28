const parse = require('csv-parser');
const fs = require('fs');
const moment = require('moment');
const { parsingConfig } = require('../config/parsing-config');

const _parseExport = (
    filepath,
    { mappingConfig, headers, invertTransactionAmount }
) => {
    return new Promise((resolve, reject) => {
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

const parseExport = ({ filepath, exportType }) => {
    switch (exportType) {
        case 'apple-card':
            return _parseExport(filepath, parsingConfig.appleCard);
        case 'debit-card':
            return _parseExport(filepath, parsingConfig.debitCard);
        case 'visa-card':
            return _parseExport(filepath, parsingConfig.visaCard);
        default:
            throw new Error('invalid export type');
    }
};

module.exports = { parseExport };
