const inquirer = require('inquirer');
const {
    makePromptsFromConfig,
    skip
} = require('../prompt/create-normalization-prompts');

const normalizeTransaction = async transaction => {
    const prompts = makePromptsFromConfig(transaction);
    if (prompts.length) {
        console.dir(transaction, { depth: null, colors: true });
    }

    const answers = await inquirer.prompt(prompts);
    if (answers.type === skip) {
        return;
    } else {
        const { date, type, subtype, description, amount, source } = {
            ...transaction,
            ...answers
        };
        return {
            date,
            type,
            subtype,
            description,
            amount,
            source
        };
    }
};

const normalizeTransactions = async unnormalizedTrasactions => {
    const normalizedTransactions = [];
    for (const transaction of unnormalizedTrasactions) {
        const normalizedTransaction = await normalizeTransaction(transaction);
        if (normalizedTransaction)
            normalizedTransactions.push(normalizedTransaction);
    }
    return normalizedTransactions;
};

module.exports = { normalizeTransactions };
