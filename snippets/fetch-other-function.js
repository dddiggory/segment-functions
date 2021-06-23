// Learn more about source functions API at
// https://segment.com/docs/connections/sources/source-functions

/**
 * Handle incoming HTTP request
 *
 * @param  {FunctionRequest} request
 * @param  {FunctionSettings} settings
 */
async function onRequest(request, settings) {
	const ttl = 15 * 60 * 1000; // 15 minute cache TTL, for example.

	//here, we're using the Cache as described here:
	//https://segment.com/docs/connections/functions/source-functions/#caching
	const getFunctionFromApiOrCache = await cache.load(
		'rulesJSON',
		ttl,
		async () => {
			const res = await fetch(
				'https://platform.segmentapis.com/v1beta/workspaces/'+settings.workspaceId+'/functions/'+settings.functionId,
				{
					method: 'GET',
					headers: {
						Authorization: 'Bearer ' + settings.rulesFetchApiToken
					}
				}
			);
			const data = await res.json();
			const parsedFunction = eval(data.code);
			return parsedFunction;
		}
	);
	//me logging the first item and then a specific value
	console.log(getFunctionFromApiOrCache[0]);
	console.log(getFunctionFromApiOrCache[0]['eventType']);
}
