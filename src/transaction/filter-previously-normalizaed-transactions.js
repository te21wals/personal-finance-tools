const { findTransactionById } = require('../db/operations/transaction/find');

module.exports.filterPreviouslyNormalizedTransactions = async transactions => {
    const updates = await Promise.all(
        transactions.map(async transaction => {
            const [oldImage] = await findTransactionById(transaction._id);
            return { oldImage, newImage: transaction };
        })
    );

    return updates
        .filter(update => !update.oldImage)
        .map(update => update.newImage);
};
