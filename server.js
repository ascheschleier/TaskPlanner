var bankai = require('bankai/http')
var http = require('http')
var path = require('path')
const { parse } = require('querystring');

var compiler = bankai(path.join(__dirname, 'index.js'))
var server = http.createServer(function (req, res) {

    if (req.method === 'POST') {
         collectRequestData(req, result => {
            console.log(result);
            //res.end(`Parsed data belonging to ${result.fname}`);
        });
    }
    else {
        compiler(req, res, function () {
            res.statusCode = 404
            res.end('not found')
        })
    }
})

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    //if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    /*}
    else {
        callback(null);
    } */
}

server.listen(8080, function () {
  console.log('listening on port 8080')
})