// Learn more about source functions API at
// https://segment.com/docs/connections/sources/source-functions

/**
 * Handle incoming HTTP request
 *
 * @param  {FunctionRequest} request
 * @param  {FunctionSettings} settings
 */

//Note: this can timeout in the slower env of the Builder, but works when Deployed.
async function onRequest(request, settings) {
	//const body = request.json()
	let start = new Date();

	let params = {
		Bucket: settings.s3Bucket, //use Settings to interpolate your bucket name
		Key: settings.s3Key //use Settings to interpolate your object key
	};

	try {
		const s3 = new AWS.S3({
			accessKeyId: settings.awsAccessKeyId, //settings
			secretAccessKey: settings.awsSecretAccessKey, //settings
			region: 'us-west-2', //use settings.awsRegion to modularize
			maxRedirects: 1,
			maxRetries: 0,
			httpOptions: {
				connectTimeout: 1000,
				timeout: 1000
			}
			// useAccelerateEndpoint: true
		});
		console.log('connected');
		const response = await s3.getObject(params).promise();
		let end = new Date();
		let elapsed = end - start;
		console.log('here');
		console.log('after S3 getObj: ', response.Body.toString('utf-8'));
		Segment.track({
			event: 'Success',
			userId: 'test',
			properties: { elapsed }
		});
	} catch (ex) {
		console.log('error: ', ex);
	}
}
