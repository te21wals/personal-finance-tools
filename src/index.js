const { getAllTransactions } = require('./get-all-transactions');
const { prompt } = require('./normalize-transaction');
const { mapTransactionDescription } = require('./tansaction-mappings');
const { writeTransactions } = require('./write-transactions');

(async () => {
    const parsedTransactions = await getAllTransactions('./exports');

    const transactionsWithMappedDescription = parsedTransactions.map(
        transaction => mapTransactionDescription(transaction)
    );

    const normalizedTransactions = [];
    for (const transaction of transactionsWithMappedDescription) {
        const normalizedTransaction = await prompt(transaction);
        if (normalizedTransaction)
            normalizedTransactions.push(normalizedTransaction);
    }

    await writeTransactions(normalizedTransactions, 'out.csv');
})();
