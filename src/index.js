const { getAllTransactions } = require('./get-all-transactions');
const { prompt } = require('./inquirer');
const { mapTransactionDescription } = require('./apply-description-mappings');

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
})();
