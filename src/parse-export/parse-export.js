const parse = require('csv-parser');
const fs = require('fs');
const moment = require('moment');
const { parsingConfig } = require('../config/parsing-config');

const _parseExport = (
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

const parseExport = ({ filepath, exportType }) => {
    switch (exportType) {
        case 'apple-card':
            return _parseExport({
                filepath,
                ...parsingConfig.appleCard.mappingConfig
            });
        case 'debit-card':
            return _parseExport({
                filepath,
                ...parsingConfig.debitCard.mappingConfig
            });
        case 'visa-card':
            return _parseExport(
                {
                    filepath,
                    ...parsingConfig.visaCard.mappingConfig
                },
                parsingConfig.visaCard.headers
            );
        default:
            throw new Error('invalid export type');
    }
};

module.exports = { parseExport };
