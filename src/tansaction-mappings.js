const { mappings } = require('./config/transaction-mapping-config');

const applyTransactionMapping = transction => {
    for (const [matchValue, mapToValue] of mappings) {
        if (transction.description.includes(matchValue)) {
            return {
                ...transction,
                ...mapToValue
            };
        }
    }
    return transction;
};

module.exports = { applyTransactionMapping };
