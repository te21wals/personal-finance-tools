const { venmoWithdrawlFilter } = require('../config/parsing-config');

const handleVenmoTransactions = transactionsFromExports => {
    const splitTransactions = transactionsFromExports.reduce(
        (acc, exportTransaction) => {
            const { venmoTransactions, nonVenmoTransactions } = acc;
            if (exportTransaction.description.includes(venmoWithdrawlFilter)) {
                venmoTransactions.push(exportTransaction);
            } else {
                nonVenmoTransactions.push(exportTransaction);
            }
            return { venmoTransactions, nonVenmoTransactions };
        },
        {
            venmoTransactions: [],
            nonVenmoTransactions: []
        }
    );

    return splitTransactions;
};

module.exports = { handleVenmoTransactions };
