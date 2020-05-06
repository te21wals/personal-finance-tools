const { findDocs } = require('../../neDB');

const findTransactionById = id => {
    return findDocs({ query: { _id: id } });
};

module.exports = { findTransactionById };
