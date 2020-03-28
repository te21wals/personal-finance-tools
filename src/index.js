const { getAllTransactions } = require('./get-all-transactions');
const { prompt } = require('./normalize-transaction');
const { applyTransactionMapping } = require('./tansaction-mappings');
const { writeTransactions } = require('./write-transactions');
const {
    splitTransactionsByNormalized
} = require('./split-transactions-by-normalized');

(async () => {
    const exportTransactions = await getAllTransactions('./exports');

    const exportTransactionsWithConfigMappings = exportTransactions.map(
        transaction => applyTransactionMapping(transaction)
    );

    const {
        previouslyNormalizedTrasactions,
        unnormalizedTrasactions
    } = await splitTransactionsByNormalized(
        exportTransactionsWithConfigMappings
    );

    const normalizedTransactions = [];
    for (const transaction of unnormalizedTrasactions) {
        const normalizedTransaction = await prompt(transaction);
        if (normalizedTransaction)
            normalizedTransactions.push(normalizedTransaction);
    }

    await writeTransactions(
        [...previouslyNormalizedTrasactions, ...normalizedTransactions],
        'out.csv'
    );
})();
