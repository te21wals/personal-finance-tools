const { parseExport } = require('./parse-export/parse-export');
const { getExports } = require('./parse-export/get-export-files');

(async () => {
    for await (const transactionExport of getExports('./exports')) {
        console.log(await parseExport(transactionExport));
    }
})();