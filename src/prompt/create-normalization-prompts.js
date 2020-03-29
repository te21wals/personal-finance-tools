const {
    createOverrideDescriptionPrompt
} = require('./create-override-description-prompt');
const {
    createTransactionTypePrompt
} = require('./create-transaction-type-prompt');

const {
    createTransactionSubtypePrompt
} = require('./create-transaction-subtype-prompt');

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

    if (missingFieldsSet.has('type')) {
        prompts.push(createTransactionTypePrompt({ includeSkip: true }));
    }

    if (missingFieldsSet.has('subtype')) {
        prompts.push(
            ...createTransactionSubtypePrompt({
                transactionType: transaction.transactionType
            })
        );
    }

    prompts.push(
        createOverrideDescriptionPrompt({
            currentDescription: transaction.description
        })
    );

    return prompts;
};

module.exports = { makePromptsFromConfig, skip };
