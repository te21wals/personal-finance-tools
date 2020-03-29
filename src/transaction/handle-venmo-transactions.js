const { venmoWithdrawlFilter } = require('../config/parsing-config');

const mergeVenmoTransactions = venmoTransactions => {
    return venmoTransactions.reduce((acc, venmoTransaction) => {
        const existingVenmoTransactionOnDate = acc.find(
            vt => vt.date === venmoTransaction.date
        );

        if (existingVenmoTransactionOnDate) {
            const accWithoutTransaction = acc.filter(
                x => x.date !== existingVenmoTransactionOnDate.date
            );
            const mergedVenmoTransaction = {
                ...existingVenmoTransactionOnDate,
                amount:
                    existingVenmoTransactionOnDate.amount +
                    venmoTransaction.amount
            };
            return [mergedVenmoTransaction, ...accWithoutTransaction];
        }

        return [venmoTransaction, ...acc];
    }, []);
};

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
    return {
        ...splitTransactions,
        venmoTransactions: mergeVenmoTransactions(
            splitTransactions.venmoTransactions
        )
    };
};

module.exports = { handleVenmoTransactions };
