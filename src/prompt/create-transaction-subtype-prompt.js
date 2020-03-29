const budget = require('../config/budget-config');

const createTransactionSubtypePrompt = ({ transactionType }) => {
    const types = Object.keys(budget);

    const prompts = [];

    if (!transactionType) {
        for (const budgetType of types) {
            prompts.push({
                type: 'list',
                name: 'subtype',
                message: `Enter the ${budgetType} transaction subtype: `,
                choices: budget[budgetType].subtypes,
                when: ({ type }) => type === budgetType
            });
        }
    } else {
        prompts.push({
            type: 'list',
            name: 'subtype',
            message: `Enter the ${transactionType} transaction sub type: `,
            choices: budget[transactionType].subtypes,
            when: ({ type }) => type === transactionType
        });
    }
    return prompts;
};

module.exports = { createTransactionSubtypePrompt };
