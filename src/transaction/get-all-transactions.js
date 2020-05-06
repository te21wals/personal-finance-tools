const { resolve } = require('path');
const { readdir } = require('fs').promises;
const { parseExport } = require('../csv/parse-export');
const { applyTransactionMapping } = require('./apply-tansaction-mappings');
const { addIdToTransaction } = require('./add-id-to-transaction');

async function* getExportFiles(dir) {
    const dirents = await readdir(dir, { withFileTypes: true });
    for (const dirent of dirents) {
        const filepath = resolve(dir, dirent.name);
        if (dirent.isDirectory()) {
            yield* getExportFiles(filepath);
        } else {
            const exportType = dir.split('/').pop();
            yield { filepath, exportType };
        }
    }
}

async function* getTransactionsForEachExport(getExportFilesIter) {
    for await (const obj of getExportFilesIter) {
        yield await parseExport(obj);
    }
}

async function reduceTransactionsToSingleArray(asyncIter) {
    let res = [];
    for await (const x of asyncIter) {
        res = [
            ...res,
            ...x.map(transaction =>
                applyTransactionMapping(addIdToTransaction(transaction))
            )
        ];
    }
    return res;
}
/*
    get all transactions from the export files inside the rootExportPath 
    and apply the default mappings from config
*/
const getAllTransactions = async ({ rootExportPath }) =>
    await reduceTransactionsToSingleArray(
        getTransactionsForEachExport(getExportFiles(rootExportPath))
    );

module.exports = { getAllTransactions };
