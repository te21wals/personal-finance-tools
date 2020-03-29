const budget = require('../config/budget-config');
const {
    createOverrideDescriptionPrompt
} = require('./create-override-description-prompt');
const {
    createTransactionTypePrompt
} = require('./create-transaction-type-prompt');

const { createTransactionSubtypePrompt } = require('./create-subtype-prompt');

const skip = 'skip';

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
        prompts.push(createTransactionTypePrompt(types));
    }

    // if subtype is not present prmopt user for subtype
    if (missingFieldsSet.has('subtype')) {
        for (const type of types) {
            prompts.push(
                createTransactionSubtypePrompt(type, transaction.type)
            );
        }
    }

    prompts.push(createOverrideDescriptionPrompt(transaction.description));

    return prompts;
};

module.exports = { makePromptsFromConfig, skip };
