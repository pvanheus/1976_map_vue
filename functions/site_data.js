exports.handler = (event, context, callback) => {
    let response = {};
    if ('referer' in event.headers && event.headers.referer === 'https://1976.webbedfeet.co.za/') {
        response.TF_KEY = process.env.TF_KEY
    }
    callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
    })
};
