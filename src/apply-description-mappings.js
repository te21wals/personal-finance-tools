const { mappings } = require('./config/quick-description-mappings');

const mapTransactionDescription = transction => {
    for (const [matchValue, mapToValue] of mappings) {
        if (transction.description.includes(matchValue)) {
            return {
                ...transction,
                description: mapToValue
            };
        }
    }
    return transction;
};

module.exports = { mapTransactionDescription };
