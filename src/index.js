const { getAllTransactions } = require('./parse-export/get-all-transactions');
const { prompt } = require('./inquirer');

(async () => {
    const normalizedTransactions = [];
    for (const transaction of await getAllTransactions('./exports')) {
        const normalizedTransaction = await prompt(transaction);
        if (normalizedTransaction)
            normalizedTransactions.push(normalizedTransaction);
    }
})();
