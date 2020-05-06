const { removeDocs } = require('../neDB');

module.exports.clearAllDocuments = () =>
    removeDocs({ query: {}, options: { multi: true } });
