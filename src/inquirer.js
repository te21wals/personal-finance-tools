const inquirer = require('inquirer');
const { getPrompts, skip } = require('./prompts');

const inquire = () => inquirer.prompt(getPrompts());

module.exports.prompt = async transaction => {
    console.dir(transaction, { depth: null, colors: true });

    const answers = await inquire(transaction);
    if (answers.type === skip) {
        return;
    } else {
        const { date, type, subType, description, amount, source } = {
            ...transaction,
            ...answers
        };
        return {
            date,
            type,
            subType,
            description,
            amount,
            source
        };
    }
};
