const { parsingConfig } = require('./config/parsing-config');
const { parseExport } = require('./parse-export/parse-export');

const debitCardFilepath = './exports/debit-card/Export.csv';
const appleExportFilePath = './exports/apple-card/Export.csv';
const visaExportFilePath = './exports/visa-card/Export.csv';

(async () => {
    console.log(
        await parseExport({
            filepath: debitCardFilepath,
            ...parsingConfig.debitCard.mappingConfig
        })
    );

    console.log(
        await parseExport({
            filepath: appleExportFilePath,
            ...parsingConfig.appleCard.mappingConfig
        })
    );

    console.log(
        await parseExport(
            {
                filepath: visaExportFilePath,
                ...parsingConfig.visaCard.mappingConfig
            },
            parsingConfig.visaCard.headers
        )
    );
})();
