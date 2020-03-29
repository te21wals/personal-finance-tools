const { getAllTransactions } = require('./transaction/get-all-transactions');
const { prompt } = require('./transaction/normalize-transaction');
const { writeTransactions } = require('./csv/write-transactions');
const {
    applyPreviousTransactionNormalization
} = require('./transaction/split-transactions-by-normalized');

const {
    handleVenmoTransactions
} = require('./transaction/handle-venmo-transactions');

const {
    parseNormalizedTransaction
} = require('./csv/parse-normalized-transactions');

const { absoluteFilePath } = require('./util/fs-util');

(async ({
    absoluteExportsPath = absoluteFilePath('./exports'),
    absoluteOutputPath = absoluteFilePath('out.csv'),
    usePreviouslyNormalizedTransactions = true
}) => {
    const exportTransactions = await getAllTransactions({
        rootExportPath: absoluteExportsPath
    });

    const previouslyNormalizedTransactions = usePreviouslyNormalizedTransactions
        ? await parseNormalizedTransaction(absoluteOutputPath)
        : {};

    handleVenmoTransactions(
        exportTransactions,
        previouslyNormalizedTransactions
    );

    const {
        previouslyNormalizedTrasactions,
        unnormalizedTrasactions
    } = applyPreviousTransactionNormalization(
        exportTransactions,
        previouslyNormalizedTransactions
    );

    const normalizedTransactions = [];
    for (const transaction of unnormalizedTrasactions) {
        const normalizedTransaction = await prompt(transaction);
        if (normalizedTransaction)
            normalizedTransactions.push(normalizedTransaction);
    }

    await writeTransactions(
        [...previouslyNormalizedTrasactions, ...normalizedTransactions],
        absoluteOutputPath
    );
})({});
