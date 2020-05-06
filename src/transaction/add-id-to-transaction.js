const hash = require('object-hash');

module.exports.addIdToTransaction = inputRowData => {
    return { _id: hash(inputRowData), ...inputRowData };
};
