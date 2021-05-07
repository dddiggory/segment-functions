[
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				valueB: 'userIdError',
				valueA: 'packet.event.payload.data.placement',
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen'
			}
		],
		name: 'Kill Switch- userIdError',
		component: ['LOGON']
	},
	{
		instructions: [
			{
				valueA: 'packet.event.payload.data.placement',
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen',
				valueB: 'passwordError'
			}
		],
		name: 'Kill Switch-passwordError',
		component: ['LOGON'],
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		instructions: [
			{
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.placement',
				valueB: 'oobeautoshow'
			}
		],
		screen: '.*',
		name: 'Kill Switch - OOBE Show events',
		destinations: ['blockEvent'],
		eventType: ['simpleDecisionedContent']
	},
	{
		component: '(?i)(site_tour|slideshow.*|.*site_guide)',
		name: 'Kill Switch - Action by components',
		screen: '.*',
		instructions: [{ type: 'Concatenate', sources: ['true'] }],
		eventType: ['action'],
		destinations: ['blockEvent']
	},
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				valueB: 'memoError',
				valueA: 'packet.event.payload.data.placement',
				notEqual: 'false',
				type: 'IfThen',
				equal: 'true'
			}
		],
		component: ['ACCOUNT_ACTIVITY_ALL_TRANSACTIONS'],
		name: 'Kill Switch- memoError'
	},
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				type: 'IfThen',
				notEqual: 'false',
				equal: 'true',
				valueA: 'packet.event.payload.data.placement',
				valueB: 'transactionfromdateerror'
			}
		],
		name: 'Kill Switch- Transactionfromdateerror',
		component: ['ACCOUNT_ACTIVITY_ALL_TRANSACTIONS']
	},
	{
		name: 'Kill Switch - transactionToDateError',
		component: ['ACCOUNT_ACTIVITY_ALL_TRANSACTIONS'],
		instructions: [
			{
				valueA: 'packet.event.payload.data.placement',
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen',
				valueB: 'transactionToDateError'
			}
		],
		eventType: ['communication'],
		destinations: ['blockEvent']
	},
	{
		screen: '.*',
		name: 'Kill Switch - Form field Focus events',
		instructions: [
			{
				valueA: 'packet.event.payload.interaction',
				notEqual: 'true',
				type: 'IfThen',
				equal: 'false',
				valueB: 'change'
			}
		],
		eventType: ['interaction'],
		destinations: ['blockEvent']
	},
	{
		destinations: ['blockEvent'],
		eventType: ['interaction'],
		instructions: [
			{
				valueB: 'change',
				type: 'IfThen',
				notEqual: 'true',
				equal: 'false',
				valueA: 'packet.event.payload.interaction'
			}
		],
		screen: '.*',
		name: 'Kill Switch- Form field Origination'
	},
	{
		eventType: ['adImpression'],
		destinations: ['blockEvent'],
		name: 'Kill Switch- Web AD Impression events with no AD ID - Hideadslo',
		screen: '.*',
		instructions: [
			{
				valueB: '',
				valueA: 'packet.event.payload.data.adId',
				notEqual: 'false',
				equal: 'true',
				type: 'IfThen'
			},
			{
				type: 'RegexCheck',
				value: 'packet.event.payload.data.adId',
				match: 'true',
				regex: '(?i)(HideAdSlot)',
				noMatch: '___$1___'
			}
		]
	},
	{
		component: ['ADVERTISEMENTS'],
		name: ' Kill Switch - Web Ad clicks with no AD ID',
		instructions: [
			{
				valueB: '',
				valueA: 'packet.event.payload.data.advertisementId.value',
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen'
			},
			{
				type: 'RegexCheck',
				value: 'packet.event.payload.data.advertisementId.value',
				match: 'true',
				noMatch: '___$1___',
				regex: '(?i)(HideAdSlot)'
			}
		],
		eventType: ['action'],
		destinations: ['blockEvent']
	},
	{
		screen: '.*',
		name: 'Kill Switch - Bell Badge',
		instructions: [
			{
				value: 'packet.event.component',
				type: 'RegexCheck',
				noMatch: 'false',
				regex:
					'(?i)(CUSTOMER.CONVERSATION.MESSAGES.HEADER|MANAGE.MY.ALERTS.SUBSCRIPTION)',
				match: 'true'
			}
		],
		eventType: ['dataCollection'],
		destinations: ['blockEvent']
	},
	{
		instructions: [
			{
				valueB: 'Customer_Greetings',
				type: 'IfThen',
				notEqual: 'false',
				equal: 'true',
				valueA: 'packet.event.component'
			}
		],
		screen: '.*',
		name: 'Kill Switch - Customer Greetings',
		destinations: ['blockEvent'],
		eventType: ['simpleDecisionedContent', 'simpleValueDecisionedContent']
	},
	{
		instructions: [
			{
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.placement',
				valueB: 'newLimitError'
			}
		],
		name: 'Kill Switch - newLimitError',
		component: ['MANAGE_TRANSACTION_LIMITS'],
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		eventType: ['publicAction'],
		subType: ['scroll'],
		destinations: ['blockEvent'],
		screen: ['www.chase.com/', 'www.chase.com', 'www.chase.com/espanol'],
		name: 'Kill Switch - Scroll events Home page',
		instructions: [{ type: 'Concatenate', sources: ['true'] }]
	},
	{
		eventType: ['communication'],
		destinations: ['blockEvent'],
		name: 'Kill Switch - requestAccountActivityError|INVALID_TRANSACTION_T',
		component: ['ACCOUNT_ACTIVITY_ALL_TRANSACTIONS'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				]
			},
			{
				valueB: 'requestAccountActivityError|INVALID_TRANSACTION_TYPE',
				valueA: '___$1___',
				type: 'IfThen',
				notEqual: 'false',
				equal: 'true'
			}
		]
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				]
			},
			{
				valueB: 'serviceErrorHeader|SYSTEM_FAILURE',
				notEqual: 'false',
				equal: 'true',
				type: 'IfThen',
				valueA: '___$1___'
			}
		],
		name: 'Kill Switch - serviceErrorHeader|SYSTEM_FAILURE',
		component: ['SERVICE_ERROR'],
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				type: 'IfThen',
				notEqual: 'false',
				equal: 'true',
				valueA: '___$1___',
				valueB: 'updateServicePlanErrorHeader|SYSTEM_FAILURE'
			}
		],
		name: 'Kill switch - updateServicePlanErrorHeader|SYSTEM_FAILURE',
		component: ['UPDATE_SERVICE_PLAN'],
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				]
			},
			{
				noMatch: 'false',
				regex:
					'(^accountCommunicationAdvisory\\|DUE_IN_DAYS|^accountCommunicationAdvisory\\|ACCOUNT_CLOSED|^accountCommunicationAdvisory\\|SYSTEM_FAILURE)',
				match: 'true',
				value: '___$1___',
				type: 'RegexCheck'
			}
		],
		component: ['ASSETS_AND_LIABILITIES_OVERVIEW'],
		name: 'Kill Switch - accountCommunicationAdvisory multiple variations'
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				valueB: 'spendingReportErrorHeader|SYSTEM_FAILURE',
				valueA: '___$1___',
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen'
			}
		],
		component: ['SPENDING_REPORT'],
		name: 'Kill Switch - spendingReportErrorHeader|SYSTEM_FAILURE',
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				valueB:
					'accountApplicationInitiationErrorHeader|MISSING_MANDATORY_DATA',
				valueA: '___$1___',
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen'
			}
		],
		name: 'Kill Switch - accountApplicationInitiationErrorHeader|MISSING_M',
		component: ['ACCOUNT_APPLICATION_INITIATION'],
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		component: ['JOINT_APPLICANT_SELECTION'],
		name: 'Kill switch - applicantTypeOptionIdError|MISSING_MANDATORY_DATA',
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				valueB: 'applicantTypeOptionIdError|MISSING_MANDATORY_DATA',
				notEqual: 'false',
				equal: 'true',
				type: 'IfThen',
				valueA: '___$1___'
			}
		],
		eventType: ['communication'],
		destinations: ['blockEvent']
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				]
			},
			{
				match: 'true',
				noMatch: 'false',
				regex:
					'(?i)(transactionAmountError.MISSING_MANDATORY_DATA|transactionAmountError.INVALID_FORMAT)',
				type: 'RegexCheck',
				value: '___$1___'
			}
		],
		component: ['MAKE_MULTIPLE_BILL_PAYMENTS'],
		name: 'Kill Switch - Transactionamounterror',
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		eventType: ['communication'],
		destinations: ['blockEvent'],
		component: ['ADD_FUNDING_ACCOUNT'],
		name: 'Kill Switch - (?i)(^accountNumberError\\|INVALID_FORMAT|^account',
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				type: 'RegexCheck',
				value: '___$1___',
				match: 'true',
				noMatch: 'false',
				regex:
					'(?i)(^accountNumberError\\|INVALID_FORMAT|^accountNicknameError\\|MISSING_MANDATORY_DATA|^confirmedAccountNumberError\\|INVALID_FORMAT|^routingNumberError\\|INVALID_FORMAT)'
			}
		]
	},
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				value: '___$1___',
				type: 'RegexCheck',
				noMatch: 'false',
				regex:
					'(?i)(^stateError\\|MISSING_MANDATORY_DATA|^countryError\\|MISSING_MANDATORY_DATA)',
				match: 'true'
			}
		],
		component: ['UPDATE_MY_CREDIT_CARD_TRAVEL_PREFERENCES'],
		name: 'Kill Switch - (?i)(^stateError\\|MISSING_MANDATORY_DATA|^country'
	},
	{
		eventType: ['communication'],
		destinations: ['blockEvent'],
		component: ['INVESTMENT_POSITIONS'],
		name: 'Kill switch - investmentPositionsCommunicationHeader|POSITION_P',
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				valueA: '___$1___',
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen',
				valueB:
					'(investmentPositionsCommunicationHeader|POSITION_PURCHASE_NO_TAX_LOTS)'
			}
		]
	},
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				value: '___$1___',
				type: 'RegexCheck',
				noMatch: 'false',
				regex:
					'(?i)(^transactionDueDateError\\|BLACKOUT|^transactionAdditionalPrincipalPaymentError\\|MISSING_MANDATORY_DATA|^transactionOtherAmountPaymentError\\|INVALID_FORMAT)',
				match: 'true'
			}
		],
		name: 'Kill Switch - (^transactionDueDateError\\|BLACKOUT|^transactionA',
		component: ['MAKE_PERSONAL_LOAN_PAYMENT']
	},
	{
		name: 'Kill Switch - (?i)(^transactionOtherAmountPaymentError\\|MISSING',
		component: ['MAKE_MULTIPLE_BILL_PAYMENTS'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				]
			},
			{
				noMatch: 'false',
				regex:
					'(?i)(^transactionOtherAmountPaymentError\\|MISSING_MANDATORY_DATA)',
				match: 'true',
				value: '___$1___',
				type: 'RegexCheck'
			}
		],
		eventType: ['communication'],
		destinations: ['blockEvent']
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				valueA: '___$1___',
				notEqual: 'false',
				equal: 'true',
				type: 'IfThen',
				valueB: 'achFileUploadErrorHeader|SYSTEM_FAILURE'
			}
		],
		component: ['ACH_FILE_UPLOAD'],
		name: 'Kill Switch -achFileUploadErrorHeader| SYSTEM_FAILURE',
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				]
			},
			{
				match: 'true',
				noMatch: 'false',
				regex:
					'(?i)(^payeeSearchErrorHeader\\|SEARCH_UNAVAILABLE|^payeeSearchErrorHeader\\|INVALID_FORMAT)',
				type: 'RegexCheck',
				value: '___$1___'
			}
		],
		component: ['MERCHANT_SEARCH'],
		name: 'Kill Switch - (?i)(^payeeSearchErrorHeader\\|SEARCH_UNAVAILABLE|',
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				valueA: '___$1___',
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen',
				valueB: 'frequentlyAskedQuestionErrorHeader|SYSTEM_FAILURE'
			}
		],
		component: ['CASHFLOW_OFFERS_FREQUENTLY_ASKED_QUESTIONS'],
		name: 'Kill Switch -frequentlyAskedQuestionErrorHeader|SYSTEM_FAILURE'
	},
	{
		eventType: ['communication'],
		destinations: ['blockEvent'],
		name: 'Kill Switch- (?i)(^planOptionIdError\\|MISSING_MANDATORY_DATA|^c',
		component: ['SELECT_ACCOUNT'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				value: '___$1___',
				type: 'RegexCheck',
				regex:
					'(?i)(^planOptionIdError\\|MISSING_MANDATORY_DATA|^companyIdsError\\|MISSING_MANDATORY_DATA|^accountIdError\\|MISSING_MANDATORY_DATA|^selectAccountErrorHeader\\|SYSTEM_FAILURE)',
				noMatch: 'false',
				match: 'true'
			}
		]
	},
	{
		component: ['LOGON_IDENTIFICATION'],
		name: 'Kill Switch - logonIdentificationErrorHeader|IDENTIFICATION_INV',
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				]
			},
			{
				valueB: 'logonIdentificationErrorHeader|IDENTIFICATION_INVALID',
				valueA: '___$1___',
				notEqual: 'false',
				type: 'IfThen',
				equal: 'true'
			}
		],
		eventType: ['communication'],
		destinations: ['blockEvent']
	},
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				valueB: 'requestDocumentErrorHeader|SYSTEM_FAILURE',
				notEqual: 'false',
				equal: 'true',
				type: 'IfThen',
				valueA: '___$1___'
			}
		],
		component: ['REQUEST_DOCUMENT'],
		name: 'Kill Switch - requestDocumentErrorHeader|SYSTEM_FAILURE'
	},
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				valueB: 'investmentAccountValueErrorHeader|SYSTEM_FAILURE',
				valueA: '___$1___',
				notEqual: 'false',
				equal: 'true',
				type: 'IfThen'
			}
		],
		name: 'Kill Switch - investmentAccountValueErrorHeader|SYSTEM_FAILURE',
		component: ['INVESTMENT_ACCOUNT_VALUE']
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				valueA: '___$1___',
				notEqual: 'false',
				equal: 'true',
				type: 'IfThen',
				valueB: 'thresholdFluctuationDescriptionError|MISSING_MANDATORY_DATA'
			}
		],
		name: 'Kill Switch - thresholdFluctuationDescriptionError|MISSING_MAND',
		component: ['ACH_COLLECTIONS_COMPANY_QUESTIONNAIRE'],
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		eventType: ['communication'],
		destinations: ['blockEvent'],
		name: 'Kill Switch - (?i)(^transactionAmountError\\|INVALID_FORMAT|^tra',
		component: ['TRANSFER_MONEY'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				value: '___$1___',
				type: 'RegexCheck',
				noMatch: 'false',
				regex:
					'(?i)(^transactionAmountError\\|INVALID_FORMAT|^transactionInitiationDateError\\|MISSING_MANDATORY_DATA)',
				match: 'true'
			}
		]
	},
	{
		eventType: ['communication'],
		destinations: ['blockEvent'],
		name: 'Kill Switch -(^accountSummaryErrorHeader\\|SYSTEM_FAILURE|^accou',
		component: ['ASSETS_AND_LIABILITIES_OVERVIEW'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				]
			},
			{
				type: 'RegexCheck',
				value: '___$1___',
				match: 'true',
				noMatch: 'false',
				regex:
					'(?i)(^accountSummaryErrorHeader\\|SYSTEM_FAILURE|^accountCommunicationHeader\\|PAST_DUE_61_TO_120_DAYS_CLOSED|^accountCommunicationAdvisory\\|PAST_DUE_61_TO_120_DAYS_CLOSED|^accountCommunicationHeader\\|ACCOUNT_CLOSED|^accountCommunicationAdvisory\\|ACCOUNT_CL'
			}
		]
	},
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				]
			},
			{
				notEqual: 'false',
				type: 'IfThen',
				equal: 'true',
				valueA: '___$1___',
				valueB: 'affiliationsErrorHeader|COMPANY_NOT_LISTED'
			}
		],
		name: 'Kill Switch - affiliationsErrorHeader|COMPANY_NOT_LISTED',
		component: ['INCOME_AND_WEALTH_DETAILS']
	},
	{
		component: ['NAVIGATION_ADVISORY'],
		name: 'Kill Switch - navigationAdvisoryError|MISSING_MANDATORY_DATA',
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				valueB: 'navigationAdvisoryError|MISSING_MANDATORY_DATA',
				valueA: '___$1___',
				notEqual: 'false',
				type: 'IfThen',
				equal: 'true'
			}
		],
		eventType: ['communication'],
		destinations: ['blockEvent']
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				value: '___$1___',
				type: 'RegexCheck',
				noMatch: 'false',
				regex:
					'(?i)(^mailingAddressLineOneError\\|MISSING_MANDATORY_DATA|^cityError\\|INVALID_FORMAT|^zipCodeError\\|INVALID_FORMAT|^stateIdError\\|MISSING_MANDATORY_DATA)',
				match: 'true'
			}
		],
		name: 'Kill Switch - (?i)(^mailingAddressLineOneError\\|MISSING_MANDATO',
		component: ['UPDATE_MAILING_ADDRESS'],
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				]
			},
			{
				valueA: '___$1___',
				notEqual: 'false',
				type: 'IfThen',
				equal: 'true',
				valueB: 'rateLockDescriptionOptionIdError|MISSING_MANDATORY_DATA'
			}
		],
		component: ['HELOC_REQUEST_RATE_LOCK'],
		name: 'Kill Switch - rateLockDescriptionOptionIdError|MISSING_MANDATOR',
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				type: 'RegexCheck',
				value: '___$1___',
				match: 'true',
				regex:
					'(?i)(^transferToAccountIdError\\|MISSING_MANDATORY_DATA|^transferAmountError\\|INVALID_FORMAT)',
				noMatch: 'false'
			}
		],
		component: ['BUSINESS_LINE_OF_CREDIT_TRANSFER'],
		name: 'Kill Switch - (?i)(^transferToAccountIdError\\|MISSING_MANDATORY'
	},
	{
		name: 'Kill Switch - STOCK_OR_ETF_NOT_MATCHED',
		component: ['INVESTMENT_ASSET_SYMBOL_LOOKUP'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				valueB: 'assetSymbolSearchQueryError|STOCK_OR_ETF_NOT_MATCHED',
				notEqual: 'false',
				type: 'IfThen',
				equal: 'true',
				valueA: '___$1___'
			}
		],
		eventType: ['communication'],
		destinations: ['blockEvent']
	},
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				]
			},
			{
				valueB: 'accountNumberError|MISSING_MANDATORY_DATA',
				valueA: '___$1___',
				notEqual: 'false',
				type: 'IfThen',
				equal: 'true'
			}
		],
		name: 'Kill Switch -accountNumberError|MISSING_MANDATORY_DATA',
		component: ['ADD_EXTERNAL_ACCOUNT']
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				match: 'true',
				noMatch: 'false',
				regex:
					'(?i)(^cityError\\|MISSING_MANDATORY_DATA|^stateIdError\\|MISSING_MANDATORY_DATA|^phoneNumberError\\|INVALID_FORMAT)',
				type: 'RegexCheck',
				value: '___$1___'
			}
		],
		component: ['TRUSTED_CONTACT'],
		name: 'Kill Switch - (?i)(^cityError\\|MISSING_MANDATORY_DATA|^stateIdE',
		destinations: ['blockEvent'],
		eventType: ['communication']
	},
	{
		component: ['MY_PROFILE_PHONE_NUMBER'],
		name: 'Kill Switch - phoneNumberError|MISSING_MANDATORY_DATA,phoneNumb',
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				type: 'RegexCheck',
				value: '___$1___',
				match: 'true',
				noMatch: 'false',
				regex:
					'(?i)(^phoneNumberError\\|MISSING_MANDATORY_DATA|^phoneNumberError\\|INVALID_INTERNATIONAL_PHONE|^phoneNumberError\\|INVALID_FORMAT)'
			}
		],
		eventType: ['communication'],
		destinations: ['blockEvent']
	},
	{
		eventType: ['communication'],
		destinations: ['blockEvent'],
		name: 'Kill Switch - firstNameError|MISSING_MANDATORY_DATA',
		component: ['PERSONAL_NAME'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				]
			},
			{
				valueA: '___$1___',
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen',
				valueB: 'firstNameError|MISSING_MANDATORY_DATA'
			}
		]
	},
	{
		name: 'Kill Switch - ^accountSummaryErrorHeader\\|SYSTEM_FAILURE|^accou',
		component: ['ACCOUNT_SUMMARY'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				value: '___$1___',
				type: 'RegexCheck',
				regex:
					'(?i)(^accountcommunicationheader\\|system_failure\\|^accountCommunicationMessage\\|PAST_DUE_LESS_THAN_90|^accountSummaryErrorHeader\\|SYSTEM_FAILURE)',
				noMatch: 'false',
				match: 'true'
			}
		],
		eventType: ['communication'],
		destinations: ['blockEvent']
	},
	{
		eventType: ['communication'],
		destinations: ['blockEvent'],
		name: 'Kill Switch - accountBalanceOverviewErrorHeader',
		component: ['ACCOUNT_BALANCE_OVERVIEW'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				type: 'IfThen',
				notEqual: 'false',
				equal: 'true',
				valueA: '___$1___',
				valueB: 'accountBalanceOverviewErrorHeader|SYSTEM_FAILURE'
			}
		]
	},
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.variation'
				],
				type: 'Concatenate'
			},
			{
				valueA: '___$1___',
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen',
				valueB: 'disclosuresErrorHeader|AGREEMENTS_NOT_CONSENTED'
			}
		],
		component: ['DISCLOSURES'],
		name: 'Kill Switch - disclosuresErrorHeader|AGREEMENTS_NOT_CONSENTED'
	},
	{
		eventType: ['mobileEvent'],
		destinations: ['blockEvent'],
		name: 'Kill Switch - Cardylytics Mobile impressions',
		screen: '.*',
		instructions: [
			{
				match: 'true',
				regex: '.*cdlx.*',
				noMatch: 'false',
				type: 'RegexCheck',
				value:
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.placementId'
			}
		]
	},
	{
		destinations: ['blockEvent'],
		eventType: ['action'],
		instructions: [
			{
				valueA: 'packet.event.payload.data.videoId.value',
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen',
				valueB: ''
			}
		],
		action: '(?i)(.*video.*)',
		name: 'Kill switch - Video events without Video id'
	},
	{
		instructions: [
			{
				value:
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.placementId',
				type: 'RegexCheck',
				noMatch: 'false',
				regex: '.*cdlx.*',
				match: 'true'
			}
		],
		screen: '.*',
		name: 'Kill Switch - Mobile Cardlytics action events',
		destinations: ['blockEvent'],
		eventType: ['mobileAction']
	},
	{
		instructions: [
			{
				match: 'true',
				regex:
					'(?i)(.*KTXN.*|.*KHTE.*|.*ThousandEyes.*|.*burpcollaborator.*|.*CVManaged.*|.*dejaclick\\/.*|.*BrandVerity.*|.*spider.*|.*AdsBot.Google.*|.*googlebot.*|.*HeadlessChrome\\/.*|.*adbeat.*|.*Yeti\\/.*|.*Wappalyzer.*|.*SkypeUriPreview.*)',
				noMatch: 'false',
				type: 'RegexCheck',
				value: 'packet.event.payload.data.device.userAgent'
			}
		],
		name: 'Kill Switch - Internal Bots Mobile',
		screen: '.*',
		destinations: ['blockEvent'],
		eventType: ['mobileAction', 'mobileEvent']
	},
	{
		destinations: ['blockEvent'],
		subType: ['formField'],
		eventType: ['publicAction'],
		instructions: [
			{
				noMatch: 'false',
				regex: '(?i)(.*uCCB4uC774uC2A4.*|.*uFEFFuFEFF.*|.*uFEFFu200B.*)',
				match: 'true',
				value: 'packet.event.payload.data.formName',
				type: 'RegexCheck'
			}
		],
		name: 'Kill Switch - wrongly formatted form names in public'
	},
	{
		destinations: ['blockEvent'],
		eventType: ['interaction'],
		instructions: [
			{
				valueB: 'UPDATE_IP_SECURITY',
				equal: 'true',
				notEqual: 'false',
				type: 'IfThen',
				valueA: 'packet.event.component'
			}
		],
		name: 'Kill Rule - Form Interactions on Update_IP_Security'
	},
	{
		eventType: ['mobileEvent'],
		destinations: ['blockEvent'],
		name: 'Kill Switch- on Ad Status Mobile event',
		instructions: [
			{
				valueA:
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.status',
				type: 'IfThen',
				notEqual: 'true',
				equal: 'false',
				valueB: 'adImpression'
			},
			{
				valueB: '',
				notEqual: '___$1___',
				equal: 'false',
				type: 'IfThen',
				valueA:
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.status'
			}
		]
	},
	{
		instructions: [
			{
				valueB: '',
				notEqual: 'false',
				type: 'IfThen',
				equal: 'true',
				valueA: 'packet.event.component'
			}
		],
		screen: '.*',
		name: 'Kill switch - Forms with empty form name / component',
		destinations: ['blockEvent'],
		eventType: ['interaction']
	},
	{
		instructions: [{ type: 'Concatenate', sources: ['true'] }],
		action: ['ManageErrors.reviewDepositCheckOverLimitInlineError'],
		name: 'Kill Switch - Mobile Communication Temp Action Event',
		component: ['DEPOSIT_CHECK'],
		destinations: ['blockEvent'],
		eventType: ['mobileAction']
	},
	{
		component: [
			'ACH_PAYEES',
			'ASSETS_AND_LIABILITIES_OVERVIEW',
			'PAPERLESS_INTERSTITIAL_SPECIAL_OFFERS',
			'SCHEDULE_MULTIPLE_PAYMENTS'
		],
		name: 'Kill Switch on Forms with Bad Form Steps (interaction)',
		instructions: [{ type: 'Concatenate', sources: ['true'] }],
		eventType: ['interaction'],
		destinations: ['blockEvent']
	},
	{
		destinations: ['blockEvent'],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		],
		instructions: [
			{
				type: 'RegexCheck',
				value: 'packet.event.screen.referrerUrl',
				match: 'true',
				regex:
					'(?i)(.*dev.*secure01a.cig.chase.com.*|.*dev.*secure01a.chase.com.*|.*istp.*secure01a.chase.com.*|.*istp.*secure01a.cig.chase.com.*|.*qap.*secure01a.chase.com.*|.*qap.*secure01a.cig.chase.com.*|.*load.*secure.digital.chase.com.*)',
				noMatch: 'false'
			}
		],
		name: 'Kill Switch - Kill Public Events with QA Referrer URL'
	},
	{
		instructions: [
			{
				match: 'Android_browser',
				regex: '(?i)(.*Android.*)',
				noMatch: '',
				type: 'RegexCheck',
				value: 'packet.event.payload.data.device.userAgent'
			},
			{
				type: 'RegexCheck',
				value: 'packet.event.screen.url',
				match: 'blocked',
				regex: '(?i)(^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}$)',
				noMatch: ''
			},
			{ type: 'Concatenate', sources: ['___$1___', '_', '___$2___'] },
			{
				notEqual: 'false',
				type: 'IfThen',
				equal: 'true',
				valueA: '___$3___',
				valueB: 'Android_browser_blocked'
			}
		],
		name: 'Kill Android browser search events',
		subType: ['screen', 'dynamicLinks'],
		destinations: ['blockEvent'],
		eventType: ['publicEvent', 'publicAction']
	},
	{
		component: ['APPLICATION_FLYOUT', 'MAKE_WIRE_TRANSFER'],
		name: 'Kill Switch - Action Exit Task-components Application flyout an',
		action: ['exitTask'],
		instructions: [{ sources: ['true'], type: 'Concatenate' }],
		eventType: ['action'],
		destinations: ['blockEvent']
	},
	{
		action: ['requestAccountDisclosures'],
		instructions: [{ sources: ['true'], type: 'Concatenate' }],
		component: ['ACCOUNT_SUMMARY'],
		name: 'Kill Switch - account_summary -requestaccountdisclosures',
		destinations: ['blockEvent'],
		eventType: ['action']
	},
	{
		destinations: ['blockEvent'],
		eventType: ['action'],
		instructions: [{ type: 'Concatenate', sources: ['true'] }],
		action: [
			'clearSearchFor',
			'exitOnlineBankingMenu',
			'filterBy',
			'requestBankAccounts',
			'requestCategoryOptions',
			'requestDefaultSearchOptions',
			'requestDefaultSearchOptionsResult',
			'requestEarlyMonthOnBooks',
			'requestEnhancedTransactionDetails',
			'requestTypeAheadSearchOptions',
			'updateDateRange',
			'updateTotalTransactionAmount'
		],
		name: 'Kill Switch -Actions'
	},
	{
		instructions: [
			{
				valueB: '',
				valueA: 'packet.event.payload.data.conversationMessageType.value',
				notEqual: 'false',
				type: 'IfThen',
				equal: 'true'
			}
		],
		action:
			'(?i)(exitConversationMessage|requestConversationMessageActions.*|selectConversationMessageAction)',
		name: 'Kill Switch - Conversation message blank message type',
		component: ['CUSTOMER_CONVERSATION_MESSAGES'],
		destinations: ['blockEvent'],
		eventType: ['action']
	},
	{
		instructions: [
			{
				value: 'packet.headers.user-agent',
				type: 'RegexCheck',
				noMatch: 'false',
				regex:
					'(?i)(.*KTXN.*|.*KHTE.*|.*ThousandEyes.*|.*burpcollaborator.*|.*CVManaged.*|.*dejaclick\\/.*|.*BrandVerity.*|.*spider.*|.*AdsBot.Google.*|.*googlebot.*|.*HeadlessChrome\\/.*|.*adbeat.*|.*Yeti\\/.*|.*Wappalyzer.*|.*SkypeUriPreview.*)',
				match: 'true'
			}
		],
		name: 'Kill Switch - internal Bots CXO and Classic',
		screen: '.*',
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		destinations: ['blockEvent'],
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'personalizationImpression',
			'publicEvent'
		]
	},
	{
		instructions: [
			{
				match: 'true',
				regex: '(?i)(.+TESTPROFILE.true.*)',
				noMatch: 'false',
				type: 'RegexCheck',
				value: 'packet.event.visitor.adobeData'
			}
		],
		name: 'Kill Switch - Test Profile ID traffic',
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		destinations: ['blockEvent'],
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'personalizationImpression',
			'publicEvent'
		]
	},
	{
		eventType: ['mobileEvent'],
		destinations: ['blockEvent'],
		name: 'Mobile - MobileEvent - kill_switch - Kill data collection searc',
		instructions: [
			{
				valueA:
					'packet.event.payload.data.model.SearchItems.searchResult.searchFor',
				notEqual: 'false',
				equal: 'true',
				type: 'IfThen',
				valueB: ''
			},
			{
				valueA: 'packet.event.payload.data.type',
				type: 'IfThen',
				notEqual: 'false',
				equal: '___$1___',
				valueB: '(?i)(datacollection)'
			}
		]
	},
	{
		name: 'Mobile - Kill Switch - Kill Simulator traffic',
		instructions: [
			{
				value: 'packet.headers.user-agent',
				type: 'RegexCheck',
				noMatch: 'false',
				regex: '(?i)(.*simulator.*)',
				match: 'true'
			}
		],
		eventType: ['mobileAction', 'mobileEvent'],
		destinations: ['blockEvent']
	},
	{
		eventType: ['action', 'adImpression'],
		destinations: ['blockEvent'],
		screen: '.*',
		name: 'Kill Switch - Web Cardlytics Ad impressions',
		instructions: [
			{
				value: 'packet.event.payload.data.advertisementPlacementId.value',
				type: 'RegexCheck',
				noMatch: 'false',
				regex: '.*cardlytics.*',
				match: 'true'
			}
		]
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.model.ManageQuickActions.personalizationEvent.elementName',
					'packet.event.payload.data.model.ReviewFinancialHealth.personalizationEvent.elementName',
					'packet.event.payload.data.model.ReviewNudge.personalizationEvent.elementName',
					'packet.event.payload.data.model.ReviewInsight.personalizationEvent.elementName'
				],
				type: 'Concatenate'
			},
			{
				notEqual: 'false',
				type: 'IfThen',
				equal: 'true',
				valueA: '___$1___',
				valueB: ''
			},
			{
				type: 'RegexCheck',
				value: 'packet.event.payload.data.type',
				match: '___$2___',
				noMatch: 'false',
				regex: '(?i)(impressionevent)'
			}
		],
		name: 'Kill Switch - kill mobile empty name pers impr events ',
		destinations: ['blockEvent'],
		eventType: ['mobileEvent']
	},
	{
		eventType: ['mobileEvent'],
		destinations: ['blockEvent'],
		name: 'Kill Switch - kill mobile empty product pers impr events Temp B',
		instructions: [
			{
				sources: [
					'packet.event.payload.data.model.ManageQuickActions.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewFinancialHealth.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewPersonalizedInvestment.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewNudge.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewInsight.personalizationEvent.product'
				],
				type: 'Concatenate'
			},
			{
				type: 'RegexCheck',
				value: '___$1___',
				match: 'false',
				noMatch: 'true',
				regex:
					'(?i)(snapshot|quickaction|nudge|financialhealthcarousel|prospect_investments_experience)'
			},
			{
				type: 'RegexCheck',
				value: 'packet.event.payload.data.type',
				match: '___$2___',
				regex: '(?i)(impressionevent)',
				noMatch: 'false'
			}
		]
	},
	{
		name: 'Kill Switch - Ultimaterewards',
		screen:
			'(?i)(.*dininguat.chase.com.*|.*ultimaterewardspointsuat.chase.com.*|.*ultimaterewardstraveldv.chase.com.*)',
		instructions: [{ sources: ['true'], type: 'Concatenate' }],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		],
		destinations: ['blockEvent'],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		]
	},
	{
		destinations: ['blockEvent'],
		eventType: ['personalizationImpression'],
		instructions: [
			{
				type: 'RegexCheck',
				value: 'packet.event.payload.data.tntPersonalizationData.product',
				match: 'false',
				noMatch: 'true',
				regex: '(?i)(tnt)'
			},
			{
				type: 'RegexCheck',
				value: 'packet.event.payload.data.personalizationData.product',
				match: 'false',
				noMatch: '___$1___',
				regex: '(?i)(ovd_rhr_widgets)'
			}
		],
		name: 'Mobile - Pers_Impr - kill_switch - Kills all Non-TNT'
	},
	{
		eventType: ['impression'],
		name: 'Rule052',
		destinations: ['eVar7', 'prop7'],
		instructions: [{ type: 'Concatenate', sources: ['video impression'] }]
	},
	{
		name: 'Rule063',
		destinations: ['linkName'],
		eventType: ['impression'],
		instructions: [{ type: 'Concatenate', sources: ['video impression'] }]
	},
	{
		instructions: [
			{
				valueB: 'change',
				equal: 'form field',
				notEqual: '',
				valueA: 'packet.event.payload.interaction',
				type: 'IfThen'
			}
		],
		destinations: ['eVar7', 'prop7'],
		name: 'Rule049',
		eventType: ['interaction']
	},
	{
		eventType: ['interaction'],
		name: 'Rule061 New',
		destinations: ['linkName'],
		instructions: [
			{
				valueA: 'packet.event.payload.interaction',
				type: 'IfThen',
				valueB: 'change',
				equal: 'form field interaction',
				notEqual: ''
			}
		]
	},
	{
		name: 'Rule081 new',
		destinations: ['events'],
		eventType: ['interaction'],
		instructions: [
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.interaction',
				valueB: 'change',
				notEqual: '',
				equal: 'event6'
			}
		]
	},
	{
		name: 'Rule111',
		destinations: ['events'],
		eventType: ['impression'],
		instructions: [{ sources: ['event36'], type: 'Concatenate' }]
	},
	{
		instructions: [
			{
				valueA: 'packet.event.payload.data.searchResultFeedback.value',
				type: 'IfThen',
				equal: 'packet.event.payload.action',
				notEqual: '',
				valueB: ''
			},
			{
				valueB: '',
				equal: '',
				notEqual: '___$1___',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.searchFor.value'
			}
		],
		destinations: ['eVar15', 'prop15'],
		name: 'V15, C15',
		eventType: ['action']
	},
	{
		name: 'Rule036',
		destinations: ['prop7', 'eVar7'],
		eventType: ['screen'],
		instructions: [
			{ type: 'Concatenate', sources: ['packet.event.payload.eventType'] }
		]
	},
	{
		name: 'Search ResultID',
		destinations: ['eVar14', 'prop14'],
		eventType: ['dataCollection'],
		instructions: [
			{
				sources: ['packet.event.payload.data.properties[2].searchResultId'],
				type: 'Concatenate'
			}
		]
	},
	{
		eventType: ['dataCollection'],
		destinations: ['eVar21', 'prop21'],
		name: 'Search Type',
		instructions: [
			{
				sources: ['packet.event.payload.data.properties[0].searchType'],
				type: 'Concatenate'
			}
		]
	},
	{
		instructions: [
			{
				notEqual: 'event4',
				equal: 'event2',
				valueB: '',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.properties[1].searchFor'
			}
		],
		eventType: ['dataCollection'],
		destinations: ['events'],
		name: 'Datacollection events'
	},
	{
		instructions: [
			{
				notEqual: '',
				equal: 'conversation message interaction',
				valueB: 'CUSTOMER_CONVERSATION_MESSAGES',
				type: 'IfThen',
				valueA: 'packet.event.component'
			},
			{
				match: 'conversation message impression',
				noMatch: '___$1___',
				type: 'RegexCheck',
				regex: '(.[0-9]*)',
				value: 'packet.event.payload.data.placement'
			},
			{
				valueA: 'packet.event.payload.data.placement',
				type: 'IfThen',
				valueB: 'tooltipelementselector',
				equal: 'tooltip impression',
				notEqual: '___$2___'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.component',
				equal: 'site message impression',
				notEqual: '___$3___',
				valueB: 'customer_site_messages'
			},
			{
				valueB: 'loan_application',
				equal: 'conversation message impression',
				notEqual: '___$4___',
				valueA: 'packet.event.component',
				type: 'IfThen'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.component',
				valueB: 'Customer_Greetings',
				notEqual: '___$5___',
				equal: 'Customer Greeting Impression'
			}
		],
		eventType: ['simpleDecisionedContent'],
		destinations: ['linkName', 'eVar7', 'prop7'],
		name: 'Simple Decision Event Types new'
	},
	{
		destinations: ['events'],
		name: 'Simple Decision Event events new',
		eventType: ['simpleDecisionedContent'],
		instructions: [
			{
				valueA: 'packet.event.component',
				type: 'IfThen',
				notEqual: '',
				equal: 'event44',
				valueB: 'CUSTOMER_CONVERSATION_MESSAGES'
			},
			{
				match: 'event43',
				noMatch: '___$1___',
				regex: '(.[0-9]*)',
				type: 'RegexCheck',
				value: 'packet.event.payload.data.placement'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.placement',
				notEqual: '___$2___',
				equal: 'event46',
				valueB: 'tooltipelementselector'
			},
			{
				equal: 'event45',
				notEqual: '___$3___',
				valueB: 'customer_site_messages',
				type: 'IfThen',
				valueA: 'packet.event.component'
			},
			{
				notEqual: '___$4___',
				equal: 'event43',
				valueB: 'loan_application',
				valueA: 'packet.event.component',
				type: 'IfThen'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.component',
				equal: '',
				notEqual: '___$5___',
				valueB: 'Customer_Greetings'
			}
		]
	},
	{
		instructions: [
			{
				valueA: 'packet.event.payload.data.variation',
				type: 'IfThen',
				valueB: 'SYSTEM_FAILURE',
				equal: 'error',
				notEqual: 'notification'
			},
			{
				regex: '(?i)(.*error.*)',
				value: 'packet.event.payload.data.placement',
				type: 'RegexCheck',
				match: 'error',
				noMatch: '___$1___'
			}
		],
		destinations: ['eVar7', 'prop7', 'linkName'],
		name: 'Communication events error notification new',
		eventType: ['communication']
	},
	{
		instructions: [
			{
				valueB: 'SYSTEM_FAILURE',
				equal: 'event27',
				notEqual: 'event29',
				valueA: 'packet.event.payload.data.variation',
				type: 'IfThen'
			},
			{
				match: 'event27',
				noMatch: '___$1___',
				type: 'RegexCheck',
				regex: '(?i)(.*error.*)',
				value: 'packet.event.payload.data.placement'
			}
		],
		eventType: ['communication'],
		destinations: ['events'],
		name: 'Communication events event27 29 new'
	},
	{
		instructions: [
			{
				substring: 'x',
				type: 'SubstringBefore',
				value: 'packet.event.payload.data.device.screenRes'
			}
		],
		name: 'Rule006 BW Mobile',
		destinations: ['browserWidth'],
		eventType: ['mobileAction', 'mobileEvent']
	},
	{
		name: 'Rule006 BH Mobile',
		destinations: ['browserHeight'],
		eventType: ['mobileAction', 'mobileEvent'],
		instructions: [
			{
				substring: 'x',
				value: 'packet.event.payload.data.device.screenRes',
				type: 'SubstringAfter'
			}
		]
	},
	{
		instructions: [
			{
				sources: ['packet.event.payload.data.screenName'],
				type: 'ToLowerCase'
			},
			{ sources: ['https://apps.chase.com/', '___$1___'], type: 'Concatenate' }
		],
		eventType: ['mobileAction', 'mobileEvent'],
		name: 'Rule013 018',
		destinations: ['pageURL', 'eVar2', 'prop2']
	},
	{
		destinations: ['eVar1', 'prop1', 'screen'],
		name: 'Rule013 014',
		eventType: ['mobileAction', 'mobileEvent'],
		instructions: [
			{
				sources: ['packet.event.payload.data.screenName'],
				type: 'ToLowerCase'
			},
			{ sources: ['apps.chase.com/', '___$1___'], type: 'Concatenate' }
		]
	},
	{
		instructions: [
			{
				type: 'ToLowerCase',
				sources: ['packet.event.payload.data.referrerName']
			},
			{ sources: ['https://apps.chase.com/', '___$1___'], type: 'Concatenate' }
		],
		eventType: ['mobileAction', 'mobileEvent'],
		destinations: ['referrer'],
		name: 'Rule019'
	},
	{
		eventType: ['mobileAction', 'mobileEvent'],
		destinations: ['eVar101'],
		name: 'Rule016 017',
		instructions: [
			{
				type: 'ToLowerCase',
				sources: ['packet.event.payload.data.referrerName']
			},
			{ type: 'Concatenate', sources: ['apps.chase.com/', '___$1___'] }
		]
	},
	{
		instructions: [
			{
				notEqual: 'apps.chase.com',
				equal: '',
				valueB: '',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.screenName'
			}
		],
		eventType: ['mobileAction', 'mobileEvent'],
		name: 'Rule015',
		destinations: ['eVar56']
	},
	{
		instructions: [
			{
				equal: 'unknwn',
				notEqual: 'knwn',
				valueB: '',
				type: 'IfThen',
				valueA: 'packet.event.visitor.profileId'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.visitor.eci',
				valueB: '',
				equal: '___$1___',
				notEqual: 'knwn'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.visitor.rememberMe',
				notEqual: '___$2___',
				equal: 'knwn_rmbrme',
				valueB: 'true'
			}
		],
		name: 'VisitorType - Mobile',
		destinations: ['eVar13', 'prop13'],
		eventType: ['mobileAction', 'mobileEvent']
	},
	{
		destinations: ['eVar3', 'prop3'],
		name: 'evar3 and prop3 (mobile)',
		eventType: ['mobileAction'],
		instructions: [
			{ sources: ['packet.event.payload.data.action'], type: 'Concatenate' }
		]
	},
	{
		instructions: [
			{ sources: ['packet.event.payload.action'], type: 'Concatenate' }
		],
		action:
			'(?i)(.*pdf|csv|excel.*|.*print.*|^download.*|^request.*documents?$)',
		eventType: ['action'],
		name: 'Document Download v20/c20',
		destinations: ['eVar20', 'prop20']
	},
	{
		eventType: ['mobileEvent'],
		destinations: ['linkType'],
		name: 'Rule027 - LinkType Mobile Event',
		instructions: [
			{
				valueB: 'screen',
				notEqual: 'lnk_o',
				equal: '',
				valueA: 'packet.event.payload.data.type',
				type: 'IfThen'
			}
		]
	},
	{
		name: 'Rule027 - LinkType Mobile Action',
		destinations: ['linkType'],
		eventType: ['mobileAction'],
		instructions: [
			{
				noMatch: 'lnk_o',
				match: 'lnk_d',
				type: 'RegexCheck',
				regex: '(?i)(^reviewaccountdocuments.*)',
				value: 'packet.event.payload.data.action'
			},
			{
				noMatch: '___$1___',
				match: 'lnk_e',
				value: 'packet.event.payload.data.action',
				regex: '(?i)(ManageSoftwareSettings.exitSoftware)',
				type: 'RegexCheck'
			}
		]
	},
	{
		name: 'LinkURL - Mobile Non Screen Events',
		destinations: ['linkURL'],
		eventType: ['mobileAction', 'mobileEvent'],
		instructions: [
			{
				valueB: 'screen',
				notEqual: 'https://undefined.destinationurl.com',
				equal: '',
				valueA: 'packet.event.payload.data.type',
				type: 'IfThen'
			}
		]
	},
	{
		eventType: ['mobileAction', 'mobileEvent'],
		destinations: ['language'],
		name: 'Language - Mobile',
		instructions: [
			{ type: 'Concatenate', sources: ['packet.event.app.language'] }
		]
	},
	{
		eventType: ['action'],
		destinations: ['eVar22', 'prop22'],
		name: 'Exit Link v22/c22 (new) Web',
		action:
			'(?i)(requestchasefacebook|requesttwitter|requestchasetwitter|requestchaselinkedin|requestchaseinstagram|requestchaseyoutube|requestexternalnavigation|request.*website)',
		instructions: [
			{ sources: ['packet.event.payload.action'], type: 'Concatenate' }
		]
	},
	{
		instructions: [
			{
				equal: 'pv',
				notEqual: 'o',
				valueB: 'screen',
				valueA: 'packet.event.payload.data.type',
				type: 'IfThen'
			},
			{
				noMatch: '___$1___',
				match: 'd',
				regex: '(?i)(^reviewaccountdocuments.*)',
				type: 'RegexCheck',
				value: 'packet.event.payload.data.action'
			},
			{
				value: 'packet.event.payload.data.action',
				regex: '(?i)(ManageSoftwareSettings.exitSoftware)',
				type: 'RegexCheck',
				match: 'e',
				noMatch: '___$2___'
			}
		],
		eventType: ['mobileAction', 'mobileEvent'],
		name: 'Rule025, Rule029, Rule031 - Prop55 Mobile',
		destinations: ['prop55']
	},
	{
		instructions: [{ type: 'Concatenate', sources: ['event47'] }],
		eventType: ['publicEvent'],
		name: 'Rule 163',
		subType: ['hover'],
		destinations: ['events']
	},
	{
		instructions: [{ type: 'Concatenate', sources: ['event48'] }],
		eventType: ['publicEvent'],
		destinations: ['events'],
		name: 'Rule 178',
		subType: ['modal']
	},
	{
		instructions: [{ sources: ['event49'], type: 'Concatenate' }],
		eventType: ['publicAction'],
		name: 'Rule 170',
		subType: ['tab'],
		destinations: ['events']
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.type',
					'-',
					'packet.event.payload.data.modalName'
				]
			}
		],
		eventType: ['publicEvent'],
		destinations: ['linkName'],
		subType: ['modal'],
		name: 'Rule179'
	},
	{
		eventType: ['publicAction'],
		destinations: ['linkName'],
		name: 'Rule181',
		subType: ['tab'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.type',
					'-',
					'packet.event.payload.data.tabName'
				]
			}
		]
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.type',
					'-',
					'packet.event.payload.data.hoverName'
				]
			}
		],
		subType: ['hover'],
		name: 'Rule159',
		destinations: ['linkName'],
		eventType: ['publicEvent']
	},
	{
		eventType: ['publicAction'],
		destinations: ['events'],
		name: 'Rule081',
		subType: ['formField'],
		instructions: [{ sources: ['event6'], type: 'Concatenate' }]
	},
	{
		destinations: ['events'],
		name: 'Rule175',
		subType: ['scroll'],
		eventType: ['publicAction'],
		instructions: [{ type: 'Concatenate', sources: ['event50'] }]
	},
	{
		eventType: ['publicAction'],
		subType: ['scroll'],
		name: 'Rule182',
		destinations: ['linkName'],
		instructions: [{ type: 'Concatenate', sources: ['scroll'] }]
	},
	{
		eventType: ['publicEvent'],
		name: 'Public referrer URL Rule004?,005',
		subType: ['screen'],
		destinations: ['referrer'],
		instructions: [
			{ type: 'ToLowerCase', sources: ['packet.event.screen.referrerUrl'] }
		]
	},
	{
		instructions: [
			{
				substring: 'https://',
				type: 'SubstringAfter',
				value: 'packet.event.screen.url'
			},
			{ type: 'SubstringBefore', substring: '?', value: '___$1___' },
			{ substring: '/', value: '___$2___', type: 'SubstringBefore' }
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		],
		destinations: ['eVar56'],
		name: 'Public domain into evar56 - Rule015,020',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		]
	},
	{
		eventType: ['publicEvent'],
		subType: ['screen'],
		name: 'Public screen event type evar7,prop7 Rule036',
		destinations: ['eVar7', 'prop7'],
		instructions: [{ type: 'Concatenate', sources: ['screen'] }]
	},
	{
		instructions: [{ type: 'Concatenate', sources: ['pv'] }],
		eventType: ['publicEvent'],
		destinations: ['prop55'],
		name: 'Public screen server call type prop55 - Rule024',
		subType: ['screen']
	},
	{
		destinations: ['linkURL'],
		subType: [
			'adImpressions',
			'hover',
			'modal',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		],
		name: 'Public linkURL Rule160',
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		],
		instructions: [
			{ type: 'ToLowerCase', sources: ['packet.event.screen.url'] },
			{ substring: '?', type: 'SubstringBefore', value: '___$1___' },
			{ type: 'SubstringAfter', substring: 'https://', value: '___$2___' }
		]
	},
	{
		instructions: [
			{ type: 'Concatenate', sources: ['packet.event.payload.data.linkName'] }
		],
		eventType: ['publicAction'],
		destinations: ['linkName', 'eVar3', 'prop3'],
		subType: ['dynamicLinks'],
		name: 'Public dynamic link evar3,prop3,linkName'
	},
	{
		instructions: [{ sources: ['event1'], type: 'Concatenate' }],
		subType: ['dynamicLinks'],
		name: 'Public dynamic link event1 Rule076',
		destinations: ['events'],
		eventType: ['publicAction']
	},
	{
		destinations: ['events'],
		name: 'Public exit link event 5 - Rule080',
		subType: ['documentLinks'],
		eventType: ['publicAction'],
		instructions: [{ type: 'Concatenate', sources: ['event5'] }]
	},
	{
		instructions: [{ type: 'Concatenate', sources: ['event28'] }],
		eventType: ['publicAction'],
		name: 'Public exit link event28 - Rule103',
		subType: ['exitLinks'],
		destinations: ['events']
	},
	{
		instructions: [{ sources: ['event9'], type: 'Concatenate' }],
		eventType: ['publicAction'],
		destinations: ['events'],
		subType: ['adClicks'],
		name: 'Public ad click event9 Rule084'
	},
	{
		instructions: [{ sources: ['link click'], type: 'Concatenate' }],
		eventType: ['publicAction'],
		name: 'Public dynamic link link click evar7,prop7',
		subType: ['dynamicLinks'],
		destinations: ['eVar7', 'prop7']
	},
	{
		instructions: [{ sources: ['document download'], type: 'Concatenate' }],
		subType: ['documentLinks'],
		name: 'Public document download evar7,prop7',
		destinations: ['eVar7', 'prop7'],
		eventType: ['publicAction']
	},
	{
		subType: ['exitLinks'],
		name: 'Public exit link evar7,prop7',
		destinations: ['eVar7', 'prop7'],
		eventType: ['publicAction'],
		instructions: [{ type: 'Concatenate', sources: ['exit link'] }]
	},
	{
		instructions: [{ sources: ['ad click'], type: 'Concatenate' }],
		eventType: ['publicAction'],
		subType: ['adClicks'],
		name: 'Public ad click evar7,prop7',
		destinations: ['eVar7', 'prop7']
	},
	{
		eventType: ['publicAction'],
		destinations: ['eVar7', 'prop7'],
		name: 'Public scroll action evar7,prop7',
		subType: ['scroll'],
		instructions: [{ sources: ['scroll'], type: 'Concatenate' }]
	},
	{
		eventType: ['publicAction'],
		destinations: ['eVar7', 'prop7'],
		name: 'Public tab action evar7,prop7',
		subType: ['tab'],
		instructions: [{ type: 'Concatenate', sources: ['tab'] }]
	},
	{
		name: 'Public linkURL for actions (temporary)',
		subType: ['dynamicLinks', 'documentLinks', 'exitLinks', 'adClicks'],
		destinations: ['linkURL'],
		eventType: ['publicAction', 'publicAction', 'publicAction', 'publicAction'],
		instructions: [
			{ type: 'Concatenate', sources: ['https://undefined.destinationurl.com'] }
		]
	},
	{
		eventType: ['mobileAction'],
		destinations: ['eVar20', 'prop20'],
		name: 'Document Download v20/c20 Mobile',
		action: '(?i)(^reviewaccountdocuments.*)',
		instructions: [
			{ type: 'Concatenate', sources: ['packet.event.payload.data.action'] }
		]
	},
	{
		name: 'Exit Link - Mobile v20/c20',
		destinations: ['eVar22', 'prop22'],
		eventType: ['mobileAction'],
		instructions: [
			{ type: 'Concatenate', sources: ['packet.event.payload.data.action'] }
		],
		action: '(?i)(ManageSoftwareSettings.exitSoftware)'
	},
	{
		subType: ['adImpressions'],
		name: 'Public ad impression linkName,evar7,prop7 Rule033',
		destinations: ['eVar7', 'prop7', 'linkName'],
		eventType: ['publicEvent'],
		instructions: [{ sources: ['ad impression'], type: 'Concatenate' }]
	},
	{
		instructions: [{ type: 'Concatenate', sources: ['hover'] }],
		subType: ['hover'],
		name: 'Hover evar7,prop7',
		destinations: ['eVar7', 'prop7'],
		eventType: ['publicEvent']
	},
	{
		name: 'Public document downloads linkType',
		subType: ['documentLinks'],
		destinations: ['linkType'],
		eventType: ['publicAction'],
		instructions: [{ sources: ['lnk_d'], type: 'Concatenate' }]
	},
	{
		instructions: [{ type: 'Concatenate', sources: ['d'] }],
		eventType: ['publicAction'],
		destinations: ['prop55'],
		subType: ['documentLinks'],
		name: 'Public document downloads prop55'
	},
	{
		instructions: [{ sources: ['lnk_e'], type: 'Concatenate' }],
		eventType: ['publicAction'],
		destinations: ['linkType'],
		name: 'Public exit links linkType',
		subType: ['exitLinks']
	},
	{
		eventType: ['publicAction'],
		name: 'Public exit links prop55',
		subType: ['exitLinks'],
		destinations: ['prop55'],
		instructions: [{ sources: ['e'], type: 'Concatenate' }]
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.type',
					'|',
					'packet.event.payload.data.hoverName',
					'|',
					'packet.event.payload.data.hoverDescription'
				],
				type: 'Concatenate'
			}
		],
		destinations: ['eVar23', 'prop23'],
		name: 'Rule 162',
		subType: ['hover'],
		eventType: ['publicEvent']
	},
	{
		instructions: [
			{
				type: 'SubstringBefore',
				substring: '.',
				value: 'packet.event.location.server_offset'
			},
			{
				sources: ['packet.event.payload.timestamp', '___$1___'],
				type: 'AddInteger'
			},
			{ sources: ['___$2___'], type: 'ConvertMillisecondsToSeconds' }
		],
		eventType: ['mobileAction', 'mobileEvent'],
		name: 'Timestamp -CXO Mobile in Seconds',
		destinations: ['timestamp']
	},
	{
		eventType: ['publicEvent'],
		subType: ['modal'],
		name: 'Rule 177',
		destinations: ['eVar23', 'prop23'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.type',
					'|',
					'packet.event.payload.data.modalName',
					'|',
					'packet.event.payload.data.modalDescription'
				]
			}
		]
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.type',
					'|',
					'packet.event.payload.data.tabDescription',
					'|',
					'packet.event.payload.data.tabName'
				]
			}
		],
		eventType: ['publicAction'],
		subType: ['tab'],
		name: 'Rule 169',
		destinations: ['eVar23', 'prop23']
	},
	{
		subType: ['documentLinks'],
		name: 'Public document download evar20,prop20,linkName',
		destinations: ['linkName', 'eVar3', 'prop3', 'eVar20', 'prop20'],
		eventType: ['publicAction'],
		instructions: [
			{
				type: 'Concatenate',
				sources: ['packet.event.payload.data.documentName']
			}
		]
	},
	{
		instructions: [
			{
				sources: ['packet.event.payload.data.exitLinkName'],
				type: 'Concatenate'
			}
		],
		eventType: ['publicAction'],
		subType: ['exitLinks'],
		name: 'Public exit link evar22,prop22,linkName',
		destinations: ['linkName', 'eVar22', 'prop22', 'eVar3', 'prop3']
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.id',
					'|',
					'packet.event.payload.data.position'
				]
			}
		],
		eventType: ['impression'],
		destinations: ['eVar24', 'prop24'],
		name: 'Rule007 Impression'
	},
	{
		destinations: ['events'],
		name: 'Rule 101,083 - Web',
		eventType: ['adImpression'],
		instructions: [
			{
				valueB: '',
				equal: 'event8,event7=__ads_count__',
				notEqual: 'event8,event26,event7=__ads_count__,event57=__ads_count__',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.failoverReason'
			}
		]
	},
	{
		instructions: [
			{ sources: ['event8,event7=__ads_count__'], type: 'Concatenate' }
		],
		eventType: ['publicEvent'],
		subType: ['adImpressions'],
		name: 'Public ad impression event8 Rule083',
		destinations: ['events']
	},
	{
		instructions: [
			{
				type: 'IfThen',
				valueA:
					'packet.event.payload.data.properties[0].totalConversationMessages',
				notEqual: 'bell badge',
				equal: 'search',
				valueB: ''
			}
		],
		eventType: ['dataCollection'],
		destinations: ['eVar7', 'prop7', 'linkName'],
		name: 'Rule 044- Data collection events'
	},
	{
		instructions: [
			{
				replace: '$1',
				value: 'packet.event.screen.id',
				regex: '(?i).*sourceCode=(.[^&]*)&.*',
				type: 'RegexReplace'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.screen.id',
				valueB: '___$1___',
				equal: '',
				notEqual: '___$1___'
			}
		],
		eventType: ['screen'],
		destinations: ['eVar110'],
		name: 'Source Code Regex'
	},
	{
		instructions: [
			{
				value: 'packet.event.screen.url',
				substring: 'sourcecode=',
				type: 'SubstringAfter'
			},
			{ type: 'SubstringBefore', substring: '&', value: '___$1___' },
			{
				notEqual: '___$2___',
				equal: 'packet.event.payload.data.flexAppSourceCode',
				valueB: '',
				type: 'IfThen',
				valueA: '___$2___'
			}
		],
		eventType: ['publicEvent'],
		destinations: ['eVar110'],
		subType: ['screen'],
		name: 'Public- Source Code'
	},
	{
		eventType: ['publicEvent'],
		name: 'Merchandising-Public-new',
		subType: ['screen'],
		destinations: ['products'],
		instructions: [
			{
				equal: '',
				notEqual: 'packet.event.payload.data.flexAppBrandId',
				valueB: '',
				valueA: 'packet.event.payload.data.flexAppBrandId',
				type: 'IfThen'
			},
			{
				valueB: '',
				notEqual: 'packet.event.payload.data.rewardsProductCode',
				equal: '',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.rewardsProductCode'
			},
			{ sources: ['___$1___', '/', '___$2___', '/', '/'], type: 'Concatenate' },
			{
				equal: '',
				notEqual: 'packet.event.payload.data.scenarioname',
				valueB: '',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.scenarioname'
			},
			{ type: 'Concatenate', sources: ['___$4___', '/', '/', '/'] },
			{
				valueB: '',
				notEqual: '___$3___',
				equal: '___$5___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				match: '___$6___',
				noMatch: '',
				type: 'RegexCheck',
				regex: '(?i)([a0-z9]{1,}\\/.*\\/.*\\/.*)',
				value: '___$6___'
			},
			{
				valueB: '',
				notEqual: 'packet.event.payload.data.cardApplicationId',
				equal: '',
				valueA: 'packet.event.payload.data.cardApplicationId',
				type: 'IfThen'
			},
			{
				valueB: '',
				equal: '___$8___',
				notEqual: 'packet.event.payload.data.oaoId',
				valueA: 'packet.event.payload.data.oaoId',
				type: 'IfThen'
			},
			{
				equal: '',
				notEqual: 'packet.event.payload.data.businessBankingLoanId',
				valueB: '',
				valueA: 'packet.event.payload.data.businessBankingLoanId',
				type: 'IfThen'
			},
			{
				valueB: '',
				equal: '',
				notEqual: 'packet.event.payload.data.careerThankYouPagesUniversalAppId',
				valueA: 'packet.event.payload.data.careerThankYouPagesUniversalAppId',
				type: 'IfThen'
			},
			{ sources: ['eVar67=', '___$11___'], type: 'Concatenate' },
			{
				notEqual: 'packet.event.payload.data.retailCouponCode',
				equal: '',
				valueB: '',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.retailCouponCode'
			},
			{ sources: ['eVar90=', '___$13___'], type: 'Concatenate' },
			{
				equal: '',
				notEqual: 'packet.event.payload.data.flexAppCellCodeId',
				valueB: '',
				valueA: 'packet.event.payload.data.flexAppCellCodeId',
				type: 'IfThen'
			},
			{ sources: ['eVar69=', '___$15___'], type: 'Concatenate' },
			{
				substring: 'sourcecode=',
				type: 'SubstringAfter',
				value: 'packet.event.screen.url'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$17___' },
			{
				valueA: 'packet.event.payload.data.flexAppSourceCode',
				type: 'IfThen',
				notEqual: 'packet.event.payload.data.flexAppSourceCode',
				equal: '',
				valueB: ''
			},
			{ type: 'Concatenate', sources: ['eVar71=', '___$19___'] },
			{
				equal: '',
				notEqual: 'packet.event.payload.data.flexAppProductTemplate',
				valueB: '',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.flexAppProductTemplate'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.flexAppChannelId',
				equal: '',
				notEqual: 'packet.event.payload.data.flexAppChannelId',
				valueB: ''
			},
			{
				valueA: 'packet.event.payload.data.flexAppCardParams',
				type: 'IfThen',
				notEqual: 'packet.event.payload.data.flexAppCardParams',
				equal: '',
				valueB: ''
			},
			{
				equal: '',
				notEqual: 'packet.event.payload.data.flexAppProgramId',
				valueB: '',
				valueA: 'packet.event.payload.data.flexAppProgramId',
				type: 'IfThen'
			},
			{
				valueA: 'packet.event.payload.data.cardRelationship',
				type: 'IfThen',
				valueB: '',
				equal: '',
				notEqual: 'packet.event.payload.data.cardRelationship'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.cardVerification',
				valueB: '',
				equal: '',
				notEqual: 'packet.event.payload.data.cardVerification'
			},
			{
				sources: [
					'___$21___',
					'&&',
					'___$22___',
					'&&',
					'___$23___',
					'&&',
					'___$24___',
					'&&',
					'___$25___',
					'&&',
					'___$26___'
				],
				type: 'Concatenate'
			},
			{
				type: 'SubstringAfter',
				substring: 'offercode=',
				value: 'packet.event.screen.url'
			},
			{ substring: '&', value: '___$28___', type: 'SubstringBefore' },
			{
				notEqual: 'packet.event.payload.data.offerCode',
				equal: '___$29___',
				valueB: '',
				valueA: 'packet.event.payload.data.offerCode',
				type: 'IfThen'
			},
			{
				type: 'Concatenate',
				sources: [
					';',
					'___$7___',
					';',
					'1',
					';;;',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$12___',
					'|',
					'___$14___',
					'|',
					'___$16___',
					'|',
					'___$20___',
					'|',
					'eVar66=',
					'___$27___',
					'|',
					'eVar68=',
					'|',
					'eVar70=',
					'&&',
					'&&',
					'___$30___'
				]
			},
			{
				noMatch: '',
				match: '___$31___',
				type: 'RegexCheck',
				regex: '(?i)(entry|verify)',
				value: 'taxonomy.STAGE'
			},
			{
				sources: [
					';',
					'___$7___',
					'1',
					';;',
					'event25=1',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$12___',
					'|',
					'___$14___',
					'|',
					'___$16___',
					'|',
					'___$20___',
					'|',
					'eVar66=',
					'___$27___',
					'|',
					'eVar68=',
					'|',
					'eVar70=',
					'&&',
					'&&',
					'___$30___'
				],
				type: 'Concatenate'
			},
			{
				valueA: 'taxonomy.STAGE',
				type: 'IfThen',
				equal: '___$33___',
				notEqual: '___$32___',
				valueB: 'Info'
			},
			{
				type: 'Concatenate',
				sources: [
					';',
					'___$7___',
					'1',
					'0',
					';;',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$12___',
					'|',
					'___$14___',
					'|',
					'___$16___',
					'|',
					'___$20___',
					'|',
					'eVar66=',
					'___$27___',
					'|',
					'eVar68=',
					'|',
					'eVar70=',
					'&&',
					'&&',
					'___$30___'
				]
			},
			{
				valueA: 'taxonomy.STAGE',
				type: 'IfThen',
				valueB: 'Complete',
				notEqual: '___$34___',
				equal: '___$35___'
			},
			{
				type: 'Concatenate',
				sources: [
					';',
					'___$7___',
					';;;',
					'event17=1',
					';',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$12___',
					'|',
					'___$14___',
					'|',
					'___$16___',
					'|',
					'___$20___',
					'|',
					'eVar66=',
					'___$27___',
					'|',
					'eVar68=',
					'|',
					'eVar70=',
					'&&',
					'&&',
					'___$30___'
				]
			},
			{
				valueB: 'Pending',
				notEqual: '___$36___',
				equal: '___$37___',
				type: 'IfThen',
				valueA: 'taxonomy.STAGE'
			},
			{
				type: 'Concatenate',
				sources: [
					';',
					'___$7___',
					';;',
					'event18=1',
					';',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$12___',
					'|',
					'___$14___',
					'|',
					'___$16___',
					'|',
					'___$20___',
					'|',
					'eVar66=',
					'___$27___',
					'|',
					'eVar68=',
					'|',
					'eVar70=',
					'&&',
					'&&',
					'___$30___'
				]
			},
			{
				type: 'IfThen',
				valueA: 'taxonomy.STAGE',
				equal: '___$39___',
				notEqual: '___$38___',
				valueB: 'Approved'
			},
			{
				sources: [
					';',
					'___$7___',
					';;;',
					'event19=1',
					';',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$12___',
					'|',
					'___$14___',
					'|',
					'___$16___',
					'|',
					'___$20___',
					'|',
					'eVar66=',
					'___$27___',
					'|',
					'eVar68=',
					'|',
					'eVar70=',
					'&&',
					'&&',
					'___$30___'
				],
				type: 'Concatenate'
			},
			{
				valueB: 'Declined',
				notEqual: '___$40___',
				equal: '___$41___',
				valueA: 'taxonomy.STAGE',
				type: 'IfThen'
			},
			{
				sources: [
					';',
					'___$7___',
					';;;',
					'event20=1',
					';',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$12___',
					'|',
					'___$14___',
					'|',
					'___$16___',
					'|',
					'___$20___',
					'|',
					'eVar66=',
					'___$27___',
					'|',
					'eVar68=',
					'|',
					'eVar70=',
					'&&',
					'&&',
					'___$30___'
				],
				type: 'Concatenate'
			},
			{
				equal: '___$43___',
				notEqual: '___$42___',
				valueB: 'Saved',
				type: 'IfThen',
				valueA: 'taxonomy.STAGE'
			},
			{
				sources: [
					';',
					'___$7___',
					';;;',
					'event21=1',
					';',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$12___',
					'|',
					'___$14___',
					'|',
					'___$16___',
					'|',
					'___$20___',
					'|',
					'eVar66=',
					'___$27___',
					'|',
					'eVar68=',
					'|',
					'eVar70=',
					'&&',
					'&&',
					'___$30___'
				],
				type: 'Concatenate'
			},
			{
				type: 'IfThen',
				valueA: 'taxonomy.STAGE',
				equal: '___$45___',
				notEqual: '___$44___',
				valueB: 'Resume'
			},
			{
				value: 'taxonomy.applicationName',
				regex: '(?i)(origination)',
				type: 'RegexCheck',
				match: '___$46___',
				noMatch: ''
			}
		]
	},
	{
		eventType: ['screen', 'publicEvent'],
		subType: ['BLANK', 'screen'],
		name: 'Merchandising - TransactionID CXO',
		destinations: ['transactionID'],
		instructions: [
			{
				type: 'SubstringAfter',
				substring: 'applicationId=',
				value: 'packet.event.screen.id'
			},
			{ value: '___$1___', substring: '&', type: 'SubstringBefore' },
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.cardApplicationId',
				valueB: '',
				equal: '___$2___',
				notEqual: 'packet.event.payload.data.cardApplicationId'
			},
			{
				valueB: '',
				equal: '___$3___',
				notEqual: 'packet.event.payload.data.oaoId',
				valueA: 'packet.event.payload.data.oaoId',
				type: 'IfThen'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.businessBankingLoanId',
				valueB: '',
				notEqual: 'packet.event.payload.data.businessBankingLoanId',
				equal: '___$4___'
			},
			{
				valueA: 'packet.event.payload.data.careerThankYouPagesUniversalAppId',
				type: 'IfThen',
				valueB: '',
				notEqual: 'packet.event.payload.data.careerThankYouPagesUniversalAppId',
				equal: '___$5___'
			},
			{
				valueB: 'Complete',
				notEqual: '',
				equal: '___$6___',
				type: 'IfThen',
				valueA: 'taxonomy.STAGE'
			},
			{
				noMatch: '',
				match: '___$7___',
				regex: '(?i)(origination)',
				type: 'RegexCheck',
				value: 'taxonomy.applicationName'
			}
		]
	},
	{
		instructions: [
			{
				substring: 'applicationId=',
				type: 'SubstringAfter',
				value: 'packet.event.screen.id'
			},
			{ value: '___$1___', substring: '&', type: 'SubstringBefore' },
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.cardApplicationId',
				valueB: '',
				notEqual: 'packet.event.payload.data.cardApplicationId',
				equal: '___$2___'
			},
			{
				valueB: '',
				notEqual: 'packet.event.payload.data.oaoId',
				equal: '___$3___',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.oaoId'
			},
			{
				valueA: 'packet.event.payload.data.businessBankingLoanId',
				type: 'IfThen',
				notEqual: 'packet.event.payload.data.businessBankingLoanId',
				equal: '___$4___',
				valueB: ''
			},
			{
				valueB: '',
				equal: '___$5___',
				notEqual: 'packet.event.payload.data.careerThankYouPagesUniversalAppId',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.careerThankYouPagesUniversalAppId'
			},
			{
				type: 'IfThen',
				valueA: 'taxonomy.STAGE',
				equal: '___$6___',
				notEqual: '',
				valueB: 'Complete'
			},
			{
				valueA: 'taxonomy.applicationName',
				type: 'IfThen',
				valueB: 'Origination',
				notEqual: '',
				equal: '___$7___'
			},
			{ sources: ['packet.event.payload.timestamp'], type: 'CreateHash' },
			{
				valueA: '___$8___',
				type: 'IfThen',
				valueB: '',
				equal: '',
				notEqual: '___$9___'
			}
		],
		name: 'Merchandising - PurchaseID CXO',
		subType: ['BLANK', 'screen'],
		destinations: ['purchaseID'],
		eventType: ['screen', 'publicEvent']
	},
	{
		destinations: ['eVar96'],
		subType: ['screen'],
		name: 'Set eVar90',
		eventType: ['publicEvent'],
		instructions: [
			{
				type: 'Concatenate',
				sources: ['packet.event.payload.data.retailCouponCode']
			}
		]
	},
	{
		destinations: ['products'],
		name: 'Merchandising Products- CXO',
		eventType: ['screen'],
		instructions: [
			{
				type: 'SubstringAfter',
				substring: 'productCode=',
				value: 'packet.event.screen.id'
			},
			{ type: 'SubstringBefore', substring: '&', value: '___$1___' },
			{
				substring: 'marketingproductcode=',
				type: 'SubstringAfter',
				value: 'packet.event.screen.id'
			},
			{ substring: '&', value: '___$3___', type: 'SubstringBefore' },
			{
				value: 'packet.event.screen.id',
				substring: 'subProductcode=',
				type: 'SubstringAfter'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$5___' },
			{
				substring: 'classCode=',
				type: 'SubstringAfter',
				value: 'packet.event.screen.id'
			},
			{ value: '___$7___', substring: '&', type: 'SubstringBefore' },
			{
				value: 'packet.event.screen.id',
				substring: 'cfgCode=',
				type: 'SubstringAfter'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$9___' },
			{
				valueA: '___$2___',
				type: 'IfThen',
				valueB: '',
				equal: '___$4___',
				notEqual: '___$2___'
			},
			{
				type: 'Concatenate',
				sources: [
					'___$11___',
					'/',
					'___$6___',
					'/',
					'___$8___',
					'/',
					'___$10___'
				]
			},
			{
				type: 'RegexCheck',
				regex: '(?i)([a0-z9]{1,}\\/.*\\/.*\\/.*)',
				value: '___$12___',
				match: '___$12___',
				noMatch: ''
			},
			{
				substring: 'applicationId=',
				type: 'SubstringAfter',
				value: 'packet.event.screen.id'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$14___' },
			{ type: 'Concatenate', sources: ['eVar67=', '___$15___'] },
			{
				type: 'SubstringAfter',
				substring: '&eCouponCode=',
				value: 'packet.event.screen.currentURL'
			},
			{ value: '___$17___', substring: '#', type: 'SubstringBefore' },
			{ type: 'Concatenate', sources: ['eVar90=', '___$18___'] },
			{
				type: 'SubstringAfter',
				substring: 'cellCode=',
				value: 'packet.event.screen.id'
			},
			{ value: '___$20___', substring: '&', type: 'SubstringBefore' },
			{ sources: ['eVar69=', '___$21___'], type: 'Concatenate' },
			{
				substring: 'sourceCode=',
				type: 'SubstringAfter',
				value: 'packet.event.screen.id'
			},
			{ substring: '&', value: '___$23___', type: 'SubstringBefore' },
			{ sources: ['eVar71=', '___$24___'], type: 'Concatenate' },
			{
				substring: 'applicantType=',
				type: 'SubstringAfter',
				value: 'packet.event.screen.id'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$26___' },
			{
				type: 'SubstringAfter',
				substring: 'coApp=',
				value: 'packet.event.screen.id'
			},
			{ substring: '&', value: '___$28___', type: 'SubstringBefore' },
			{
				type: 'SubstringAfter',
				substring: 'loggedIn=',
				value: 'packet.event.screen.id'
			},
			{ value: '___$30___', substring: '&', type: 'SubstringBefore' },
			{
				substring: 'JointLoggedIn=',
				value: 'packet.event.screen.id',
				type: 'SubstringAfter'
			},
			{ value: '___$32___', substring: '&', type: 'SubstringBefore' },
			{
				type: 'Concatenate',
				sources: [
					'eVar68=',
					'___$27___',
					'&&',
					'___$29___',
					'&&',
					'___$31___',
					'&&',
					'___$33___'
				]
			},
			{
				type: 'SubstringAfter',
				substring: 'offerid=',
				value: 'packet.event.screen.id'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$35___' },
			{
				substring: 'offerkey=',
				value: 'packet.event.screen.id',
				type: 'SubstringAfter'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$37___' },
			{
				type: 'SubstringAfter',
				substring: 'offercode=',
				value: 'packet.event.screen.id'
			},
			{ type: 'SubstringBefore', substring: '&', value: '___$39___' },
			{
				type: 'Concatenate',
				sources: [
					';',
					'___$13___',
					';',
					'1',
					';;',
					'event25=1',
					';',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$16___',
					'|',
					'___$19___',
					'|',
					'___$22___',
					'|',
					'___$25___',
					'|',
					'eVar66=',
					'|',
					'___$34___',
					'|',
					'eVar70=',
					'___$36___',
					'&&',
					'___$38___',
					'&&',
					'___$40___',
					'|',
					'eVar89='
				]
			},
			{
				type: 'IfThen',
				valueA: 'taxonomy.STAGE',
				notEqual: '',
				equal: '___$41___',
				valueB: 'Info'
			},
			{
				type: 'Concatenate',
				sources: [
					';',
					'___$13___',
					';',
					'1',
					';',
					'0',
					';;',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$16___',
					'|',
					'___$19___',
					'|',
					'___$22___',
					'|',
					'___$25___',
					'|',
					'eVar66=',
					'|',
					'___$34___',
					'|',
					'eVar70=',
					'___$36___',
					'&&',
					'___$38___',
					'&&',
					'___$40___',
					'|',
					'eVar89='
				]
			},
			{
				notEqual: '___$42___',
				equal: '___$43___',
				valueB: 'Complete',
				valueA: 'taxonomy.STAGE',
				type: 'IfThen'
			},
			{
				sources: [
					';',
					'___$13___',
					';;;',
					'event17=1',
					';',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$16___',
					'|',
					'___$19___',
					'|',
					'___$22___',
					'|',
					'___$25___',
					'|',
					'eVar66=',
					'|',
					'___$34___',
					'|',
					'eVar70=',
					'___$36___',
					'&&',
					'___$38___',
					'&&',
					'___$40___',
					'|',
					'eVar89='
				],
				type: 'Concatenate'
			},
			{
				valueA: 'taxonomy.STAGE',
				type: 'IfThen',
				equal: '___$45___',
				notEqual: '___$44___',
				valueB: 'Pending'
			},
			{
				sources: [
					';',
					'___$13___',
					';;;',
					'event18=1',
					';',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$16___',
					'|',
					'___$19___',
					'|',
					'___$22___',
					'|',
					'___$25___',
					'|',
					'eVar66=',
					'|',
					'___$34___',
					'|',
					'eVar70=',
					'___$36___',
					'&&',
					'___$38___',
					'&&',
					'___$40___',
					'|',
					'eVar89='
				],
				type: 'Concatenate'
			},
			{
				type: 'IfThen',
				valueA: 'taxonomy.STAGE',
				valueB: 'Approved',
				notEqual: '___$46___',
				equal: '___$47___'
			},
			{
				type: 'Concatenate',
				sources: [
					';',
					'___$13___',
					';;;',
					'event19=1',
					';',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$16___',
					'|',
					'___$19___',
					'|',
					'___$22___',
					'|',
					'___$25___',
					'|',
					'eVar66=',
					'|',
					'___$34___',
					'|',
					'eVar70=',
					'___$36___',
					'&&',
					'___$38___',
					'&&',
					'___$40___',
					'|',
					'eVar89='
				]
			},
			{
				valueB: 'Declined',
				notEqual: '___$48___',
				equal: '___$49___',
				type: 'IfThen',
				valueA: 'taxonomy.STAGE'
			},
			{
				sources: [
					';',
					'___$13___',
					';;;',
					'event20=1',
					';',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$16___',
					'|',
					'___$19___',
					'|',
					'___$22___',
					'|',
					'___$25___',
					'|',
					'eVar66=',
					'|',
					'___$34___',
					'|',
					'eVar70=',
					'___$36___',
					'&&',
					'___$38___',
					'&&',
					'___$40___',
					'|',
					'eVar89='
				],
				type: 'Concatenate'
			},
			{
				equal: '___$51___',
				notEqual: '___$50___',
				valueB: 'Saved',
				valueA: 'taxonomy.STAGE',
				type: 'IfThen'
			},
			{
				type: 'Concatenate',
				sources: [
					';',
					'___$13___',
					';;;',
					'event21=1',
					';',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$16___',
					'|',
					'___$19___',
					'|',
					'___$22___',
					'|',
					'___$25___',
					'|',
					'eVar66=',
					'|',
					'___$34___',
					'|',
					'eVar70=',
					'___$36___',
					'&&',
					'___$38___',
					'&&',
					'___$40___',
					'|',
					'eVar89='
				]
			},
			{
				equal: '___$53___',
				notEqual: '___$52___',
				valueB: 'Resume',
				valueA: 'taxonomy.STAGE',
				type: 'IfThen'
			},
			{
				sources: [
					';',
					'___$13___',
					';',
					'1',
					';;;',
					'eVar17=',
					'taxonomy.applicationName',
					'|',
					'___$16___',
					'|',
					'___$19___',
					'|',
					'___$22___',
					'|',
					'___$25___',
					'|',
					'eVar66=',
					'|',
					'___$34___',
					'|',
					'eVar70=',
					'___$36___',
					'&&',
					'___$38___',
					'&&',
					'___$40___',
					'|',
					'eVar89='
				],
				type: 'Concatenate'
			},
			{
				match: '___$55___',
				noMatch: '___$54___',
				regex: '(?i)(entry|verify)',
				type: 'RegexCheck',
				value: 'taxonomy.STAGE'
			},
			{
				value: 'taxonomy.applicationName',
				regex: '(?i)(origination)',
				type: 'RegexCheck',
				match: '___$56___',
				noMatch: ''
			}
		]
	},
	{
		eventType: ['publicAction'],
		destinations: ['eVar7', 'prop7'],
		name: 'Public Form Field evar7 prop7',
		subType: ['formField'],
		instructions: [{ type: 'Concatenate', sources: ['form field'] }]
	},
	{
		instructions: [{ type: 'Concatenate', sources: ['modal'] }],
		eventType: ['publicEvent'],
		name: 'Public Modal evar7 prop7',
		subType: ['modal'],
		destinations: ['eVar7', 'prop7']
	},
	{
		action: '(?i)(.*video.*)',
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.videoName.value',
					'_',
					'packet.event.payload.data.videoTitle.value',
					'|',
					'packet.event.payload.data.videoId.value',
					'|',
					'packet.event.payload.data.videoPlacement.value',
					'_',
					'packet.event.payload.data.videoPlacementPosition.value'
				]
			}
		],
		eventType: ['action'],
		destinations: ['eVar24', 'prop24'],
		name: 'Rule 007 Video action'
	},
	{
		destinations: ['eVar109'],
		name: 'CXO-CellCode',
		eventType: ['screen'],
		instructions: [
			{
				replace: '$1',
				value: 'packet.event.screen.id',
				regex: '(?i).*cellCode=(.[^&]*)&.*',
				type: 'RegexReplace'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.screen.id',
				valueB: '___$1___',
				equal: '',
				notEqual: '___$1___'
			},
			{ value: '___$2___', substring: '?', type: 'SubstringBefore' }
		]
	},
	{
		eventType: ['publicAction'],
		destinations: ['eVar82'],
		name: 'Scroll Depth (evar82)',
		subType: ['scroll'],
		instructions: [
			{
				noMatch: '',
				match: 'packet.event.payload.data.scrollDepth',
				regex: '^[1-9][0-9]?$|^100$|^0$',
				type: 'RegexCheck',
				value: 'packet.event.payload.data.scrollDepth'
			}
		]
	},
	{
		name: 'Query String - CXO AI',
		destinations: ['eVar78'],
		eventType: ['screen'],
		instructions: [
			{
				type: 'SubstringAfter',
				substring: 'ai=',
				value: 'packet.event.screen.id'
			},
			{ substring: '&', value: '___$1___', type: 'SubstringBefore' },
			{
				value: '___$2___',
				regex: '([0-9]{1,})',
				type: 'RegexCheck',
				match: '___$2___',
				noMatch: ''
			}
		]
	},
	{
		destinations: ['prop57'],
		name: 'prop57',
		eventType: ['action'],
		instructions: [
			{
				match: 'packet.event.payload.data.searchResultFeedback.value',
				noMatch: 'Other',
				value: 'packet.event.payload.data.searchResultFeedback.value',
				regex: '(?i)(Helpful|Too General|Incorrect|Confusing)',
				type: 'RegexCheck'
			}
		]
	},
	{
		eventType: ['publicEvent'],
		subType: ['screen'],
		name: 'Query String- Public Offercode',
		destinations: ['eVar97'],
		instructions: [
			{
				type: 'SubstringAfter',
				substring: 'offercode=',
				value: 'packet.event.screen.url'
			},
			{ substring: '&', value: '___$1___', type: 'SubstringBefore' },
			{ sources: ['&&', '&&', '___$2___'], type: 'Concatenate' },
			{
				match: '',
				noMatch: '___$3___',
				type: 'RegexCheck',
				regex: '&&&&',
				value: '___$3___'
			}
		]
	},
	{
		instructions: [
			{
				replace: '',
				regex: '\n',
				type: 'RegexReplace',
				value: 'packet.event.screen.pageTitle'
			},
			{
				value: '___$1___',
				regex: '.*\n.*',
				type: 'RegexCheck',
				match: '___$1___',
				noMatch: 'packet.event.screen.pageTitle'
			}
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		],
		name: 'Public pageTitle into v18 c18',
		destinations: ['eVar18', 'prop18']
	},
	{
		instructions: [
			{ sources: ['packet.event.payload.action'], type: 'ToLowerCase' }
		],
		destinations: ['eVar3', 'prop3'],
		name: 'Set evar3 and prop3 (new)',
		eventType: ['action']
	},
	{
		eventType: ['publicEvent'],
		destinations: ['eVar77'],
		name: 'Public- Google AD click ID(gclid)',
		subType: ['screen'],
		instructions: [
			{
				type: 'SubstringAfter',
				substring: '&gclid=',
				value: 'packet.event.screen.url'
			},
			{ substring: '&', value: '___$1___', type: 'SubstringBefore' }
		]
	},
	{
		subType: ['BLANK', 'adImpressions'],
		name: 'prop74 Ad consolidate flag',
		destinations: ['prop74'],
		eventType: ['adImpression', 'publicEvent'],
		instructions: [{ sources: ['Y'], type: 'Concatenate' }]
	},
	{
		instructions: [
			{
				match: 'Y',
				noMatch: '',
				regex: '.+',
				type: 'RegexCheck',
				value:
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.id'
			}
		],
		name: 'prop74 ad consolidate - mobile',
		destinations: ['prop74'],
		eventType: ['mobileEvent']
	},
	{
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		],
		name: 'Public Timezone eVar75',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		],
		destinations: ['eVar75'],
		instructions: [
			{
				sources: ['packet.event.location.timezone', '|||||'],
				type: 'Concatenate'
			},
			{
				valueB: '|||||',
				equal: '',
				notEqual: '___$1___',
				type: 'IfThen',
				valueA: '___$1___'
			}
		]
	},
	{
		destinations: ['eVar28'],
		name: 'Public - URI Link Tag',
		subType: ['screen'],
		eventType: ['publicEvent'],
		instructions: [
			{ type: 'ToLowerCase', sources: ['packet.event.payload.data.linkTag'] }
		]
	},
	{
		eventType: ['publicAction'],
		destinations: ['eVar83'],
		name: 'Rule173',
		subType: ['scroll'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.scrollDirection',
					'|',
					'packet.event.payload.data.scrollComponent',
					'|',
					'packet.event.payload.data.scrollComponentPlacement',
					'|',
					'packet.event.payload.data.scrollCategory'
				],
				type: 'Concatenate'
			},
			{
				sources: [
					'packet.event.payload.data.scrollDirection',
					'|',
					'packet.event.payload.data.scrollComponent',
					'|',
					'packet.event.payload.data.scrollComponentPlacement',
					'|'
				],
				type: 'Concatenate'
			},
			{
				regex: '.*\\|_$',
				value: '___$1___',
				type: 'RegexCheck',
				noMatch: '___$1___',
				match: '___$2___'
			}
		]
	},
	{
		instructions: [
			{ type: 'Concatenate', sources: ['Public  - Classic, 3rd Party'] }
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		],
		destinations: ['prop71'],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		],
		name: 'Public Framework prop71 - Rule022'
	},
	{
		instructions: [
			{ sources: ['Bluespec 2 - Mobile Native Apps'], type: 'Concatenate' }
		],
		destinations: ['prop71'],
		name: 'Rule022 - CxO Mob',
		eventType: ['mobileAction', 'mobileEvent']
	},
	{
		instructions: [
			{
				sources: [
					'taxonomy.product',
					'|',
					'taxonomy.DESC2',
					' ',
					'-',
					' ',
					'taxonomy.DESC4',
					'|',
					'taxonomy.ACTIVITY'
				],
				type: 'Concatenate'
			},
			{
				type: 'Concatenate',
				sources: ['taxonomy.product', '||', 'taxonomy.ACTIVITY']
			},
			{
				equal: '___$2___',
				notEqual: '___$1___',
				valueB: '',
				type: 'IfThen',
				valueA: 'taxonomy.DESC2'
			},
			{
				valueB: '||',
				equal: '',
				notEqual: '___$3___',
				valueA: '___$3___',
				type: 'IfThen'
			}
		],
		subType: ['BLANK', 'screen', 'formField'],
		name: 'Rule 010 - Product Detail (eVar112)',
		destinations: ['eVar112'],
		eventType: ['screen', 'interaction', 'publicEvent', 'publicAction']
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.opinionLabId',
					'|',
					'packet.event.payload.data.opinionLabRating'
				]
			},
			{
				valueA: '___$1___',
				type: 'IfThen',
				equal: '',
				notEqual: '___$1___',
				valueB: '|'
			}
		],
		eventType: ['publicEvent'],
		destinations: ['eVar55'],
		subType: ['screen'],
		name: 'Rule 154'
	},
	{
		name: 'Special characters for Variation news new new',
		destinations: ['eVar64'],
		eventType: ['simpleDecisionedContent'],
		instructions: [
			{
				value: 'packet.event.payload.data.variation.data',
				replace: '',
				regex: '.*(#|\n|\t).*',
				type: 'RegexReplace'
			},
			{
				sources: ['___$1___', '|', 'packet.event.payload.data.placement'],
				type: 'Concatenate'
			},
			{ sources: ['___$2___'], type: 'ToLowerCase' }
		]
	},
	{
		eventType: ['publicAction'],
		destinations: ['eVar81'],
		subType: ['scroll'],
		name: 'Scroll Root Page (evar81)',
		instructions: [
			{
				value: 'packet.event.payload.data.scrollRootPage',
				replace: '$1',
				regex: '.+[?&]pg_name=([^&]+)&?.*',
				type: 'RegexReplace'
			},
			{
				equal: '',
				notEqual: '___$1___',
				valueB: '___$1___',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.scrollRootPage'
			},
			{
				value: 'packet.event.payload.data.scrollRootPage',
				substring: '?',
				type: 'SubstringBefore'
			},
			{ type: 'Concatenate', sources: ['___$3___', '?pg_name=', '___$2___'] },
			{
				match: '___$3___',
				noMatch: '___$4___',
				value: '___$4___',
				regex: '.*pg_name=$',
				type: 'RegexCheck'
			}
		]
	},
	{
		instructions: [
			{
				value: 'packet.event.payload.data.advertisementPlacementId',
				substring: '/',
				type: 'SubstringBefore'
			},
			{
				type: 'SubstringAfter',
				substring: '/',
				value: 'packet.event.payload.data.advertisementPlacementId'
			},
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.advertisementId',
					'|',
					'___$1___',
					'|',
					'___$2___',
					'|',
					'packet.event.payload.data.failoverReason',
					'|'
				]
			}
		],
		destinations: ['list1'],
		name: 'Public Ad Variables list1 - Rule141,161',
		subType: ['adImpressions'],
		eventType: ['publicEvent']
	},
	{
		instructions: [
			{
				type: 'SubstringBefore',
				substring: '/',
				value: 'packet.event.payload.data.advertisementPlacementId'
			},
			{
				substring: '/',
				value: 'packet.event.payload.data.advertisementPlacementId',
				type: 'SubstringAfter'
			},
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.advertisementId',
					'|',
					'___$1___',
					'|',
					'___$2___',
					'|',
					'packet.event.payload.data.failoverReason',
					'|'
				]
			}
		],
		eventType: ['publicAction'],
		subType: ['adClicks'],
		name: 'Public Ad click variables list1,eVar26',
		destinations: ['list1', 'eVar26']
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.flexAppProductTemplate',
					'&&',
					'packet.event.payload.data.flexAppChannelId',
					'&&',
					'packet.event.payload.data.configurationId',
					'&&',
					'packet.event.payload.data.flexAppProgramId',
					'&&',
					'packet.event.payload.data.cardRelationship',
					'&&',
					'packet.event.payload.data.cardVerification'
				],
				type: 'Concatenate'
			},
			{
				notEqual: '___$1___',
				equal: '',
				valueB: '&&&&&&&&&&',
				type: 'IfThen',
				valueA: '___$1___'
			}
		],
		subType: ['screen'],
		name: 'Flex App Card attributes',
		destinations: ['eVar66', 'prop66'],
		eventType: ['publicEvent']
	},
	{
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		],
		destinations: ['eVar105'],
		name: 'Search Site Link evar105',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		],
		instructions: [
			{ type: 'ToLowerCase', sources: ['packet.event.screen.url'] },
			{
				value: '___$1___',
				replace: '$1',
				regex: '.+[?&]sitelink=([^&]*)&?.*',
				type: 'RegexReplace'
			},
			{
				notEqual: '___$2___',
				equal: '',
				valueB: '___$2___',
				valueA: '___$1___',
				type: 'IfThen'
			}
		]
	},
	{
		destinations: ['list2'],
		name: 'List2 - Web AD impression',
		eventType: ['adImpression'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.advertisementMidasId',
					'|',
					'packet.event.payload.data.offerId'
				]
			},
			{
				type: 'RegexCheck',
				regex: '^\\|$',
				value: '___$1___',
				noMatch: '___$1___',
				match: ''
			}
		]
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.advertisementMidasId.value',
					'|',
					'packet.event.payload.data.offerId.value'
				]
			},
			{
				equal: '',
				notEqual: '___$1___',
				valueB: '',
				valueA: 'packet.event.payload.data.advertisementId.value',
				type: 'IfThen'
			},
			{
				regex: '^\\|$',
				value: '___$2___',
				type: 'RegexCheck',
				match: '',
				noMatch: '___$2___'
			}
		],
		action:
			'(?i)(^reviewOffer$|^interactWithAdvertisement$|^requestConversationMessageActions$|^selectConversationMessageAction$)',
		destinations: ['list2'],
		name: 'List 2 Web AD actions',
		eventType: ['action']
	},
	{
		instructions: [{ type: 'Concatenate', sources: ['Mobile Native App'] }],
		eventType: ['mobileAction', 'mobileEvent'],
		destinations: ['eVar51'],
		name: 'eVar51 - Traffic Type - Mobile App'
	},
	{
		instructions: [
			{ sources: ['packet.event.screen.id'], type: 'ToLowerCase' },
			{ type: 'SubstringAfter', substring: 'offerid=', value: '___$1___' },
			{ type: 'SubstringBefore', substring: '&', value: '___$2___' },
			{ substring: 'offerkey=', value: '___$1___', type: 'SubstringAfter' },
			{ value: '___$4___', substring: '&', type: 'SubstringBefore' },
			{ value: '___$1___', substring: 'offercode=', type: 'SubstringAfter' },
			{ type: 'SubstringBefore', substring: '&', value: '___$6___' },
			{
				sources: ['___$3___', '&&', '___$5___', '&&', '___$7___'],
				type: 'Concatenate'
			},
			{
				type: 'RegexCheck',
				regex: '.*&&&&$',
				value: '___$8___',
				noMatch: '___$8___',
				match: ''
			}
		],
		eventType: ['screen'],
		name: 'Query string- DAO offerid 0402',
		destinations: ['eVar97']
	},
	{
		name: 'CXO- Raw Referrer',
		destinations: ['referrer'],
		eventType: ['screen'],
		instructions: [
			{
				type: 'ToLowerCase',
				sources: ['packet.event.payload.data.referrerScreenId']
			},
			{
				sources: ['https://secure.chase.com', '___$1___'],
				type: 'Concatenate'
			},
			{
				noMatch: '___$2___',
				match: '',
				regex:
					'(?i)(.*undefined_screen_id$|.*/cpo/accounts/accounts$|.*secure.chase.com$|.*cpo/overviewaccounts/overview/index$|.*origination/routing$)',
				value: '___$2___',
				type: 'RegexCheck'
			}
		]
	},
	{
		instructions: [
			{
				type: 'ToLowerCase',
				sources: ['packet.event.payload.data.referrerScreenId']
			},
			{ substring: '?', value: '___$1___', type: 'SubstringBefore' },
			{ sources: ['secure.chase.com', '___$2___'], type: 'Concatenate' },
			{
				type: 'RegexCheck',
				regex:
					'(?i)(.*undefined_screen_id$|.*/cpo/accounts/accounts$|.*secure.chase.com$|.*cpo/overviewaccounts/overview/index$|.*origination/routing$)',
				value: '___$3___',
				match: '',
				noMatch: '___$3___'
			}
		],
		eventType: ['screen'],
		destinations: ['eVar101'],
		name: 'Web- Referrer screen id'
	},
	{
		name: 'Semantic Action Searches',
		destinations: ['eVar16', 'prop16'],
		eventType: ['action'],
		instructions: [
			{
				noMatch: 'packet.event.payload.data.searchFor.value',
				match: 'BLOCKED: This contains PI Data',
				value: 'packet.event.payload.data.searchFor.value',
				regex:
					'(?si)(.*@.*)|.*([\\d-. \t/]{8,}).*|.*(%40|@)\\S+(%2C|\\.)com.*|.*(gmail(\\.|\\s*dot\\s*)com.*|.*yahoo\\.com.*|.*msn\\.com.*|.*aol\\.com.*|.*hotmail\\.com).*',
				type: 'RegexCheck'
			}
		]
	},
	{
		instructions: [
			{
				match: 'BLOCKED: This contains PI Data',
				noMatch: 'packet.event.payload.data.properties[1].searchFor',
				regex:
					'(?si)(.*@.*)|.*([\\d-. \t/]{8,}).*|.*(%40|@)\\S+(%2C|\\.)com.*|.*(gmail(\\.|\\s*dot\\s*)com.*|.*yahoo\\.com.*|.*msn\\.com.*|.*aol\\.com.*|.*hotmail\\.com).*',
				value: 'packet.event.payload.data.properties[1].searchFor',
				type: 'RegexCheck'
			}
		],
		eventType: [
			'screen',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction'
		],
		name: 'Search Events new',
		destinations: ['eVar16', 'prop16']
	},
	{
		eventType: ['dataCollection'],
		name: 'Search Events - Search Text',
		destinations: ['eVar19'],
		instructions: [
			{
				sources: ['packet.event.payload.data.properties[3].searchText'],
				type: 'ToLowerCase'
			},
			{
				regex:
					'(?si)(.*@.*)|.*([\\d-. \t/]{8,}).*|.*(%40|@)\\S+(%2C|\\.)com.*|.*(gmail(\\.|\\s*dot\\s*)com.*|.*yahoo\\.com.*|.*msn\\.com.*|.*aol\\.com.*|.*hotmail\\.com).*',
				type: 'RegexCheck',
				value: '___$1___',
				match: 'BLOCKED: This contains PI Data',
				noMatch: '___$1___'
			}
		]
	},
	{
		instructions: [
			{
				type: 'RegexCheck',
				regex: '.*cardlytics.*',
				value: 'packet.event.payload.data.placement',
				match: 'packet.event.payload.data.adId.id',
				noMatch: 'packet.event.payload.data.adId'
			},
			{
				sources: [
					'___$1___',
					'|',
					'packet.event.payload.data.tagMap',
					'|',
					'packet.event.payload.data.placement',
					'|',
					'packet.event.payload.data.failoverReason',
					'|'
				],
				type: 'Concatenate'
			},
			{
				type: 'Concatenate',
				sources: [
					'___$1___',
					'|',
					'private_conversation_deck|conversationdeck',
					'|',
					'packet.event.payload.data.failoverReason',
					'|'
				]
			},
			{
				noMatch: '___$2___',
				match: '___$3___',
				regex: '(?i)(private_conversation_deck)',
				value: 'packet.event.payload.data.tagMap',
				type: 'RegexCheck'
			}
		],
		eventType: ['adImpression'],
		name: 'Rule011 (list1) latest Web final',
		destinations: ['list1']
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.conversationMessageType.value',
					'|',
					'unknown'
				]
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.conversationMessageType.value',
				equal: '',
				notEqual: '___$1___',
				valueB: 'ad'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.conversationMessageType.value',
				valueB: '',
				equal: '',
				notEqual: '___$2___'
			},
			{ sources: ['___$3___'], type: 'ToLowerCase' }
		],
		action:
			'(?i)(^requestConversationMessageActions.*|selectConversationMessageAction|exitconversationmessage)',
		name: 'eVar64 - Conversation Deck',
		destinations: ['eVar64'],
		eventType: ['action']
	},
	{
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		name: 'Rule023',
		destinations: ['server'],
		instructions: [
			{
				substring: '.',
				type: 'SubstringBefore',
				value: 'packet.event.screen.currentURL'
			},
			{ type: 'SubstringAfter', substring: 'https://', value: '___$1___' }
		]
	},
	{
		name: 'IP Address',
		destinations: ['IPAddress'],
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		instructions: [
			{
				value: 'packet.headers.x-forwarded-for[0]',
				substring: ',',
				type: 'SubstringBefore'
			}
		]
	},
	{
		instructions: [{ sources: ['1.7'], type: 'Concatenate' }],
		destinations: ['javaScriptVersion'],
		name: 'Javascript Vers',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		]
	},
	{
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		name: 'Java Enabled',
		destinations: ['javaEnabled'],
		instructions: [{ sources: ['Y'], type: 'Concatenate' }]
	},
	{
		instructions: [{ type: 'Concatenate', sources: ['32'] }],
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		name: 'Color Depth',
		destinations: ['colorDepth']
	},
	{
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		name: 'Rule020 - Web Domain',
		destinations: ['eVar56'],
		instructions: [
			{
				valueB: '',
				equal: '',
				notEqual: 'secure.chase.com',
				type: 'IfThen',
				valueA: 'packet.event.screen.id'
			}
		]
	},
	{
		instructions: [
			{
				equal: '',
				notEqual: 'https://undefined.destinationurl.com',
				valueB: 'screen',
				valueA: 'packet.event.payload.eventType',
				type: 'IfThen'
			}
		],
		destinations: ['linkURL'],
		name: 'LinkURL - Web Non Screen Events',
		eventType: [
			'communication',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		]
	},
	{
		instructions: [
			{
				valueB: 'screen',
				notEqual: 'o',
				equal: 'pv',
				type: 'IfThen',
				valueA: 'packet.event.payload.eventType'
			},
			{
				regex:
					'(?i)(^reviewaccountdocuments.*|.*pdf|csv|excel.*|.*print.*|^download.*|^request.*documents?$)',
				value: 'packet.event.payload.action',
				type: 'RegexCheck',
				match: 'd',
				noMatch: '___$1___'
			},
			{
				noMatch: '___$2___',
				match: 'e',
				regex:
					'(?i)(requestchasefacebook|requesttwitter|requestchasetwitter|requestchaselinkedin|requestchaseinstagram|requestchaseyoutube|requestexternalnavigation|request.*website)',
				type: 'RegexCheck',
				value: 'packet.event.payload.action'
			}
		],
		name: 'Rule025, Rule029, Rule031-Prop55',
		destinations: ['prop55'],
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		]
	},
	{
		instructions: [
			{
				notEqual: 'lnk_o',
				equal: '',
				valueB: 'screen',
				type: 'IfThen',
				valueA: 'packet.event.payload.eventType'
			},
			{
				type: 'RegexCheck',
				regex:
					'(?i)(^reviewaccountdocuments.*|.*pdf|csv|excel.*|.*print.*|^download.*|^request.*documents?$)',
				value: 'packet.event.payload.action',
				noMatch: '___$1___',
				match: 'lnk_d'
			},
			{
				regex:
					'(?i)(requestchasefacebook|requesttwitter|requestchasetwitter|requestchaselinkedin|requestchaseinstagram|requestchaseyoutube|requestexternalnavigation|request.*website)',
				value: 'packet.event.payload.action',
				type: 'RegexCheck',
				noMatch: '___$2___',
				match: 'lnk_e'
			}
		],
		eventType: [
			'communication',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		name: 'Rule027,030,032 Web',
		destinations: ['linkType']
	},
	{
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		name: 'TimeStamp-CXO Web in Seconds',
		destinations: ['timestamp'],
		instructions: [
			{
				type: 'AddInteger',
				sources: [
					'packet.event.payload.timestamp',
					'packet.event.location.server_offset'
				]
			},
			{ sources: ['___$1___'], type: 'ConvertMillisecondsToSeconds' }
		]
	},
	{
		instructions: [
			{ type: 'ToLowerCase', sources: ['packet.event.screen.id'] },
			{ type: 'SubstringAfter', substring: '?', value: '___$1___' }
		],
		name: 'Rule021 Queryst',
		destinations: ['eVar6', 'prop6'],
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		]
	},
	{
		instructions: [
			{
				value: 'packet.event.screen.id',
				substring: '?',
				type: 'SubstringBefore'
			},
			{ sources: ['secure.chase.com', '___$1___'], type: 'Concatenate' },
			{ type: 'ToLowerCase', sources: ['___$2___'] }
		],
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		name: 'Rule002 CxO Web',
		destinations: ['eVar1', 'prop1', 'screen']
	},
	{
		instructions: [
			{
				substring: 'x',
				value: 'packet.event.device.browserRes',
				type: 'SubstringBefore'
			}
		],
		name: 'Rule006 BW',
		destinations: ['browserWidth'],
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		]
	},
	{
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		destinations: ['browserHeight'],
		name: 'Rule006 BH',
		instructions: [
			{
				value: 'packet.event.device.browserRes',
				substring: 'x',
				type: 'SubstringAfter'
			}
		]
	},
	{
		instructions: [{ sources: ['1'], type: 'Concatenate' }],
		name: 'AAM contextData.cm.ssf  Secure & Mobile',
		destinations: ['contextData.cm.ssf'],
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		]
	},
	{
		instructions: [
			{
				sources: ['packet.event.location.timezone', '|', '|', '|', '|', '|'],
				type: 'Concatenate'
			},
			{
				valueB: '|||||',
				equal: '',
				notEqual: '___$1___',
				type: 'IfThen',
				valueA: '___$1___'
			}
		],
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		destinations: ['eVar75'],
		name: 'Timezone'
	},
	{
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		name: 'Rule022 - CxO Web',
		destinations: ['prop71'],
		instructions: [
			{ type: 'Concatenate', sources: ['Bluespec 1 - Secure, Hybrid, DAO'] }
		]
	},
	{
		destinations: ['eVar102'],
		name: 'Query String - DAO Applicant type',
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		instructions: [
			{
				substring: 'applicantType=',
				type: 'SubstringAfter',
				value: 'packet.event.screen.id'
			},
			{ substring: '&', value: '___$1___', type: 'SubstringBefore' },
			{
				substring: 'coApp=',
				type: 'SubstringAfter',
				value: 'packet.event.screen.id'
			},
			{ type: 'SubstringBefore', substring: '&', value: '___$3___' },
			{
				type: 'SubstringAfter',
				substring: 'loggedIn=',
				value: 'packet.event.screen.id'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$5___' },
			{
				substring: 'jointLoggedIn=',
				value: 'packet.event.screen.id',
				type: 'SubstringAfter'
			},
			{ value: '___$7___', substring: '&', type: 'SubstringBefore' },
			{
				sources: [
					'___$2___',
					'&&',
					'___$4___',
					'&&',
					'___$6___',
					'&&',
					'___$8___'
				],
				type: 'Concatenate'
			},
			{
				regex: '&&&&&&',
				type: 'RegexCheck',
				value: '___$9___',
				noMatch: '___$9___',
				match: ''
			}
		]
	},
	{
		name: 'eVar91-Branch Channel ',
		destinations: ['eVar91'],
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		instructions: [
			{
				match: 'DAO Online',
				noMatch: '',
				regex: '(?i)(^\\/origination.*)',
				type: 'RegexCheck',
				value: 'packet.event.screen.id'
			},
			{
				value: 'packet.event.screen.id',
				regex: '(?i).*cfgCode=.*BRANCH.*',
				type: 'RegexCheck',
				noMatch: '',
				match: 'DAO in Branch'
			},
			{
				valueB: 'DAO in Branch',
				equal: '___$2___',
				notEqual: '___$1___',
				valueA: '___$2___',
				type: 'IfThen'
			}
		]
	},
	{
		name: 'AAMLH',
		destinations: ['aamlh'],
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		instructions: [
			{
				substring: '|MCAAMB',
				type: 'SubstringBefore',
				value: 'packet.event.visitor.adobeData'
			},
			{ value: '___$1___', substring: 'MCAAMLH|', type: 'SubstringAfter' },
			{
				type: 'IfThen',
				valueA: '___$2___',
				equal: 'packet.event.visitor.adobeData.mcaamlh',
				notEqual: '___$2___',
				valueB: ''
			}
		]
	},
	{
		name: 'Hybrid Flag - Mobile Native App prop52',
		destinations: ['prop52'],
		eventType: ['mobileAction', 'mobileEvent'],
		instructions: [{ sources: ['No'], type: 'Concatenate' }]
	},
	{
		instructions: [
			{
				match: 'scOpen',
				noMatch: '',
				regex: '(?i)(origination)',
				type: 'RegexCheck',
				value: 'taxonomy.applicationName'
			},
			{
				match: '___$1___',
				noMatch: '',
				regex: '(?i)(apply)',
				type: 'RegexCheck',
				value: 'taxonomy.ACTIVITY'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(entry)',
				value: 'taxonomy.STAGE',
				noMatch: '',
				match: '___$2___'
			},
			{
				value: 'taxonomy.STAGE',
				regex: '(?i)(verify)',
				type: 'RegexCheck',
				match: 'scCheckout',
				noMatch: '___$3___'
			},
			{
				match: 'purchase',
				noMatch: '___$4___',
				type: 'RegexCheck',
				regex: '(?i)(complete)',
				value: 'taxonomy.STAGE'
			},
			{
				value: 'taxonomy.STAGE',
				regex: '(?i)(Info)',
				type: 'RegexCheck',
				noMatch: '___$5___',
				match: 'prodView,event25'
			},
			{
				noMatch: '___$6___',
				match: 'event17',
				regex: '(?i)(pending)',
				type: 'RegexCheck',
				value: 'taxonomy.STAGE'
			},
			{
				regex: '(?i)(Approved)',
				value: 'taxonomy.STAGE',
				type: 'RegexCheck',
				match: 'event18',
				noMatch: '___$7___'
			},
			{
				regex: '(?i)(declined)',
				type: 'RegexCheck',
				value: 'taxonomy.STAGE',
				noMatch: '___$8___',
				match: 'event19'
			},
			{
				match: 'event20',
				noMatch: '___$9___',
				regex: '(?i)(Saved)',
				type: 'RegexCheck',
				value: 'taxonomy.STAGE'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(resume)',
				value: 'taxonomy.STAGE',
				noMatch: '___$10___',
				match: 'event21'
			},
			{
				noMatch: '',
				match: '___$11___',
				regex: '(?i)(origination)',
				value: 'taxonomy.applicationName',
				type: 'RegexCheck'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(Enrollmententry)',
				value: 'taxonomy.applicationType',
				noMatch: '___$12___',
				match: 'event14'
			},
			{
				match: 'event15',
				noMatch: '___$13___',
				value: 'taxonomy.applicationType',
				regex: '(?i)(Enrollmentverify)',
				type: 'RegexCheck'
			},
			{
				regex: '(?i)(Enrollmentconfirm)',
				value: 'taxonomy.applicationType',
				type: 'RegexCheck',
				noMatch: '___$14___',
				match: 'event16'
			},
			{
				match: 'event11',
				noMatch: '',
				value: 'packet.event.screen.currentURL',
				regex: '(?i)(.*jp_aid_a.*jp_aid_p.*)',
				type: 'RegexCheck'
			},
			{ type: 'Concatenate', sources: ['___$15___', ',', '___$16___'] },
			{
				type: 'RegexCheck',
				regex: '(?i)(^,event11)',
				value: '___$17___',
				match: 'event11',
				noMatch: '___$17___'
			},
			{
				regex: '(?i)(.*,$)',
				type: 'RegexCheck',
				value: '___$18___',
				noMatch: '___$18___',
				match: '___$15___'
			},
			{
				sources: [
					'taxonomy.applicationType',
					'_',
					'taxonomy.DESC4',
					'_',
					'taxonomy.STAGE'
				],
				type: 'Concatenate'
			},
			{
				match: 'event39,event200,event101',
				noMatch: '___$19___',
				regex: '(?i)(selfservice_quickpay.*_entry)',
				value: '___$20___',
				type: 'RegexCheck'
			},
			{
				noMatch: '___$21___',
				match: 'event40,event201,event102',
				regex: '(?i)(selfservice_quickpay.*_verify)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				match: 'event41,event202,event103',
				noMatch: '___$22___',
				type: 'RegexCheck',
				regex: '(?i)(selfservice_quickpay.*_complete)',
				value: '___$20___'
			},
			{
				match: 'event39,event203,event104',
				noMatch: '___$23___',
				type: 'RegexCheck',
				regex: '(?i)(selfservice_funds.*_entry)',
				value: '___$20___'
			},
			{
				regex: '(?i)(selfservice_funds.*_verify)',
				type: 'RegexCheck',
				value: '___$20___',
				match: 'event40,event204,event105',
				noMatch: '___$24___'
			},
			{
				regex: '(?i)(selfservice_funds.*_complete)',
				value: '___$20___',
				type: 'RegexCheck',
				noMatch: '___$25___',
				match: 'event41,event205,event106'
			},
			{
				noMatch: '___$26___',
				match: 'event39,event206,event107',
				value: '___$20___',
				regex: '(?i)(selfservice_Payment-CreditCard_entry)',
				type: 'RegexCheck'
			},
			{
				regex: '(?i)(selfservice_Payment-CreditCard_verify)',
				type: 'RegexCheck',
				value: '___$20___',
				match: 'event40,event207,event108',
				noMatch: '___$27___'
			},
			{
				regex: '(?i)(selfservice_Payment-CreditCard_complete)',
				type: 'RegexCheck',
				value: '___$20___',
				match: 'event41,event208,event109',
				noMatch: '___$28___'
			},
			{
				value: '___$20___',
				regex: '(?i)(selfservice_.*Multi-Bill.*_entry)',
				type: 'RegexCheck',
				match: 'event39,event206,event111',
				noMatch: '___$29___'
			},
			{
				match: 'event40,event207,event112',
				noMatch: '___$30___',
				value: '___$20___',
				regex: '(?i)(selfservice_.*Multi-Bill.*_verify)',
				type: 'RegexCheck'
			},
			{
				match: 'event41,event208,event113',
				noMatch: '___$31___',
				regex: '(?i)(selfservice_.*Multi-Bill.*_complete)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				noMatch: '___$32___',
				match: 'event39,event206,event114',
				value: '___$20___',
				regex: '(?i)(selfservice_.*Mortgage.*_entry)',
				type: 'RegexCheck'
			},
			{
				noMatch: '___$33___',
				match: 'event40,event207,event115',
				type: 'RegexCheck',
				regex: '(?i)(selfservice_.*Mortgage.*_verify)',
				value: '___$20___'
			},
			{
				match: 'event41,event208,event116',
				noMatch: '___$34___',
				regex: '(?i)(selfservice_.*Mortgage.*_complete)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				match: 'event39,event206,event117',
				noMatch: '___$35___',
				regex: '(?i)(selfservice_.*Home.Equity.Loan_entry)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(selfservice_.*Home.Equity.Loan_verify)',
				value: '___$20___',
				match: 'event40,event207,event118',
				noMatch: '___$36___'
			},
			{
				value: '___$20___',
				regex: '(?i)(selfservice_.*Home.Equity.Loan_complete)',
				type: 'RegexCheck',
				noMatch: '___$37___',
				match: 'event41,event208,event119'
			},
			{
				noMatch: '___$38___',
				match: 'event39,event206,event121',
				type: 'RegexCheck',
				regex: '(?i)(selfservice_.*Auto.Loan_entry)',
				value: '___$20___'
			},
			{
				match: 'event40,event207,event122',
				noMatch: '___$39___',
				value: '___$20___',
				regex: '(?i)(selfservice_.*Auto.Loan_verify)',
				type: 'RegexCheck'
			},
			{
				regex: '(?i)(selfservice_.*Auto.Loan_complete)',
				type: 'RegexCheck',
				value: '___$20___',
				match: 'event41,event208,event123',
				noMatch: '___$40___'
			},
			{
				regex: '(?i)(selfservice_.*Home.Equity.LOC_entry)',
				value: '___$20___',
				type: 'RegexCheck',
				noMatch: '___$41___',
				match: 'event39,event206,event124'
			},
			{
				noMatch: '___$42___',
				match: 'event40,event207,event125',
				regex: '(?i)(selfservice_.*Home.Equity.LOC_verify)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				regex: '(?i)(selfservice_.*Home.Equity.LOC_complete)',
				type: 'RegexCheck',
				value: '___$20___',
				match: 'event41,event208,event126',
				noMatch: '___$43___'
			},
			{
				noMatch: '___$44___',
				match: 'event39,event206,event127',
				type: 'RegexCheck',
				regex: '(?i)(selfservice_merchant.*_entry)',
				value: '___$20___'
			},
			{
				match: 'event40,event207,event128',
				noMatch: '___$45___',
				regex: '(?i)(selfservice_merchant.*_verify)',
				value: '___$20___',
				type: 'RegexCheck'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(selfservice_merchant.*_complete)',
				value: '___$20___',
				noMatch: '___$46___',
				match: 'event41,event208,event129'
			},
			{
				value: '___$20___',
				regex: '(?i)(selfservice_wire.transfers_entry)',
				type: 'RegexCheck',
				match: 'event39,event209,event131',
				noMatch: '___$47___'
			},
			{
				regex: '(?i)(selfservice_wire.transfers_verify)',
				value: '___$20___',
				type: 'RegexCheck',
				noMatch: '___$48___',
				match: 'event40,event210,event132'
			},
			{
				value: '___$20___',
				regex: '(?i)(selfservice_wire.transfers_complete)',
				type: 'RegexCheck',
				noMatch: '___$49___',
				match: 'event41,event211,event133'
			},
			{
				match: 'event39,event212,event134',
				noMatch: '___$50___',
				type: 'RegexCheck',
				regex: '(?i)(selfservice_ach.transfer_entry)',
				value: '___$20___'
			},
			{
				match: 'event40,event213,event135',
				noMatch: '___$51___',
				regex: '(?i)(selfservice_ach.transfer_verify)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				noMatch: '___$52___',
				match: 'event41,event214,event136',
				regex: '(?i)(selfservice_ach.transfer_complete)',
				value: '___$20___',
				type: 'RegexCheck'
			},
			{
				match: 'event39,event218,event137',
				noMatch: '___$53___',
				regex: '(?i)(selfservice_Accounts-Card.replacement_entry)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(selfservice_Accounts-Card.replacement_verify)',
				value: '___$20___',
				match: 'event40,event219,event138',
				noMatch: '___$54___'
			},
			{
				match: 'event41,event220,event139',
				noMatch: '___$55___',
				type: 'RegexCheck',
				regex: '(?i)(selfservice_Accounts-Card.replacement_complete)',
				value: '___$20___'
			},
			{
				match: 'event39,event215,event140',
				noMatch: '___$56___',
				regex: '(?i)(selfservice_travel.notification_info)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				regex: '(?i)(selfservice_travel.notification_verify)',
				value: '___$20___',
				type: 'RegexCheck',
				noMatch: '___$57___',
				match: 'event40,event216,event141'
			},
			{
				noMatch: '___$58___',
				match: 'event41,event217,event142',
				value: '___$20___',
				regex: '(?i)(selfservice_travel.notification_complete)',
				type: 'RegexCheck'
			},
			{
				regex: '(?i)(selfservice_SingleDoor.QuickPay_entry)',
				type: 'RegexCheck',
				value: '___$20___',
				noMatch: '___$59___',
				match: 'event39,event200,event186'
			},
			{
				noMatch: '___$60___',
				match: 'event40,event201,event187',
				regex: '(?i)(selfservice_SingleDoor.QuickPay_verify)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				value: '___$20___',
				regex: '(?i)(selfservice_SingleDoor.QuickPay_complete)',
				type: 'RegexCheck',
				match: 'event41,event202,event188',
				noMatch: '___$61___'
			},
			{
				match: 'event39,event206,event177',
				noMatch: '___$62___',
				value: '___$20___',
				regex: '(?i)(selfservice_BillPay.Ebills_entry)',
				type: 'RegexCheck'
			},
			{
				match: 'event40,event207,event178',
				noMatch: '___$63___',
				regex: '(?i)(selfservice_BillPay.Ebills_verify)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				value: '___$20___',
				regex: '(?i)(selfservice_BillPay.Ebills_complete)',
				type: 'RegexCheck',
				match: 'event41,event208,event179',
				noMatch: '___$64___'
			},
			{
				noMatch: '___$65___',
				match: 'event39,event206,event180',
				type: 'RegexCheck',
				regex: '(?i)(selfservice_BillPay.singledoor_entry)',
				value: '___$20___'
			},
			{
				noMatch: '___$66___',
				match: 'event40,event207,event181',
				regex: '(?i)(selfservice_BillPay.singledoor_verify)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				regex: '(?i)(selfservice_BillPay.singledoor_complete)',
				type: 'RegexCheck',
				value: '___$20___',
				noMatch: '___$67___',
				match: 'event41,event208,event182'
			},
			{
				match: 'event39,event206,event183',
				noMatch: '___$68___',
				type: 'RegexCheck',
				regex: '(?i)(selfservice_BillPay-OnUs-Card_entry)',
				value: '___$20___'
			},
			{
				value: '___$20___',
				regex: '(?i)(selfservice_BillPay-OnUs-Card_verify)',
				type: 'RegexCheck',
				noMatch: '___$69___',
				match: 'event40,event207,event184'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(selfservice_BillPay-OnUs-Card_complete)',
				value: '___$20___',
				noMatch: '___$70___',
				match: 'event41,event208,event185'
			},
			{
				value: '___$20___',
				regex: '(?i)(selfservice_global-wire_entry)',
				type: 'RegexCheck',
				match: 'event39,event209,event174',
				noMatch: '___$71___'
			},
			{
				regex: '(?i)(selfservice_global-wire_verify)',
				type: 'RegexCheck',
				value: '___$20___',
				match: 'event40,event210,event175',
				noMatch: '___$72___'
			},
			{
				noMatch: '___$73___',
				match: 'event41,event211,event176',
				regex: '(?i)(selfservice_global-wire_Complete)',
				value: '___$20___',
				type: 'RegexCheck'
			},
			{
				regex: '(?i)(selfservice_Overdraft.Protection_entry)',
				type: 'RegexCheck',
				value: '___$20___',
				match: 'event39,event218,event157',
				noMatch: '___$74___'
			},
			{
				regex: '(?i)(selfservice_Overdraft.Protection_complete)',
				type: 'RegexCheck',
				value: '___$20___',
				noMatch: '___$75___',
				match: 'event41,event220,event158'
			},
			{
				noMatch: '___$76___',
				match: 'event39,event218,event159',
				type: 'RegexCheck',
				regex: '(?i)(selfservice_Check.Stop.Payment.*Retail_entry)',
				value: '___$20___'
			},
			{
				noMatch: '___$77___',
				match: 'event40,event219,event160',
				regex: '(?i)(selfservice_Check.Stop.Payment.*Retail_verify)',
				value: '___$20___',
				type: 'RegexCheck'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(selfservice_Check.Stop.Payment.*Retail_complete)',
				value: '___$20___',
				noMatch: '___$78___',
				match: 'event41,event220,event161'
			},
			{
				match: 'event39,event218,event162',
				noMatch: '___$79___',
				value: '___$20___',
				regex: '(?i)(selfservice_Debit.Card.Coverage_entry)',
				type: 'RegexCheck'
			},
			{
				regex: '(?i)(selfservice_Debit.Card.Coverage_complete)',
				value: '___$20___',
				type: 'RegexCheck',
				noMatch: '___$80___',
				match: 'event41,event220,event163'
			},
			{
				value: '___$20___',
				regex: '(?i)(selfservice_BillPay-singledoor-pmr_entry)',
				type: 'RegexCheck',
				noMatch: '___$81___',
				match: 'event39,event206,event189'
			},
			{
				noMatch: '___$82___',
				match: 'event40,event207,event190',
				type: 'RegexCheck',
				regex: '(?i)(selfservice_BillPay-singledoor-pmr_verify)',
				value: '___$20___'
			},
			{
				regex: '(?i)(selfservice_BillPay-singledoor-pmr_complete)',
				type: 'RegexCheck',
				value: '___$20___',
				noMatch: '___$83___',
				match: 'event41,event208,event191'
			},
			{
				noMatch: '___$84___',
				match: 'event39,event221,event164',
				regex: '(?i)(selfservice_Card.Verification.*Credit.Card_entry)',
				value: '___$20___',
				type: 'RegexCheck'
			},
			{
				regex: '(?i)(selfservice_Card.Verification.*Credit.Card_verify)',
				type: 'RegexCheck',
				value: '___$20___',
				match: 'event40,event222,event165',
				noMatch: '___$85___'
			},
			{
				noMatch: '___$86___',
				match: 'event41,event223,event166',
				type: 'RegexCheck',
				regex: '(?i)(selfservice_Card.Verification.*Credit.Card_complete)',
				value: '___$20___'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(selfservice_email.address.change_entry)',
				value: '___$20___',
				match: 'event39,event215,event150',
				noMatch: '___$87___'
			},
			{
				match: 'event41,event217,event151',
				noMatch: '___$88___',
				regex: '(?i)(selfservice_email.address.change_complete)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				match: 'event39,event215,event152',
				noMatch: '___$89___',
				regex: '(?i)(selfservice_email.address.change.update_entry)',
				value: '___$20___',
				type: 'RegexCheck'
			},
			{
				noMatch: '___$90___',
				match: 'event41,event217,event153',
				value: '___$20___',
				regex: '(?i)(selfservice_email.address.change.update_complete)',
				type: 'RegexCheck'
			},
			{
				noMatch: '___$91___',
				match: 'event41,event217,event154',
				regex: '(?i)(selfservice_email.address.change.remove_complete)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				regex: '(?i)(selfservice_phone.change_entry)',
				type: 'RegexCheck',
				value: '___$20___',
				noMatch: '___$92___',
				match: 'event39,event215,event145'
			},
			{
				value: '___$20___',
				regex: '(?i)(selfservice_phone.change_complete)',
				type: 'RegexCheck',
				noMatch: '___$93___',
				match: 'event41,event217,event146'
			},
			{
				noMatch: '___$94___',
				match: 'event39,event215,event147',
				value: '___$20___',
				regex: '(?i)(selfservice_phone.change.update_entry)',
				type: 'RegexCheck'
			},
			{
				match: 'event41,event217,event148',
				noMatch: '___$95___',
				regex: '(?i)(selfservice_phone.change.update_complete)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				match: 'event41,event217,event149',
				noMatch: '___$96___',
				value: '___$20___',
				regex: '(?i)(selfservice_phone.change.remove_complete)',
				type: 'RegexCheck'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(selfservice_Payment-ACH_entry)',
				value: '___$20___',
				match: 'event39,event212,event192',
				noMatch: '___$97___'
			},
			{
				noMatch: '___$98___',
				match: 'event40,event213,event193',
				regex: '(?i)(selfservice_Payment-ACH_verify)',
				type: 'RegexCheck',
				value: '___$20___'
			},
			{
				regex: '(?i)(selfservice_Payment-ACH_complete)',
				type: 'RegexCheck',
				value: '___$20___',
				match: 'event41,event214,event194',
				noMatch: '___$99___'
			},
			{
				type: 'SubstringAfter',
				substring: 'cfgCode=',
				value: 'packet.event.screen.id'
			},
			{ value: '___$101___', substring: '&', type: 'SubstringBefore' },
			{
				sources: [
					'___$102___',
					'_',
					'taxonomy.applicationType',
					'_',
					'taxonomy.STAGE'
				],
				type: 'Concatenate'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(502002_ProductOrigination_entry)',
				value: '___$103___',
				noMatch: '___$100___',
				match: ''
			},
			{
				noMatch: '___$104___',
				match: 'event16',
				value: '___$103___',
				regex: '(?i)(502002_ProductOrigination_Complete)',
				type: 'RegexCheck'
			},
			{
				regex: '(?i)(502002_ProductOrigination_event60)',
				type: 'RegexCheck',
				value: '___$103___',
				match: 'event14',
				noMatch: '___$105___'
			}
		],
		destinations: ['events'],
		name: 'Secure- Screen based events',
		eventType: ['screen']
	},
	{
		destinations: ['eVar30'],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		],
		name: 'Classic - Core - eVar30 - Raw Screen URL',
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		],
		instructions: [
			{ sources: ['packet.event.screen.url'], type: 'ToLowerCase' },
			{ value: '___$1___', substring: '?', type: 'SubstringBefore' }
		]
	},
	{
		eventType: ['publicEvent'],
		subType: ['screen'],
		name: 'Query string- Public Search',
		destinations: ['eVar16', 'prop16'],
		instructions: [
			{
				regex: '.*[?&]q=(.[^&]*)&?.*',
				replace: '$1',
				type: 'RegexReplace',
				value: 'packet.event.screen.url'
			},
			{
				type: 'IfThen',
				valueA: '___$1___',
				valueB: 'packet.event.screen.url',
				notEqual: '___$1___',
				equal: ''
			},
			{
				value: 'packet.event.screen.url',
				replace: '$1',
				regex: '.*[?&]search=(.[^&]*)&?.*',
				type: 'RegexReplace'
			},
			{
				valueA: '___$3___',
				type: 'IfThen',
				equal: '',
				notEqual: '___$3___',
				valueB: 'packet.event.screen.url'
			},
			{
				notEqual: '___$2___',
				equal: '___$4___',
				valueB: '',
				valueA: '___$2___',
				type: 'IfThen'
			},
			{
				match: 'Location Lat & Lon',
				noMatch: '___$5___',
				value: '___$5___',
				regex: '(?i)[0-9]+\\.[0-9]+%2c-?[0-9]+\\.[0-9]+.*',
				type: 'RegexCheck'
			},
			{
				match: 'BLOCKED: This contains PI Data',
				noMatch: '___$6___',
				type: 'RegexCheck',
				regex:
					'(?i).*@.*|.*[0-9]{8,}.*|.*[gmail[\\.|dot]com|yahoo[\\.|dot]com|msn[\\.|dot]com|aol[\\.|dot]com|hotmail[\\.|dot]com].*|.*%40.*%2c.*',
				value: '___$6___'
			}
		]
	},
	{
		destinations: ['eVar7', 'prop7', 'linkName'],
		name: 'Secure - adImpression - evar7, prop7, linkName - Setting event ',
		eventType: ['adImpression'],
		instructions: [{ type: 'Concatenate', sources: ['ad impression'] }]
	},
	{
		eventType: ['mobileEvent'],
		name: 'Mobile - MobileEvent - evar7, prop7, linkName - Setting event t',
		destinations: ['eVar7', 'prop7', 'linkName'],
		instructions: [
			{
				notEqual: 'screen',
				equal: 'ad impression',
				valueB: 'advertisement',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.type'
			},
			{
				regex: '(?i)(impressionevent)',
				value: 'packet.event.payload.data.type',
				type: 'RegexCheck',
				noMatch: '___$1___',
				match: 'personalization impression'
			},
			{
				match: 'search',
				noMatch: '___$2___',
				regex: '(?i)(datacollection)',
				type: 'RegexCheck',
				value: 'packet.event.payload.data.type'
			},
			{
				match: 'error',
				noMatch: '___$3___',
				type: 'RegexCheck',
				regex: '(?i)(error)',
				value: 'packet.event.payload.data.model.ManageEvents.communication.type'
			},
			{
				match: 'notification',
				noMatch: '___$4___',
				type: 'RegexCheck',
				regex: '(?i)(notification)',
				value: 'packet.event.payload.data.model.ManageEvents.communication.type'
			}
		]
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.id',
					'|',
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.targetScreenId',
					'|',
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.placementId',
					'|',
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.status',
					'|'
				]
			},
			{
				notEqual: '___$1___',
				equal: '',
				valueB: '||||',
				type: 'IfThen',
				valueA: '___$1___'
			}
		],
		name: 'Rule 034,143 (list1) final',
		destinations: ['list1'],
		eventType: ['mobileEvent']
	},
	{
		destinations: ['list2'],
		name: 'List2 - Mobile AD properties',
		eventType: ['mobileAction', 'mobileEvent'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.decisionId',
					'|',
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.offerId'
				]
			},
			{
				match: '',
				noMatch: '___$1___',
				regex: '^\\|$',
				value: '___$1___',
				type: 'RegexCheck'
			}
		]
	},
	{
		destinations: ['eVar3', 'prop3'],
		name: 'Mobile - MobileAction - eVar3 prop3 - Setting link click action',
		eventType: ['mobileAction'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.action',
					'/',
					'packet.event.payload.data.model.ManageRewards.selectedQuickAccess'
				]
			},
			{
				value: '___$1___',
				regex: '.*/$',
				type: 'RegexCheck',
				match: 'packet.event.payload.data.action',
				noMatch: '___$1___'
			},
			{
				regex: '(?i)(managerewards.selectquickaccess)',
				type: 'RegexCheck',
				value: 'packet.event.payload.data.action',
				noMatch: 'packet.event.payload.data.action',
				match: '___$2___'
			},
			{ type: 'ToLowerCase', sources: ['___$3___'] }
		]
	},
	{
		destinations: ['events'],
		name: 'Screen events - Mobile',
		eventType: ['mobileEvent'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.type',
					'_',
					'taxonomy.applicationType',
					'_',
					'taxonomy.DESC4',
					'_',
					'taxonomy.STAGE'
				]
			},
			{
				regex: '(?i)(screen_selfservicemobile_mobilequickpay_entry)',
				type: 'RegexCheck',
				value: '___$1___',
				noMatch: '',
				match: 'event39,event200,event101'
			},
			{
				noMatch: '___$2___',
				match: 'event40,event201,event102',
				value: '___$1___',
				regex: '(?i)(screen_selfservicemobile_mobilequickpay_verify)',
				type: 'RegexCheck'
			},
			{
				noMatch: '___$3___',
				match: 'event41,event202,event103',
				value: '___$1___',
				regex: '(?i)(screen_selfservicemobile_mobilequickpay_complete)',
				type: 'RegexCheck'
			},
			{
				regex: '(?i)(screen_selfservicemobile_mobiletransfers_entry)',
				type: 'RegexCheck',
				value: '___$1___',
				noMatch: '___$4___',
				match: 'event39,event203,event104'
			},
			{
				noMatch: '___$5___',
				match: 'event40,event204,event105',
				value: '___$1___',
				regex: '(?i)(screen_selfservicemobile_mobiletransfers_verify)',
				type: 'RegexCheck'
			},
			{
				match: 'event41,event205,event106',
				noMatch: '___$6___',
				type: 'RegexCheck',
				regex: '(?i)(screen_selfservicemobile_mobiletransfers_complete)',
				value: '___$1___'
			},
			{
				noMatch: '___$7___',
				match: 'event39,event250,event301',
				regex: '(?i)(screen_selfservicemobile_mobilebillpayautopay_entry)',
				type: 'RegexCheck',
				value: '___$1___'
			},
			{
				match: 'event40,event251,event302',
				noMatch: '___$8___',
				regex: '(?i)(screen_selfservicemobile_mobilebillpayautopay_verify)',
				type: 'RegexCheck',
				value: '___$1___'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(screen_selfservicemobile_mobilebillpayautopay_complete)',
				value: '___$1___',
				match: 'event41,event252,event303',
				noMatch: '___$9___'
			},
			{
				value: '___$1___',
				regex: '(?i)(screen_selfservicemobile_mobilebillpaymerchant_entry)',
				type: 'RegexCheck',
				noMatch: '___$10___',
				match: 'event39,event206,event127'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(screen_selfservicemobile_mobilebillpaymerchant_verify)',
				value: '___$1___',
				noMatch: '___$11___',
				match: 'event40,event207,event128'
			},
			{
				match: 'event41,event208,event129',
				noMatch: '___$12___',
				value: '___$1___',
				regex: '(?i)(screen_selfservicemobile_mobilebillpaymerchant_complete)',
				type: 'RegexCheck'
			},
			{
				regex: '(?i)(screen_selfservicemobile_mobilequickpaysplit_entry)',
				type: 'RegexCheck',
				value: '___$1___',
				match: 'event39,event200,event195',
				noMatch: '___$13___'
			},
			{
				regex: '(?i)(screen_selfservicemobile_mobilequickpaysplit_verify)',
				value: '___$1___',
				type: 'RegexCheck',
				match: 'event40,event201,event196',
				noMatch: '___$14___'
			},
			{
				regex: '(?i)(screen_selfservicemobile_mobilequickpaysplit_complete)',
				type: 'RegexCheck',
				value: '___$1___',
				noMatch: '___$15___',
				match: 'event41,event202,event197'
			},
			{
				noMatch: '___$16___',
				match: 'event39,event224,event304',
				regex: '(?i)(screen_selfservicemobile_mobilequickdeposit_entry)',
				type: 'RegexCheck',
				value: '___$1___'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(screen_selfservicemobile_mobilequickdeposit_verify)',
				value: '___$1___',
				noMatch: '___$17___',
				match: 'event40,event225,event305'
			},
			{
				match: 'event41,event226,event306',
				noMatch: '___$18___',
				regex: '(?i)(screen_selfservicemobile_mobilequickdeposit_complete)',
				value: '___$1___',
				type: 'RegexCheck'
			},
			{
				equal: '___$19___',
				notEqual: 'event8,event7=__ads_count__',
				valueB: 'screen',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.type'
			},
			{
				match: 'event8,event26,event7=__ads_count__,event57=__ads_count__',
				noMatch: '___$20___',
				value:
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.status',
				regex:
					'(?i)(aderror|adnetworkerror|decisionnone|decisionnetworkerror|decisionerror|contentnone|contentnetworkerror|contenterror|contentinvalid|contentdynamicfail)',
				type: 'RegexCheck'
			},
			{
				regex: '(?i)(impressionevent)',
				value: 'packet.event.payload.data.type',
				type: 'RegexCheck',
				noMatch: '___$21___',
				match: 'event90'
			},
			{
				value: 'packet.event.payload.data.type',
				regex: '(?i)(datacollection)',
				type: 'RegexCheck',
				match: 'event4',
				noMatch: '___$22___'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(error)',
				value:
					'packet.event.payload.data.model.ManageEvents.communication.type',
				match: 'event27',
				noMatch: '___$23___'
			},
			{
				regex: '(?i)(notification)',
				type: 'RegexCheck',
				value:
					'packet.event.payload.data.model.ManageEvents.communication.type',
				match: 'event29',
				noMatch: '___$24___'
			}
		]
	},
	{
		eventType: ['action'],
		destinations: ['eVar26'],
		name: 'Rule156 final (list1,eVar26) Web Ad clicks',
		action: '(?i)(^selectConversationMessageAction$|^reviewOffer$)',
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.advertisementId.value',
					'|',
					'packet.event.payload.data.advertisementPageId.value',
					'|',
					'packet.event.payload.data.advertisementPlacementId.value',
					'|',
					'|'
				]
			},
			{
				valueB: '',
				notEqual: '___$1___',
				equal: '',
				valueA: 'packet.event.payload.data.advertisementId.value',
				type: 'IfThen'
			},
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.advertisementId.value',
					'|',
					'private_conversation_deck|conversationdeck',
					'|',
					'|'
				]
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.conversationMessageType.value',
				notEqual: '___$2___',
				equal: '___$3___',
				valueB: 'ad'
			}
		]
	},
	{
		name: 'Public Ad Variables list2',
		subType: ['adImpressions', 'adClicks'],
		destinations: ['list2'],
		eventType: ['publicEvent', 'publicAction'],
		instructions: [
			{
				type: 'Concatenate',
				sources: ['packet.event.payload.data.advertisementMidasId', '|']
			},
			{
				type: 'IfThen',
				valueA: '___$1___',
				valueB: '|',
				equal: '',
				notEqual: '___$1___'
			}
		]
	},
	{
		destinations: ['eVar26'],
		name: 'Rule 034,143 (list1) final Mobile action ad click',
		eventType: ['mobileAction'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.id',
					'|',
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.targetScreenId',
					'|',
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.placementId',
					'|',
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.status',
					'|'
				],
				type: 'Concatenate'
			},
			{
				notEqual: '___$1___',
				equal: '',
				valueB: '||||',
				type: 'IfThen',
				valueA: '___$1___'
			}
		],
		action: '(?i)(^ReviewAdvertisement.reviewOffer$)'
	},
	{
		eventType: ['mobileAction'],
		destinations: ['list1'],
		name: 'Rule 034,143 (list1) final Mobile action',
		action:
			'(?i)(^ReviewAdvertisement.interactWithAdvertisement$|^ReviewAdvertisement.reviewOffer$)',
		instructions: [
			{
				sources: [
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.id',
					'|',
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.targetScreenId',
					'|',
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.placementId',
					'|',
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.status',
					'|'
				],
				type: 'Concatenate'
			},
			{
				valueA: '___$1___',
				type: 'IfThen',
				notEqual: '___$1___',
				equal: '',
				valueB: '||||'
			}
		]
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: ['https://secure.chase.com', 'packet.event.screen.id']
			},
			{
				substring: 'jp_cmp=',
				type: 'SubstringAfter',
				value: 'packet.event.screen.currentURL'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$2___' },
			{ value: '___$3___', substring: ';', type: 'SubstringBefore' },
			{ value: '___$4___', substring: '#', type: 'SubstringBefore' },
			{ type: 'ToLowerCase', sources: ['___$5___'] },
			{
				sources: ['___$1___', '&', 'jp_cmp=', '___$6___'],
				type: 'Concatenate'
			},
			{
				sources: ['___$1___', '?', 'jp_cmp=', '___$6___'],
				type: 'Concatenate'
			},
			{
				regex: '.*=.*',
				type: 'RegexCheck',
				value: '___$1___',
				match: '___$7___',
				noMatch: '___$8___'
			},
			{
				match: '___$1___',
				noMatch: '___$9___',
				value: '___$6___',
				regex: '',
				type: 'RegexCheck'
			}
		],
		eventType: ['screen'],
		name: 'Secure - Core, Screen - pageURL eVar2 prop2',
		destinations: ['pageURL', 'eVar2', 'prop2']
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: ['https://secure.chase.com', 'packet.event.screen.id']
			}
		],
		name: 'Rule003',
		destinations: ['pageURL', 'eVar2', 'prop2'],
		eventType: [
			'communication',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		]
	},
	{
		name: 'Secure - Aggregator ID',
		destinations: ['eVar87'],
		eventType: ['screen', 'action', 'interaction'],
		instructions: [
			{ sources: ['packet.event.screen.id'], type: 'ToLowerCase' },
			{
				type: 'RegexReplace',
				replace: '$1',
				regex: '.+[?&]clientid=([^&]*)&?.*',
				value: '___$1___'
			},
			{ sources: ['packet.event.screen.id'], type: 'ToLowerCase' },
			{
				valueB: '___$2___',
				equal: '',
				notEqual: '___$2___',
				valueA: '___$3___',
				type: 'IfThen'
			}
		]
	},
	{
		destinations: ['tnta'],
		subType: ['BLANK', 'personalizationImpression'],
		name: 'Secure - Pers Imp - tnta',
		eventType: ['personalizationImpression', 'publicEvent'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.tntPersonalizationData.elementName'
				],
				type: 'Concatenate'
			}
		]
	},
	{
		instructions: [
			{ sources: ['packet.event.screen.id'], type: 'ToUpperCase' },
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: '.+[?&]ACCOUNTTYPE=([^&]*)&?.*',
				value: '___$1___'
			},
			{
				noMatch: '',
				match: '___$2___',
				type: 'RegexCheck',
				regex: '^[A-Z][A-Z][A-Z]$',
				value: '___$2___'
			},
			{
				regex: '.+[?&]DETAILTYPE=([^&]*)&?.*',
				replace: '$1',
				type: 'RegexReplace',
				value: '___$1___'
			},
			{
				noMatch: '___$3___',
				match: '___$4___',
				regex: '^[A-Z][A-Z][A-Z]$',
				type: 'RegexCheck',
				value: '___$4___'
			},
			{
				regex: '.+[?&]ACCOUNTDETAILTYPE=([^&]*)&?.*',
				replace: '$1',
				value: '___$1___',
				type: 'RegexReplace'
			},
			{
				value: '___$6___',
				regex: '^[A-Z][A-Z][A-Z]$',
				type: 'RegexCheck',
				noMatch: '___$5___',
				match: '___$6___'
			}
		],
		name: 'eVar61 acctDetailType/accountType Secure CXO new',
		destinations: ['eVar61'],
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		]
	},
	{
		destinations: ['eVar59'],
		subType: ['formField'],
		name: 'Rule 009 - Form Field Public - v59',
		eventType: ['publicAction'],
		instructions: [
			{
				sources: [
					'taxonomy.applicationName',
					'||',
					'packet.event.payload.data.formName',
					'||',
					'packet.event.payload.data.progressStepName',
					'||'
				],
				type: 'Concatenate'
			},
			{
				equal: '',
				notEqual: '___$1___',
				valueB: '||||||',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{ sources: ['___$2___'], type: 'ToLowerCase' }
		]
	},
	{
		instructions: [
			{
				value: 'packet.event.visitor.adobeData',
				substring: '|MCAAMB',
				type: 'SubstringBefore'
			},
			{ substring: 'MCAAMLH|', type: 'SubstringAfter', value: '___$1___' }
		],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		name: 'Public aamlh',
		destinations: ['aamlh'],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		]
	},
	{
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		destinations: ['browserHeight'],
		name: 'Public bh Rule006',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		instructions: [
			{
				substring: 'x',
				value: 'packet.event.device.browserRes',
				type: 'SubstringAfter'
			}
		]
	},
	{
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		name: 'Public bw Rule006',
		destinations: ['browserWidth'],
		instructions: [
			{
				type: 'SubstringBefore',
				substring: 'x',
				value: 'packet.event.device.browserRes'
			}
		]
	},
	{
		destinations: ['resolution'],
		name: 'Public set resolution to screenRes',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		instructions: [
			{ type: 'Concatenate', sources: ['packet.event.device.screenRes'] }
		]
	},
	{
		instructions: [
			{ sources: ['packet.event.device.javaEnabled'], type: 'Concatenate' }
		],
		name: 'Public javaEnabled',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		destinations: ['javaEnabled'],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		]
	},
	{
		instructions: [
			{ sources: ['packet.event.device.colorDepth'], type: 'Concatenate' }
		],
		destinations: ['colorDepth'],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		name: 'Public colorDepth',
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		]
	},
	{
		instructions: [
			{ sources: ['packet.headers.accept-language[0]'], type: 'ToLowerCase' },
			{ value: '___$1___', substring: ',', type: 'SubstringBefore' }
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		name: 'Public language, evar5, prop5 from accept-language new',
		destinations: ['language', 'eVar5', 'prop5']
	},
	{
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		name: 'Public IPAddress',
		destinations: ['IPAddress'],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		instructions: [
			{
				type: 'SubstringBefore',
				substring: ',',
				value: 'packet.headers.x-forwarded-for[0]'
			}
		]
	},
	{
		instructions: [
			{ sources: ['packet.event.device.javaScriptVer'], type: 'Concatenate' }
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		destinations: ['javaScriptVersion'],
		name: 'Public javaScriptVersion',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		]
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.timestamp',
					'packet.event.location.server_offset'
				],
				type: 'AddInteger'
			},
			{ type: 'ConvertMillisecondsToSeconds', sources: ['___$1___'] }
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		destinations: ['timestamp'],
		name: 'TimeStamp-Public in seconds',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		]
	},
	{
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		destinations: ['pageURL', 'eVar2', 'prop2'],
		name: 'Public Raw pageURL - Rule004?,005',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		instructions: [
			{ type: 'ToLowerCase', sources: ['packet.event.screen.url'] },
			{
				replace: '',
				regex: 'lastlon=-?[0-9]{1,}\\.[0-9]{3,}',
				value: '___$1___',
				type: 'RegexReplace'
			},
			{
				value: '___$1___',
				regex: '.*lastlon=.*',
				type: 'RegexCheck',
				match: '___$2___',
				noMatch: '___$1___'
			},
			{
				regex: 'lastlat=-?[0-9]{1,}\\.[0-9]{3,}',
				replace: '',
				type: 'RegexReplace',
				value: '___$3___'
			},
			{
				noMatch: '___$3___',
				match: '___$4___',
				regex: '.*lastlat=.*',
				value: '___$3___',
				type: 'RegexCheck'
			}
		]
	},
	{
		destinations: ['prop55'],
		name: 'Set all Public o events prop55',
		subType: [
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		instructions: [{ type: 'Concatenate', sources: ['o'] }]
	},
	{
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		destinations: ['linkType'],
		subType: [
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		name: 'Set all Public o events linkType',
		instructions: [{ sources: ['lnk_o'], type: 'Concatenate' }]
	},
	{
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		name: 'Public- Visitor Type',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		destinations: ['eVar13', 'prop13'],
		instructions: [
			{
				match: 'packet.event.visitor.visitorType',
				noMatch: 'Other',
				regex: '(?i)(unknwn|knwn_rmbrme|knwn)',
				type: 'RegexCheck',
				value: 'packet.event.visitor.visitorType'
			}
		]
	},
	{
		instructions: [
			{ sources: ['packet.event.screen.url'], type: 'ToUpperCase' },
			{
				type: 'RegexReplace',
				replace: '$1',
				regex: '.+[?&]ACCOUNTTYPE=([^&]*)&?.*',
				value: '___$1___'
			},
			{
				match: '___$2___',
				noMatch: '',
				regex: '^[A-Z][A-Z][A-Z]$',
				type: 'RegexCheck',
				value: '___$2___'
			},
			{
				regex: '.+[?&]DETAILTYPE=([^&]*)&?.*',
				replace: '$1',
				type: 'RegexReplace',
				value: '___$1___'
			},
			{
				noMatch: '___$3___',
				match: '___$4___',
				regex: '^[A-Z][A-Z][A-Z]$',
				type: 'RegexCheck',
				value: '___$4___'
			},
			{
				type: 'RegexReplace',
				replace: '$1',
				regex: '.+[?&]ACCOUNTDETAILTYPE=([^&]*)&?.*',
				value: '___$1___'
			},
			{
				value: '___$6___',
				regex: '^[A-Z][A-Z][A-Z]$',
				type: 'RegexCheck',
				noMatch: '___$5___',
				match: '___$6___'
			}
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		name: 'eVar61 acctDetailType/accountType Public new',
		destinations: ['eVar61']
	},
	{
		instructions: [{ type: 'Concatenate', sources: ['Y'] }],
		name: 'Cookies Enabled',
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		destinations: ['cookiesEnabled'],
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'personalizationImpression',
			'publicEvent'
		]
	},
	{
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'personalizationImpression',
			'publicEvent'
		],
		destinations: ['currencyCode'],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		name: 'Currency Code',
		instructions: [{ sources: ['USD'], type: 'Concatenate' }]
	},
	{
		instructions: [
			{
				value: 'packet.event.visitor.adobeData',
				substring: '|MCAID',
				type: 'SubstringBefore'
			},
			{ value: '___$1___', substring: '|MCAAMLH', type: 'SubstringBefore' },
			{ value: '___$2___', substring: 'MCMID|', type: 'SubstringAfter' },
			{
				type: 'IfThen',
				valueA: '___$3___',
				notEqual: '___$3___',
				equal: 'packet.event.visitor.adobeData.mid',
				valueB: ''
			}
		],
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'personalizationImpression',
			'publicEvent'
		],
		destinations: ['eVar73', 'marketingCloudVisitorID'],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		name: 'MID for All frameworks  eVar73'
	},
	{
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'personalizationImpression',
			'publicEvent'
		],
		destinations: ['eVar12', 'prop12'],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		name: 'All frameworks - Customer segment',
		instructions: [
			{
				noMatch: 'Other',
				match: 'packet.event.visitor.segment',
				type: 'RegexCheck',
				regex: '(?i)^[a-z]{3}$',
				value: 'packet.event.visitor.segment'
			}
		]
	},
	{
		instructions: [
			{
				regex: '(N|Y)',
				type: 'RegexCheck',
				value: 'packet.event.visitor.loggedInState',
				match: 'packet.event.visitor.loggedInState',
				noMatch: 'Other'
			}
		],
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'personalizationImpression',
			'publicEvent'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		name: 'Rule 185, 186 - Visitor LoggedIn',
		destinations: ['eVar11', 'prop11']
	},
	{
		instructions: [
			{
				value: 'packet.event.visitor.adobeData',
				regex: '(?i)(.+MCAAMLH..MCAAMB..M.+)',
				type: 'RegexCheck',
				noMatch: 'Demdex MID',
				match: 'Chase MID'
			}
		],
		destinations: ['prop73'],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		name: 'MID Type - Demdex or Chase',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'personalizationImpression',
			'publicEvent'
		]
	},
	{
		name: 'CXO Clickthrough Ad Vars list1 new',
		destinations: ['list1'],
		eventType: ['screen'],
		instructions: [
			{
				type: 'SubstringAfter',
				substring: 'jp_aid_a=',
				value: 'packet.event.screen.currentURL'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$1___' },
			{
				substring: 'jp_aid_p=',
				value: 'packet.event.screen.currentURL',
				type: 'SubstringAfter'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$3___' },
			{ type: 'RegexReplace', replace: '/', regex: '%2F', value: '___$4___' },
			{
				type: 'RegexCheck',
				regex: '.*%2F.*',
				value: '___$4___',
				match: '___$5___',
				noMatch: '___$4___'
			},
			{ substring: '/', value: '___$6___', type: 'SubstringAfter' },
			{ substring: '#', value: '___$7___', type: 'SubstringBefore' },
			{
				type: 'RegexCheck',
				regex: '.*#.*',
				value: '___$7___',
				noMatch: '___$7___',
				match: '___$8___'
			},
			{ value: '___$6___', substring: '/', type: 'SubstringBefore' },
			{
				type: 'Concatenate',
				sources: ['___$2___', '|', '___$10___', '|', '___$9___', '||']
			},
			{
				regex: '(?i)(.*jp_aid_a.*jp_aid_p.*)',
				value: 'packet.event.screen.currentURL',
				type: 'RegexCheck',
				noMatch: '',
				match: '___$11___'
			},
			{
				notEqual: '___$12___',
				equal: '',
				valueB: '',
				type: 'IfThen',
				valueA: '___$2___'
			}
		]
	},
	{
		instructions: [
			{
				type: 'SubstringBefore',
				substring: '_',
				value: 'packet.event.payload.data.formfieldName'
			},
			{
				regex:
					'(?i)(make_multiple_bill_payments|make_mortgage_payment|manage_user_access|my_investment_distribution_settings|cancel_confirmation|update_ach_collections_single|linked_applications)',
				value: 'packet.event.component',
				type: 'RegexCheck',
				noMatch: 'packet.event.payload.data.formfieldName',
				match: '___$1___'
			},
			{
				valueB: '0',
				equal: 'zero',
				notEqual: 'packet.event.payload.data.selection',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.selection'
			},
			{
				type: 'Concatenate',
				sources: [
					'taxonomy.applicationName',
					'|',
					'|',
					'packet.event.component',
					'|',
					'|',
					'___$2___',
					'|',
					'|'
				]
			},
			{ sources: ['___$4___', '___$3___'], type: 'Concatenate' },
			{
				type: 'RegexCheck',
				regex: '([0-9]|[0-9]_[0-9]|zero)',
				value: 'packet.event.payload.data.selection',
				noMatch: '___$4___',
				match: '___$5___'
			},
			{
				valueB: '||||||',
				equal: '',
				notEqual: '___$6___',
				valueA: '___$6___',
				type: 'IfThen'
			}
		],
		eventType: ['interaction'],
		destinations: ['eVar59'],
		name: 'Rule 009- Form Type'
	},
	{
		subType: ['screen'],
		name: 'Public Clickthrough Ad Vars list1',
		destinations: ['list1'],
		eventType: ['publicEvent'],
		instructions: [
			{
				type: 'SubstringAfter',
				substring: 'jp_aid_a=',
				value: 'packet.event.screen.url'
			},
			{ value: '___$1___', substring: '&', type: 'SubstringBefore' },
			{
				type: 'SubstringAfter',
				substring: 'jp_aid_p=',
				value: 'packet.event.screen.url'
			},
			{ value: '___$3___', substring: '&', type: 'SubstringBefore' },
			{ replace: '/', regex: '%2F', type: 'RegexReplace', value: '___$4___' },
			{
				value: '___$4___',
				regex: '.*%2F.*',
				type: 'RegexCheck',
				match: '___$5___',
				noMatch: '___$4___'
			},
			{ value: '___$6___', substring: '/', type: 'SubstringBefore' },
			{ value: '___$6___', substring: '/', type: 'SubstringAfter' },
			{ substring: '#', type: 'SubstringBefore', value: '___$8___' },
			{
				sources: ['___$2___', '|', '___$7___', '|', '___$9___', '|', '|'],
				type: 'Concatenate'
			},
			{
				value: 'packet.event.screen.url',
				regex: '(?i)(.*jp_aid_a.*jp_aid_p.*)',
				type: 'RegexCheck',
				match: '___$10___',
				noMatch: ''
			},
			{
				type: 'IfThen',
				valueA: '___$2___',
				valueB: '',
				notEqual: '___$11___',
				equal: ''
			}
		]
	},
	{
		instructions: [
			{ sources: ['personalization impression'], type: 'Concatenate' }
		],
		eventType: ['personalizationImpression', 'publicEvent'],
		destinations: ['prop7', 'linkName', 'eVar7'],
		name: 'Personalization Impression evar7/linkname CXO',
		subType: ['BLANK', 'personalizationImpression']
	},
	{
		subType: ['BLANK', 'personalizationImpression'],
		name: 'Personalization Impression set event90 CXO',
		destinations: ['events'],
		eventType: ['personalizationImpression', 'publicEvent'],
		instructions: [{ type: 'Concatenate', sources: ['event90'] }]
	},
	{
		screen: '.*',
		instructions: [
			{
				regex: '(?i)(MON|MOP|PBN|PBP)',
				value: 'packet.event.payload.data.app.channel',
				type: 'RegexCheck',
				match: '',
				noMatch: ''
			}
		],
		destinations: ['prop72'],
		name: 'Mobile - All Events - prop72',
		eventType: ['mobileAction', 'mobileEvent']
	},
	{
		instructions: [
			{
				type: 'ToLowerCase',
				sources: [
					'packet.event.payload.data.model.ManageEvents.communication.scopeReference'
				]
			},
			{
				type: 'ToLowerCase',
				sources: [
					'packet.event.payload.data.model.ManageEvents.communication.name'
				]
			},
			{ sources: ['___$1___', '|', '___$2___'], type: 'Concatenate' },
			{
				sources: [
					'___$3___',
					'/',
					'packet.event.payload.data.model.ManageEvents.communication.context'
				],
				type: 'Concatenate'
			},
			{
				type: 'RegexCheck',
				regex: '.*/$',
				value: '___$4___',
				match: '___$3___',
				noMatch: '___$4___'
			},
			{
				type: 'IfThen',
				valueA: '___$5___',
				valueB: '|',
				notEqual: '___$5___',
				equal: ''
			},
			{
				noMatch: '',
				match: '___$6___',
				regex: '(?i)(communication)',
				value: 'packet.event.payload.data.type',
				type: 'RegexCheck'
			}
		],
		eventType: ['mobileEvent'],
		name: 'Mobile - Communication - eVar57 - Mobile Communication Attribut',
		destinations: ['eVar57']
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.model.SearchItems.searchResult.searchType'
				],
				type: 'Concatenate'
			}
		],
		destinations: ['eVar21'],
		name: 'Mobile - MobileEvent - datacollection/search - eVar21 - search ',
		eventType: ['mobileEvent']
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.model.SearchItems.searchResult.searchOptionsCount'
				],
				type: 'Concatenate'
			}
		],
		name: 'Mobile - MobileEvent - datacollection/search - eVar29 - search ',
		destinations: ['eVar29'],
		eventType: ['mobileEvent']
	},
	{
		destinations: ['eVar104'],
		name: 'eVar104 - Dark Canary Visitor In Test ID',
		eventType: ['mobileEvent', 'personalizationImpression'],
		instructions: [
			{
				notEqual: '',
				equal:
					'packet.event.payload.data.darkCanaryPersonalizationData.elementName',
				valueB: 'VISITOR_IN_TEST',
				type: 'IfThen',
				valueA:
					'packet.event.payload.data.darkCanaryPersonalizationData.category'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.type',
				valueB: 'screen',
				equal: '___$1___',
				notEqual: ''
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.type',
				valueB: '',
				equal: '___$1___',
				notEqual: '___$2___'
			}
		]
	},
	{
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.darkCanaryPersonalizationData.category',
					'|',
					'packet.event.payload.data.model.ReviewDarkCanary.personalizationEvent.elementPlacement',
					'|',
					'packet.event.payload.data.darkCanaryPersonalizationData.elementContext'
				]
			},
			{
				type: 'IfThen',
				valueA: '___$1___',
				notEqual: '___$1___',
				equal: '',
				valueB: '||'
			},
			{
				notEqual: '',
				equal: '___$2___',
				valueB: 'screen',
				valueA: 'packet.event.payload.data.type',
				type: 'IfThen'
			},
			{
				valueB: '',
				equal: '___$2___',
				notEqual: '___$3___',
				valueA: 'packet.event.payload.data.type',
				type: 'IfThen'
			},
			{
				type: 'IfThen',
				valueA:
					'packet.event.payload.data.darkCanaryPersonalizationData.elementName',
				valueB: 'commonDashboard.enable',
				notEqual: '___$2___',
				equal: '___$4___'
			}
		],
		eventType: ['mobileEvent', 'personalizationImpression'],
		name: 'eVar115 Dark Canary Personalization attributes',
		destinations: ['eVar115']
	},
	{
		destinations: ['list3'],
		name: 'Secure Mobile - list3 - Dark Canary Element Name (new)',
		eventType: ['mobileEvent', 'screen', 'personalizationImpression'],
		instructions: [
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.type',
				valueB: 'screen',
				notEqual: '',
				equal:
					'packet.event.payload.data.darkCanaryPersonalizationData.elementName'
			},
			{
				valueA: 'packet.event.payload.data.type',
				type: 'IfThen',
				valueB: '',
				equal:
					'packet.event.payload.data.darkCanaryPersonalizationData.elementName',
				notEqual: '___$1___'
			},
			{
				valueB: 'commonDashboard.enable',
				equal: '___$2___',
				notEqual:
					'packet.event.payload.data.darkCanaryPersonalizationData.elementName',
				valueA:
					'packet.event.payload.data.darkCanaryPersonalizationData.elementName',
				type: 'IfThen'
			}
		]
	},
	{
		instructions: [
			{
				regex: '(?i)(^reviewaccountdocuments.*)',
				type: 'RegexCheck',
				value: 'packet.event.payload.data.action',
				noMatch: 'link click',
				match: 'document download'
			},
			{
				value: 'packet.event.payload.data.action',
				regex: '(?i)(ManageSoftwareSettings.exitSoftware)',
				type: 'RegexCheck',
				match: 'exit link',
				noMatch: '___$1___'
			},
			{
				valueB: 'ReviewAdvertisement.reviewOffer',
				equal: 'ad click',
				notEqual: '___$2___',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.action'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.action',
				valueB: 'ReviewAdvertisement.interactWithAdvertisement',
				notEqual: '___$3___',
				equal: 'ad interaction'
			},
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.model.ManageQuickActions.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewFinancialHealth.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewNudge.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewInsight.personalizationEvent.product'
				]
			},
			{
				notEqual: 'personalization click',
				equal: '___$4___',
				valueB: '',
				type: 'IfThen',
				valueA: '___$5___'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(.*dismiss.*|.*expand.*|.*interactwith.*)',
				value: 'packet.event.payload.data.action',
				noMatch: '___$6___',
				match: 'personalization interaction'
			},
			{
				valueA:
					'packet.event.payload.data.model.ReviewInsight.insight.interactionType',
				type: 'IfThen',
				valueB: 'CLICK',
				equal: '___$7___',
				notEqual: 'personalization interaction'
			},
			{
				valueB: '',
				equal: '___$7___',
				notEqual: '___$8___',
				type: 'IfThen',
				valueA:
					'packet.event.payload.data.model.ReviewInsight.insight.interactionType'
			},
			{
				value: '___$5___',
				regex: '(?i)(snapshot|quickaction|nudge|financialhealthcarousel)',
				type: 'RegexCheck',
				match: '___$9___',
				noMatch: '___$4___'
			}
		],
		eventType: ['mobileAction'],
		destinations: ['eVar7', 'prop7', 'linkName'],
		name: 'Rule042, Rule047, Rule048'
	},
	{
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		],
		destinations: ['eVar60'],
		name: 'eVar60 - PaymentNet attributes',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.ccapp',
					'|',
					'packet.event.payload.data.ccorgid',
					'|',
					'packet.event.payload.data.ccuserid',
					'|',
					'packet.event.payload.data.ccrole',
					'|',
					'packet.event.payload.data.ccprole'
				],
				type: 'Concatenate'
			},
			{
				valueB: '||||',
				notEqual: '___$1___',
				equal: '',
				valueA: '___$1___',
				type: 'IfThen'
			}
		]
	},
	{
		name: 'Hybrid and Web Channel Revised',
		destinations: ['channel'],
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		instructions: [
			{
				replace: '$1',
				value: 'packet.headers.x-jpmc-channel[0]',
				regex: '.*id=(C30|MON|MOD|MBN|MOE|MOP|MBD|PBN|PBP|PBD)$',
				type: 'RegexReplace'
			},
			{
				match: 'packet.event.app.channel',
				noMatch: '___$1___',
				regex: 'C30|MON|MOD|MBN|MOE|MOP|MBD|PBN|PBP|PBD',
				type: 'RegexCheck',
				value: 'packet.event.app.channel'
			},
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: '.*id=(C30|MON|MOD|MBN|MOE|MOP|MBD|PBN|PBP|PBD)$',
				value: 'packet.event.app.channel'
			},
			{
				equal: '___$2___',
				notEqual: '___$1___',
				valueB: '',
				valueA: '___$1___',
				type: 'IfThen'
			},
			{
				notEqual: '___$4___',
				equal: '___$3___',
				valueB: '',
				type: 'IfThen',
				valueA: '___$4___'
			},
			{
				type: 'IfThen',
				valueA: '___$5___',
				valueB: '',
				notEqual: '___$5___',
				equal: 'C30'
			},
			{
				match: 'Mobile Unknown',
				noMatch: '___$6___',
				regex: '(?i)(.*mobilehybrid=.*)',
				value: 'packet.event.screen.id',
				type: 'RegexCheck'
			},
			{
				type: 'IfThen',
				valueA: '___$6___',
				equal: '___$7___',
				notEqual: '___$6___',
				valueB: 'C30'
			},
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: '.+[?&]channel=([^&]*)&?.*',
				value: 'packet.event.screen.id'
			},
			{ sources: ['___$9___'], type: 'ToUpperCase' },
			{
				regex: 'MON|MOD|MBN|MOE|MOP|MBD|PBN|PBP|PBD',
				value: '___$10___',
				type: 'RegexCheck',
				match: '___$10___',
				noMatch: '___$8___'
			}
		]
	},
	{
		name: 'Public QS evar6,prop6 Rule021',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		],
		destinations: ['eVar6', 'prop6'],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		],
		instructions: [
			{ type: 'ToLowerCase', sources: ['packet.event.screen.url'] },
			{ value: '___$1___', substring: '?', type: 'SubstringAfter' },
			{
				type: 'RegexCheck',
				regex:
					'(?si)(q|search)=(.*@.*|.*([\\d-\t/]{8,}).*|.*(%40|@)\\S+(%2C|\\.)com.*|.*(gmail(\\.|\\s*dot\\s*)com.*|.*yahoo\\.com.*|.*msn\\.com.*|.*aol\\.com.*|.*hotmail\\.com).*|.*[0-9]+\\.[0-9]+%2c-?[0-9]+\\.[0-9]+.*)',
				value: '___$2___',
				match: '',
				noMatch: '___$2___'
			}
		]
	},
	{
		instructions: [
			{ type: 'ToLowerCase', sources: ['packet.event.screen.id'] },
			{ type: 'SubstringAfter', substring: '&ecouponcode=', value: '___$1___' },
			{ substring: '&', value: '___$2___', type: 'SubstringBefore' },
			{
				valueA: '___$3___',
				type: 'IfThen',
				valueB: '',
				notEqual: '___$3___',
				equal: ''
			}
		],
		eventType: ['screen'],
		destinations: ['eVar96'],
		name: 'Set eVar90- CXO'
	},
	{
		eventType: ['mobileAction', 'mobileEvent'],
		destinations: ['eVar74'],
		name: 'Mobile - Core - eVar74 - Apple device detail',
		instructions: [
			{
				type: 'SubstringAfter',
				substring: 'Model:',
				value: 'packet.headers.user-agent'
			},
			{ value: '___$1___', substring: ';', type: 'SubstringBefore' },
			{
				noMatch: '___$2___',
				match: '',
				regex: '(?i)(Simulator.*)',
				value: '___$2___',
				type: 'RegexCheck'
			}
		]
	},
	{
		eventType: ['mobileAction', 'mobileEvent'],
		destinations: ['userAgent', 'eVar72'],
		name: 'Mobile - Core - eVar72, UserAgent - userAgent fix',
		instructions: [
			{
				valueB: '',
				notEqual: 'packet.event.payload.data.device.userAgent',
				equal: 'unknown',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.device.userAgent'
			}
		]
	},
	{
		destinations: ['eVar114'],
		name: 'Mobile - Personalization - eVar114 - Personalization Attributes',
		eventType: ['mobileAction', 'mobileEvent'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.model.ReviewNudge.personalizationEvent.category',
					'|',
					'packet.event.payload.data.model.ReviewNudge.personalizationEvent.elementName',
					'|',
					'packet.event.payload.data.model.ReviewNudge.personalizationEvent.elementPlacement',
					'|',
					'packet.event.payload.data.model.ReviewNudge.personalizationEvent.elementContext'
				],
				type: 'Concatenate'
			},
			{
				sources: [
					'packet.event.payload.data.model.ReviewInsight.personalizationEvent.category',
					'|',
					'packet.event.payload.data.model.ReviewInsight.personalizationEvent.elementName',
					'|',
					'packet.event.payload.data.model.ReviewInsight.personalizationEvent.elementPlacement',
					'|',
					'packet.event.payload.data.model.ReviewInsight.personalizationEvent.elementContext'
				],
				type: 'Concatenate'
			},
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.model.ManageQuickActions.personalizationEvent.category',
					'|',
					'packet.event.payload.data.model.ManageQuickActions.personalizationEvent.elementName',
					'|',
					'packet.event.payload.data.model.ManageQuickActions.personalizationEvent.elementPlacement',
					'|',
					'packet.event.payload.data.model.ManageQuickActions.personalizationEvent.elementContext'
				]
			},
			{
				sources: [
					'packet.event.payload.data.model.ReviewFinancialHealth.personalizationEvent.category',
					'|',
					'packet.event.payload.data.model.ReviewFinancialHealth.personalizationEvent.elementName',
					'|',
					'packet.event.payload.data.model.ReviewFinancialHealth.personalizationEvent.elementPlacement',
					'|',
					'packet.event.payload.data.model.ReviewFinancialHealth.personalizationEvent.elementContext'
				],
				type: 'Concatenate'
			},
			{
				sources: [
					'packet.event.payload.data.model.ReviewPersonalizedInvestment.personalizationEvent.category',
					'|',
					'packet.event.payload.data.model.ReviewPersonalizedInvestment.personalizationEvent.elementName',
					'|',
					'packet.event.payload.data.model.ReviewPersonalizedInvestment.personalizationEvent.elementPlacement',
					'|',
					'packet.event.payload.data.model.ReviewPersonalizedInvestment.personalizationEvent.elementContext'
				],
				type: 'Concatenate'
			},
			{
				equal: '___$2___',
				notEqual: '___$1___',
				valueB: '|||',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				valueB: '|||',
				notEqual: '___$6___',
				equal: '___$3___',
				valueA: '___$6___',
				type: 'IfThen'
			},
			{
				type: 'IfThen',
				valueA: '___$7___',
				valueB: '|||',
				equal: '___$4___',
				notEqual: '___$7___'
			},
			{
				equal: '___$5___',
				notEqual: '___$8___',
				valueB: '|||',
				type: 'IfThen',
				valueA: '___$8___'
			},
			{
				equal: '',
				notEqual: '___$9___',
				valueB: '|||',
				valueA: '___$9___',
				type: 'IfThen'
			},
			{
				sources: [
					'packet.event.payload.data.model.ReviewPersonalizedInvestment.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewInsight.personalizationEvent.product',
					'packet.event.payload.data.model.ManageQuickActions.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewFinancialHealth.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewNudge.personalizationEvent.product'
				],
				type: 'Concatenate'
			},
			{
				match: '___$10___',
				noMatch: '',
				value: '___$11___',
				regex:
					'(?i)(snapshot|quickaction|nudge|financialhealthcarousel|prospect_investments_experience)',
				type: 'RegexCheck'
			}
		]
	},
	{
		instructions: [
			{
				match: 'event5',
				noMatch: 'event1',
				regex: '(?i)(^reviewaccountdocuments.*)',
				type: 'RegexCheck',
				value: 'packet.event.payload.data.action'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(ManageSoftwareSettings.exitSoftware)',
				value: 'packet.event.payload.data.action',
				noMatch: '___$1___',
				match: 'event28'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.action',
				valueB: 'ReviewAdvertisement.reviewOffer',
				notEqual: '___$2___',
				equal: 'event9'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.action',
				valueB: 'ReviewAdvertisement.reviewOffer',
				equal: 'event9,event26',
				notEqual: '___$3___'
			},
			{
				regex:
					'(?i)(aderror|adnetworkerror|decisionnone|decisionnetworkerror|decisionerror|contentnone|contentnetworkerror|contenterror|contentinvalid|contentdynamicfail)',
				value:
					'packet.event.payload.data.model.ReviewAdvertisement.advertisement.status',
				type: 'RegexCheck',
				match: '___$4___',
				noMatch: '___$3___'
			},
			{
				valueA: 'packet.event.payload.data.action',
				type: 'IfThen',
				equal: 'event10',
				notEqual: '___$5___',
				valueB: 'ReviewAdvertisement.interactWithAdvertisement'
			},
			{
				valueB: 'ReviewAdvertisement.interactWithAdvertisement',
				equal: 'event10,event26',
				notEqual: '___$6___',
				valueA: 'packet.event.payload.data.action',
				type: 'IfThen'
			},
			{
				value: 'packet.event.model.ReviewAdvertisement.advertisement.status',
				regex:
					'(?i)(aderror|adnetworkerror|decisionnone|decisionnetworkerror|decisionerror|contentnone|contentnetworkerror|contenterror|contentinvalid|contentdynamicfail)',
				type: 'RegexCheck',
				noMatch: '___$6___',
				match: '___$7___'
			},
			{
				sources: [
					'packet.event.payload.data.model.ManageQuickActions.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewPersonalizedInvestment.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewFinancialHealth.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewNudge.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewInsight.personalizationEvent.product'
				],
				type: 'Concatenate'
			},
			{
				notEqual: 'event92',
				equal: '___$8___',
				valueB: '',
				type: 'IfThen',
				valueA: '___$9___'
			},
			{
				value: 'packet.event.payload.data.action',
				regex: '(?i)(.*dismiss.*|.*expand.*|.*interactwith.*)',
				type: 'RegexCheck',
				noMatch: '___$10___',
				match: 'event91'
			},
			{
				type: 'IfThen',
				valueA:
					'packet.event.payload.data.model.ReviewInsight.insight.interactionType',
				notEqual: 'event91',
				equal: '___$11___',
				valueB: 'CLICK'
			},
			{
				type: 'IfThen',
				valueA:
					'packet.event.payload.data.model.ReviewInsight.insight.interactionType',
				notEqual: '___$12___',
				equal: '___$11___',
				valueB: ''
			},
			{
				noMatch: '___$8___',
				match: '___$13___',
				regex:
					'(?i)(snapshot|quickaction|nudge|financialhealthcarousel|prospect_investments_experience)',
				value: '___$9___',
				type: 'RegexCheck'
			}
		],
		eventType: ['mobileAction'],
		name: 'Rule080,Rule103,Rule085,Rule101,Rule084',
		destinations: ['events']
	},
	{
		destinations: ['eVar42'],
		name: 'Mobile - Personalization - eVar42 - personalization product',
		eventType: ['mobileAction', 'mobileEvent'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.model.ManageQuickActions.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewPersonalizedInvestment.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewFinancialHealth.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewNudge.personalizationEvent.product',
					'packet.event.payload.data.model.ReviewInsight.personalizationEvent.product'
				]
			},
			{
				type: 'RegexCheck',
				regex:
					'(?i)(snapshot|quickaction|nudge|financialhealthcarousel|prospect_investments_experience)',
				value: '___$1___',
				match: '___$1___',
				noMatch: ''
			}
		]
	},
	{
		instructions: [
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.articlename',
				valueB: '',
				notEqual: 'packet.event.payload.data.articlename',
				equal: ''
			}
		],
		eventType: ['publicEvent', 'publicAction'],
		destinations: ['eVar84'],
		name: 'Classic - Screen - evar84 - Ultimate rewards Article name',
		subType: ['screen', 'dynamicLinks']
	},
	{
		instructions: [
			{
				regex: '.+[?&](?i)articlename=([^&]*)&?.*',
				replace: '$1',
				value: 'packet.event.screen.id',
				type: 'RegexReplace'
			},
			{
				valueA: '___$1___',
				type: 'IfThen',
				equal: '',
				notEqual: '___$1___',
				valueB: 'packet.event.screen.id'
			},
			{
				type: 'RegexReplace',
				replace: '$1',
				regex: '.+[?&](?i)bioname=([^&]*)&?.*',
				value: 'packet.event.screen.id'
			},
			{
				type: 'IfThen',
				valueA: '___$3___',
				valueB: 'packet.event.screen.id',
				notEqual: '___$3___',
				equal: '___$2___'
			}
		],
		eventType: ['screen', 'action'],
		name: 'Secure - Screen, Action - eVar84 - Article Name Bio Name',
		destinations: ['eVar84']
	},
	{
		instructions: [
			{
				regex: '(?i)(.*mobilehybrid=.*)',
				value: 'packet.event.screen.url',
				type: 'RegexCheck',
				noMatch: 'COL',
				match: 'Mobile Unknown'
			},
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: '.+[?&]channel=([^&]*)&?.*',
				value: 'packet.event.screen.url'
			},
			{ type: 'ToUpperCase', sources: ['___$2___'] },
			{
				regex: 'MON|MOD|MBN|MOE|MOP|MBD|PBN|PBP|PBD',
				type: 'RegexCheck',
				value: '___$3___',
				match: '___$3___',
				noMatch: '___$1___'
			},
			{
				noMatch: '___$4___',
				match: 'packet.event.payload.data.ChannelID',
				value: 'packet.event.payload.data.ChannelID',
				regex: 'MON|MOD|MBN|MOE|MOP|MBD|PBN|PBP|PBD',
				type: 'RegexCheck'
			}
		],
		destinations: ['channel'],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		],
		name: 'Public Channel Rule167',
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		]
	},
	{
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'personalizationImpression'
		],
		destinations: ['prop52'],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		],
		name: 'Prop52-Hybrid bundle',
		instructions: [
			{
				type: 'RegexCheck',
				regex: '(?i).*hybridBundle.*',
				value: 'packet.event.screen.currentURL',
				match: 'Hybrid',
				noMatch: ''
			},
			{
				noMatch: '___$1___',
				match: 'Classic FramedIn',
				regex: '(?i).*chase3framedpage.*',
				value: 'packet.event.screen.url',
				type: 'RegexCheck'
			},
			{
				valueB: '',
				equal: 'No',
				notEqual: '___$2___',
				type: 'IfThen',
				valueA: '___$2___'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(hybrid)',
				value: 'packet.event.payload.data.hybridbundle',
				match: 'Hybrid',
				noMatch: '___$3___'
			}
		]
	},
	{
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'adClick',
			'interaction'
		],
		destinations: ['eVar52'],
		name: 'Component',
		instructions: [{ sources: ['packet.event.component'], type: 'ToLowerCase' }]
	},
	{
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		name: 'Secure - All events - eVar44- Card AOC',
		destinations: ['eVar44'],
		instructions: [
			{
				replace: '$1',
				value: 'packet.event.screen.id',
				regex: '.+[?&](?i)aoc=([^&]*)&?.*',
				type: 'RegexReplace'
			},
			{
				type: 'IfThen',
				valueA: '___$1___',
				valueB: 'packet.event.screen.id',
				equal: '',
				notEqual: '___$1___'
			}
		]
	},
	{
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'personalizationImpression',
			'publicEvent'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		name: 'eVar51 - Traffic Type - Mobile or Web Browser (new)',
		destinations: ['eVar51'],
		instructions: [
			{
				match: 'Mobile Browser',
				noMatch: 'Web Browser',
				type: 'RegexCheck',
				regex: '(?i)(.*CPU.iPhone.OS.*|.*CPU.OS.*|.*Android.*)',
				value: 'packet.headers.user-agent'
			},
			{
				regex: '(?i).*hybridBundle.*',
				type: 'RegexCheck',
				value: 'packet.event.screen.currentURL',
				match: 'Mobile Native App',
				noMatch: '___$1___'
			},
			{
				match: 'Mobile Native App',
				noMatch: '___$2___',
				type: 'RegexCheck',
				regex: '.*mobilehybrid=.*',
				value: 'packet.event.screen.url'
			},
			{
				noMatch: '___$3___',
				match: 'Mobile Native App',
				regex: '.*id\\=(MON|MOD|MBN|MOE|MOP|MBD|PBN|PBP|PBD)$',
				value: 'packet.headers.x-jpmc-channel',
				type: 'RegexCheck'
			},
			{
				value: 'packet.event.screen.currentURL',
				regex: '(?i).*channel\\=(MON|MOD|MBN|MOE|MOP|MBD|PBN|PBP|PBD).*',
				type: 'RegexCheck',
				noMatch: '___$4___',
				match: 'Mobile Native App'
			},
			{
				value: 'packet.event.app.channel',
				regex: 'MON|MOD|MBN|MOE|MOP|MBD|PBN|PBP|PBD',
				type: 'RegexCheck',
				noMatch: '___$5___',
				match: 'Mobile Native App'
			},
			{
				value: 'packet.event.app.channel',
				regex: '.*id=(MON|MOD|MBN|MOE|MOP|MBD|PBN|PBP|PBD)$',
				type: 'RegexCheck',
				noMatch: '___$6___',
				match: 'Mobile Native App'
			},
			{
				regex: 'MON|MOD|MBN|MOE|MOP|MBD|PBN|PBP|PBD',
				type: 'RegexCheck',
				value: 'packet.event.payload.data.ChannelID',
				match: 'Mobile Native App',
				noMatch: '___$7___'
			},
			{
				match: 'Mobile Native App',
				noMatch: '___$8___',
				value: 'packet.event.payload.data.hybridbundle',
				regex: '(?i)(hybrid)',
				type: 'RegexCheck'
			}
		]
	},
	{
		instructions: [
			{
				value: 'packet.event.screen.url',
				substring: 'ai=',
				type: 'SubstringAfter'
			},
			{ substring: '&', value: '___$1___', type: 'SubstringBefore' },
			{
				value: 'packet.event.screen.url',
				substring: 'accountid=',
				type: 'SubstringAfter'
			},
			{ type: 'SubstringBefore', substring: '&', value: '___$3___' },
			{
				type: 'IfThen',
				valueA: '___$2___',
				notEqual: '___$2___',
				equal: '___$4___',
				valueB: ''
			},
			{
				valueA: 'packet.event.payload.data.accountId',
				type: 'IfThen',
				notEqual: 'packet.event.payload.data.accountId',
				equal: '___$5___',
				valueB: ''
			},
			{
				noMatch: '',
				match: '___$6___',
				regex: '([0-9]{1,})',
				type: 'RegexCheck',
				value: '___$6___'
			},
			{
				type: 'RegexCheck',
				regex: '([0-9]{1,})',
				value: 'packet.event.payload.data.ai',
				noMatch: '___$7___',
				match: 'packet.event.payload.data.ai'
			}
		],
		eventType: ['publicEvent'],
		name: 'Query string- Public Account id new',
		subType: ['screen'],
		destinations: ['eVar78']
	},
	{
		instructions: [
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: '[0]*(.+)',
				value: 'packet.event.payload.data.accountOriginationCode'
			},
			{
				valueB: '___$1___',
				notEqual: '___$1___',
				equal: '',
				valueA: 'packet.event.payload.data.accountOriginationCode',
				type: 'IfThen'
			}
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction'
		],
		destinations: ['eVar44'],
		name: 'Classic - All events - eVar44 - Ultimate Rewards AOC',
		subType: [
			'screen',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'tab',
			'formField'
		]
	},
	{
		instructions: [
			{
				noMatch: '',
				match: 'scOpen',
				type: 'RegexCheck',
				regex: '(?i)(ProductOrigination)',
				value: 'taxonomy.applicationType'
			},
			{
				value: 'taxonomy.STAGE',
				regex: '(?i)(entry)',
				type: 'RegexCheck',
				noMatch: '',
				match: '___$1___'
			},
			{
				regex: '(?i)(verify)',
				value: 'taxonomy.STAGE',
				type: 'RegexCheck',
				noMatch: '___$2___',
				match: 'scCheckout'
			},
			{
				noMatch: '___$3___',
				match: 'prodView,event25',
				regex: '(?i)(Info)',
				type: 'RegexCheck',
				value: 'taxonomy.STAGE'
			},
			{
				noMatch: '___$4___',
				match: 'event17,purchase',
				type: 'RegexCheck',
				regex: '(?i)(pending)',
				value: 'taxonomy.STAGE'
			},
			{
				noMatch: '___$5___',
				match: 'event19,purchase',
				regex: '(?i)(declined)',
				value: 'taxonomy.STAGE',
				type: 'RegexCheck'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(Saved)',
				value: 'taxonomy.STAGE',
				match: 'event20',
				noMatch: '___$6___'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(resume)',
				value: 'taxonomy.STAGE',
				noMatch: '___$7___',
				match: 'event21'
			},
			{
				value: 'taxonomy.STAGE',
				regex: '(?i)(Approved)',
				type: 'RegexCheck',
				noMatch: '___$8___',
				match: 'event18,purchase'
			},
			{
				value: 'packet.event.screen.url',
				regex: '(?i)(.*q=.*)',
				type: 'RegexCheck',
				match: 'event4',
				noMatch: '___$9___'
			},
			{
				match: 'event11',
				noMatch: '___$10___',
				regex: '(?i)(.*jp_aid_a.*jp_aid_p.*)',
				type: 'RegexCheck',
				value: 'packet.event.screen.url'
			},
			{
				noMatch: '___$11___',
				match: 'purchase',
				type: 'RegexCheck',
				regex: '(?i)(complete)',
				value: 'taxonomy.STAGE'
			},
			{
				sources: [
					'taxonomy.applicationType',
					'_',
					'taxonomy.STAGE',
					'_',
					'taxonomy.DESC4'
				],
				type: 'Concatenate'
			},
			{
				match: 'event41,event307,event310',
				noMatch: '___$12___',
				regex: '(?i)(SelfserviceUR_complete_cashback)',
				type: 'RegexCheck',
				value: '___$13___'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(SelfserviceUR_complete_payyourselfback)',
				value: '___$13___',
				noMatch: '___$14___',
				match: 'event41,event311'
			},
			{
				match: 'event41,event312',
				noMatch: '___$15___',
				regex: '(?i)(SelfserviceUR_complete_combinepoints)',
				value: '___$13___',
				type: 'RegexCheck'
			},
			{
				match: 'event41,event307,event313',
				noMatch: '___$16___',
				value: '___$13___',
				regex: '(?i)(SelfserviceCL_complete_cashback)',
				type: 'RegexCheck'
			},
			{
				noMatch: '___$17___',
				match: 'event41,event308,event314',
				value: '___$13___',
				regex: '(?i)(SelfserviceUR_complete_giftcards)',
				type: 'RegexCheck'
			},
			{
				value: '___$13___',
				regex: '(?i)(SelfserviceCL_complete_redemptioncards)',
				type: 'RegexCheck',
				match: 'event41,event315',
				noMatch: '___$18___'
			},
			{
				noMatch: '___$19___',
				match: 'event41,event316',
				regex: '(?i)(SelfserviceUR_complete_transferpoints)',
				type: 'RegexCheck',
				value: '___$13___'
			},
			{
				noMatch: '___$20___',
				match: 'event41,event308,event317',
				value: '___$13___',
				regex: '(?i)(SelfserviceCL_complete_giftcards)',
				type: 'RegexCheck'
			},
			{
				regex: '(?i)(SelfserviceCL_complete_airlinestatementcredit)',
				type: 'RegexCheck',
				value: '___$13___',
				noMatch: '___$21___',
				match: 'event41,event318'
			}
		],
		subType: ['screen'],
		name: 'Public - Screen based Events',
		destinations: ['events'],
		eventType: ['publicEvent']
	},
	{
		instructions: [
			{
				valueB: '',
				notEqual: 'packet.event.payload.data.flexAppCellCodeId',
				equal: '',
				valueA: 'packet.event.payload.data.flexAppCellCodeId',
				type: 'IfThen'
			},
			{
				value: 'packet.event.screen.url',
				replace: '$1',
				regex: '.+[?&](?i)cell=(.[^&]*)&?.*',
				type: 'RegexReplace'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.screen.url',
				valueB: '___$2___',
				equal: '',
				notEqual: '___$2___'
			},
			{
				valueA: '___$3___',
				type: 'IfThen',
				notEqual: '___$3___',
				equal: '___$1___',
				valueB: ''
			},
			{ replace: '', value: '___$4___', regex: '%20', type: 'RegexReplace' },
			{ type: 'SubstringBefore', substring: '#', value: '___$5___' }
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom'
		],
		destinations: ['eVar109'],
		name: 'Public-  Cellcode',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo'
		]
	},
	{
		instructions: [
			{
				valueB: '',
				equal: '',
				notEqual: 'packet.event.payload.data.flexAppBrandId',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.flexAppBrandId'
			},
			{
				valueB: '',
				notEqual: 'packet.event.payload.data.rewardsProductCode',
				equal: '',
				valueA: 'packet.event.payload.data.rewardsProductCode',
				type: 'IfThen'
			},
			{ sources: ['___$1___', '|', '___$2___', '|', '|'], type: 'Concatenate' },
			{
				notEqual: 'packet.event.payload.data.scenarioname',
				equal: '',
				valueB: '',
				valueA: 'packet.event.payload.data.scenarioname',
				type: 'IfThen'
			},
			{ sources: ['___$4___', '|', '|', '|'], type: 'Concatenate' },
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.scenarioname',
				valueB: '',
				equal: '___$3___',
				notEqual: '___$5___'
			},
			{
				valueA: '___$6___',
				type: 'IfThen',
				valueB: '|||',
				equal: '',
				notEqual: '___$6___'
			},
			{
				regex:
					'(?i)(https://chasemortgage.chase.com/application/mortgage/submit|https://chasemortgage.chase.com/application/mortgage/.*)',
				value: 'packet.event.screen.url',
				type: 'RegexCheck',
				noMatch: '___$7___',
				match: '502|002||502002'
			},
			{ sources: ['___$2___', '|', '___$2___', '||'], type: 'Concatenate' },
			{
				regex:
					'(?i)(https://ultimaterewardspoints.chase.com.*|https://ultimaterewardspoints.chase.com.*|https://travel.chase.com.*|https://ultimaterewardstravel.chase.com.*|https://experiences.chase.com.*|https://chaseloyalty.chase.com.*|https://dining.chase.com.*)',
				type: 'RegexCheck',
				value: 'packet.event.screen.url',
				match: '___$9___',
				noMatch: '___$8___'
			},
			{
				equal: '',
				notEqual: '___$10___',
				valueB: '|||',
				type: 'IfThen',
				valueA: '___$10___'
			}
		],
		eventType: [
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction'
		],
		name: 'Public- Application Product Code',
		subType: [
			'screen',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'formField'
		],
		destinations: ['eVar25', 'prop25']
	},
	{
		name: 'Query string- DAO Product fields new',
		destinations: ['eVar25', 'prop25'],
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		instructions: [
			{
				substring: 'productCode=',
				value: 'packet.event.screen.id',
				type: 'SubstringAfter'
			},
			{ type: 'SubstringBefore', substring: '&', value: '___$1___' },
			{
				type: 'SubstringAfter',
				substring: 'subProductcode=',
				value: 'packet.event.screen.id'
			},
			{ value: '___$3___', substring: '&', type: 'SubstringBefore' },
			{
				value: 'packet.event.screen.id',
				substring: 'classCode=',
				type: 'SubstringAfter'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$5___' },
			{
				type: 'SubstringAfter',
				substring: 'cfgCode=',
				value: 'packet.event.screen.id'
			},
			{ substring: '&', type: 'SubstringBefore', value: '___$7___' },
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: '(?i).*marketingproductcode=(.[0-9]*)&?.*',
				value: 'packet.event.screen.id'
			},
			{
				match: '___$9___',
				noMatch: '',
				regex: '([0-9]{1,})',
				value: '___$9___',
				type: 'RegexCheck'
			},
			{
				type: 'IfThen',
				valueA: '___$10___',
				notEqual: '___$10___',
				equal: '___$2___',
				valueB: ''
			},
			{
				sources: [
					'___$11___',
					'|',
					'___$4___',
					'|',
					'___$6___',
					'|',
					'___$8___'
				],
				type: 'Concatenate'
			},
			{
				notEqual: '___$12___',
				equal: '',
				valueB: '|||',
				type: 'IfThen',
				valueA: '___$12___'
			},
			{
				equal: '919|||919001',
				notEqual: '___$13___',
				valueB: '|||919001',
				type: 'IfThen',
				valueA: '___$13___'
			},
			{
				regex: '.+[?&](?i)RPC=([^&]*)&?.*',
				replace: '$1',
				value: 'packet.event.screen.id',
				type: 'RegexReplace'
			},
			{
				valueB: 'packet.event.screen.id',
				notEqual: '___$15___',
				equal: '',
				type: 'IfThen',
				valueA: '___$15___'
			},
			{
				type: 'Concatenate',
				sources: ['___$16___', 'd', '|', '___$16___', 'd', '|', '|', '___$8___']
			},
			{
				notEqual: '___$17___',
				equal: '___$14___',
				valueB: '',
				type: 'IfThen',
				valueA: '___$16___'
			}
		]
	},
	{
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		name: 'Public Evar1 URL-edited latest',
		destinations: ['eVar1', 'prop1', 'screen'],
		instructions: [
			{ type: 'ToLowerCase', sources: ['packet.event.screen.url'] },
			{
				value: '___$1___',
				replace: '$1',
				regex: '.+[?&]assettype=([^&]+)&?.*',
				type: 'RegexReplace'
			},
			{
				type: 'IfThen',
				valueA: '___$1___',
				equal: '',
				notEqual: '___$2___',
				valueB: '___$2___'
			},
			{
				replace: '$1',
				regex: '.+[?&]xxxremovexxxid=([^&]+)&?.*',
				value: '___$1___',
				type: 'RegexReplace'
			},
			{
				notEqual: '___$4___',
				equal: '',
				valueB: '___$4___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				type: 'RegexReplace',
				replace: '$1',
				regex: '.*deposits.chase.com.*[?&]page=([^&]+)&?.*',
				value: '___$1___'
			},
			{
				valueB: '___$6___',
				equal: '',
				notEqual: '___$6___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				replace: '$1',
				regex: '.+[?&]pagename=([^&]+)&?.*',
				value: '___$1___',
				type: 'RegexReplace'
			},
			{
				valueA: '___$1___',
				type: 'IfThen',
				valueB: '___$8___',
				equal: '',
				notEqual: '___$8___'
			},
			{
				regex: '.+[?&]pg_name=([^&]+)&?.*',
				replace: '$1',
				type: 'RegexReplace',
				value: '___$1___'
			},
			{
				valueA: '___$1___',
				type: 'IfThen',
				valueB: '___$10___',
				notEqual: '___$10___',
				equal: ''
			},
			{
				regex: '.+[?&]px=([^&]+)&?.*',
				replace: '$1',
				type: 'RegexReplace',
				value: '___$1___'
			},
			{
				notEqual: '___$12___',
				equal: '',
				valueB: '___$12___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				value: '___$1___',
				replace: '$1',
				regex: '.+[?&]templatetitle=([^&]+)&?.*',
				type: 'RegexReplace'
			},
			{
				type: 'IfThen',
				valueA: '___$1___',
				equal: '',
				notEqual: '___$14___',
				valueB: '___$14___'
			},
			{
				replace: '$1',
				value: '___$1___',
				regex: '.+[?&]urlname=([^&]+)&?.*',
				type: 'RegexReplace'
			},
			{
				equal: '',
				notEqual: '___$16___',
				valueB: '___$16___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				value: '___$1___',
				replace: '$1',
				regex: '.+[?&]userfriedlyurl=([^&]+)&?.*',
				type: 'RegexReplace'
			},
			{
				notEqual: '___$18___',
				equal: '',
				valueB: '___$18___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: '.+[?&]_pagelabel=([^&]+)&?.*',
				value: '___$1___'
			},
			{
				notEqual: '___$20___',
				equal: '',
				valueB: '___$20___',
				valueA: '___$1___',
				type: 'IfThen'
			},
			{ substring: '?', type: 'SubstringBefore', value: '___$1___' },
			{ substring: 'https://', type: 'SubstringAfter', value: '___$22___' },
			{
				replace: '',
				type: 'RegexReplace',
				regex: '\\;[jsessionid|dctmsession].*',
				value: '___$23___'
			},
			{
				value: '___$24___',
				replace: '',
				regex: '[^;*](\\;.*)',
				type: 'RegexReplace'
			},
			{
				match: '___$25___',
				noMatch: '___$23___',
				value: '___$1___',
				regex: '.*jp_inv.*',
				type: 'RegexCheck'
			},
			{ replace: ' ', regex: '%20', value: '___$26___', type: 'RegexReplace' },
			{ type: 'RegexReplace', replace: '', regex: '\t', value: '___$27___' },
			{ replace: '', regex: '\n', type: 'RegexReplace', value: '___$28___' },
			{
				replace: '',
				value: '___$29___',
				regex: '[0-9]{9,}/?',
				type: 'RegexReplace'
			},
			{ type: 'RegexReplace', replace: '', regex: '$', value: '___$30___' },
			{ replace: '', type: 'RegexReplace', regex: '%', value: '___$31___' },
			{
				regex: 'locator.chase.com/search.*',
				value: '___$32___',
				type: 'RegexCheck',
				noMatch: '___$32___',
				match: 'locator.chase.com/search_results'
			},
			{
				value: '___$33___',
				regex: 'locator.chase.com/[a-z][a-z]/.+',
				type: 'RegexCheck',
				match: 'locator.chase.com/branch_details',
				noMatch: '___$33___'
			},
			{
				match: 'locator.chase.com/browse_by_state',
				noMatch: '___$34___',
				regex: 'locator.chase.com/[a-z][a-z]',
				type: 'RegexCheck',
				value: '___$34___'
			},
			{
				noMatch: '___$35___',
				match: 'autopreferred.chase.com/info',
				regex: 'autopreferred.chase.com/info/?.*',
				type: 'RegexCheck',
				value: '___$35___'
			},
			{
				noMatch: '___$36___',
				match: 'autopreferred.chase.com/search',
				value: '___$36___',
				regex: 'autopreferred.chase.com/search/?.*',
				type: 'RegexCheck'
			},
			{
				match: 'autopreferred.chase.com/thanks',
				noMatch: '___$37___',
				value: '___$37___',
				regex: 'autopreferred.chase.com/thanks/?.*',
				type: 'RegexCheck'
			},
			{
				regex: '^homelendingadvisor.chase.com.*',
				type: 'RegexCheck',
				value: '___$38___',
				noMatch: '___$38___',
				match: 'homelendingadvisor.chase.com'
			},
			{
				value: '___$39___',
				regex: 'landroverusa.com.*',
				type: 'RegexCheck',
				match: 'landroverusa.com',
				noMatch: '___$39___'
			},
			{
				type: 'RegexCheck',
				regex: 'dummy_jpmorgan_merge_rule_delete',
				value: '___$40___',
				match: 'jpmorgandomains.com',
				noMatch: '___$40___'
			},
			{ substring: '#', type: 'SubstringBefore', value: '___$41___' },
			{
				regex: '[\\/]+$',
				replace: '',
				type: 'RegexReplace',
				value: '___$42___'
			},
			{
				sources: [
					'___$43___',
					'?pg_name=',
					'___$3___',
					'___$5___',
					'___$7___',
					'___$9___',
					'___$11___',
					'___$13___',
					'___$15___',
					'___$17___',
					'___$19___',
					'___$21___'
				],
				type: 'Concatenate'
			},
			{
				regex:
					'(.+[?&]pg_name=|.+[?&]pagename=|.+[?&]userfriendlyurl=|.+[?&]urlname=|.+[?&]templatetitle=|.*deposits.chase.com.*[?&]page=|.+[?&]_pagelabel=|.+[?&]assettype=|.+[?&]px=|.+[?&]xxxremovexxxid=).+',
				type: 'RegexCheck',
				value: '___$1___',
				match: '___$44___',
				noMatch: '___$43___'
			},
			{
				match: '___$43___',
				noMatch: '___$45___',
				type: 'RegexCheck',
				regex: '.*creditcards.chase.com.*[?&]pg_name=.+',
				value: '___$1___'
			},
			{
				notEqual: '',
				equal: 'declined',
				valueB: 'Decision Declined',
				type: 'IfThen',
				valueA: 'packet.event.screen.pageTitle'
			},
			{
				sources: ['___$43___', '?', 'pg_name=', '___$47___'],
				type: 'Concatenate'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(applynow.chase.com\\/flexappweb\\/.*?pg_name=Declined)',
				value: '___$48___',
				match: '___$48___',
				noMatch: '___$46___'
			},
			{
				noMatch: '___$49___',
				match: 'jobs.chase.com/all_pages',
				regex: '(?i)jobs.chase.com.*',
				value: '___$49___',
				type: 'RegexCheck'
			},
			{
				replace: 'docusign_iframe_url',
				value: '___$50___',
				regex: 'docusign_iframe_url\\/.*',
				type: 'RegexReplace'
			},
			{
				regex: '.*jpmorgan.*(\\.com|\\.co|\\.ru|\\.net).*',
				type: 'RegexCheck',
				value: '___$51___',
				match: 'jpmorgandomains.com/all_pages',
				noMatch: '___$51___'
			},
			{
				type: 'RegexCheck',
				regex:
					'.*paymentnet.jpmorgan.com.*|m.jpmorgan.com.*|.*ccportal.jpmorgan.com.*|.*jpmorganwealthmanagement.com.*|.*jpmorgancc.com.*',
				value: '___$51___',
				noMatch: '___$52___',
				match: '___$51___'
			},
			{
				regex: 'preview\\.cig\\.chase.com(.*)',
				replace: '$1',
				value: '___$53___',
				type: 'RegexReplace'
			},
			{ type: 'Concatenate', sources: ['chase.com', '___$54___'] },
			{
				regex: 'preview\\.cig\\.chase.com.*',
				type: 'RegexCheck',
				value: '___$53___',
				noMatch: '___$53___',
				match: '___$55___'
			}
		]
	},
	{
		instructions: [
			{ sources: ['packet.event.screen.url'], type: 'ToLowerCase' },
			{
				replace: '$1',
				regex: '.+[?&]assettype=([^&]+)&?.*',
				value: '___$1___',
				type: 'RegexReplace'
			},
			{
				valueB: '___$2___',
				equal: '',
				notEqual: '___$2___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: '.+[?&]xxxremovexxxid=([^&]+)&?.*',
				value: '___$1___'
			},
			{
				valueA: '___$1___',
				type: 'IfThen',
				valueB: '___$4___',
				notEqual: '___$4___',
				equal: ''
			},
			{
				regex: '.*deposits.chase.com.*[?&]page=([^&]+)&?.*',
				replace: '$1',
				type: 'RegexReplace',
				value: '___$1___'
			},
			{
				type: 'IfThen',
				valueA: '___$1___',
				equal: '',
				notEqual: '___$6___',
				valueB: '___$6___'
			},
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: '.+[?&]pagename=([^&]+)&?.*',
				value: '___$1___'
			},
			{
				valueB: '___$8___',
				notEqual: '___$8___',
				equal: '',
				valueA: '___$1___',
				type: 'IfThen'
			},
			{
				value: '___$1___',
				replace: '$1',
				regex: '.+[?&]pg_name=([^&]+)&?.*',
				type: 'RegexReplace'
			},
			{
				valueB: '___$10___',
				equal: '',
				notEqual: '___$10___',
				valueA: '___$1___',
				type: 'IfThen'
			},
			{
				regex: '.+[?&]px=([^&]+)&?.*',
				replace: '$1',
				value: '___$1___',
				type: 'RegexReplace'
			},
			{
				valueA: '___$1___',
				type: 'IfThen',
				valueB: '___$12___',
				equal: '',
				notEqual: '___$12___'
			},
			{
				replace: '$1',
				regex: '.+[?&]templatetitle=([^&]+)&?.*',
				type: 'RegexReplace',
				value: '___$1___'
			},
			{
				type: 'IfThen',
				valueA: '___$1___',
				valueB: '___$14___',
				equal: '',
				notEqual: '___$14___'
			},
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: '.+[?&]urlname=([^&]+)&?.*',
				value: '___$1___'
			},
			{
				notEqual: '___$16___',
				equal: '',
				valueB: '___$16___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: '.+[?&]userfriedlyurl=([^&]+)&?.*',
				value: '___$1___'
			},
			{
				valueB: '___$18___',
				equal: '',
				notEqual: '___$18___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				regex: '.+[?&]_pagelabel=([^&]+)&?.*',
				replace: '$1',
				type: 'RegexReplace',
				value: '___$1___'
			},
			{
				valueB: '___$20___',
				notEqual: '___$20___',
				equal: '',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{ substring: '?', value: '___$1___', type: 'SubstringBefore' },
			{ substring: 'https://', type: 'SubstringAfter', value: '___$22___' },
			{
				regex: '\\;[jsessionid|dctmsession].*',
				replace: '',
				type: 'RegexReplace',
				value: '___$23___'
			},
			{
				replace: '',
				regex: '[^;*](\\;.*)',
				type: 'RegexReplace',
				value: '___$24___'
			},
			{
				match: '___$25___',
				noMatch: '___$23___',
				type: 'RegexCheck',
				regex: '.*jp_inv.*',
				value: '___$1___'
			},
			{ replace: ' ', value: '___$26___', regex: '%20', type: 'RegexReplace' },
			{ regex: '\t', replace: '', value: '___$27___', type: 'RegexReplace' },
			{ type: 'RegexReplace', replace: '', regex: '\n', value: '___$28___' },
			{
				replace: '',
				regex: '[0-9]{9,}/?',
				value: '___$29___',
				type: 'RegexReplace'
			},
			{ regex: '$', replace: '', type: 'RegexReplace', value: '___$30___' },
			{ type: 'RegexReplace', replace: '', regex: '%', value: '___$31___' },
			{
				regex: 'locator.chase.com/search.*',
				type: 'RegexCheck',
				value: '___$32___',
				match: 'locator.chase.com/search_results',
				noMatch: '___$32___'
			},
			{
				noMatch: '___$33___',
				match: 'locator.chase.com/branch_details',
				regex: 'locator.chase.com/[a-z][a-z]/.+',
				value: '___$33___',
				type: 'RegexCheck'
			},
			{
				value: '___$34___',
				regex: 'locator.chase.com/[a-z][a-z]',
				type: 'RegexCheck',
				match: 'locator.chase.com/browse_by_state',
				noMatch: '___$34___'
			},
			{
				match: 'autopreferred.chase.com/info',
				noMatch: '___$35___',
				regex: 'autopreferred.chase.com/info/?.*',
				type: 'RegexCheck',
				value: '___$35___'
			},
			{
				noMatch: '___$36___',
				match: 'autopreferred.chase.com/search',
				regex: 'autopreferred.chase.com/search/?.*',
				type: 'RegexCheck',
				value: '___$36___'
			},
			{
				value: '___$37___',
				regex: 'autopreferred.chase.com/thanks/?.*',
				type: 'RegexCheck',
				noMatch: '___$37___',
				match: 'autopreferred.chase.com/thanks'
			},
			{
				match: 'homelendingadvisor.chase.com',
				noMatch: '___$38___',
				value: '___$38___',
				regex: '^homelendingadvisor.chase.com.*',
				type: 'RegexCheck'
			},
			{
				regex: 'landroverusa.com.*',
				type: 'RegexCheck',
				value: '___$39___',
				noMatch: '___$39___',
				match: 'landroverusa.com'
			},
			{
				noMatch: '___$40___',
				match: 'jpmorgandomains.com',
				value: '___$40___',
				regex: 'dummy_jpmorgan_merge_rule_delete',
				type: 'RegexCheck'
			},
			{ type: 'SubstringBefore', substring: '#', value: '___$41___' },
			{
				regex: '[\\/]+$',
				replace: '',
				type: 'RegexReplace',
				value: '___$42___'
			},
			{
				type: 'Concatenate',
				sources: [
					'___$43___',
					'?pg_name=',
					'___$3___',
					'___$5___',
					'___$7___',
					'___$9___',
					'___$11___',
					'___$13___',
					'___$15___',
					'___$17___',
					'___$19___',
					'___$21___'
				]
			},
			{
				value: '___$1___',
				regex:
					'(.+[?&]pg_name=|.+[?&]pagename=|.+[?&]userfriendlyurl=|.+[?&]urlname=|.+[?&]templatetitle=|.*deposits.chase.com.*[?&]page=|.+[?&]_pagelabel=|.+[?&]assettype=|.+[?&]px=|.+[?&]xxxremovexxxid=).+',
				type: 'RegexCheck',
				match: '___$44___',
				noMatch: '___$43___'
			},
			{
				noMatch: '___$45___',
				match: '___$43___',
				regex: '.*creditcards.chase.com.*[?&]pg_name=.+',
				type: 'RegexCheck',
				value: '___$1___'
			},
			{
				valueB: 'Decision Declined',
				equal: 'declined',
				notEqual: '',
				type: 'IfThen',
				valueA: 'packet.event.screen.pageTitle'
			},
			{
				type: 'Concatenate',
				sources: ['___$43___', '?', 'pg_name=', '___$47___']
			},
			{
				match: '___$48___',
				noMatch: '___$46___',
				regex: '(?i)(applynow.chase.com\\/flexappweb\\/.*?pg_name=Declined)',
				type: 'RegexCheck',
				value: '___$48___'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)jobs.chase.com.*',
				value: '___$49___',
				match: 'jobs.chase.com/all_pages',
				noMatch: '___$49___'
			},
			{
				replace: 'docusign_iframe_url',
				regex: 'docusign_iframe_url\\/.*',
				value: '___$50___',
				type: 'RegexReplace'
			},
			{
				regex: '.*jpmorgan.*(\\.com|\\.co|\\.ru|\\.net).*',
				type: 'RegexCheck',
				value: '___$51___',
				match: 'jpmorgandomains.com/all_pages',
				noMatch: '___$51___'
			},
			{
				noMatch: '___$52___',
				match: '___$51___',
				regex:
					'.*paymentnet.jpmorgan.com.*|m.jpmorgan.com.*|.*ccportal.jpmorgan.com.*|.*jpmorganwealthmanagement.com.*|.*jpmorgancc.com.*',
				type: 'RegexCheck',
				value: '___$51___'
			},
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: 'preview\\.cig\\.chase.com(.*)',
				value: '___$53___'
			},
			{ type: 'Concatenate', sources: ['chase.com', '___$54___'] },
			{
				value: '___$53___',
				regex: 'preview\\.cig\\.chase.com.*',
				type: 'RegexCheck',
				match: '___$55___',
				noMatch: '___$53___'
			},
			{
				regex:
					'(?i)(^creditcards.chase.com$|^creditcards.chase.com/0-intro-apr-credit-cards$|^creditcards.chase.com/a1/marriottboundless/nonaep$|^creditcards.chase.com/airline-credit-cards$|^creditcards.chase.com/all-credit-cards$|^creditcards.chase.com/balance-transfer-credit-cards$|^creditcards.chase.com/balance-transfer-credit-cards/chase-slate$|^creditcards.chase.com/cash-back-credit-cards$|^creditcards.chase.com/cash-back-credit-cards/aarp$|^creditcards.chase.com/cash-back-credit-cards/amazon-rewards$|^creditcards.chase.com/cash-back-credit-cards/chase-freedom$|^creditcards.chase.com/cash-back-credit-cards/chase-freedom-unlimited$|^creditcards.chase.com/hotel-credit-cards$|^creditcards.chase.com/mastercard-credit-cards$|^creditcards.chase.com/no-annual-fee-credit-cards$|^creditcards.chase.com/no-foreign-transaction-fee-credit-cards$|^creditcards.chase.com/rewards-credit-cards$|^creditcards.chase.com/rewards-credit-cards/chase-sapphire-preferred$|^creditcards.chase.com/rewards-credit-cards/chase-sapphire-reserve$|^creditcards.chase.com/rewards-credit-cards/disney-premier$|^creditcards.chase.com/rewards-credit-cards/disney-rewards$|^creditcards.chase.com/rewards-credit-cards/starbucks-rewards$|^creditcards.chase.com/small-business-credit-cards$|^creditcards.chase.com/small-business-credit-cards/ink-business-preferred$|^creditcards.chase.com/small-business-credit-cards/ink-cash$|^creditcards.chase.com/small-business-credit-cards/ink-unlimited$|^creditcards.chase.com/small-business-credit-cards/southwest-premier-business$|^creditcards.chase.com/small-business-credit-cards/united-explorer-business$|^creditcards.chase.com/travel-credit-cards$|^creditcards.chase.com/travel-credit-cards/aer-lingus$|^creditcards.chase.com/travel-credit-cards/british-airways$|^creditcards.chase.com/travel-credit-cards/iberia$|^creditcards.chase.com/travel-credit-cards/ihg-rewards-club-premier$|^creditcards.chase.com/travel-credit-cards/southwest-plus$|^creditcards.chase.com/travel-credit-cards/southwest-premier$|^creditcards.chase.com/travel-credit-cards/southwest-priority$|^creditcards.chase.com/travel-credit-cards/united-explorer$|^creditcards.chase.com/travel-credit-cards/united-mileageplus-club$|^creditcards.chase.com/travel-credit-cards/united-travelbank$|^creditcards.chase.com/travel-credit-cards/world-of-hyatt-credit-card$|^creditcards.chase.com/visa-credit-cards$|^www.chase.com$|^www.chase.com/content/chase-ux/en/personal/mortgage/extra-payments-calculator$|^www.chase.com/online/home-lending/refinance-prequalification.htm$|^www.chase.com/personal/home-equity$|^www.chase.com/personal/home-equity/about-home-equity/application-process$|^www.chase.com/personal/home-equity/about-home-equity/calculators$|^www.chase.com/personal/home-equity/about-home-equity/check-eligibility$|^www.chase.com/personal/home-equity/about-home-equity/faqs$|^www.chase.com/personal/home-equity/about-home-equity/tips/do-dont$|^www.chase.com/personal/home-equity/about-home-equity/tips/get-tips$|^www.chase.com/personal/home-equity/about-home-equity/tips/home-equity-101$|^www.chase.com/personal/home-equity/about-home-equity/tips/home-equity-helps$|^www.chase.com/personal/home-equity/about-home-equity/tips/maximize-spending$|^www.chase.com/personal/home-equity/about-home-equity/tips/remodeling-your-kitchen$|^www.chase.com/personal/home-equity/about-home-equity/tips/weekend-project-ideas$|^www.chase.com/personal/home-equity/about-home-equity/tips/why-heloc$|^www.chase.com/personal/home-equity/contact$|^www.chase.com/personal/home-equity/debt-consolidation-calculator$|^www.chase.com/personal/home-equity/home-equity-line-of-credit-calculator$|^www.chase.com/personal/home-equity/pbowned2018$|^www.chase.com/personal/home-equity/refinance-aoo$|^www.chase.com/personal/home-equity/renovation-estimator$|^www.chase.com/personal/home-equity/renovation-estimator/display$|^www.chase.com/personal/mortgage$|^www.chase.com/personal/mortgage/calculators-resources$|^www.chase.com/personal/mortgage/calculators-resources/affordability-calculator$|^www.chase.com/personal/mortgage/calculators-resources/home-value-estimator$|^www.chase.com/personal/mortgage/calculators-resources-mlc$|^www.chase.com/personal/mortgage/home-equity$|^www.chase.com/personal/mortgage/home-mortgage$|^www.chase.com/personal/mortgage/home-mortgage/closing-on-a-home/escrow-accounts$|^www.chase.com/personal/mortgage/home-mortgage/closing-on-a-home/home-inspections$|^www.chase.com/personal/mortgage/home-mortgage/closing-on-a-home/steps-before-closing$|^www.chase.com/personal/mortgage/home-mortgage/financing-home/closing-costs$|^www.chase.com/personal/mortgage/home-mortgage/financing-home/types-of-mortgages$|^www.chase.com/personal/mortgage/home-mortgage/finding-a-home/finding-the-right-home$|^www.chase.com/personal/mortgage/home-mortgage/finding-a-home/home-lending-advisor$|^www.chase.com/personal/mortgage/home-mortgage/finding-a-home/making-an-offer$|^www.chase.com/personal/mortgage/home-mortgage/finding-a-home/mortgage-contingency$|^www.chase.com/personal/mortgage/home-mortgage/finding-a-home/real-estate-agents$|^www.chase.com/personal/mortgage/home-mortgage/getting-started/buy-another-home$|^www.chase.com/personal/mortgage/home-mortgage/getting-started/credit-scores-for-a-home-loan$|^www.chase.com/personal/mortgage/home-mortgage/getting-started/down-payment$|^www.chase.com/personal/mortgage/home-mortgage/getting-started/first-time-homebuyer$|^www.chase.com/personal/mortgage/home-mortgage/getting-started/how-much-can-you-borrow$|^www.chase.com/personal/mortgage/home-mortgage/getting-started/how-much-house-can-you-afford$|^www.chase.com/personal/mortgage/home-mortgage/getting-started/mortgage-prequalification$|^www.chase.com/personal/mortgage/home-mortgage/getting-started/potential-tax-benefits$|^www.chase.com/personal/mortgage/home-mortgage/getting-started/rent-vs-buy$|^www.chase.com/personal/mortgage/jumbo-paid-search$|^www.chase.com/personal/mortgage/mortgage-glossary-terms$|^www.chase.com/personal/mortgage/mortgage-psbt1$|^www.chase.com/personal/mortgage/mortgage-ps-refi$|^www.chase.com/personal/mortgage/mortgage-purchase$|^www.chase.com/personal/mortgage/mortgage-refinance$|^www.chase.com/personal/mortgage/mortgage-refinance/choose-refinance-loan/compare-lenders$|^www.chase.com/personal/mortgage/mortgage-refinance/choose-refinance-loan/credit-history$|^www.chase.com/personal/mortgage/mortgage-refinance/choose-refinance-loan/getting-prequalified$|^www.chase.com/personal/mortgage/mortgage-refinance/choose-refinance-loan/home-lending-advisor$|^www.chase.com/personal/mortgage/mortgage-refinance/choose-refinance-loan/understand-options$|^www.chase.com/personal/mortgage/mortgage-refinance/choose-refinance-loan/understand-points$|^www.chase.com/personal/mortgage/mortgage-refinance/closing-the-deal/applying$|^www.chase.com/personal/mortgage/mortgage-refinance/closing-the-deal/before$|^www.chase.com/personal/mortgage/mortgage-refinance/closing-the-deal/documents$|^www.chase.com/personal/mortgage/mortgage-refinance/closing-the-deal/expect$|^www.chase.com/personal/mortgage/mortgage-refinance/reasons-to-refinance/lower-monthly-payments$|^www.chase.com/personal/mortgage/mortgage-refinance/reasons-to-refinance/understanding-ratio$|^www.chase.com/personal/mortgage/mortgage-refinance/reasons-to-refinance/use-home-equity$|^www.chase.com/personal/mortgage/mortgage-refinance/time-to-refinance/time-to-refinance$|^www.chase.com/personal/mortgage/purchase-faqs$|^www.chase.com/personal/mortgage/realtordotcom-offer$|^www.chase.com/personal/mortgage/refinance-faqs$|^www.chase.com/personal/home-equity/about-home-equity $|^www.chase.com/content/chase-ux/en/personal/home-equity/her$|^www.chase.com/home-equity/home-value-estimator$|^www.chase.com/personal/home-equity/ita-aoo$|^www.chase.com/personal/home-equity/line-of-credit/heita.html$|^www.chase.com/personal/home-equity/prescreen-aoo$|^www.chase.com/personal/home-equity/renovation-estimator/facebook$|^www.chase.com/personal/home-equity/renovation-estimator/pinterest$|^www.chase.com/personal/mortgage/home-equity/display-pb$|^ homefinancing.chase.com/refiretargeting$|^apply.chase.com/homeequity/contactinfo.aspx$|^apply.chase.com/homeequity/financialinfo.aspx$|^apply.chase.com/homeequity/homeequityagreement.aspx$|^apply.chase.com/homeequity/landingpage.aspx$|^apply.chase.com/homeequity/loanguidance.aspx$|^apply.chase.com/homeequity/loaninformation.aspx$|^apply.chase.com/homeequity/processing.aspx$|^apply.chase.com/homeequity/thankyou.aspx$|^apply.chase.com/homeequity/unabletoprovideguidance.aspx$|^apply.chase.com/mortgage/consent.aspx$|^apply.chase.com/mortgage/crq/customratequote.aspx$|^apply.chase.com/mortgage/gettingstarted.aspx$|^apply.chase.com/mortgage/personalinfo.aspx$|^apply.chase.com/mortgage/propertyloaninfo.aspx$|^apply.chase.com/mortgage/thankyou.aspx$|^apply.chase.com/mortgage/verify.aspx$|^apply.chase.com/mortgage/yourfinances.aspx$|^homeequity.chase.com/api$|^homeequity.chase.com/api2$|^homeequity.chase.com/api3$|^homeequity.chase.com/display$|^homeequity.chase.com/fb$|^homeequity.chase.com/paidsearch$|^homeequity.chase.com/renovate$|^homeequity.chase.com/renovationboard$|^homeequity.chase.com/renovationboard/results1$|^homeequity.chase.com/renovationboard/results2$|^homeequity.chase.com/renovationboard/results3$|^homefinancing.chase.com/ckpurchrates$|^homefinancing.chase.com/ckrefirates$|^homefinancing.chase.com/explore-your-options$|^homefinancing.chase.com/fastclosing$|^homefinancing.chase.com/fxsprts$|^homefinancing.chase.com/getmore$|^homefinancing.chase.com/hopurchrates$|^homefinancing.chase.com/horefirates$|^homefinancing.chase.com/jumbo$|^homefinancing.chase.com/mars-purch1$|^homefinancing.chase.com/mars-purch2$|^homefinancing.chase.com/mars-refi1$|^homefinancing.chase.com/mars-refi2$|^homefinancing.chase.com/msnpurchrates$|^homefinancing.chase.com/msnrefirates$|^homefinancing.chase.com/mtgretargeting$|^homefinancing.chase.com/nwpurchrates$|^homefinancing.chase.com/nwrefirates$|^homefinancing.chase.com/pr$|^homefinancing.chase.com/prepare$|^homefinancing.chase.com/psaffordable$|^homefinancing.chase.com/pspurchase$|^homefinancing.chase.com/repurchrates$|^homefinancing.chase.com/rerefirates$|^homefinancing.chase.com/sapurchrates$|^homefinancing.chase.com/sarefirates$|^homefinancing.chase.com/urfsif$|^homefinancing.chase.com/urfsoof$|^homefinancing.chase.com/urfuif$|^homelendingadvisor.chase.com$|^www.chase.com/personal/mortgage/sf/form$|^www.chase.com/personal/mortgage/sf/form1$|^www.chase.com/personal/mortgage/sf/form2$|^www.chase.com/personal/mortgage/sf/form3$|^www.chase.com/personal/mortgage/sf/form4$|^www.chase.com/personal/mortgage/sf/form5$|^www.chase.com/personal/mortgage/sf/form6$|^www.chase.com/personal/mortgage/sf/form7$)',
				type: 'RegexCheck',
				value: '___$56___',
				noMatch: '1',
				match: '0'
			}
		],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		],
		name: 'AAM SSF ContextData.cm.ssf',
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		destinations: ['contextData.cm.ssf']
	},
	{
		destinations: ['eVar48'],
		name: 'eVar48 Link Detail Debugs',
		eventType: ['mobileAction', 'action'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.model.ReviewInsight.accounts[].product.detailType',
					'packet.event.payload.data.model.ReviewInsight.selectedCategories[]',
					'packet.event.payload.data.businessStructureId.value',
					'packet.event.payload.data.model.UseVirtualAssistant.userResponse',
					'packet.event.payload.data.model.ReviewAccount.selectedAccountWalletGroup'
				]
			},
			{
				regex:
					'(?i)(^use_virtual_assistant$|^review_dashboard$|^REVIEW_INSIGHTS_MANAGE_CATEGORIES$|^REVIEW_INSIGHTS_SELECT_ACCOUNTS_FILTER_CRITERION$|^REVIEW_BUSINESS_INSIGHTS_SELECT_ACCOUNTS_FILTER_CRITERION_TO_REVIEW_TRANSACTIONS$|^BUSINESS_BANKING_INITIATION$)',
				type: 'RegexCheck',
				value: 'packet.event.component',
				match: '___$1___',
				noMatch: ''
			}
		]
	},
	{
		eventType: ['publicEvent', 'publicAction'],
		destinations: ['eVar43'],
		subType: ['screen', 'dynamicLinks'],
		name: 'Classic - Core - eVar43 - Ultimate rewards fields',
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.destname',
					'packet.event.payload.data.merchant',
					'packet.event.payload.data.partnername',
					'packet.event.payload.data.loanType'
				]
			},
			{
				value: 'packet.event.screen.url',
				replace: '$1',
				regex: '.+[?&](?i)merchant=([^&]*)&?.*',
				type: 'RegexReplace'
			},
			{
				type: 'IfThen',
				valueA: '___$2___',
				valueB: 'packet.event.screen.url',
				equal: '',
				notEqual: '___$2___'
			},
			{
				notEqual: '___$1___',
				equal: '___$3___',
				valueB: '',
				valueA: '___$1___',
				type: 'IfThen'
			}
		]
	},
	{
		instructions: [
			{
				value:
					'packet.event.payload.data.model.SearchItems.searchResult.searchFor',
				regex:
					'(?si)(.*@.*)|.*([\\d-. \t/]{8,}).*|.*(%40|@)\\S+(%2C|\\.)com.*|.*(gmail(\\.|\\s*dot\\s*)com.*|.*yahoo\\.com.*|.*msn\\.com.*|.*aol\\.com.*|.*hotmail\\.com).*',
				type: 'RegexCheck',
				match: 'BLOCKED: This contains PI Data',
				noMatch:
					'packet.event.payload.data.model.SearchItems.searchResult.searchFor'
			}
		],
		destinations: ['eVar16', 'prop16'],
		name: 'Mobile - MobileEvent - datacollection/search - evar16 prop16 - ',
		eventType: ['mobileEvent']
	},
	{
		destinations: ['eVar19'],
		name: 'Mobile - MobileEvent - datacollection/search - eVar19 - search ',
		eventType: ['mobileEvent'],
		instructions: [
			{
				match: 'BLOCKED: This contains PI Data',
				noMatch:
					'packet.event.payload.data.model.SearchItems.searchResult.searchText',
				value:
					'packet.event.payload.data.model.SearchItems.searchResult.searchText',
				regex:
					'(?si)(.*@.*)|.*([\\d-. \t/]{8,}).*|.*(%40|@)\\S+(%2C|\\.)com.*|.*(gmail(\\.|\\s*dot\\s*)com.*|.*yahoo\\.com.*|.*msn\\.com.*|.*aol\\.com.*|.*hotmail\\.com).*',
				type: 'RegexCheck'
			}
		]
	},
	{
		instructions: [
			{ sources: ['packet.event.payload.data.placement'], type: 'ToLowerCase' },
			{ sources: ['packet.event.payload.data.variation'], type: 'ToLowerCase' },
			{ sources: ['___$1___', '|', '___$2___'], type: 'Concatenate' },
			{ type: 'Concatenate', sources: ['___$1___', '|'] },
			{
				type: 'RegexCheck',
				regex: '.*\\{.*',
				value: '___$3___',
				match: '___$4___',
				noMatch: '___$3___'
			}
		],
		eventType: ['communication'],
		name: 'Communication events evar57',
		destinations: ['eVar57']
	},
	{
		destinations: ['eVar95'],
		name: 'Set eVar67 - Public',
		subType: ['screen'],
		eventType: ['publicEvent'],
		instructions: [
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.cardApplicationId',
				notEqual: 'packet.event.payload.data.cardApplicationId',
				equal: '',
				valueB: ''
			},
			{
				match: 'packet.event.visitor.eci',
				noMatch: '___$1___',
				regex: '(?i)(.*chasemortgage.chase.com/application/mortgage/submit)',
				value: 'packet.event.screen.url',
				type: 'RegexCheck'
			},
			{
				value: 'packet.event.screen.url',
				replace: '$1',
				regex: '.+[?&]jp_prdid=([^&]*)&?.*',
				type: 'RegexReplace'
			},
			{
				equal: '___$2___',
				notEqual: '___$3___',
				valueB: 'packet.event.screen.url',
				valueA: '___$3___',
				type: 'IfThen'
			}
		]
	},
	{
		instructions: [
			{
				regex: '.+(?i)[?&]appstatus=([^&]*)&?.*',
				replace: '$1',
				value: 'packet.event.screen.id',
				type: 'RegexReplace'
			},
			{
				valueA: '___$1___',
				type: 'IfThen',
				valueB: 'packet.event.screen.id',
				equal: '',
				notEqual: '___$1___'
			},
			{
				replace: '$1',
				regex: '.+(?i)[?&]trackingStatus=([^&]*)&?.*',
				type: 'RegexReplace',
				value: 'packet.event.screen.id'
			},
			{
				valueB: 'packet.event.screen.id',
				equal: '',
				notEqual: '___$3___',
				type: 'IfThen',
				valueA: '___$3___'
			},
			{
				equal: '___$4___',
				notEqual: '___$2___',
				valueB: '',
				type: 'IfThen',
				valueA: '___$2___'
			}
		],
		destinations: ['eVar116'],
		name: 'Secure - Screen Action events - eVar116- App Tracking status ',
		eventType: [
			'communication',
			'screen',
			'action',
			'adClick',
			'adImpression',
			'impression',
			'interaction'
		]
	},
	{
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction'
		],
		destinations: ['eVar18', 'prop18', 'eVar50'],
		name: 'Secure - Core - App Name eVar18 Prop18',
		instructions: [
			{
				replace: '$1',
				value: 'packet.event.screen.id',
				regex: '.+[?&]category=([^&]*)&?.*',
				type: 'RegexReplace'
			},
			{
				valueB: 'packet.event.screen.id',
				equal: '',
				notEqual: '___$1___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				sources: ['packet.event.app.name', ' ', '|', ' ', '___$2___'],
				type: 'Concatenate'
			},
			{
				valueA: '___$2___',
				type: 'IfThen',
				equal: 'packet.event.app.name',
				notEqual: '___$3___',
				valueB: ''
			}
		]
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.tntPersonalizationData.product',
					'packet.event.payload.data.personalizationData.product'
				],
				type: 'Concatenate'
			},
			{
				match: '___$1___',
				noMatch: '',
				regex: '(?i)(tnt|ovd_rhr_widgets)',
				type: 'RegexCheck',
				value: '___$1___'
			}
		],
		eventType: ['personalizationImpression', 'publicEvent'],
		destinations: ['eVar42'],
		name: 'Secure - Personalization - eVar42 - Personalization Product',
		subType: ['BLANK', 'personalizationImpression']
	},
	{
		eventType: ['personalizationImpression', 'publicEvent'],
		destinations: ['eVar114'],
		name: 'Personalization Impression eVar114 - CXO TNT',
		subType: ['BLANK', 'personalizationImpression'],
		instructions: [
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.tntPersonalizationData.category',
					'|',
					'packet.event.payload.data.tntPersonalizationData.elementName',
					'|',
					'packet.event.payload.data.tntPersonalizationData.elementPlacement',
					'|',
					'packet.event.payload.data.tntPersonalizationData.elementContext'
				]
			},
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.personalizationData.category',
					'|',
					'packet.event.payload.data.personalizationData.elementName',
					'|',
					'packet.event.payload.data.personalizationData.elementPlacement',
					'|',
					'packet.event.payload.data.personalizationData.elementContext'
				]
			},
			{
				valueB: '|||',
				notEqual: '___$1___',
				equal: '___$2___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				notEqual: '___$3___',
				equal: '',
				valueB: '|||',
				valueA: '___$3___',
				type: 'IfThen'
			},
			{ sources: ['___$4___'], type: 'ToLowerCase' }
		]
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.model.ManageParentChildFundsTransfers.accountOwnerRole'
				],
				type: 'ToLowerCase'
			},
			{
				noMatch: '',
				match: '___$1___',
				regex: '(?i)(parent|child)',
				type: 'RegexCheck',
				value: '___$1___'
			}
		],
		eventType: ['mobileAction'],
		destinations: ['eVar94'],
		name: 'Mobile - MobileAction - eVar94 - accountOwnerRole'
	},
	{
		instructions: [
			{
				substring: 'applicationId=',
				type: 'SubstringAfter',
				value: 'packet.event.screen.id'
			},
			{ type: 'SubstringBefore', substring: '&', value: '___$1___' },
			{
				regex: '.+(?i)[?&]leadid=([^&]*)&?.*',
				replace: '$1',
				value: 'packet.event.screen.id',
				type: 'RegexReplace'
			},
			{
				type: 'IfThen',
				valueA: '___$3___',
				valueB: 'packet.event.screen.id',
				notEqual: '___$3___',
				equal: ''
			},
			{
				notEqual: '___$4___',
				equal: '___$2___',
				valueB: '',
				type: 'IfThen',
				valueA: '___$4___'
			}
		],
		name: 'Set eVar67- CXO',
		destinations: ['eVar95'],
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		]
	},
	{
		instructions: [
			{ type: 'ToLowerCase', sources: ['packet.event.screen.referrerUrl'] },
			{
				value: '___$1___',
				replace: '$1',
				regex: '.+[?&]assettype=([^&]+)&?.*',
				type: 'RegexReplace'
			},
			{
				equal: '',
				notEqual: '___$2___',
				valueB: '___$2___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				replace: '$1',
				regex: '.+[?&]xxxremovexxxid=([^&]+)&?.*',
				value: '___$1___',
				type: 'RegexReplace'
			},
			{
				notEqual: '___$4___',
				equal: '',
				valueB: '___$4___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				type: 'RegexReplace',
				replace: '$1',
				regex: '.*deposits.chase.com.*[?&]page=([^&]+)&?.*',
				value: '___$1___'
			},
			{
				equal: '',
				notEqual: '___$6___',
				valueB: '___$6___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				replace: '$1',
				regex: '.+[?&]pagename=([^&]+)&?.*',
				value: '___$1___',
				type: 'RegexReplace'
			},
			{
				valueA: '___$1___',
				type: 'IfThen',
				valueB: '___$8___',
				equal: '',
				notEqual: '___$8___'
			},
			{
				regex: '.+[?&]pg_name=([^&]+)&?.*',
				replace: '$1',
				type: 'RegexReplace',
				value: '___$1___'
			},
			{
				valueB: '___$10___',
				notEqual: '___$10___',
				equal: '',
				valueA: '___$1___',
				type: 'IfThen'
			},
			{
				regex: '.+[?&]px=([^&]+)&?.*',
				replace: '$1',
				type: 'RegexReplace',
				value: '___$1___'
			},
			{
				type: 'IfThen',
				valueA: '___$1___',
				notEqual: '___$12___',
				equal: '',
				valueB: '___$12___'
			},
			{
				value: '___$1___',
				replace: '$1',
				regex: '.+[?&]templatetitle=([^&]+)&?.*',
				type: 'RegexReplace'
			},
			{
				type: 'IfThen',
				valueA: '___$1___',
				equal: '',
				notEqual: '___$14___',
				valueB: '___$14___'
			},
			{
				replace: '$1',
				value: '___$1___',
				regex: '.+[?&]urlname=([^&]+)&?.*',
				type: 'RegexReplace'
			},
			{
				valueB: '___$16___',
				equal: '',
				notEqual: '___$16___',
				type: 'IfThen',
				valueA: '___$1___'
			},
			{
				value: '___$1___',
				replace: '$1',
				regex: '.+[?&]userfriedlyurl=([^&]+)&?.*',
				type: 'RegexReplace'
			},
			{
				type: 'IfThen',
				valueA: '___$1___',
				valueB: '___$18___',
				notEqual: '___$18___',
				equal: ''
			},
			{
				replace: '$1',
				type: 'RegexReplace',
				regex: '.+[?&]_pagelabel=([^&]+)&?.*',
				value: '___$1___'
			},
			{
				valueA: '___$1___',
				type: 'IfThen',
				notEqual: '___$20___',
				equal: '',
				valueB: '___$20___'
			},
			{ substring: '?', type: 'SubstringBefore', value: '___$1___' },
			{ substring: 'https://', type: 'SubstringAfter', value: '___$22___' },
			{
				replace: '',
				type: 'RegexReplace',
				regex: '\\;[jsessionid|dctmsession].*',
				value: '___$23___'
			},
			{
				value: '___$24___',
				replace: '',
				regex: '[^;*](\\;.*)',
				type: 'RegexReplace'
			},
			{
				noMatch: '___$23___',
				match: '___$25___',
				value: '___$1___',
				regex: '.*jp_inv.*',
				type: 'RegexCheck'
			},
			{ replace: ' ', regex: '%20', value: '___$26___', type: 'RegexReplace' },
			{ type: 'RegexReplace', replace: '', regex: '\t', value: '___$27___' },
			{ replace: '', regex: '\n', type: 'RegexReplace', value: '___$28___' },
			{
				replace: '',
				value: '___$29___',
				regex: '[0-9]{9,}/?',
				type: 'RegexReplace'
			},
			{ type: 'RegexReplace', replace: '', regex: '$', value: '___$30___' },
			{ replace: '', type: 'RegexReplace', regex: '%', value: '___$31___' },
			{
				match: 'locator.chase.com/search_results',
				noMatch: '___$32___',
				regex: 'locator.chase.com/search.*',
				value: '___$32___',
				type: 'RegexCheck'
			},
			{
				value: '___$33___',
				regex: 'locator.chase.com/[a-z][a-z]/.+',
				type: 'RegexCheck',
				noMatch: '___$33___',
				match: 'locator.chase.com/branch_details'
			},
			{
				noMatch: '___$34___',
				match: 'locator.chase.com/browse_by_state',
				regex: 'locator.chase.com/[a-z][a-z]',
				type: 'RegexCheck',
				value: '___$34___'
			},
			{
				regex: 'autopreferred.chase.com/info/?.*',
				type: 'RegexCheck',
				value: '___$35___',
				noMatch: '___$35___',
				match: 'autopreferred.chase.com/info'
			},
			{
				noMatch: '___$36___',
				match: 'autopreferred.chase.com/search',
				value: '___$36___',
				regex: 'autopreferred.chase.com/search/?.*',
				type: 'RegexCheck'
			},
			{
				noMatch: '___$37___',
				match: 'autopreferred.chase.com/thanks',
				value: '___$37___',
				regex: 'autopreferred.chase.com/thanks/?.*',
				type: 'RegexCheck'
			},
			{
				noMatch: '___$38___',
				match: 'homelendingadvisor.chase.com',
				regex: '^homelendingadvisor.chase.com.*',
				type: 'RegexCheck',
				value: '___$38___'
			},
			{
				match: 'landroverusa.com',
				noMatch: '___$39___',
				value: '___$39___',
				regex: 'landroverusa.com.*',
				type: 'RegexCheck'
			},
			{
				type: 'RegexCheck',
				regex: 'dummy_jpmorgan_merge_rule_delete',
				value: '___$40___',
				match: 'jpmorgandomains.com',
				noMatch: '___$40___'
			},
			{ substring: '#', type: 'SubstringBefore', value: '___$41___' },
			{
				regex: '[\\/]+$',
				replace: '',
				type: 'RegexReplace',
				value: '___$42___'
			},
			{
				sources: [
					'___$43___',
					'?pg_name=',
					'___$3___',
					'___$5___',
					'___$7___',
					'___$9___',
					'___$11___',
					'___$13___',
					'___$15___',
					'___$17___',
					'___$19___',
					'___$21___'
				],
				type: 'Concatenate'
			},
			{
				match: '___$44___',
				noMatch: '___$43___',
				regex:
					'(.+[?&]pg_name=|.+[?&]pagename=|.+[?&]userfriendlyurl=|.+[?&]urlname=|.+[?&]templatetitle=|.*deposits.chase.com.*[?&]page=|.+[?&]_pagelabel=|.+[?&]assettype=|.+[?&]px=|.+[?&]xxxremovexxxid=).+',
				type: 'RegexCheck',
				value: '___$1___'
			},
			{
				type: 'RegexCheck',
				regex: '.*creditcards.chase.com.*[?&]pg_name=.+',
				value: '___$1___',
				noMatch: '___$45___',
				match: '___$43___'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.screen.pageTitle',
				notEqual: '',
				equal: 'declined',
				valueB: 'Decision Declined'
			},
			{ type: 'Concatenate', sources: ['___$43___', '?pg_name=', '___$47___'] },
			{
				type: 'RegexCheck',
				regex: '(?i)(applynow.chase.com\\/flexappweb\\/.*?pg_name=Declined)',
				value: '___$48___',
				noMatch: '___$46___',
				match: '___$48___'
			},
			{
				regex: '(?i)jobs.chase.com.*',
				value: '___$49___',
				type: 'RegexCheck',
				noMatch: '___$49___',
				match: 'jobs.chase.com/all_pages'
			},
			{
				replace: 'docusign_iframe_url',
				value: '___$50___',
				regex: 'docusign_iframe_url\\/.*',
				type: 'RegexReplace'
			},
			{
				regex: '.*jpmorgan.*(\\.com|\\.co|\\.ru|\\.net).*',
				type: 'RegexCheck',
				value: '___$51___',
				match: 'jpmorgandomains.com/all_pages',
				noMatch: '___$51___'
			},
			{
				noMatch: '___$52___',
				match: '___$51___',
				type: 'RegexCheck',
				regex:
					'.*paymentnet.jpmorgan.com.*|m.jpmorgan.com.*|.*ccportal.jpmorgan.com.*|.*jpmorganwealthmanagement.com.*|.*jpmorgancc.com.*',
				value: '___$51___'
			},
			{
				regex: 'preview\\.cig\\.chase.com(.*)',
				replace: '$1',
				value: '___$53___',
				type: 'RegexReplace'
			},
			{ type: 'Concatenate', sources: ['chase.com', '___$54___'] },
			{
				regex: 'preview\\.cig\\.chase.com.*',
				type: 'RegexCheck',
				value: '___$53___',
				noMatch: '___$53___',
				match: '___$55___'
			},
			{
				noMatch: '___$56___',
				match: '',
				regex: '.*password:.*',
				type: 'RegexCheck',
				value: '___$56___'
			},
			{
				noMatch: '___$57___',
				match: '',
				regex: '.*username:.*',
				value: '___$57___',
				type: 'RegexCheck'
			},
			{
				type: 'RegexCheck',
				regex: '.*user.id:.*',
				value: '___$58___',
				match: '',
				noMatch: '___$58___'
			}
		],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		name: 'Classic Referrer eVar101',
		destinations: ['eVar101'],
		eventType: [
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicEvent',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicAction',
			'publicCustom',
			'publicEvent'
		]
	},
	{
		instructions: [
			{
				sources: [
					'packet.event.payload.data.legalAgreementName.value',
					'packet.event.payload.data.insightType.value',
					'packet.event.payload.data.currentSelectedCategory.value',
					'packet.event.payload.data.model.ReviewOffers.selectedOfferCategory',
					'packet.event.payload.data.model.ManageDigitalWallet.walletType'
				],
				type: 'Concatenate'
			},
			{
				type: 'RegexCheck',
				regex:
					'(?i)(^legal_agreements_repository$|^insights_tiles$|^merchant_funded_all_offers$|^manage_digital_wallets$|^review_merchant_offers$|^REVIEW_MERCHANT_OFFERS_REVIEW_OFFER_CATEGORIES$)',
				value: 'packet.event.component',
				match: '___$1___',
				noMatch: ''
			}
		],
		eventType: ['mobileAction', 'action'],
		destinations: ['eVar47'],
		name: 'Debug eVar47 link details'
	},
	{
		name: 'Mobile Secure - Action MobileAction - eVar31 - Temporary rule t',
		destinations: ['eVar31'],
		eventType: ['mobileAction', 'action'],
		instructions: [
			{
				sources: [
					'packet.event.payload.data.navigationControlName.value',
					'packet.event.payload.data.chaseReliefHubAnalyticsAction.value',
					'packet.event.payload.data.model.ReviewInsight.insight.clickThroughActionType',
					'packet.event.payload.data.twoFactorAuthenticationEnabled.value',
					'packet.event.payload.data.businessStructureId.value',
					'packet.event.payload.data.legalAgreementName.value',
					'packet.event.payload.data.productId.value',
					'packet.event.payload.data.insightType.value',
					'packet.event.payload.data.selectedTopic.value',
					'packet.event.payload.data.selectedAppointmentReasonOptionId.value',
					'packet.event.payload.data.model.ReviewAccount.selectedAccountWalletGroup',
					'packet.event.payload.data.makeId.value',
					'packet.event.payload.data.feedbackOptionName.value',
					'packet.event.payload.data.accountSafeCallToActionNavigation.value',
					'packet.event.payload.data.model.UseVirtualAssistant.userResponse',
					'packet.event.payload.data.targetNavigation.value',
					'packet.event.payload.data.pollQuestionAndAnswer.value',
					'packet.event.payload.data.model.AuthenticateUser.identityVerificationType',
					'packet.event.payload.data.specialAnnouncementAnalyticsAction.value',
					'packet.event.payload.data.passwordResetIdentifyOptionId.value',
					'packet.event.payload.data.mortgagePayoffQuoteReasonId.value',
					'packet.event.payload.data.financialInstitutionName.value'
				],
				type: 'Concatenate'
			},
			{ sources: ['___$1___'], type: 'ToLowerCase' },
			{
				regex:
					'(?i)(^chase_relief.*|^special_announcement$|^navigation_control$|^mortgage_payoff_quote_details$|^financial_institution_search$|^logon_password_reset$|^two_factor_authentication$|^provide_verification_details$|^learning_and_insights$|^review_dashboard$|^vehicle_information$|^feature_feedback$|^business_banking_initiation$|^assets_and_liabilities_overview$|^use_virtual_assistant$|^credit_insider_article$|^credit_insider_container$|^credit_insider_pillar$|^credit_insider_what_you_may_also_like$|^legal_agreements_repository$|^appointment_details$|^account_safe_menu$|^insights_tiles$)',
				value: 'packet.event.component',
				type: 'RegexCheck',
				noMatch: '',
				match: '___$2___'
			},
			{
				value: 'packet.event.payload.data.action',
				regex: '(?i)(reviewinsight\\..*insight$)',
				type: 'RegexCheck',
				match: '___$2___',
				noMatch: '___$3___'
			}
		]
	},
	{
		instructions: [
			{
				valueA: 'packet.event.payload.data.searchResultFeedback.value',
				type: 'IfThen',
				valueB: '',
				equal: 'event1',
				notEqual: 'event12'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.searchResultFeedback.value',
				equal: 'event37',
				notEqual: '___$1___',
				valueB: ''
			},
			{
				valueB: '',
				equal: '___$1___',
				notEqual: '___$2___',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.searchFor.value'
			},
			{
				match: 'event5',
				noMatch: '___$3___',
				regex:
					'(?i)(.*pdf|csv|excel.*|.*print.*|^download.*|^request.*documents?$)',
				value: 'packet.event.payload.action',
				type: 'RegexCheck'
			},
			{
				regex:
					'(?i)(requestchasefacebook|requesttwitter|requestchasetwitter|requestchaselinkedin|requestchaseinstagram|requestchaseyoutube|requestexternalnavigation|request.*website)',
				value: 'packet.event.payload.action',
				type: 'RegexCheck',
				noMatch: '___$4___',
				match: 'event28'
			},
			{
				valueB: '',
				equal: '___$5___',
				notEqual: 'event38',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.videoName.value'
			},
			{
				valueB: '',
				equal: '___$6___',
				notEqual: 'event38',
				valueA: 'packet.event.payload.data.videoTitle.value',
				type: 'IfThen'
			},
			{
				regex: '(?i)(.*video.*)',
				value: 'packet.event.payload.action',
				type: 'RegexCheck',
				match: 'event38',
				noMatch: '___$7___'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.action',
				valueB: 'playVideo',
				notEqual: '___$8___',
				equal: 'event30,event38'
			},
			{
				type: 'RegexCheck',
				regex: '(?i)(reviewoffer|selectConversationMessageAction)',
				value: 'packet.event.payload.action',
				noMatch: '___$9___',
				match: 'event9'
			},
			{
				regex: '(?i)(reviewoffer|selectConversationMessageAction)',
				value: 'packet.event.payload.action',
				type: 'RegexCheck',
				match: 'event9,event26',
				noMatch: '___$10___'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.failoverReason',
				valueB: '',
				equal: '___$10___',
				notEqual: '___$11___'
			},
			{
				equal: '___$12___',
				notEqual: 'event51',
				valueB: 'ad',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.conversationMessageType.value'
			},
			{
				valueA: 'packet.event.payload.data.conversationMessageType.value',
				type: 'IfThen',
				valueB: '',
				equal: '___$12___',
				notEqual: '___$13___'
			},
			{
				noMatch: '___$14___',
				match: 'event10',
				value: 'packet.event.payload.action',
				regex:
					'(?i)(requestConversationMessageActions.*|exitConversationMessage)',
				type: 'RegexCheck'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.advertisementId.value',
				notEqual: '___$15___',
				equal: '___$14___',
				valueB: ''
			},
			{
				match: 'event10',
				noMatch: '___$16___',
				type: 'RegexCheck',
				regex:
					'(?i)(requestConversationMessageActions.*|exitConversationMessage|interactWithAdvertisement)',
				value: 'packet.event.payload.action'
			},
			{
				regex:
					'(?i)(requestConversationMessageActions.*|exitConversationMessage|interactWithAdvertisement)',
				type: 'RegexCheck',
				value: 'packet.event.payload.action',
				match: 'event10,event26',
				noMatch: '___$17___'
			},
			{
				valueB: '',
				equal: '___$17___',
				notEqual: '___$18___',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.failoverReason'
			},
			{
				valueB: 'ad',
				notEqual: 'event44',
				equal: '___$19___',
				valueA: 'packet.event.payload.data.conversationMessageType.value',
				type: 'IfThen'
			},
			{
				value: 'packet.event.payload.action',
				regex:
					'(?i)(requestConversationMessageActions.*|exitConversationMessage)',
				type: 'RegexCheck',
				match: '___$20___',
				noMatch: '___$19___'
			}
		],
		destinations: ['events'],
		name: 'Set Action events - Web only edited (new)',
		eventType: ['action']
	},
	{
		action:
			'(?i)(^interactWithAdvertisement$|^requestConversationMessageActions.*|^selectConversationMessageAction$|^exitConversationMessage$|^reviewOffer$)',
		instructions: [
			{
				sources: [
					'packet.event.payload.data.advertisementId.value',
					'|',
					'packet.event.payload.data.advertisementPageId.value',
					'|',
					'packet.event.payload.data.advertisementPlacementId.value',
					'|',
					'packet.event.payload.data.advertisementInternalPlacementId.value',
					'|'
				],
				type: 'Concatenate'
			},
			{
				valueA: 'packet.event.payload.data.advertisementId.value',
				type: 'IfThen',
				equal: '',
				notEqual: '___$1___',
				valueB: ''
			},
			{
				type: 'Concatenate',
				sources: [
					'packet.event.payload.data.advertisementId.value',
					'|',
					'private_conversation_deck|conversationdeck',
					'|',
					'|'
				]
			},
			{
				valueA: 'packet.event.payload.data.conversationMessageType.value',
				type: 'IfThen',
				valueB: 'ad',
				equal: '___$3___',
				notEqual: '___$2___'
			}
		],
		eventType: ['action'],
		name: 'Rule156 final (list1)',
		destinations: ['list1']
	},
	{
		instructions: [
			{
				valueA: 'packet.event.payload.data.searchResultFeedback.value',
				type: 'IfThen',
				notEqual: 'search feedback interaction',
				equal: 'link click',
				valueB: ''
			},
			{
				equal: 'search link',
				notEqual: '___$1___',
				valueB: '',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.searchResultFeedback.value'
			},
			{
				equal: '___$1___',
				notEqual: '___$2___',
				valueB: '',
				valueA: 'packet.event.payload.data.searchFor.value',
				type: 'IfThen'
			},
			{
				match: 'document download',
				noMatch: '___$3___',
				regex:
					'(?i)(.*pdf|csv|excel.*|.*print.*|^download.*|^request.*documents?$)',
				value: 'packet.event.payload.action',
				type: 'RegexCheck'
			},
			{
				value: 'packet.event.payload.action',
				regex:
					'(?i)(requestchasefacebook|requesttwitter|requestchasetwitter|requestchaselinkedin|requestchaseinstagram|requestchaseyoutube|requestexternalnavigation|request.*website)',
				type: 'RegexCheck',
				noMatch: '___$4___',
				match: 'exit link'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.videoName.value',
				valueB: '',
				equal: '___$5___',
				notEqual: 'video interaction'
			},
			{
				notEqual: 'video interaction',
				equal: '___$6___',
				valueB: '',
				type: 'IfThen',
				valueA: 'packet.event.payload.data.videoTitle.value'
			},
			{
				regex: '(?i)(.*video.*)',
				value: 'packet.event.payload.action',
				type: 'RegexCheck',
				noMatch: '___$7___',
				match: 'video interaction'
			},
			{
				match: 'ad click',
				noMatch: '___$8___',
				regex: '(?i)(reviewoffer|selectConversationMessageAction)',
				type: 'RegexCheck',
				value: 'packet.event.payload.action'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.conversationMessageType.value',
				equal: '___$9___',
				notEqual: 'conversation message click',
				valueB: 'ad'
			},
			{
				type: 'IfThen',
				valueA: 'packet.event.payload.data.conversationMessageType.value',
				equal: '___$9___',
				notEqual: '___$10___',
				valueB: ''
			},
			{
				regex:
					'(?i)(requestConversationMessageActions.*|exitConversationMessage)',
				type: 'RegexCheck',
				value: 'packet.event.payload.action',
				match: 'ad interaction',
				noMatch: '___$11___'
			},
			{
				valueA: 'packet.event.payload.data.conversationMessageType.value',
				type: 'IfThen',
				valueB: 'ad',
				notEqual: 'conversation message interaction',
				equal: '___$12___'
			},
			{
				noMatch: '___$12___',
				match: '___$13___',
				value: 'packet.event.payload.action',
				regex:
					'(?i)(requestConversationMessageActions.*|exitConversationMessage)',
				type: 'RegexCheck'
			},
			{
				valueB: 'interactWithAdvertisement',
				notEqual: '___$14___',
				equal: 'ad interaction',
				type: 'IfThen',
				valueA: 'packet.event.payload.action'
			}
		],
		name: 'Rule037, Rule038, Rule039, Rule040, Rule043 edited 0108',
		destinations: ['eVar7', 'prop7', 'linkName'],
		eventType: ['action']
	},
	{
		name: 'Direct Mapping - Client Info',
		eventType: ['mobileAction', 'mobileEvent'],
		subType: [
			'BLANK',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.payload.data.app.channel' }
		],
		destinations: ['channel']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.eci' }
		],
		destinations: ['eVar9']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.eci' }
		],
		destinations: ['prop9']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.profileId' }
		],
		destinations: ['prop8']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.profileId' }
		],
		destinations: ['eVar8']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.userType' }
		],
		destinations: ['eVar10']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.userType' }
		],
		destinations: ['prop10']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.segment' }
		],
		destinations: ['eVar12']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.segment' }
		],
		destinations: ['prop12']
	},
	{
		name: 'Direct Mapping - App Info',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [{ type: 'Concatenate', sources: 'packet.event.site' }],
		destinations: ['eVar4']
	},
	{
		name: 'Direct Mapping - App Info',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [{ type: 'Concatenate', sources: 'packet.event.site' }],
		destinations: ['prop4']
	},
	{
		name: 'Direct Mapping - App Info',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		subType: [
			'BLANK',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.app.language' }
		],
		destinations: ['eVar5']
	},
	{
		name: 'Direct Mapping - App Info',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		subType: [
			'BLANK',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.app.language' }
		],
		destinations: ['prop5']
	},
	{
		name: 'Direct Mapping - App Info',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.app.version' }
		],
		destinations: ['eVar53']
	},
	{
		name: 'Direct Mapping - Client Info',
		eventType: ['mobileAction', 'mobileEvent', 'publicAction'],
		subType: [
			'BLANK',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{
				type: 'Concatenate',
				sources: 'packet.event.payload.data.device.orientation'
			}
		],
		destinations: ['prop58']
	},
	{
		name: 'Direct Mapping - Client Info',
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.headers.user-agent' }
		],
		destinations: ['userAgent']
	},
	{
		name: 'Direct Mapping - Client Info',
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.headers.user-agent' }
		],
		destinations: ['eVar72']
	},
	{
		name: 'Direct Mapping - Client Info',
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		subType: ['BLANK'],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.device.screenRes' }
		],
		destinations: ['resolution']
	},
	{
		name: 'Direct Mapping - Client Info',
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression'
		],
		subType: ['BLANK'],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.device.browserLang' }
		],
		destinations: ['language']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.visitorType' }
		],
		destinations: ['eVar13']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.visitorType' }
		],
		destinations: ['prop13']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.visitorId' }
		],
		destinations: ['eVar62']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.loggedInState' }
		],
		destinations: ['eVar11']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.loggedInState' }
		],
		destinations: ['prop11']
	},
	{
		name: 'Direct Mapping - Screen Event Data',
		eventType: [
			'mobileAction',
			'mobileEvent',
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'simpleValueDecisionedContent',
			'adClick',
			'adImpression',
			'impression',
			'interaction',
			'personalizationImpression',
			'publicEvent',
			'publicAction',
			'publicCustom'
		],
		subType: [
			'BLANK',
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.location.tz_offset' }
		],
		destinations: ['eVar58']
	},
	{
		name: 'Direct Mapping - dataCollection',
		eventType: ['dataCollection'],
		subType: ['BLANK'],
		instructions: [
			{
				type: 'Concatenate',
				sources:
					'packet.event.payload.data.properties[0].totalConversationMessages'
			}
		],
		destinations: ['prop56']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: ['mobileAction', 'mobileEvent'],
		subType: [
			'BLANK',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.loggedIn' }
		],
		destinations: ['eVar11']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: ['mobileAction', 'mobileEvent'],
		subType: [
			'BLANK',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.loggedIn' }
		],
		destinations: ['prop11']
	},
	{
		name: 'Direct Mapping - Screen Event Data',
		eventType: ['mobileAction', 'mobileEvent', 'personalizationImpression'],
		subType: [
			'BLANK',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.podId' }
		],
		destinations: ['server']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: ['mobileAction', 'mobileEvent'],
		subType: [
			'BLANK',
			'screen',
			'system',
			'advertisement',
			'ImpressionEvent',
			'DataCollection',
			'Communication'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.locationsEnabled' }
		],
		destinations: ['prop60']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: ['mobileAction', 'publicEvent', 'publicAction', 'publicCustom'],
		subType: [
			'BLANK',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.visitor.authType' }
		],
		destinations: ['eVar98']
	},
	{
		name: 'Direct Mapping - Screen Event Data',
		eventType: ['publicEvent', 'publicAction', 'publicCustom'],
		subType: [
			'screen',
			'adImpressions',
			'hover',
			'modal',
			'dynamicLinks',
			'documentLinks',
			'exitLinks',
			'adClicks',
			'tab',
			'formField',
			'scroll',
			'externalVideo',
			'internalVideo',
			'personalizationImpression'
		],
		instructions: [
			{
				type: 'Concatenate',
				sources: 'packet.event.payload.data.pageExperienceType'
			}
		],
		destinations: ['eVar65']
	},
	{
		name: 'Direct Mapping - Screen Event Data',
		eventType: ['personalizationImpression'],
		subType: ['BLANK'],
		instructions: [
			{
				type: 'Concatenate',
				sources: 'packet.event.payload.data.inkBusinessBenefits'
			}
		],
		destinations: ['eVar91']
	},
	{
		name: 'Direct Mapping - Screen Event Data',
		eventType: ['publicEvent'],
		subType: ['screen'],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.payload.data.errorCode' }
		],
		destinations: ['eVar79']
	},
	{
		name: 'Direct Mapping - Screen Event Data',
		eventType: ['publicEvent'],
		subType: ['screen'],
		instructions: [
			{
				type: 'Concatenate',
				sources: 'packet.event.payload.data.careerThankYouPageVendor'
			}
		],
		destinations: ['eVar99']
	},
	{
		name: 'Direct Mapping - User Identity',
		eventType: ['communication', 'screen', 'action'],
		subType: ['BLANK'],
		instructions: [
			{
				type: 'Concatenate',
				sources: 'packet.event.visitor.aggregatedAccountType'
			}
		],
		destinations: ['eVar27']
	},
	{
		name: 'Direct Mapping - Screen Event Data',
		eventType: [
			'communication',
			'screen',
			'action',
			'simpleDecisionedContent',
			'dataCollection',
			'personalizationImpression'
		],
		subType: ['BLANK'],
		instructions: [
			{
				type: 'Concatenate',
				sources: 'packet.event.payload.data.redirectScreen'
			}
		],
		destinations: ['prop72']
	},
	{
		name: 'Direct Mapping - Client Info',
		eventType: ['action'],
		subType: ['BLANK'],
		instructions: [
			{ type: 'Concatenate', sources: 'packet.event.payload.nonCustomerEvent' }
		],
		destinations: ['prop70']
	},
	{
		name: 'Direct Mapping - dataCollection',
		eventType: ['dataCollection'],
		subType: ['BLANK'],
		instructions: [
			{
				type: 'Concatenate',
				sources: 'packet.event.payload.data.properties[2].searchOptionsCount'
			}
		],
		destinations: ['eVar29']
	},
	{
		name: 'Direct Mapping - Ad Impression Data',
		eventType: ['personalizationImpression', 'publicEvent'],
		subType: ['BLANK', 'personalizationImpression'],
		instructions: [
			{
				type: 'Concatenate',
				sources: 'packet.event.payload.data.tntPersonalizationData.elementName'
			}
		],
		destinations: ['tnta']
	}
];