const { venmoWithdrawlFilter } = require('../config/parsing-config');

const mergeVenmoTransactions = venmoTransactions => {
    return venmoTransactions.reduce((accumulator, venmoTransaction) => {
        const existingVenmoTransactionOnDate = accumulator.find(
            vt => vt.date === venmoTransaction.date
        );

        if (existingVenmoTransactionOnDate) {
            const accumulatorWithoutTransaction = accumulator.filter(
                x => x.date !== existingVenmoTransactionOnDate.date
            );
            const mergedVenmoTransaction = {
                ...existingVenmoTransactionOnDate,
                amount:
                    existingVenmoTransactionOnDate.amount +
                    venmoTransaction.amount
            };
            return [mergedVenmoTransaction, ...accumulatorWithoutTransaction];
        }

        return [venmoTransaction, ...accumulator];
    }, []);
};

const handleVenmoTransactions = transactionsFromExports => {
    const splitTransactions = transactionsFromExports.reduce(
        (accumulator, exportTransaction) => {
            const { venmoTransactions, nonVenmoTransactions } = accumulator;
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
