const {
    previouslyNormalizedTransactionKey
} = require('../util/transaction-util');

module.exports.applyPreviousTransactionNormalization = (
    transactionsFromExports,
    previouslyNormalizedTransactions
) => {
    return transactionsFromExports.reduce(
        (accumulator, transaction) => {
            const {
                previouslyNormalizedTrasactions,
                unnormalizedTrasactions
            } = accumulator;
            const transactionKey = previouslyNormalizedTransactionKey(
                transaction
            );
            if (previouslyNormalizedTransactions[transactionKey]) {
                previouslyNormalizedTrasactions.push(
                    transactionsFromExports[transactionKey]
                );
            } else {
                unnormalizedTrasactions.push(transaction);
            }
            return {
                previouslyNormalizedTrasactions,
                unnormalizedTrasactions
            };
        },
        {
            previouslyNormalizedTrasactions: [],
            unnormalizedTrasactions: []
        }
    );
};
