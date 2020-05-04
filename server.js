var bankai = require('bankai/http')
var http = require('http')
var path = require('path')
const { parse } = require('querystring')
var serverRouter = require('server-router')

var fs = require('fs')
var userDB
//var users = JSON.parse(fs.readFileSync('users.json', 'utf8'))
fs.readFile('users.json', 'utf8', function (err, data) {
    if (err) throw err; // we'll not consider error handling for now
    userDB = JSON.parse(data);
});

var router = serverRouter({ default: '/404' })

var compiler = bankai(path.join(__dirname, './frontend/index.js'))

router.route('GET', '*', function (req, res, params) {
   compiler(req, res, function () {
        res.statusCode = 404
        res.end('not found')
    })
})

router.route('POST', '/login', function (req, res, params) {
  const FORM_JSON = 'application/json';
  if(req.headers['content-type'] != FORM_JSON) {
    res.statusCode = 400
    res.end("Data not valid")
    console.log("Data not valid");
    return false
  }

  let body = '';
  req.on('data', chunk => {
      body += chunk
  });
  req.on('end', () => {
    let query = tryParseJSON(body);
    if(!query){
      res.statusCode = 400
      res.end("Data not valid")
      console.log("Data not valid");
      return false
    }
    
    console.log("successfuly parsed data")

    if(!contains(userDB.users, "username", query.username)) {
      console.log("user not found")
      res.statusCode = 400
      res.end("user not found")
      return false
    }
    
    var index = userDB.users.findIndex(function(item, i){
      return item.username === query.username
    });
    console.log("found user at index: "+ index+". checking for password")

    if(userDB.users[index].password === query.password){
      console.log("password check successfull")
      res.statusCode = 200
      res.end("successfully logged in")
      return true
    } else {
      console.log("password check failed")
      res.statusCode = 400
      res.end("password check failed")
      return false
    }
    
  });

  /*
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
  */
})

router.route('POST', '/createuser', function (req, res, params) {
  const FORM_JSON = 'application/json'
  if(req.headers['content-type'] != FORM_JSON) {
    res.statusCode = 400
    res.end("Data not valid")
    console.log("Data not valid")
    return false
  }

  let body = '';
  req.on('data', chunk => {
      body += chunk
  });
  req.on('end', () => {
    let query = tryParseJSON(body)
    if(query){
      var userNameExists = contains(userDB.users, "username", query.username)
      if(userNameExists) {
        res.statusCode = 412
        res.statusMessage = "Username already exists: "+ query.username;
        res.end()
        console.log("Username already exists")
        return false
      } 
      //console.log(userDB.filter(item => item.username === query.username))

      const newUserId = Object.keys(userDB.users).length 
      userDB.users[newUserId] = query
      
     // console.log(users)
      fs.writeFile('users.json',  JSON.stringify(userDB) ,() => {
          res.statusCode = 200
          res.statusMessage = query.username;
          res.end()
          console.log("new user added: "+ query.username)
          return true
      })
     
    } else {
      res.statusCode = 400
      res.end("Data not valid")
      console.log("Data not valid")
      return false
    }
  });

  /*
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
  */
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

function tryParseJSON (jsonString){
    try {
        var o = JSON.parse(jsonString);

        // Handle non-exception-throwing cases:
        // Neither JSON.parse(false) or JSON.parse(1234) throw errors, hence the type-checking,
        // but... JSON.parse(null) returns null, and typeof null === "object", 
        // so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === "object") {
            return o;
        }
    }
    catch (e) { }

    return false;
};

function contains(arr, key, val) {
    for (var i = 0; i < arr.length; i++) {
        if(arr[i][key] === val) return true
    }
    return false
}

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

http.createServer(options, router.start()).listen(8080, function () {  
  console.log('listening on port 8080')
})
