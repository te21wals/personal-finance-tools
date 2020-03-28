const { getAllTransactions } = require('./transaction/get-all-transactions');
const { prompt } = require('./transaction/normalize-transaction');
const {
    applyTransactionMapping
} = require('./transaction/apply-tansaction-mappings');
const { writeTransactions } = require('./csv/write-transactions');
const {
    splitTransactionsByNormalized
} = require('./transaction/split-transactions-by-normalized');

const { absoluteFilePath } = require('./util/fs-util');

(async ({
    absoluteExportsPath = absoluteFilePath('./exports'),
    absoluteOutputPath = absoluteFilePath('out.csv'),
    usePreviouslyNormalizedTransactions = true
}) => {
    const exportTransactions = await getAllTransactions(absoluteExportsPath);

    const exportTransactionsWithConfigMappings = exportTransactions.map(
        transaction => applyTransactionMapping(transaction)
    );
    const {
        previouslyNormalizedTrasactions,
        unnormalizedTrasactions
    } = await splitTransactionsByNormalized(
        exportTransactionsWithConfigMappings,
        absoluteOutputPath,
        usePreviouslyNormalizedTransactions
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
