const {
    createOverrideDescriptionPrompt
} = require('./create-override-description-prompt');
const {
    createTransactionTypePrompt
} = require('./create-transaction-type-prompt');

const {
    createTransactionSubtypePrompt
} = require('./create-transaction-subtype-prompt');

const createVenmoTransactionPrompts = () => {
    return [
        createTransactionTypePrompt({}),
        createOverrideDescriptionPrompt({}),
        ...createTransactionSubtypePrompt({})
    ];
};

module.exports = { createVenmoTransactionPrompts };
