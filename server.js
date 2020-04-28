var bankai = require('bankai/http')
var http = require('http')
var path = require('path')

var compiler = bankai(path.join(__dirname, 'frontend/index.js'))
var server = http.createServer(function (req, res) {
  /*
  if (req.method === 'POST') {
    let body = '';
    req.on('data', chunk => {
        body += JSON.parse(chunk)
        //body += chunk.toString(); // convert Buffer to string
    });
    req.on('end', () => {
        console.log(body);
        res.end('ok');
    });
  }
  */
  compiler(req, res, function () {
    res.statusCode = 404
    res.end('not found')
  })
})

server.listen(8080, function () {
  console.log('listening on port 8080')
})