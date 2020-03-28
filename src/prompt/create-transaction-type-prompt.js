const createTransactionTypePrompt = types => {
    return {
        type: 'list',
        name: 'type',
        message: `What type of transaction is this?`,
        choices: ['skip', ...types]
    };
};

module.exports = { createTransactionTypePrompt };
