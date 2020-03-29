const {
    previouslyNormalizedTransactionKey
} = require('../util/transaction-util');

module.exports.applyPreviousTransactionNormalization = (
    transactionsFromExports,
    previouslyNormalizedTransactions
) => {
    return transactionsFromExports.reduce(
        (acc, transaction) => {
            const {
                previouslyNormalizedTrasactions,
                unnormalizedTrasactions
            } = acc;
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
