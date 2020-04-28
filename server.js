var bankai = require('bankai/http')
var http = require('http')
var path = require('path')
const { parse } = require('querystring')
var serverRouter = require('server-router')

var router = serverRouter({ default: '/404' })

var compiler = bankai(path.join(__dirname, './frontend/index.js'))

router.route('GET', '*', function (req, res, params) {
   compiler(req, res, function () {
        res.statusCode = 404
        res.end('not found')
    })
})

router.route('POST', '/login', function (req, res, params) {
   collectRequestData(req, result => {
        if(result === null) {
            res.statusCode = 400
            res.end("Data not valid")
            console.log("Data not valid");
            return false
        }
        console.log(result);
        
        res.statusCode = 201
        res.end()
    });
})

function collectRequestData(request, callback) {
    const FORM_URLENCODED = 'application/x-www-form-urlencoded';
    const FORM_JSON = 'application/json';
    if(request.headers['content-type'] === FORM_URLENCODED) {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else if(request.headers['content-type'] === FORM_JSON) {
        let body = '';
        request.on('data', chunk => {
            body +=(chunk)
        });
        request.on('end', () => {
            callback(parse(body));
        }); 
    }
    else {
        callback(null);
    } 
}

http.createServer(router.start()).listen(8080, function () {
  console.log('listening on port 8080')
})
