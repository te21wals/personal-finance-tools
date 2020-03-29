const budget = require('../config/budget-config');

const createTransactionSubtypePrompt = (parentType, transactionType) => {
    const subtypes = budget[parentType].subtypes;
    return {
        type: 'list',
        name: 'subtype',
        message: `Enter the ${parentType} sub type: `,
        choices: subtypes,
        when: ({ type }) => type === parentType || transactionType == parentType
    };
};

module.exports = { createTransactionSubtypePrompt };
