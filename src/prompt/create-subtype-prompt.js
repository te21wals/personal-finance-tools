const mapSubtypesToSubtypePrompt = (parentType, subtypes, transactionType) => {
    return {
        type: 'list',
        name: 'subtype',
        message: `Enter the ${parentType} sub type: `,
        choices: subtypes,
        when: ({ type }) => type === parentType || transactionType == parentType
    };
};

module.exports = { mapSubtypesToSubtypePrompt };
