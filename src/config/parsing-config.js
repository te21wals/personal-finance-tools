const parsingConfig = Object.freeze({
    'debit-card': {
        mappingConfig: {
            dateColumn: 'Date',
            dateFormatString: 'MM/DD/YYYY',
            descriptionColumn: 'Description',
            debitColumn: 'Amount Debit',
            creditColumn: 'Amount Credit',
            source: 'debit-card'
        }
    },
    'visa-card': {
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
    'apple-card': {
        mappingConfig: {
            dateColumn: 'Clearing Date',
            dateFormatString: 'MM/DD/YYYY',
            descriptionColumn: 'Description',
            debitColumn: 'Amount (USD)',
            creditColumn: 'Amount (USD)',
            source: 'apple-card'
        },
        invertTransactionAmount: true
    }
});

const venmoWithdrawlFilter = 'withdrawal venmo';

module.exports = { parsingConfig, venmoWithdrawlFilter };
