const inquirer = require('inquirer');
const { getPrompts, skip } = require('./prompts');

// const skip = 'skip';
// const handleTransaction = ['guilt free', 'utility'];
// const utilitySubType = ['a', 'b', 'c'];
// const guiltFreeSubtype = ['a2', 'b2', 'c2', 'default'];

// const prompt = () => {
//     return inquirer.prompt([
//         {
//             type: 'list',
//             name: 'type',
//             message: `How do you want to handle this transaction?`,
//             choices: [skip, ...handleTransaction]
//         },
//         {
//             type: 'list',
//             name: 'subType',
//             message: 'What utility category does this transaction belong to?',
//             choices: utilitySubType,
//             when: ({ type }) => type === 'utility'
//         },
//         {
//             type: 'list',
//             name: 'subType',
//             message:
//                 'What guilt free category does this transaction belong to?',
//             choices: guiltFreeSubtype,
//             when: ({ type }) => type === 'guilt free'
//         },
//         {
//             type: 'confirm',
//             name: 'changeDescription',
//             message: 'Would you like to change the transaction description?',
//             default: false,
//             when: ({ type }) => new Set(handleTransaction).has(type)
//         },
//         {
//             type: 'input',
//             name: 'description',
//             message: 'enter the new description: ',
//             choices: guiltFreeSubtype,
//             when: ({ changeDescription }) => changeDescription
//         }
//     ]);
// };

const prompt = () => {
    const prompts = getPrompts();
    return inquirer.prompt(prompts);
};

module.exports.prompt = async transaction => {
    console.dir(transaction, { depth: null, colors: true });

    const answers = await prompt(transaction);
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
