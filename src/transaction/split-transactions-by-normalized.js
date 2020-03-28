const {
    parseNormalizedTransaction
} = require('../csv/parse-normalized-transactions');

module.exports.splitTransactionsByNormalized = async (
    transactionsFromExports,
    outputPath,
    usePreviouslyNormalizedTransactions
) => {
    if (!usePreviouslyNormalizedTransactions) {
        return {
            previouslyNormalizedTrasactions: [],
            unnormalizedTrasactions: transactionsFromExports
        };
    }

    const previouslyNormalizedTransactions = await parseNormalizedTransaction(
        outputPath
    );

    const previouslyNormalizedTrasactions = [];
    const unnormalizedTrasactions = [];
    for (const transaction of transactionsFromExports) {
        const transactionKey = `${transaction.date}${transaction.description}${transaction.amount}${transaction.source}`;
        if (previouslyNormalizedTransactions[transactionKey]) {
            previouslyNormalizedTrasactions.push(
                transactionsFromExports[transactionKey]
            );
        } else {
            unnormalizedTrasactions.push(transaction);
        }
    }

    return { previouslyNormalizedTrasactions, unnormalizedTrasactions };
};
