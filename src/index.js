const { getAllTransactions } = require('./parse-export/get-all-transactions');

const { exportsDir } = require('./config/config');

(async () => {
    const transactions = await getAllTransactions(exportsDir);
    console.log(transactions);
})();
