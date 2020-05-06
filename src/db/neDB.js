const Datastore = require('nedb');

const documentStore = ({ filename = 'out' }) => {
    if (!documentStore.documentStore) {
        documentStore.documentStore = new Datastore({
            filename,
            autoload: true
        });
    }

    return documentStore.documentStore;
};

const insertDocs = ({ query = [] }) => {
    return new Promise((resolve, reject) => {
        documentStore({}).insert(query, function(err, data) {
            if (err !== null) reject(err);
            else resolve(data);
        });
    });
};

const findDocs = ({ query = {} }) => {
    return new Promise((resolve, reject) => {
        documentStore({}).find(query, function(err, data) {
            if (err !== null) reject(err);
            else resolve(data);
        });
    });
};

const countDocs = ({ query = {} }) => {
    return new Promise((resolve, reject) => {
        documentStore({}).count(query, function(err, data) {
            if (err !== null) reject(err);
            else resolve(data);
        });
    });
};

const updateDocs = ({ findQuery, update, options = {} }) => {
    return new Promise((resolve, reject) => {
        documentStore({}).update(findQuery, update, options, function(
            err,
            data
        ) {
            if (err !== null) reject(err);
            else resolve(data);
        });
    });
};

const removeDocs = ({ query, options = {} }) => {
    return new Promise((resolve, reject) => {
        documentStore({}).remove(query, options, function(err, data) {
            if (err !== null) reject(err);
            else resolve(data);
        });
    });
};

module.exports = {
    documentStore,
    insertDocs,
    findDocs,
    countDocs,
    updateDocs,
    removeDocs
};
