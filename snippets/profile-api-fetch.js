// Learn more about source functions API at
// https://segment.com/docs/connections/sources/source-functions

/**
 * Handle incoming HTTP request
 *
 * @param  {FunctionRequest} request
 * @param  {FunctionSettings} settings
 */

let startTimer = Date.now();

//Use Settings to interpolate your credentials
let profileApiToken = settings.profileApiToken;
let personasSpace = settings.personasSpaceID;
let profileUrlTemplate =
	'https://profiles.segment.com/v1/spaces/' +
	personasSpace +
	'/collections/users/profiles/user_id:{{UID}}/traits?limit=200';
let profileApiAuthHeaders = new Headers({
	Authorization: 'Basic ' + btoa(profileApiToken + ':')
});

async function onRequest(request, settings) {
	const data = request.json();

	let enrichmentObj = {};

	//Profile-based Enrichment suggestions, depending on preferred async implementation:
	//Either looping through and collecting every Profile ID from the batch in an array.
	//Then make async requests to the Profile API for each profile ID
	//When they're complete, move onto standard event processing.
	//
	//Or: async the entire user enrichment + event mapping flow.

	let profileLookups = [];

	for (let i in data) {
		if (data[i].event.visitor.profileId)
			profileLookups.push(data[i].event.visitor.profileId);
	}
	let uniqueProfiles = [...new Set(profileLookups)]; //dedupe pfids

	await Promise.all(
		uniqueProfiles.map(async pfid => {
			let profileUrl = profileUrlTemplate.replace('{{UID}}', pfid);
			console.log(profileUrl);
			const response = await fetch(profileUrl, {
				method: 'GET',
				headers: profileApiAuthHeaders
			});
			const enrichmentTraits = await response.json();
			enrichmentObj[pfid] = enrichmentTraits;
		})
	);

	let elapsed = Date.now() - startTimer;
	console.log(String(elapsed) + 'ms compute time');
}
