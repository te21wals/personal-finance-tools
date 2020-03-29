const {
    previouslyNormalizedTransactionKey
} = require('../util/transaction-util');

module.exports.applyPreviousTransactionNormalization = (
    transactionsFromExports,
    previouslyNormalizedTransactions
) => {
    const previouslyNormalizedTrasactions = [];
    const unnormalizedTrasactions = [];
    for (const transaction of transactionsFromExports) {
        const transactionKey = previouslyNormalizedTransactionKey(transaction);
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
