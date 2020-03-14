const parsingConfig = Object.freeze({
    debitCard: {
        mappingConfig: {
            dateColumn: 'Date',
            dateFormatString: 'MM/DD/YYYY',
            descriptionColumn: 'Description',
            debitColumn: 'Amount Debit',
            creditColumn: 'Amount Credit',
            source: 'debit-card'
        }
    },
    visaCard: {
        mappingConfig: {
            dateColumn: 'clearing date',
            dateFormatString: 'MM/DD/YYYY',
            descriptionColumn: 'description',
            debitColumn: 'amount',
            creditColumn: 'amount',
            source: 'visa-card'
        },
        headers: [
            'transaction date',
            'clearing date',
            'description',
            'amount',
            'sequence number',
            'type of transaction',
            'transaction id',
            'type of transaction'
        ]
    },
    appleCard: {
        mappingConfig: {
            dateColumn: 'Clearing Date',
            dateFormatString: 'MM/DD/YYYY',
            descriptionColumn: 'Description',
            debitColumn: 'Amount (USD)',
            creditColumn: 'Amount (USD)',
            source: 'apple-card'
        }
    }
});

module.exports = { parsingConfig };
