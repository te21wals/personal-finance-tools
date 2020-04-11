const { getAllTransactions } = require('./transaction/get-all-transactions');
const {
    normalizeTransactions
} = require('./transaction/normalize-transaction');

const {
    handleVenmoTransactions
} = require('./transaction/handle-venmo-transactions');

const {
    normalizeVenmoTransctions
} = require('./transaction/normalize-venmo-transactions');

const { absoluteFilePath } = require('./util/fs-util');

(async ({ absoluteExportsPath = absoluteFilePath('./exports') }) => {
    const exportTransactions = await getAllTransactions({
        rootExportPath: absoluteExportsPath
    });

    const { venmoTransactions, nonVenmoTransactions } = handleVenmoTransactions(
        exportTransactions
    );

    const normalizedVenmoTransactions = await normalizeVenmoTransctions(
        venmoTransactions
    );

    const normalizedTransactions = await normalizeTransactions(
        nonVenmoTransactions
    );

    console.log([...normalizedVenmoTransactions, ...normalizedTransactions]);
})({});
