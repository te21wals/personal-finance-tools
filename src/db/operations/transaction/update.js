const { docType } = require('../../util/transaction');
const { updateDocs } = require('../../neDB');

const updateTransaction = (transaction, upsert) => {
    return updateDocs({
        findQuery: { _id: transaction._id },
        update: { ...transaction, docType },
        options: { upsert }
    });
};

module.exports.upsertTransactions = transactions => {
    return Promise.all(
        transactions.map(transaction => updateTransaction(transaction, true))
    );
};
