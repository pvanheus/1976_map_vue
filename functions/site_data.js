exports.handler = (event, context, callback) => {
    let headers = event.headers;
    headers.KEY = process.env.TF_KEY;
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(headers),
    })
};
