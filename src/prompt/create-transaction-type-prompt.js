const budget = require('../config/budget-config');

const createTransactionTypePrompt = ({ includeSkip = false }) => {
    let choices = [...Object.keys(budget)];
    if (includeSkip) choices = ['skip', ...choices];

    return {
        type: 'list',
        name: 'type',
        message: `What type of transaction is this?`,
        choices
    };
};

module.exports = { createTransactionTypePrompt };
