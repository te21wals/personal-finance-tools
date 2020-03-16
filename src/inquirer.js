const inquirer = require('inquirer');

const skip = 'skip';
const handleTransaction = ['guilt free', 'utility'];
const utilitySubType = ['a', 'b', 'c'];
const guiltFreeSubtype = ['a2', 'b2', 'c2'];
module.exports.prompt = () => {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'type',
            message: `How do you want to handle this transaction?`,
            choices: [skip, ...handleTransaction]
        },
        {
            type: 'list',
            name: 'subType',
            message: 'What utility category does this transaction belong to?',
            choices: utilitySubType,
            when: ({ type }) => type === 'utility'
        },
        {
            type: 'list',
            name: 'subType',
            message:
                'What guilt free category does this transaction belong to?',
            choices: guiltFreeSubtype,
            when: ({ type }) => type === 'guilt free'
        }
    ]);
};
