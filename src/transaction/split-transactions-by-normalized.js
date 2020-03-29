module.exports.applyPreviousTransactionNormalization = async (
    transactionsFromExports,
    previouslyNormalizedTransactions
) => {
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
