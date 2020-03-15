const {
    getAllTransactions
} = require('./parse-export/get-all-export-transactions');

// async function reduce(asyncIter, reduceFunction, init = []) {
//     let res = init;
//     for await (const x of asyncIter) {
//         res = reduceFunction(res, x);
//     }
//     return res;
// }

// const toArray = async iter => await reduce(iter, (a, x) => [...a, ...x]);

// (async () => {
//     const transactions = [];
//     for await (const transactionExport of getExports('./exports')) {
//         const transactionsForExport = await parseExport(transactionExport);
//         transactions.concat(transactionsForExport);
//     }
//     console.log(transactions);
// })();
(async () => {
    const transactions = await getAllTransactions('./exports');
    console.log(transactions);
    console.log(transactions.length);
})();
