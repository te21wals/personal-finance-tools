const createTransactionTypePrompt = (types, includeSkip = false) => {
    let choices = [...types];
    if (includeSkip) choices = ['skip', ...types];
    else choices = [...types];

    return {
        type: 'list',
        name: 'type',
        message: `What type of transaction is this?`,
        choices
    };
};

module.exports = { createTransactionTypePrompt };
