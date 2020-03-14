const parse = require('csv-parser');
const fs = require('fs');
const moment = require('moment');

const parseExport = ({
    filepath,
    dateColumn,
    dateFormatString,
    descriptionColumn,
    debitColumn,
    creditColumn,
    source
}) => {
    const transactions = [];

    fs.createReadStream(filepath)
        .on('error', () => {
            console.log('there was an error processing the export.');
        })
        .pipe(parse())
        .on('data', row => {
            transactions.add({
                date: moment(row[dateColumn]).format(dateFormatString),
                description: row[descriptionColumn],
                amount: row[debitColumn] || row[creditColumn],
                source
            });
        })
        .on('end', () => {
            console.log({
                message: 'finished processing the export',
                source,
                filepath
            });
        });
};

(() => {
    const filepath = './exports/debit-card/Export.csv';
    const input = {
        dateColumn: 'Date',
        dateFormatString: 'MM/DD/YYYY',
        descriptionColumn: 'Description',
        debitColumn: 'Amount Debit',
        creditColumn: 'Amount Credit',
        source: 'debit-card'
    };

    parseExport({ filepath, ...input });
})();
