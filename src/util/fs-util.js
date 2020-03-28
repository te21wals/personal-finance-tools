const fs = require('fs');
const path = require('path');

const fileExists = path => {
    return new Promise(resolve => {
        fs.access(path, fs.F_OK, err => {
            if (err) {
                resolve(false);
                return;
            }

            resolve(true);
        });
    });
};

const absoluteFilePath = relativePath => path.resolve(relativePath);

module.exports = { fileExists, absoluteFilePath };
