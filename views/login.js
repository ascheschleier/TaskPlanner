var html = require('choo/html')
var passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

// import template
var tasks = require('../components/tasks.js')
var Menu = require('../components/menu/menuWrapper')


var TITLE = 'LOGIN - main'

module.exports = view

function view (state, emit) {
  if (state.title !== TITLE) emit(state.events.DOMTITLECHANGE, TITLE)

  //tasks.bind(null, handleDelete )




  return html`
    <body class="code lh-copy" style="max-width:650px; margin:0 auto;">
      ${Menu(state, emit)}
      <main class="pa3 cf center">
        <section class="fl w-100 pa2">
          <h2>Login</h2>
          <form action="/login" method="post">
            <div>
                <label>Username:</label>
                <input type="text" name="username"/>
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password"/>
            </div>
            <div>
                <input type="submit" value="Log In"/>
            </div>
        </form>

        <!-- choo form C/P -->
        <form id="login" action="/dashboard">
            <label for="username">username</label>
            <input id="username" name="username" type="text">
            <label for="password">password</label>
            <input id="password" name="password" type="password">
            <input type="submit" value="Login">
        </form>

        
        </section>
      </main>
    </body>
  `
 
}

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));
