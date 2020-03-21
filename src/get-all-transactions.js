const { resolve } = require('path');
const { readdir } = require('fs').promises;
const { parseExport } = require('./parse-export');

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
        res = [...res, ...x];
    }
    return res;
}

const getAllTransactions = async rootExportPath =>
    await reduceTransactionsToSingleArray(
        getTransactionsForEachExport(getExportFiles(rootExportPath))
    );

module.exports = { getAllTransactions };
