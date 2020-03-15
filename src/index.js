const { getAllTransactions } = require('./parse-export/get-all-transactions');

(async () => {
    const transactions = await getAllTransactions('./exports');
    console.log(transactions);
    console.log(transactions.length);
})();
