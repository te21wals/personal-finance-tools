const budget = require('./config/budget-config');
const skip = 'skip';

const createOverrideDescriptionPrompts = types => {
    return [
        {
            type: 'confirm',
            name: 'changeDescription',
            message: 'Would you like to change the transaction description?',
            default: false,
            when: ({ type }) => new Set(types).has(type)
        },
        {
            type: 'input',
            name: 'description',
            message: 'enter the new description: ',
            when: ({ changeDescription }) => changeDescription
        }
    ];
};

const mapTypesToHandlePrompt = types => {
    return {
        type: 'list',
        name: 'type',
        message: `How do you want to handle this transaction?`,
        choices: [skip, ...types]
    };
};

const mapSubtypesToSubtypePrompt = (parentType, subTypes) => {
    return {
        type: 'list',
        name: 'subType',
        message: `Enter the ${parentType} sub type: `,
        choices: subTypes,
        when: ({ type }) => type === parentType
    };
};

const getPrompts = () => {
    const prompts = [];

    const types = Object.keys(budget);
    prompts.push(mapTypesToHandlePrompt(types));

    for (const type of types) {
        prompts.push(mapSubtypesToSubtypePrompt(type, budget[type].subTypes));
    }

    return [...prompts, ...createOverrideDescriptionPrompts(types)];
};

module.exports = { getPrompts, skip };
