const inquirer = require('inquirer');
const {
    createVenmoTransactionPrompts
} = require('../prompt/create-venmo-normalization-prompts');

const prompts = createVenmoTransactionPrompts();

const normalizeVenmoTransctions = async venmoTransactions => {
    const normalizedVenmoTransactions = [];
    for (const venmoTransaction of venmoTransactions) {
        console.dir(venmoTransaction, { depth: null, colors: true });
        const answers = await inquirer.prompt(prompts);

        const { _id, date, type, subtype, description, amount } = {
            ...venmoTransaction,
            ...answers
        };
        normalizedVenmoTransactions.push({
            _id,
            date,
            type,
            subtype,
            description,
            amount,
            source: 'venmo'
        });
    }
    return normalizedVenmoTransactions;
};

module.exports = { normalizeVenmoTransctions };
