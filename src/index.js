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
    return new Promise((resolve, reject) => {
        fs.createReadStream(filepath)
            .on('error', reject)
            .pipe(parse())
            .on('data', row => {
                transactions.push({
                    date: moment(row[dateColumn], dateFormatString).format(),
                    description: row[descriptionColumn],
                    amount: row[debitColumn] || row[creditColumn],
                    source
                });
            })
            .on('end', () => {
                resolve(transactions);
            });
    });
};

(async () => {
    const filepath = './exports/debit-card/Export.csv';
    const input = {
        dateColumn: 'Date',
        dateFormatString: 'MM/DD/YYYY',
        descriptionColumn: 'Description',
        debitColumn: 'Amount Debit',
        creditColumn: 'Amount Credit',
        source: 'debit-card'
    };

    console.log(await parseExport({ filepath, ...input }));
})();
