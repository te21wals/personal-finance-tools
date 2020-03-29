const previouslyNormalizedTransactionKey = ({
    date,
    description,
    amount,
    source
}) => {
    return date + description + amount + source;
};

module.exports = { previouslyNormalizedTransactionKey };
