// Collect & transform from Intercom Webhooks: https://developers.intercom.com/building-apps/docs/webhooks 

/**
 * Handle incoming HTTP request
 *
 * @param  {FunctionRequest} request
 * @param  {FunctionSettings} settings
 */
async function onRequest(request, settings) {
	const body = request.json();

	// reference: https://developers.intercom.com/building-apps/docs/webhook-model#section-webhook-notification-object
	let eventName = body.topic;
	let userId;
	let traits = {};
	let properties = {};

	// let eventRenames = {
	//   "conversation.user.created": "Live Chat Conversation Started",
	//   "conversation.admin.closed": "Live Chat Conversation Ended",
	//   "conversation.user.replied": "Live Chat Message Sent",
	//   "conversation.admin.replied": "Live Chat Message Received",
	//   "conversation.admin.single.created": "Live Chat Message Received"
	// }

	if (body.data.item.type == 'user') {
		userId = body.data.item.user_id;
	} else if (body.data.item.type == 'company') {
		companyId = body.data.item.company_id;
	}

	Object.assign(traits, body.data.item);
	Object.assign(properties, body.data.item);

	if ('custom_attributes' in body.data.item) {
		delete traits.custom_attributes;
		delete properties.custom_attributes;
		Object.assign(traits, body.data.item.custom_attributes);
		Object.assign(properties, body.data.item.custom_attributes);
	}
	// See https://segment.com/docs/connections/spec/track/
	Segment.track({
		event: eventName,
		userId: userId,
		properties: properties
	});

	// See https://segment.com/docs/connections/spec/identify/
	Segment.identify({
		userId: userId,
		traits: traits
	});

	// See https://segment.com/docs/connections/spec/group/
	// Segment.group({
	//   groupId: 'group_id',
	//   userId: 'user_id',
	//   traits: {
	//     groupName: 'Unicorn'
	//   }
	// })
}
