const { getAllTransactions } = require('./transaction/get-all-transactions');
const {
    normalizeTransactions
} = require('./transaction/normalize-transaction');

const {
    handleVenmoTransactions
} = require('./transaction/handle-venmo-transactions');

const {
    filterPreviouslyNormalizedTransactions
} = require('./transaction/filter-previously-normalizaed-transactions');

const {
    normalizeVenmoTransctions
} = require('./transaction/normalize-venmo-transactions');

const { absoluteFilePath } = require('./util/fs-util');
const { upsertTransactions } = require('./db/operations/transaction/update');
const { clearAllDocuments } = require('./db/operations/clear-all-documents');

(async ({
    absoluteExportsPath = absoluteFilePath('./exports'),
    clearDocuments = false
}) => {
    if (clearDocuments) {
        const deleted = await clearAllDocuments();
        console.log('deleting all documents from the datastore', { deleted });
    }

    const exportTransactions = await getAllTransactions({
        rootExportPath: absoluteExportsPath
    });
    console.log(`${exportTransactions.length} found in export files.`);

    const exportedTransactionsFiltered = await filterPreviouslyNormalizedTransactions(
        exportTransactions
    );
    console.log(
        `${exportedTransactionsFiltered.length} need to be normalized.`
    );

    const { venmoTransactions, nonVenmoTransactions } = handleVenmoTransactions(
        exportedTransactionsFiltered
    );
    const normalizedVenmoTransactions = await normalizeVenmoTransctions(
        venmoTransactions
    );
    const normalizedNonVenmoTransactions = await normalizeTransactions(
        nonVenmoTransactions
    );
    const normalizedTransactions = [
        ...normalizedVenmoTransactions,
        ...normalizedNonVenmoTransactions
    ];

    console.log('normalized a bunch of transactions', normalizedTransactions);

    console.log(await upsertTransactions(normalizedTransactions));
})({
    clearDocuments: true
});
