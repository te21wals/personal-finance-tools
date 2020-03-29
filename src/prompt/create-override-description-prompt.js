const createOverrideDescriptionPrompt = ({ currentDescription = '' }) => {
    return {
        type: 'input',
        name: 'description',
        message: 'enter the description: ',
        default: currentDescription,
        when: ({ type }) => type !== 'skip',
        validate: value => Boolean(value) || 'enter a valid description'
    };
};

module.exports = { createOverrideDescriptionPrompt };
