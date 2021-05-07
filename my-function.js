[
	{
		destinations: ['blockEvent'],
		eventType: ['communication'],
		status: ['success'],
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
	}]
