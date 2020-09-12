// GET /.netlify/functions/hello?name="Kyle"
exports.handler = async(event, context) => {
    let output = `Hello, ${event.queryStringParameters.name}`
    return { statusCode: 200, body: output };
}