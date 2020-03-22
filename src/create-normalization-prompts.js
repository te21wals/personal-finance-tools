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
            when: ({ changeDescription }) => changeDescription,
            validate: value => Boolean(value) || 'enter a valid description'
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

const mapSubtypesToSubtypePrompt = (parentType, subtypes, transactionType) => {
    return {
        type: 'list',
        name: 'subtype',
        message: `Enter the ${parentType} sub type: `,
        choices: subtypes,
        when: ({ type }) => type === parentType || transactionType == parentType
    };
};

const makePromptsFromConfig = transaction => {
    const missingFieldsSet = new Set(
        ['subtype', 'type'].filter(field => !transaction[field])
    );

    // if both subtype and type are defined dont prompt
    if (!missingFieldsSet.has('subtype') && !missingFieldsSet.has('type')) {
        return [];
    }

    const prompts = [];
    const types = Object.keys(budget);

    // if type is not present prmopt user for type
    if (missingFieldsSet.has('type')) {
        prompts.push(mapTypesToHandlePrompt(types));
    }

    // if subtype is not present prmopt user for subtype
    if (missingFieldsSet.has('subtype')) {
        for (const type of types) {
            prompts.push(
                mapSubtypesToSubtypePrompt(
                    type,
                    budget[type].subtypes,
                    transaction.type
                )
            );
        }
    }

    return [...prompts, ...createOverrideDescriptionPrompts(types)];
};

module.exports = { makePromptsFromConfig, skip };
