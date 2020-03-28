const inquirer = require('inquirer');
const {
    makePromptsFromConfig,
    skip
} = require('../prompt/create-normalization-prompts');

module.exports.prompt = async transaction => {
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
